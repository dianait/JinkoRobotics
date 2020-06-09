#! /usr/bin/env python
import cv2
import numpy as np
import rospy
from matplotlib import pyplot as plt
from jinko_games_msg.srv import jinko_games_message, jinko_games_messageRequest, jinko_games_messageResponse


class TEAGame:

    def __init__(self):
        self.count = 0
        self.position = ([], [])
        self.threshold = 0.7
        self.source = 0
        self.MIN_MATCH = 30
        self.MAX_TIME = 500
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

        video = cv2.VideoCapture(self.source)
        pattern = cv2.imread("/home/diana/catkin_ws/src/jinko_tea_games/src/img/" + answer + ".png")
        pattern = cv2.cvtColor(pattern, cv2.COLOR_BGR2GRAY)

        while video.isOpened() and self.count < self.MAX_TIME:

            rval, frame = video.read()
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

            #  Detecta los puntos que deben coincidir y a partir de ahi crea los descriptores
            kp1, desc1 = self.detector.detectAndCompute(frame, None)
            kp2, desc2 = self.detector.detectAndCompute(pattern, None)
            
            # Matching descriptor vectors with a FLANN based matcher
            matches = self.matcher.knnMatch(desc1, desc2, 2)
            
            #  Filtrado a partir del umbral
            good_matches = [m[0] for m in matches \
                            if len(m) == 2 and m[0].distance < m[1].distance *  self.threshold]

            if self.count > self.WAIT_BEFORE_DETECT:
                
                if len(good_matches) > self.MIN_MATCH:
                    
                    # Los puntos que hacen match (que estan en good_matches ) de las dos imagenes 
                    src_pts = np.float32([ kp1[m.queryIdx].pt for m in good_matches ])
                    dst_pts = np.float32([ kp2[m.trainIdx].pt for m in good_matches ])

                    # Encuentra transformaciones de perspectiva entre dos planos.
                    # A partir de los keypoints que deben coincidir tiene encuenta si se gira, se inclina... la tarjeta 
                    mtrx, mask = cv2.findHomography(src_pts, dst_pts, cv2.RANSAC, 5.0)
                
                    if mask.sum() > self.MIN_MATCH:
                        return True  


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

    # Patron a buscar (triste, enfadado, coche, bici... )
    answer = request.answer

    # Ceamos objeto de la clase TEAGame
    game = TEAGame()

    # Generamos el mensaje respuesta del servicio
    response = jinko_games_messageResponse()
    response.success = game.check(answer)
    return response


if __name__ == "__main__":
    try:
        rospy.init_node('Jinko_tea_games', anonymous=True)
        rospy.Service('/jinko_games_service', jinko_games_message, checkAnswer)
        rospy.spin()
    except rospy.ROSInterruptException:
        rospy.loginfo(" Testeo JINKOBOT finalizado")
