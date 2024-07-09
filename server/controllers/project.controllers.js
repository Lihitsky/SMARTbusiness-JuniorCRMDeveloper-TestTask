import pool from "../config/db.js";

class ProjectController {
  // CREATE Project
  async createProject(req, res) {
    try {
      const {
        project_type_id,
        start_date,
        end_date,
        project_manager_id,
        comment,
        status,
      } = req.body;
      const newProject = await pool.query(
        "INSERT INTO projects (project_type_id, start_date, end_date, project_manager_id, comment, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [
          project_type_id,
          start_date,
          end_date,
          project_manager_id,
          comment,
          status,
        ]
      );
      res.json(newProject.rows[0]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }

  // GET Projects
  async getProjects(req, res) {
    try {
      const allProjects = await pool.query(
        `SELECT 
          projects.*, 
          project_types.project_type AS project_type_name, 
          employees.full_name AS project_manager_name 
        FROM 
          projects 
        JOIN 
          project_types ON projects.project_type_id = project_types.id 
        JOIN 
          employees ON projects.project_manager_id = employees.id`
      );
      res.json(allProjects.rows);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }

  // GET Project by Id
  async getOneProject(req, res) {
    try {
      const { id } = req.params;
      const project = await pool.query(
        `SELECT 
          projects.*, 
          project_types.name AS project_type_name, 
          employees.full_name AS project_manager_name 
        FROM 
          projects 
        JOIN 
          project_types ON projects.project_type_id = project_types.id 
        JOIN 
          employees ON projects.project_manager_id = employees.id 
        WHERE 
          projects.id = $1`,
        [id]
      );
      if (project.rows.length === 0) {
        return res.status(404).json("Project not found");
      }
      res.json(project.rows[0]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }

  // GET Projects by Type
  async getProjectsByType(req, res) {
    try {
      const { project_type_id } = req.params;
      const projects = await pool.query(
        `SELECT 
          projects.*, 
          project_types.name AS project_type_name, 
          employees.full_name AS project_manager_name 
        FROM 
          projects 
        JOIN 
          project_types ON projects.project_type_id = project_types.id 
        JOIN 
          employees ON projects.project_manager_id = employees.id 
        WHERE 
          projects.project_type_id = $1`,
        [project_type_id]
      );

      if (projects.rows.length === 0) {
        return res.status(404).json("Projects not found");
      }
      res.json(projects.rows);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }

  // UPDATE Project
  async updateProject(req, res) {
    try {
      const { id } = req.params;
      const {
        project_type_id,
        start_date,
        end_date,
        project_manager_id,
        comment,
        status,
      } = req.body;
      await pool.query(
        "UPDATE projects SET project_type_id = $1, start_date = $2, end_date = $3, project_manager_id = $4, comment = $5, status = $6 WHERE id = $7",
        [
          project_type_id,
          start_date,
          end_date,
          project_manager_id,
          comment,
          status,
          id,
        ]
      );
      console.log("Project updated successfully");
      res.json("Project updated successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }

  // UPDATE Project status
  async updateProjectStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      await pool.query("UPDATE projects SET status = $1 WHERE id = $2", [
        status,
        id,
      ]);
      res.json("Project updated successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }

  // DELETE Project
  async deleteProject(req, res) {
    try {
      const { id } = req.params;
      await pool.query("DELETE FROM projects WHERE id = $1", [id]);
      res.json("Project deleted successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
}

export default new ProjectController();
