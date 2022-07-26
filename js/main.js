const defaultUrl = `https://s1.baozimh.com/scomic/yushenyitongshengji-ohyeonbain/0/46-cd2o/1.jpg`;
const url = document.getElementById("url");
let idCounter = 0;

window.onload = function () {
  url.value = defaultUrl;
  openNav();
};

function main() {
  const imgNumber = document.getElementById("imgNumber").value;
  createLoop(imgNumber);
}

function errorHandle() {
  alert("輸入網址不符合格式");
}

function createLoop(max) {
  let address = url.value;
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

  // gen imgs
  let page = 1;
  address = newAddress;
  for (let i = 0; i < max; i++) {
    const node = document.createElement("img");
    node.src = address + `${page}.${imgType}`;
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
    return null;
  }
}

// Sidebar
function hideImg(id) {
  document.getElementById(id).style = "display:none";
}

function showImg(id) {
  document.getElementById(id).style = "display:block";
}
