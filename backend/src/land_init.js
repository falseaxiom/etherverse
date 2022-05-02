const Land = artifacts.require("./contracts/Land.sol");

let land = Land.deployed();

// create 100 plots of land
for (let i = 0; i < 100; i++) {
  land.createPlot("Plot " + i, 0);
}
