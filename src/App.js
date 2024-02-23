import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [info, setInfo] = useState([]);
  const [options, setOptions] = useState([]);
  const [output, setOutput] = useState();

  useEffect(() => {
    axios
      .get(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`
      )
      .then((res) => {
        setInfo(res.data[from]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [from]);

  useEffect(() => {
    setOptions(Object.keys(info));
    // Move Convert function here
    const Convert = () => {
      const rate = info[to];
      setOutput(amount * rate);
    };
    Convert(); // Call the Convert function here
  }, [info, amount, to]);

  const Convert = () => {
    const rate = info[to];
    setOutput(amount * rate);
  };

  // const handleConvertClick = () => {
  //   Convert();
  // };

  return (
    <div className="App">
      <div className="converter">
        <div className="heading">
          <h3>Currency Converter</h3>
        </div>

        <div className="container">
          <div className="left">
            <h4>Amount</h4>
            <input
              type="text"
              placeholder="Enter Amount"
              onChange={(e) => setAmount(e.target.value)}
              // onChange={handleAmountChange}
            />
          </div>
          <div className="middle">
            <h4>Form</h4>
            <select onChange={(e) => setFrom(e.target.value)} value={from}>
              {options.map((o) => (
                <option value={o} key={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
          <div className="right">
            <h4>To</h4>
            <select onChange={(e) => setTo(e.target.value)} value={to}>
              {options.map((o) => (
                <option value={o} key={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
          <div className="result">
            <button onClick={Convert}>Convert</button>
            <h4>Converted Amount:</h4>
            <h5>{amount + " " + from + "=" + output + " " + to}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
