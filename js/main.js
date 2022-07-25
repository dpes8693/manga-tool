const defaultUrl = `https://s1.baozimh.com/scomic/yushenyitongshengji-ohyeonbain/0/46-cd2o/1.jpg`;
const url = document.getElementById("url");
url.value = defaultUrl;
// { id: 1, href: "", isHide: false }
// const imgsObject = [];
let idCounter = 0;

openNav();

function createLoop(max) {
  let page = 1;
  let address = url.value;
  const { imgType, newAddress } = getUrlType(address);
  if (!imgType || !checkUrl(address)) {
    errorHandle();
    return;
  }

  //   imgsObject.push({ id: idCounter, href: address, isHide: false });
  idCounter++;
  // 生成包裝
  const wrapper = document.createElement("div");
  wrapper.id = `imgs-` + idCounter;
  document.getElementById("imgContainer").appendChild(wrapper);

  //   生成 li
  const newLi = `<li>
  <a href="#${wrapper.id}">${wrapper.id}</a>
  <button onclick="hideImg('${wrapper.id}')">隱藏</button>
  <button onclick="showImg('${wrapper.id}')">顯示</button>
</li>`;
  document.getElementById("controlList").innerHTML += newLi;
  address = newAddress;
  for (let i = 0; i < max; i++) {
    const node = document.createElement("img");
    node.src = address + `${page}.${imgType}`;
    node.className = "imgs";
    // 新增
    document.getElementById(wrapper.id).appendChild(node);
    page++;
  }
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

function errorHandle() {
  alert("輸入網址不符合格式");
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
    return null;
  }
}

function main() {
  const imgNumber = document.getElementById("imgNumber").value;
  createLoop(imgNumber);
}

function hideImg(id) {
  document.getElementById(id).style = "display:none";
}

function showImg(id) {
  document.getElementById(id).style = "display:block";
}
