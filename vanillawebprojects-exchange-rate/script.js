// dom 가져오가
const currencyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");
const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

currencyEl_one.focus();

// 서버 통신 및 계산
function calculate() {
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;
    fetch("https://open.exchangerate-api.com/v6/latest")
        .then((res) => res.json())
        .then((data) => {
            //  console.log(data);
            const rate = data.rates[currency_two] / data.rates[currency_one];
            rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
            // 실수 버림
            amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
        })
        .catch((e) => {
            alert("네트워크 오류입니다.");
            console.log(`${e}에러`);
        });
}

function check(el) {
    const num = parseFloat(el);
    if (isNaN(num) || num < 0) {
        return false;
    }
}

// Event Listener
currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", () => {
    if (check(amountEl_one.value)) {
        calculate();
    }
});
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", () => {
    if (check(amountEl_two.value)) {
        calculate();
    }
});

swap.addEventListener("click", () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
});

calculate();
