# Cubus

- [Introduction](#introduction)
- [Features](#features)
- [Security notice](#security-notice)
- [Potential improvements](#potential-improvements)
- [Known issues](#known-issues)
- [Dependencies overview](#dependencies-overview)
- [Environment variables](#environment-variables)
- [Getting started](#getting-started)
- [Advanced topics](#advanced-topics)

## Introduction

Cubus is a full-stack SaaS application providing user account management, API key generation, and tiered access control based on subscription level, with a documented RESTful API secured via API key authentication.

This project is a responsive web application built with [React](https://react.dev/) and the [Next.js](https://nextjs.org/) framework, running on [Node.js](https://nodejs.org/). It is strongly typed throughout with [TypeScript](https://www.typescriptlang.org/), and uses [tRPC](https://trpc.io/) and [Prisma ORM](https://www.prisma.io/orm) to provide end-to-end type safety, including database interactions with [MongoDB](https://www.mongodb.com/). User input and [environment variables at build time](#build-time-validation) are validated using [Zod](https://zod.dev/). The public API is documented according to the [OpenAPI OAS3](https://swagger.io/specification/v3/) standard, and its error handling complies with [RFC 9457 - Problem Details for HTTP APIs](https://www.rfc-editor.org/rfc/rfc9457).

Authentication is handled with custom logic, avoiding third-party libraries to make architectural and design decisions more visible. External UI libraries are also excluded in favour of CSS Modules and Sass utilities, which provide scoped, modular, and maintainable styles.

> [!NOTE]  
> This project was originally developed during 2024–2025 and is not under active development.

## Features

### Interactive features

- Account registration
- Account removal (immediate and permanent for this application)
- Account login and logout
- Account profile management
- Account activation via verification email
- Password reset via verification email
- Primary email modification via verification email
- Tiered subscription comparison and management
- API key generation and management
- An interactive public API requiring API key authentication
- Documentation pages for the public API
- Multiple responsive layouts

### Technical features

- Session-based authentication
- Cross-Site Request Forgery (CSRF) protection using the double-submit cookie pattern
- [Validation and type safety for Next.js environment variables](#validation-of-environment-variables) 
- Multiple Prisma clients utilising [custom extensions](https://www.prisma.io/docs/orm/prisma-client/client-extensions)
- Zod schemas [generated](https://www.prisma.io/docs/orm/prisma-schema/overview/generators) from [comment enhanced](https://www.prisma.io/docs/orm/prisma-schema/overview#comments) Prisma models
- A type-safe end-to-end internal API combining tRPC with Zod
- A RESTful public API utilising Next.js API route handlers
- [OpenAPI OAS3](https://swagger.io/specification/v3/) specification that is generated for the versioned public API
- Public API responses using [RFC 9457 - Problem Details for HTTP APIs](https://www.rfc-editor.org/rfc/rfc9457)

## Potential improvements

Improvements and further features that could be added to the project are:

- Migration from the [Pages Router](https://nextjs.org/docs/pages) to the [App Router](https://nextjs.org/docs/app)
- Addition of endpoints and query options to expand the public API
- Implementation of graphical API usage summaries on a user dashboard
- Implementation of a comprehensive testing suite
- Addition of role-based access control features
- Addition of account plan–specific features
- Implementation of accessibility best practices
- Support for internationalisation and localisation
- Transition from Babel to SWC compilation, pending resolution of [SuperJSON plugin issues](#swc-compilation-is-disabled)

## Known issues

### Disabled SWC compilation

- The default SWC compilation is [disabled](https://nextjs.org/docs/messages/swc-disabled) due to a custom Babel configuration. A `.babelrc` configuration file is necessary in order to use SuperJSON as its SWC plugin experiences issues.

### Pages Router issues

#### Progressive form enhancement

- In the [Pages Router](https://nextjs.org/docs/pages), when a form is submitted with a POST request to a page using `getServerSideProps`, the request body is not automatically parsed and will be `undefined` unless parsed manually. The standard practice is to handle form submissions with client-side JavaScript that sends data to an [API route](https://nextjs.org/docs/pages/building-your-application/routing/api-routes). However, this breaks native HTML form behavior when JavaScript is disabled. The newer [App Router](https://nextjs.org/docs/app) addresses these limitations by providing native support for form submissions and improved server-side form handling via [Server Actions](https://nextjs.org/docs/13/app/building-your-application/data-fetching/server-actions-and-mutations#forms).

#### Request type properties

- The `NextApiRequest` type in the Pages Router lacks properties such as [nextUrl](https://nextjs.org/docs/app/api-reference/functions/next-request#nexturl), which are present in the newer App Router `NextRequest` type.

### Prisma issues

#### Migration support

- Prisma Migrate does not currently support the MongoDB connector.

Related:

- [A mental model for Prisma Migrate](https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/mental-model)
- [Prisma Migrate limitations](https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/limitations-and-known-issues#mongodb-connector-not-supported)

#### Generator limitations

- [Prisma generators](https://www.prisma.io/docs/orm/prisma-schema/overview/generators) modify the output of a generated Prisma client and produce additional assets, such as Zod schemas, during the client generation process. Since [client extensions](https://www.prisma.io/docs/orm/prisma-client/client-extensions) are applied at runtime, any [custom fields](https://www.prisma.io/docs/orm/prisma-client/client-extensions/result) introduced after the client has been generated will not automatically be reflected in these generated assets. To ensure the client is accurately typed, the generated Zod schemas will need to be manually extended with any custom fields.

#### Hot Module Reloading (HMR) issues

When Next.js is used in development mode using the command `next dev` hot module reloading can lead to several complications for Prisma clients.

- A new PrismaClient instance will be created upon each reload and eventually exhaust the database connections as each PrismaClient instance holds its own connection pool. The [recommended solution](https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices#solution) is to create a client singleton client when using development mode.

- An extended PrismaClient instance stored as a singleton will create a closure over the attached custom methods. A more flexible solution is to store the PrismaClient instance as a singleton and to attach any extensions outside of the singleton.

- Class `instanceof` checks such as `instanceof PrismaClientKnownRequestError` become unreliable as the PrismaClient instance will be different between reloads. A workaround for this issue is to instead use custom type guard utility methods such as `isPrismaClientKnownRequestError`, located at `prisma/errors`.

Related:

- [Prisma error reference](https://www.prisma.io/docs/orm/reference/error-reference)

#### Database introspection issues

- An [introspected database](https://www.prisma.io/docs/orm/prisma-schema/introspection#what-does-introspection-do) sample dataset may lead to a mismatch between the actual database schema and the generated schema. As the sample used by Prisma is a limited reflection of the entire dataset, a large dataset that has not been normalised may result in Prisma producing an inaccurate schema. This can lead to Prisma throwing an error when interacting with problematic data. Within this project the issue can potentially occur due to the sample "Mflix" dataset used by the Prisma client located at `prisma/mflix`, as the schema for this external dataset is generated using a `prisma db pull` command during [Initialising connected databases with Prisma](#initialising-connected-databases-with-prisma).

Related:

- [Prisma CLI reference](https://www.prisma.io/docs/orm/reference/prisma-cli-reference)

#### Client API issues

- Prisma [query filter conditions](https://www.prisma.io/docs/orm/reference/prisma-client-reference#filter-conditions-and-operators) do not narrow the resulting return type. These conditions are useful to narrow the result set or trigger an error from a Prisma `OrThrow` query method. As the result type will not be narrowed type assertions will be required in order to reflect the true underlying type.

- There is no available data mapping for the [Decimal](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#decimal) type for MongoDB. [String is the recommended alternative.](https://github.com/prisma/prisma/issues/12637)

- Prisma does not support [case-insensitive scalar filtering](https://github.com/prisma/prisma/issues/8387) or [case-insensitive sorting](https://github.com/prisma/prisma/issues/5068). This will likely necessitate [raw queries](https://www.prisma.io/docs/orm/prisma-client/queries/raw-database-access/raw-queries#raw-queries-with-mongodb) if alternative approaches cannot be otherwise considered.

Related:

- [Case sensitivity](https://www.prisma.io/docs/orm/prisma-client/queries/case-sensitivity)
- [Filtering scalar lists](https://www.prisma.io/docs/orm/prisma-client/queries/filtering-and-sorting#filter-on-scalar-lists--arrays)
- [MongoDB connector overview](https://www.prisma.io/docs/orm/overview/databases/mongodb)
- [NoSQL and MongoDB feature support](https://www.prisma.io/docs/reference/database-reference/database-features#nosql-database-features)

## Dependencies overview

A list of dependencies added to the project can be found below.

### `dependencies`

| Package | Description |
| --- | --- | --- |
| [@hookform/resolvers](https://react-hook-form.com/) | Validation resolvers for React Hook Form |
| [@tanstack/react-query](https://tanstack.com/query/v4/docs/react/adapters/react-query) | Data fetching, caching and synchronisation |
| [@trpc/client](https://trpc.io/) | tRPC client for server communication |
| [@trpc/next](https://trpc.io/) | tRPC router integration for Next.js |
| [@trpc/react-query](https://trpc.io/) | React Query integration for tRPC |
| [@trpc/server](https://trpc.io/) | tRPC routers and server integration |
| [bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme) | Password hashing |
| [clsx](https://github.com/lukeed/clsx#readme) | Conditional className construction | # |
| [cookie](https://github.com/jshttp/cookie#readme) | HTTP cookie parsing and serialization |
| [date-fns](https://date-fns.org/) | Date manipulation and formatting |
| [jiti](https://github.com/unjs/jiti#readme) | Node.js loader for TypeScript and ECMAScript modules with extensionless imports |
| [nanoid](https://github.com/ai/nanoid#readme) | URL friendly unique ID generation |
| [next](https://nextjs.org/) | React framework |
| [nodemailer](https://nodemailer.com/) | Email delivery for Node.js |
| [prisma](https://www.prisma.io/) | TypeScript ORM for database modelling and querying |
| [react-error-boundary](https://github.com/bvaughn/react-error-boundary#readme) | [Error boundary](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary) component for React |
| [react-hook-form](https://react-hook-form.com/) | Form handling for React |
| [react-icons](https://react-icons.github.io/react-icons/) | Popular SVG icons for React |
| [react-transition-group](https://reactcommunity.org/react-transition-group/) | Animation state management for React components |
| [superjson](https://github.com/blitz-js/superjson#readme) | Serialisaton and deserialisation of JSON with additional types |
| [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) | OpenAPI specification generation from JSDoc comments |
| [swagger-ui-react](https://github.com/swagger-api/swagger-ui) | OpenAPI documentation visualisation for React |
| [zod](https://zod.dev/) | TypeScript schema validation |
| [zxcvbn](https://github.com/dropbox/zxcvbn#readme) | Password strength estimation |

### `devDependencies`

| Name | Description |
| :-- | :-- |
| [@babel/plugin-transform-class-static-block](https://babel.dev/docs/en/next/babel-plugin-transform-class-static-block) | Static class block syntax in JavaScript |
| [@trivago/prettier-plugin-sort-imports](https://gialwaysthub.com/trivago/prettier-plugin-sort-imports#readme) | Import declaration sorting by Regular Expression |
| [babel-plugin-superjson-next](https://github.com/blitz-js/babel-plugin-superjson-next#readme) | SuperJSON integration for Next.js pages |
| [dotenv-cli](https://github.com/entropitor/dotenv-cli#readme) | Environment variable loading for CLI commands |
| [env-nextjs](https://github.com/jdavis5/env-nextjs) | Validation and type safety for Next.js environment variables |
 | [eslint](https://eslint.org/) | Code analysis for JavaScript and TypeScript |
| [eslint-config-next](https://nextjs.org/docs/app/building-your-application/configuring/eslint#eslint-config) | Default Next.js ESLint configuration |
| [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier#readme) | ESLint configuration to disable Prettier conflicts |
| [husky](https://github.com/typicode/husky#readme) | Git hook management |
| [lint-staged](https://github.com/lint-staged/lint-staged#readme) | Pre-commit tasks for staged git files |
| [prettier](https://prettier.io/) | Code formatting |
| [tsx](https://github.com/privatenumber/tsx#readme) | TypeScript runtime for scripts |
| [typescript](https://www.typescriptlang.org/) | TypeScript language |
| [zod-prisma-types](https://github.com/chrishoermann/zod-prisma-types#readme) | Prisma generator for Zod schemas and types with rich comments |

## Environment variables

### Validation of environment variables

This project uses [env-nextjs](https://github.com/jdavis5/env-nextjs) to provide build-time validation and type-safe environment variables in Next.js.

### Overview of environment variables

| Name | Required | Type | Description |
| :-- | :-- | :-- | :-- |
| `NEXT_PUBLIC_BASE_URL` | Yes | string | Base URL for the application |
| `MAILER_USERNAME` | Yes | string | Email service username |
| `MAILER_PASSWORD` | Yes | string | Email service password |
| `MAILER_HOST` | Yes | string | Email service host |
| `MAILER_PORT` | Yes | number | Email service port |
| `MAILER_SECURE` | Yes | boolean | Email service protocol |
| `MONGODB_URI` | Yes | string | [MongoDB connection URI](https://www.mongodb.com/docs/manual/reference/connection-string/) for the primary database |
| `MONGODB_URI_MFLIX` | Yes | string | [MongoDB connection URI](https://www.mongodb.com/docs/manual/reference/connection-string/) for the [Mflix](https://www.mongodb.com/docs/atlas/sample-data/sample-mflix/) database, used by the public API |
| `API_VERSION` | Yes | number | The current API version |

For an example implementation of environment variables, see [.env.example](./.env.example)

## Getting started

### Cloning the repository

Run the following to clone the repository and navigate to the project root:

```sh
git clone https://github.com/jdavis5/cubus.git
cd cubus
```

### Installing dependencies

> [!IMPORTANT]  
> Before installing the dependencies, define the required [environment variables](#overview-of-environment-variables) in an `.env` file.

Install the dependencies with the following command:

```sh
pnpm install
```

This command automatically runs the following post-installation steps:

- [Generating from Prisma schemas](#generating-from-prisma-schemas)

> [!NOTE]  
> After installation, make sure your IDE is using the workspace TypeScript version.  
> This enables the [Next.js IDE plugin](https://nextjs.org/docs/app/api-reference/config/typescript#ide-plugin) and prevents errors caused by TypeScript version mismatches.

### Initialising connected databases

> [!IMPORTANT]  
> Skip this step if your databases are already set up, as Prisma clients and their related assets are automatically generated during [Installing dependencies](#installing-dependencies).

Apply your schemas, seed data, and generate Prisma clients by running:

```sh
pnpm init
```

This command performs the following:

- [Initialising connected databases with Prisma](#initialising-connected-databases-with-prisma)

### Running the application

You can run the application locally in production mode, which serves an optimised production build.

Build the application before starting it:

```sh
pnpm build
```

Then start the application:

```sh
pnpm start
```

By default, the application will be available at [http://localhost:3000/](http://localhost:3000/).

You can specify a custom port in several ways:

- Using the `-p` flag: `pnpm start -p 8080`
- Using the `--port` flag: `pnpm start --port 8080`
- Using the `PORT` environment variable: `PORT=8080 pnpm start`

> [!IMPORTANT]  
> The `PORT` environment variable cannot be set in `.env` files, as the server starts before any environment variables are loaded.

## Advanced topics

### Initialising connected databases with Prisma

> [!IMPORTANT]  
> This script is included as part of [Initialising connected databases](#initialising-connected-databases).  
> Only run this command if you need to initialise Prisma separately, such as when reinitialising assets without resetting all connected databases.

To initialise all connected databases using Prisma, the following command is available:

```sh
pnpm prisma:init
```

This command performs the following:

- Applies user-defined schemas to the connected databases.
- Introspects the databases and updates schemas for external datasets.
- Seeds connected databases.
- Generates clients and their additional assets from the provided schemas.

### Prisma schemas and generated output

Each database connected with this project has its own [Prisma schema](https://www.prisma.io/docs/concepts/components/prisma-schema), located at:

`prisma/<name>/schema.prisma`.

For example, the primary schema is located at:

`prisma/main/schema.prisma`.

Generated assets are located relative to their schema in the `./generated` directory.

For example, the generated primary client is located relative to its schema at:

`prisma/main/generated/client`.

### Generating from Prisma schemas

> [!IMPORTANT]  
> This script is included as part of [Initialising connected databases with Prisma](#initialising-connected-databases-with-prisma).  
> Only run this command if your Prisma schema has changed and you need to regenerate assets without reinitialising all connected databases.

To generate all Prisma clients and their related assets, such as Zod schemas, the following command is available:

```sh
pnpm prisma:generate
```
