# skill-sharing-platform-backend

To prepare the development environment, please refer to [Documentations](#documentations)

# Getting started

To get the Node server running locally:

- Clone this repo
- `mv .env.example .env`
- `yarn install` to install all required dependencies
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials))
- `yarn start` to start the local server

# Code Overview

## Dependencies

- [express](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript 
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - For encrypting and decrypting passwords
- [cookie-parser](https://www.npmjs.com/package/cookie-parser) - For parsing a cookie
- [cors](https://www.npmjs.com/package/cors) - For allowing Cross-origin resource sharing
- [dotenv](https://www.npmjs.com/package/dotenv) - For loading environmental variables from a `.env` file
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - For encrypting and decrypting passwords
- [morgan](https://www.npmjs.com/package/morgan) - For logging HTTP requests
- [validator](https://www.npmjs.com/package/validator) - For validating strings



## Application Structure

- `app.js` - The entry point to our application. This file defines our express server.

## Documentations
* [Node version management](https://github.com/tj/n)
* [Yarn documentation](https://legacy.yarnpkg.com/en/docs)
