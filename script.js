// Handle Registration
function handleRegistration(event) {
    event.preventDefault();  // Prevent the default form submission

    // Validate the registration form
    if (!validateRegister()) {
        return; // Stop if validation fails
    }

    // Show confirmation message
    document.getElementById("register-form").style.display = "none"; // Hide the form
    document.getElementById("confirmation-message").style.display = "block"; // Show confirmation

    // Simulate a short delay before redirecting (e.g., 2 seconds)
    setTimeout(function() {
        window.location.href = "index.html"; // Redirect to login page
    }, 2000);  // Delay of 2 seconds
}

// Validate Registration
function validateRegister() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const aadhaar = document.getElementById("adhar").value.trim();
    const errorElem = document.getElementById("error-message");

    let users = getUsersFromStorage();

    // Clear error message
    errorElem.textContent = "";

    // Validation for duplicates
    if (users.some(user => user.username.toLowerCase() === username.toLowerCase())) {
        errorElem.textContent = "Username already exists.";
        errorElem.style.display = "block";
        errorElem.style.color = "red";
        return false;
    }
    if (users.some(user => user.email.toLowerCase() === email.toLowerCase())) {
        errorElem.textContent = "Email already registered.";
        errorElem.style.display = "block";
        errorElem.style.color = "red";
        return false;
    }
    if (users.some(user => user.mobile === mobile)) {
        errorElem.textContent = "Mobile number already registered.";
        errorElem.style.display = "block";
        errorElem.style.color = "red";
        return false;
    }
    if (users.some(user => user.aadhaar === aadhaar)) {
        errorElem.textContent = "Aadhaar already registered.";
        errorElem.style.display = "block";
        errorElem.style.color = "red";
        return false;
    }

    // Username Validation (at least 6 characters, no special chars/numbers)
    if (username.length < 6 || /\d|\W/.test(username)) {
        errorElem.textContent = "Username must be at least 6 characters long and contain no special characters or numbers.";
        errorElem.style.display = "block";
        errorElem.style.color = "red";
        return false;
    }

    // Password Validation (at least 8 characters, special char, number, upper case)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
        errorElem.textContent = "Password must be at least 8 characters long, contain at least one special character, one number, and one uppercase letter.";
        errorElem.style.display = "block";
        errorElem.style.color = "red";
        return false;
    }

    // Password Confirmation Validation
    if (password !== confirmPassword) {
        errorElem.textContent = "Password and Confirm Password must match.";
        errorElem.style.display = "block";
        errorElem.style.color = "red";
        return false;
    }

    // Email Validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        errorElem.textContent = "Please enter a valid email address.";
        errorElem.style.display = "block";
        errorElem.style.color = "red";
        return false;
    }

    // Mobile Number Validation (10 digits)
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
        errorElem.textContent = "Please enter a valid 10-digit mobile number.";
        errorElem.style.display = "block";
        errorElem.style.color = "red";
        return false;
    }

    // Adhara Number Validation (Not empty)
    if (aadhaar === "") {
        errorElem.textContent = "Adhara number cannot be empty.";
        errorElem.style.display = "block";
        errorElem.style.color = "red";
        return false;
    }

    // Save user to storage
    users.push({
        username,
        password,
        email,
        mobile,
        aadhaar
    });

    saveUsersToStorage(users);
    return true;
}

// User Login Logic
document.getElementById("login-form")?.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const messageDiv = document.getElementById("message");

    const users = getUsersFromStorage();  // Fetch users from localStorage
    const user = users.find(user => user.username.toLowerCase() === username.toLowerCase());

    if (!user || user.password !== password) {
        messageDiv.textContent = "Invalid username or password!";
        messageDiv.style.color = "red";
        return;
    }

    sessionStorage.setItem("loggedInUser", username);  // Correct storage for logged-in user
    window.location.href = "home.html";  // Redirect to home page
});

// Save the users array to localStorage
function saveUsersToStorage(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

// Retrieve the users array from localStorage
function getUsersFromStorage() {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
}


// Train Booking for customer
// Function to handle form validation
document.addEventListener('DOMContentLoaded', function () {
    const bookTicketForm = document.getElementById('bookTicketForm');
    const updateDetailsForm = document.getElementById('updateDetailsForm');

    // Validate Book Ticket Form
    if (bookTicketForm) {
        bookTicketForm.addEventListener('submit', function (event) {
            let isValid = true;

            // Validate Mobile Number
            const mobile = document.getElementById('mobile').value;
            if (!/^\d{10}$/.test(mobile)) {
                alert('Please enter a valid 10-digit mobile number.');
                isValid = false;
            }

            // Validate Passwords
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (newPassword !== confirmPassword) {
                alert('New Password and Confirm Password do not match.');
                isValid = false;
            }

            if (!isValid) {
                event.preventDefault();
            }
        });
    }

    // Validate Update Details Form
    if (updateDetailsForm) {
        updateDetailsForm.addEventListener('submit', function (event) {
            let isValid = true;

            // Validate Mobile Number
            const mobileNumber = document.getElementById('mobileNumber').value;
            if (!/^\d{10}$/.test(mobileNumber)) {
                alert('Please enter a valid 10-digit mobile number.');
                isValid = false;
            }

            // Validate Passwords
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (newPassword !== confirmPassword) {
                alert('New Password and Confirm Password do not match.');
                isValid = false;
            }

            if (!isValid) {
                event.preventDefault();
            }
        });
    }
});

  // Logout Logic
  function logout() {
    sessionStorage.removeItem("loggedInUser");
    // alert("You have been logged out!");
    window.location.href = "index.html";
  }


  // Script.js

// --- Initialize Local Storage ---
let tickets = JSON.parse(localStorage.getItem("tickets")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

// --- Utility Functions ---
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll("input, select, textarea");
    inputs.forEach(input => {
        if (!input.checkValidity()) {
            input.style.borderColor = "red";
            isValid = false;
        } else {
            input.style.borderColor = "";
        }
    });
    return isValid;
}

// --- Ticket Booking ---
document.getElementById("bookTicketForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate Form
    if (!validateForm(this)) {
        alert("Please fill out all fields correctly.");
        return;
    }

    // Get Form Data
    const ticket = {
        ticketID: `TICKET-${Date.now()}`, // Unique Ticket ID
        userID: document.getElementById("userID").value || "USER-001",
        name: document.getElementById("name").value,
        mobile: document.getElementById("mobile").value,
        age: document.getElementById("age").value,
        date: document.getElementById("date").value,
        boardingStation: document.getElementById("boardingStation").value,
        destinationStation: document.getElementById("destinationStation").value,
        ticketCategory: document.getElementById("ticketCategory").value,
        trainID: document.getElementById("trainID").value,
        numberOfTickets: document.getElementById("numberOfTickets").value,
    };
    

    // Store in Local Storage
    tickets.push(ticket);
    localStorage.setItem("tickets", JSON.stringify(tickets));

    // Redirect to Confirmation Page
    localStorage.setItem("lastTicket", JSON.stringify(ticket));
    window.location.href = "confirmation.html";
});

// --- Confirmation Page ---
if (window.location.pathname.includes("confirmation.html")) {
    const ticket = JSON.parse(localStorage.getItem("lastTicket"));
    if (ticket) {
        document.getElementById("confirmationDetails").innerHTML = `
            <h2>Booking Confirmation</h2>
            <p>Ticket ID: ${ticket.ticketID}</p>
            <p>Name: ${ticket.name}</p>
            <p>Train: ${ticket.trainID}</p>
            <p>From: ${ticket.boardingStation} To: ${ticket.destinationStation}</p>
            <p>Date: ${ticket.date} adate: ${ticket.Aridate}</p>
            <p>Tickets: ${ticket.numberOfTickets}</p>
        `;
    }
}

// --- View Tickets ---
function loadTickets() {
    const ticketsTable = document.getElementById("ticketsTable").querySelector("tbody");

    // Clear the existing table rows
    ticketsTable.innerHTML = "";

    // Retrieve tickets from local storage
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];

    // Populate the table with ticket data
    tickets.forEach(ticket => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${ticket.ticketID}</td>
            <td>${ticket.trainID}</td>
            <td>${ticket.userID}</td>
            <td>${ticket.name}</td>
            <td>${ticket.boardingStation}</td>
            <td>${ticket.destinationStation}</td>
            <td>${ticket.date}</td>
            <td></td>
            <td>${ticket.numberOfTickets}</td>
            <td><button class="deleteTicket" data-id="${ticket.ticketID}">Cancel</button></td>
        `;
        ticketsTable.appendChild(row);
    });

    // Add event listeners to delete buttons
    document.querySelectorAll(".deleteTicket").forEach(button => {
        button.addEventListener("click", function () {
            const id = this.getAttribute("data-id");

            // Display confirmation dialog
            const userConfirmed = confirm("Are you sure you want to cancel this ticket?");
            
            if (userConfirmed) {
                // Filter out the ticket to be deleted
                const updatedTickets = tickets.filter(ticket => ticket.ticketID !== id);

                // Update tickets in local storage
                localStorage.setItem("tickets", JSON.stringify(updatedTickets));

                // Reload the tickets to refresh the table
                loadTickets();

                console.log(`Ticket with ID ${id} has been deleted.`);
            }
        });
    });
}

// Load tickets on page load
loadTickets();


// --- Update User Details ---
document.addEventListener("DOMContentLoaded", function () {
    // Attach submit event to the form
    document.getElementById("updateDetailsForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        // Get input values
        const email = document.getElementById("email").value;
        const mobileNumber = document.getElementById("mobileNumber").value;
        const address = document.getElementById("address").value;
        const currentPassword = document.getElementById("currentPassword").value;
        const newPassword = document.getElementById("newPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        // Form validation
        if (newPassword !== confirmPassword) {
            alert("New passwords do not match.");
            return;
        }

        // Prepare payload
        const payload = {
            email,
            mobileNumber,
            address,
            currentPassword,
            newPassword
        };

        try {
            // Call the backend API to update user details
            const response = await fetch("/api/users/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                alert("Details updated successfully!");
                // Optionally update localStorage
                localStorage.setItem("currentUser", JSON.stringify(data));
            } else {
                const error = await response.json();
                alert(`Failed to update details: ${error.message}`);
            }
        } catch (error) {
            console.error("Error updating details:", error);
            alert("An error occurred. Please try again.");
        }
    });
});


// document.addEventListener("DOMContentLoaded", function () {
//     // Retrieve the ticket details from local storage
//     const lastTicket = JSON.parse(localStorage.getItem("lastTicket"));

//     if (lastTicket) {
//         // Populate the ticket details in the confirmation page
//         document.getElementById("booking-id").textContent = lastTicket.ticketID;
//         // document.getElementById("train-id").textContent = lastTicket.trainID;
//         document.getElementById("boarding-station").textContent = lastTicket.boardingStation;
//         document.getElementById("destination-station").textContent = lastTicket.destinationStation;
//     } else {
//         // If no ticket data is found, redirect to the home page
//         alert("No booking details found. Redirecting to the home page.");
//         window.location.href = "home.html";
//     }
// });


// Retrieve the ticket details from local storage
const lastTicket = JSON.parse(localStorage.getItem("lastTicket"));

if (lastTicket) {
    // Populate the ticket details in the confirmation page
    document.getElementById("booking-id").textContent = lastTicket.ticketID;
    document.getElementById("train-id").textContent = lastTicket.trainID;
    document.getElementById("boarding-station").textContent = lastTicket.boardingStation;
    document.getElementById("destination-station").textContent = lastTicket.destinationStation;
} else {
    // If no ticket data is found, redirect to the home page
    // alert("No booking details found. Redirecting to the home page.");
    window.location.href = "home.html";
}



