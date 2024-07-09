import { useState, useEffect } from "react";
import {
  Table,
  Button,
  FormControl,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import EditEmployeeModal from "../modals/EditEmployeeModal";
import axios from "../../utils/axios";
import AddEmployeeModal from "../modals/AddEmployeeModal";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortKey, setSortKey] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page

  useEffect(() => {
    handleRefreshList();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleFilter = (status) => {
    setFilter(status);
    setCurrentPage(1); // Reset to first page when applying filters
  };

  const handleSort = (key) => {
    setIsAscending(sortKey === key ? !isAscending : true);
    setSortKey(key);
  };

  const handleRefreshList = async () => {
    try {
      const response = await axios.get("employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees", error);
    }
  };

  const handleEmployeeStatusToggle = async (id, currentStatus) => {
    try {
      await axios.put(`employee/${id}/status`, {
        status: !currentStatus,
      });
      setEmployees((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: !currentStatus } : e))
      );
    } catch (error) {
      console.error("Error changing employee status", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`employee/${id}`);
      setEmployees((prev) => prev.filter((employee) => employee.id !== id));
    } catch (error) {
      console.error("Error deleting employee", error);
    }
  };

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };

  const handleModalClose = () => {
    setShowEditModal(false);
    setShowAddModal(false);
    setSelectedEmployee(null);
  };

  // Filtered and sorted employees
  const filteredEmployees = employees.filter(
    (employee) =>
      (filter === "All" ||
        (filter === "Active" && employee.status) ||
        (filter === "Inactive" && !employee.status)) &&
      employee.full_name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedEmployees = filteredEmployees.sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return isAscending ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return isAscending ? 1 : -1;
    return 0;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = sortedEmployees.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getSortIndicator = (key) => {
    if (sortKey === key) {
      return isAscending ? "▲" : "▼";
    }
    return "";
  };

  return (
    <div>
      <FormControl
        type="search"
        placeholder="Search by name"
        className="mb-3"
        value={search}
        onChange={handleSearch}
      />
      <DropdownButton title={`Filter: ${filter}`}>
        <Dropdown.Item onClick={() => handleFilter("All")}>All</Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilter("Active")}>
          Active
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilter("Inactive")}>
          Inactive
        </Dropdown.Item>
      </DropdownButton>
      <Button
        variant="primary"
        className="mt-2 mb-3"
        onClick={() => handleAdd({})}
      >
        Add Employee
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={() => handleSort("full_name")}>
              Name {getSortIndicator("full_name")}
            </th>
            <th onClick={() => handleSort("subdivision_id")}>
              Subdivision {getSortIndicator("subdivision_id")}
            </th>
            <th onClick={() => handleSort("position_id")}>
              Position {getSortIndicator("position_id")}
            </th>
            <th onClick={() => handleSort("status")}>
              Status {getSortIndicator("status")}
            </th>
            <th onClick={() => handleSort("people_partner_id")}>
              Partner {getSortIndicator("people_partner_id")}
            </th>
            <th onClick={() => handleSort("out_of_office_balance")}>
              Out off Office balance {getSortIndicator("out_of_office_balance")}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.full_name}</td>
              <td>{employee.subdivision_name}</td>
              <td>{employee.position_name}</td>
              <td>{employee.status ? "Active" : "Inactive"}</td>
              <td>{employee.people_partner_name}</td>
              <td>{employee.out_of_office_balance}</td>
              <td>
                <Button
                  variant="secondary"
                  onClick={() => handleEdit(employee)}
                >
                  Edit
                </Button>
                <Button
                  variant={employee.status ? "danger" : "success"}
                  className="mx-2"
                  onClick={() =>
                    handleEmployeeStatusToggle(employee.id, employee.status)
                  }
                >
                  {employee.status ? "Deactivate" : "Activate"}
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(employee.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination Controls */}
      <div className="pagination">
        <Button
          variant="outline-primary"
          onClick={() =>
            paginate(currentPage > 1 ? currentPage - 1 : currentPage)
          }
          disabled={currentPage === 1}
          aria-label="Previous Page"
        >
          Previous
        </Button>
        <Button
          variant="outline-primary"
          className="mx-2"
          onClick={() =>
            paginate(
              currentPage < Math.ceil(filteredEmployees.length / itemsPerPage)
                ? currentPage + 1
                : currentPage
            )
          }
          disabled={
            currentPage === Math.ceil(filteredEmployees.length / itemsPerPage)
          }
          aria-label="Next Page"
        >
          Next
        </Button>
      </div>

      <AddEmployeeModal
        show={showAddModal}
        onClose={handleModalClose}
        onRefreshList={handleRefreshList}
      />

      {selectedEmployee && (
        <EditEmployeeModal
          show={showEditModal}
          employee={selectedEmployee}
          onClose={handleModalClose}
          onRefreshList={handleRefreshList}
        />
      )}
    </div>
  );
};

export default EmployeeList;
