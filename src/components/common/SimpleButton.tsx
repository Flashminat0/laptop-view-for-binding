import React from 'react';

interface ISimpleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}

const SimpleButton: React.FC<ISimpleButtonProps> = ({
                                                        type = "button",
                                                        onClick,
                                                        children
                                                    }) => {
    return (
        <button
            onClick={onClick}
            className={`mt-4 py-2 px-6 
            ${type === "submit" && "bg-blue-500 hover:bg-blue-600 text-white font-bold"}
            ${type === "button" && "bg-gray-500 hover:bg-gray-600 text-white font-bold"}
            ${type === "reset" && "bg-red-500 hover:bg-red-600 text-white font-bold"}
            `}>
            {children}
        </button>
    );
};



export default SimpleButton;