import React from 'react';
import { unifiedCurrencyData } from '../../types';
import styles from './InstanceOfCurrency.module.css';


type instanceOfCurrencyProps = {
  rates: unifiedCurrencyData[]
}
const InstanceOfCurrency: React.FC<instanceOfCurrencyProps> = ({rates}): JSX.Element => {
  
  return (
    <React.Fragment>
      {
        rates.map(ccyObj =>
          <div
            className={styles.barWrapper}
            key={ccyObj.txt || ccyObj.ccy}
          >
            <div className={styles.currencyName}> {ccyObj.ccy} </div>
            <div className={styles.buy}> {ccyObj.rate} </div>
            <div className={styles.sale}> {ccyObj.sale} </div>
          </div>
        )
      }
    </React.Fragment>
  )
}

export default InstanceOfCurrency;