
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getExplanation = async (
  num1: number, 
  num2: number, 
  op: string, 
  correct: number, 
  user: number,
  animal: string
): Promise<string> => {
  try {
    const prompt = `你是一位温柔的小学数学老师。一个孩子在做口算大冒险时遇到困难。
    题目是：${num1} ${op} ${num2} = ?
    正确答案应该是 ${correct}，但孩子回答了 ${user}。
    请用充满童趣的、以${animal}为主角的故事或例子，简短地（100字以内）解释为什么正确答案是${correct}。
    语气要鼓励孩子，不要批评。`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text || "哎呀，森林信号不太好，不过没关系，多练习你一定会变强的！";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "老师刚才走神了，让我们再看一遍这道题吧！";
  }
};
