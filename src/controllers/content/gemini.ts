import axios from "axios";
import { appConfig } from "../../utils/config";

const systemtPrompt = "You are a content assistant that generates engaging plain-text post on social networks like posts on Facebook and Instagram in the tone and language the user specifies; always output only the post text with no markdown, headings, bullet points, or explanations."

const generatePostContent = async (description: string): Promise<string | null> => {
    try {
        const httpClient = axios.create({});
        const response = await httpClient.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${appConfig.gemini.apiKey}`, {
            "system_instruction": {
                "parts": [
                    {
                        "text": systemtPrompt,
                    }
                ]
            },
            "contents": [
                {
                    "parts": [
                        {
                            "text": description
                        }
                    ]
                }
            ]
        })
        if (response.status == 200) {
            return response.data['candidates'][0]['content']['parts'][0]['text'] ?? '' as string;
        }
    } catch (error) {
        console.error("Error generate content", error)
    }
    return null;
}

export const GeminiContentGenerator = {
    generatePostContent,
}