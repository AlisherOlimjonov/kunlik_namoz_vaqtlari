`use strict`; // qatiy rejim yoqish
//fetch dagi url boyicha qiymatni callback function ga ozlashtirib olish
function getFromAPI(url, callback) {
  let obj;
  fetch(url)
    .then((res) => res.json())
    .then((data) => (obj = data))
    .then(() => callback(obj));
}
//Viloyatlar nomi
let regions = [
  "Andijon",
  "Buxoro",
  "Jizzax",
  "Namangan",
  "Navoiy",
  "Samarqand",
  "Toshkent",
];
//tanlab olish funktsiyasi
function $(param) {
  return document.querySelector(param);
}
//elementlarni tanlab olish
let wrapper = $(".wrapper"),
  tanlash = $(".tanlash");
console.log(tanlash);

// Viloyatlar nomini dinamik option yaratin selectga qoshib olish uchun
regions.forEach((item) => {
  let option = document.createElement("option");
  option.innerHTML = item;
  tanlash.appendChild(option);
});

// namoz vaqtlarini ekranga render qilish uchun
function render(array) {
  console.log(array.times);
  let card = document.createElement("div");
  card.setAttribute("class", "card");
  card.innerHTML = `
  <p>${array.date}</p>
    <p>Saharlik :${array.times.tong_saharlik}</p>
    <p>Quyosh :${array.times.quyosh}</p>
    <p>Peshin :${array.times.peshin}</p>
    <p>Asr :${array.times.asr}</p>
    <p>Shom-Iftor :${array.times.shom_iftor}</p>
    <p>Xufton :${array.times.hufton}</p>
    `;
  wrapper.appendChild(card);
}
getFromAPI("https://islomapi.uz/api/present/day?region=Buxoro", render);

tanlash.addEventListener("change", (e) => {
  e.preventDefault();
  console.log(e.target.value);
  fetch(`https://islomapi.uz/api/present/day?region=${e.target.value}`)
    .then((res) => res.json())
    .then((data) => renderKindOf(data));
  function renderKindOf(region_name) {
    let card = document.createElement("div");
    card.setAttribute("class", "card");
    card.innerHTML = `
    <p>${e.target.value}</p>
  <p>${region_name.date}</p>
          <p>Saharlik :${region_name.times.tong_saharlik}</p>
          <p>Quyosh :${region_name.times.quyosh}</p>
          <p>Peshin :${region_name.times.peshin}</p>
          <p>Asr :${region_name.times.asr}</p>
          <p>Shom-Iftor :${region_name.times.shom_iftor}</p>
          <p>Xufton :${region_name.times.hufton}</p>
          `;
    wrapper.innerHTML = null;
    wrapper.appendChild(card);
  }
});
