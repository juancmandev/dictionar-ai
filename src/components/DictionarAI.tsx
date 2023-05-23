'use client';

import { Configuration, OpenAIApi } from 'openai';
import { useState } from 'react';
import { json } from 'stream/consumers';

const openAIKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY as string;
const openAIOrganizationKey = process.env
  .NEXT_PUBLIC_OPENAI_ORGANIZATION_KEY as string;

export default function DictionarAI() {
  const [userPrompt, setUserPrompt] = useState('');
  const [openAIResponse, setOpenAIResponse] = useState<any>(undefined);

  const promptRequest = async () => {
    try {
      const prompt = `You are an expert giving dictionary definitions. You'll get the next word or a phrase: ${userPrompt}, and you'll respond as follows: Do not include any explanations, only provide a RFC8259 compliant JSON response following this format without deviation. {"correction": "The possible correction of the word or phrase", "examples": "An array of examples with the correction of the word or phrase", "synonyms": "An array of synonyms"}`;
      const configuration = new Configuration({
        apiKey: openAIKey,
        organization: openAIOrganizationKey,
      });
      const openAI = new OpenAIApi(configuration);
      const response = await openAI.createCompletion({
        prompt: prompt,
        model: 'text-davinci-003',
        temperature: 0,
        max_tokens: 2000,
        frequency_penalty: 0.5,
        presence_penalty: 0.5,
      });

      const res = response.data.choices[0].text;
      console.log(res);

      if (res) {
        const resJSON = JSON.parse(res);
        console.log(resJSON);

        setOpenAIResponse(resJSON);
      } else console.error('Error!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>DictionarAI</h1>
      <form>
        <textarea
          className='ring-1'
          onChange={(e) => setUserPrompt(e.target.value)}
          value={userPrompt}
        />
        <button type='button' onClick={promptRequest}>
          Submit
        </button>
      </form>
      {openAIResponse && (
        <div>
          <p>
            <strong>Word</strong>: {userPrompt}
          </p>
          <p>
            <strong>Correction(s)</strong>: {openAIResponse?.correction}
          </p>
          <strong>Examples</strong>
          <ul className='pl-1'>
            {openAIResponse?.examples.map((example: string) => (
              <li key={example}>
                <p>{example}</p>
              </li>
            ))}
          </ul>
          <strong>Synonyms</strong>
          <ul className='pl-1'>
            {openAIResponse?.synonyms.map((synonym: string) => (
              <li key={synonym}>
                <p>{synonym}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
