import pool from "../config/db.js";

class ApprovalRequestController {
  // CREATE Approval request
  async createApprovalRequest(req, res) {
    try {
      const { approver_id, leave_request_id, status_id, comment } = req.body;

      // Check if an approval request with the same leave_request_id already exists
      const existingRequest = await pool.query(
        "SELECT * FROM approval_requests WHERE leave_request_id = $1",
        [leave_request_id]
      );

      if (existingRequest.rows.length > 0) {
        // If an existing record is found, do not insert a new one
        return res.status(400).json({
          msg: "Approval request with this leave_request_id already exists",
        });
      }

      // Insert a new approval request
      const newApprovalRequest = await pool.query(
        "INSERT INTO approval_requests (approver_id, leave_request_id, status_id, comment) VALUES ($1, $2, $3, $4) RETURNING *",
        [approver_id, leave_request_id, status_id, comment]
      );

      res.json(newApprovalRequest.rows[0]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }

  // GET Approval requests
  async getApprovalRequests(req, res) {
    try {
      const allApprovalRequests = await pool.query(
        `SELECT 
          approval_requests.*, 
          employees.full_name AS approver_name, 
          approval_statuses.status_name AS status_name 
        FROM 
          approval_requests 
        JOIN 
          employees ON approval_requests.approver_id = employees.id 
        JOIN 
          approval_statuses ON approval_requests.status_id = approval_statuses.id`
      );
      res.json(allApprovalRequests.rows);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }

  // GET Approval request by Id
  async getOneApprovalRequest(req, res) {
    try {
      const { id } = req.params;
      const approvalRequest = await pool.query(
        `SELECT 
          approval_requests.*, 
          employees.full_name AS approver_name, 
          approval_statuses.status_name AS status_name 
        FROM 
          approval_requests 
        JOIN 
          employees ON approval_requests.approver_id = employees.id 
        JOIN 
          approval_statuses ON approval_requests.status_id = approval_statuses.id 
        WHERE 
          approval_requests.id = $1`,
        [id]
      );
      if (approvalRequest.rows.length === 0) {
        return res.status(404).json("Approval request not found");
      }
      res.json(approvalRequest.rows[0]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }

  // UPDATE Approval request
  async updateApprovalRequest(req, res) {
    try {
      const { id } = req.params;
      const { approver_id, leave_request_id, status_id, comment } = req.body;
      await pool.query(
        "UPDATE approval_requests SET approver_id = $1, leave_request_id = $2, status_id = $3, comment = $4 WHERE id = $5",
        [approver_id, leave_request_id, status_id, comment, id]
      );
      console.log("Approval request updated successfully");
      res.json("Approval request updated successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }

  async approveApprovalRequest(req, res) {
    try {
      const { id } = req.params;
      const { comment } = req.body;

      const approvalRequest = await pool.query(
        "SELECT * FROM approval_requests WHERE id = $1",
        [id]
      );

      if (approvalRequest.rows.length === 0) {
        return res.status(404).json("Approval request not found");
      }

      const { leave_request_id } = approvalRequest.rows[0];

      // Update approval request with new status and comment
      await pool.query(
        "UPDATE approval_requests SET status_id = $1, comment = $2 WHERE id = $3",
        [2, comment, id]
      );

      // Select leave request related to approve request
      const leaveRequest = await pool.query(
        "SELECT employee_id, start_date, end_date FROM leave_requests WHERE id = $1",
        [leave_request_id]
      );

      const { employee_id, start_date, end_date } = leaveRequest.rows[0];

      const days =
        (new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24);

      // Update employee with new balance
      await pool.query(
        "UPDATE employees SET out_of_office_balance = out_of_office_balance - $1 WHERE id = $2",
        [days, employee_id]
      );

      // Delete approved approve request
      await pool.query("DELETE FROM approval_requests WHERE id = $1", [id]);

      // Update leave request with approved status
      await pool.query(
        "UPDATE leave_requests SET status_id = $1 WHERE id = $2",
        [2, leave_request_id]
      );

      res.json("Approval request approved successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }

  // UPDATE Approval request status
  async rejectApprovalRequest(req, res) {
    try {
      const { id } = req.params;
      const { comment } = req.body;

      const approvalRequest = await pool.query(
        "SELECT * FROM approval_requests WHERE id = $1",
        [id]
      );

      if (approvalRequest.rows.length === 0) {
        return res.status(404).json("Approval request not found");
      }

      const { leave_request_id } = approvalRequest.rows[0];

      // Update leave request with rejected status
      await pool.query(
        "UPDATE leave_requests SET status_id = $1, comment = $2 WHERE id = $3",
        [3, comment, leave_request_id]
      );

      // Delete rejected approve request
      await pool.query("DELETE FROM approval_requests WHERE id = $1", [id]);

      res.json("Approval request approved successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }

  // DELETE Approval request by leave request id
  async deleteApprovalRequest(req, res) {
    try {
      const { leave_request_id } = req.params;
      await pool.query(
        "DELETE FROM approval_requests WHERE leave_request_id = $1",
        [leave_request_id]
      );
      res.json("Approval request deleted successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
}

export default new ApprovalRequestController();
