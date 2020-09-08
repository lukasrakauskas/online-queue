# Online Queue

Online Queue is a web app to replace usage of tickets with serial numbers in service departments like: bank, outpatient
clinic, post office, etc.

Link to a hosted version:
[https://queue-online.herokuapp.com](https://queue-online.herokuapp.com)

## Tasks done

Dashboard page:
- The service department screen should show current visits and five upcoming visits. 
- The service department screen information must be updated every five seconds.
- The service department screen must not be publicly accessible.

Home page:
- The customer must be able to book an appointment with a specialist (the customer does
not need to register in the account system). After a successful reservation, the system
must generate a reservation code and provide it to the customer.
- The customer must see how much time is left before the visit (separate page, not the
service department screen).
- The customer must be able to cancel the visit.

Login page:
- The specialist must have an account (can be created through a database, no
administrations are required for accounts) with which to log in to visit management.

Visits page: 
- The specialist should only see patients who have registered with him.
- The specialist must be able to mark that the visit has begun. There can only be one
active visit at a time.
- The specialist must be able to mark the end of the visit.
- The specialist must be able to cancel the visit.

## Technology Stack

Languages used: PHP, HTML, CSS and JavaScript

- Laravel 7.24
- Laravel Sanctum 2.4
- React 16.2.0
- MariaDB 10.4.11

## Prerequisites

- <a href="https://getcomposer.org/">Composer</a> 1.10.10
- <a href="https://nodejs.org/en/">Node.js</a> 12.18.0 
- <a href="https://nodejs.org/en/">NPM</a> 6.14.4

## Installation

1. Copy .env.example and fill in database information or anything else according to your environment.
2. Run the following commands:

Database dump:
[https://github.com/lukasrakauskas/online-queue/blob/master/database-dump.sql](https://github.com/lukasrakauskas/online-queue/blob/master/database-dump.sql)

```bash
composer install
npm install
npm run dev
php artisan migrate --seed
php artisan serve
```

## Usage

<u>As a specialist</u>

After migrating and seeding the database you will have a test user with following credentials:
```
email: test@test.com
password: password
```

Then you can visit Visits page and manage: start, end and cancel your visits.

Dashboard page is the service department screen. It shows current appointments and upcoming ones.

![](https://i.imgur.com/kDumfIr.gif)

<u>As a customer</u>

You can choose which specialist you want to have an appointment with and then register. After that your reservation is made automatically and a number is given.

![](https://i.imgur.com/MiO3Gsb.gif)

## Notes
Appointment time is based on the specialist and taken from database.
