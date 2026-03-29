const bcrypt = require("bcrypt");

app.post("/register", async (req, res) => {
  try {
    const { password, ...rest } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      ...rest,
      password: hashed
    });

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: "User already exists" });
  }
});