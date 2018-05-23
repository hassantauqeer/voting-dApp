# ERC20 Dapp

- [Installation](#installation)
- [Project Structure](#project-structure)
- [Smart Contract](#smart-contract)
- [Wallet DAPP](#voting-dapp)


### Installation

```bash
yarn install
```
For development Version:
```bash
yarn start
```
For production Version:
```bash
yarn start:production
```
will be hosted on http://localhost:3000
covers 
- to build
```bash
yarn run build
```
- to run production build: 
```bash
yarn start:prod
```

#### Contract Installation
```bash
yarn run cd
```
covers
```bash
node compile.js
```
```bash
node deploy.js
```
```bash
jest tests/contract.test.js
```

### Project Structure


```
voting-dApp/
  .gitignore
  README.md
    app/
      components
      containers
      css
      app.js
      index.html
      reducers.js
    docs
    internals
    server
    Solidity_Contract/
      build       // -> Build files of Contract
      contracts	  // -> Solidity Contracts
      tests       // -> Contract's Unit Tests
      compile.js	    // -> Compiling file
      deploy.js	      // -> Deploying file
      VotingInstance.js    // -> Contracts Instance
      web3.js         // -> exporting Web3 instance

    README.md
    package.json
    yarn.lock
```

## Smart Contract
- Members can Create and vote on tasks.
- Once a task gets 100% of votes then it becomes an approved task.
- If a task does not get 100% votes after everyone has voted, then it becomes an unapproved task.
- Owner can finalize task after ending time of Contract finishes.

## Voting Dapp