// Dummy data
const userDashboardData = {
    ticketsPerClass: [
        { class: "First Class", tickets: 50 },
        { class: "A.C Tier 1", tickets: 70 },
        { class: "A.C Tier 2", tickets: 80 },
        { class: "Tatkal", tickets: 40 }
    ],
    salesPerQuarter: [
        { quarter: "Q1", sales: 200000 },
        { quarter: "Q2", sales: 300000 },
        { quarter: "Q3", sales: 250000 },
        { quarter: "Q4", sales: 400000 }
    ]
};

// Populate Tickets Booked Per Class
function populateUserTicketsPerClass() {
    const tableBody = document.querySelector("#ticketsPerClass tbody");
    tableBody.innerHTML = ""; // Clear the table body

    userDashboardData.ticketsPerClass.forEach(ticket => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${ticket.class}</td><td>${ticket.tickets}</td>`;
        tableBody.appendChild(row);
    });
}

// Populate Sales Per Quarter
function populateUserSalesPerQuarter() {
    const tableBody = document.querySelector("#salesPerQuarter tbody");
    tableBody.innerHTML = ""; // Clear the table body

    userDashboardData.salesPerQuarter.forEach(sale => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${sale.quarter}</td><td>₹${sale.sales.toLocaleString()}</td>`;
        tableBody.appendChild(row);
    });
}

// Initialize User Dashboard Data
document.addEventListener("DOMContentLoaded", () => {
    populateUserTicketsPerClass();
    populateUserSalesPerQuarter();
});