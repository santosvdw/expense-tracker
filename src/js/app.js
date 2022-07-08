const eDesc = document.querySelector('#expense-desc');
const eDate = document.querySelector('#expense-date');
const ePrice = document.querySelector('#expense-price');
const submitBtn = document.querySelector('#submit-btn');
const pError = document.querySelector('#error');

let descList = [];
let dateList = [];
let priceList = [];

submitBtn.addEventListener('click', function () {
    addItem();
});

window.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addItem();
    }
});

let addItem = () => {
    console.log(eDesc.value + ' ' + eDate.value + ' ' + ePrice.value);
    //
    checkForm();
    if (eDesc.value == '') {
        error('description');
        return;
    }
    if (eDate.value == '') {
        error('date');
        return;
    }
    if (ePrice.value == '') {
        error('price');
        return;
    }
    ///////////////////////
    if (eDesc.value == '' && eDate.value == '') {
        error('description', 'date');
        return;
    }
    if (eDesc.value == '' && ePrice.value == '') {
        error('description', 'price');
        return;
    }
    if (ePrice.value == '' && eDate.value == '') {
        error('date', 'price');
        return;
    }
    if (ePrice.value == '' && eDate.value == '' && eDesc.value == '') {
        error('description', 'date', 'price');
        return;
    }
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
};

let clearStorage = () => {
    localStorage.clear();
};

function c() {
    localStorage.clear();
}

let error = (fault1, fault2, fault3) => {
    console.log(`Enter a ${fault1}`);
    if (fault3) {
        pError.innerHTML = `*Enter a ${fault1}, a ${fault2} and a ${fault3}`;
    } else if (fault2) {
        pError.innerHTML = `*Enter a ${fault1} and a ${fault2}`;
    } /*else {
        pError.innerHTML = `*Enter a ${fault1}`;
    }*/

    return;
};

let checkForm = () => {
    if (ePrice.value == '' && eDate.value == '' && eDesc.value == '') {
        error('description', 'date', 'price');
        console.log('description', 'date', 'price');
        return;
    }
    ///////////////////////
    if (eDesc.value == '' && eDate.value == '') {
        error('description', 'date');
        console.log('description', 'date');
        return;
    }
    if (eDesc.value == '' && ePrice.value == '') {
        error('description', 'price');
        console.log('description', 'date');
        return;
    }
    if (eDate.value == '' && ePrice.value == '') {
        error('date', 'price');
        console.log('date', 'price');
        return;
    }
    ///
    /*   if (eDesc.value == '') {
        error('description');
        return;
    }
    if (eDate.value == '') {
        error('date');
        return;
    }
    if (ePrice.value == '') {
        error('price');
        return;
    } */
};
