# DPDzero-Assignment
Short description of  DPDzero-Assignment

#framework used
-node.js - runtime environment
-express.js
-mySQL -As a database
-postman - for api testing

## Features
- User registration and login with JWT token authentication.
- API endpoints for adding, updating, and deleting data with JWT authorization.

### Prerequisites
- Node.js and npm installed.
- MySQL database set up and running.
- install the postman - desktop agent for api testing

### Installation

1. Clone the repository: `git clone https://github.com/your-username/your-repo.git`
2. install express.js - `npm install express`
3. install mysql2 - `npm install mysql2` -for connection mysql server
4. install cors - `npm install cors` -allows browsers to enforce the same-origin policy
5. install .env - `npm install dotenv` -protect the sensitive info
6.install Json web token - `npm install jsonwebtoken` - create jwt token for authorization
8. Run the server: `npm start`


## DB Schema
there are one schema - userinfo
inside the userinfo two tables user and user_data
#### Table: user
| Column        | Data Type     | Constraints            |
|---------------|---------------|------------------------|
| user_id       | INT           | PRIMARY KEY, AUTO_INCREMENT |
| username      | VARCHAR(50)   | NOT NULL, UNIQUE       |
| email         | VARCHAR(100)  | NOT NULL, UNIQUE       |
| password      | VARCHAR(100)  | NOT NULL               |
| full_name     | VARCHAR(100)  | NOT NULL               |
| age           | VARCHAR(100)  | NOT NULL               |
| gender        | VARCHAR(100)  | NOT NULL               |

#### Table: user_data
| Column        | Data Type     | Constraints            |
|---------------|---------------|------------------------|
| key           | VARCHAR(45)   | NOT NULL ,UNIQUE       |
| value         | VARCHAR(100)  | NOT NULL ,             |




   
## API Endpoints
- `POST /api/register` - Register a new user.
- `POST /api/token` -  Create a JWT token for authorized access.
- `POST /api/data` - Add new data with JWT authorization.
- `PUT /api/data/{key}` - Update existing data with JWT authorization.
- `DELETE /api/data/{key}` - Delete data with JWT authorization.

## instructions to run the code and Instructions to setup the code
# setups
--setup the node.js and clone the project - 
--Set up the database:
  -Create a MySQL database and set up the necessary tables as per database schema. You can use tools like phpMyAdmin or MySQL Workbench to create the database 
  and tables manually
-- setup and install packages given above.
--Configure environment variables:
   - PORT_NO
   - DB_USER
   - DB_PASSWORD
   - DB_NAME
   - PRIVATE_KEY
--Run the application:
  - `node index.js`
--Run the application:
  - Once the server is running, open your web browser or use a tool like Postman to test the API endpoints.
  - make sure get the token and use the token on the header with key 'Authorization' and value by bearer followed by token
  - the token expaire in 3600s 
  

