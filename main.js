const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

//fetch random user and add money
async function getRandomUser() {
    const res = await fetch("https://randomuser.me/api");
    const data = await res.json();

    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    addData(newUser);
}

//Add new obj to data arr
function addData(obj) {
    data.push(obj);

    updateDOM();
}

//update DOM
function updateDOM(providedData = data) {
    //clear main div
    main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";

    providedData.forEach(item => {
        const element = document.createElement("div");
        element.classList.add("person");
        element.innerHTML = `<strong>${item.name}</strong> $${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

//Form money
function formatMoney(number) {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
//double money
function doubleMoney() {
    data = data.map(item => {
        return { name: item.name, money: item.money * 2 }
    })
    updateDOM();
}

//sort richest
function sortRichest() {
    data.sort((a, b) => {
        return b.money - a.money;
    })
    updateDOM();
}
//show Millionares
function showMillionaires() {
    data = data.filter(item => {
        return item.money > 1000000;
    })
    updateDOM();
}

//calculate total wealth
function calculateWealth() {
    const total = data.reduce((acc, user) => (acc += user.money), 0)
    const totaWealth = document.createElement('div');
    totaWealth.innerHTML = `<h3>Total Wealth:<strong>$${formatMoney(total)}</strong></h3>`;
    main.appendChild(totaWealth);
}
//Event listeners
addUserBtn.addEventListener("click", getRandomUser);

doubleBtn.addEventListener("click", doubleMoney);

sortBtn.addEventListener("click", sortRichest);

showMillionairesBtn.addEventListener("click", showMillionaires);

calculateWealthBtn.addEventListener("click", calculateWealth);