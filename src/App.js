import { Converter } from './components/Converter/Converter';
import { Live } from './components/LiveCurrency/Live'
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App(props) {
  const [fromCurrency , setFromCurrency] = useState('UAH');
  const [toCurrency, setToCurrency] = useState('USD');
  const [fromPrice, setFromPrice] = useState(0);                  // <---- Creating state for the component
  const [toPrice, setToPrice] = useState(0);


  const ratesRef = useRef({});
  useEffect(() => {                                       // <----- Using hook useEffect() to connect our API and getting rate's data from it
    fetch('https://www.cbr-xml-daily.ru/latest.js')
    .then((res) => res.json())
    .then((json) => {
    ratesRef.current = json.rates;               
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
  const onChangeUSD = (value) => {
    const price = value / ratesRef.current[toCurrency];
    const result = price * ratesRef.current[fromCurrency];
    setFromPrice(result.toFixed(3));
    setToPrice(value);
  };
  return (
    <div className="converter_container">
      <header className="converter_header">
        <Live value={fromPrice} currency_usd={toCurrency} currency_uah={onChangeUSD} currency_eur={"EUR"} onChangeCurrency={1}/>
      </header>
      <Converter value={fromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} onChangeValue={onChangeFromPrice} />
      <Converter value={toPrice} currency={toCurrency} onChangeCurrency={setToCurrency} onChangeValue={onChangeToPrice}/> 
    </div>
  );
}

export default App;

