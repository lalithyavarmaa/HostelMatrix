import React, { useEffect, useState } from "react";
import axios from "axios";
import "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import the plugin

import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register the ChartJS components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
ChartJS.register(ChartDataLabels);

const StudentBarGraph = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data from backend...");

        // Fetch data from the backend
        const response = await axios.get("http://localhost:5000/api/bookings/count");
        console.log("Response received:", response.data);

        // Validate the response structure
        if (response.data && Array.isArray(response.data)) {
          const hostelNames = response.data.map((item) => item.hostelName);
          const studentCounts = response.data.map((item) => item.studentCount);

          // Debugging log
          console.log("Hostel Names:", hostelNames);
          console.log("Student Counts:", studentCounts);

          // Check if data arrays are non-empty
          if (hostelNames.length === 0 || studentCounts.length === 0) {
            throw new Error("Data arrays are empty. Please check backend data.");
          }

          // Set chart data
          setChartData({
            labels: hostelNames,
            datasets: [
              {
                label: "Number of Students",
                data: studentCounts,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          });
        } else {
          throw new Error("Invalid data structure received from backend.");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err.message);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Number of Students in Each Hostel</h2>
      <div style={{ width: "70%", margin: "auto" }}>
        <Bar
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Number of Students in Each Hostel",
                font: { size: 18 },
              },
              legend: {
                display: false,
              },
              datalabels: {
                display: true,  // Enable the display of data labels
                align: "top",  // Align data labels to the top of the bar
                anchor: "end",   // Attach the label to the end (top of the bar)
                font: {
                  size: 14,      // Font size for the data labels
                  weight: "bold", 
                },
                color: "black",  // Color of the data labels
                formatter: (value) => `${value}`,  // Format the data label as the student count
                offset: 8,       // Adjust the distance to position the label above the bar
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Number of Students",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Hostel Names",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default StudentBarGraph;
