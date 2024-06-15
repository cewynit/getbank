const getbank = require("../models/getbank");
var rp = require("request-promise");
const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");
const getBank = async (req, res) => {
  var messageNew = "-----------------HITCLUB------------------\n";
  var hd = 0;
  try {
    const datatest = await getbank.find({ type: "web1" });
    const { token, idgr, tokentx } = req.query;
    const bot = new TelegramBot(token, { polling: true });
    let listBank = [];
    const { data: bank } = await axios.post(
      "https://pmbodergw.dsrcgoms.net/payment/bcp/hit?xtoken=" + tokentx
    );
    if (bank.code === 200) {
      bank.rows.forEach(async (element) => {
        if (
          element &&
          element.accounts &&
          element.accounts[0] &&
          element.accounts[0].account_no
        ) {
          const bankItem = element.accounts[0];
          try {
            const dataCurrent = datatest.find(
              (item) =>
                item.account_no === bankItem.account_no &&
                item.code_bank === bankItem.code_bank
            );
            if (dataCurrent === undefined) {
              hd++;
              listBank = datatest;
              getbank({
                code_bank: bankItem.code_bank,
                account_name: bankItem.account_name,
                account_no: bankItem.account_no,
                branch_name: bankItem.branch_name,
                type: "web1",
              }).save();
              listBank.push(bankItem);
              const message = `Tài khoản ${hd}\nChủ TK: ${bankItem.account_name}\nNgân hàng: ${bankItem.code_bank}\nSố tài khoản: ${bankItem.account_no}\nChi nhánh: ${bankItem.branch_name}\n--------------------------------------\n`;
              messageNew += message;
            }
          } catch (error) {
            console.log(error);
          }
        }
      });
    }
    await new Promise((resolve) => setTimeout(resolve, 3000));
    if (hd > 0) {
      bot
        .sendMessage(idgr, messageNew)
        .then(() => {
          console.log("Message sent successfully!");
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });
    }
    res.json({ code: 200, data: listBank });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: 400,
      message: "error",
    });
  }
};

const getBankD = async (req, res) => {
  var messageNew = "-----------------HITCLUB------------------\n";
  var hd = 0;
  try {
    const datatest = await getbank.find({ type: "web1" });
    const { token, idgr, tokentx } = req.query;
    const bot = new TelegramBot(token, { polling: true });
    let listBank = [];
    const { data: bank } = await axios.get(
      "https://pmbodergw.dsrcgoms.net/payment/banks/hit?xtoken=" + tokentx
    );
    if (bank.code === 200) {
      bank.rows.forEach(async (element) => {
        if (
          element &&
          element.account &&
          element.account[0] &&
          element.account[0].account_no
        ) {
          const bankItem = element.account[0];
          try {
            const dataCurrent = datatest.find(
              (item) =>
                item.account_no === bankItem.account_no &&
                item.code_bank === bankItem.code_bank
            );
            if (dataCurrent === undefined) {
              hd++;
              listBank = datatest;
              getbank({
                code_bank: bankItem.code_bank,
                account_name: bankItem.account_name,
                account_no: bankItem.account_no,
                branch_name: bankItem.branch_name,
                type: "web1",
              }).save();
              listBank.push(bankItem);
              const message = `Tài khoản ${hd}\nChủ TK: ${bankItem.account_name}\nNgân hàng: ${bankItem.code_bank}\nSố tài khoản: ${bankItem.account_no}\nChi nhánh: ${bankItem.branch_name}\n--------------------------------------\n`;
              messageNew += message;
            }
          } catch (error) {
            console.log(error);
          }
        }
      });
    }
    await new Promise((resolve) => setTimeout(resolve, 3000));
    if (hd > 0) {
      bot
        .sendMessage(idgr, messageNew)
        .then(() => {
          console.log("Message sent successfully!");
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });
    }
    res.json({ code: 200, data: listBank });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: 400,
      message: "error",
    });
  }
};

const getList = async (req, res) => {
  try {
    const data = await getbank.find();
    res.json({ code: 200, total: data.length, data });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: 400,
      message: "error",
    });
  }
};

const getBankB = async (req, res) => {
  var messageNew = "-----------------B52------------------\n";
  var hd = 0;
  try {
    const datatest = await getbank.find({ type: "web2" });
    const { token, idgr, tokentx } = req.query;
    const bot = new TelegramBot(token, { polling: true });
    let listBank = [];
    const { data } = await axios.get(
      "https://api.vidieu.net/api/dataproxy.json"
    );
    const number = Math.floor(Math.random() * 10);
    const proxy = data.data[number];
    const urlProxy = `http://${proxy["username"]}:${proxy["password"]}@${proxy["ip"]}:${proxy["port"]}`;
    const bank = await rp.post(
      "https://bfivegwpeymint.gwtenkges.com/payment/bcpv2?xtoken=" + tokentx,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        },
        proxy: urlProxy,
      }
    );
    if (bank.code === 200) {
      bank.rows.forEach(async (element) => {
        if (
          element &&
          element.account &&
          element.account[0] &&
          element.account[0].account_no
        ) {
          const bankItem = element.account[0];
          try {
            const dataCurrent = datatest.find(
              (item) =>
                item.account_no === bankItem.account_no &&
                item.code_bank === bankItem.code_bank
            );
            if (dataCurrent === undefined) {
              hd++;
              listBank = datatest;
              getbank({
                code_bank: bankItem.code_bank,
                account_name: bankItem.account_name,
                account_no: bankItem.account_no,
                branch_name: bankItem.branch_name,
                type: "web2",
              }).save();
              listBank.push(bankItem);
              const message = `Tài khoản ${hd}\nChủ TK: ${bankItem.account_name}\nNgân hàng: ${bankItem.code_bank}\nSố tài khoản: ${bankItem.account_no}\nChi nhánh: ${bankItem.branch_name}\n--------------------------------------\n`;
              messageNew += message;
            }
          } catch (error) {
            res.status(400).json({
              data: error,
            });
          }
        }
      });
    }
    await new Promise((resolve) => setTimeout(resolve, 3000));
    if (hd > 0) {
      bot
        .sendMessage(idgr, messageNew)
        .then(() => {
          console.log("Message sent successfully!");
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });
    }
    res.json({ code: 200, data: listBank });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: error,
    });
  }
};

const getBankC = async (req, res) => {
  var messageNew = "-----------------B52------------------\n";
  var hd = 0;
  try {
    const datatest = await getbank.find({ type: "web2" });
    const { token, idgr, tokentx } = req.query;
    const bot = new TelegramBot(token, { polling: true });
    let listBank = [];
    const { data } = await axios.get(
      "https://api.vidieu.net/api/dataproxy.json"
    );
    const number = Math.floor(Math.random() * 10);
    const proxy = data.data[number];
    const urlProxy = `http://${proxy["username"]}:${proxy["password"]}@${proxy["ip"]}:${proxy["port"]}`;
    const bank = await rp.get(
      `https://bfivegwpeymint.gwtenkges.com/payment/banksv2?xtoken=${tokentx}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        },
        proxy: urlProxy,
      }
    );
    if (bank.code === 200) {
      bank.rows.forEach(async (element) => {
        if (
          element &&
          element.account &&
          element.account[0] &&
          element.account[0].account_no
        ) {
          const bankItem = element.account[0];
          try {
            const dataCurrent = datatest.find(
              (item) =>
                item.account_no === bankItem.account_no &&
                item.code_bank === bankItem.code_bank
            );
            if (dataCurrent === undefined) {
              hd++;
              listBank = datatest;
              getbank({
                code_bank: bankItem.code_bank,
                account_name: bankItem.account_name,
                account_no: bankItem.account_no,
                branch_name: bankItem.branch_name,
                type: "web2",
              }).save();
              listBank.push(bankItem);
              const message = `Tài khoản ${hd}\nChủ TK: ${bankItem.account_name}\nNgân hàng: ${bankItem.code_bank}\nSố tài khoản: ${bankItem.account_no}\nChi nhánh: ${bankItem.branch_name}\n--------------------------------------\n`;
              messageNew += message;
            }
          } catch (error) {
            console.log(error);
          }
        }
      });
    }
    await new Promise((resolve) => setTimeout(resolve, 3000));
    if (hd > 0) {
      bot
        .sendMessage(idgr, messageNew)
        .then(() => {
          console.log("Message sent successfully!");
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });
    }
    res.json({ code: 200, data: listBank });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: 400,
      message: "error",
    });
  }
};

module.exports = { getBank, getList, getBankB, getBankC, getBankD };
