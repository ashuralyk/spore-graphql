# spore-graphql

Spore Graphql is a Graphql Layer designed to simplify Spore data queries. It can be easily integrated into applications, allowing you to retrieve the desired data based on your specific needs.

## Installation

Install `spore-graphql` as a dependency using any package manager, such as `npm`:

```shell
npm install spore-graphql @spore-sdk/core --save
```

## How to use

- Integrating into your application (using Next.js as an example)

  ```typescript
  // app/api/graphql/route.js
  import { startSporeServerNextHandler } from 'spore-graphql/next';
  import { predefinedSporeConfigs } from '@spore-sdk/core';
  
  const handler = startSporeServerNextHandler(predefinedSporeConfigs.Aggron4);
  export { handler as GET, handler as POST };
  ```
  
- Fetch data with GraphQL client

  ```typescript
  import { request, gql } from 'graphql-request'

  // Get the first 10 spores and their cluster names
  const document = gql`
    {
      spores {
        id
        contentType
        cluster {
          name
        }
      }
    }
  `
  await request('/api/graphql/', document)
  ```
  
  You can use any GraphQL client you like to make requests, and you can debug your query on the [Spore GraphQL Explorer](https://spore-graphql.vercel.app) provided by us.

## Queries
We have provided some commonly used queries.

- Get top clusters (sort by the number of spores)
  ```graphql
  query GetTopClustersQuery {
    topClusters {
      name
      id
      description
    }
  }
  ```
  [Open in GraphQL Explorer >>](https://spore-graphql.vercel.app/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAOIIoAqEADgMIA2MAzivkwIq6FHAA6SRIihoNmrPEx79BgpAENE0mQEswSwWARMoeZdRTKISJQF9%2BZpCBNA)

- Get spore by id, including its cluster
  ```graphql
  query GetSporeById {
    spore(id: "0x95e5d57b6a9b2b35f26a8ade93e48ed736283ca2ca860654b809f8a1b9b8c8eb") {
      id
      contentType
      content
      cluster {
        id
        name
        description
      }
    }
  }
  ```
  [Open in GraphQL Explorer >>](https://spore-graphql.vercel.app/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAOIIoDKADhHggEIECSYRwAOkkUQM410AKAJZh0RdiAAMADwCcAVgTyw8gOwAjAGwBDWeoBM6gMzyAZvp0AObWASyjCACyWEYVUc37LRqNv2-LTUlNeUd1S0lZU2sARnU9SygXdQkASjZObm4RTKyoCFRkFAAVAioEXO58wtRKoigAGxgeFHwMrizssDruJG1EHqJbHig8ISoUIQK6gF9cuaQFkBmgA)

- Get spores by content type (text/markdown)
  ```graphql
  query GetMarkdownContentTypeSpores {
    spores(filter: { contentTypes: ["text/markdown"] }) {
      id
      contentType
    }
  }
  ```
  [Open in GraphQL Explorer >>](https://spore-graphql.vercel.app/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAOIIoCyAhngNaQDuSAwhKsigCoEAOCAyjwh4EAZyLAAOkiJFRQkaIAUAMwCWAGxT50EolDbbU3PqN0BtSSG0APFAHo4NehCZWAukQC%2BASgnTZWTUwAMCDdmNeBFCvaVikEC8gA)

- Get mintable clusters by CKB address
  ```graphql
  query GetMintableClusters {
    clusters(
      filter: {
        mintableBy: "ckt1qrejnmlar3r452tcg57gvq8patctcgy8acync0hxfnyka35ywafvkqgpwrcql790ua7gr9kam255sq3ussa09wtgqqjwqus2"
      }
    ) {
      id
      name
      description
    }
  }
  ```
  [Open in GraphQL Explorer >>](https://spore-graphql.vercel.app/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAOIIoCyAlqgIYBGANggMKMwDOK%2BHRwAOkiJEo7LjwAUg4cIBmVRtzzo%2B0mcLg0UDZgCECK-iCgBrFAEYseBACskcRrTwBmPABYArACYUUAOYeAOx%2BAG5YABwADrS%2Bvn4E4bRQBEhQAAwAFgAeskgEJrTOHgQA7rSyISZYfpEleFBYjIEAnGkwtMF4zQVwXh4eHFjOnBy0ac0lKH5YWDYlOBxeRmrCAL5qAJSqQjJUYCtESLSIB2AIHFB4VJEoVBBIautITyCrQA)

For other queries or requirements, you can explore them in the [GraphQL Explorer](https://spore-graphql.vercel.app). 
If your needs are not met, feel free to create an issue or submit a pull request to collectively improve spore-graphql.

## Advanced Usage

### Configuring cache backends

spore-graphql is based on [Apollo GraphQL](https://www.apollographql.com), which means you can refer to [the documentation of Apollo GraphQL for implementation](https://www.apollographql.com/docs/apollo-server/performance/cache-backends/)

Here is a simple code implementation:

```typescript
import { startSporeServerNextHandler } from 'spore-graphql/next';
import responseCachePlugin from '@apollo/server-plugin-response-cache';
import { ApolloServerPluginCacheControl } from '@apollo/server/plugin/cacheControl';
import { KeyvAdapter } from '@apollo/utils.keyvadapter';
import Keyv from 'keyv';
import { predefinedSporeConfigs } from '@spore-sdk/core';

export const fetchCache = 'force-no-store';
export const maxDuration = 300;

const cache = new KeyvAdapter(new Keyv("redis://..."));

const handler = startSporeServerNextHandler(predefinedSporeConfigs.Aggron4, {
    cache,
    plugins: [
      ApolloServerPluginCacheControl({
        defaultMaxAge: 60 * 60 * 24,
      }),
      responseCachePlugin(),
    ],
  },
});

export { handler as GET, handler as POST };
```

If you are using [Vercel KV](https://vercel.com/docs/storage/vercel-kv) as a cache backend, you can refer to [the implementation of Spore Demo](https://github.com/sporeprotocol/spore-demo/blob/main/src/app/api/graphql/route.ts)

## Community

Chat everything about Spore here:

- Join our discord channel: [HaCKBee](https://discord.gg/9eufnpZZ8P)
- Contact via email: [contact@spore.pro](mailto:contact@spore.pro)

## Contributing

To submit pull requests, make sure:

- Please submit pull requests based on the `master` branch
- Please ensure your commit styling won't conflict with the [existing commits](https://github.com/sporeprotocol/spore-graphql/commits)
- Please provide a clear and descriptive title and description for your pull requests

## License

[MIT](./LICENSE) License
