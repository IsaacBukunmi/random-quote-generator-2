import React from 'react';
import './App.css';
import QuoteGenerator from './QuoteGenerator';

function App(){
  return(
    <div>
      <div className="quote-header">
        <h1>RANDOM QUOTE GENERATOR</h1>
      </div>
      <QuoteGenerator />
    </div>
  )
}

export default App;
