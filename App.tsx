
import React, { useState, useCallback, useMemo } from 'react';
import { AppStage, Question, ANIMALS } from './types';
import { generateQuestions } from './utils/mathGenerator';
import { Button } from './components/Button';
import { AnimalMathCard } from './components/AnimalMathCard';
import { ExplanationModal } from './components/ExplanationModal';

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>('welcome');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [explainingQuestion, setExplainingQuestion] = useState<Question | null>(null);

  const startQuiz = useCallback(() => {
    const newQuestions = generateQuestions(10);
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setStage('quiz');
  }, []);

  const handleAnswer = (val: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentIndex].userAnswer = val;
    setQuestions(updatedQuestions);

    if (currentIndex < questions.length - 1) {
      setTimeout(() => setCurrentIndex(prev => prev + 1), 300);
    } else {
      setTimeout(() => setStage('result'), 500);
    }
  };

  const score = useMemo(() => {
    return questions.filter(q => q.userAnswer === q.correctAnswer).length;
  }, [questions]);

  const mistakes = useMemo(() => {
    return questions.filter(q => q.userAnswer !== null && q.userAnswer !== q.correctAnswer);
  }, [questions]);

  const renderWelcome = () => (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8 animate-in slide-in-from-bottom duration-700">
      <div className="relative">
        <div className="text-9xl animate-bounce-slow">🦁</div>
        <div className="absolute -top-4 -right-4 text-4xl">✨</div>
      </div>
      <h1 className="text-6xl font-black text-green-700 tracking-wider">森林数学大冒险</h1>
      <p className="text-2xl text-green-600 max-w-md leading-relaxed">
        准备好和森林里的小动物们一起挑战 10 以内的加减法了吗？
      </p>
      <Button onClick={startQuiz} className="px-12 py-5 text-3xl">开始冒险吧！</Button>
    </div>
  );

  const renderQuiz = () => {
    const currentQuestion = questions[currentIndex];
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8 px-4">
        <div className="w-full max-w-md flex justify-between items-center px-2">
          <span className="text-xl font-bold text-green-600 bg-green-100 px-4 py-1 rounded-full">
            进度: {currentIndex + 1} / {questions.length}
          </span>
          <span className="text-xl font-bold text-orange-600 bg-orange-100 px-4 py-1 rounded-full">
            目前得分: {score}
          </span>
        </div>
        
        <AnimalMathCard question={currentQuestion} />

        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 max-w-lg">
          {Array.from({ length: 11 }).map((_, i) => (
            <Button 
              key={i} 
              variant="number" 
              onClick={() => handleAnswer(i)}
              className={currentQuestion.userAnswer === i ? "border-green-500 bg-green-50" : ""}
            >
              {i}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  const renderResult = () => (
    <div className="flex flex-col items-center justify-center py-12 px-4 space-y-8 max-w-2xl mx-auto">
      <div className="text-center space-y-4">
        <div className="text-8xl">🏆</div>
        <h2 className="text-5xl font-black text-green-700">大功告成！</h2>
        <div className="text-3xl text-orange-600 font-bold">
          你的得分: <span className="text-6xl">{score * 10}</span> 分
        </div>
        <p className="text-xl text-gray-600">
          {score === 10 ? "哇！你是个数学天才！森林里的大家都为你欢呼！" : "真不错！继续加油，你会变得更厉害的！"}
        </p>
      </div>

      {mistakes.length > 0 && (
        <div className="w-full bg-white rounded-3xl p-6 shadow-lg border-2 border-orange-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">📝</span> 错题复习柜
          </h3>
          <div className="space-y-3">
            {mistakes.map((q, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-orange-50 rounded-2xl border border-orange-100">
                <span className="text-2xl font-mono text-gray-700">
                   {q.animal} {q.num1} {q.op} {q.num2} = <span className="text-green-600 font-bold">{q.correctAnswer}</span>
                </span>
                <Button 
                  onClick={() => setExplainingQuestion(q)} 
                  variant="outline" 
                  className="text-sm py-2 px-4"
                >
                  看看讲解
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex space-x-4">
        <Button onClick={startQuiz} variant="primary">重新挑战</Button>
        <Button onClick={() => setStage('welcome')} variant="outline">回主页</Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-12">
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-3xl">🌳</span>
          <span className="text-2xl font-bold text-green-800">森林数学大冒险</span>
        </div>
      </header>

      <main className="container mx-auto">
        {stage === 'welcome' && renderWelcome()}
        {stage === 'quiz' && renderQuiz()}
        {stage === 'result' && renderResult()}
      </main>

      {explainingQuestion && (
        <ExplanationModal 
          question={explainingQuestion} 
          onClose={() => setExplainingQuestion(null)} 
        />
      )}

      {/* Decorative background elements */}
      <div className="fixed bottom-0 left-0 -z-10 text-9xl opacity-10 select-none">🌿</div>
      <div className="fixed top-20 right-0 -z-10 text-9xl opacity-10 select-none">☁️</div>
    </div>
  );
};

export default App;
