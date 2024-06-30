
-- Create additional table: Subdivisions
CREATE TABLE Subdivision_List (
    id SERIAL PRIMARY KEY,
    subdivision_name VARCHAR(255) NOT NULL UNIQUE
);

-- Create additional table: Positions
CREATE TABLE Position_List (
    id SERIAL PRIMARY KEY,
    position_name VARCHAR(255) NOT NULL UNIQUE
);

-- Create additional table: Absence Reasons
CREATE TABLE Absence_Reason_List (
    id SERIAL PRIMARY KEY,
    reason VARCHAR(255) NOT NULL UNIQUE
);

-- Create additional table: Project Types
CREATE TABLE Project_Type_List (
    id SERIAL PRIMARY KEY,
    project_type VARCHAR(255) NOT NULL UNIQUE
);

-- Create additional table: Approval Statuses
CREATE TABLE Approval_Status_List (
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
    photo BYTEA,
    FOREIGN KEY (subdivision_id) REFERENCES Subdivision_List(id),
    FOREIGN KEY (position_id) REFERENCES Position_List(id),
    FOREIGN KEY (people_partner_id) REFERENCES Employee(id)
);

-- Leave Request table
CREATE TABLE Leave_Request (
    id SERIAL PRIMARY KEY,
    employee_id INT NOT NULL,
    absence_reason_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    comment TEXT,
    status VARCHAR(255) NOT NULL DEFAULT 'New',
    FOREIGN KEY (employee_id) REFERENCES Employee(id),
    FOREIGN KEY (absence_reason_id) REFERENCES Absence_Reason_List(id)
);

-- Approval Request table
CREATE TABLE Approval_Request (
    id SERIAL PRIMARY KEY,
    approver_id INT NOT NULL,
    leave_request_id INT NOT NULL,
    status_id INT NOT NULL,
    comment TEXT,
    FOREIGN KEY (approver_id) REFERENCES Employee(id),
    FOREIGN KEY (leave_request_id) REFERENCES Leave_Request(id),
    FOREIGN KEY (status_id) REFERENCES Approval_Status_List(id)
);

-- Project table
CREATE TABLE Project (
    id SERIAL PRIMARY KEY,
    project_type_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    project_manager_id INT NOT NULL,
    comment TEXT,
    status BOOLEAN NOT NULL,
    FOREIGN KEY (project_type_id) REFERENCES Project_Type_List(id),
    FOREIGN KEY (project_manager_id) REFERENCES Employee(id)
);

-- Insert initial data for Subdivision_List
INSERT INTO Subdivision_List (subdivision_name) VALUES
('HR'),
('IT'),
('Marketing');

-- Insert initial data for Position_List
INSERT INTO Position_List (position_name) VALUES
('HR Manager'),
('Developer'),
('Designer'),
('Analyst'),
('Tester'),
('Project Manager');

-- Insert initial data for Absence_Reason_List
INSERT INTO Absence_Reason_List (reason) VALUES
('Sick Leave'),
('Vacation'),
('Personal Leave');

-- Insert initial data for Project_Type_List
INSERT INTO Project_Type_List (project_type) VALUES
('Internal'),
('External');

-- Insert initial data for Approval_Status_List
INSERT INTO Approval_Status_List (status_name) VALUES
('New'),
('Approved'),
('Rejected');
