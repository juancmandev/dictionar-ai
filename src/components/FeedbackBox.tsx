'use client';

import { FeedbackIcon } from '@/assets/icons';
import { useState } from 'react';
import { PrimaryButton, SecondaryButton } from './Buttons';
import { Input, Textarea } from './Inputs';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { saveUserFeedback } from '@/firebase/usersFeedback';

export default function FeedbackBox() {
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      feedback: '',
    },
    initialErrors: {
      name: '',
      email: '',
      feedback: '',
    },
    validationSchema: Yup.object({
      name: Yup.string(),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email required'),
      feedback: Yup.string().required('Feedback is required'),
    }),
    onSubmit: async (values) => {
      setSubmitting(true);

      try {
        const res = await saveUserFeedback(values);

        if (res) alert('Thank you for your feedback!');
      } catch (error) {
        console.error(error);
        alert(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className='fixed top-[87.5%] left-[87.5%]'>
      <div
        className={`${
          showForm ? 'fixed' : 'hidden'
        } top-[50%] left-[65%] shadow-2xl rounded-sm p-6`}>
        <h4 className='font-bold text-lg mb-2'>
          I want to listen your opinion
        </h4>
        <form
          onSubmit={formik.handleSubmit}
          onReset={formik.handleReset}
          className='flex flex-col gap-1'>
          <Input
            id='name'
            type='text'
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onTouched={formik.touched.name}
            onError={formik.errors.name}
            placeholder='Your name'
          />
          <Input
            id='email'
            type='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onTouched={formik.touched.email}
            onError={formik.errors.email}
            placeholder='Your email'
          />
          <Textarea
            id='feedback'
            value={formik.values.feedback}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onTouched={formik.touched.feedback}
            onError={formik.errors.feedback}
            placeholder='What would you like to be added, changed...?'
          />
          <footer className='flex justify-between'>
            <SecondaryButton
              type='reset'
              onClick={() => setShowForm((prev) => !prev)}>
              Cancel
            </SecondaryButton>
            <PrimaryButton disabled={submitting} type='submit'>
              Submit
            </PrimaryButton>
          </footer>
        </form>
      </div>
      {!showForm && (
        <button
          onClick={() => setShowForm((prev) => !prev)}
          type='button'
          className='p-4 bg-blue-500 rounded-full'>
          <FeedbackIcon />
        </button>
      )}
    </div>
  );
}
