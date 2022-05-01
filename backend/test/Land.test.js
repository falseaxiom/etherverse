const Land = artifacts.require('./Land.sol')

contract('Land', (accounts) => {
  before(async () => {
    land = await Land.deployed()
  })

  it('deploys successfully', async () => {
    const address = await land.address
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })

  it('lets you buy a plot of land', async() => {
    const makeLand = await land.createLand(123, "land1", "0xb826e57cafb563FA63E937DCE4274e642e1416e3", 1, true)
    // 0xeeAcD6Cd28AE8a7f0698069DcB5931B7D718af16

    const me = accounts[0];
    const numPlots = land.numPlots;
    const plot = land.plots[numPlots];

    const result = await land.buyPlot(me, plot.id);
    assert.equal(result, true)
    assert.equal(plot.owner, me)
  })

  it('lets you change the price of land you own', async() => {
    const me = accounts[0];
    const plot = land.plots[0];
    const newPrice = 5;

    const result = await land.changePrice(me, plot.id, newPrice);
    assert.equal(result, true)
    assert.equal(plot.price, newPrice)
  })
})
