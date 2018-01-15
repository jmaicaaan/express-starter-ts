[![Build Status](https://travis-ci.org/jmaicaaan/express-starter-ts.svg?branch=master)](https://travis-ci.org/jmaicaaan/express-starter-ts)

# express-starter-ts
This repository gives the developer an Express Starter Typescript to kick off there development fast


# Overview
  - This is inspired from the [Java - Struts Framework](https://javabeat.net/introduction-to-struts-actions/) which we customized to make an opinionated starter pack for the developer to kick off there development fast.
  - We also promote the `Single Responsibility` principle as we believe that it will be easier to maintain and provide unit tests when it scales up.

    ![flow](https://jmaicaaan.github.io/express-starter-ts/images/flow.jpg)

# Entity
  - An entity represents the instance what will be saved into your database.
  - The entity in short will be your database table.
  - The entity folder will be located in the `project-folder-root/src/entites`
  - To create an entity, go to the terminal and type in:
    > `gulp entity --name User` See more [generators](#generators)

# Controllers
  - The controller is the one responsible to process your request and release the response to the client.
  - Every module will have corresponding controllers such as the `User` will have the `getUserController`, `addUserController`, `deleteUserController`, `updateUserController`. Each controller will have an `execute()` method that is decorated by an http verb. **The controller cannot contain multiple methods decorated by an http verb (eg: @Get, @Post, @Put, @Delete)**
  - Correct way

        @JsonController('/sample')
        class SampleController {

          constructor(
            @OrmRepository() private sampleRepository: SampleRepository
          )

          @Get()
          public execute() {
            return this.sampleRepository.getData();
          }
        }

  - Wrong way - It does not follow the `Single Responsibility` principle

        @JsonController('/sample')
        class SampleController {

          constructor(
            @OrmRepository() private sampleRepository: SampleRepository
          )

          @Get()
          public execute() {
            return this.sampleRepository.getData();
          }

          @Get()
          public getABC() {
            return this.sampleRepository.getABC();
          }
        }

  - To create an entity, go to the terminal and type in:
    > `gulp add-controller --name getUser` See more [generators](#generators)

# Repositories
  - The repository is the one responsible for communicating with the database with specific validations and nothing else! A repository extends the Repository class provide by the typeorm. **The repository file can contain multiple methods but each method is doing only one thing.**
  - The repository will be injected into a controller in order to communicate to the database. It is the responsibility of the repository to communicate to the database.

# Services
  - A service is similar to repositories but instead of communicating to database it communicates to other 3rd party libraries (nodemailer, bcrypt, etc). It creates an abstraction to the 3rd party libraries to be injectable in the application. **The service file can contain multiple methods but each method is doing only one thing.**
  - The service will be injected into a controller that communicate to the other libraries. Basically its a class that has methods.


# Generators
  - To create a controller, you can use the generator gulp command as `gulp add-controller --name controllerName`. After generating, import it into `app.ts`
  - The naming convention is **camelCase** and always `http verb` + `entity name`
