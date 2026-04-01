document.getElementById("checkBtn").addEventListener("click", async () => {
  const name1 = document.getElementById("name1").value.toLowerCase().replace(/\s/g, "");
  const name2 = document.getElementById("name2").value.toLowerCase().replace(/\s/g, "");

  if (!name1 || !name2) {
    alert("Enter both names");
    return;
  }

  const result = calculateFlames(name1, name2);
  document.getElementById("result").innerText = result;

  // Send to backend
  await fetch("/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name1, name2, result })
  });
});

// FLAMES logic
function calculateFlames(n1, n2) {
  let arr1 = n1.split("");
  let arr2 = n2.split("");

  // remove common letters
  for (let i = 0; i < arr1.length; i++) {
    let index = arr2.indexOf(arr1[i]);
    if (index !== -1) {
      arr2.splice(index, 1);
      arr1.splice(i, 1);
      i--;
    }
  }

  let count = arr1.length + arr2.length;

  let flames = ["F", "L", "A", "M", "E", "S"];

  let index = 0;
  while (flames.length > 1) {
    index = (index + count - 1) % flames.length;
    flames.splice(index, 1);
  }

  const map = {
    F: "Friends 👬",
    L: "Love ❤️",
    A: "Affection 😊",
    M: "Marriage 💍",
    E: "Enemies 😡",
    S: "Siblings 👨‍👩‍👧"
  };

  return map[flames[0]];
}

app.get("/results", async (req, res) => {
  const data = await pool.query("SELECT * FROM results ORDER BY id DESC");
  res.json(data.rows);
});