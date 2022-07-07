# node api

Node api package maintains multiple [@polkadot/api](https://github.com/polkadot-js/api) instances for each supported
chains in case of a single instance failure. It then provides REST APIs for interactions with supported chain nodes.

## Environment variable configuration

Run `cat .env.example > .env`, and then change the `.env` according to your need.

```dotenv
# Endpoints, separated by ';'
DOT_ENDPOINTS=wss://rpc.polkadot.io;wss://polkadot.api.onfinality.io/public-ws;wss://polkadot-rpc.dwellir.com
KSM_ENDPOINTS=wss://kusama-rpc.polkadot.io;wss://kusama.api.onfinality.io/public-ws;wss://kusama-rpc.dwellir.com
WND_ENDPOINTS=wss://westend-rpc.polkadot.io;wss://westend.api.onfinality.io/public-ws
STATEMINE_ENDPOINTS=wss://statemine.api.onfinality.io/public-ws;wss://statemine-rpc.polkadot.io
STATEMINT_ENDPOINTS=wss://statemint-rpc.polkadot.io;wss://statemint.api.onfinality.io/public-ws;wss://statemint-rpc.dwellir.com
WESTMINT_ENDPOINTS=wss://westmint-rpc.polkadot.io;wss://westmint-rpc.dwellir.com

SERVER_PORT=3223
# It's necessary because we have to submit the [answer](https://github.com/opensquare-network/qa-spec/blob/master/standards/1.0/interactions/answer.md) interactions for answerers.
POLKADOT_ACCOUNT_PHRASE=

NODE_ENV=production
```

## Routes

- [chain]/remark/block/[blockHash]/extrinsic/[extrinsicIndex]: get the remark at a block extrinsic(by block hash and
  extrinsic index).
- [chain]/remark/batch_send: submit answers by batch transactions to the chain.
- [chain]/token/native/info: get native token metadata of the chain.
- [chain]/token/[assetId]/info: get asset token metadata defined in Statemine/Statemint/Westmint assets pallet.
- [chain]/token/[assetId]/[blockHash]/info: get asset token metadata at a block.
