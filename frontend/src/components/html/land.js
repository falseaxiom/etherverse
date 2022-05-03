import Contract from "../blockchain/contract";

const handleBuy = async () => {
  const chunkID = document.getElementById("number").value;

  const contract = new Contract();
  await contract.loadContract();

  let info = [];
  await contract.getLandInfo(chunkID).then((e) => {
    info = e;
  });
  await contract.buyLand(chunkID, info.price);

  const land_info = document.getElementById("land");
  land_info.innerHTML = ` 
      <div style="text-align: center">LAND INFO</div>
      <div>Land Id: ${chunkID}</div>
      <div>Current Owner: ${info.owner}</div>
      <div>On Sale: ${info.onMarket}</div>
      <div>Price: ${info.price}</div>
      <div style="width: 100%; text-align: center"><button id="buy">BUY</button></div>
    `;
  const buy_button = document.getElementById("buy");
  buy_button.disabled = !info.onMarket;
};

const handleSearch = async () => {
  const chunkID = document.getElementById("number").value;

  const contract = new Contract();
  await contract.loadContract();
  console.log(contract);
  let info = [];
  await contract.getLandInfo(chunkID).then((e) => {
    info = e;
  });

  const land_info = document.getElementById("land");
  land_info.innerHTML = ` 
      <div style="text-align: center">LAND INFO</div>
      <div>Land Id: ${chunkID}</div>
      <div>Current Owner: ${info.owner}</div>
      <div>On Sale: ${info.onMarket}</div>
      <div>Price: ${info.price}</div>
      <div style="width: 100%; text-align: center"><button id="buy">BUY</button></div>
    `;
  const buy_button = document.getElementById("buy");
  buy_button.disabled = !info.onMarket;
  buy_button.onclick = handleBuy;
};

const addLand = () => {
  const land_info = document.createElement("div");
  land_info.style.position = "absolute";
  land_info.style.color = "white";
  land_info.style.backgroundColor = "black";
  land_info.style.width = "500px";
  land_info.style.padding = "10px";

  const search = document.createElement("div");
  search.id = "search";
  search.style.color = "white";
  search.style.backgroundColor = "black";
  search.style.width = "500px";
  search.innerHTML = `<div style="display: flex; flex-direction: row; padding-bottom: 10px">
<input type="number" id="number" style="width: 100%; margin-right: 5px"/>
<button id="search-button">Search</button>
</div>`;

  land_info.appendChild(search);
  const info = document.createElement("div");
  info.id = "land";
  info.innerHTML = `
<div style="text-align: center">LAND INFO</div>
<div>Land Id: </div>
<div>Current Owner: </div>
<div>On Sale: </div>
<div>Price: </div>
<div style="width: 100%; text-align: center"><button id="buy">BUY</button></div>
`;
  land_info.appendChild(info);
  document.body.appendChild(land_info);

  const button = document.getElementById("search-button");
  button.onclick = handleSearch;

  const buy_button = document.getElementById("buy");
  buy_button.disabled = true;
  buy_button.onclick = handleBuy;
  buy_button.style.margin = 0;
  buy_button.position = "absolute";
  buy_button.left = "50%";
};

export default addLand;
