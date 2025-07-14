// dom 가져오기
const form = document.getElementById("form");
const input = document.querySelectorAll(".input");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// 매개변수 input, message 에러
function showError(input, message) {
    // input에 자식
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector("small");
    small.innerText = message;
}

// 성공 메세지
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

// 추가한 정규식
function checkInput(input) {
    const re = /^[A-Za-z]+$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, "Error Only Eng");
    }
}

// 정규식 이메일 체크
function checkEmail(input) {
    const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, "Email is not valid");
    }
}

// 모든 필드가 입력이 되었나?
function checkRequired(inputArr) {
    let isRequired = false;
    inputArr.forEach(function (input) {
        if (input.value.trim() === "") {
            showError(input, `${getFieldName(input)} is required`);
            isRequired = true;
        } else {
            showSuccess(input);
        }
    });

    return isRequired;
}

// 최소 길이, 최대 길이 체크
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

// 비밀번호가 같냐?
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, "Passwords do not match");
    }
}

// 필드네임 가져오기
// charAt() 함수는 문자열에서 지정된 위치에 존재하는 문자를 찾아서 반환하는 함수
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener("submit", function (e) {
    e.preventDefault();

    checkInput(username);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
});

// 실시간 유효성 체크로 변경해보기
input.forEach((field) => {
    field.addEventListener("input", () => {
        switch (field.id) {
            case "username":
                checkRequired([field]);
                checkInput(field);
                checkLength(field, 3, 15);
                break;
            case "email":
                checkRequired([field]);
                checkEmail(field);
                break;
            case "password":
                checkRequired([field]);
                checkLength(field, 6, 25);
                break;
            case "password2":
                checkRequired([field]);
                checkPasswordsMatch(password, password2);
                break;
            default:
                break;
        }
    });
});
