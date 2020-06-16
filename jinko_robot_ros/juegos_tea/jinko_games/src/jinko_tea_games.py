#! /usr/bin/env python
import cv2
import rospy
from jinko_games_message.srv import jinko_games_message, jinko_games_messageRequest, jinko_games_messageResponse
import numpy as np
from sensor_msgs.msg import Image
from cv_bridge import CvBridge, CvBridgeError


class TEAGame:
    """ Clase juego TEA
        @param count: Contador para parar la ejecucion si no encuentra match en un tiempo determinado
        @type count: int
        @param source: Fuente del video a analizar
            (default is 0)
        @type count: int
        @param MIN_MATCH: Minimo de coincidencias que se tienen que dar entre las imagenes para que se considere match
        @type count: int
            (default is 30)
        @param MAX_TIME: Maximo tiempo que va a esperar antes de devolver false si no encunetra match
        @type count: int
            (default is 250)
        @param WAIT_BEFORE_DETECT:  una espera antes de empezar a analizar la imagen
        @type count: int
            (default is 40)
    """

    def __init__(self):
        """
        Constructor de la clase TEA
        @return Un objeto con las configuraciones basicas para poder realizar el metodo check
        @rtype: TEAGame
        """
        self.count = 0
        self.source = 0
        self.MIN_MATCH = 30
        self.MAX_TIME = 250
        self.WAIT_BEFORE_DETECT = 40
        self.detector = cv2.ORB_create(1000)
        self.FLANN_INDEX_LSH = 6
        self.index_params= dict(algorithm = self.FLANN_INDEX_LSH,
                   table_number = 6,
                   key_size = 12,
                   multi_probe_level = 1)
        self.search_params=dict(checks=32)
        self.matcher = cv2.FlannBasedMatcher(self.index_params, self.search_params)


    def check(self, answer):
        """ Constructor de la clase TEA
        @param answer: El patron a buscar en la imagen ('trsite', 'enfadado'...)
        @type answer: str
        @return: Si ha encontrado el patron o no
        @rtype: bool
        """
        video = cv2.VideoCapture(self.source)
        pattern = cv2.imread("/home/diana/catkin_ws/src/jinko_tea_games/src/img/" + answer + ".png")
        pattern = cv2.cvtColor(pattern, cv2.COLOR_BGR2GRAY)

        # Publisher para el streaming de la webcam
        pub = rospy.Publisher('camera_image', Image, queue_size=100)
        rospy.Rate(0.5)
        bridge = CvBridge()


        while video.isOpened() and self.count < self.MAX_TIME:

            rval, frame = video.read()

            # Pasamos la imagen de formato OpenCV a formato ROS para el streaming
            image_message = bridge.cv2_to_imgmsg(frame, 'bgr8')
            pub.publish(image_message)
            
            # Pasamos la imagen de la webcam a B/N
            frameBN = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

            #  Detecta los puntos que deben coincidir y a partir de ahi crea los descriptores
            kp1, desc1 = self.detector.detectAndCompute(frameBN, None)
            kp2, desc2 = self.detector.detectAndCompute(pattern, None)
            
            # Matching descriptor vectors with a FLANN based matcher
            matches = self.matcher.knnMatch(desc1, desc2, 2)
            
            #  Filtrado a partir del umbral
            good_matches = [m[0] for m in matches \
                            if len(m) == 2 and m[0].distance < m[1].distance *  self.threshold]

            print('good matches:%d/%d' %(len(good_matches),len(matches)))

            if self.count > self.WAIT_BEFORE_DETECT and len(good_matches) > self.MIN_MATCH:
                    
                # Los puntos que hacen match (que estan en good_matches ) de las dos imagenes 
                src_pts = np.float32([ kp1[m.queryIdx].pt for m in good_matches ])
                dst_pts = np.float32([ kp2[m.trainIdx].pt for m in good_matches ])

                # Encuentra transformaciones de perspectiva entre dos planos.
                # A partir de los keypoints que deben coincidir tiene encuenta si se gira, se inclina... la tarjeta 
                mtrx, mask = cv2.findHomography(src_pts, dst_pts, cv2.RANSAC, 5.0)

                accuracy=float(mask.sum()) / mask.size
                print("accuracy: %d/%d(%.2f%%)"% (mask.sum(), mask.size, accuracy))
                if mask.sum() > self.MIN_MATCH:
                    return True 

            pub.publish(image_message)
            cv2.imshow("Webcam ", frame)
            key = cv2.waitKey(20)
            if key == 27 or key == 1048603:
                break
            self.contador()

        cv2.destroyAllWindows()
        return False

    def contador(self):
        self.count += 1


def checkAnswer(request):
    """
    Callback del servicio /jinko_games_service
    @param request: informacion recibida del servicio /jinko_games_service
    @type request: jinko_games_messageRequest
    @return: Si ha encontrado la coincidencia o no a partir de GameTEA.check()
    @rtype: jinko_games_messageResponse
    """

    # Patron a buscar (triste, enfadado, coche, bici... )
    answer = request.answer

    # Ceamos objeto de la clase TEAGame
    game = TEAGame()
    # help(game)

    # Generamos el mensaje respuesta del servicio
    response = jinko_games_messageResponse()
    respuesta = game.check(answer)
    # help(respueta)
    response.success = respuesta
    return response


if __name__ == "__main__":
    try:
        rospy.init_node('Jinko_tea_games', anonymous=True)
        rospy.Service('/jinko_games_service', jinko_games_message, checkAnswer)
        rospy.spin()
    except rospy.ROSInterruptException:
        rospy.loginfo(" Testeo JINKOBOT finalizado")


