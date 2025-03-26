import {NextApiRequest, NextApiResponse} from 'next';
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    // Process a POST request
    return res.status(405).json({ message: 'Method Not Allowed123' });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  const selectedFields = req.body.field;
  try{
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + apiKey,
        //   "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
        //   "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "deepseek/deepseek-chat-v3-0324:free",
          "messages": [
            {
              "role": "user",
              "content":`Give me only one creative capstone title on ${selectedFields} with short description estimation duration , and difficulty(easy, medium,hard). Do not include a numbered list. make it pure JSON format: 
{
  "title": "Your Title Here",
  "description": "Project description here.",
  "duration": "4-6 months",
  "difficulty": "Hard"
}`
            }
          ]
        })
      });
    const datares = await response.json();
    const data = datares.choices[0].message.content;
    // const match = data.match(/\*\*(.*?)\*\*\s*\n\n\*\*Description:\*\*\s*(.*?)\n\n\*\*Estimated Duration:\*\*\s*(.*?)\n\*\*Difficulty:\*\*\s*(.*)/);
    
    return res.status(200).json({ result: data ,message: "not matched"});

  }catch(err){
    console.error(err);
    return res.status(500).json({message: 'Internal Server Error'});
  } 
}
