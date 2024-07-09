import pool from "../config/db.js";

class AbsenceReasonController {
  // GET Absence reasons
  async getAbsenceReasons(req, res) {
    try {
      const allAbsenceReasons = await pool.query(
        `SELECT * FROM absence_reasons`
      );
      res.json(allAbsenceReasons.rows);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
}

export default new AbsenceReasonController();
