import styles from './index.module.scss';

function card({title, content}) {

  return (
    <div className={styles.wrapperCard}>
      <span className={styles.starshipTitle}>{title}</span>
      <span className={styles.starshipContent}>{content}</span>
    </div>
  );
}

export default card;
