docker exec -it c_database mysql -uroot -proot --host localhost --port 3306 -e "SOURCE /share/db_create.sql;"
docker exec -it c_database sh -c "mysql -uroot -proot --host localhost --port 3306 catering < /share/catering_bck.sql"
docker exec -it c_database sh -c "mysql -uroot -proot --host localhost --port 3306 catering < /share/triggers.sql"