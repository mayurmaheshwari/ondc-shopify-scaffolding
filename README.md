# ondc-shopify-scaffolding

The end-to-end application requires 4 Nodejs servers to be run:
1. BAP Client
2. BPP Client
3. Protocol-Server-BAP
4. Protocol-Server-BPP


A 'Search' call through the servers flows like this :
```mermaid
flowchart TD;
    B --2. searches for list of bpp--> C[("Registry(in the web)")];
    C -.-> B;
    D --4. looks for registered baps for verification--> C;
    C -.-> D;
    subgraph Search
    A[BAP&nbspClient:8080] --1. context, message--> B[Protocol-Server-BAP:8000];
    B --3. context updated, auth calculated with private key of BAP and added to headers--> D[Protocol-Server-BPP:5000];
    D --5. decrypts the header and sends to bpp--> E[BPP Client:5050];
    E --Rest and GraphQL calls--> F[Shopify]:::someclass
    classDef someclass fill:#f96;
    end
```

## Sample config files:
- default_bap.json
- default_bpp.json

I add the above files to the respective protocol-servers inside the protocol-server/config folder and change their name to default.json


```json
{
  "port": 5000,
  "db": {
    "url": "mongodb+srv://{user}:{password}@cluster0.wruhlvg.mongodb.net/?retryWrites=true&w=majority"
  },
  "app": {
    "mode": "bpp",
    "actions": ["search", "init"],
    "privateKey": "{your-bpp-protocol-server-private-key}",
    "publicKey": "your-bpp-protocol-server-public-key",

    "subscriberId": "dev.bpp.protocol-server.com",
    "subscriberUri": "http://localhost:5000/",

    "registryUrl": "http://localhost:3000/",
    "auth": true,
    "uniqueKey": "dev.bpp.protocol-server.key",

    "city": "std:080",
    "country": "IND",

    "ttl": "P1M",
    "lookupCacheTTL": "PT10S",

    "httpTimeout": 3000,
    "httpRetryCount": 2,

    "clientUrl": "http://localhost:5050/"
  }
}
```
