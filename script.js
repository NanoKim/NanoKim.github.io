// 섹션 탭메뉴
let tabList = document.querySelectorAll(".gnb .btn");

Array.prototype.forEach.call(tabList, function (list) {
  list.children[0].addEventListener("click", function (e) {
    e.preventDefault();

    let tabSection = document.querySelectorAll(".wrapper .content");
    let tabNumber = this.parentElement.getAttribute("data-tabnum");

    Array.prototype.forEach.call(tabSection, function (cont, i) {
      cont.style.display = "none";
      tabList[i].className = "btn";
    });

    tabSection[tabNumber].style.display = "block";

    if (list.className.indexOf("on") == -1) {
      list.className = "btn on";
    }
  });
});

//텍스트 슬라이드
let textSlide = 0;
carousel();

function carousel() {
  let i;
  const text = document.getElementsByClassName("slide-txt");
  for (i = 0; i < text.length; i++) {
    text[i].style.display = "none";
  }
  textSlide++;
  if (textSlide > text.length) {
    textSlide = 1;
  }
  text[textSlide - 1].style.display = "block";
  setTimeout(carousel, 3000);
}

//프로젝트 모달창
const openClick = document.getElementById("modal");
const modal = document.querySelector(".modalContainer");
const overlay = modal.querySelector(".modal_overlay");
const closeBtn = modal.querySelector("button");

const openModal = () => {
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  modal.classList.add("hidden");
  document.body.style.overflow = "visible";
};

overlay.addEventListener("click", closeModal);
closeBtn.addEventListener("click", closeModal);
openClick.addEventListener("click", openModal);