import { useState, useEffect } from "react";
import {
  Table,
  Button,
  FormControl,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import AddLeaveRequestModal from "../modals/AddLeaveRequestModal";
import EditLeaveRequestModal from "../modals/EditLeaveRequestModal";
import axios from "../../utils/axios";

const LeaveRequestList = () => {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortKey, setSortKey] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
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
      const response = await axios.get("leaveRequests");
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching leave requests", error);
    }
  };

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleEdit = (request) => {
    setSelectedRequest(request);
    console.log(selectedRequest);
    setShowEditModal(true);
  };

  const handleSubmitted = async (request) => {
    try {
      await axios.put(`leaveRequest/${request.id}/status`, { status_id: 4 });
      await axios.post("approvalRequest", {
        leave_request_id: request.id,
        status_id: 1,
        approver_id: request.employee_id,
        comment: "",
      });
      handleRefreshList();
    } catch (error) {
      await axios.put(`leaveRequest/${request.id}/status`, { status_id: 4 });
      handleRefreshList();
    }
  };

  const handleCancelled = async (request) => {
    try {
      await axios.put(`leaveRequest/${request.id}/status`, { status_id: 5 });
      await axios.delete(`approvalRequest/${request.id}`);
      handleRefreshList();
    } catch (error) {
      console.error("Error cancelled leave request", error);
    }
  };

  const handleModalClose = () => {
    setShowEditModal(false);
    setShowAddModal(false);
    setSelectedRequest(null);
  };

  // Filtered and sorted leave requests
  const filteredRequests = requests.filter(
    (request) =>
      (filter === "All" || request.status_name === filter) &&
      request.id.toString().includes(search)
  );

  const sortedRequests = filteredRequests.sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return isAscending ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return isAscending ? 1 : -1;
    return 0;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRequests = sortedRequests.slice(
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
        placeholder="Search by request number"
        className="mb-3"
        value={search}
        onChange={handleSearch}
      />
      <DropdownButton title={`Filter: ${filter}`}>
        <Dropdown.Item onClick={() => handleFilter("All")}>All</Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilter("New")}>New</Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilter("Submitted")}>
          Submitted
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilter("Approved")}>
          Approved
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilter("Rejected")}>
          Rejected
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilter("Canceled")}>
          Canceled
        </Dropdown.Item>
      </DropdownButton>
      <Button
        variant="primary"
        className="mt-2 mb-3"
        onClick={() => handleAdd({})}
      >
        Add Leave Request
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>
              Request Number {getSortIndicator("id")}
            </th>
            <th onClick={() => handleSort("employee_name")}>
              Employee {getSortIndicator("employee_name")}
            </th>
            <th onClick={() => handleSort("absence_reason")}>
              Reason {getSortIndicator("absence_reason")}
            </th>
            <th onClick={() => handleSort("start_date")}>
              Start Date {getSortIndicator("start_date")}
            </th>
            <th onClick={() => handleSort("end_date")}>
              End Date {getSortIndicator("end_date")}
            </th>
            <th onClick={() => handleSort("status")}>
              Status {getSortIndicator("status")}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.employee_name}</td>
              <td>{request.absence_reason_name}</td>
              <td>{new Date(request.start_date).toLocaleDateString()}</td>
              <td>{new Date(request.end_date).toLocaleDateString()}</td>
              <td>{request.status_name}</td>
              <td>
                <Button
                  variant="secondary"
                  onClick={() => handleEdit(request)}
                  disabled={
                    request.status_name === "Approved" ||
                    request.status_name === "Canceled"
                  }
                >
                  Edit
                </Button>
                <Button
                  variant="success"
                  className="mx-2"
                  onClick={() => handleSubmitted(request)}
                  disabled={
                    request.status_name !== "New" &&
                    request.status_name !== "Canceled"
                  }
                >
                  Submit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleCancelled(request)}
                  disabled={request.status_name !== "Submitted"}
                >
                  Cancel
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
              currentPage < Math.ceil(filteredRequests.length / itemsPerPage)
                ? currentPage + 1
                : currentPage
            )
          }
          disabled={
            currentPage === Math.ceil(filteredRequests.length / itemsPerPage)
          }
          aria-label="Next Page"
        >
          Next
        </Button>
      </div>

      <AddLeaveRequestModal
        show={showAddModal}
        onClose={handleModalClose}
        onRefreshList={handleRefreshList}
      />

      {selectedRequest && (
        <EditLeaveRequestModal
          show={showEditModal}
          leaveRequest={selectedRequest}
          onClose={handleModalClose}
          onRefreshList={handleRefreshList}
        />
      )}
    </div>
  );
};

export default LeaveRequestList;
