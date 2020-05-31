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
        addRandomQuote:false,
        current:0,
        directionIsRight:true,
        nextQuote: "",
        addNextQuote: true,
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
        // const index = this.state.QuoteArray.findIndex(item => item === this.state.QuoteArray[randomNum])
        // const next = index + 1
        // const getNextQuote = this.state.QuoteArray[next].text
        this.setState({
            randomQuote : randomQuoteText,
            randomQuoteAuthor : randomQuoteAuthor,
            addFirstQuote:false,
            addRandomQuote:true,
            addNextQuote: false,
            // nextQuote: getNextQuote
        })
    } 

    handleDirectionClick = () => {
      this.state.current++;
      let index = this.state.QuoteArray.findIndex(item => item === this.state.QuoteArray[this.state.current]);
      const getNextQuote = this.state.QuoteArray[index].text
      const getNextQuoteAuthor = this.state.QuoteArray[index].author
      this.setState({
        nextQuote: getNextQuote,
        nextQuoteAuthor: getNextQuoteAuthor,
        addFirstQuote:false,
        addRandomQuote:false,
        addNextQuote: true,
    })
    }
  
    render(){
      let firstQuoteClass = "first-quote";
      if (this.state.addFirstQuote === false){
        firstQuoteClass = "remove-first-quote";
      }

      let randomQuoteClass = "remove-random-quote";
      if (this.state.addRandomQuote === true){
        randomQuoteClass="random-quote quote-anim";
      }

      let nextQuoteClass = "next-quote-class";
      if (this.state.addNextQuote === false){
        nextQuoteClass="remove-next-quote";
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
                            {
                              this.state.firstQuote && 
                              <p><img src={QuoteImg} alt="quote image" /> {this.state.firstQuote}</p>
                            }
                            {
                              this.state.firstQuoteAuthor && <span>- {this.state.firstQuoteAuthor}</span>
                            }
                            
                          </div> 
                          <div className={randomQuoteClass}>
                            <p><img src={QuoteImg} alt="quote image" /> {this.state.randomQuote}</p>
                            {
                              this.state.randomQuoteAuthor && <span>- {this.state.randomQuoteAuthor}</span>
                            } 
                          </div>
                          <div className={nextQuoteClass}>
                            {
                            this.state.nextQuote && 
                            <p><img src={QuoteImg} alt="quote image" /> {this.state.nextQuote}</p>
                            }
                            {
                              this.state.nextQuoteAuthor && <span>- {this.state.nextQuoteAuthor}</span>
                            } 
                          </div>
                      </div>
                      <div className="mobile-arrow-dir">
                        <img className="mobile-left" src={MobileLeftArrow}  alt=""/>
                        <img className="mobile-right" onClick={this.handleDirectionClick } src={MobileRightArrow} alt=""/>
                      </div>
                  </div>
               
                <div className="forward-button"  onClick={this.handleDirectionClick }>
                    <img src={RightArrow} alt="" />
                </div>
           </section>
        </div>
      )
    }
}

export default QuoteGenerator
  
  