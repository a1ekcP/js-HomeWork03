
let currency = [];


function toSort() {
    for(i of document.querySelectorAll('[data-attr]')){//[txt rate cc]
        i.onclick = function(event){
            let key = event.currentTarget.getAttribute("data-attr");
            let isSorted = event.currentTarget.getAttribute("data-sort");

            let sortedRates = currency.sort(function(a, b){
                if(isSorted){
                    return a[key] > b[key] ? -1 : 1;
                }
                return a[key] > b[key] ? 1 : -1;
            });

            if(isSorted){
                event.currentTarget.removeAttribute("data-sort");
            }else{
                event.currentTarget.setAttribute("data-sort", "+");
            }
            

            currencyRender(sortedRates);
        }
    }
}


document.querySelector('.search').onkeyup = function(event){
    let value = event.currentTarget.value.toLowerCase();
    let currencySelect = currency.filter(function(el){
        const name = el.name.toLowerCase();
        return name.includes(value);
    })
    currencyRender(currencySelect);
}


document.querySelector('.input-date').onchange = function(event){
    let valueDate = event.currentTarget.value.replaceAll('-', '');
    getCurrency(valueDate);

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
    toSort();
}

currencyRender(currency);


function getCurrency(date){
    fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${date}&json`).then(function (data){
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
getCurrency(20220801);


