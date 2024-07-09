import pool from "../config/db.js";

class PositionController {
  // GET Positions
  async getPositions(req, res) {
    try {
      const allPositions = await pool.query("SELECT * FROM positions");
      res.json(allPositions.rows);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
}

export default new PositionController();
