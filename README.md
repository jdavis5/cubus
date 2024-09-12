# Cubus

## Contents

- [Introduction](#introduction)
- [Features](#features)
- [Potential improvements](#app-features)
- [Known issues](#known-issues)
- [Dependencies overview](#dependencies-overview)
- [Environment variables](#environment-variables)
- [Setup overview](#setup-overview)

## Introduction

Cubus is an account management system with tiered subscriptions that uses API keys to interact with a documented API.

The project is a full stack and responsive web application built using the [Next.js](https://nextjs.org/) React framework and [Node.js](https://nodejs.org/). It is strongly typed throughout using [TypeScript](https://www.typescriptlang.org/), also utilising [tRPC](https://trpc.io/) for end-to-end type safety, and [Zod](https://zod.dev/) for input validation, including the validation of environment variables [at build time](#build-time-validation). [Prisma ORM](https://www.prisma.io/orm) is leveraged to provide type-safe database interactions with [MongoDB](https://www.mongodb.com/).

The public API implements RESTful architecture and is documented according to [OpenAPI OAS3](https://swagger.io/specification/v3/) specification. Its error handling employs [RFC 9457 - Problem Details for HTTP APIs](https://www.rfc-editor.org/rfc/rfc9457).

In order to demonstrate more underlying code the project purposely does not rely on an out-of-the-box authentication solution. It also does not utilise any external UI library and instead uses CSS modules with a range of Sass utilities for customised styling and composition.

## Features

### Interactive features

- Account registration
- Account removal (immediate and permanent for this application)
- Account login and logout functionality
- Account profile modification
- 2FA account activation (with verification email)
- 2FA password reset functionality (with verification email)
- 2FA primary email modification (with verification email)
- Tiered subscription comparison and management
- API key generation and management
- An interactive public API requiring key authentication
- Documentation pages for the public API
- Multiple responsive layouts

### Technical features

- Session based authentication
- CSRF protection using the double-submit cookie pattern
- Environment variable validation using Zod schemas, including [build time validation](#build-time-validation)
- Multiple Prisma clients utilising custom extensions
- Zod schemas [generated](https://www.prisma.io/docs/orm/prisma-schema/overview/generators) from a Prisma schema utilising rich comments for detailed customisation of schemas
- A type-safe end-to-end internal API combining tRPC with Zod
- A RESTful public API utilising Next.js API route handlers
- [OpenAPI OAS3](https://swagger.io/specification/v3/) specification that is generated for the versioned public API
- Public API responses using [RFC 9457 - Problem Details for HTTP APIs](https://www.rfc-editor.org/rfc/rfc9457)

## Potential improvements

Improvements and further features that could be added to the project are:

- Additional endpoints and query options to expand upon the public API
- Migrating the project from Pages Router to App Router
- Graphical summaries for API usage on a user dashboard
- Testing
- Review and improvement of component composition
- Additional features that utilise and restrict actions to user roles
- Additional features that are restricted per account plan
- Accessibility
- Internationalisation
- Swap from Babel to the more efficient SWC compilation once the SuperJSON SWC plugin [issues](#swc-compilation-is-disabled) have been resolved

## Known issues

### SWC compilation is disabled

- The default SWC compilation is [disabled](https://nextjs.org/docs/messages/swc-disabled) due to a custom Babel configuration. A `.babelrc` configuration file is necessary in order to use SuperJSON as its SWC plugin experiences issues.

### Pages Router

- Pages Router `NextApiRequest` misses properties that are available on the newer App Router `NextRequest` such as [nextUrl](https://nextjs.org/docs/app/api-reference/functions/next-request#nexturl).

### Prisma issues

#### Migration support

- Prisma Migrate does not currently support the MongoDB connector.

Related:

- [A mental model for Prisma Migrate](https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/mental-model)
- [Prisma Migrate limitations](https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/limitations-and-known-issues#mongodb-connector-not-supported)

#### Generator limitations

- Prisma generators will be unable to reflect any computed fields added by client extensions as a client is created at runtime.

Related:

- [Custom fields](https://www.prisma.io/docs/orm/prisma-client/client-extensions/result)

#### Hot Module Reloading (HMR) issues

When Next.js is used in development mode using the command `next dev` hot module reloading can lead to several complications for Prisma clients.

- A new PrismaClient instance will be created upon each reload and eventually exhaust the database connections as each PrismaClient instance holds its own connection pool. The [recommended solution](https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices#solution) is to create a client singleton client when using development mode.

- An extended PrismaClient instance stored as a singleton will create a closure over the attached custom methods. A more flexible solution is to store the PrismaClient instance as a singleton and to attach any extensions outside of the singleton.

- Class `instanceof` checks such as `instanceof Prisma.PrismaClientKnownRequestError` become unreliable as the PrismaClient instance will be different between reloads. A workaround for this issue is to instead use custom type guard utility methods such as `isPrismaClientKnownRequestError`, found at: `prisma/errors`

Related:

- [Prisma error reference](https://www.prisma.io/docs/orm/reference/error-reference)

#### Database introspection issues

- A [introspected database sample](https://www.prisma.io/docs/orm/prisma-schema/introspection#what-does-introspection-do) dataset may lead to a mismatch between the actual database schema and the generated schema. As the sample used by Prisma is a limited reflection of the entire dataset, a large dataset that has not been normalised may result in Prisma producing an inaccurate schema. This can lead to Prisma throwing an error when interacting with problematic data. Within this project the issue can potentially occur due to the sample "Mflix" dataset used by the client located at `prisma/mflix` as the schema for this external dataset is generated using a `prisma db pull` command during the [initial setup](#initial-setup).

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

| Name | Description |
| :-- | :-- |
| [@hookform/resolvers](https://react-hook-form.com/) | Validation resolvers for React Hook Form |
| [@tanstack/react-query](https://tanstack.com/query/v4/docs/react/adapters/react-query) | Data fetching/caching/synchronisation library |
| [@trpc/client](https://trpc.io/) | Communicate with a tRPC server on the client side |
| [@trpc/next](https://trpc.io/) | Connect a tRPC router to Next.js |
| [@trpc/react-query](https://trpc.io/) | Integrates React Query with tRPC |
| [@trpc/server](https://trpc.io/) | Create tRPC routers and connect them to a server |
| [bcypt](https://github.com/kelektiv/node.bcrypt.js#readme) | Password hashing library |
| [clsx](https://github.com/lukeed/clsx#readme) | Utility for constructing className conditionally |
| [cookie](https://github.com/jshttp/cookie#readme) | Basic HTTP cookie parsing and serialising |
| [date-fns](https://date-fns.org/) | Date manipulation library |
| [jiti](https://github.com/unjs/jiti#readme) | Runtime Typescript and ESM support for Node.js |
| [nanoid](https://github.com/ai/nanoid#readme) | Creates URL friendly unique strings |
| [next](https://nextjs.org/) | Next.js React framework |
| [nodemailer](https://nodemailer.com/) | Sends emails from Node.js |
| [prisma](https://www.prisma.io/) | TypeScript ORM for database modelling and interation |
| [react-error-boundary](https://github.com/bvaughn/react-error-boundary#readme) | React [Error Boundary](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary) component |
| [react-hook-form](https://react-hook-form.com/) | React form library |
| [react-icons](https://react-icons.github.io/react-icons/) | Popular SVG icons |
| [react-transition-group](https://reactcommunity.org/react-transition-group/) | Manages animation state for React components |
| [superjson](https://github.com/blitz-js/superjson#readme) | Provides serialization and deserialization of JavaScript values into a superset of JSON |
| [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) | Generates OpenAPI specification from JSDoc annotations |
| [swagger-ui-react](https://github.com/swagger-api/swagger-ui) | Visualises OpenAPI specification |
| [zod](https://zod.dev/) | TypeScript schema validation and type inference |
| [zxcvbn](https://github.com/dropbox/zxcvbn#readme) | Estimates password strength |

### `devDependencies`

| Name | Description |
| :-- | :-- |
| [@babel/plugin-transform-class-static-block](https://babel.dev/docs/en/next/babel-plugin-transform-class-static-block) | Enables static class block syntax in JavaScript |
| [@trivago/prettier-plugin-sort-imports](https://gialwaysthub.com/trivago/prettier-plugin-sort-imports#readme) | A prettier plugin to sort import declarations by provided Regular Expression order |
| [babel-plugin-superjson-next](https://github.com/blitz-js/babel-plugin-superjson-next#readme) | Adds SuperJSON to Next.js pages |
| [dotenv-cli](https://github.com/entropitor/dotenv-cli#readme) | Loads environment variables |
| [eslint](https://eslint.org/) | Analyses code for issues |
| [eslint-config-next](https://nextjs.org/docs/app/building-your-application/configuring/eslint#eslint-config) | Default configuration used by Next.js |
| [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier#readme) | Configuration for Prettier |
| [husky](https://github.com/typicode/husky#readme) | Management for git hooks |
| [lint-staged](https://github.com/lint-staged/lint-staged#readme) | Runs tasks on staged git files |
| [prettier](https://prettier.io/) | Code formatting |
| [tsx](https://github.com/privatenumber/tsx#readme) | Runs TypeScript from the command line |
| [typescript](https://www.typescriptlang.org/) | TypeScript language |
| [zod-prisma-types](https://github.com/chrishoermann/zod-prisma-types#readme) | Creates Zod schemas and types from Prisma models with rich comment support |

## Environment variables

### Build time validation

This project validates environment variables against Zod schemas at build time.

The environment variables are validated against the following Zod schemas:  
`env/client.js` and `env/server.js`.

Invalid input will cause an error to be thrown.

For detailed information regarding how the environment variables are validated see:  
[env/README.md](./env/README.md)

### Overview of environment variables

| Name | Type | Required | Description |
| :-- | :-- | :-- | :-- |
| `NEXT_PUBLIC_BASE_URL` | Yes | string | Base URL for the application |
| `MAILER_USER` | Yes | string | Email service username |
| `MAILER_PASSWORD` | Yes | string | Email service password |
| `MAILER_HOST` | Yes | string | Email service host |
| `MAILER_PORT` | Yes | number | Email service port |
| `MAILER_SECURE` | Yes | boolean | Email service protocol |
| `MONGODB_URI` | Yes | string | [MongoDB connection URI](https://www.mongodb.com/docs/manual/reference/connection-string/) for the primary database |
| `MONGODB_URI_MFLIX` | Yes | string | [MongoDB connection URI](https://www.mongodb.com/docs/manual/reference/connection-string/) for the [Mflix](https://www.mongodb.com/docs/atlas/sample-data/sample-mflix/) database, used by the public API |
| `API_VERSION` | Yes | number | The current API version |

For an example implementation of environment variables see:  
[.env.example](./.env.example)

## Setup overview

### Prisma setup

#### Overview

Each database connected with this project will have its own [Prisma schema](https://www.prisma.io/docs/concepts/components/prisma-schema), found at:  
`prisma/<name>/schema.prisma`

For example, the primary schema will be located at:  
`prisma/main/schema.prisma`

Generated assets are located relative to their schema, in the following location:  
`./.generated`

For example, the generated primary client will be found relative to its schema, in the following location:  
`prisma/main/.generated/client`

#### Usage

In your terminal run the following convenience script:

```sh
pnpm run prisma:setup
```

This achieves the following:

1. Applies the user-defined schemas to their databases
1. Introspects the databases and updates the schemas for the external datasets
1. Seeds the connected databases
1. Generates Prisma clients and additional assets such as Zod schemas from the provided Prisma schemas
