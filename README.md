# ERC20 Token Wallet

- [Installation](#installation)
- [Project Structure](#project-structure)
- [Token](#token)
- [Wallet DAPP](#wallet-dapp)


### Installation
```bash
cd wallet-dApp/
```
```bash
yarn
```
```bash
yarn start
```

### Project Structure

```
coding-challenge-blockchain/
  .gitignore
  README.md
  wallet-dApp/
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

## Voting Dapp