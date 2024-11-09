// index.js
import express from "express";
import expressWs from "express-ws";
import fetch from "node-fetch";

const app = express();
expressWs(app);

const PORT = 3000;
let targetAddress = "0xa63cce06Adc521ef91a2DB2153dD75d336Cd0004";

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());

const fetchTransfers = async (address) => {
  const query = `
    {
      transfers(first: 10, where: { from: "${address}" }) {
        id
        from
        to
        transactionHash
        value
        blockTimestamp
      }
    }
  `;
  const url =
    "https://api.studio.thegraph.com/query/94108/notification-bot-for-tracking-usdc-transfers-to-a-specific-address/v0.0.1";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.data.transfers || [];
  } catch (error) {
    console.error("Error fetching data from the subgraph:", error);
    return [];
  }
};

app.get("/", (req, res) => {
  res.render("index", { targetAddress });
});

const clients = new Set();

app.ws("/updates", (ws) => {
  clients.add(ws);
  let previousData = [];

  const checkForNewTransfers = async () => {
    const transfers = await fetchTransfers(targetAddress);
    if (JSON.stringify(transfers) !== JSON.stringify(previousData)) {
      previousData = transfers;
      clients.forEach((client) => client.send(JSON.stringify({ transfers })));
    }
  };

  const intervalId = setInterval(checkForNewTransfers, 20000);

  ws.on("close", () => {
    clearInterval(intervalId);
    clients.delete(ws);
  });
});

app.post("/set-address", (req, res) => {
  const { address } = req.body;
  targetAddress = address;
  console.log("Updated target address:", targetAddress);

  clients.forEach((client) => client.send(JSON.stringify({ targetAddress })));

  res.status(200).json({ message: "Target address updated successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
