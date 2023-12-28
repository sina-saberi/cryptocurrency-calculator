import React from 'react'

interface InputProps {
    label: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    badge?: { name: string, shorName: string };
}
const Input: React.FC<InputProps> = ({ badge, name, label, onChange, value }) => {
    return (
        <label className='w-full text-sm flex flex-col gap-2'>
            <div className='text-xs'>{label}</div>
            <div className='rounded-md bg-white shadow-sm flex h-8 p-1'>
                {badge && (
                    <div className='flex text-xs whitespace-nowrap gap-1 items-center justify-center px-1 rounded-md bg-gray-50 border h-full'>
                        <span className=''>
                            {badge.name}
                        </span>
                        <span>
                            {badge.shorName}
                        </span>
                    </div>
                )}
                <input className='w-full  bg-transparent outline-none px-1' name={name} value={value} onChange={onChange} />
            </div>
        </label>
    )
}

export default Input