# Environment variable schema validation

- [Introduction](#introduction)
- [Build time validation](#build-time-validation)
- [Client-side considerations](#client-side-considerations)
- [Defining the environments](#defining-the-environments)
- [Using the environments](#using-the-environments)

## Introduction

This project requires that environment variables be validated against a [Zod](https://zod.dev/) schema.

The approach takes advantage of JSDoc comments for type safety within JavaScript and to enforce certain additional rules at compile time.

Validated environment variables will also benefit from autocompletion when imported into the appropriate context.

Environment variable schemas are defined in the following files:

- `env/server.js` defines variables available in the server environment.
- `env/client.js` defines variables compiled into the client-side bundle at build time.

These schemas are validated during the build process.

## Build time validation

The environment variable schemas defined in `env/server.js` and `env/client.js` are validated at build time through their inclusion in `next.config.js`.

If the provided environment variables do not pass validation, an error will be thrown and the issues will be displayed on the console.

## Client-side considerations

### Prefixing environment variables

The browser runs in a different environment than the server and cannot access `process.env` at runtime. To expose environment variables to client-side code, references are replaced with their literal values during the build process. This ensures that variables are embedded directly into the JavaScript bundle sent to the browser.

To enable this behaviour, environment variables intended for the client must be prefixed with `NEXT_PUBLIC_`.

> [!IMPORTANT]  
> **Never** prefix sensitive environment variables with `NEXT_PUBLIC_`.  
> These variables will be included as literal values in the client bundle, making them publicly accessible.

Related:

- [Bundling environment variables for the browser](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#bundling-environment-variables-for-the-browser)

### Bundler limitations

During the build process, references to `process.env` properties in client-side code are replaced with their literal values. This occurs through static analysis, where the code is analysed but not executed. Consequently, only properties referenced with explicit keys can be resolved and substituted with their corresponding values.

Dynamic referencing of `process.env` properties, such as accessing them through variables or expressions, cannot be replaced during the build process. The expression remains in the output and is evaluated in the browser, where `process.env` is not defined, resulting in `undefined`.

#### Incorrect usage

```js
// Using a variable key means the bundler cannot determine the value at build time.
const key = 'NEXT_PUBLIC_EXAMPLE'
console.log(process.env[key])
```

When dynamically referencing a property using a variable, the bundler cannot determine the intended key at build time. The expression is left unchanged in the build output and is evaluated in the browser, where `process.env` is not defined, resulting in `undefined`.

#### Correct usage

```js
// Using an explicit key means the bundler can substitute the value during the build process.
console.log(process.env.NEXT_PUBLIC_EXAMPLE)
console.log(process.env['NEXT_PUBLIC_EXAMPLE'])
```

Because the keys are written explicitly as literals, the bundler can replace them with their corresponding values during the build process.

### Additional runtime definition

Due to the [bundler limitations](#bundler-limitations), client environments require an additional `runtime` object alongside the `schema`. This `runtime` object must include the same keys as those defined in the `schema`, with explicit references to `process.env` properties to ensure they are correctly bundled:

```js
context: 'client',
schema: {
  NEXT_PUBLIC_EXAMPLE: z.string()
},
runtime: {
  NEXT_PUBLIC_EXAMPLE: process.env['NEXT_PUBLIC_EXAMPLE']
}
```

> [!IMPORTANT]  
> Keys that are present in `schema`, but missing from `runtime`, will result in a type error.

## Defining the environments

### Schema objects

The `schema` is an object that defines how each environment variable should be parsed and validated using [Zod](https://zod.dev/):

- Each key in the schema object must exactly match the corresponding variable name in your `.env` file.
- Each value should be a Zod schema describing the expected format of that variable.

For example, given the following `.env` file:

```bash
API_PORT=8080
API_URL=https://api.example.com
ENABLE_FEATURE=true
```

You would define the `schema` as:

```js
schema: {
  API_PORT: z.coerce.number().int().positive(),
  API_URL: z.string().url(),
  ENABLE_FEATURE: z.coerce.boolean()
}
```

> [!IMPORTANT]  
> Do not wrap the `schema` object with `z.object()`, as this is handled for you internally.

### Primitive coercion

All environment variables defined in `.env` files are loaded into `process.env` as string values, regardless of their intended type.

To simplify schema definitions and ensure consistent coercion, a set of utility schemas are provided in `env/core/schema-utils.js` as the default export:

```js
import envUtils from './core/schema-utils'
```

Each utility can be used as a building block when defining your environment schema:

```js
schema: {
  API_PORT: envUtils.number.int().positive(),
  API_URL: envUtils.string.url(),
  ENABLE_FEATURE: envUtils.boolean
}
```

This approach ensures that values are properly coerced and validated at build time.

### Defining the client environment

> [!IMPORTANT]  
> Client environment values are publicly exposed and **must not** include sensitive information.  
> Define any sensitive environment variables **only** in the [server environment](#defining-the-server-environment).

**File**: `env/client.js`

```js
import { createEnv } from './core/create-env'
import envUtils from './core/schema-utils'

const client = createEnv({
  // Client environment.
  context: 'client',

  // Schema mapping environment variables to Zod schemas.
  // Keys must be prefixed with `NEXT_PUBLIC_`.
  schema: {
    NEXT_PUBLIC_VALUE: envUtils.number.gt(10)
  },

  // Ensures that selected environment values are included in the client bundle.
  // Must include all keys defined in `schema`.
  runtime: {
    NEXT_PUBLIC_VALUE: process.env['NEXT_PUBLIC_VALUE']
  }
})

export default client
```

### Defining the server environment

**File**: `env/server.js`

```js
import { createEnv } from './core/create-env'
import envUtils from './core/schema-utils'

const server = createEnv({
  // Server environment.
  context: 'server',

  // Schema mapping environment variables to Zod schemas.
  schema: {
    PROXY_URL: envUtils.string.url()
  }
})

export default server
```

### Defining a server environment with client variables

The server schema can also include any necessary client variables.

**File**: `env/server.js`

```js
import { createEnv } from './core/create-env'
import envUtils from './core/schema-utils'

const server = createEnv({
  // Server environment.
  context: 'server',

  // Schema mapping environment variables to Zod schemas.
  // Client variables can also be included for the server environment.
  schema: {
    PROXY_URL: envUtils.string.url(),
    NEXT_PUBLIC_VALUE: envUtils.number.gt(10)
  }

  // No `runtime` property is required for the server environment.
})

export default server
```

> [!NOTE]  
> The `runtime` object is only necessary when defining the client environment. This enables the build process to include environment variables that are needed in the browser. On the server, these variables are accessible at runtime and do not need to be declared in advance. For more details, see [Additional runtime definition](#additional-runtime-definition).

## Using the environments

The defined environment variables are available for import and will benefit from autocompletion.

### Usage on the server

It is recommended to [include necessary client variables](#defining-a-server-environment-with-client-variables) with your server environment, rather than importing `env/client` in a server context.

```js
import env from 'env/server'

async function proxyFetch(options) {
  await fetch(env.PROXY_URL, {
    method: 'POST',
    body: JSON.stringify({
      example: env.NEXT_PUBLIC_VALUE
    }),
    headers: {
      'Content-Type': 'application/json'
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
  // Accessing `PROXY_URL` is forbidden in a client context.
  // This will throw an error.
  return <div>{env.PROXY_URL}</div>
}
```
