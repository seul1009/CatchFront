const Button = ({ onClick, children, className }) => {
    return (
        <button onClick={onClick} className={`bg-blue-600 text-white py-2 rounded-lg ${className}`}>
            {children}
        </button>
    );
};

export default Button;