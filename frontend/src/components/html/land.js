const addLand = () => {
  const land_info = document.createElement("div");
  land_info.style.position = "absolute";
  land_info.style.color = "white";
  land_info.style.backgroundColor = "black";
  land_info.style.width = "300px";
  land_info.style.padding = "10px";

  const search = document.createElement("div");
  search.id = "search";
  search.style.color = "white";
  search.style.backgroundColor = "black";
  search.style.width = "300px";
  search.innerHTML = `<div style="text-align: center; padding-bottom: 10px">
<input type="number" style="margin-right: 5px; width: 30px"/>
<input type="number" style="margin-right: 5px; width: 30px"/>
<input type="number" style="margin-right: 5px; width: 30px"/>
<button>Search</button>
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
<div>History: </div>
`;
  land_info.appendChild(info);
  document.body.appendChild(land_info);
};

export default addLand;
