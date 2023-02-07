import React from 'react';
import styles from './loader.module.css';

const Loader = () => {
  return (
    <div className={styles.container}>
      <span className={styles.circle}></span>
      <span className={styles.circle}></span>
      <span className={styles.circle}></span>
      <span className={styles.circle}></span>
      <span className={styles.circle}></span>
    </div>
  );
};

export default Loader;
