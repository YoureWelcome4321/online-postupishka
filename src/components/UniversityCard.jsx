import React from "react";
import { motion } from "framer-motion";

const UniversityCard = ({ results }) => {
  // Проверяем наличие обязательных полей
  if (!results || !results.university) {
    return (
      <div className="p-4 text-center text-gray-500">
        Загрузка данных...
      </div>
    );
  }

  return (
    <motion.div 
      className="rounded-lg shadow-md overflow-hidden transition-shadow 
                  hover:shadow-lg max-w-md mx-auto relative"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Баннер актуальности */}
      <div className="bg-[#2b7fff] text-white px-4 py-3 relative">
        <div 
          className={`
            absolute top-3 right-4
            px-3 py-1 rounded-full
            text-xs font-medium
            transition-all duration-300
            flex items-center gap-1
            ${results.information 
              ? 'bg-green-500 shadow-lg' 
              : 'bg-red-500 shadow-red'
            }
          `}
        >
          {results.information ? (
            <>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Актуальная информация
            </>
          ) : (
            <>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Требуется проверка
            </>
          )}
        </div>
        <h3 className="text-lg font-bold mt-2">{results.university}</h3>
      </div>

      <div className="p-4 space-y-4">
        {/* Направления */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-600">Направления:</h4>
          <div className="flex flex-wrap gap-2">
            {results.directions?.length > 0 ? (
              results.directions.map((dir, idx) => (
                <span key={idx} 
                      className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                  {dir}
                </span>
              ))
            ) : (
              <span className="text-gray-500 text-xs">Нет доступных направлений</span>
            )}
          </div>
        </div>

        {/* Особенности */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-600">Преимущества:</h4>
          <ul className="space-y-1">
            {results.features?.length > 0 ? (
              results.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                  <svg className="w-3 h-3 text-[#2b7fff]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </li>
              ))
            ) : (
              <li className="text-gray-500 text-xs">Нет информации о преимуществах</li>
            )}
          </ul>
        </div>

        {/* Баллы */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
          {['min', 'avg', 'bud'].map((key) => (
            <div key={key} 
                 className="bg-[#2b7fff] bg-opacity-20 text-white
                            rounded-lg p-3 text-center">
              <div className="text-[10px] uppercase tracking-wider font-medium">
                {key === 'min' && 'Мин. балл'}
                {key === 'avg' && 'Средний'}
                {key === 'bud' && 'Бюджет'}
              </div>
              <div className="text-xl font-bold mt-1">
                {results.scores?.[key] ?? 'N/A'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default UniversityCard;