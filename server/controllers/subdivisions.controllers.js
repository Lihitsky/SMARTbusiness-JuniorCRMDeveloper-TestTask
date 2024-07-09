import pool from "../config/db.js";

class SubdivisionController {
  // GET Subdivision
  async getSubdivisions(req, res) {
    try {
      const allSubdivision = await pool.query("SELECT * FROM subdivisions");
      res.json(allSubdivision.rows);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
}

export default new SubdivisionController();
