docker stop c_client
docker rm c_client
docker create -v %cd%\webapps\:/usr/local/tomcat/webapps/ -p 8080:8080 --name c_client c_client
docker network create -d bridge myNetwork
docker network connect myNetwork c_client

