import { Converter } from './components/Converter/Converter';
import { Live } from './components/LiveCurrency/Live'
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App(props) {
  const [fromCurrency , setFromCurrency] = useState('UAH');
  const [toCurrency, setToCurrency] = useState('USD');
  const [sourcePrice, setSourcePrice] = useState(0);                  // <---- Creating state for the component
  const [targetPrice, setTargetPrice] = useState(0);
  const [rates, setRates] = useState(0);

  
  const ratesRef = useRef({});
  useEffect(() => {                                       // <----- Using hook useEffect() to connect our API and getting rate's data from it
    fetch('https://www.cbr-xml-daily.ru/latest.js')
    .then((res) => res.json())
    .then((json) => {
    ratesRef.current = json.rates;      
    setRates(json.rates)
    })
    .catch((err) => {
      console.warn(err);
      <h1 className='error'>Can`t get any data from the server</h1>
      alert('Can`t get any data');
    })
  }, []);
  useEffect(() => {
    onChangeFromPrice(sourcePrice);
  }, [fromCurrency]);
  useEffect(() => {
    onChangeToPrice(targetPrice);
  }, [toCurrency]);
  const onChangeFromPrice = (value) => {                       // <----- Calculating value that will be shown FROM --> TO
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setTargetPrice(result.toFixed(3));
    setSourcePrice(value);
  };
  const onChangeToPrice = (value) => {                        // <----- Calculating value that will be shown TO --> FROM
    const price = value / ratesRef.current[toCurrency];
    const result = price * ratesRef.current[fromCurrency];
    setSourcePrice(result.toFixed(3));
    setTargetPrice(value);
  };
  const onChangeUSD = () => {
    const price = 1 * rates['UAH'] / rates['USD'];
    return price.toFixed(3);
  };
  const onChangeEUR = () => {
    const price = 1 * rates['UAH']/ rates['EUR'];
    return price.toFixed(3);
  };
  return (
    <div className="converter_container">
      <h1 className="currency_title">
            Currency Converter
        </h1>
        <h1 className="currency_title-live">
            Current exchange rates
        </h1>
      <header className="converter_header">
        <Live value={onChangeUSD} currency_value={"USD"} currency_uah={"UAH"} onChangeCurrency={1}/>
        <Live value={onChangeEUR} currency_value={"EUR"} currency_uah={"UAH"} onChangeCurrency={1}/>
      </header>
      <Converter value={sourcePrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} onChangeValue={onChangeFromPrice} />
      <Converter value={targetPrice} currency={toCurrency} onChangeCurrency={setToCurrency} onChangeValue={onChangeToPrice}/> 
    </div>
  );
}

export default App;

