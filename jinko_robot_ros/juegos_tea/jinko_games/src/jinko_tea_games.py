#! /usr/bin/env python
import cv2
import numpy as np
import rospy
from jinko_games_message.srv import jinko_games_message, jinko_games_messageRequest, jinko_games_messageResponse

cuenta = 0
respuesta = False
position = []


def checkAnswer(request):
    global respuesta
    global position
    answer = request.answer
    print("El patron es " + answer)
    video = cv2.VideoCapture(0)

    while video.isOpened() and cuenta < 100:
        position = []
        respuesta = False
        rval, frame = video.read()
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        pattern = cv2.imread("/home/diana/catkin_ws/src/streaming/src/img/" + answer + ".png")
        pattern = cv2.cvtColor(pattern, cv2.COLOR_BGR2GRAY)
        # Matching
        res = cv2.matchTemplate(frame, pattern, cv2.TM_CCORR_NORMED)

        # Umbral de deteccion
        threshold = 0.86
        position = np.where(res >= threshold)
        print('array1 ' + str(len(position[0])))
        print('array2 ' + str(len(position[1])))
        if (cuenta > 30):
            if len(position[1]) > 0 and len(position[1]) > 0:
                respuesta = True
                print("Encontrado")
                break

        cv2.imshow("Webcam ", frame)
        key = cv2.waitKey(20)
        if key == 27 or key == 1048603:
            break
        contador()

    cv2.destroyAllWindows()
    response = jinko_games_messageResponse()
    response.success = respuesta

    print('variable: ' + str(respuesta))
    print('respuesta al servicio ' + str(response.success))
    return response


def contador():
    global cuenta
    cuenta += 1
    print(cuenta)


if __name__ == "__main__":
    try:
        rospy.init_node('Jinko_tea_games', anonymous=True)
        rospy.Service('/jinko_games_service', jinko_games_message, checkAnswer)
        rospy.spin()
    except rospy.ROSInterruptException:
        rospy.loginfo(" Testeo JINKOBOT finalizado")
