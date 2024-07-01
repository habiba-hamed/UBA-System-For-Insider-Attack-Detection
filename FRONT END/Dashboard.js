// document.addEventListener("DOMContentLoaded", function () {
//     // Fetch username
//     fetchUsername();

//     // Fetch total users count
//     fetchUserData('/api/totalUsers', 'totalUsersCount');

//     // Fetch active users count
//     fetchUserData('/api/activeUsers', 'activeUsersCount');

//     // Fetch alerts count
//     fetchUserData('/api/alerts', 'alertsCount');

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

// function fetchUserData(url, targetElementId) {
//     fetch(url)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             const count = data.count;
//             document.getElementById(targetElementId).textContent = count;
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

// function populateTable(data) {
//     const tableBody = document.getElementById('data-table-body');

//     // Loop through the data and create table rows
//     data.forEach(rowData => {
//         const row = document.createElement('tr');

//         // Create table cells for each column
//         const alertIdCell = document.createElement('td');
//         alertIdCell.textContent = rowData.alertId;
//         row.appendChild(alertIdCell);

//         const dateCell = document.createElement('td');
//         dateCell.textContent = rowData.date;
//         row.appendChild(dateCell);

//         const anomalyIdCell = document.createElement('td');
//         anomalyIdCell.textContent = rowData.anomalyId;
//         row.appendChild(anomalyIdCell);

//         const anomalySCCell = document.createElement('td');
//         anomalySCCell.textContent = rowData.anomalySC;
//         row.appendChild(anomalySCCell);

//         // Create the Triaged cell with red light
//         const triagedCell = document.createElement('td');
//         triagedCell.classList.add('red-led'); // Add the red-led class by default
//         triagedCell.addEventListener('click', () => {
//             toggleTriagedValue(triagedCell);
//         });
//         row.appendChild(triagedCell);

//         // Append the row to the table body
//         tableBody.appendChild(row);
//     });
// }

// function toggleTriagedValue(cell) {
//     cell.classList.toggle('red-led');
//     cell.classList.toggle('transparent-led');
// }



function drawPieChart() {
    const data = {
        labels: ['Sc-1: Data Exfiltration', 'Sc-2: Intellectual property thief', 'Sc-3: KeyLogger'],
        datasets: [{
            data: [30, 40, 30], // Sample data percentages
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)'
            ]
        }]
    };

    const ctx = document.getElementById('pieChart').getContext('2d');
    const pieChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            plugins: {
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        color: 'black' // 'fontColor' is deprecated, use 'color'
                    }
                }
            }
        }
    });
}

drawPieChart();





function populateTable(data) {
    const tableBody = document.getElementById('data-table-body');

    // Loop through the data and create table rows
    data.forEach(rowData => {
        const row = document.createElement('tr');

        // Create table cells for each column
        const alertIdCell = document.createElement('td');
        alertIdCell.textContent = rowData.alertId;
        row.appendChild(alertIdCell);

        const dateCell = document.createElement('td');
        dateCell.textContent = rowData.date;
        row.appendChild(dateCell);

        const anomalyIdCell = document.createElement('td');
        const anomalyIdLink = document.createElement('a');
        anomalyIdLink.textContent = rowData.anomalyId;
        anomalyIdLink.href = `User_Profile.html?anomalyId=${rowData.anomalyId}`; // Redirect to User Profile with anomalyId as query parameter
        anomalyIdCell.appendChild(anomalyIdLink);
        row.appendChild(anomalyIdCell);

        const anomalySCCell = document.createElement('td');
        anomalySCCell.textContent = rowData.anomalySC;
        row.appendChild(anomalySCCell);

        const triagedCell = document.createElement('td');
        triagedCell.classList.add('red-led');
        triagedCell.addEventListener('click', () => {
            toggleTriagedValue(triagedCell);
        });
        row.appendChild(triagedCell);

        tableBody.appendChild(row);
    });
}

function toggleTriagedValue(cell) {
    cell.classList.toggle('red-led');
    cell.classList.toggle('transparent-led');
}

document.getElementById('logoutButton').addEventListener('click', function () {
    sessionStorage.removeItem('username');
    window.location.href = "login.html";
});

document.addEventListener("DOMContentLoaded", function () {
    const username = sessionStorage.getItem('username');
    const sidebarTitle = document.querySelector('.sidebar h1');
    sidebarTitle.textContent = username ? 'Welcome ' + username : '';

    fetchUserData('/api/totalUsers', 'totalUsersCount');
    fetchUserData('/api/activeUsers', 'activeUsersCount');
    fetchUserData('/api/alerts', 'alertsCount');

    const mockTableData = [
        { alertId: 1, date: "2024-05-15", anomalyId: 101, anomalySC: "1", triaged: true },
        { alertId: 2, date: "2024-05-16", anomalyId: 102, anomalySC: "2", triaged: false },
        { alertId: 3, date: "2024-05-17", anomalyId: 103, anomalySC: "3", triaged: false },
        // Add more data as needed
    ];
    populateTable(mockTableData);
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
        }, 1000);
    });
}

const totalUsersCount = 1000;
const activeUsersCount = 750;
const alertsCount = 20; 

