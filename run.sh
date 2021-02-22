#!/bin/bash

dockerStatus=""
dockerRunningMessage="Docker is running."

sudo service docker start

while [ "$dockerStatus" != "Docker is running." ]; do
	dockerStatus=$(service docker status)
	sleep 1
done
echo "Docker is up and running."

docker start c_database && docker start c_client && cd rest && mvn clean spring-boot:run
