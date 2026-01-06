
import React, { useState, useEffect } from 'react';
import { getExplanation } from '../services/geminiService';
import { Question } from '../types';
import { Button } from './Button';

interface ExplanationModalProps {
  question: Question;
  onClose: () => void;
}

export const ExplanationModal: React.FC<ExplanationModalProps> = ({ question, onClose }) => {
  const [explanation, setExplanation] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExp = async () => {
      setLoading(true);
      const res = await getExplanation(
        question.num1, 
        question.num2, 
        question.op, 
        question.correctAnswer, 
        question.userAnswer!,
        question.animal
      );
      setExplanation(res);
      setLoading(false);
    };
    fetchExp();
  }, [question]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="text-center">
          <div className="text-6xl mb-4">{question.animal}</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">题目讲解</h3>
          <p className="text-lg text-gray-600 mb-6 font-mono bg-gray-50 py-2 rounded-xl">
            {question.num1} {question.op} {question.num2} = {question.correctAnswer} 
            <span className="text-sm ml-2">(你之前选了 {question.userAnswer})</span>
          </p>
          
          <div className="min-h-[120px] flex items-center justify-center">
            {loading ? (
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-2 text-gray-500">正在请森林老师帮忙...</p>
              </div>
            ) : (
              <p className="text-gray-700 leading-relaxed text-lg bg-green-50 p-4 rounded-2xl italic">
                “{explanation}”
              </p>
            )}
          </div>

          <Button onClick={onClose} className="mt-8 w-full">我知道啦！</Button>
        </div>
      </div>
    </div>
  );
};
