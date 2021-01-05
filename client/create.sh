docker stop c_client
docker rm c_client
docker create -v $PWD/webapps/:/usr/local/tomcat/webapps/ -p 8080:8080 --name c_client c_client
docker network connect myNetwork c_client

