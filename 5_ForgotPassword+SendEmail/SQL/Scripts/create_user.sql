CREATE USER 'test_react'@'localhost' IDENTIFIED BY '0JPv630ffN';

GRANT SELECT ON mydb.* TO 'test_react'@'localhost';
GRANT INSERT ON mydb.* TO 'test_react'@'localhost';
GRANT UPDATE ON mydb.* TO 'test_react'@'localhost';
GRANT DELETE ON mydb.* TO 'test_react'@'localhost';
GRANT EXECUTE ON mydb.* TO 'test_react'@'localhost';

FLUSH PRIVILEGES;