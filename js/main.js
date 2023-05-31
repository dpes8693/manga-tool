const randNumber = Math.random()
const defaultUrl = randNumber >= 0.5 ?
  `https://s1.baozimh.com/scomic/yushenyitongshengji-ohyeonbain/0/46-cd2o/1.jpg`
  : `https://w3wc.godamanga.online/scomic/chengweitafangyouxilidebaojun-ryumohajunggyong/0/11-lqa1/1.jpg`;

// url
const url = document.getElementById("url");
let address = loadStorage("url") || defaultUrl;

// imgNumber
const imgNumber = document.getElementById("imgNumber");
const loadImgNumber = loadStorage("imgNumber") || 240;

let idCounter = 0;

window.onload = function () {
  url.value = address;
  imgNumber.value = loadImgNumber;
  openNav();

  const mainContent = document.getElementById("mainContent");
  mainContent.onclick = () => {
    closeNav();
  };
  document.onkeydown = function (e) {
    keyEvent(e);
  };
  function keyEvent(e) {
    var keyNum = window.event ? e.keyCode : e.which;
    if (keyNum == 78) {
      openNav();
    }
  }
};

function main() {
  saveStorage("url", url.value);
  saveStorage("imgNumber", imgNumber.value);
  createLoop(imgNumber.value);
}

function errorHandle() {
  alert("輸入網址為不渲染圖片格式");
}

function createLoop(max) {
  address = url.value;
  console.log(address)

  // if (!address.includes("baozimh")) {
  //   alert("僅支援baozimh");
  //   return;
  // }
  const { imgType, newAddress } = getUrlType(address);

  // check
  if (!imgType || !checkUrl(address)) {
    errorHandle();
    return;
  }

  idCounter++;
  // gen wrapper
  const wrapper = document.createElement("div");
  wrapper.id = `imgs-` + idCounter;
  document.getElementById("imgContainer").appendChild(wrapper);

  // gen li
  const newLi = `<li>
  <a href="#${wrapper.id}">${wrapper.id}</a>
  <button onclick="hideImg('${wrapper.id}')">隱藏</button>
  <button onclick="showImg('${wrapper.id}')">顯示</button>
</li>`;
  document.getElementById("controlList").innerHTML += newLi;
  const maxWidth = window.innerWidth;
  const stylesheet = document.styleSheets[0];

  // gen imgs
  let page = 1;
  address = newAddress;
  for (let i = 0; i < max; i++) {
    const node = document.createElement("img");
    node.src = address + `${page}.${imgType}`;

    stylesheet.insertRule(
      `.imgs {   
      display: flex;
      max-width: ${maxWidth}px;}`,
      0
    );
    node.className = "imgs";

    document.getElementById(wrapper.id).appendChild(node);
    page++;
  }

  // end
  url.value = "";
}

function checkUrl(s) {
  const regex = /^(http|https):\/\//i;
  const result = s.match(regex);
  if (result) {
    return true;
  } else {
    return false;
  }
}

function getUrlType(url) {
  if (typeof url !== "string") return null;
  const regex = /(\/\d+.jpg)|(\/\d+.png)/i;
  const result = url.match(regex);
  if (result) {
    const newAddress = url.replace(result[0], "/");
    const imgType = result[0].split(".")[1]; // 1.jpg
    return { imgType, newAddress };
  } else {
    return {};
  }
}

// Sidebar
function hideImg(id) {
  document.getElementById(id).style = "display:none";
}

function showImg(id) {
  document.getElementById(id).style = "display:block";
}

function pasteText() {
  // url.focus();
  (async () => {
    const text = await navigator.clipboard.readText();
    if (text) {
      document.getElementById("url").value = text;
    }
  })();
}

function saveStorage(keyName, value) {
  localStorage.setItem(keyName, value);
}

function loadStorage(keyName) {
  return localStorage.getItem(keyName);
}
