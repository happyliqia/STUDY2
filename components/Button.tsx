
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'number';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  children, 
  className = '', 
  variant = 'primary',
  disabled = false
}) => {
  const baseStyles = "transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl font-bold text-xl py-3 px-6 shadow-md";
  
  const variants = {
    primary: "bg-green-500 hover:bg-green-600 text-white",
    secondary: "bg-orange-400 hover:bg-orange-500 text-white",
    outline: "bg-white border-2 border-green-500 text-green-500 hover:bg-green-50",
    number: "bg-white border-2 border-sky-200 text-sky-600 hover:border-sky-400 hover:bg-sky-50 aspect-square w-16 h-16 flex items-center justify-center text-2xl"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
