// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Land {
    uint256 price = 0;

    struct History {
        uint256 date;
        address buyer;
        address seller;
        uint256 price;
    }

    struct Plot {
        uint256 id; // id of plot of land
        string name; // name of land
        address owner; // current owner of plot
        uint256 price; // current price of plot
        bool onMarket; // true if owner wants to sell
        History[] history; // history of past owners/sell prices
    }

    mapping(uint256 => Plot) public plots; // database of all plots

    // from a2
    // You must emit these events when certain triggers occur (see the ERC-20 spec).
    event Approval(address indexed _from, address indexed _to, uint256 _value);
    event Transfer(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

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
        plots[_pid].history.push(
            History(block.timestamp, _buyer, oldOwner, plots[_pid].price)
        );

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
