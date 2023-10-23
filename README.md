# A simple blockchain 

## Description
This simple blockchain app simulates transactions between MiningNodes.

The following things are executed or started at start-up:
1. three mining nodes are created
2. each mining node receives the same genesis block at the start.


Works on [Nest](https://github.com/nestjs/nest) framework.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Request Examples

#### Add a transaction
```json
# URL: http://localhost:3000/blockchain
# Methode: POST
# Body:
{
  "from": "xyz",
  "to": "abc",
  "amount": 5
}
```

#### Get current blockcain
```json
# URL: http://localhost:3000/blockchain
# Methode: GET
```