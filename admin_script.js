// Data Initialization
const adminData = {
    ticketsPerClass: [
        { class: "First Class", tickets: 120 },
        { class: "A.C Tier 1", tickets: 95 },
        { class: "A.C Tier 2", tickets: 110 },
        { class: "Tatkal", tickets: 150 }
    ],
    salesPerQuarter: [
        { quarter: "Q1", sales: 500000 },
        { quarter: "Q2", sales: 450000 },
        { quarter: "Q3", sales: 480000 },
        { quarter: "Q4", sales: 600000 }
    ],
    clients: [
        { id: 1, name: "John Doe", mobile: "9876543210", tickets: 4 },
        { id: 2, name: "Jane Smith", mobile: "8765432109", tickets: 6 },
        { id: 3, name: "Alice Johnson", mobile: "7654321098", tickets: 3 }
    ]
};

// Populate Tickets Per Class
function populateTicketsPerClass() {
    const tableBody = document.querySelector("#ticketsPerClass tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    adminData.ticketsPerClass.forEach(ticket => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${ticket.class}</td><td>${ticket.tickets}</td>`;
        tableBody.appendChild(row);
    });
}

// Populate Sales Per Quarter
function populateSalesPerQuarter() {
    const tableBody = document.querySelector("#salesPerQuarter tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    adminData.salesPerQuarter.forEach(sale => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${sale.quarter}</td><td>₹${sale.sales.toLocaleString()}</td>`;
        tableBody.appendChild(row);
    });
}

// Populate Clients Table
function populateClients() {
    const tableBody = document.querySelector("#clientsTable tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    adminData.clients.forEach(client => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${client.id}</td>
            <td>${client.name}</td>
            <td>${client.mobile}</td>
            <td>${client.tickets}</td>
            <td>
                <button onclick="removeClient(${client.id})">Remove</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Remove Client
function removeClient(clientId) {
    const clientIndex = adminData.clients.findIndex(client => client.id === clientId);
    if (clientIndex !== -1) {
        adminData.clients.splice(clientIndex, 1);
        populateClients();
        alert("Client removed successfully!");
    }
}

// Logout Functionality
function logout() {
    // alert("Logged out successfully!");
    window.location.href = "admin_login.html";
}

// Initialize Page Data
document.addEventListener("DOMContentLoaded", () => {
    populateTicketsPerClass();
    populateSalesPerQuarter();
    populateClients();
});
