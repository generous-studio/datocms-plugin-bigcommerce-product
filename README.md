# DatoCMS BigCommerce product plugin
![BigCommerce plugin by generous.studio](docs/cover.jpg)

Select a product from your BigCommerce store

## Configuration

You'll have to provide your store's GraphQL endpoint and the respective authorization token.
![Plugin's configuration](docs/config.png)

### Getting the GraphQL endpoint
This url is typically of the form `https://store-HASH.mybigcommerce.com/graphql`, where HASH is the store hash required by the management API.

Alternatively, you can go to your store's dashboard > Advanced Settings > Storefront API playground, and copy the url from there.

### Getting the access token
1. Generate an API key with the "Storefront API Tokens" permission. [More information here.](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication#obtaining-store-api-credentials)
2. Get the GraphQL API authorization token. You can read more about it [here](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview#authentication) or send the request from [here](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview#authentication).
   * You'll have to specify a `expires_at` clause;
   * And also the `allowed_cors_origins`. This needs to be "https://unpkg.com", since plugins are served from there.


## Development

Install all the project dependencies with:

```
yarn install
```


Add this plugin in development mode to one of your DatoCMS project with:

```
yarn addToProject
```

Start the local development server with:

```
yarn start
```

The plugin will be served from [http://localhost:5000/](http://localhost:5000/). Insert this URL as the plugin [Entry point URL](https://www.datocms.com/docs/plugins/creating-a-new-plugin/).

You'll also need to create a GraphQL access token for this specific host.
