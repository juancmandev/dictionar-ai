'use client';

import { Configuration, OpenAIApi } from 'openai';
import { useEffect, useState } from 'react';
import { H1, H6 } from './Headings';
import { Textarea } from './Inputs';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PrimaryButton } from './Buttons';
import { CopyIcon } from '@/assets/icons';

const openAIKey = process.env.OPENAI_API_KEY as string;
const openAIOrganizationKey = process.env.OPENAI_ORGANIZATION_KEY as string;

const dictionary: any = {
  ['en']: {
    language: 'Language',
    word: 'Word or phrase',
    enterWod: 'Enter a word or phrase',
    wordRequired: 'A word or phrase is required',
    correction: 'Correction',
    definition: 'Definition',
    examples: 'Examples',
    synonyms: 'Synonyms',
    generate: 'Generate',
    generating: 'Generating...',
  },
  ['es']: {
    language: 'Idioma',
    word: 'Palabra o frase',
    enterWod: 'Ingresa una palabra o frase',
    wordRequired: 'Se requiere una palabra o frase',
    correction: 'Corrección',
    definition: 'Definición',
    examples: 'Ejemplos',
    synonyms: 'Sinónimos',
    generate: 'Generar',
    generating: 'Generando...',
  },
};

const promptEn = (userPrompt: string) =>
  `You are an expert giving dictionary definitions. You'll get the next word: ${userPrompt}, and you'll respond as follows: Do not include any explanations, only provide a RFC8259 compliant JSON response following this format without deviation. {"word": "The word/phrase that you got previously", "correction": "The possible correction of the word or phrase", "definition": "The definition of the word corrected", "examples": "An array of examples with the correction of the word", "synonyms": "An array of synonyms"}`;
const promptEs = (userPrompt: string) =>
  `Eres un experto dando definiciones de diccionario. Recibirás la siguiente palabra: ${userPrompt}, y responderás de la siguiente manera: No incluyas explicación alguna, solo responde con un JSON RFC8259 siguiendo el siguiente formato sin desviarte: {"word": "La palabra o frase que recibiste", "correction": "La posible correxión de la palabra o frase", "definition": "La definición de la palabra corregida", "examples": "Un array de ejemplos con la palabra corregida", "synonyms": "Un array de sinónimos"}`;

export default function DictionarAI() {
  const [openAIResponse, setOpenAIResponse] = useState<any>(undefined);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState({ index: 0, done: false });
  const [language, setLanguage] = useState('en');

  const promptRequest = async (userPrompt: string) => {
    const prompt =
      language === 'en' ? promptEn(userPrompt) : promptEs(userPrompt);

    setSubmitting(true);
    setOpenAIResponse(undefined);

    try {
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
      userPrompt: Yup.string().required(dictionary[language].wordRequired),
    }),
    onSubmit: ({ userPrompt }) => {
      promptRequest(userPrompt);
    },
  });

  useEffect(() => {
    formik.resetForm();
    setOpenAIResponse(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const handleCopy = (text: string, index: number) => {
    setCopied({
      index,
      done: true,
    });

    navigator.clipboard.writeText(text);

    setTimeout(() => {
      alert(`"${text}" \n\n Copied to clipboard!`);
    }, 100);

    setTimeout(() => {
      setCopied({
        index: 0,
        done: false,
      });
    }, 5000);
  };

  return (
    <div className='p-2 lg:p-5'>
      <div className='mb-4'>
        <H1>DictionarAI</H1>
        <span className='self-end mb-1'>Ver 0.2</span>
      </div>
      <form
        className='max-w-[300px] flex flex-col gap-2'
        onSubmit={formik.handleSubmit}>
        <section className='flex flex-col gap-1'>
          <label htmlFor='language'>{dictionary[language].language}</label>
          <select
            id='language'
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className='p-2 border-2 border-gray-300 rounded-sm hover:border-blue-300 focus-within:border-blue-500 cursor-pointer'>
            <option value='en'>English</option>
            <option value='es'>Spanish</option>
          </select>
        </section>
        <Textarea
          id='userPrompt'
          label={dictionary[language].word}
          value={formik.values.userPrompt}
          onChange={formik.handleChange}
          onError={formik.errors.userPrompt}
          onBlur={formik.handleBlur}
          onTouched={formik.touched.userPrompt}
          placeholder={dictionary[language].enterWod}
        />
        <PrimaryButton
          className='max-w-max'
          type='submit'
          disabled={submitting}>
          {submitting
            ? dictionary[language].generating
            : dictionary[language].generate}
        </PrimaryButton>
      </form>
      {!openAIResponse && submitting && (
        <div className='mt-5 w-[300px] h-[400px]'>
          <div className='animate-pulse flex'>
            <div className='w-full h-[400px] bg-slate-300 rounded-sm' />
          </div>
        </div>
      )}
      {openAIResponse && (
        <div className='mt-5 max-w-[400px] flex flex-col gap-1'>
          <section>
            <H6>{dictionary[language].word}</H6>
            <p>{openAIResponse?.word}</p>
          </section>
          <section>
            <H6>{dictionary[language].correction}</H6>
            <p>
              {openAIResponse.correction ? openAIResponse.correction : '[None]'}
            </p>
          </section>
          <section>
            <H6>{dictionary[language].definition}</H6>
            <p>{openAIResponse.definition}</p>
          </section>
          <section>
            <H6>{dictionary[language].examples}</H6>
            <ul className='pl-4 list-disc'>
              {openAIResponse.examples.map((example: string, index: number) => (
                <li key={example}>
                  <div className='flex items-start gap-2'>
                    <p>{example}</p>
                    <button
                      className='flex gap-1'
                      disabled={copied.index === index && copied.done}
                      onClick={() => handleCopy(example, index)}>
                      <CopyIcon />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <H6>{dictionary[language].synonyms}</H6>
            <ul className='pl-4 list-disc'>
              {openAIResponse.synonyms.map((synonym: string) => (
                <li key={synonym}>
                  <p>{synonym}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}
