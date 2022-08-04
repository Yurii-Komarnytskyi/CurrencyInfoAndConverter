import React from 'react';
import './App.css';
import ConverterBody from './components/converterBody/ConverterBody';
import InstanceOfCurrency from './components/currencyBar/InstanceOfCurrency';
import HeaderBar from './components/header/HeaderBar';
import { NBU_URL, PRIVAT24_URL, useFetchAndUnifyListOfRates, } from './utils';



const App: React.FC = () => {  

  const [privat24GotFetched, privat24_rates] = useFetchAndUnifyListOfRates(PRIVAT24_URL);
  const [nbuGotFetched, nbu_rates] = useFetchAndUnifyListOfRates(NBU_URL);

  return (
    <main className='mainContainer'>
      <HeaderBar />
      {privat24GotFetched && <InstanceOfCurrency rates={privat24_rates}/> }
      {nbuGotFetched && <ConverterBody rates={nbu_rates}/>}
    </main>
  );
}

export default App;
