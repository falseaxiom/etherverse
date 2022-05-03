# etherverse

# Set up 
1. Clone repository

# Frontend 
1. cd frontend 
2. npm install 
3. npm start 

# Backend 
1. cd backend 
2. npm install 
3. truffle compile 
4. add truffle_config.js to Ganache 
5. truffle migrate 
6. copy contract address to address const in contract.js in blockchain folder in frontend 
7. copy api array in Land.json to abi const in contract.js in blockchain folder in frontend 

# Buy / Sell Land 
1. connect account to MetaMask — application initializes all land to be owned by first account in Ganache 
2. connect second account to MetaMask to start buy / sell land 

# Navigating UI 
1. use WASD keys to rotate bird 
2. press space bar to move bird forward
3. press i key to get information of land bird is above 
4. press profile button to list and reprice land
5. press BUY button to buy land that is listed
6. input landID to search to get information on land
7. use GUI to customize land
