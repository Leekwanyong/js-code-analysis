// dom 가져오기
const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// 랜덤 유저
async function getRandomUser() {
    try {
        const res = await fetch("https://randomuser.me/api");
        const data = await res.json();

        const user = data.results[0];

        const newUser = {
            name: `${user.name.first} ${user.name.last}`,
            money: Math.floor(Math.random() * 1000000),
        };
        addData(newUser);
    } catch (e) {
        alert("네트워크 오류");
        return;
    }
}

// 불변성 유지
function doubleMoney() {
    data = data.map((user) => {
        return { ...user, money: user.money * 2 };
    });

    updateDOM();
}

// 내림차순 정렬
function sortByRichest(providedData = data) {
    providedData.sort((a, b) => b.money - a.money);

    updateDOM();
}

// 1000000원 이상 유저 필터링
function showMillionaires() {
    data = data.filter((user) => user.money > 1000000);

    updateDOM();
}

// 유저 머니 누적 계산
function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);

    const exisingWealthEl = document.querySelector("#total-wealth");
    if (exisingWealthEl) {
        exisingWealthEl.remove();
    }

    const wealthEl = document.createElement("div");

    wealthEl.id = "total-wealth";
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
}

// Add new obj to data arr
function addData(obj) {
    data.push(obj);

    updateDOM();
}

// 유저 머니 업데이트
function updateDOM(providedData = data) {
    // Clear main div
    main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>
    <p><span>${providedData.length + 1}명</span></p>`;

    providedData.sort((a, b) => b.money - a.money);
    providedData.forEach((item) => {
        const element = document.createElement("div");
        element.classList.add("person");
        if (providedData[0] === item) {
            element.style.backgroundColor = "red";
        }
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

// 소수점 버리고 3자리까지
function formatMoney(number) {
    return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// Event listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);
