// netlify/functions/myfunction-background.ts
import { Handler, Context, Callback } from 'aws-lambda';
import { Configuration, OpenAIApi } from "openai";
import * as jwt from 'jsonwebtoken';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

interface CustomEvent {
  body: string;
}

const handler: Handler = async (event: CustomEvent, context: Context, callback: Callback) => {
  try {
    const secret = process.env.NEXTAUTH_JWT_SECRET as string;
    const body = JSON.parse(event.body);
    const token = jwt.verify(body.token, secret);
    if (!token) {
      throw new Error("Unauthorized");
    }
    const messages = [...body.messages];
    if (body.messages.length >= 7) {
      messages.push({
        role: "system",
        content: `please create a JSON object for a user's CV...`,
      });
    }
    if (body.messages.length > 8) {
      throw new Error("Too many messages");
    }
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that uses personal and CV details to generate a personalized conversation and eventually provide React code to the system...",
        },
        ...messages,
      ],
    });
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(completion?.data?.choices?.[0]?.message?.content),
    });
  } catch (error) {
    console.log(error);
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({ error: "An error occurred" }),
    });
  }
};

export { handler };
