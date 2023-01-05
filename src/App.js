import { Converter } from './components/Converter';
import './App.css';

function App() {
  return (
    <div className="converter_container">
      <header className="converter-header">
      </header>
      <Converter value={0} currency="UAH" />
      <Converter value={0} currency="USD"/> 
    </div>
  );
}

export default App;

