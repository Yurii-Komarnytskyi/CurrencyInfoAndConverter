import React from 'react';
import styles from './HeaderBar.module.css'

const HeaderBar = () => {
  return (
    <React.Fragment>
      <div className={styles.headerBar}>
        <div className={styles.currency}>Currency</div>
        <div className={styles.buy} >Buy</div>
        <div className={styles.sale} >Sale</div>
      </div>
    </React.Fragment>
  )
}

export default HeaderBar