import Contract from "../blockchain/contract";

const handlePrice = async (id) => {
  const contract = new Contract();
  await contract.loadContract();

  const value = document.getElementById(`${id}-input`).value;
  await contract.changePrice(id, value);
};

const handleMarket = async (id) => {
  const contract = new Contract();
  await contract.loadContract();

  let value = document.getElementById(`${id}-market`);
  if (value.innerHTML === "Put On Market") {
    value.innerHTML = "Take Off Market";
  } else {
    value.innerHTML = "Put On Market";
  }

  await contract.onMarket(id);
};

const getUserPlots = async (user) => {
  const card = document.getElementById("info");
  let div = document.getElementById("user-plots");
  if (!div) {
    div = document.createElement("div");
    div.id = "user-plots";
  }
  const contract = new Contract();
  await contract.loadContract();

  const ids = [];
  for (let i = 0; i < 144; i++) {
    const info = await contract.getLandInfo(i);
    if (info.owner.toLowerCase() === user.state.user.toLowerCase()) {
      ids.push(info);
    }
  }

  let string = "";
  for (let i = 0; i < ids.length; i++) {
    string += `<div style="display: flex; flex-direction: row; width: 700px; justify-content: space-between; padding: 10px">
      <div>Plot ID: ${ids[i].id}</div>
      <div>Price: <input id="${ids[i].id}-input" type="number" value="${ids[i].price}"/><button id="${ids[i].id}-price">Set Price</button></div>
      <button id="${ids[i].id}-market"></button>
      </div>`;
  }

  div.innerHTML = string;
  card.innerHTML = "";
  card.appendChild(div);

  for (let i = 0; i < ids.length; i++) {
    const button = document.getElementById(`${ids[i].id}-price`);
    button.onclick = () => {
      handlePrice(ids[i].id);
    };

    const market_button = document.getElementById(`${ids[i].id}-market`);
    market_button.innerHTML = ids[i].onMarket
      ? "Take Off Market"
      : "Put On Market";
    market_button.onclick = () => {
      handleMarket(ids[i].id);
    };
  }
};

const addProfile = (user) => {
  const handleProfileClose = () => {
    const profile = document.getElementById("profile");
    profile.style.display = "none";
  };

  const handleProfileOpen = () => {
    const profile = document.getElementById("profile");
    profile.style.display = "block";
    profile.style.position = "absolute";
    profile.style.height = "100%";
    profile.style.width = "100%";
    profile.style.textAlign = "center";

    // create profile card if not already displayed
    if (!document.getElementById("card")) {
      const card = document.createElement("div");
      card.id = "card";
      profile.appendChild(card);
      card.style.height = "100%";
      card.style.display = "flex";
      card.style.flexDirection = "column";
      card.style.justifyContent = "center";
      card.style.alignItems = "center";

      const card_info = document.createElement("div");
      card_info.id = "card-info";
      card_info.style.width = "70%";
      card_info.style.height = "70%";
      card_info.style.display = "flex";
      card_info.style.flexDirection = "column";
      card_info.style.alignItems = "center";
      card_info.style.justifyContent = "center";
      card_info.style.backgroundColor = "white";
      card_info.style.borderRadius = "4px";
      const info = document.createElement("div");
      info.innerHTML = `<div><h2>Profile</h2><p><strong>User ID:</strong> ${user.state.user}</p></div>`;

      card_info.appendChild(info);

      const div = document.createElement("div");
      div.id = "info";
      div.innerHTML = "...";
      card_info.appendChild(div);

      const button = document.createElement("button");
      button.style.marginTop = "10px";
      button.innerHTML = "Close";
      button.onclick = handleProfileClose;
      const button_div = document.createElement("div");
      button_div.append(button);
      card_info.appendChild(button_div);
      card.appendChild(card_info);
    }

    getUserPlots(user);
  };

  const profile_info = document.createElement("div");
  profile_info.style.position = "absolute";
  profile_info.style.bottom = "0";
  profile_info.style.margin = "10px";
  const button = document.createElement("button");
  button.innerHTML = `Profile`;
  button.onclick = handleProfileOpen;
  profile_info.appendChild(button);
  document.body.appendChild(profile_info);

  const profile = document.createElement("div");
  profile.id = "profile";
  document.body.appendChild(profile);
};

export default addProfile;
