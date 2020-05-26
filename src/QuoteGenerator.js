import React from 'react';
import LeftArrow from './images/left-arrow-2.png';
import RightArrow from './images/right-arrow.png';
import QuoteImg from './images/quote.png';
import MobileLeftArrow from './images/mobile-left-arrow.png';
import MobileRightArrow from './images/mobile-right-arrow.png'

class QuoteGenerator extends React.Component{

    constructor(){
      super();
      this.state ={
        firstQuote : "",
        firstQuoteAuthor : "",
        randomQuote : "",
        randomQuoteAuthor : "",
        QuoteArray : [],
        addFirstQuote: true,
        addRandomQuote:false
      }
    }


    componentDidMount(){

      fetch('https://type.fit/api/quotes')
      .then(res => res.json())
      .then(data => {
          this.setState({
            firstQuote: data[0].text,
            firstQuoteAuthor:data[0].author,
            QuoteArray:data
          })
      })
    }

    handleClick = () => {
        const randomNum = Math.floor(Math.random() * this.state.QuoteArray.length);
        const randomQuoteText = this.state.QuoteArray[randomNum].text;
        const randomQuoteAuthor = this.state.QuoteArray[randomNum].author;
        console.log(this.state.QuoteArray.indexOf(randomQuoteText));
        this.setState({
            randomQuote : randomQuoteText,
            randomQuoteAuthor : randomQuoteAuthor,
            firstQuote : "",
            firstQuoteAuthor : "",
            addFirstQuote:false,
            addRandomQuote:true
        })
    } 
  
    render(){
      let firstQuoteClass = "first-quote";
      if (this.state.addFirstQuote == false){
        firstQuoteClass = "remove-first-quote";
      }

      let randomQuoteClass = ["remove-random-quote"];
      if (this.state.addRandomQuote == true){
        randomQuoteClass="random-quote quote-anim";
      }

      return(
        <div>
           <section className="quote-section">
               <div className="backward-button">
                    <img src={LeftArrow} alt="" />
               </div>
              
                <div className="quote-container">
                      <button onClick={this.handleClick}>Generate Quote</button>
                      <div className="quote-text"> 
                          <div className={firstQuoteClass}>
                            <p><img src={QuoteImg} alt="quote image" /> {this.state.firstQuote}</p>
                            <span>- {this.state.firstQuoteAuthor}</span>
                          </div> 
                          <div className={randomQuoteClass}>
                            <p><img src={QuoteImg} alt="quote image" /> {this.state.randomQuote}</p>
                            {
                              this.state.randomQuoteAuthor && <span>- {this.state.randomQuoteAuthor}</span>
                            } 
                          </div>
                      </div>
                      <div className="mobile-arrow-dir">
                        <img className="mobile-left" src={MobileLeftArrow}  alt=""/>
                        <img className="mobile-right" src={MobileRightArrow} alt=""/>
                      </div>
                  </div>
               
                <div className="forward-button">
                    <img src={RightArrow} alt="" />
                </div>
           </section>
        </div>
      )
    }
}

export default QuoteGenerator
  
  