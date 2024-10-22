import React from 'react';

const Input = ({ type = 'text', placeholder = 'Enter text', onChange, value }) => {
  return (
    <input 
      type={type} 
      placeholder={placeholder} 
      onChange={onChange} 
      value={value}
      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-xs"
    />
  );
};

export default Input;
