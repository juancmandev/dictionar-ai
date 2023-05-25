interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

export const H1 = ({ children, className }: HeadingProps) => (
  <h1 className={`text-7xl font-bold ${className}`}>{children}</h1>
);

export const H2 = ({ children, className }: HeadingProps) => (
  <h2 className={`text-6xl font-bold ${className}`}>{children}</h2>
);

export const H3 = ({ children, className }: HeadingProps) => (
  <h3 className={`text-5xl font-bold ${className}`}>{children}</h3>
);

export const H4 = ({ children, className }: HeadingProps) => (
  <h4 className={`text-4xl font-bold ${className}`}>{children}</h4>
);

export const H5 = ({ children, className }: HeadingProps) => (
  <h5 className={`text-3xl font-bold ${className}`}>{children}</h5>
);

export const H6 = ({ children, className }: HeadingProps) => (
  <h6 className={`text-2xl font-bold ${className}`}>{children}</h6>
);
