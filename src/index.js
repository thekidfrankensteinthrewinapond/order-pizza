import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';

const DOM = (
  <Router>
    <App />
  </Router>
);

ReactDOM.render(DOM, document.getElementById('root'));
