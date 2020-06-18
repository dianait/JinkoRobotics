#! /usr/bin/env python
import rospy
import time
import cv2
from tensorflow import keras
import tensorflow as tf
from tensorflow.keras.datasets.mnist import load_data
from tensorflow.keras.models import load_model
from tensorflow.keras.utils import to_categorical
import numpy
from sensor_msgs.msg import Image
from jinko_games_message.srv import jinko_games_message, jinko_games_messageRequest, jinko_games_messageResponse


def image_publisher():
   
    # resource 0 => webcam del portatil
    resource = 0
    contador = 0

    # Capturamos el video de la webcam
    video = cv2.VideoCapture(resource)

    # Mientras el video esté abierto
    while video.isOpened():

        rval, frame = video.read()
        cv2.imshow("Webcam ", frame)
        key = cv2.waitKey(20)
        if key == 27 or key == 1048603:
            break

        contador = contador + 1
        if (contador > 50):
            break
    
    cv2.destroyAllWindows()
    return frame
        
def checkAnswer(request):

    myFrame = image_publisher()
    # Numero a encontrar
    answer = request.answer
    model = load_model("/home/diana/catkin_ws/src/juegos_tea/my_model")

    height = model.layers[0].input_shape[1]
    width = model.layers[0].input_shape[2]
    dtype = model.layers[0].dtype

    myFrame = cv2.cvtColor(myFrame, cv2.COLOR_BGR2GRAY)

    myFrame = cv2.resize(myFrame, (height, width), interpolation=cv2.INTER_NEAREST)

    myFrame = myFrame.astype(dtype)
    myFrame /= 255
    myFrame = cv2.bitwise_not(myFrame)
    predictions = model.predict(numpy.expand_dims(myFrame, 0))

    if (answer == str(numpy.argmax(predictions[0]))):
        respuesta = True
    else: 
        respuesta = False
    
    response = jinko_games_messageResponse()
    response.success = respuesta
    print(numpy.argmax(predictions[0]))
    print(predictions)
    return response


if __name__ == "__main__":

    try:
        rospy.init_node('Jinko_math_games', anonymous=True)
        rospy.Service('/jinko_games_service', jinko_games_message, checkAnswer)
        rospy.spin()
    except rospy.ROSInterruptException:
        rospy.loginfo(" Testeo JINKOBOT finalizado")
