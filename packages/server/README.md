# Server

The server package provides a restful server and a [Socket.IO](https://socket.io/) server for the fronted. It also
provides scripts for pinning topic related JSON files to IPFS and submitting answers extrinsics.

## Configuration

Run `cat .env.example > .env` to init the `.env` file and edit the file according to your environment.

```dotenv
# The business MongoDB URI
MONGODB_URI=mongodb://localhost:27017/paid-qa
# The endpoint of the [node-api](../node-api) server
NODE_API_ENDPOINT=http://localhost:3223

# Server port
PORT=5050

# Infura IPFS project id and secret. We will pin IPFS files to infura.
INFURA_PROJECT_ID=
INFURA_PROJECT_SECRET=

# Ignore this if you won't use a local IPFS node. This is usually for development.
LOCAL_IPFS_NODE_URL=http://localhost:5001
USE_LOCAL_IPFS_NODE=false
```

Then run `node src/index.js` to start the server.

## Scripts

### Pinning

Users will submit various data to our server. To make sure the data transparency and decentralization, we have to pin to
file to IPFS. The IPFS node we choose is [infura](https://infura.io/).

Run `node src/scripts/pin-to-ipfs.js` or use PM2 to manage the process, check
example [here](./pin-to-ipfs.deploy.sh.example).

### Submitting answers

Answerers don't have to
submit [answer interaction](https://github.com/opensquare-network/qa-spec/blob/master/standards/1.0/interactions/answer.md)
by themselves to reduce the friction, while they can just sign the answers and submit to this server,
and [qa-spec](https://github.com/opensquare-network/qa-spec) implementers can do it for them.

1. Make sure [node-api](../node-api) is running before run this script.
2. Run `node src/scripts/submit-answer.js` or use [pm2](./submit-answers.deploy.sh.example) to manage the process.
