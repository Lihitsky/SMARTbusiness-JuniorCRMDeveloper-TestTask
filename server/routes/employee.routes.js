import { Router } from "express";
import employeeControllers from "../controllers/employee.controllers.js";

const router = new Router();

// Create Employee
router.post("/employee", employeeControllers.createEmployee);

// Get Employees
router.get("/employees", employeeControllers.getEmployees);

// Get Employee by Id
router.get("/employee/:id", employeeControllers.getOneEmployee);

// Get Employees by Position
router.get(
  "/employees/position/:position_id",
  employeeControllers.getEmployeesByPosition
);

// Update Employee
router.put("/employee/:id", employeeControllers.updateEmployee);

router.put("/employee/:id/status", employeeControllers.updateEmployeeStatus);

// Delete Employee
router.delete("/employee/:id", employeeControllers.deleteEmployee);

export default router;
