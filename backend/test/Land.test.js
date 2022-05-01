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
      result = await land.createPlot(
        "Sample Land",
        web3.utils.toWei("1", "Ether"),
        { from: seller }
      );
      plotCount = await land.plotCount();
    });

    it("creates plots", async () => {
      // SUCCESS
      assert.equal(plotCount, 1);
      const event = result.logs[0].args;
      assert.equal(event.id.toNumber(), plotCount.toNumber(), "id is correct");
      assert.equal(event.name, "Sample Land", "name is correct");
      assert.equal(event.price, "1000000000000000000", "price is correct");
      assert.equal(event.owner, seller, "owner is correct");
      assert.equal(event.purchased, false, "purchased is correct");

      // FAILURE: Plot must have a name
      await await land.createPlot("", web3.utils.toWei("1", "Ether"), {
        from: seller,
      }).should.be.rejected;
      // FAILURE: Plot must have a price
      await await land.createPlot("Sample Land", 0, { from: seller }).should.be
        .rejected;
    });

    it("lists plots", async () => {
      const plot = await land.plots(plotCount);
      assert.equal(plot.id.toNumber(), plotCount.toNumber(), "id is correct");
      assert.equal(plot.name, "Sample Land", "name is correct");
      assert.equal(plot.price, "1000000000000000000", "price is correct");
      assert.equal(plot.owner, seller, "owner is correct");
      assert.equal(plot.purchased, false, "purchased is correct");
    });

    it("sells land", async () => {
      // Track the seller balance before purchase
      let oldSellerBalance;
      oldSellerBalance = await web3.eth.getBalance(seller);
      oldSellerBalance = new web3.utils.BN(oldSellerBalance);

      // SUCCESS: Buyer makes purchase
      result = await land.purchasePlot(plotCount, {
        from: buyer,
        value: web3.utils.toWei("1", "Ether"),
      });

      // Check logs
      const event = result.logs[0].args;
      assert.equal(event.id.toNumber(), plotCount.toNumber(), "id is correct");
      assert.equal(event.name, "Sample Land", "name is correct");
      assert.equal(event.price, "1000000000000000000", "price is correct");
      assert.equal(event.owner, buyer, "owner is correct");
      assert.equal(event.purchased, true, "purchased is correct");

      // Check that seller received funds
      let newSellerBalance;
      newSellerBalance = await web3.eth.getBalance(seller);
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
      }).should.be.rejected; // FAILURE: Buyer tries to buy without enough ether
      // FAILURE: Buyer tries to buy without enough ether
      await land.purchasePlot(plotCount, {
        from: buyer,
        value: web3.utils.toWei("0.5", "Ether"),
      }).should.be.rejected;
      // // FAILURE: Deployer tries to buy the product, i.e., product can't be purchased twice
      // await land.purchasePlot(plotCount, {
      //   from: deployer,
      //   value: web3.utils.toWei("1", "Ether"),
      // }).should.be.rejected;
      // FAILURE: Buyer tries to buy again, i.e., buyer can't be the seller
      await land.purchasePlot(plotCount, {
        from: buyer,
        value: web3.utils.toWei("1", "Ether"),
      }).should.be.rejected;
    });

    it("changes price", async () => {
      const plot = await land.plots(plotCount);
      const newPrice = 1;
      result = await land.changePrice(plotCount, newPrice, { from: seller });

      assert.equal(plot.id.toNumber(), plotCount.toNumber(), "id is correct");
      assert.equal(plot.name, "Sample Land", "name is correct");
      assert.equal(
        plot.price.toNumber(),
        newPrice.toNumber(),
        "price is correct"
      );
      assert.equal(plot.owner, seller, "owner is correct");
      assert.equal(plot.purchased, false, "purchased is correct");
    });
  });
});
