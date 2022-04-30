var Land = artifacts.require("./Land.sol");
var Transactions = artifacts.require("./Transactions.sol");

module.exports = function(deployer) {
  deployer.deploy(Land);
  deployer.deploy(Transactions);
};

