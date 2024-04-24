// document.addEventListener("DOMContentLoaded", function () {
//     // Fetch username
//     fetchUsername();

//     // Fetch total users count
//     fetchUserData('totalUsers');

//     // Fetch active users count
//     fetchUserData('activeUsers');

//     // Fetch number of alerts
//     fetchUserData('alerts');

//     // Fetch and populate table data
//     fetchTableData();
// });

// function fetchUsername() {
//     // Assuming your backend API endpoint for fetching username is /api/username
//     fetch('/api/username')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             const username = data.username;
//             // Display username in the sidebar
//             const sidebarTitle = document.querySelector('.sidebar h1');
//             sidebarTitle.textContent = username ? 'Welcome ' + username : '';
//         })
//         .catch(error => console.error('Error fetching username:', error));
// }

// function fetchUserData(type) {
//     fetch(`/api/${type}`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             const count = data.count;
//             if (type === 'totalUsers') {
//                 document.getElementById('totalUsersCount').textContent = count;
//             } else if (type === 'activeUsers') {
//                 document.getElementById('activeUsersCount').textContent = count;
//             } else if (type === 'alerts') {
//                 document.getElementById('alertsCount').textContent = count;
//             }
//         })
//         .catch(error => console.error('Error fetching data:', error));
// }

// function fetchTableData() {
//     // Assuming your backend API endpoint for fetching table data is /api/tabledata
//     fetch('/api/tabledata')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             // Populate table with data
//             populateTable(data);
//         })
//         .catch(error => console.error('Error fetching table data:', error));
// }
//--------
// function populateTable(data) {
//     const tableBody = document.getElementById('data-table-body');

//     // Loop through the data and create table rows
//     data.forEach(rowData => {
//         const row = document.createElement('tr');

//         // Create table cells for each column
//         const userIdCell = document.createElement('td');
//         userIdCell.textContent = rowData.userId;
//         row.appendChild(userIdCell);

//         const insiderCell = document.createElement('td');
//         insiderCell.textContent = rowData.insider;
//         row.appendChild(insiderCell);

//         const triagedCell = document.createElement('td');
//         triagedCell.textContent = rowData.triaged;
//         row.appendChild(triagedCell);

//         // Add click event listener to toggle triaged value
//         row.addEventListener('click', () => {
//             toggleTriagedValue(triagedCell);
//         });

//         // Append the row to the table body
//         tableBody.appendChild(row);
//     });
// }

// function toggleTriagedValue(cell) {
//     // Toggle between "Yes" and "No"
//     cell.textContent = cell.textContent === "Yes" ? "No" : "Yes";
// }
//--------------

function populateTable(data) {
    const tableBody = document.getElementById('data-table-body');

    // Loop through the data and create table rows
    data.forEach(rowData => {
        const row = document.createElement('tr');

        // Create table cells for each column
        const userIdCell = document.createElement('td');
        userIdCell.textContent = rowData.userId;
        row.appendChild(userIdCell);

        const insiderCell = document.createElement('td');
        insiderCell.textContent = rowData.insider;
        row.appendChild(insiderCell);

        const triagedCell = document.createElement('td');
        triagedCell.classList.add('red-led'); // Add the red-led class by default
        row.appendChild(triagedCell);

        // Add click event listener to toggle triaged value
        row.addEventListener('click', () => {
            toggleTriagedValue(triagedCell);
        });

        // Append the row to the table body
        tableBody.appendChild(row);
    });
}
function toggleTriagedValue(cell) {
    cell.classList.toggle('red-led');
    cell.classList.toggle('transparent-led');
}

// Add event listener to logout button
document.getElementById('logoutButton').addEventListener('click', function () {
    // Clear sessionStorage
    sessionStorage.removeItem('username');
    // Redirect to login page
    window.location.href = "login.html";
});



// SIMULATE THE BACKEND!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
document.addEventListener("DOMContentLoaded", function () {
    // Fetch total users count
    fetchUserData('/api/totalUsers', 'totalUsersCount');

    // Fetch active users count
    fetchUserData('/api/activeUsers', 'activeUsersCount');

    // Fetch number of alerts
    fetchUserData('/api/alerts', 'alertsCount');
    // Retrieve username from sessionStorage
    const username = sessionStorage.getItem('username');

    // Display username in the sidebar
    const sidebarTitle = document.querySelector('.sidebar h1');
    sidebarTitle.textContent = username ? 'Welcome ' + username : '';
});

function fetchUserData(url, targetElementId) {
    handleRequest(url)
        .then(data => {
            const count = data.count;
            document.getElementById(targetElementId).textContent = count;
        })
        .catch(error => console.error('Error fetching data:', error));
}

function handleRequest(url) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            if (url === '/api/totalUsers') {
                resolve({ count: totalUsersCount });
            } else if (url === '/api/activeUsers') {
                resolve({ count: activeUsersCount });
            } else if (url === '/api/alerts') {
                resolve({ count: alertsCount });
            } else {
                reject(new Error('Invalid endpoint'));
            }
        }, 1000); // Simulated delay of 1 second
    });
}

// Mock data representing total users, active users, and alerts count
const totalUsersCount = 1000;
const activeUsersCount = 750;
const alertsCount = 20; // Example value, replace with actual alerts count

// Define mock table data
const mockTableData = [
    { userId: 1, insider: "Yes" },
    { userId: 2, insider: "No" },
    { userId: 3, insider: "Yes" },
    { userId: 3, insider: "Yes" },
    { userId: 3, insider: "Noooooooooooooooooooo" }
];

// Call populateTable function with mock data
populateTable(mockTableData);

