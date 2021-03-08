import styles from './index.module.scss';

 function Input({onChange, value, label, type}) {

  return (
    <div className={styles.wrapper}>
      <label htmlFor={label}>{label}</label>
      <input onChange={onChange} id={label} type={type} value={value} />
    </div>
  );
}

export default Input;
