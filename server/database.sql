
-- Create additional table: Subdivisions
CREATE TABLE Subdivisions (
    id SERIAL PRIMARY KEY,
    subdivision_name VARCHAR(255) NOT NULL UNIQUE
);

-- Create additional table: Positions
CREATE TABLE Positions (
    id SERIAL PRIMARY KEY,
    position_name VARCHAR(255) NOT NULL UNIQUE
);

-- Create additional table: Absence Reasons
CREATE TABLE Absence_Reasons (
    id SERIAL PRIMARY KEY,
    reason VARCHAR(255) NOT NULL UNIQUE
);

-- Create additional table: Project Types
CREATE TABLE Project_Types (
    id SERIAL PRIMARY KEY,
    project_type VARCHAR(255) NOT NULL UNIQUE
);

-- Create additional table: Approval Statuses
CREATE TABLE Approval_Statuses (
    id SERIAL PRIMARY KEY,
    status_name VARCHAR(255) NOT NULL UNIQUE
);

-- Employee table
CREATE TABLE Employee (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    subdivision_id INT NOT NULL,
    position_id INT NOT NULL,
    status BOOLEAN NOT NULL,
    people_partner_id INT NOT NULL,
    out_of_office_balance INT NOT NULL,
    photo TEXT,
    FOREIGN KEY (subdivision_id) REFERENCES Subdivisions(id),
    FOREIGN KEY (position_id) REFERENCES Positions(id),
    FOREIGN KEY (people_partner_id) REFERENCES Employees(id)
);

-- Leave Request table
CREATE TABLE Leave_Requests (
    id SERIAL PRIMARY KEY,
    employee_id INT NOT NULL,
    absence_reason_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    comment TEXT,
    status_id INT DEFAULT 1,
    FOREIGN KEY (employee_id) REFERENCES Employees(id),
    FOREIGN KEY (status_id) REFERENCES Approval_Statuses(id),
    FOREIGN KEY (absence_reason_id) REFERENCES Absence_Reasons(id)
);

-- Approval Request table
CREATE TABLE Approval_Requests (
    id SERIAL PRIMARY KEY,
    approver_id INT NOT NULL,
    leave_request_id INT NOT NULL,
    status_id INT NOT NULL,
    comment TEXT,
    FOREIGN KEY (approver_id) REFERENCES Employees(id),
    FOREIGN KEY (leave_request_id) REFERENCES Leave_Requests(id),
    FOREIGN KEY (status_id) REFERENCES Approval_Statuses(id)
);

-- Project table
CREATE TABLE Projects (
    id SERIAL PRIMARY KEY,
    project_type_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    project_manager_id INT NOT NULL,
    comment TEXT,
    status BOOLEAN NOT NULL,
    FOREIGN KEY (project_type_id) REFERENCES Project_Types(id),
    FOREIGN KEY (project_manager_id) REFERENCES Employees(id)
);

-- Insert initial data for Subdivision_List
INSERT INTO Subdivisions (subdivision_name) VALUES
('HR'),
('IT'),
('Marketing');

-- Insert initial data for Position_List
INSERT INTO Positions (position_name) VALUES
('HR Manager'),
('Developer'),
('Designer'),
('Analyst'),
('Tester'),
('Project Manager');

-- Insert initial data for Absence_Reason_List
INSERT INTO Absence_Reasons (reason) VALUES
('Sick Leave'),
('Vacation'),
('Personal Leave');

-- Insert initial data for Project_Type_List
INSERT INTO Project_Types (project_type) VALUES
('Internal'),
('External');

-- Insert initial data for Approval_Status_List
INSERT INTO Approval_Statuses (status_name) VALUES
('New'),
('Approved'),
('Rejected'),
('Submitted'),
('Canceled');
