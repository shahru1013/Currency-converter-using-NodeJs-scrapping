
const sendReq = () =>{
    // Get selected currency
    let fromCurrency = document.getElementById('from');
    let fromCurrencyText = fromCurrency.options[fromCurrency.selectedIndex].text;
    let toCurrency = document.getElementById('to');
    let toCurrencyText = toCurrency.options[toCurrency.selectedIndex].text;
    let amount = document.getElementById('amount').value;
    if(fromCurrencyText==toCurrencyText || fromCurrencyText=="Select" || toCurrencyText=="Select"){
        alert('Select Different Currency!');
    }
    
    else{
        if(amount!=null && amount>0){
            // Send request To server for scrape
            getScrapeData(fromCurrencyText,toCurrencyText,amount);
        }
        else{
            alert('Fill Amount!')
        }
  
    }
  
    //alert(fromCurrency.options[fromCurrency.selectedIndex].text+" "+toCurrency.options[toCurrency.selectedIndex].text);
}

// Erase inputs
const erase = () =>{
    let fromCurrency = document.getElementById('from');
    let toCurrency = document.getElementById('to');
    fromCurrency.selectedIndex=0;
    toCurrency.selectedIndex=0;
    let mainTxt = document.getElementById('mainText');
    let demo = document.getElementById('demo');
    let amount = document.getElementById('amount');
    demo.style.display="block";
    mainTxt.style.display="none";
    amount.value="";
}


// get data by scrape
const getScrapeData=(fromCur,toCur,amount)=>{
    axios.get('http://localhost:4000/scrape',{params:{from:fromCur,to:toCur,amount:amount}}).then((response)=>{
        //console.log(response.data);
        let resultSet = document.getElementById('resText');
       // resultSet.innerHTML="";
        let fT = document.getElementById('hmFm');
        let tT = document.getElementById('hmTo');
        let mT = document.getElementById('midTx');
        let mainTxt = document.getElementById('mainText');
        let demo = document.getElementById('demo');
        demo.style.display="none";
        mainTxt.style.display="block";
        fT.innerHTML=response.data.amount+" "+response.data.to;
        mT.innerHTML=" = ";
        tT.innerHTML=response.data.from;
        //resultSet.innerHTML=response.data.amount+" "+response.data.to+' = '+response.data.from;
    })
}