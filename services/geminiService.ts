import { GoogleGenAI, Type, Schema } from "@google/genai";
import { DetailedHistory } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const detailSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    introduction: {
      type: Type.STRING,
      description: "关于该朝代历史地位的详细介绍段落。",
    },
    emperor: {
      type: Type.STRING,
      description: "开国皇帝或最著名的统治者姓名。",
    },
    capital: {
      type: Type.STRING,
      description: "该时期的主要都城。",
    },
    philosophy: {
      type: Type.STRING,
      description: "主导思想、哲学或宗教（例如：儒家思想、佛教）。",
    },
    majorEvents: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          year: { type: Type.STRING },
          event: { type: Type.STRING },
          description: { type: Type.STRING },
        },
        required: ["year", "event", "description"],
      },
      description: "3-4个主要历史事件的列表。",
    },
    culturalAchievements: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "4-5项关键的文化、科学或艺术成就。",
    },
    downfall: {
      type: Type.STRING,
      description: "简要解释朝代灭亡的原因。",
    },
  },
  required: ["introduction", "emperor", "capital", "philosophy", "majorEvents", "culturalAchievements", "downfall"],
};

export const fetchDynastyDetails = async (dynastyName: string, chineseName: string): Promise<DetailedHistory> => {
  try {
    const prompt = `请针对中国历史上的${chineseName}（${dynastyName}）提供一份详尽的历史分析。重点关注历史准确性和文化深度。请以中文回复。`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: detailSchema,
        systemInstruction: "你是一位精通中国历史的资深历史学家。请提供学术性强、准确且引人入胜的内容，适合作为博物馆的深度导览。",
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as DetailedHistory;
    }
    throw new Error("No text returned from model");
  } catch (error) {
    console.error("Error fetching dynasty details:", error);
    throw error;
  }
};