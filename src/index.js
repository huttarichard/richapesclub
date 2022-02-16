/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const rootNode = document.createElement('div');
rootNode.id = 'root'

document.querySelector('.content-wrapper').prepend(rootNode)

const web3 = new Web3(
  Web3.givenProvider || 'wss://main-light.eth.linkpool.io/ws'
);

window.web3 = web3

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);