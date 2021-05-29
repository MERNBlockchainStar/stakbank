import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.scss";
import Main from "./containers/Main";
import reportWebVitals from "./reportWebVitals";
import { connectToMetaMask } from './api-metamask';
import { BrowserRouter as Router } from "react-router-dom";

if (!connectToMetaMask()) {
  alert("Please install MetaMask to use this dApp!"); //need modal dialog
}

const tokenAddress = '0x877E588Ff5580B751AF6AFA2595b3a28C71d0C85';
const tokenSymbol = '24KT';
const tokenDecimals = 18;
const tokenImage = 'http://placekitten.com/200/300';

try {
  // wasAdded is a boolean. Like any RPC method, an error may be thrown.
  const wasAdded = window.ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20', // Initially only supports ERC20, but eventually more!
      options: {
        address: tokenAddress, // The address that the token is at.
        symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
        decimals: tokenDecimals, // The number of decimals in the token
        image: tokenImage, // A string url of the token logo
      },
    },
  });

  if (wasAdded) {
    console.log('Thanks for your interest!');
  } else {
    console.log('Your loss!');
  }
} catch (error) {
  console.log(error);
}


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Main />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
