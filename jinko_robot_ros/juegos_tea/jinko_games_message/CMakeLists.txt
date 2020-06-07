cmake_minimum_required(VERSION 2.8.3)
project(jinko_games_message)

find_package(catkin REQUIRED COMPONENTS
  rospy
  std_msgs
  message_generation
)

add_service_files(
  FILES
  jinko_games_message.srv
)

generate_messages(
  DEPENDENCIES
  std_msgs
)

catkin_package(
 CATKIN_DEPENDS rospy

)

include_directories(
  ${catkin_INCLUDE_DIRS}
)


