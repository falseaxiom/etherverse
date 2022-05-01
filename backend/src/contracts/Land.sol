pragma solidity ^0.5.0;

contract Land {
    string public name;
    uint256 public plotCount = 0;
    mapping(uint256 => Plot) public plots;

    struct Plot {
        uint256 id;
        string name;
        uint256 price;
        address payable owner;
        bool purchased;
        // bool onMarket;
    }

    //     struct Plot {
    //     uint id;             // id of plot of land
    //     string name;         // name of land
    //     address owner;       // current owner of plot
    //     uint price;          // current price of plot
    //     bool onMarket;       // true if owner wants to sell
    //     History[] history;   // history of past owners/sell prices
    // }

    event PlotCreated(
        uint256 id,
        string name,
        uint256 price,
        address payable owner,
        bool purchased
    );
    // bool onMarket
    event PlotPurchased(
        uint256 id,
        string name,
        uint256 price,
        address payable owner,
        bool purchased
    );

    // bool onMarket
    constructor() public {
        name = "Etherverse";
    }

    function createPlot(string memory _name, uint256 _price) public {
        // Require a valid name
        require(bytes(_name).length > 0);
        // Require a valid price
        require(_price > 0);
        // Increment product count
        plotCount++;
        // Create the product
        plots[plotCount] = Plot(
            plotCount,
            _name,
            _price,
            msg.sender,
            false
            // false
        );
        // Trigger an event
        emit PlotCreated(plotCount, _name, _price, msg.sender, false);
    }

    function purchasePlot(uint256 _id) public payable {
        // Fetch the product
        Plot memory _plot = plots[_id];
        // Fetch the owner
        address payable _seller = _plot.owner;
        // Make sure the product has a valid id
        require(_plot.id > 0 && _plot.id <= plotCount);
        // Require that there is enough Ether in the transaction
        require(msg.value >= _plot.price);
        // Require that the product is on market
        // require(_plot.onMarket);
        // Require that the product not purchased
        // require(!_plot.purchased);
        // Require that the buyer is not the seller
        require(_seller != msg.sender);
        // Transfer ownership to the buyer
        _plot.owner = msg.sender;
        // Mark as purchased
        _plot.purchased = true;
        // Mark as not on market
        // _plot.onMarket = false;
        // Update the product
        plots[_id] = _plot;
        // Pay the seller by sending them Ether
        address(_seller).transfer(msg.value);
        // Trigger an event
        emit PlotPurchased(
            plotCount,
            _plot.name,
            _plot.price,
            msg.sender,
            true
        );
    }

    // change price of plot of land
    function changePrice(uint256 _id, uint256 _newPrice) public returns (bool) {
        Plot memory _plot = plots[_id];
        address payable _seller = _plot.owner;
        require(_seller != msg.sender); // make sure request is from owner

        _plot.price = _newPrice;

        return true;
    }

    // change name of plot of land
    function changeName(uint256 _id, string memory _newName)
        public
        returns (bool)
    {
        require(plots[_id].owner == msg.sender); // make sure request is from owner
        plots[_id].name = _newName;
        return true;
    }

    // put plot on/off market
    function listPlot(uint256 _id) public returns (bool) {
        require(plots[_id].owner == msg.sender); // make sure request is from owner

        // plots[_id].onMarket = !plots[_id].onMarket;

        return true;
    }
}
