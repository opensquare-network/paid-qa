# Scan

The scan package provides scripts to index on-chain history qa-related extrinsics, extract the raw business, save to
scan business, and finally sync the history raw business to real business DB used by server package.

## Scripts

MongoDB is necessary for all scripts. Check installation docs [here](https://www.mongodb.com/docs/manual/installation/).

Do necessary environment variable configuration before running it.

```dotenv
# The archive node endpoint
WS_ENDPOINT=wss://rpc.polkadot.io

# The business DB URI which will be used by server package to serve API data
MONGODB_URI=mongodb://127.0.0.1:27017/paid-qa
# The scan DB URI where the data been indexed will be stored
SCAN_MONGODB_URI=mongodb://127.0.0.1:27017/qa-scan

# Don't have set this if we don't have the known heights data
USE_KNOWN_HEIGHTS=1
MONGO_DB_KNOWN_HEIGHTS_URL=mongodb://127.0.0.1:27017
MONGO_DB_KNOWN_HEIGHTS_NAME=polkadot-qa-known-heights-prod

# polkadot|kusama|statemine|westend|westmint
CHAIN=polkadot

# How many blocks do we plan to scan in one step
SCAN_STEP=100

# Turn on it when we scan the block meta data first
USE_META=1
MONGO_META_URL=mongodb://127.0.0.1:27017
MONGO_DB_META_NAME=meta-westend

LOG_LEVEL=info
NODE_ENV=production

IPFS_GATEWAY_URLS=https://ipfs.infura.io/ipfs/
```

### scan

Run `node src/index.js` to begin indexing history data.

### IPFS

We index and save the raw interactions' data to MongoDB, but the interactions only contain the IPFS cid, so we still
need this script to fetch the corresponding content.

Run `node src/ipfs/index.js` to begin fetching the topics/answers content from IPFS.

### Sync

This script syncs the data from scan database to business database, so they can be served through APIs.

Run `node src/sync/index.js` to begin syncing.

### Known heights

To save the indexing time, we can save the block heights first where there
are [qa-spec](https://github.com/opensquare-network/qa-spec) related extrinsics, so next time we can just turn on
the `USE_KNOWN_HEIGHTS` variable on environment configuration, and index only the known heights.

Run `node src/scripts/saveKnown.js` to save the already known heights from the scan database.

## PM2

For production environment, we can use [pm2](https://pm2.keymetrics.io/) to manage the script processes. Check examples
commands:

- [scan example](./scan.deploy.sh.example)
- [ipfs example](./ipfs.deploy.sh.example)
- [sync example](./sync.deploy.sh.example)
