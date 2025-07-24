// dom
const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// const dummyTransactions = [
//   { id: 1, text: 'Flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: 300 },
//   { id: 3, text: 'Book', amount: -10 },
//   { id: 4, text: 'Camera', amount: 150 }
// ];
// 로컬 스토리지 가져오기
const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));
// null이 아니면 로컬스토리지 가져오기
let transactions = localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// 기능 추가가
function checkTextValidation(text, amount) {
    const isTextEmpty = [text.value, amount.value].some((v) => v.trim() === "");
    const isTextTooLong = [text.value, amount.value].some((v) => v.trim().length > 20);
    return { isTextEmpty, isTextTooLong };
}

// 유저 추가
function addTransaction(e) {
    e.preventDefault();
    // 빈 문자열 체크
    const { isTextEmpty, isTextTooLong } = checkTextValidation(text, amount);
    if (isTextEmpty) {
        alert("Please add a text and amount");
    } else if (isTextTooLong) {
        alert("텍스트와 금액은 최대 20자까지 입력할 수 있습니다.");
        return;
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value,
        };

        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateValues();

        updateLocalStorage();
        // 초기화
        text.value = "";
        amount.value = "";
    }
}

// 랜덤 아이디디
function generateID() {
    return Math.floor(Math.random() * 100000000);
}
// 추가
function getSignAndClass(amount) {
    return {
        sign: amount < 0 ? "-" : "+",
        className: amount < 0 ? "minus" : "plus",
    };
}

// 유저 출력
function addTransactionDOM(transaction) {
    // Get sign
    const { sign, className } = getSignAndClass(transaction.amount);

    const item = document.createElement("li");

    // Add class based on value
    item.classList.add(className);

    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
        transaction.amount
    )}</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;

    list.appendChild(item);
}

// 업데이트 가격
function updateValues() {
    const amounts = transactions.map((transaction) => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const income = amounts
        .filter((item) => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const expense = (amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}

// 제거
function removeTransaction(id) {
    transactions = transactions.filter((transaction) => transaction.id !== id);

    updateLocalStorage();

    init();
}

// 로컬 스토리지 추가
function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Init app
function init() {
    list.innerHTML = "";

    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

form.addEventListener("submit", addTransaction);
