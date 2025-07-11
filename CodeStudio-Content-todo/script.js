// todo-input id dom 가져오기
const input = document.querySelector("#todo-input");

// #submit id 클릭시 이벤트 발생
document.querySelector("#submit").addEventListener("click", () => {
    // 입력한 input.value 값 가져오기
    const inputData = input.value.trim();
    // 초기화
    if (!inputData) return;
    input.value = "";

    // div dom 만들거야
    const todo_el = document.createElement("div");
    // div에 todo-item class 추가
    todo_el.classList.add("todo-item");

    // div dom 생성
    const todo_content_el = document.createElement("div");
    todo_el.appendChild(todo_content_el);

    // input dom 생성 class text 추가
    // type에 text 추가 value 값 추가
    // readonly 속성이 있거나 없다면 readonly로 교체
    const todo_input_el = document.createElement("input");
    todo_input_el.classList.add("text");
    todo_input_el.type = "text";

    todo_input_el.value = inputData;
    todo_input_el.setAttribute("readonly", "readonly");
    // input 생성
    todo_content_el.appendChild(todo_input_el);

    const todo_actions_el = document.createElement("div");
    todo_actions_el.classList.add("action-items");

    const todo_done_el = document.createElement("i");
    todo_done_el.classList.add("fa-solid");
    todo_done_el.classList.add("fa-check");

    const todo_edit_el = document.createElement("i");
    todo_edit_el.classList.add("fa-solid");
    todo_edit_el.classList.add("fa-pen-to-square");
    todo_edit_el.classList.add("edit");

    const todo_delete_el = document.createElement("i");
    todo_delete_el.classList.add("fa-solid");
    todo_delete_el.classList.add("fa-trash");

    todo_actions_el.appendChild(todo_done_el);
    todo_actions_el.appendChild(todo_edit_el);
    todo_actions_el.appendChild(todo_delete_el);

    todo_el.appendChild(todo_actions_el);
    console.log(todo_el);
    // add the todo-item to lists
    document.querySelector(".todo-lists").appendChild(todo_el);

    // todo_done_le 클릭 시
    // class done 추가
    // todo_el에 todo_actions_el 자식 요소 삭제(dom)
    todo_done_el.addEventListener("click", () => {
        todo_input_el.classList.toggle("done");
        if (todo_input_el.classList.contains("done")) {
            todo_el.removeChild(todo_actions_el);
        }
    });

    // todo_edit_el 클릭 시
    // contains 선택한 요소가 특정한 부모요소에 속해 있는지 확인
    // calss edit, fa-pen 삭제 fa-x save 추가
    // input att readonly 삭제 마우스 포커스
    todo_edit_el.addEventListener("click", (e) => {
        if (todo_edit_el.classList.contains("edit")) {
            todo_edit_el.classList.remove("edit");
            todo_edit_el.classList.remove("fa-pen-to-square");
            todo_edit_el.classList.add("fa-x");
            todo_edit_el.classList.add("save");
            todo_input_el.removeAttribute("readonly");
            todo_input_el.focus();
        } else {
            todo_edit_el.classList.remove("save");
            todo_edit_el.classList.remove("fa-x");
            todo_edit_el.classList.add("fa-pen-to-square");
            todo_edit_el.classList.add("edit");
            todo_input_el.setAttribute("readonly", "readonly");
        }
    });

    // delete_el 클릭 시 .todo-lists에 todo_el 삭제
    todo_delete_el.addEventListener("click", (e) => {
        console.log(todo_el);
        document.querySelector(".todo-lists").removeChild(todo_el);
    });
});
