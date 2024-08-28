'use client'

import styles from './LoadingSpinner.module.css';

export default function Spinner( { showLoading = false }) {


  if(!showLoading) {
    return null;
  }

  return (
      <div className={styles.spinnerOverlay}>
      <div className={styles.spinner}></div>
    </div>
  );
};

