class Contract {
  constructor() {
    this.state = {
      contract: [],
    };
  }

  async loadContract() {
    // Create a JavaScript version of the smart contract
    const todoList = await $.getJSON("TodoList.json");
    App.contracts.TodoList = TruffleContract(todoList);
    App.contracts.TodoList.setProvider(App.web3Provider);

    // Hydrate the smart contract with values from the blockchain
    App.todoList = await App.contracts.TodoList.deployed();
  }
}

export default Contract;
