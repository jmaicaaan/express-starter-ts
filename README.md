# express-starter-ts
This repository gives the developer an Express Starter Typescript to kick off there development fast


# Generators
  - To create a controller, you can use the generator gulp command as `gulp add-controller --name controllerName`. After generating, import it into `app.ts`


# Documentation
  - The definitions that we set to the different parts of our structure. With that, we will discuss what is `command design pattern` and why do we use it.
  ![alt text](https://lh4.googleusercontent.com/BXctKdlruuz4yM8dYCQVbPIb62EzLSMwCgJie5XSSgun1zbKx9fwwJ54d_7U_mT3yjc2d3ayhdrvOP6TA1Jy=w1974-h1241)

# Entity
  - What is an entity? An entity represents the instance what will be saved into your database. An entity is like a table instance to your database.
  - The entity in short will be your database table.
  - The entity folder will be mostly located in the `project-folder-root/src/entites`
  - To create an entity, go to the terminal and type in `gulp entity --name User`. The name of the entity should be just a single word

# Controllers
  - What is a controller? A controller is the one responsible for handling the request and response of the app.
  - In our controller, we use our own style of `command design pattern` which we will discuss in a while. This is inspired from the `Java Struts Action based`. Every module will have corresponding controllers such as the `User` module will have the `getUserController`, `addUserController`, `deleteUserController`, `updateUserController`. Each controller will only have **one task to do** and nothing else. You might be wondering why use `command design pattern`? We want to use the `command design pattern` for the reason that it is easy to scale from small to large ecosystem without headache!
  - We also promote the `single responsibility` to every controller which will be easy to maintain as your app scale up. It is much easy also for the developers to locate the controller which is handling the request-response of a specific feature. For example, you want to find who is responsible for viewing the list of users. Instead of finding it in a **growing single file** and doing `ctrl + f` with search term, you could easily locate it using its filename. Once you find it, you don't to worry on the other files or other controllers in your app because it is not dependent to other controllers. Aha!
  - **The controller file CANNOT contain multiple methods only one method is allowed.**
  - To create a controller, go to the terminal and type in `gulp controller --name getUser`. The result will be `getUser.controller.ts`. The naming convention is **camelCase** and always `http verb` + `entity name`
  More example:
    - `gulp controller --name getUserController` -> `getUser.controller.ts`
    - `gulp controller --name GETUSER` -> `getUser.controller.ts`

# Repositories
  - What is a repository? A repository is the one responsible for communicating with the database with specific validations and nothing else! A repository extends the Repository class provide by the typeorm. **The repository file can contain multiple methods but each method is doing only one thing.**
  - The repository will be injected into a controller in order to communicate to the database. It is the responsibility of the repository to communicate to the database, and no one else.

# Services
  - What is a service? A service is similar to reposotories but instead of communicating to database it communicates to other 3rd party libraries (nodemailer, bcrypt, etc). This acts like a facade layer of other libraries and available on the whole application. **The service file can contain multiple methods but each method is doing only one thing.**
  - The repository will be injected into a controller that communicate to the other libraries. Basically its a class that has methods.
