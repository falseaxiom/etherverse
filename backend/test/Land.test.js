const Land = artifacts.require("./Land.sol");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("Land", ([deployer, seller, buyer]) => {
  let land;

  before(async () => {
    land = await Land.deployed();
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = await land.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("has a name", async () => {
      const name = await land.name();
      assert.equal(name, "Etherverse");
    });
  });

  describe("plots", async () => {
    let result, plotCount;

    before(async () => {
      // result = await land.createPlot(
      //   "Sample Land",
      //   web3.utils.toWei("1", "Ether"),
      //   { from: seller }
      // );
      plotCount = await land.plotCount();
    });

    it("buy plots", async () => {
      // SUCCESS
      assert.equal(plotCount.toString(), "10");
      // const event = result.logs[0].args;
      // assert.equal(event.id.toNumber(), plotCount.toNumber(), "id is correct");
      // assert.equal(event.name, "Sample Land", "name is correct");
      // assert.equal(event.price, "1", "price is correct");
      // assert.equal(event.owner, seller, "owner is correct");
      // assert.equal(event.onMarket, false, "onMarket is correct");

      // FAILURE: Plot must have a price
      // await await land.createPlot("Sample Land", 0, { from: seller }).should.be
      //   .rejected;

      // SUCCESS: make sure changePrice and changeName also work
      const plot = await land.plots(plotCount);

      await land.changePrice(plotCount, 1, {
        from: deployer,
      });
      assert.equal(plot.id.toString(), plotCount.toString(), "id is correct");
      assert.equal(plot.name, "Plot", "name is correct");
      assert.equal(plot.owner, deployer, "owner is correct");
      assert.equal(plot.onMarket, false, "onMarket is correct");

      await land.changeName(plotCount, "newName", {
        from: deployer,
      });
      await land.listPlot(plotCount, {
        from: deployer,
      });
    });

    it("lists plots", async () => {
      const plot = await land.plots(plotCount);
      assert.equal(plot.id.toNumber(), plotCount.toNumber(), "id is correct");
      assert.equal(plot.name, "newName", "name is correct");
      assert.equal(plot.price, "1", "price is correct");
      assert.equal(plot.owner, deployer, "owner is correct");
      assert.equal(plot.onMarket, true, "onMarket is correct");
    });

    it("sells land", async () => {
      // Track the seller balance before purchase
      let oldSellerBalance;
      oldSellerBalance = await web3.eth.getBalance(deployer);
      oldSellerBalance = new web3.utils.BN(oldSellerBalance);

      // SUCCESS: Buyer makes purchase
      result = await land.purchasePlot(plotCount, {
        from: buyer,
        value: web3.utils.toWei("1", "Ether"),
      });

      // Check logs
      const event = result.logs[0].args;
      assert.equal(event.id.toNumber(), plotCount.toNumber(), "id is correct");
      assert.equal(event.name, "newName", "name is correct");
      assert.equal(event.price, "1", "price is correct");
      assert.equal(event.owner, buyer, "owner is correct");
      assert.equal(event.onMarket, false, "onMarket is correct");

      // Check that seller received funds
      let newSellerBalance;
      newSellerBalance = await web3.eth.getBalance(deployer);
      newSellerBalance = new web3.utils.BN(newSellerBalance);

      let price;
      price = web3.utils.toWei("1", "Ether");
      price = new web3.utils.BN(price);

      const exepectedBalance = oldSellerBalance.add(price);

      assert.equal(newSellerBalance.toString(), exepectedBalance.toString());

      // FAILURE: Tries to buy a product that does not exist, i.e., product must have valid id
      await land.purchasePlot(99, {
        from: buyer,
        value: web3.utils.toWei("1", "Ether"),
      }).should.be.rejected;
      // FAILURE: Buyer tries to buy without enough ether
      await land.purchasePlot(plotCount, {
        from: buyer,
        value: web3.utils.toWei("0.5", "Ether"),
      }).should.be.rejected;
      // FAILURE: Buyer tries to buy again, i.e., buyer can't be the seller
      await land.purchasePlot(plotCount, {
        from: buyer,
        value: web3.utils.toWei("1", "Ether"),
      }).should.be.rejected;

      // make sure history mapping is updated
      const plot = await land.plots(plotCount);
      assert.equal(
        plot.historyLength.toString(),
        "1",
        "historyLength is correct"
      );
      const hEvent = result.logs[1].args;
      assert.equal(hEvent.buyer, buyer, "most recent buyer is correct");
      assert.equal(hEvent.seller, deployer, "most recent seller is correct");
      assert.equal(
        hEvent.price.toString(),
        "1",
        "most recent selling price is correct"
      );
    });
  });
});
