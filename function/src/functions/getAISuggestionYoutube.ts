// https://disney2clone.azurewebsites.net/api/getaisuggestionyoutube

import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getAISuggestionYoutube(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  const term = request.query.get("term");

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a digital video assistant working for services such as Netflix, Disney Plus & Amazon Prime Video. Your job is to provide suggestions based on the videos the user specifies. Provide an quirky breakdown of what the user should watch next! It should only list the names of the films after the introduction. Keep the response short and sweet! Always list at least 3 films as suggestions. If the user mentions a genre, you should provide a suggestion based on that genre.`,
        },
        {
          role: "user",
          content: `I like: ${term}`,
        },
      ],
    });

    console.log(completion.choices[0]);

    return { body: completion.choices[0].message.content || "No suggestion" };
  } catch (error) {
    console.log("ERROR >>>>", error);
    return { body: error };
  }
}

app.http("getAISuggestionYoutube", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getAISuggestionYoutube,
});
