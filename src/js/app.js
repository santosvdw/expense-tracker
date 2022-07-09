const eDesc = document.querySelector('#expense-desc');
const eDate = document.querySelector('#expense-date');
const ePrice = document.querySelector('#expense-price');
const submitBtn = document.querySelector('#submit-btn');
const pError = document.querySelector('#error');
const tBody = document.querySelector('#expense-table');
const euro = '€';

let descList = [];
let dateList = [];
let priceList = [];
//
window.onload = () => {
    renderItem();
};

submitBtn.addEventListener('click', function () {
    checkForm();
});

window.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        checkForm();
    }
});

let checkForm = () => {
    if (ePrice.value == '' && eDate.value == '' && eDesc.value == '') {
        error('description', 'date', 'price');
        console.log('description', 'date', 'price');
        return;
    } else if (eDesc.value == '' && eDate.value == '') {
        error('description', 'date');
        console.log('description', 'date');
        return;
    } else if (eDesc.value == '' && ePrice.value == '') {
        error('description', 'price');
        console.log('description', 'date');
        return;
    } else if (eDate.value == '' && ePrice.value == '') {
        error('date', 'price');
        console.log('date', 'price');
        return;
    } else if (eDesc.value == '') {
        error('description');
        return;
    } else if (eDate.value == '') {
        error('date');
        return;
    } else if (ePrice.value == '') {
        error('price');
        return;
    } else {
        pError.innerHTML = '';
        addItem();
    }
};

let addItem = () => {
    console.log(eDesc.value + ' ' + eDate.value + ' ' + ePrice.value);
    //
    descList.push(eDesc.value);
    dateList.push(eDate.value);
    priceList.push(ePrice.value);
    //
    console.log(dateList);
    console.log(descList);
    console.log(priceList);
    //
    eDesc.value = '';
    eDate.value = '';
    ePrice.value = '';
    //
    saveItem();
};

let saveItem = () => {
    clearStorage();
    localStorage.setItem('Descriptions', JSON.stringify(descList));
    localStorage.setItem('Dates', JSON.stringify(dateList));
    localStorage.setItem('Prices', JSON.stringify(priceList));
    renderItem();
};

let renderItem = () => {
    let storedDesc = localStorage.getItem('Descriptions');
    let storedDate = localStorage.getItem('Dates');
    let storedPrice = localStorage.getItem('Prices');
    storedDesc = JSON.parse(storedDesc);
    storedDate = JSON.parse(storedDate);
    storedPrice = JSON.parse(storedPrice);
    tBody.innerHTML = '';
    //

    //
    for (let i = 0; i < storedDesc.length; i++) {
        console.log('Converted date: ' + dateFormat(storedDate[i], 'dd-MM-yyyy'));
        console.log(storedDate[i]);
        tBody.innerHTML += `
        <tr>
            <td>${storedDesc[i]}</td>
            <td>${dateFormat(storedDate[i], 'dd-MM-yyyy')}</td>
            <td>${euro + storedPrice[i]}</td>
        </tr>
        `;
    }
};

let clearStorage = () => {
    localStorage.clear();
};

let error = (fault1, fault2, fault3) => {
    console.log(`Enter a ${fault1}`);
    if (fault3) {
        pError.innerHTML = `*Enter a ${fault1}, a ${fault2} and a ${fault3}`;
    } else if (fault2) {
        pError.innerHTML = `*Enter a ${fault1} and a ${fault2}`;
    } else {
        pError.innerHTML = `*Enter a ${fault1}`;
    }

    return;
};

let dateFormat = (inputDate, format) => {
    //parse the input date
    const date = new Date(inputDate);

    //extract the parts of the date
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    //replace the month
    format = format.replace('MM', month.toString().padStart(2, '0'));

    //replace the year
    if (format.indexOf('yyyy') > -1) {
        format = format.replace('yyyy', year.toString());
    } else if (format.indexOf('yy') > -1) {
        format = format.replace('yy', year.toString().substr(2, 2));
    }

    //replace the day
    format = format.replace('dd', day.toString().padStart(2, '0'));

    return format;
};

function c() {
    localStorage.clear();
}
