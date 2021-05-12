const express = require('express');
const cheerio = require('cheerio');
const request = require('request');
const cors = require('cors');
const express_obj = express();
const port = process.env.PORT || 4000;
express_obj.listen(port,console.log(`start at ${port}`));
express_obj.use(cors());

express_obj.get('/scrape',(req,res)=>{
    // get params value from request
    let fromCurrency = req.query.from;
    let toCurrency = req.query.to;
    let amount = req.query.amount;
    console.log(fromCurrency+" "+toCurrency+' '+amount);
    getScrapeHtml(res,fromCurrency,toCurrency,amount);
})

function getScrapeHtml(res,fromCurrency,toCurrency,amount){
    request(`https://www.google.com/search?q=${amount}+" "+${fromCurrency}+to+" "+${toCurrency}&aqs=chrome.1.69i57j0j0i22i30j69i64.4245j1j7&sourceid=chrome&ie=UTF-8&hl=en&gl=en`,(error,response,html)=>{
        //console.log(html);
        seperateHtml(html,res,toCurrency,fromCurrency,amount);
        //res.send(html);
    })
}

function seperateHtml(html,res,toCurrency,fromCurrency,amount){
    let $ = cheerio.load(html);
    let slt = $('div');
    console.log('start-------------');
    slt.each((index,element)=>{
        let x = $(element).text();
        let divTexts = x.split(' '); //its a trick to find the currect currency value
        let destinationText = toCurrency.split(' ');
        if(divTexts[divTexts.length-1]==destinationText[destinationText.length-1]){
        console.log(x+' val');
        res.send({
            from:x,
            to:fromCurrency,
            amount:amount
        });
        return false;
    }
    })
   // console.log(slt);
}