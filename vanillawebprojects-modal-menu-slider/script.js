// dom 가져오기
const toggle = document.getElementById("toggle");
const close = document.getElementById("close");
const open = document.getElementById("open");
const modal = document.getElementById("modal");
const navbar = document.getElementById("navbar");

const navElements = [toggle, navbar];

// 복잡한 조건 수정
function isClickInsideNavElements(target) {
    return navElements.some((el) => el === target || el.contains(target));
}

// 네브바 닫힘 열림
function closeNavbar(e) {
    if (document.body.classList.contains("show-nav") && !isClickInsideNavElements(e.target)) {
        document.body.classList.toggle("show-nav");
        document.body.removeEventListener("click", closeNavbar);
    } else if (!document.body.classList.contains("show-nav")) {
        document.body.removeEventListener("click", closeNavbar);
    }
}

// // 토클 클릭 이벤트
toggle.addEventListener("click", () => {
    document.body.classList.toggle("show-nav");
    document.body.addEventListener("click", closeNavbar);
});

// 모달 열기
open.addEventListener("click", () => modal.classList.add("show-modal"));

// 모달 닫기
close.addEventListener("click", () => modal.classList.remove("show-modal"));

// 모달 외 클릭 시 닫기
window.addEventListener("click", (e) => (e.target == modal ? modal.classList.remove("show-modal") : false));
// ESC 키로 닫기 추가
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        modal.classList.remove("show-modal");
    }
});
