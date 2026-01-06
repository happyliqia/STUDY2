
import { Question, Operation, ANIMALS } from '../types';

export const generateQuestions = (count: number = 10): Question[] => {
  const questions: Question[] = [];
  for (let i = 0; i < count; i++) {
    const isAddition = Math.random() > 0.5;
    const op: Operation = isAddition ? '+' : '-';
    let num1, num2, correctAnswer;

    if (isAddition) {
      // Sum must be <= 10
      num1 = Math.floor(Math.random() * 11); // 0-10
      num2 = Math.floor(Math.random() * (11 - num1)); // 0-(10-num1)
      correctAnswer = num1 + num2;
    } else {
      // num1 - num2 >= 0
      num1 = Math.floor(Math.random() * 11); // 0-10
      num2 = Math.floor(Math.random() * (num1 + 1)); // 0-num1
      correctAnswer = num1 - num2;
    }

    const randomAnimal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];

    questions.push({
      id: i,
      num1,
      num2,
      op,
      correctAnswer,
      userAnswer: null,
      animal: randomAnimal.emoji,
    });
  }
  return questions;
};
