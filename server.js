const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

// Save data
app.post("/save", (req, res) => {
  const { name1, name2, result } = req.body;

  const filePath = path.join(__dirname, "data.json");

  let data = [];

  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath));
  }

  data.push({ name1, name2, result, time: new Date() });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  res.json({ message: "Saved successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});