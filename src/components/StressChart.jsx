import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StressChart = ({ isDarkMode }) => {
  const data = {
    labels: ['Стресс', 'Подготовка к ЕГЭ', 'Страх неизвестности', 'Боязнь подвести родителей','Боязнь выбора ВУЗА',"Боязнь не пройти на бюджет"],
    datasets: [
      {
        label: 'Количество ответов',
        data: [18, 20, 15, 9,5,6],
        backgroundColor: isDarkMode ? '#6E7BF2' : '#8ec0ff',
        borderColor: isDarkMode ? '#fff' : '#363e45',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Статистика проблем абитуриентов',
        font: { size: 18, weight: 'bold' },
        color: isDarkMode ? '#fff' : '#363e45',
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: isDarkMode ? '#fff' : '#363e45' },
      },
      y: {
        beginAtZero: true,
        grid: { color: isDarkMode ? '#333' : '#e0e0e0' },
        ticks: { color: isDarkMode ? '#fff' : '#363e45' },
      },
    },
  };

  return (
    <div 
      className={` mt-15 p-6 rounded-lg shadow-lg ${
        isDarkMode ? 'bg-[#0e0e0e]' : 'bg-white'
      }`}
      style={{ height: '400px' }}
    >
      <Bar data={data} options={options} />
    </div>
  );
};

export default StressChart;