interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

export const PrimaryButton = ({
  children,
  onClick,
  type,
  className,
  disabled,
}: ButtonProps) => (
  <button
    disabled={disabled}
    onClick={onClick}
    type={type}
    className={`p-2 text-white font-bold bg-blue-500 rounded-sm hover:bg-blue-400 transition-colors disabled:opacity-75 ${className}`}>
    {children}
  </button>
);

export const SecondaryButton = ({
  children,
  onClick,
  type,
  className,
  disabled,
}: ButtonProps) => (
  <button
    disabled={disabled}
    onClick={onClick}
    type={type}
    className={`p-2 bg-transparent border-2 border-blue-500 text-blue-500 font-bold hover:border-blue-400 hover:text-blue-400 rounded-sm transition-colors disabled:opacity-75 ${className}`}>
    {children}
  </button>
);
