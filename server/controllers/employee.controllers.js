import pool from "../config/db.js";

class EmployeeController {
  // CREATE Employee
  async createEmployee(req, res) {
    try {
      const {
        full_name,
        subdivision_id,
        position_id,
        status,
        people_partner_id,
        out_of_office_balance,
        photo,
      } = req.body;
      const newEmployee = await pool.query(
        "INSERT INTO employees (full_name, subdivision_id, position_id, status, people_partner_id, out_of_office_balance, photo) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [
          full_name,
          subdivision_id,
          position_id,
          status,
          people_partner_id,
          out_of_office_balance,
          photo,
        ]
      );
      res.json(newEmployee.rows[0]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }

  // GET Employees
  async getEmployees(req, res) {
    try {
      const allEmployees = await pool.query(
        `SELECT 
          employees.*, 
          positions.position_name AS position_name, 
          subdivisions.subdivision_name AS subdivision_name, 
          pp.full_name AS people_partner_name 
        FROM 
          employees 
        JOIN 
          positions ON employees.position_id = positions.id 
        JOIN 
          subdivisions ON employees.subdivision_id = subdivisions.id 
        LEFT JOIN 
          employees pp ON employees.people_partner_id = pp.id`
      );
      res.json(allEmployees.rows);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }

  // GET Employee by Id
  async getOneEmployee(req, res) {
    try {
      const { id } = req.params;
      const employee = await pool.query(
        "SELECT * FROM Employees WHERE id = $1",
        [id]
      );
      if (employee.rows.length === 0) {
        return res.status(404).json("Employee not found");
      }
      res.json(employee.rows[0]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }

  // GET Employees by Position
  async getEmployeesByPosition(req, res) {
    try {
      const { position_id } = req.params;
      const employees = await pool.query(
        `SELECT e.id, e.full_name, s.subdivision_name, p.position_name, e.status, e.out_of_office_balance, e.photo
        FROM employees e
        JOIN Subdivisions s ON e.subdivision_id = s.id
        JOIN Positions p ON e.position_id = p.id
        WHERE e.position_id = $1`,
        [position_id]
      );

      if (employees.rows.length === 0) {
        return res.status(404).json("Employees not found");
      }
      res.json(employees.rows);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }

  // UPDATE Employee
  async updateEmployee(req, res) {
    try {
      const { id } = req.params;
      const {
        full_name,
        subdivision_id,
        position_id,
        status,
        people_partner_id,
        out_of_office_balance,
        photo,
      } = req.body;
      await pool.query(
        "UPDATE employees SET full_name = $1, subdivision_id = $2, position_id = $3, status = $4, people_partner_id = $5, out_of_office_balance = $6, photo = $7 WHERE id = $8",
        [
          full_name,
          subdivision_id,
          position_id,
          status,
          people_partner_id,
          out_of_office_balance,
          photo,
          id,
        ]
      );
      console.log("Employee updated successfully");
      res.json("Employee updated successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }

  // UPDATE Employee status
  async updateEmployeeStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      await pool.query("UPDATE employees SET status = $1 WHERE id = $2", [
        status,
        id,
      ]);
      res.json("Employee updated successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }

  // DELETE Employee
  async deleteEmployee(req, res) {
    try {
      const { id } = req.params;
      await pool.query("DELETE FROM employees WHERE id = $1", [id]);
      res.json("Employee deleted successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
}

export default new EmployeeController();
