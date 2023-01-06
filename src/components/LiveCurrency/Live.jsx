import React from "react";

export const Live = ({ value, currency_usd, currency_uah, currency_eur, onChangeCurrency, onChangeValue, onChangeUSD }) => (
    <div className="currency_live">
        <h1 className="currency_title">
            Currency Converter
        </h1>
        <h1 className="currency_live-title">
            Current exchange rates
        </h1>
        <div className="currency_live-USD">
            {onChangeCurrency} {currency_usd} = {value} {currency_uah}
        </div>
        <div className="currency_live-EUR">
            1 {currency_eur} = {value} {currency_uah}
        </div>
    </div>
)