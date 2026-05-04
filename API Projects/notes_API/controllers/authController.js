const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../config/db");


exports.register = async(req, res) => {
  const {email, password } = req.body;

  if(!email || !password){
    return res.status(401).json({ error: "email and password are required" });
  }

  try{
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.execute(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, hashedPassword]
  );
  res.status(201).json({ message: "User registered" });

  }catch (err){
    if(err.code === "ER_DUP_ENTRY"){
      return res.status(400).json({ error: "Email already exists" });
    }

    res.status(500).json({ error: err.message })
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password){
    return res.status(401).json({ error: "email and password are required" });
  }

  try{
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if(rows.length === 0){
      return res.status(404).json({ error: "User not found" });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(201).json({
      message: "Login successful",
      token
    })
  }catch(err){
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}