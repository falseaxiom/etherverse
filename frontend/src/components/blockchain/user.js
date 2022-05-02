const Web3 = require("web3");

class User {
  constructor() {
    this.state = {
      user: "",
    };

    window.addEventListener("load", async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
          // Request account access if needed
          await ethereum.enable();

          // Acccounts now exposed
          web3.eth.sendTransaction({
            /* ... */
          });
        } catch (error) {
          // User denied account access...
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        web3.eth.sendTransaction({
          /* ... */
        });
      }
      // Non-dapp browsers...
      else {
        console.log(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
    });
  }

  async onload() {
    // get userID
    await ethereum.request({ method: "eth_accounts" }).then((e) => {
      this.state.user = e[0];
    });
  }
}
export default User;