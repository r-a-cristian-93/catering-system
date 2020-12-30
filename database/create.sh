docker stop c_database
docker rm c_database
docker create -v $PWD/share:/share -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 --name c_database c_database
docker network connect myNetwork c_database
