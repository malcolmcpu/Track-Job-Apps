# Job Logger

Job Tracker is a personal app for keeping track of the jobs you've applied for. Create an account, log each application with the company, role, and status, notes; allowing you to edit or delete entries any time. Every account only sees its own applications.

## Demo

## Try it Here!

[Job Logger on Render](https://job-logger-smi6.onrender.com)

## Features

- Sign up and log in with an email and password (passwords are hashed, never stored as plain text)
- Add an application with a company, role, date applied, and notes about the job
- Track each application's status: applied, interviewing, offer, rejected, or withdrawn
- Edit any application using a form that comes prefilled with the saved details.
- Delete an application
- Each user only ever sees and changes their own applications

## Built with

- Node.js and Express
- MongoDB with Mongoose
- EJS templates
- Passport for authorization
- Plain JavaScript, HTML, and CSS

## Getting started

### Prerequisites

- Node.js and npm
- A MongoDB database and its connection string (a free MongoDB Atlas cluster works)

### Installation

1. Clone the repository and move into the project folder:

   ```
   git clone https://github.com/your-username/job-tracker.git
   cd job-tracker
   ```

2. Install the dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the project root and add your MongoDB connection string:

   ```
   MONGO_URI=your_mongodb_connection_string
   ```

4. Start the server:

   ```
   node server.js
   ```

5. Open [http://localhost:8080](http://localhost:8080) in your browser.

## Using the app

Sign up with an email and a password of at least 6 characters, and you'll land on your applications page. Click **Add application** to log a job. Fill in the form and save, and it appears in the list, sorted by date applied with the newest first. Use **Edit** on any row to change its details, like moving it from applied to interviewing, or **Delete** to remove it.
