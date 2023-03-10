import React from "react";
import "./Converter.css"

const currentCurrency = ["UAH", "USD", "EUR", "GBP"];

export const Converter = ({ value, currency, onChangeCurrency, onChangeValue}) => (
    <div className="currency_container">
        <ul className="currency_container-value">
            {currentCurrency.map((cur) => (
                <li onClick={() => onChangeCurrency(cur)} className={currency === cur ? 'active' : ''} key={cur}>
                    {cur}
                </li>
            ))}
            <li>
                <svg height="30px" viewBox="0 0 50 50" width="30px">
                    <rect fill="none" height="50" width="50" />
                    <polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 " />
                </svg>
            </li>
        </ul>
        <input className="currency-calculation" onChange={(e) => onChangeValue(e.target.value)} value={value} type="number" placeholder={0} />
    </div>
)