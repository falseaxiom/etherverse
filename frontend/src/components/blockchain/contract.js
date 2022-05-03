import User from "./user";

const Web3 = require("web3");

class Contract {
  constructor() {
    this.state = {
      contract: {},
      todoList: [],
    };
  }

  async loadContract() {
    const web3 = new Web3("http://localhost:7545");

    const address = "0x4C94Df375b48514DBFD69309978Af33a1565Fb3F";
    const abi = JSON.parse(`[
      {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x06fdde03"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "plotCount",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x32c55e11"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "plots",
        "outputs": [
          {
            "name": "id",
            "type": "uint256"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "price",
            "type": "uint256"
          },
          {
            "name": "owner",
            "type": "address"
          },
          {
            "name": "onMarket",
            "type": "bool"
          },
          {
            "name": "historyLength",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x61bf49ee"
      },
      {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor",
        "signature": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "id",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "name",
            "type": "string"
          },
          {
            "indexed": false,
            "name": "price",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "onMarket",
            "type": "bool"
          }
        ],
        "name": "PlotCreated",
        "type": "event",
        "signature": "0xb29353bddb7cdcf126a1073d7bf784cca98f9474dc0d64a59435ed90a2a3ef5a"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "id",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "name",
            "type": "string"
          },
          {
            "indexed": false,
            "name": "price",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "onMarket",
            "type": "bool"
          }
        ],
        "name": "PlotPurchased",
        "type": "event",
        "signature": "0x90eae92d3479da9f90e12ccb37d12718e13c02904c6e3b37bba0e77705082837"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "date",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "buyer",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "seller",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "price",
            "type": "uint256"
          }
        ],
        "name": "HistoryUpdated",
        "type": "event",
        "signature": "0xe934b6a166c5a1dfd8e354f278d9be746e0fd4d934c7e0242a16f42194d2b9a7"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_id",
            "type": "uint256"
          }
        ],
        "name": "purchasePlot",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function",
        "signature": "0xd0f11ea1"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_id",
            "type": "uint256"
          },
          {
            "name": "_newPrice",
            "type": "uint256"
          }
        ],
        "name": "changePrice",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xb3de019c"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_id",
            "type": "uint256"
          },
          {
            "name": "_newName",
            "type": "string"
          }
        ],
        "name": "changeName",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xc39cbef1"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_id",
            "type": "uint256"
          }
        ],
        "name": "listPlot",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x5d2711cc"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getPlots",
        "outputs": [
          {
            "name": "",
            "type": "uint256[]"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xf9cf80a9"
      }
    ]`);

    this.state.contract = new web3.eth.Contract(abi, address);
  }

  async getLandInfo(landID) {
    let landInfo = [];

    await this.state.contract.methods
      .plots(landID)
      .call()
      .then((e) => {
        landInfo = e;
      });

    return landInfo;
  }

  async buyLand(landID, price) {
    const user = new User();
    await user.onload();

    const senderAddress = user.state.user;

    await this.state.contract.methods.purchasePlot(landID).send(
      {
        from: senderAddress,
        value: price,
      },
      function (err, res) {
        if (err) {
          console.log("An error occured", err);
          return;
        }
        console.log("Hash of the transaction: " + res);
      }
    );
  }

  async changePrice(id, price) {
    const user = new User();
    await user.onload();

    const senderAddress = user.state.user;

    await this.state.contract.methods
      .changePrice(id, price)
      .send({ from: senderAddress }, (err, res) => {
        if (err) {
          console.log(err);
        }
        console.log(res);
      });
  }

  async onMarket(id) {
    const user = new User();
    await user.onload();

    const senderAddress = user.state.user;
    await this.state.contract.methods
      .listPlot(id)
      .send({ from: senderAddress }, (err, res) => {
        if (err) {
          console.log(err);
        }
        console.log(res);
      });
  }
}

export default Contract;
