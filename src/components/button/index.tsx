import React from 'react'

interface ButtonProps {
    children: string;
}
const Button: React.FC<ButtonProps> = ({ children }) => {
    return (
        <button className='w-full h-8 border-green-700 text-sm whitespace-nowrap bg-green-700 text-white px-2 p-1 rounded-md'>
            {children}
        </button>
    )
}

export default Button