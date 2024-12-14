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
