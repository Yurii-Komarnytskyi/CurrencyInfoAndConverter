import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { NBUStateService, Privat24, unifiedCurrencyData, url } from "./types";

export const PRIVAT24_URL = 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11';
export const NBU_URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

export const unifyFetchedData = (arrOfRates: Privat24[] | NBUStateService[]) => {
 const copy = JSON.parse(JSON.stringify(arrOfRates));
 return copy.reduce((accum: unifiedCurrencyData[], val: any) => {
  let t:unifiedCurrencyData = {
    rate: ((val.hasOwnProperty('rate'))? val['rate']: val['buy']),
    ccy: ((val.hasOwnProperty('ccy'))? val['ccy']: val['cc']),
    sale: ((val.hasOwnProperty('sale'))? val['sale']: 0),
    exchangedate: ((val.hasOwnProperty('exchangedate'))? val['exchangedate']: new Date()),
    txt: ((val.hasOwnProperty('txt'))? val['txt']: val['ccy']),
  }
  accum.push(t);
  return accum;
 },[] as unifiedCurrencyData[]);
}

export async function fetchAndUnifyRates(
  anUrlOfBankAPI: url, 
  updateState: Dispatch<SetStateAction<Array<unifiedCurrencyData>>>, 
  unifier: Function,
  indicateDataFetching: boolean,
  updateStateOfIndicator: Dispatch<SetStateAction<boolean>>,) {

  try {
    let resp = await fetch(anUrlOfBankAPI);
    let respData = await resp.json();
    updateState(unifier(respData));
    if(indicateDataFetching) updateStateOfIndicator(true);
  } catch (error) {
    console.error(error);
  }
}

export const useFetchAndUnifyListOfRates = (anUrlOfBankAPI: url):[boolean, unifiedCurrencyData[]]  => {
  const [areDataBeingFetched, setHasDataFetched] = useState<boolean>(false);
  const [listOfFetched, setListOfFetched] = useState<Array<unifiedCurrencyData>>([] as unifiedCurrencyData[]);

  useEffect(()=> {
    fetchAndUnifyRates(anUrlOfBankAPI, setListOfFetched, unifyFetchedData, true, setHasDataFetched);
  }, []);
  return [areDataBeingFetched, listOfFetched];
}

export const convertFromTo = (fromInp: number | ' ', fromRate: number, toRate: number): number | ' ' => (fromInp === ' ')? ' ' : +(fromInp * fromRate / toRate).toFixed(2);

export const obtainCurrentDayMonthYear = (): string => `${(new Date().getDay() >= 10)? new Date().getDay(): '0' + new Date().getDay()}/${(new Date().getMonth() >= 10)? new Date().getMonth() + 1: '0' + (new Date().getMonth() + 1)}/${new Date().getFullYear()}`;

export const removeDfltZeroState = (e: string): number | ' ' =>  (e === '')? ' ': +e;

