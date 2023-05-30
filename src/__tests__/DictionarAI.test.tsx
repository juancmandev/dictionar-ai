import { render, fireEvent, waitFor } from '@testing-library/react';
import DictionarAI from '../components/DictionarAI';

describe('DictionarAI', () => {
  it('should render the form', () => {
    const { getByLabelText, getByText } = render(<DictionarAI />);
    expect(getByLabelText('Word or Phrase')).toBeInTheDocument();
    expect(getByText('Submit')).toBeInTheDocument();
  });

  it('should show an error message when the form is submitted with an empty input', async () => {
    const { getByLabelText, getByText } = render(<DictionarAI />);
    const input = getByLabelText('Word or Phrase');
    const submitButton = getByText('Submit');

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText('A word or phrase is required')).toBeInTheDocument();
    });
  });

  it('should show the response when the form is submitted with a valid input', async () => {
    const { getByLabelText, getByText } = render(<DictionarAI />);
    const input = getByLabelText('Word or Phrase');
    const submitButton = getByText('Submit');

    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(submitButton);
  });
});