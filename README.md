# Udacity Project: StoreFront API Service
Udacity Project: StoreFront API Service
contact: gerardo@onetechdude.com

<div id="top"></div>

## About Project

StoreFront API Service

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

The web service was based on NodeJS + TypeScript Syntax

## Getting Started

### 1. Installation Steps

- POSTGRES Database Install
- Download/Clone Repo to Local Machine
- Run "npm install" to instaell required development packages
- Create a .env file under the root folder of the project.

### 2. Environment File Setting Example

````
NODE_ENV=dev
BCRYPT_PEPPER=Udacity
BCRYPT_SALT=5
TOKEN_SECRET=Pr0j3ct
PORT=5000

PG_HOST=localhost
PG_DB=store_dev
PG_USER=postgres
PG_PASS=Password00

PGT_HOST=localhost
PGT_DB=store_test
PGT_USER=postgres
PGT_PASS=Password00
````

### 3.  DB Creation and Migrations

The solution requires the following databases to be created. The tool `db-migrate` can be utilized to migrate 
database data so development does not get interrupted while database structure and service is being tested.

**Development Database**
```
CREATE DATABASE store_dev;
```

**Test/Production Database**
```
CREATE DATABASE store_test;
```

### 4. NPM Commands

```
    "watch"  : "tsc-watch --esModuleInterop src/server.ts --outDir ./dist --onSuccess 'node ./dist/server.js'",
    "format" : "prettier --config .prettierrc 'src/**/*.ts' --write",
    "test"   : "export ENV=test && db-migrate --env test down --count 6 && db-migrate --env test up && jasmine-ts --config jasmine.json && db-migrate --env test down --count 6",
    "lint"   : "eslint src/ --ext .ts,.tsx",
    "build"  : "tsc -p tsconfig.json",
    "start"  : "nodemon --ext ts --delay 100ms src/server.ts "
```

- watch: This will activate watch mode and rebuild project when file changes are detected.
- format: The command will lint format the code based on eslint rules ('airbnb')
- lint: Report lint errors identified within the code.
- test: Utilizes jasmine and supertest modules to test the api endpoints and models.
- build: Build distribution version of the project for production install.
- start: Start the project in development mode for code testing.

### 5. Logging
The service utilized its own logging system for troubleshooting. This will be located under /logs/ folder.

````
$[2022-01-10 21:31:39:3139 [32minfo[39m: server started | port: 5000 | mode: test
$[2022-01-10 21:32:52:3252 [32minfo[39m: server started | port: 5000 | mode: test
$[2022-01-10 21:34:03:343 [32minfo[39m: server started | port: 5000 | mode: test
$[2022-01-10 21:34:35:3435 [32minfo[39m: server started | port: 5000 | mode: test
$[2022-01-10 21:34:58:3458 [32minfo[39m: server started | port: 5000 | mode: test
$[2022-01-11 09:15:31:1531 [32minfo[39m: server started | port: 5000 | mode: test
$[2022-01-11 09:32:00:320 [32minfo[39m: server started | port: 5000 | mode: dev
````

### 6. Other Notes

- The API service by default is started using port 5000 this can be changes in the .env file.
- Check REQUIREMENTS.md for more details on API usage and guidelines.

Create the models for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. Remember that these models should all have test suites and mocks.


## Contact
Antonio Garcia
Mail: gerardo@onetechdude.com

<p align="right">(<a href="#top">back to top</a>)</p>
