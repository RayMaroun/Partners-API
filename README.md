# Partners API

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=RayMaroun_Partners-API&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=RayMaroun_Partners-API) [![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=RayMaroun_Partners-API&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=RayMaroun_Partners-API) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=RayMaroun_Partners-API&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=RayMaroun_Partners-API) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=RayMaroun_Partners-API&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=RayMaroun_Partners-API) [![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=RayMaroun_Partners-API&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=RayMaroun_Partners-API) [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=RayMaroun_Partners-API&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=RayMaroun_Partners-API) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=RayMaroun_Partners-API&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=RayMaroun_Partners-API) [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=RayMaroun_Partners-API&metric=bugs)](https://sonarcloud.io/summary/new_code?id=RayMaroun_Partners-API) [![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=RayMaroun_Partners-API&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=RayMaroun_Partners-API)

This project is a simple but powerful API to manage partners.

## Features

- CRUD Operations.
- REST API.
- Repository Pattern.
- Unit Testing.
- Logging.
- Swagger.
- `try` `catch` Error Handling.

## Requirements

- A Windows OS
- [Git](https://github.com/git/git)
- [NodeJs 16+](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)

## Dependencies

- [Jest](https://github.com/facebook/jest)
- [Winston](https://github.com/winstonjs/winston)
- [express](https://github.com/expressjs/express)
- [Typescript 4+](https://www.typescriptlang.org/)

## Set up

1 - Clone this project running `git clone https://github.com/RayMaroun/Partners-API.git` in your terminal. If you haven't git installed can simply download it and unzip it.

2 - Go to the "Partners-API" project and build it to restore the missing packages.

3 - Navigate then using the command line to the "Partners-API" project and use `yarn install` in order to install missing packages.

4-  Before you start, you need a .env.local file with the following params: DATA_SOURCE & PORT
>   Example: `DATA_SOURCE = 'C:\Users\USER\Desktop\partners-api\assets\partners.json'` && `PORT = '8543'`

5 - Run the command `yarn start` to run the project.

6 - Start testing.

### Available scripts

- `build`: Builds api for production
- `start`: Builds and runs the project
- `test`: Run unit tests

### Documentation

API also runs a swagger endpoint for quick api docs, can be accessed on: `{BASE_URL:PORT}/api-docs/swagger`

### Future work

> Improve the design.

> Adding authentication and authorization.