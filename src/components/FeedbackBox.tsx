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
      feedback: Yup.string().required('Feedback required'),
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
        } top-[40%] left-[67.5%] shadow-2xl rounded-sm p-6`}>
        <h4 className='font-medium text-lg mb-2'>
          I want to listen your opinion
        </h4>
        <form
          onSubmit={formik.handleSubmit}
          onReset={formik.handleReset}
          className='flex flex-col gap-1'>
          <section>
            <label htmlFor='name'>Name</label>
            <Input
              id='name'
              type='text'
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onTouched={formik.touched.name}
              onError={formik.errors.name}
              placeholder='John Doe'
            />
          </section>
          <section>
            <label htmlFor='email'>Email</label>
            <Input
              id='email'
              type='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onTouched={formik.touched.email}
              onError={formik.errors.email}
              placeholder='example@email.com'
            />
          </section>
          <section>
            <label htmlFor='feedback'>Feedback</label>
            <Textarea
              id='feedback'
              value={formik.values.feedback}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onTouched={formik.touched.feedback}
              onError={formik.errors.feedback}
              placeholder='What would you like to be added, or changed...?'
            />
          </section>
          <footer className='flex justify-between'>
            <SecondaryButton
              type='reset'
              onClick={() => setShowForm((prev) => !prev)}>
              Cancel
            </SecondaryButton>
            <PrimaryButton disabled={submitting} type='submit'>
              {submitting ? 'Submitting...' : 'Submit'}
            </PrimaryButton>
          </footer>
        </form>
      </div>
      {!showForm && (
        <button
          onClick={() => setShowForm((prev) => !prev)}
          type='button'
          className='transition-colors p-4 bg-blue-500 rounded-full shadow-2xl hover:bg-blue-400 active:bg-blue-600'>
          <FeedbackIcon />
        </button>
      )}
    </div>
  );
}
