CREATE DATABASE IF NOT EXISTS bdc_dev_db;

CREATE USER IF NOT EXISTS 'bdc_dev'@'localhost' IDENTIFIED BY 'bdc_dev_pwd';

GRANT ALL PRIVILEGES ON bdc_dev_db.* TO 'bdc_dev'@'localhost';

FLUSH PRIVILEGES;
