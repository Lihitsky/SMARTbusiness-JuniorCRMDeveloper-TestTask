import pool from "../config/db.js";

class ProjectTypeController {
  // GET Project types
  async getProjectTypes(req, res) {
    try {
      const allProjectTypes = await pool.query(`SELECT * FROM project_types`);
      res.json(allProjectTypes.rows);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
}

export default new ProjectTypeController();
