//

import { useEffect } from "react";
import { useState } from "react";

export default function App() {
  const [rate, setRate] = useState("USD");
  const [money, setMoney] = useState("INR");
  const [ans, setAns] = useState();
  const [i, setI] = useState(1);

  useEffect(
    function () {
      async function CurrencyChange() {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${i}&from=${rate}&to=${money}`
        );

        const data = await res.json();

        setAns(data.rates[money]);
      }
      if (rate === money) return setAns(i);

      CurrencyChange();
    },
    [rate, money, i]
  );
  return (
    <div>
      <input type="text" value={i} onChange={(e) => setI(e.target.value)} />
      <select onClick={(e) => setRate(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select onClick={(e) => setMoney(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>OUTPUT {ans}</p>
    </div>
  );
}
