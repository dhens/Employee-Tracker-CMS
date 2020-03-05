ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password
BY 'toor';

drop database if exists companyDB;

create database companyDB;

use companyDB;

create table employee(
	id int not null auto_increment,
    primary key (id),
    first_name varchar(30),
    last_name varchar(30),
    role_id int,
    manager_id int null
);

create table role(
	id int not null auto_increment,
    primary key (id),
    title varchar(30),
    salary decimal(10,2),
    department_id int
);

create table department(
	id int not null auto_increment,
    primary key (id),
    name varchar(30)
);

insert into employee (first_name, last_name, role_id, manager_id)
values ('Bill', 'Billiamson', 3, 1);