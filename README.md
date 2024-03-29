# Paid QA

OpenSquare Paid-QA is a paid Q&A platform that allow user to create topics and fund the valuable answers. It saves users' collaboration interactions to blockchain and stores collaboration content to IPFS.
This repository is the Node.js implementation of the [OpenSquare QA Specification](https://github.com/opensquare-network/qa-spec) standard 1.0.

# Code structure

The code is organized with [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/) and make
sure yarn is installed before running it. There are 9 packages `backend-common`, `common`, `node-api`, `scan`, `server`, `site`, `spec` and `ui` under the `packages` folder.

## backend-common

This package maintains the common database models and business logics shared by `server` and `scan` packages.

## common

This package maintains the common UI utilities, used by `site` package.

## spec

It implements several utility functions and classes to help decode/encode [qa-spec](https://github.com/opensquare-network/qa-spec) specification, used by `server` and `site` packages.

## ui

It contains common OpenSquare styled UI components, used by `site` package and other collaboration products like [off-chain voting](https://github.com/opensquare-network/collaboration).

## scan

It implements a scanner which is used to scan the history [qa-spec](https://github.com/opensquare-network/qa-spec) related extrinsics on different substrate chains.
It also provides scripts to fetch qa collaboration data from IPFS and sync it to business database. So the key components includes:

- A scanner to scan remark/batch extrinsics from supported chains.
- Scripts to fetch topic/answer content from IPFS and store to scan database.
- Scripts to sync topic related data from scan database to business database.

## node-api

This package maintains multiple [@polkadot/api](https://github.com/polkadot-js/api) instances
for different chains in case of a single endpoint failure. It is in charge of interaction with chain nodes and provides restful apis for caller to fetch on-chain data. The apis include:

- [chain]/remark/block/[blockHash]/extrinsic/[extrinsicIndex]: get the remark at a block extrinsic(by block hash and extrinsic index).
- [chain]/remark/batch_send: submit answers by batch transactions to the chain.
- [chain]/token/native/info: get native token metadata of the chain.
- [chain]/token/[assetId]/info: get asset token metadata defined in Statemine/Statemint/Westmint assets pallet.
- [chain]/token/[assetId]/[blockHash]/info: get asset token metadata at a block.

## server

It integrates [koa.js](https://koajs.com/) as the server, and you can find the code under `packages/server` folder.
The server provides apis for topics, supports, funds and resolves, check them
under `packages/server/features` folder.

It depends on [MongoDB](https://www.mongodb.com/) and related topics and interaction data are stored.
All interaction data are signed with polkadot keys and submitted to blockchain, where topic contents are uploaded to IPFS too.
We use [infura](https://infura.io/) as the IPFS service provider, so make sure to register an account, create an IPFS project and
get the corresponding infura project id and secret.

This package also depends on the `node-api` package to fetch on-chain info.
So don't forget to config the required `NODE_API_ENDPOINT` environment variable.

Generally, Its features include:

- Providing restful apis for site page.
- Managing business data with MongoDB.
- Querying chain data from `node-api` package.

## site

Site package depends on [React](https://reactjs.org/) and renders the fronted pages.

# How to run it

## Prerequisites

### MongoDB

Make sure mongodb is installed, while corresponding url is required to config in the server package.
Check [here](https://www.mongodb.com/docs/manual/administration/install-community/) to find a way to install it natively.

> **Note**  
> We require a MongoDB replica set to keep some business transactional. Please refer [here](https://www.mongodb.com/docs/manual/tutorial/convert-standalone-to-replica-set/) for how to convert it to a replica set.

### Infura api key and secret

Register an [infura](https://infura.io/) account, crate and IPFS project and get the project ID and secret.

## Run

### 1. Dependency installation

```bash
yarn
```

### 2. Run node-api

```bash
cd packages/node-api
cat .env.example > .env
```

The default environment variables will work, but if you want to change some, just edit the '.env' file.

```dotenv
# You can change the chain endpoints, separated by ';'.
DOT_ENDPOINTS=wss://rpc.polkadot.io;wss://polkadot.api.onfinality.io/public-ws;wss://polkadot-rpc.dwellir.com
KSM_ENDPOINTS=wss://kusama-rpc.polkadot.io;wss://kusama.api.onfinality.io/public-ws;wss://kusama-rpc.dwellir.com
WND_ENDPOINTS=wss://westend-rpc.polkadot.io;wss://westend.api.onfinality.io/public-ws
STATEMINE_ENDPOINTS=wss://statemine.api.onfinality.io/public-ws;wss://statemine-rpc.polkadot.io
STATEMINT_ENDPOINTS=wss://statemint-rpc.polkadot.io;wss://statemint.api.onfinality.io/public-ws;wss://statemint-rpc.dwellir.com
WESTMINT_ENDPOINTS=wss://westmint-rpc.polkadot.io;wss://westmint-rpc.dwellir.com

# You need a polkadot key mnemonic to call the batch transations to submit answers remarks
POLKADOT_ACCOUNT_PHRASE=xxx

SERVER_PORT=3223 # keep it
```

Then run

```bash
node src/index.js
```

Well, the node-api should be ready.

### 3. Run [server](./packages/server) for the restful api server

Come back to the project root dir and run

```bash
cd packages/server
cat .env.example > .env
```

Open the '.env' file and do necessary configuration

```dotenv
PORT=5050
MONGODB_URI=mongodb://localhost:27017/paid-qa
NODE_API_ENDPOINT=http://localhost:3223

INFURA_PROJECT_ID=xxx
INFURA_PROJECT_SECRET=xxx
LOCAL_IPFS_NODE_URL=http://localhost:5001

# Indicate that to use Infura or local IPFS node
USE_LOCAL_IPFS_NODE=false
```

Run following scripts to start API server

```bash
node src/index.js
```

The restful api server will be ready.

### 4. Run site package for the fronted

Come back to the project root dir and run

```bash
cd packages/site
cat .env.example > .env
```

Open the '.env' file and do necessary configuration

```dotenv
# QA server restful API endpoint
VITE_APP_QA_API_SERVER=http://127.0.0.1:5050/
VITE_APP_SOCKET_IO_URL=http://127.0.0.1:5050/

VITE_APP_IDENTITY_SERVER_HOST=https://id.statescan.io
```

Then run

```bash
cd ../.. # go back to the root directory
yarn start
```

### 5. Run [scan](./packages/scan) package(optional)

> Note: you don't have to run this package unless you want to sync the history topic collaboration data which maybe uploaded by other deployments.

Come back to the project root dir and run

```bash
cd packages/scan
cat .env.example > .env
```

Open the '.env' file and do necessary configuration

```dotenv
WS_ENDPOINT=wss://westmint-rpc.polkadot.io

MONGODB_URI=mongodb://localhost:27017/paid-qa
SCAN_MONGODB_URI=mongodb://localhost:27017/qa-scan

# polkadot|kusama|statemine|westend|westmint
CHAIN=westmint

SCAN_STEP=20

# Turn on it when we scan the block meta data first
USE_META=false
MONGO_META_URL=mongodb://127.0.0.1:27017
MONGO_DB_META_NAME=meta-westmint

LOG_LEVEL=info
NODE_ENV=production

IPFS_GATEWAY_URL=https://ipfs.infura.io/ipfs/
```

Then start on-chain scanner;

```bash
node src/index.js
```

Run the content IPFS sync script. You may also run it with pm2 with a `--cron-restart` setting, check [here](./packages/scan/ipfs.deploy.sh.example) for an example.

```bash
node src/ipfs/index.js
```

Run the scan database to business database sync script. You may also run it with pm2 with a `--cron-restart` setting, check [here](./packages/scan/sync.deploy.sh.example) for an example.

```bash
node src/sync/index.js
```

Do everything work well? Join [OpenSquare matrix room](https://matrix.to/#/#opensquare:matrix.org) if any problems.
