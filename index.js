const express = require("express");
const bodyParser = require("body-parser");

const server = express();

const portfolioRoutes = require("./routes/portfolios");
const blogsRoutes = require("./routes/blogs");

const runServer = async () => {
  await require("./db/index").connect();
  const PORT = process.env.PORT || 3001;
  server.use(bodyParser.json());

  server.use("/api/v1", portfolioRoutes);
  server.use("/api/v1", blogsRoutes);

  server.get("/server", (req, res) => {
    res.json({ message: "server is working" });
  });

  server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};

runServer();
