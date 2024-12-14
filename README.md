To develop a simple web-based application for tracking and managing IT support tickets using HTML, CSS, and JavaScript, we can break it down into several key components:

1. **HTML Structure**: Define the structure of the application, including areas for displaying ticket details, a form for submitting new tickets, and a list of existing tickets.
   
2. **CSS Styling**: Style the page to make it user-friendly and visually appealing.

3. **JavaScript**: Implement functionality for creating, viewing, and managing tickets. This will include handling form submissions, adding tickets to a list, and updating the status of each ticket.

### 1. HTML (index.html)

The HTML file defines the structure of the application. It includes an input form for creating new tickets, a table to display the existing tickets, and placeholders for managing tickets.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IT Support Ticket Tracker</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>IT Support Ticket Tracker</h1>

    <!-- Ticket Submission Form -->
    <div class="form-container">
      <h2>Create New Ticket</h2>
      <form id="ticketForm">
        <label for="title">Ticket Title:</label>
        <input type="text" id="title" required>

        <label for="description">Description:</label>
        <textarea id="description" required></textarea>

        <label for="priority">Priority:</label>
        <select id="priority" required>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button type="submit">Submit Ticket</button>
      </form>
    </div>

    <!-- Ticket List -->
    <div class="ticket-list">
      <h2>Ticket List</h2>
      <table id="ticketTable">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <!-- Tickets will be displayed here -->
        </tbody>
      </table>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

### 2. CSS (styles.css)

The CSS file provides styling to make the application visually appealing and easy to use.

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  padding: 20px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form-container, .ticket-list {
  margin-bottom: 30px;
}

form {
  display: flex;
  flex-direction: column;
}

form label {
  margin-top: 10px;
  font-weight: bold;
}

form input, form textarea, form select {
  margin-top: 5px;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

form button {
  margin-top: 20px;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

form button:hover {
  background-color: #45a049;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

table th, table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

button.delete {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
}

button.delete:hover {
  background-color: darkred;
}

button.resolve {
  background-color: blue;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
}

button.resolve:hover {
  background-color: darkblue;
}
```

### 3. JavaScript (script.js)

The JavaScript file implements the functionality for adding new tickets, displaying them, and changing their status.

```javascript
// Store the tickets in an array (you could use a server-side database in a real application)
let tickets = [];

// Function to handle form submission
document.getElementById("ticketForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission from reloading the page

  // Get the form data
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const priority = document.getElementById("priority").value;

  // Create a new ticket object
  const newTicket = {
    id: Date.now(),
    title: title,
    description: description,
    priority: priority,
    status: "Open"
  };

  // Add the new ticket to the tickets array
  tickets.push(newTicket);

  // Clear the form
  document.getElementById("ticketForm").reset();

  // Display the tickets
  displayTickets();
});

// Function to display tickets in the table
function displayTickets() {
  const ticketTableBody = document.getElementById("ticketTable").getElementsByTagName("tbody")[0];
  ticketTableBody.innerHTML = ""; // Clear existing tickets

  // Add each ticket to the table
  tickets.forEach(ticket => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${ticket.title}</td>
      <td>${ticket.description}</td>
      <td>${ticket.priority}</td>
      <td>${ticket.status}</td>
      <td>
        <button class="resolve" onclick="resolveTicket(${ticket.id})">Resolve</button>
        <button class="delete" onclick="deleteTicket(${ticket.id})">Delete</button>
      </td>
    `;

    ticketTableBody.appendChild(row);
  });
}

// Function to resolve a ticket
function resolveTicket(ticketId) {
  const ticket = tickets.find(t => t.id === ticketId);
  if (ticket) {
    ticket.status = "Resolved";
    displayTickets();
  }
}

// Function to delete a ticket
function deleteTicket(ticketId) {
  tickets = tickets.filter(t => t.id !== ticketId);
  displayTickets();
}
```

### Explanation of Key Components

1. **HTML**:
   - A form to submit new tickets, including fields for the title, description, and priority.
   - A table where existing tickets are displayed with their title, description, priority, status, and options to either resolve or delete a ticket.

2. **CSS**:
   - Basic styling for the page layout, form elements, buttons, and the table. It enhances the visual appeal and provides a user-friendly interface.

3. **JavaScript**:
   - **Ticket Management**: Functions to handle ticket submission, resolve a ticket (changing its status), and delete a ticket.
   - **State Management**: Uses an array (`tickets`) to store the tickets, and the page is updated dynamically whenever a ticket is added, resolved, or deleted.

### How it Works

1. **Add Ticket**: The user fills in the form and submits it. A new ticket is added to the `tickets` array and displayed in the table.
2. **Resolve Ticket**: The user can click the "Resolve" button to mark the ticket as "Resolved."
3. **Delete Ticket**: The user can delete a ticket by clicking the "Delete" button, removing it from the list.

### Conclusion
This is a simple IT support ticket tracker. For a more advanced system, you could integrate backend technologies like Node.js with a database to store tickets persistently. However, this example covers basic functionality and can be extended in the future to include more features such as ticket categorization, due dates, or user authentication.
