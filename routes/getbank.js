const express = require("express");
const { getBank, getList, getBankB, getBankC, getBankD } = require("../controllers/getbank");
const routerGetBank = express.Router();
routerGetBank.get("/getbank", getBank);
routerGetBank.get("/getlist", getList);
routerGetBank.get("/getbankb", getBankB);
routerGetBank.get("/getbankc", getBankC);
routerGetBank.get("/getbankd", getBankD);



module.exports = routerGetBank;
