import { useState, useEffect } from "react";
import {
  Table,
  Button,
  FormControl,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import axios from "../../utils/axios";

const ApprovalRequestList = () => {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortKey, setSortKey] = useState("");
  const [isAscending, setIsAscending] = useState(true);
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
      const response = await axios.get("approvalRequests");
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching approval requests", error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`approvalRequest/${id}/approve`);
      handleRefreshList();
    } catch (error) {
      console.error("Error approving request", error);
    }
  };

  const handleReject = async (id, comment) => {
    try {
      await axios.put(`approvalRequest/${id}/reject`, { comment });
      handleRefreshList();
    } catch (error) {
      console.error("Error rejecting request", error);
    }
  };

  // Filtered and sorted approval requests
  const filteredRequests = requests.filter(
    (request) =>
      (filter === "All" || request.status === filter) &&
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
      <DropdownButton title={`Filter: ${filter}`} className="mb-3">
        <Dropdown.Item onClick={() => handleFilter("All")}>All</Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilter("New")}>New</Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilter("Approved")}>
          Approved
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilter("Rejected")}>
          Rejected
        </Dropdown.Item>
      </DropdownButton>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>
              Request Number {getSortIndicator("id")}
            </th>
            <th onClick={() => handleSort("employee_name")}>
              Employee {getSortIndicator("employee_name")}
            </th>
            <th onClick={() => handleSort("status")}>
              Status {getSortIndicator("status")}
            </th>
            <th>Comment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.approver_name}</td>
              <td>{request.status_name}</td>
              <td>{request.comment}</td>
              <td>
                <Button
                  variant="success"
                  className="mx-2"
                  onClick={() => handleApprove(request.id)}
                >
                  Approve
                </Button>
                <Button
                  variant="danger"
                  onClick={() =>
                    handleReject(request.id, prompt("Enter rejection comment"))
                  }
                >
                  Reject
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
    </div>
  );
};

export default ApprovalRequestList;
