
let currency = [];


document.querySelector('.search').onkeyup = function(event){
    let value = event.currentTarget.value.toLowerCase();
    let currencySelect = currency.filter(function(el){
        const name = el.name.toLowerCase();
        return name.includes(value);
    })
    currencyRender(currencySelect);
}


document.querySelector('.input-date').onchange = function(event){
    let valueDate = event.currentTarget.value.replace(/-/g, '');

    getCurrency(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${valueDate}&json`);
    
    document.querySelector('.search').value = '';
}

function currencyRender(currency){
    let htmlStr = currency.reduce(function(acc, el, index){
        return acc + `<tr>
                            <th>${index+1}</th>
                            <th>${el.name}</th>
                            <th>${el.rate}</th>
                            <th>${el.code}</th>
                            <th>${el.data}</th>
                    </tr>`
    }, '');
    document.querySelector('.table tbody').innerHTML = htmlStr || '<tr><th colspan = "5" class="text-center">Not found</th></tr>';
}

currencyRender(currency);

function getCurrency(date){
    fetch(date).then(function (data){
        return data.json();
    }).then(function(data) {
        currency = data.map(function(el) {
            return {
                name: el.txt,
                rate: el.rate,
                code: el.cc,
                data: el.exchangedate
                };
            });
            currencyRender(currency);
    });
}
getCurrency('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20220801&json');