import styles from './index.module.scss'

 function List({children}) {
  return <div className={styles.item}>{children}</div>
}

export default List;
