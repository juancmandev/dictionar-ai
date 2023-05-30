import { render, fireEvent } from '@testing-library/react';
import { PrimaryButton, SecondaryButton } from '../components/Buttons';

describe('PrimaryButton', () => {
  it('should render children', () => {
    const { getByText } = render(<PrimaryButton>Click me</PrimaryButton>);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<PrimaryButton onClick={handleClick}>Click me</PrimaryButton>);
    fireEvent.click(getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('should have the correct type', () => {
    const { getByRole } = render(<PrimaryButton type="submit">Click me</PrimaryButton>);
    expect(getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('should have the correct className', () => {
    const { getByRole } = render(<PrimaryButton className="custom-class">Click me</PrimaryButton>);
    expect(getByRole('button')).toHaveClass('custom-class');
  });
});

describe('SecondaryButton', () => {
  it('should render children', () => {
    const { getByText } = render(<SecondaryButton>Click me</SecondaryButton>);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<SecondaryButton onClick={handleClick}>Click me</SecondaryButton>);
    fireEvent.click(getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('should have the correct type', () => {
    const { getByRole } = render(<SecondaryButton type="submit">Click me</SecondaryButton>);
    expect(getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('should have the correct className', () => {
    const { getByRole } = render(<SecondaryButton className="custom-class">Click me</SecondaryButton>);
    expect(getByRole('button')).toHaveClass('custom-class');
  });
});