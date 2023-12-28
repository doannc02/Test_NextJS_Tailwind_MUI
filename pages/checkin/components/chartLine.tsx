import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { convertDate } from '@/helper/date';
import { ListCheckInOKr } from '@/service/checkin/type';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true, // Bắt đầu từ giá trị 0
    },
  },
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Lịch sử check-in',
    },
  },
};

const ChartLine = ({arrData}: {arrData: ListCheckInOKr[]}) => {
  const convertedArrData = Array.isArray(arrData) ? arrData : [];
  console.log(convertedArrData, Array.isArray(convertedArrData), "arrData");

  const labels = convertedArrData.map(item => convertDate(item.StartDate.toString()));
  const data = {
    labels,
    datasets: [
      {
        label: 'OKR percent',
        data: convertedArrData.map(item => item.Okrpercent),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return <Line height={100} options={options} data={data} />;
};
export default ChartLine