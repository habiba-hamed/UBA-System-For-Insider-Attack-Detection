// Sample data representing anomalies
const anomaliesData = {
    "101": {
        anomalyId: "101",
        anomalyName: "Anomaly 1",
        role: "Role 1",
        functionalUnit: "Functional Unit 1",
        department: "Department 1",
        team: "Team 1",
        supervisor: "Supervisor 1"
    },
    "102": {
        anomalyId: "102",
        anomalyName: "Anomaly 2",
        role: "Role 2",
        functionalUnit: "Functional Unit 2",
        department: "Department 2",
        team: "Team 2",
        supervisor: "Supervisor 2"
    },
    // Add more anomalies as needed
};

// Simulated backend API endpoint to fetch data related to a specific anomaly ID
function fetchAnomalyData(anomalyId) {
    return new Promise((resolve, reject) => {
        // Simulate delay to mimic network request
        setTimeout(() => {
            if (anomaliesData.hasOwnProperty(anomalyId)) {
                resolve(anomaliesData[anomalyId]);
            } else {
                reject(new Error("Anomaly not found"));
            }
        }, 1000); // Simulated delay of 1 second
    });
}

// Function to fetch anomaly data from the backend using AJAX
/*
function fetchAnomalyDataFromBackend(anomalyId) {
    return fetch(`/api/anomalies/${anomalyId}`) // Replace with your backend endpoint
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
}
*/

// Parse query parameter to get the anomalyId
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const anomalyId = urlParams.get('anomalyId');

// Simulated backend API request to fetch data related to the anomaly ID
fetchAnomalyData(anomalyId)
    .then(data => {
        // Update table with simulated data
        document.getElementById("anomalyId").textContent = data.anomalyId;
        document.getElementById("anomalyName").textContent = data.anomalyName;
        document.getElementById("role").textContent = data.role;
        document.getElementById("functionalUnit").textContent = data.functionalUnit;
        document.getElementById("department").textContent = data.department;
        document.getElementById("team").textContent = data.team;
        document.getElementById("supervisor").textContent = data.supervisor;
    })
    .catch(error => console.error('Error fetching data:', error));

// Fetch data related to the anomaly ID using AJAX
/*
fetchAnomalyDataFromBackend(anomalyId)
    .then(data => {
        // Update table with backend data
        document.getElementById("anomalyId").textContent = data.anomalyId;
        document.getElementById("anomalyName").textContent = data.anomalyName;
        document.getElementById("role").textContent = data.role;
        document.getElementById("functionalUnit").textContent = data.functionalUnit;
        document.getElementById("department").textContent = data.department;
        document.getElementById("team").textContent = data.team;
        document.getElementById("supervisor").textContent = data.supervisor;
    })
    .catch(error => console.error('Error fetching data:', error));
*/

// Event listener for the "Back" button
document.getElementById('backButton').addEventListener('click', function() {
    window.location.href = 'dashboard.html';
});

// Event listener for the "Logout" button
document.getElementById('logoutButton').addEventListener('click', function() {
    window.location.href = 'login.html';
});

