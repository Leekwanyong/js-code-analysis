// 목데이터
let mockData = [
    {
        id: "1",
        title: "This is title",
        done: false,
        date: new Date(),
    },
    {
        id: "2",
        title: "This is second title",
        done: false,
        date: new Date(),
    },
    {
        id: "3",
        title: "This is third title",
        done: false,
        date: new Date(),
    },
    {
        id: "4",
        title: "This is forth title",
        done: false,
        date: new Date(),
    },
];

class Todo {
    // 생성자
    constructor() {
        // 생성한 인스턴스 객체 this
        let self = this;
        // DOM list-items 가져오기
        this.list = document.querySelector(".list-items");
        // Todo 인스턴스가 생성되자마자 페이지가 처음 로드될 때 화면에 렌더링
        this.render();
        // btn-add-item 클릭시 insertItem 디스 바인딩
        document.querySelector(".btn-add-item").addEventListener("click", this.insertItem.bind(this));
        // btn-update 클릭시 updateItem 디스 바인딩
        document.querySelector(".btn-update").addEventListener("click", this.updateItem.bind(this));

        document.addEventListener("click", (event) => {
            // 이벤트 타겟이 없으면 리턴
            if (!event.target) {
                return;
            }
            // btn-delete 부모요소에 속해있는지지 (contains)
            // 속해 있다면 삭제
            if (event.target.classList.contains("btn-delete")) {
                self.removeItem(event);
            }

            if (event.target.classList.contains("btn-edit")) {
                self.renderEditForm(event);
            }

            if (event.target.classList.contains("btn-complete")) {
                self.setTaskComplete(event);
            }
        });
    }
    // 여기 까지 생성자

    // 화면에 렌더
    render() {
        this.list.innerHTML = "";
        // 목 데이트 루프
        mockData.forEach((item) => {
            // 둠에 item.id가 있는거 가져오기
            this.createDomElements(item.id);
            // item.title을 li에 삽입
            this.li.insertAdjacentHTML("afterbegin", item.title);
            // item.done true 라면 클래스에 done을 추가
            if (item.done) {
                this.li.classList.add("done");
            }
            // li 생성
            this.list.appendChild(this.li);
        });
    }
    // form 생성
    renderEditForm(event) {
        // data-id 속성 가져오기
        let id = event.target.getAttribute("data-id");
        // .edit-popup 클래스 hide 삭제제
        document.querySelector(".edit-popup").classList.remove("hide");
        // 생성
        document.querySelector(".edit-popup").classList.add("show");
        // btn-update에 속성 생성 만약 data-id가 있다면 id에 있는 data-id를 새로운 값으로 적용
        document.querySelector(".btn-update").setAttribute("data-id", id);
        // 목 데이터 루프
        mockData.forEach((item) => {
            // item.id와 id 가 같다면 .edit-item에 value를 item.title로 변경
            if (item.id === id) {
                document.querySelector(".edit-item").value = item.title;
            }
        });
    }
    // 둠 생성
    createDomElements(id) {
        this.li = document.createElement("li");
        this.edit = document.createElement("button");
        this.delete = document.createElement("button");
        this.complete = document.createElement("button");

        this.edit.classList.add("btn-edit");
        this.delete.classList.add("btn-delete");
        this.complete.classList.add("btn-complete");

        this.delete.setAttribute("data-id", id);
        this.edit.setAttribute("data-id", id);
        this.complete.setAttribute("data-id", id);

        this.edit.innerHTML = "Edit";
        this.delete.innerHTML = "Delete";
        this.complete.innerHTML = "Complete";

        this.li.appendChild(this.delete);
        this.li.appendChild(this.edit);
        this.li.appendChild(this.complete);
    }

    insertItem() {
        // .item value 값 가져오기
        let todoItem = document.querySelector(".item").value;
        // 새로운 아이템 생성
        let newItem = {
            id: Date.now().toString(),
            title: todoItem,
            done: false,
            date: new Date(),
        };
        // 목데이터에 새로운 아이템 푸쉬 배열에 맨 끝에 추가
        mockData.push(newItem);
        // 생성후 value값 초기화
        document.querySelector(".item").value = "";
        this.render();
    }

    removeItem(event) {
        // data-id 가져오기
        let id = event.target.getAttribute("data-id");
        // 필터로 item.id !== id가 같지 않다면 해당 아이템 뺴고 item 리턴
        mockData = mockData.filter((item) => {
            if (item.id !== id) {
                return item;
            }
        });

        this.render();
    }
    // 업데이트
    updateItem(event) {
        let id = event.target.getAttribute("data-id");
        let itemTobeUpdated = document.querySelector(".edit-item").value;
        // map 을 돌면서 item.id === id가 같다면 item에 title = itemTobeUpdated 함
        mockData = mockData.map((item) => {
            if (item.id === id) {
                item["title"] = itemTobeUpdated;
            }

            return item;
        });

        document.querySelector(".edit-popup").classList.remove("show");
        document.querySelector(".edit-popup").classList.add("hide");

        this.render();
    }
    // done 상태 변경
    setTaskComplete(event) {
        let id = event.target.getAttribute("data-id");
        // map을 돌면서 item.id 와 id가 같다면 item['done']을 true로 변경
        mockData = mockData.map((item) => {
            if (item.id === id) {
                item["done"] = true;
            }
            // 그게 아니면 item 리턴
            return item;
        });

        this.render();
    }
}

export default Todo;
