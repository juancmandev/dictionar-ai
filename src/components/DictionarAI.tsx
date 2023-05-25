'use client';

import { Configuration, OpenAIApi } from 'openai';
import { useState } from 'react';
import { H1 } from './Headings';
import { Textarea } from './Inputs';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PrimaryButton } from './Buttons';

const openAIKey = process.env.OPENAI_API_KEY as string;
const openAIOrganizationKey = process.env.OPENAI_ORGANIZATION_KEY as string;

export default function DictionarAI() {
  const [openAIResponse, setOpenAIResponse] = useState<any>(undefined);
  const [submitting, setSubmitting] = useState(false);

  const promptRequest = async (userPrompt: string) => {
    setSubmitting(true);
    setOpenAIResponse(undefined);

    try {
      const prompt = `You are an expert giving dictionary definitions. You'll get the next word: ${userPrompt}, and you'll respond as follows: Do not include any explanations, only provide a RFC8259 compliant JSON response following this format without deviation. {"word": "The word/phrase that you got previously", "correction": "The possible correction of the word or phrase", "definition": "The definition of the word corrected", "examples": "An array of examples with the correction of the word", "synonyms": "An array of synonyms"}`;
      const configuration = new Configuration({
        apiKey: openAIKey,
        organization: openAIOrganizationKey,
      });
      const openAI = new OpenAIApi(configuration);
      const response = await openAI.createCompletion({
        prompt: prompt,
        model: 'text-davinci-003',
        temperature: 0,
        max_tokens: 1000,
        frequency_penalty: 0.5,
        presence_penalty: 0.5,
      });
      const res = response.data.choices[0].text;

      if (res) {
        const resJSON = JSON.parse(res);

        setOpenAIResponse(resJSON);
      } else console.error('Error!');
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      userPrompt: '',
    },
    initialErrors: {
      userPrompt: '',
    },
    validationSchema: Yup.object({
      userPrompt: Yup.string().required('Required'),
    }),
    onSubmit: ({ userPrompt }) => {
      promptRequest(userPrompt);
    },
  });

  return (
    <>
      <H1>DictionarAI</H1>
      <form className='max-w-[300px]' onSubmit={formik.handleSubmit}>
        <Textarea
          id='userPrompt'
          value={formik.values.userPrompt}
          onChange={formik.handleChange}
          onError={formik.errors.userPrompt}
        />
        <PrimaryButton type='submit' disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit'}
        </PrimaryButton>
      </form>
      {openAIResponse && (
        <div>
          <p>
            <strong>Word/Phrase</strong>: {openAIResponse?.word}
          </p>
          <p>
            <strong>Correction</strong>: {openAIResponse?.correction}
          </p>
          <p>
            <strong>Definition</strong>: {openAIResponse?.definition}
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
