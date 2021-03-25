---
title: "mysql in docker"
date: 2021-01-14T21:55:03+06:00
draft: false
toc: true
images:
tags:
  - mysql
  - docker
---

In this post, we will discuss how to setup & run *mysql* using *docker*

{{< image src="/img/whale.webp" alt="Whale" position="center" style="border-radius: 8px;" >}}

## Goal
We want to setup *mysql* using *docker*, but also want to provide our custom configurations for mysql and save mysql data into our machine. 
The reason of choosing docker over direct mysql installation into the machine is, we want to switch between mysql hosting machines with ease & start-stop mysql into our macine easily.

## Prerequisite
[Docker](https://www.docker.com/) & [Docker-compose](https://docs.docker.com/compose/) should already be setup into your machine beforehand.

## Config & data directory
First create two empty directories into your machine, anywhere you want with any name.
One for *mysql-config*, to store mysql configuration file.
Another for *mysql-data*, to persist database's data.

Into the *mysql-config* directory, create `config-file.cnf` file with following configurations
```bash
#
# The MySQL database server configuration file.
#
# One can use all long options that the program supports.
# Run program with --help to get a list of available options and with
# --print-defaults to see which it would actually understand and use.
#
# For explanations see
# http://dev.mysql.com/doc/mysql/en/server-system-variables.html

# Here is entries for some specific programs
# The following values assume you have at least 32M ram

[mysqld]
#
# * Basic Settings
#
#user		= mysql
# pid-file	= /var/run/mysqld/mysqld.pid
# socket	= /var/run/mysqld/mysqld.sock
# port		= 3306
# datadir	= /var/lib/mysql


# If MySQL is running as a replication slave, this should be
# changed. Ref https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_tmpdir
# tmpdir		= /tmp
#
# Instead of skip-networking the default is now to listen only on
# localhost which is more compatible and is not less secure.
#bind-address		= 127.0.0.1
#
# * Fine Tuning
#
#key_buffer_size		= 16M
# max_allowed_packet	= 64M
# thread_stack		= 256K

# thread_cache_size       = -1

# This replaces the startup script and checks MyISAM tables if needed
# the first time they are touched
#myisam-recover-options  = BACKUP

# max_connections        = 151

# table_open_cache       = 4000

#
# * Logging and Replication
#
# Both location gets rotated by the cronjob.
#
# Log all queries
# Be aware that this log type is a performance killer.
# general_log_file        = /var/log/mysql/query.log
# general_log             = 1
#
# Error log - should be very few entries.
#
#log_error = /var/log/mysql/error.log
#
# Here you can see queries with especially long duration
# slow_query_log		= 1
# slow_query_log_file	= /var/log/mysql/mysql-slow.log
# long_query_time = 2
# log-queries-not-using-indexes
#
# The following can be used as easy to replay backup logs or for replication.
# note: if you are setting up a replication slave, see README.Debian about
#       other settings you may need to change.
# server-id		= 1
# log_bin			= /var/log/mysql/mysql-bin.log
# binlog_expire_logs_seconds	= 2592000
#max_binlog_size   = 100M
# binlog_do_db		= include_database_name
# binlog_ignore_db	= include_database_name
sql-mode = ""
```
you can modify this file as farr your requirements.

## docker-compose file
Now you have to create *docker-compose* file. For my case, this is `mysql_compose.yaml`
```yaml
version: '3.6'

networks:
  my_app_net:
    name: my_app_net
    driver: bridge

services:
  my_mysql:
    container_name: %container_name%
    image: mysql:latest
    environment:
      MYSQL_DATABASE: %db_name%
      MYSQL_USER: %db_user%
      MYSQL_PASSWORD: %db_password%
      MYSQL_ROOT_PASSWORD: %db_root_password%
    ports:
      - 3306:3306
    networks:
      - my_app_net
    volumes:
      - "%absoloute_path_of_mysql_data_directory%:/var/lib/mysql"
      - "%absoloute_path_of_mysql_config_directory%:/etc/mysql/conf.d"
    restart: on-failure
    cap_add:
      - SYS_NICE
```
Don't forget to replace the db name, password, root-password, mysql-data & mysql-config directory path in the compose file.

## Start-stop mysql via docker
Start docker program into your machine. Then, open your *terminal* & `cd` into compose file location.

To start the service, execute:
```bash
docker-compose -f mysql_compose.yaml up
```
It will read the compose file, setup the service & start to log-out the mysql logs.

To stop the service, stop the service by pressing `cntrl` + `c`.
Then to remove the service from the stack, execute:
```bash
docker-compose -f mysql_compose.yaml down
```

## Access mysql cli
To access the started mysql's cli, you can execute the following command:
```bash
docker exec -it %container_name% mysql --user root --password=%db_root_password%
```