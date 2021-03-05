import './index.css';

 function Input({onChange, value, label, type}) {

  return (
    <>
      <label htmlFor={label}>{label}</label>
      <input onChange={onChange} id={label} type={type} value={value} />
    </>
  );
}

export default Input;
