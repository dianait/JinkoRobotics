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
    """
    Funcion que captura la imagen de la webcam
    @return: devuelve el frame del video cuando el contador
    llega a los 50 segundos
    @rtype: ndarray
    """
    # resource 0 => webcam del portatil
    resource = 0
    contador = 0

    # Capturamos el video de la webcam
    video = cv2.VideoCapture(resource)

    # Mientras el video este abierto
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
    """
    Callback del servicio /jinko_games_service
    Realiza la captura de la imagen y la trata para que el modelo
    pueda realizar su prediccion
    @param request: informacion recibida del servicio /jinko_games_service
    @type request: jinko_games_messageRequest
    @return: Devuelve T / F si se la peticion coincide con la prediccion
    @rtype: jinko_games_messageResponse
    """

    # Capturar imagen
    image = image_publisher()

    # Numero a encontrar
    answer = request.answer
    model = load_model("/home/diana/catkin_ws/src/juegos_tea/my_model")

    # Modificamos las propiedades de la imagen para que se
    # adapten a las del modelo
    height = model.layers[0].input_shape[1]
    width = model.layers[0].input_shape[2]
    dtype = model.layers[0].dtype

    # Convertimos la imagen a escala de gris
    image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Redimensionamos la imagen capturada a las medidas del modelo
    image = cv2.resize(image, (height, width), interpolation=cv2.INTER_NEAREST)

    # Convertimos la imagen al tipo float32 que acepta el modelo
    image = image.astype(dtype)

    # Codificamos cada pixel de la matriz de 0 a 1 en vez del rango de
    # 0 a 255 de la escala de grises
    image /= 255

    # Invertimos la imagen de la webcam, ya que esta se toma invertida
    image = cv2.bitwise_not(image)

    # Realizamos la prediccion de la imagen utilizando el modelo entrenado
    predictions = model.predict(numpy.expand_dims(image, 0))

    # Comprobamos la respuesta correcta con la prediccion de la imagen
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
