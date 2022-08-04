import React, {useEffect, useState } from 'react';
import { conversionCurrency, unifiedCurrencyData } from '../../types';
import { obtainCurrentDayMonthYear } from '../../utils';
import ConversionUnit from '../conversionUnit/ConversionUnit';
import styles from './ConverterBody.module.css';


type converterBodyProps = { rates: unifiedCurrencyData[] }

const ConverterBody: React.FC<converterBodyProps> = ({rates}) => {
  
  const [fromState, setFromState] = useState<conversionCurrency>({ccy: rates[0].ccy, rate: rates[0].rate, inputVal: ' ', gotFocused: false});
  const [toState, setToState ] = useState<conversionCurrency>({ccy: rates[0].ccy, rate: rates[0].rate, inputVal: ' ', gotFocused: false});

  // useEffect(() => {
  //   console.log('fromState: ', fromState);
  //   console.log('toState: ', toState);
  // }, [toState, fromState, toState.inputVal, fromState.inputVal])

  return (
    <React.Fragment>
      <h1>Currency exchange (conversion) calculator</h1>
      <h3>Here you can view the current exchange rate for reviewing one foreign currency to another</h3>
      <div className={styles.converterWrapper}>
        <div className={`${styles.baseBox} ${styles.fromBox}`}>
          <span>You give</span>
          <ConversionUnit {...{nbu_rates: rates, inputState: fromState, setInputState: setFromState, oppositeInputState: toState, setOppositeInputState: setToState, }}/>
          <span> The exchange rate is valid on {obtainCurrentDayMonthYear()} </span>
        </div>
        <div className={`${styles.baseBox} ${styles.toBox}`}>
          <span>You get</span>
          <ConversionUnit {...{nbu_rates: rates, inputState: toState, setInputState: setToState, oppositeInputState: fromState, setOppositeInputState: setFromState, }}/>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ConverterBody;