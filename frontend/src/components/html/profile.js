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
      card_info.style.width = "70%";
      card_info.style.height = "70%";
      card_info.style.display = "flex";
      card_info.style.flexDirection = "column";
      card_info.style.justifyContent = "center";
      card_info.style.alignItems = "center";
      card_info.style.backgroundColor = "white";
      card_info.style.borderRadius = "4px";
      const info = document.createElement("div");
      info.innerHTML = `<div><p>Profile</p><p>User ID: ${user.state.user}</p></div>`;

      card_info.appendChild(info);

      const button = document.createElement("button");
      button.innerHTML = "Close";
      button.onclick = handleProfileClose;
      const button_div = document.createElement("div");
      button_div.append(button);
      card_info.appendChild(button_div);
      card.appendChild(card_info);
    }
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
