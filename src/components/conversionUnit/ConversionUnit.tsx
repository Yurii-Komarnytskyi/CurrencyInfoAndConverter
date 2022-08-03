import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { conversionCurrency, unifiedCurrencyData } from '../../types';
import { convertFromTo } from '../../utils';

import styles from './ConversionUnit.module.css';

type ConversionUnitProps = {
  nbu_rates : unifiedCurrencyData[],
  inputState: conversionCurrency,
  setInputState: React.Dispatch<React.SetStateAction<conversionCurrency>>,
  oppositeInputState:  conversionCurrency,
  setOppositeInputState: React.Dispatch<React.SetStateAction<conversionCurrency>>,
}

const ConversionUnit: React.FC<ConversionUnitProps> = (props: ConversionUnitProps) => {

  const {
    nbu_rates, 
    inputState, 
    setInputState, 
    oppositeInputState, 
    setOppositeInputState, 
  } = props;

  const inputHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    updateInputState: Dispatch<SetStateAction<conversionCurrency>>,
    updateOppositeInputState: Dispatch<SetStateAction<conversionCurrency>>,
  ) => {
    updateInputState(prev => ({ ...prev, inputVal: +event.target.value }));
    updateOppositeInputState(prev => ({...prev, inputVal: convertFromTo(+event.target.value, inputState.rate, oppositeInputState.rate)}));
  }

  const focucHandler = (
    updateState: Dispatch<SetStateAction<conversionCurrency>>,
  ) => {
    updateState(prev => ({...prev, gotFocused: true}));
  }

  const blurHandler = (
    updateState: Dispatch<SetStateAction<conversionCurrency>>,
  ) => {
    updateState(prev => ({...prev, gotFocused: false}));
  }

  const ddlHandler = (
    event: React.ChangeEvent<HTMLSelectElement>,
    updateState: Dispatch<SetStateAction<conversionCurrency>>,
  ) => {
    updateState(prev => ({ 
      ...prev, 
      rate: parseFloat(event.target.value), 
      ccy: event.target.value.slice(-3),
    }));
  }
  useEffect(()=> {
    setOppositeInputState(prev => ({...prev, inputVal : convertFromTo(inputState.inputVal, inputState.rate, oppositeInputState.rate)}));
  },[inputState.ccy, inputState.rate])

  return (
    <div className={styles.wrapper}>
      <input
        type="number"
        value={inputState.inputVal}
        className={styles.fancyInput}
        onChange={(e)=> inputHandler(e, setInputState, setOppositeInputState)}
        onFocus={()=> focucHandler(setInputState)}
        onBlur={()=> blurHandler(setInputState)}
      />
      <select 
        onChange={(e) => ddlHandler(e, setInputState)}
        className={styles.ddlList}
      >
        {nbu_rates.map((item) =>
          <option
            value={`${item['rate']} ${item['ccy']}`}
            key={item.txt}
            title={`${item['txt']}: ${item['rate']}`}   
          > {item['ccy']} </option>
        )}
      </select>
    </div>
  )
}

export default ConversionUnit;