const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

async function getQuotes(){
    loading();
    const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
        console.log(quote);

        if(quote.text.length>120){
            quoteText.classList.add('long-quote');
        }
        else{
            quoteText.classList.remove('long-quote');
        }

        if(!quote.author){
            quoteAuthor.textContent = "Unknown";
        }
        else{
            quoteAuthor.textContent = quote.author;
        }
        complete();
        quoteText.textContent = quote.text;
    }
    catch(error){
        console.log(error);
    }
}

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl,"_blank");
}
newQuoteBtn.addEventListener('click',getQuotes);
twitterBtn.addEventListener('click',tweetQuote);
getQuotes();