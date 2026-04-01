const express = require("express");
const { Pool } = require("pg");  // Import the PostgreSQL client (pg)
const path = require("path");

const app = express();
const PORT = 3000;

// PostgreSQL connection pool
const pool = new Pool({
  user: "postgres",  // Default PostgreSQL user
  host: "localhost", // Host where PostgreSQL is running (localhost)
  database: "flames_db",  // The name of the database you created
  password: "Akash@12345",  // Replace with the password you set for PostgreSQL
  port: 5432, // Default port for PostgreSQL
});

// Middleware to parse JSON data from requests
app.use(express.json());
app.use(express.static("public"));

// Save data to PostgreSQL database
app.post("/save", async (req, res) => {
  const { name1, name2, result } = req.body;

  try {
    const query = `
      INSERT INTO results (name1, name2, result)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    
    // Insert data into the database
    const values = [name1, name2, result];
    const dbRes = await pool.query(query, values);

    // Return the saved data as a response
    res.json({
      message: "Saved successfully",
      data: dbRes.rows[0],  // Return the inserted row
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});