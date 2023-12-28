import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
} as any;

const ChartLayout = React.memo(({ dtProps }: { dtProps: number[][] }) => {
  const labels = ["Quý I", "Quý II", "Quý III", "Quý IV"];
  const log = labels.map((_, index) =>
    dtProps[index].map((item) => parseInt(item.toString()))
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Objective 1",
        data: log[0],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Objective 2",
        data: log[1],
        backgroundColor: "rgba(0, 24, 235, 0.5)",
      },
      {
        label: "Objective 3",
        data: log[2],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Objective 4",
        data: log[3],
        backgroundColor: "rgba(0, 139, 39, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
});

export default ChartLayout;
