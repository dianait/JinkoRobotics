#! /usr/bin/env python

import rospy
from jinko_service_msg.srv import   jinko_service_msg, jinko_service_msgRequest, jinko_service_msgResponse

rospy.init_node('move_base_action_client') # inicializa el nodo cliente
rospy.wait_for_service('/jinko_navigation') # espera a que el servicio este activo

move_robot_service = rospy.ServiceProxy('/jinko_navigation',jinko_service_msg) # se estabece la conexion con el servidor
rospy.loginfo("Conectando con el servicio")
msg_request = jinko_service_msgRequest() # se crea el objeto peticion
msg_request.destino = 4 # pasamos el parametro destino 
rospy.loginfo("Llamando al servicio /jinko_navigation")
result = move_robot_service(msg_request) # ejecuta la llamada al servidor
rospy.loginfo("Resultado de la llamada: %s" % result) # informacion para depuracion

