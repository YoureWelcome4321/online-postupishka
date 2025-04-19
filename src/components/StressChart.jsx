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

// Регистрация компонентов Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StressChart = () => {
  const data = {
    labels: ['Стресс', 'Подготовка к ЕГЭ', 'Страх неизвестности', 'Боязнь подвести родителей','Боязнь выбора ВУЗА',"Боязнь не пройти на бюджет"],
    datasets: [
      {
        label: 'Количество ответов',
        data: [18, 20, 15, 9,5,6], // Пример данных (в сумме 62)
        backgroundColor: '#6E7BF2', // Синий цвет столбцов
        borderColor: '#fff', // Белая граница столбцов
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Отключаем легенду
      },
      title: {
        display: true,
        font: {
          size: 18,
          weight: 'bold',
        },
        color: '#fff', // Белый цвет текста заголовка
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Убираем сетку по оси X
        },
        ticks: {
          color: '#fff', // Белый цвет меток по оси X
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#333', // Цвет сетки по оси Y
        },
        ticks: {
          color: '#fff', // Белый цвет меток по оси Y
        },
      },
    },
  };

  return (
    <div className="bg-[#0e0e0e] p-6 rounded-lg shadow-lg" style={{ height: '400px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default StressChart;