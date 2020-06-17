#! /usr/bin/env python3

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

    # Capturamos el video de la webcam
    cap = cv2.VideoCapture(resource)

    rval, frame = cap.read()

    # Mientras el video esté abierto
    while rval:
        # Muestreo una ventana con el video de la webcam
        cv2.imshow("Stream: ", frame)

        time.sleep(5)
        # Guardo el frame actual
        rval, frame = cap.read()

        # Frame ya es una imagen capturada de la cámara
        # Con esto deberías poder hacer la predicción
        cv2.destroyWindow("preview")
        return frame


if __name__ == "__main__":
    try:
        rospy.init_node('Jinko_tea_games', anonymous=True)
        # rospy.init_node('Jinko_tea_games', anonymous=True)

        rospy.Service('/jinko_games_service', jinko_games_message, checkAnswer)

        model = load_model("/home/oscar/python3_ws/src/digitos/my_model")

        height = model.layers[0].input_shape[1]
        width = model.layers[0].input_shape[2]
        dtype = model.layers[0].dtype

        myFrame = image_publisher()

        myFrame = cv2.cvtColor(myFrame, cv2.COLOR_BGR2GRAY)

        myFrame = cv2.resize(myFrame, (height, width),
                             interpolation=cv2.INTER_NEAREST)

        myFrame = myFrame.astype(dtype)
        myFrame /= 255
        predictions = model.predict(numpy.expand_dims(myFrame, 0))

        print(numpy.argmax(predictions[0]))
    except rospy.ROSInterruptException:
        rospy.loginfo(" Testeo JINKOBOT finalizado")
