docker exec -it c_database mysql -uroot -proot --host localhost --port 3306 -e 'SOURCE /share/script.sql;'
