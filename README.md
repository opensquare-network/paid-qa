# Paid QA

OpenSquare Paid-QA is an on-chain Paid Q&A platform that allow user to create topics and fund the valuable answers.
This repository is the javascript implementation of the [OpenSquare QA Specification](https://github.com/opensquare-network/qa-spec).

# Code structure

The code is organized with [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/) and make
sure yarn is installed before running it. There are 9 packages `backend-common`, `common`, `consts`, `node-api`, `scan`, `server`, `site`, `spec` and `ui` under the `packages` folder.

## backend-common

This package maintains the common DB model and business logic shared by `server` and `scan` pakcage.

## common

This package maintains the common UI utilities. Used by `site` package.

## consts

This package maintains the common constants. Used by `site` package.

## spec

It implements the OpenSquare QA specification parser. Used by `server` and `site` packages.

## ui

The common OpenSquare styled UI components. Used by `site` package.

## scan

It implements a Paid-QA remarks scanner that used to parse and store from blockchain,
and also to fetch and save related IPFS content to database.

- Provide a scanner to scan remarks from main and relay chains.
- The IPFS data fetcher.
- A business data syncer.

## node-api

This package maintains multiple [@polkadot/api](https://github.com/polkadot-js/api) instances or ethers [JsonRpcProvider](https://docs.ethers.io/v5/api/providers/jsonrpc-provider/)s
for target chains in case of a single endpoint failure. It is in charge of interaction with chain nodes and provides restful apis for caller to fetch on-chain data. The apis include:

- [chain]/remark/block/[blockHash]/extrinsic/[extrinsicIndex]: get the remark at a block extrinsic(by block hash and extrinsic index).
- [chain]/remark/batchsend: submit answers by batch transactions to the chain.
- [chain]/token/native/info: get native token metadata of the chain.
- [chain]/token/[assetId]/info: get asset token metadata.
- [chain]/token/[assetId]/[blockHash]/info: get asset token metadata at a block.

## server

It integrates [koa.js](https://koajs.com/) as the server, and you can find the code under `packages/server` folder.
The server provides apis for topics, supports, funds and resolves, check them
under `packages/server/features` folder.

It depends on [MongoDB](https://www.mongodb.com/) and related topics and instructions data are stored.
All instructions data are signed with polkadot keys and submitted to blockchain, where topic contents are uploaded to IPFS too. We use [infura](https://infura.io/) as the IPFS service provider, so make sure to register an account and get the corresponding infura api token and secret key.

This package also depends on the `node-api` package to fetch on-chain info.
So don't forget to config the required `NODE_API_ENDPOINT` environment variable.

Generally, Its features include:

- Providing restful apis for site page.
- Managing business data with MongoDB.
- Querying chain data from `node-api` package.

## site

Site package depends on [React](https://reactjs.org/) and renders the fronted pages.

# How to run it

## Prerequisite

### MongoDB

Make sure mongodb is installed, while corresponding url is required to config in the server package.
Check [here](https://docs.mongodb.com/manual/installation/) to find a way to install it natively, or run it with docker:

```bash
docker run -d --name mongo -p 27017:27017 mongo:4.4.2
```

You may need more configuration for production environment.

### Infura api key and secret

Register an [infura](https://infura.io/) account and get the project ID and secret.

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
WND_ENDPOINTS=wss://westend-rpc.polkadot.io;wss://westend.api.onfinality.io/public-ws;wss://rpc.pinknode.io/westend/explorer
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
REACT_APP_QA_API_SERVER=http://127.0.0.1:5050/
REACT_APP_SOCKET_IO_URL=http://127.0.0.1:5050/

REACT_APP_IDENTITY_SERVER_HOST=https://id.statescan.io
# development | production
REACT_APP_ENVIRONMENT=development
```

Then run

```bash
yarn start
```

### 5. Run [scan](./packages/scan) package

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

LOG_LEVEL=info
NODE_ENV=production

MONGO_DB_META_NAME=wastmint-meta

IPFS_GATEWAY_URL=https://ipfs.infura.io/ipfs/
```

Then start on-chain scanner

```bash
node src/index.js
```

Run IPFS fetcher in a cron job

```bash
node src/ipfs/index.js
```

Run business DB syncer in a cron job

```bash
node src/sync/index.js
```

Do everything work well? Join [OpenSquare matrix room](https://matrix.to/#/#opensquare:matrix.org) if any problems.
