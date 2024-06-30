import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

async function start() {
  try {
    app.listen(PORT, () => console.log(`App started at PORT:${PORT}`));
  } catch (error) {
    console.log(error);
  }
}
start();
