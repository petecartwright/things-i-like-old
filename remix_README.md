# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

## Development

The following command will run two processes during development when using Architect as your server.

- Your Architect server sandbox
- The Remix development server

```sh
$ npm run dev
```

Your file changes are watched, and assets are rebuilt upon change.

Open up [http://localhost:3333](http://localhost:3333) and you should be ready to go!

## Deploying

Before you can deploy, you'll need to do some setup with AWS:

- First [install the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
- Then [follow the Architect setup instructions](https://arc.codes/docs/en/guides/get-started/detailed-aws-setup).

If you make it through all of that, you're ready to deploy!

1. build the app for production:

   ```sh
   npm run build
   ```

2. Deploy with `arc`

   ```sh
   arc deploy production
   ```

You're in business!

Data structure:

Following the [Composite primary key + the Query API action](https://www.alexdebrie.com/posts/dynamodb-one-to-many/#composite-primary-key--the-query-api-action) pattern here.

We'll have two types of objects - the "Place" which is a parent container for "Thing" objects.

This is small, so we're manually handling data operations. If it got more complex, we'd probably look into [@aws/dynamodb-data-mapper](https://github.com/awslabs/dynamodb-data-mapper-js).
