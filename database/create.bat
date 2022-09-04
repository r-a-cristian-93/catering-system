docker stop c_database
docker rm c_database
docker create -v %cd%\share:/share -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 --name c_database c_database
docker network create -d bridge myNetwork
docker network connect myNetwork c_database
