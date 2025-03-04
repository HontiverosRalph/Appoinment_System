const Button = ({ text, onClick, type = "button" }) => {
    return (
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        type={type}
        onClick={onClick}
      >
        {text}
      </button>
    );
  };
  
  export default Button;
  