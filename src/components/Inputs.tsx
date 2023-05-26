interface InputProps {
  id: string;
  label: string;
  type: 'text' | 'password' | 'email';
  onError: string | undefined;
  onTouched: boolean | undefined;
  placeholder?: string;
  iconChildren?: React.ReactNode;
  value: React.HTMLInputTypeAttribute;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface TextareaProps {
  id: string;
  label: string;
  onError?: string;
  onTouched?: boolean;
  placeholder?: string;
  value: React.HTMLInputTypeAttribute;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Input = ({
  id,
  label,
  type,
  onError,
  onTouched,
  placeholder,
  value,
  onBlur,
  onChange,
  iconChildren,
}: InputProps) => (
  <section>
    <label
      htmlFor={id}
      className={`w-full ${onError && onTouched && 'text-red-400'}`}>
      {label}
    </label>
    <div
      className={`transition-colors pointer-events-none flex gap-1 border-2 border-gray-300 hover:border-blue-300 focus-within:!border-blue-500 rounded-sm p-2 ${
        onTouched &&
        onError &&
        '!border-red-400 focus-within:!border-red-400 hover:!border-red-400'
      }`}>
      <input
        className='pointer-events-auto w-full focus:outline-none'
        id={id}
        type={type}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
      />
      {iconChildren}
    </div>
    <p className='text-red-400 text-sm empty:before:inline-block empty:before:content-[""]'>
      {onTouched && onError && onError}
    </p>
  </section>
);

export const Textarea = ({
  id,
  label,
  onError,
  onTouched,
  placeholder,
  value,
  onBlur,
  onChange,
}: TextareaProps) => (
  <section>
    <label className={`${onError && onTouched && 'text-red-400'}`} htmlFor={id}>
      {label}
    </label>
    <div
      className={`transition-colors pointer-events-none border-2 border-gray-300 hover:border-blue-300 focus-within:!border-blue-500 rounded-sm p-2 ${
        onTouched &&
        onError &&
        '!border-red-400 focus-within:!border-red-400 hover:!border-red-400'
      }`}>
      <textarea
        className='pointer-events-auto w-full focus:outline-none resize-none'
        id={id}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
    <p className='text-red-400 text-sm empty:before:inline-block empty:before:content-[""]'>
      {onTouched && onError && onError}
    </p>
  </section>
);
