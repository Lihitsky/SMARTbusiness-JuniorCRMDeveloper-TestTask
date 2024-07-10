import { useState, useEffect } from "react";
import {
  Table,
  Button,
  FormControl,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import AddProjectModal from "../modals/AddProjectModal";
import EditProjectModal from "../modals/EditProjectModal";
import axios from "../../utils/axios";

const ProjectList = () => {
  const { role } = useParams();
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortKey, setSortKey] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
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
      const response = await axios.get("projects");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects", error);
    }
  };

  const handleProjectStatusToggle = async (id, currentStatus) => {
    try {
      await axios.put(`project/${id}/status`, {
        status: !currentStatus,
      });
      setProjects((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: !currentStatus } : e))
      );
    } catch (error) {
      console.error("Error deactivating project", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`project/${id}`);
      setProjects((prev) => prev.filter((project) => project.id !== id));
    } catch (error) {
      console.error("Error deleting project", error);
    }
  };

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setShowEditModal(true);
  };

  const handleModalClose = () => {
    setShowEditModal(false);
    setShowAddModal(false);
    setSelectedProject(null);
  };

  // Filtered and sorted projects
  const filteredProjects =
    projects &&
    projects.filter(
      (project) =>
        (filter === "All" ||
          (filter === "Active" && project.status) ||
          (filter === "Inactive" && !project.status)) &&
        project.id.toString().includes(search.toLowerCase())
    );

  const sortedProjects = filteredProjects.sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return isAscending ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return isAscending ? 1 : -1;
    return 0;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = sortedProjects.slice(
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
        placeholder="Search by number"
        className="mb-3"
        value={search}
        onChange={handleSearch}
      />
      <DropdownButton title={`Filter: ${filter}`} className="mb-3">
        <Dropdown.Item onClick={() => handleFilter("All")}>All</Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilter("Active")}>
          Active
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilter("Inactive")}>
          Inactive
        </Dropdown.Item>
      </DropdownButton>
      {role !== "HR" && (
        <Button
          variant="primary"
          className="mt-2 mb-3"
          onClick={() => handleAdd({})}
        >
          Add Project
        </Button>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>
              Number {getSortIndicator("id")}
            </th>
            <th onClick={() => handleSort("project_type_name")}>
              Project Type {getSortIndicator("project_type_name")}
            </th>
            <th onClick={() => handleSort("start_date")}>
              Start Date {getSortIndicator("start_date")}
            </th>
            <th onClick={() => handleSort("end_date")}>
              End Date {getSortIndicator("end_date")}
            </th>
            <th onClick={() => handleSort("project_manager_id")}>
              Project Manager {getSortIndicator("project_manager_id")}
            </th>
            <th onClick={() => handleSort("status")}>
              Status {getSortIndicator("status")}
            </th>
            <th onClick={() => handleSort("comment")}>
              Comment {getSortIndicator("comment")}
            </th>
            {role !== "HR" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {currentProjects.map((project) => (
            <tr key={project.id}>
              <td>{project.id}</td>
              <td>{project.project_type_name}</td>
              <td>{new Date(project.start_date).toLocaleDateString()}</td>
              <td>{new Date(project.end_date).toLocaleDateString()}</td>
              <td>{project.project_manager_name}</td>
              <td>{project.status ? "Active" : "Inactive"}</td>
              <td>{project.comment}</td>
              {role !== "HR" && (
                <td>
                  <Button
                    variant="secondary"
                    onClick={() => handleEdit(project)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant={project.status ? "danger" : "success"}
                    className="mx-2"
                    onClick={() =>
                      handleProjectStatusToggle(project.id, project.status)
                    }
                  >
                    {project.status ? "Deactivate" : "Activate"}
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </Button>
                </td>
              )}
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
              currentPage < Math.ceil(filteredProjects.length / itemsPerPage)
                ? currentPage + 1
                : currentPage
            )
          }
          disabled={
            currentPage === Math.ceil(filteredProjects.length / itemsPerPage)
          }
          aria-label="Next Page"
        >
          Next
        </Button>
      </div>
      <AddProjectModal
        show={showAddModal}
        onClose={handleModalClose}
        onRefreshList={handleRefreshList}
      />
      {selectedProject && (
        <EditProjectModal
          show={showEditModal}
          project={selectedProject}
          onClose={handleModalClose}
          onRefreshList={handleRefreshList}
        />
      )}
    </div>
  );
};

export default ProjectList;
