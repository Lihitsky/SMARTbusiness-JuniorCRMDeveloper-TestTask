import pool from "../config/db.js";

class ApprovalStatusesController {
  // GET Absence reasons
  async getApprovalStatuses(req, res) {
    try {
      const allApprovalStatuses = await pool.query(
        `SELECT * FROM approval_statuses`
      );
      res.json(allApprovalStatuses.rows);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
}

export default new ApprovalStatusesController();
