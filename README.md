[![Build Status](https://travis-ci.org/jmaicaaan/express-starter-ts.svg?branch=master)](https://travis-ci.org/jmaicaaan/express-starter-ts)

# express-starter-ts
This repository gives the developer an Express Starter written in Typescript to kick off there development fast 🔥🔥🔥

This is inspired from the [Java - Struts Framework](https://javabeat.net/introduction-to-struts-actions/) which we customized to make an opinionated starter pack for the developer to kick off there development fast.

We also promote the `Single Responsibility` principle as we believe that it will be easier to maintain and provide unit tests when it scales up.

  ![flow](https://jmaicaaan.github.io/express-starter-ts/images/flow.jpg)

# Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

# Prerequisites
- Node 8.4.0 or higher (you can try to manage your versions using [nvm](https://github.com/creationix/nvm))
# Installing
- Set up your database and make sure you change the config to your own setup. You can find your database config under `config/ormconfig.json` for your development environment. Change accordingly to your chosen environment (test/production)

      {
        "type": "postgres",
        "host": "localhost",
        "port": 5432,
        "username": "sample",
        "password": "sample",
        "database": "sample",
        "logging": false
      }

    For more info like supported database driver visit [TypeORM](https://github.com/typeorm/typeorm).


- And start your application by running this in the terminal. This would watch for changes and rebuild(transpiled) your application

      npm run watch

With that, you can see in your terminal that the app is ready to listen for requests. For example:

    server listening at http://localhost:3000


# Running the tests

To run the test suites, type in your terminal

    npm run test

Take note that you need to change your database config for **test** environment. See [installing](#Installing) on how to setup database.


# Built With
- [Routing controllers](https://github.com/typestack/routing-controllers) - Web framework
- [TypeORM](https://github.com/typeorm/typeorm) - Database Management
- [TypeDI](https://github.com/typestack/typedi) - Dependencies injection

# Contributing
Open for pull requests!

# Versioning
We use [SemVer](https://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/jmaicaaan/express-starter-ts/tags)

# Authors
- [JM Santos](https://github.com/jmaicaaan)
- [Cedrick Mandocdoc](https://github.com/ciiidi)

# Acknowledgments
- Hands down for the great works of [pleerock](https://github.com/pleerock)
