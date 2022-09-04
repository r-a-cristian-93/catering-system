docker exec -it c_database mysql -uroot -proot --host localhost --port 3306 -e 'SOURCE /share/catering_bck.sql;'
docker exec -it c_database mysql -uroot -proot --host localhost --port 3306 -e 'SOURCE /share/triggers.sql;'
