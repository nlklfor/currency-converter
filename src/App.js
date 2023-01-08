import { Converter } from './components/Converter/Converter';
import { Live } from './components/LiveCurrency/Live'
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App(props) {
  const [fromCurrency , setFromCurrency] = useState('UAH');
  const [toCurrency, setToCurrency] = useState('USD');
  const [toEUR, setToEUR] = useState('EUR');
  const [toUSD, setToUSD] = useState('USD');
  const [fromPrice, setFromPrice] = useState(0);                  // <---- Creating state for the component
  const [toPrice, setToPrice] = useState(0);
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
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);
  useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);
  const onChangeFromPrice = (value) => {                       // <----- Calculating value that will be shown FROM --> TO
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setToPrice(result.toFixed(3));
    setFromPrice(value);
  };
  const onChangeToPrice = (value) => {                        // <----- Calculating value that will be shown TO --> FROM
    const price = value / ratesRef.current[toCurrency];
    const result = price * ratesRef.current[fromCurrency];
    setFromPrice(result.toFixed(3));
    setToPrice(value);
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
        <h1 className="currency_live-title">
            Current exchange rates
        </h1>
      <header className="converter_header">
        <Live value={onChangeUSD} currency_value={"USD"} currency_uah={"UAH"} onChangeCurrency={1}/>
        <Live value={onChangeEUR} currency_value={"EUR"} currency_uah={"UAH"} onChangeCurrency={1}/>
      </header>
      <Converter value={fromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} onChangeValue={onChangeFromPrice} />
      <Converter value={toPrice} currency={toCurrency} onChangeCurrency={setToCurrency} onChangeValue={onChangeToPrice}/> 
    </div>
  );
}

export default App;

