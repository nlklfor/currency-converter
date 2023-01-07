import React from "react";

export const Live = ({ value, currency_value, currency_uah,onChangeCurrency }) => (
    <div className="currency_live">
        <div className="currency_live-course">
            {onChangeCurrency} {currency_value} = {value} {currency_uah}
        </div>
    </div>
)