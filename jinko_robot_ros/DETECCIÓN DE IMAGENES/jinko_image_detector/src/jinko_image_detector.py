#!/usr/bin/env python
import rospy
import cv2
import numpy as np
from cv_bridge import CvBridge, CvBridgeError
from sensor_msgs.msg import Image
import imutils



class jinko_image_detector(object):

    def __init__(self):
    
        self.bridge_object = CvBridge()
        self.image_sub = rospy.Subscriber("/turtlebot3/camera/image_raw",Image,self.camera_callback)

    def camera_callback(self,data):

        try:
            # Seleccionamos bgr8 porque es la codificacion de OpenCV por defecto
            cv_image = self.bridge_object.imgmsg_to_cv2(data, desired_encoding="bgr8")
        except CvBridgeError as e:
            print(e)


        height, widht, channels = cv_image.shape
            
        # sacar la imagen en escala de grises
        img_gray = cv2.cvtColor(cv_image,cv2.COLOR_BGR2GRAY)

        img_gray = cv2.bilateralFilter(img_gray,11,17,17)

        hsv = cv2.cvtColor(cv_image,cv2.COLOR_BGR2HSV)
        lower_color = np.array([30,30,30])
        upper_color = np.array([255,255,255]) 

        ret, thresh = cv2.threshold(img_gray,127,255,1)

        ratio = cv_image.shape[0] / float(cv_image.shape[0])

        _,contours,h = cv2.findContours(thresh,cv2.RETR_TREE,cv2.CHAIN_APPROX_SIMPLE)

        circles = cv2.HoughCircles(img_gray,cv2.HOUGH_GRADIENT,1,20,param1=50,param2=30,minRadius=0,maxRadius=-80)

        if circles is not None:
            circles = np.round(circles[0, :].astype("int"))

            for (x,y,r) in circles:
                rospy.loginfo("Circulo encontrado en x: {}, y: {} con radio: {}".format(x,y,r))
                cv2.circle(cv_image,(x,y),r,(0,255,0),4)
                cv2.rectangle(cv_image,(x-5,y-5),(x+5,y+5),(0,128,255),-1)
                cv2.putText(cv_image,"Circulo",(int(x),int(y)), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2)
        else:
                
            mask = cv2.inRange(hsv, lower_color, upper_color)

            # calculamos el centroide del blob de la imagen binaria utilizada
            M = cv2.moments(mask,False)
            try:
                cx, cy = M['m10']/M['m00'], M['m01']/M['m00']
            except ZeroDivisionError:
                cy, cx = height/2, widht/2
                
            # Buscamos los contornos de los objetos azules
            _, contornos, __ = cv2.findContours(mask, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_TC89_L1)

            for cnt in contornos:
                #cv2.rectangle(cv_image,(cx-5,cy-5),(cx+5,cy+5),(0,128,255),-1)
                tam_contorno = cv2.contourArea(cnt)
                tam_mascara = mask.size
                x = (tam_contorno*100)/tam_mascara
                if(x > 1):
                    approx = cv2.approxPolyDP(cnt,0.01*cv2.arcLength(cnt,True),True)
                    if len(approx)==4:
                        rospy.loginfo("Rectangulo encontrado en x: {}, y: {}".format(cx,cy))
                        cv2.putText(cv_image,"Rectangulo",(int(cx),int(cy)), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2)
                        cv2.drawContours(cv_image,contornos, -1, (255,255,255), 3)
                    if len(approx)==3:
                        rospy.loginfo("Triangulo encontrado en x: {}, y: {}".format(cx,cy))
                        cv2.putText(cv_image,"Triangulo",(int(cx),int(cy)), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2)
                        cv2.drawContours(cv_image,contornos, -1, (255,255,255), 3)
                

                """(ancho, alto, canales) = cv_image.shape
                rospy.loginfo("- ancho: {}".format(ancho))
                rospy.loginfo("- alto: {}".format(alto))
                rospy.loginfo("- canales: {}".format(canales))
                
                rospy.loginfo("- size: {}".format(cv_image.size))
                rospy.loginfo("- ndim: {}".format(cv_image.ndim))
                rospy.loginfo("- dtype: {}".format(cv_image.dtype))
                rospy.loginfo("- itemsize: {}".format(cv_image.itemsize))"""
                

                """
                for cnt in contours:
                    rect = cv2.minAreaRect(cnt)
                    box = cv2.boxPoints(rect)
                    box = np.int0(box)
                    area = cv2.contourArea(cnt)
                    if area > 1:
                        approx = cv2.approxPolyDP(cnt,0.01*cv2.arcLength(cnt,True),True)
                        if len(approx)==3:
                            rospy.loginfo("Triangulo encontrado!!")
                            cv2.drawContours(cv_image,[box],0,(0,255,0),-1)
                        elif len(approx)==4:
                            rospy.loginfo("Rectangulo encontrado!!")
                            cv2.drawContours(cv_image,[box],0,(0,0,255),2)
                            cv2.drawContours(cv_image,[cnt],-1,(0,255,0),2)
                            # accede al centroide del objeto
                            M = cv2.moments(cnt)
                            if M["m00"] != 0:
                                cX = int((M["m10"] / M["m00"]) * ratio)
                                cY = int((M["m01"] / M["m00"]) * ratio)

                                cord = cv_image[int(cX)+3,int(cY)+3]
                                rospy.loginfo(cord)
                """
                                    
            
            cv2.imshow("output",cv_image)
            cv2.waitKey(1)
            

def main():
    img_converter_object = jinko_image_detector()
    rospy.init_node('jinko_image_detector', anonymous=True)
    
    try:
        rospy.spin()
    except KeyboardInterrupt:
        print("Fin del programa!")
    
    cv2.destroyAllWindows() 
    

if __name__ == '__main__':
    main()






"""
#!/usr/bin/env python
import rospy
import cv2
import numpy as np
from cv_bridge import CvBridge, CvBridgeError
from sensor_msgs.msg import Image
import roslib
import sys, time

from sensor_msgs.msg import CompressedImage


VERBOSE=False

class jinko_image_detector(object):

    def __init__(self):
        self.image_pub = rospy.Publisher("/turtlebot3/camera/jinko_image",CompressedImage)
    
        # self.bridge_object = CvBridge()
        self.image_sub = rospy.Subscriber("/turtlebot3/camera/image_raw",Image,self.camera_callback)

        if VERBOSE:
            print "subscribed to /camera/image/compressed" 

    def camera_callback(self,data):

        if VERBOSE:
            print 'received image of type: "%s"' %  ros_data.format
        
        np_arr = np.fromstring(data.data, np.uint8)
        cv_image = cv2.imdecode(np_arr, cv2.CV_LOAD_IMAGE_COLOR)

        

        try:
            # Seleccionamos bgr8 porque es la codificacion de OpenCV por defecto
            cv_image = self.bridge_object.imgmsg_to_cv2(data, desired_encoding="bgr8")
        except CvBridgeError as e:
            print(e)
    

        height, widht, channels = cv_image.shape
        
        # sacar la imagen en escala de grises
        img_gray = cv2.cvtColor(cv_image,cv2.COLOR_BGR2GRAY)

        img_gray = cv2.bilateralFilter(img_gray,11,17,17)

        hsv = cv2.cvtColor(cv_image,cv2.COLOR_BGR2HSV)
        lower_color = np.array([30,30,30])
        upper_color = np.array([255,255,255]) 

        ret, thresh = cv2.threshold(img_gray,127,255,1)

        ratio = cv_image.shape[0] / float(cv_image.shape[0])

        _,contours,h = cv2.findContours(thresh,cv2.RETR_TREE,cv2.CHAIN_APPROX_SIMPLE)

        circles = cv2.HoughCircles(img_gray,cv2.HOUGH_GRADIENT,1,20,param1=50,param2=30,minRadius=0,maxRadius=-80)

        if circles is not None:
            circles = np.round(circles[0, :].astype("int"))

            for (x,y,r) in circles:
                rospy.loginfo("Circulo encontrado en x: {}, y: {} con radio: {}".format(x,y,r))
                cv2.circle(cv_image,(x,y),r,(0,255,0),4)
                cv2.rectangle(cv_image,(x-5,y-5),(x+5,y+5),(0,128,255),-1)
                cv2.putText(cv_image,"Circulo",(int(x),int(y)), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2)
        else:
            
            mask = cv2.inRange(hsv, lower_color, upper_color)

            # calculamos el centroide del blob de la imagen binaria utilizada
            M = cv2.moments(mask,False)
            try:
                cx, cy = M['m10']/M['m00'], M['m01']/M['m00']
            except ZeroDivisionError:
                cy, cx = height/2, widht/2
            
            # Buscamos los contornos de los objetos azules
            _, contornos, __ = cv2.findContours(mask, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_TC89_L1)

            for cnt in contornos:
                #cv2.rectangle(cv_image,(cx-5,cy-5),(cx+5,cy+5),(0,128,255),-1)
                tam_contorno = cv2.contourArea(cnt)
                tam_mascara = mask.size
                x = (tam_contorno*100)/tam_mascara
                if(x > 1):
                    approx = cv2.approxPolyDP(cnt,0.01*cv2.arcLength(cnt,True),True)
                    if len(approx)==4:
                        rospy.loginfo("Rectangulo encontrado en x: {}, y: {}".format(cx,cy))
                        cv2.putText(cv_image,"Rectangulo",(int(cx),int(cy)), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2)
                        cv2.drawContours(cv_image,contornos, -1, (255,255,255), 3)
                    if len(approx)==3:
                        rospy.loginfo("Triangulo encontrado en x: {}, y: {}".format(cx,cy))
                        cv2.putText(cv_image,"Triangulo",(int(cx),int(cy)), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2)
                        cv2.drawContours(cv_image,contornos, -1, (255,255,255), 3)
            

            (ancho, alto, canales) = cv_image.shape
            rospy.loginfo("- ancho: {}".format(ancho))
            rospy.loginfo("- alto: {}".format(alto))
            rospy.loginfo("- canales: {}".format(canales))
            
            rospy.loginfo("- size: {}".format(cv_image.size))
            rospy.loginfo("- ndim: {}".format(cv_image.ndim))
            rospy.loginfo("- dtype: {}".format(cv_image.dtype))
            rospy.loginfo("- itemsize: {}".format(cv_image.itemsize))
            

            
            for cnt in contours:
                rect = cv2.minAreaRect(cnt)
                box = cv2.boxPoints(rect)
                box = np.int0(box)
                area = cv2.contourArea(cnt)
                if area > 1:
                    approx = cv2.approxPolyDP(cnt,0.01*cv2.arcLength(cnt,True),True)
                    if len(approx)==3:
                        rospy.loginfo("Triangulo encontrado!!")
                        cv2.drawContours(cv_image,[box],0,(0,255,0),-1)
                    elif len(approx)==4:
                        rospy.loginfo("Rectangulo encontrado!!")
                        cv2.drawContours(cv_image,[box],0,(0,0,255),2)
                        cv2.drawContours(cv_image,[cnt],-1,(0,255,0),2)
                        # accede al centroide del objeto
                        M = cv2.moments(cnt)
                        if M["m00"] != 0:
                            cX = int((M["m10"] / M["m00"]) * ratio)
                            cY = int((M["m01"] / M["m00"]) * ratio)

                            cord = cv_image[int(cX)+3,int(cY)+3]
                            rospy.loginfo(cord)
            
                                   
        image_np = cv_image.copy()
        
        cv2.imshow("output",image_np)
        cv2.waitKey(1)

        # --- Create compressed image ---
        msg = CompressedImage()
        msg.header.stamp = rospy.Time.now()
        msg.format = "jpeg"
        msg.data = np.array(cv2.imencode('.jpg', image_np)[1]).tostring()
        
        # publish new image
        self.image_pub.publish(msg)
        

def main():
    img_converter_object = jinko_image_detector()
    rospy.init_node('jinko_image_detector', anonymous=True)
    
    try:
        rospy.spin()
    except KeyboardInterrupt:
        print("Fin del programa!")
    
    cv2.destroyAllWindows() 
    

if __name__ == '__main__':
    main()
"""














