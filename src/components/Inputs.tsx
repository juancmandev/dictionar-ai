interface InputProps {
  id: string;
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
  onError?: string;
  onTouched?: boolean;
  placeholder?: string;
  value: React.HTMLInputTypeAttribute;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Input = ({
  id,
  type,
  onError,
  onTouched,
  placeholder,
  value,
  onBlur,
  onChange,
  iconChildren,
}: InputProps) => (
  <div>
    <div
      className={`flex gap-1 border-2 border-gray-300 rounded-sm p-2 ${
        onTouched && onError ? 'border-red-400' : 'border-gray-300'
      }`}>
      <input
        className='w-full focus:outline-none'
        id={id}
        type={type}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
      />
      {iconChildren}
    </div>
    <span className='text-red-400 empty:before:inline-block empty:before:content-[""]'>
      {onTouched && onError && onError}
    </span>
  </div>
);

export const Textarea = ({
  id,
  onError,
  onTouched,
  placeholder,
  value,
  onBlur,
  onChange,
}: TextareaProps) => (
  <div>
    <div
      className={`flex gap-1 border-2 border-gray-300 rounded-sm p-2 ${
        onTouched && onError ? 'border-red-400' : 'border-gray-300'
      }`}>
      <textarea
        className='w-full focus:outline-none resize-none'
        id={id}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
    <span className='text-red-400 empty:before:inline-block empty:before:content-[""]'>
      {onTouched && onError && onError}
    </span>
  </div>
);
