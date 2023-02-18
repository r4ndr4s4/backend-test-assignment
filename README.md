# xund-backend-test-assignment

## Setup
- Run `npm install`
- Copy `.env.sample` to `.env` and fill it with the desired port and your postgresql database connection string
- Run the database setup sql scripts in the provided order (`database` folder)
OR
- Copy the `DATABASE_CONNECTION_STRING` from this link to save yourself some time with the setup: [https://pastebin.com/YiWP0tRi](https://pastebin.com/YiWP0tRi)
- Run `npm run start:dev`

I provided an Insomnia API documentation export file in the `api` folder for easier testing.

## Notes
- I copied some configuration files (partially) from one of our projects to save myself some time configuring things/avoiding incompatibility issues. Some of them are: `tsconfig.json, .prettierrc, .eslintrc.js, .editorconfig, package.json`. This is the reason why some of the project's dependencies are older versions too.
- The way I identify users is every request is required to have an `X-Auth-User-Email` header with the authenticated user's email.

## Questions
- The specification mentions a REPORTER role several times, but it is not clear to me, how will a user become one. I ended up not implementing this role.
- The specification says "Users can add new users to the database.". Considering all endpoints are authenticated, it's not specified how the first user will be created. I create an initial user (with email: admin@admin.com) as part of the setup who can be used to create the first real user.
- Also from the specification: "Individual User details can be requested". My question would be is it granted for any role? I implemented it this way (as a simple authenticated endpoint).