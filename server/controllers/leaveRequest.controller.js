import pool from "../config/db.js";

class LeaveRequestController {
  // CREATE Leave request
  async createLeaveRequest(req, res) {
    try {
      const {
        employee_id,
        absence_reason_id,
        start_date,
        end_date,
        comment,
        status_id,
      } = req.body;
      const newLeaveRequest = await pool.query(
        "INSERT INTO leave_requests (employee_id, absence_reason_id, start_date, end_date, comment, status_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [
          employee_id,
          absence_reason_id,
          start_date,
          end_date,
          comment,
          status_id,
        ]
      );
      res.json(newLeaveRequest.rows[0]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }

  // GET Leave requests
  async getLeaveRequests(req, res) {
    try {
      const allLeaveRequests = await pool.query(
        `SELECT 
          leave_requests.*, 
          employees.full_name AS employee_name, 
          absence_reasons.reason AS absence_reason_name,
          approval_statuses.status_name AS status_name 
        FROM 
          leave_requests 
        JOIN 
          employees ON leave_requests.employee_id = employees.id 
        JOIN 
          absence_reasons ON leave_requests.absence_reason_id = absence_reasons.id 
        JOIN 
          approval_statuses ON leave_requests.status_id = approval_statuses.id`
      );
      res.json(allLeaveRequests.rows);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }

  // GET Leave request by Id
  async getOneLeaveRequest(req, res) {
    try {
      const { id } = req.params;
      const leaveRequest = await pool.query(
        `SELECT 
          leave_requests.*, 
          employees.full_name AS employee_name, 
          absence_reasons.reason AS absence_reason_name,
          approval_statuses.status_name AS status_name 
        FROM 
          leave_requests 
        JOIN 
          employees ON leave_requests.employee_id = employees.id 
        JOIN 
          absence_reasons ON leave_requests.absence_reason_id = absence_reasons.id 
        JOIN 
          approval_statuses ON leave_requests.status_id = approval_statuses.id 
        WHERE 
          leave_requests.id = $1`,
        [id]
      );
      if (leaveRequest.rows.length === 0) {
        return res.status(404).json("Leave request not found");
      }
      res.json(leaveRequest.rows[0]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }

  // UPDATE Leave request
  async updateLeaveRequest(req, res) {
    try {
      const { id } = req.params;
      const {
        employee_id,
        absence_reason_id,
        start_date,
        end_date,
        comment,
        status_id,
      } = req.body;
      await pool.query(
        "UPDATE leave_requests SET employee_id = $1, absence_reason_id = $2, start_date = $3, end_date = $4, comment = $5, status_id = $6 WHERE id = $7",
        [
          employee_id,
          absence_reason_id,
          start_date,
          end_date,
          comment,
          status_id,
          id,
        ]
      );
      console.log("Leave request updated successfully");
      res.json("Leave request updated successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }

  // UPDATE Leave request status
  async updateLeaveRequestStatus(req, res) {
    try {
      const { id } = req.params;
      const { status_id } = req.body;
      await pool.query(
        "UPDATE leave_requests SET status_id = $1 WHERE id = $2",
        [status_id, id]
      );
      res.json("Leave request status updated successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }

  // DELETE Leave request
  async deleteLeaveRequest(req, res) {
    try {
      const { id } = req.params;
      await pool.query("DELETE FROM leave_requests WHERE id = $1", [id]);
      res.json("Leave request deleted successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
}

export default new LeaveRequestController();
