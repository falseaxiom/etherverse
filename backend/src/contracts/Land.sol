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
        bool onMarket;
        mapping(uint256 => History) history; // history of past owners/sell prices
        uint256 historyLength;
    }

    struct History {
        uint256 date;
        address buyer;
        address seller;
        uint256 price;
    }

    event PlotCreated(
        uint256 id,
        string name,
        uint256 price,
        address payable owner,
        bool onMarket
    );

    event PlotPurchased(
        uint256 id,
        string name,
        uint256 price,
        address payable owner,
        bool onMarket
    );

    event HistoryUpdated(
        uint256 date,
        address buyer,
        address seller,
        uint256 price
    );

    // bool onMarket
    constructor() public {
        name = "Etherverse";
        for (uint256 i = 0; i < 15; i++) {
            createPlot("Plot", 0);
        }
    }

    function createPlot(string memory _name, uint256 _price) internal {
        // require valid name & price
        require(bytes(_name).length > 0);
        // require(_price > 0);

        // update plot count, create new plot
        plotCount++;
        plots[plotCount] = Plot(plotCount, _name, _price, msg.sender, true, 0);

        // trigger event - plot created
        emit PlotCreated(plotCount, _name, _price, msg.sender, true);
    }

    function purchasePlot(uint256 _id) public payable {
        // fetch plot & owner
        Plot memory _plot = plots[_id];
        address payable _seller = _plot.owner;

        // requirements: valid id, enough ether, product on market, buyer != seller
        require(_plot.id > 0 && _plot.id <= plotCount);
        require(msg.value >= _plot.price);
        require(_plot.onMarket);
        require(_seller != msg.sender);

        // transfer ownership to buyer, take off market
        _plot.owner = msg.sender;
        _plot.onMarket = false;

        // update plot
        plots[_id] = _plot;

        // pay seller by sending them Ether
        address(_seller).transfer(msg.value);

        // push to history array
        plots[_id].historyLength++;
        plots[_id].history[plots[_id].historyLength] = History(
            block.timestamp,
            msg.sender,
            _seller,
            _plot.price
        );

        // trigger event - plot purchased
        emit PlotPurchased(
            plotCount,
            _plot.name,
            _plot.price,
            msg.sender,
            false
        );

        // trigger another event - history updated
        History memory _h = plots[_id].history[plots[_id].historyLength];
        emit HistoryUpdated(_h.date, msg.sender, _seller, _plot.price);
    }

    // change price of plot of land
    function changePrice(uint256 _id, uint256 _newPrice) public returns (bool) {
        // fetch plot & owner
        Plot memory _plot = plots[_id];
        address payable _seller = _plot.owner;

        // require request is from owner
        require(_seller == msg.sender);

        // update price
        plots[_id].price = _newPrice;

        return true;
    }

    // change name of plot of land
    function changeName(uint256 _id, string memory _newName)
        public
        returns (bool)
    {
        // require request is from owner
        require(plots[_id].owner == msg.sender);

        // update name
        plots[_id].name = _newName;

        return true;
    }

    // put plot on/off market
    function listPlot(uint256 _id) public returns (bool) {
        // require request is from owner
        require(plots[_id].owner == msg.sender);

        // change market status
        plots[_id].onMarket = !plots[_id].onMarket;

        return true;
    }

    // get all plots owned by msg.sender
    function getPlots() public view returns (uint256[] memory) {
        uint256[] memory myPlots = new uint256[](plotCount);

        uint256 n = 0;
        for (uint256 i = 1; i <= plotCount; i++) {
            if (plots[i].owner != msg.sender) continue;

            myPlots[n] = (plots[i].id);
            n++;
        }

        return myPlots;
    }

    // // get history of plot
    // function getHistory(uint256 _id) public view returns (string[][] memory) {
    //     Plot storage _plot = plots[_id];
    //     string[][] memory h = new string[][](_plot.historyLength);

    //     for (uint256 i = 1; i <= _plot.historyLength; i++) {
    //         h[i] = new string[](4);

    //         h[i][0] = Strings.toString(_plot.history[i].date);
    //         h[i][1] = Strings.toString(_plot.history[i].buyer);
    //         h[i][2] = Strings.toString(_plot.history[i].seller);
    //         h[i][3] = Strings.toString(_plot.history[i].price);
    //     }

    //     return h;
    // }

    // get date history of plot
    function getDates(uint256 _id) public view returns (uint256[] memory) {
        Plot storage _plot = plots[_id];
        uint256[] memory dates = new uint256[](_plot.historyLength);

        for (uint256 i = 1; i <= _plot.historyLength; i++) {
            dates[i] = _plot.history[i].date;
        }

        return dates;
    }

    // get buyer history of plot
    function getBuyers(uint256 _id) public view returns (address[] memory) {
        Plot storage _plot = plots[_id];
        address[] memory buyers = new address[](_plot.historyLength);

        for (uint256 i = 1; i <= _plot.historyLength; i++) {
            buyers[i] = _plot.history[i].buyer;
        }

        return buyers;
    }

    // get price history of plot
    function getPrices(uint256 _id) public view returns (uint256[] memory) {
        Plot storage _plot = plots[_id];
        uint256[] memory prices = new uint256[](_plot.historyLength);

        for (uint256 i = 1; i <= _plot.historyLength; i++) {
            prices[i] = _plot.history[i].price;
        }

        return prices;
    }
}
