import { Converter } from './components/Converter';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [fromCurrency , setFromCurrency] = useState('UAH');
  const [toCurrency, setToCurrency] = useState('USD');
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);


  const ratesRef = useRef({});
  useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/latest.js')
    .then((res) => res.json())
    .then((json) => {
    ratesRef.currency = json.rates;
    onChangeToPrice = (1);
    console.log(json.rates);
    })
    .catch((err) => {
      console.warn(err);
      alert('Can not get any data');
    })
  }, []);
  const onChangeFromPrice = (value) => {
    const price = value / rates[fromCurrency];
    const result = price * rates[toCurrency];
    setToPrice(result);
    setFromPrice(value);
  };
  const onChangeToPrice = (value) => {
    const price = value / rates[toCurrency];
    const result = price * rates[fromCurrency];
    setFromPrice(result);
    setToPrice(value);
  };
  return (
    <div className="converter_container">
      <header className="converter-header">
      </header>
      <Converter value={fromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} onChangeValue={onChangeFromPrice} />
      <Converter value={toPrice} currency={toCurrency} onChangeCurrency={setToCurrency} onChangeValue={onChangeToPrice} /> 
    </div>
  );
}

export default App;

