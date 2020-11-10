import express from 'express';

const app = express();

app.get("/", (req, res) => {
  res.send("Hi, from express");
});

// start express server on port 5000
// todo get port from environment
const PORT = 8080
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
