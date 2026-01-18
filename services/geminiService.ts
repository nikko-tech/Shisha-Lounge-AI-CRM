
import { GoogleGenAI, Type } from "@google/genai";
import { Customer, VisitHistory, Flavor } from '../types';

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMixRecommendation = async (
  customer: Customer,
  history: VisitHistory[],
  flavors: Flavor[]
) => {
  const ai = getAI();
  const stockList = flavors.filter(f => f.inStock).map(f => `${f.brand}: ${f.name} (${f.category})`).join(', ');
  const historyText = history.map(h => `- ${h.date}: ${h.mixContent} (Rating: ${h.rating}, Feedback: ${h.feedback})`).join('\n');

  const prompt = `
あなたは高級シーシャラウンジの熟練ソムリエです。
以下の顧客データと在庫リストに基づき、この顧客に最高の次回のミックスを3つ提案してください。

【顧客情報】
名前: ${customer.name}
苦手・NG: ${customer.dislikes}
スタッフメモ: ${customer.notes}

【過去の注文履歴】
${historyText || '履歴なし（初回来店）'}

【現在の在庫リスト】
${stockList}

【出力の制約】
1. ミックス名（キャッチーなもの）
2. 構成（具体的にどのフレーバーを何割か）
3. おすすめの理由（なぜこの顧客に合うのか、口説き文句）
4. 日本語で回答してください。
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      temperature: 0.8,
    }
  });

  return response.text;
};

export const getChurnAnalysis = async (customers: Customer[]) => {
  const ai = getAI();
  const now = new Date();
  const data = customers.map(c => ({
    name: c.name,
    lastVisit: c.lastVisitDate,
    visitCount: c.visitCount
  }));

  const prompt = `
以下の顧客リストを分析し、離脱の可能性がある「常連だったが最近来ていない人」を特定してください。
今日の日付は ${now.toISOString().split('T')[0]} です。
60日以上来店がなく、かつ過去に3回以上来店している顧客をリストアップし、それぞれにどのようなアプローチ（例：インスタでのDM内容など）をすべきか提案してください。

データ: ${JSON.stringify(data)}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return response.text;
};
