
import React from 'react';
import { Question } from '../types';

interface AnimalMathCardProps {
  question: Question;
}

export const AnimalMathCard: React.FC<AnimalMathCardProps> = ({ question }) => {
  const renderVisuals = (count: number) => {
    return (
      <div className="flex flex-wrap justify-center gap-1 min-h-[3rem] items-center">
        {Array.from({ length: count }).map((_, i) => (
          <span key={i} className="text-2xl drop-shadow-sm">{question.animal}</span>
        ))}
        {count === 0 && <span className="text-gray-300 italic">空空的</span>}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-yellow-200 max-w-md w-full">
      <div className="flex flex-col items-center space-y-6">
        <div className="flex items-center space-x-4 text-5xl font-black text-gray-700">
          <div className="flex flex-col items-center">
             <span className="mb-2">{question.num1}</span>
             {renderVisuals(question.num1)}
          </div>
          <span className="text-orange-500 text-6xl pb-10">{question.op}</span>
          <div className="flex flex-col items-center">
             <span className="mb-2">{question.num2}</span>
             {renderVisuals(question.num2)}
          </div>
          <span className="text-gray-400 text-6xl pb-10">=</span>
          <div className="w-16 h-16 bg-gray-50 border-b-4 border-gray-300 rounded-lg flex items-center justify-center mb-10">
            {question.userAnswer !== null ? (
              <span className="text-green-600 animate-bounce">{question.userAnswer}</span>
            ) : (
              <span className="text-gray-200">?</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
