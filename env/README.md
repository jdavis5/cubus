# Environment variable schema validation

## Contents

- [Introduction](#introduction)
- [Build time validation](#build-time-validation)
- [Multiple environments](#multiple-environments)
- [Defining the environments](#defining-the-environments)
- [Using the environments](#using-the-environments)

---

## Introduction

This project requires that environment variables are validated against a [Zod](https://zod.dev/) schema.

The approach has taken advantage of JSDoc comments for type safety within JavaScript, and to enforce certain additional rules at compile time.

Imported variables into a desired context will benefit from autocompletion.

## Build time validation

The exposed schemas are validated at build time. This is achieved by importing `env/server` and `env/client` into `next.config.js`

If the provided environment variables do not pass validation, an error will be thrown and the issues are displayed on the console.

## Multiple environments

The browser runs in a different environment to the server and will not be able to access environment variables. In order to get around this problem the Next.js framework can inline references into a hard-coded value at build time.

In order to achieve this a `NEXT_PUBLIC_` prefix is used.

Related:

- [Bundling environment variables for the browser](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#bundling-environment-variables-for-the-browser)

### Bundler limitations

To ensure that properties found in `process.env` can be properly inlined by the bundler, they must be referenced directly. Dynamically referencing a property will not work as expected.

```js
// Bad
const name = 'MY_VARIABLE'
process.env[name]

// Good
process.env['MY_VARIABLE']
process.env.MY_VARIABLE
```

In order to guarantee that each required property of `process.env` is correctly bundled, the client environment requires a `runtime` object that references each property:

```js
{
  runtime: {
    MY_VARIABLE: process.env['MY_VARIABLE']
  }
}
```

## Defining the environments

### Schema objects

A schema object consists of a key and a [Zod](https://zod.dev) schema. The key must match the variable name found in your `.env` file. The schema will be used to parse its value.

#### Example

Environment variable:

```bash
export VARIABLE_ONE = 123
export VARIABLE_TWO = 'hello world'
```

Schema:

```js
{
  VARIABLE_ONE: z.coerce.number().int().positive(),
  VARIABLE_TWO: z.string().startsWith('hello')
}
```

### Primitive coercion

A variable defined in your `.env` file will have a type of string by default.  
To provide appropriate coercion some utility schemas have been included to create a base for your schemas:  
`env/core/env-schemas.js`

### Defining the client environment

Located at:  
`env/client.js`

```js
import { createEnv } from 'env/core/create-env'
import { envNumber } from 'env/core/env-schemas'

const client = createEnv({
  /**
   * Definitions for a client context.
   */
  context: 'client',
  /**
   * An object containing keys mapped to a valid Zod schema.
   * Object keys in a client context must have a `NEXT_PUBLIC_` prefix.
   */
  schema: {
    NEXT_PUBLIC_VALUE: envNumber.gt(10)
  },
  /**
   * Each value within the client schema object must also be provided in the runtime object.
   * This ensures the value is present after bundling.
   */
  runtime: {
    NEXT_PUBLIC_VALUE: process.env['NEXT_PUBLIC_VALUE']
  }
})

export default client
```

### Defining the server environment

Located at:  
`env/server.js`

```js
import { createEnv } from 'env/core/create-env'
import { envString } from 'env/core/env-schemas'

const server = createEnv({
  /**
   * Definitions for a server context.
   */
  context: 'server',
  /**
   * An object containing keys mapped to a valid Zod schema.
   */
  schema: {
    PROXY_URL: envString.url()
  }
})

export default server
```

### Defining a server environment with client schemas

The server schema can also include any desired client variables:

```js
import { createEnv } from 'env/core/create-env'
import { envNumber, envString } from 'env/core/env-schemas'

const server = createEnv({
  context: 'server',
  /**
   * Additional client variables necessary for a server context can also be included here.
   * `runtime` is not required for the server schema.
   */
  schema: {
    PROXY_URL: envString.url(),
    NEXT_PUBLIC_VALUE: envNumber.gt(10)
  }
})

export default server
```

## Using the environments

The defined environment variables are available for import and will benefit from autocompletion.

### Usage on the server

It is recommended to also [include desired client variables](#defining-a-server-environment-with-client-schemas) with your server environment rather than importing `env/client` in a server context.

```js
import env from 'env/server'

async function proxyFetch(options) {
  await fetch(env.PROXY_URL, {
    method: 'POST',
    body: JSON.stringify({
      example: env.NEXT_PUBLIC_VALUE
    },
    headers: {
      "Content-Type": "application/json",
    }
  })
}
```

### Usage on the client

```js
import env from 'env/client'

export function ExampleComponent() {
  return (
    <div>
      <ShowValue value={env.NEXT_PUBLIC_VALUE} />
    </div>
  )
}
```

### Accessing a server variable on the client

Attempting to access server variables in a client context will throw an error.

```js
import env from 'env/server'

export const ExampleComponent = () => {
  /**
   * Accessing `PROXY_URL` is forbidden in a client context.
   * This will throw an error.
   */
  return <div>{env.PROXY_URL}</div>
}
```
