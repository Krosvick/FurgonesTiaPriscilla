type CardProps = {
  title?: string;
  description?: string;
  dark: boolean;
  className?: string;
  children?: React.ReactNode;
  headElements?: React.ReactNode[];
};

export function Card({ title, description, dark, className, children, headElements }: CardProps){
  const cardClasses = dark
    ? 'bg-gray-800 text-white'
    : 'p-6 bg-slate-100 border border-gray-200 rounded-lg shadow';

  return (
    <div className={`${cardClasses} ${className}`}>
      <div className='flex justify-between'>
        <div>
            {title && <h3 className="text-2xl font-medium">{title}</h3>}
            {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
        </div>
        {headElements && <div className="flex justify-between">{headElements}</div>}
      </div>
      {children}
    </div>
  );
};
