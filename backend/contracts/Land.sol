// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Land {
        


    struct History {
        uint256 date;
        address buyer;
        address seller;
        uint256 price;
    }

    struct Plot {
        uint id; // id of plot of land
        string name; // name of land
        address owner; // current owner of plot
        uint price; // current price of plot
        bool onMarket; // true if owner wants to sell
        mapping(uint256 => History) history; // history of past owners/sell prices
        uint256 historyLength; // length of history
    }

    // mapping(uint256 => Plot) public plots; // database of all plots
    Plot[] public plots;

    constructor() public {
        Plot memory p1 = Plot({
            id: 123,
            name: "land1",
            owner: 0x475d51A4393e0A1Ab28D0599EC5E734b16825D4C,
            price: 0,
            onMarket: true,
            historyLength: 0
        });

        plots.push(p1);
        // plots[numPlots] = p1;
        // numPlots += 1;

        // return true;
        // this.createLand.call(123, "land1", "0xb826e57cafb563FA63E937DCE4274e642e1416e3", 1, true);
    }

    // from a2
    // You must emit these events when certain triggers occur (see the ERC-20 spec).
    event Approval(address indexed _from, address indexed _to, uint256 _value);
    event Transfer(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    function numPlots() public view returns (uint256) {
        return plots.length;
    }

    // function createLand(uint256 _id, string memory _name, address _owner, uint256 _price, bool _onMarket) public returns (bool) {
    //     // create new plot
        
    // }

    // buy a plot of land
    function buyPlot(address _buyer, uint256 _pid) public returns (bool) {
        // make sure owner wants to sell
        require(plots[_pid].onMarket);

        // save old owner for updating history
        address oldOwner = plots[_pid].owner;

        // change owners, automatically take plot off market
        plots[_pid].owner = _buyer;
        listPlot(_buyer, _pid);

        // exchange money

        // add to history
        plots[_pid].history[plots[_pid].historyLength] = (
            History(block.timestamp, _buyer, oldOwner, plots[_pid].price)
        );
        plots[_pid].historyLength += 1;

        return true;
    }

    // change price of plot of land
    function changePrice(
        address _owner,
        uint256 _pid,
        uint256 _newPrice
    ) public returns (bool) {
        require(plots[_pid].owner == _owner); // make sure request is from owner
        plots[_pid].price = _newPrice;
        return true;
    }

    // change name of plot of land
    function changeName(
        address _owner,
        uint256 _pid,
        string memory _newName
    ) public returns (bool) {
        require(plots[_pid].owner == _owner); // make sure request is from owner
        plots[_pid].name = _newName;
        return true;
    }

    // put plot on/off market
    function listPlot(address _owner, uint256 _pid) public returns (bool) {
        require(plots[_pid].owner == _owner); // make sure request is from owner

        plots[_pid].onMarket = !plots[_pid].onMarket;

        return true;
    }
}
