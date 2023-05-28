import { getData } from "/modules/HTTP.request";
import { cardReload, addCommas, heart } from "./function.js";
import axios from "axios";
let plece = document.querySelector('.categories__collection');
let map = {
   "Популярное": "popular",
   "Новые": "news"
}
document.querySelectorAll('.dropdown').forEach(function (dropDownWrapper) {
   const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
   const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
   const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
   const dropDownInput = dropDownWrapper.querySelector('.dropdown__input-hidden');
   dropDownInput.value = map[dropDownBtn.innerText];
   if (dropDownInput.value === 'popular') {
      getData("/goods")
         .then(res => cardReload(res.slice(0, 25), true, plece))
   } else if (dropDownInput.value === 'news') {
      getData("/goods")
         .then(res => cardReload(res.slice(25, 50), true, plece))
   }
   // Клик по кнопке. Открыть/Закрыть select
   dropDownBtn.addEventListener('click', function (e) {
      dropDownList.classList.toggle('dropdown__list--visible');
      this.classList.add('dropdown__button--active');
   });

   // Выбор элемента списка. Запомнить выбранное значение. Закрыть дропдаун
   dropDownListItems.forEach(function (listItem) {
      listItem.addEventListener('click', function (e) {
         e.stopPropagation();
         dropDownBtn.innerText = this.innerText;
         dropDownBtn.focus();
         dropDownInput.value = this.dataset.value;
         if (dropDownInput.value === 'popular') {
            getData("/goods")
               .then(res => cardReload(res.slice(0, 25), true, plece))
         } else if (dropDownInput.value === 'news') {
            getData("/goods")
               .then(res => cardReload(res.slice(25, 50), true, plece))
         }
         dropDownList.classList.remove('dropdown__list--visible');
      });
   });

   // Клик снаружи дропдауна. Закрыть дропдаун
   document.addEventListener('click', function (e) {
      if (e.target !== dropDownBtn) {
         dropDownBtn.classList.remove('dropdown__button--active');
         dropDownList.classList.remove('dropdown__list--visible');
      }
   });

   // Нажатие на Tab или Escape. Закрыть дропдаун
   document.addEventListener('keydown', function (e) {
      if (e.key === 'Tab' || e.key === 'Escape') {
         dropDownBtn.classList.remove('dropdown__button--active');
         dropDownList.classList.remove('dropdown__list--visible');
      }
   });
});
let from = document.querySelector('[data-from]');
let to = document.querySelector('[data-to]');
let inputs = document.querySelectorAll('.price-fl__input');
inputs.forEach(input => {
   input.oninput = () => {
      let min = +from.getAttribute('data-from');
      let max = +to.getAttribute('data-to');
      if (from.value !== '') {
         min = from.value;
      }
      if (to.value !== '') {
         max = to.value;
      }
      getData("/goods")
         .then(res => spawnProduct(res, min, max))
   }
})
function spawnProduct(arr, min, max) {
   let clone = arr.filter(item => {
      let salePrice = 0;
      if (item.salePercentage > 0) {
         salePrice = item.price - Math.floor((item.price / 100) * item.salePercentage)
      } else {
         salePrice = item.price
      }
      return salePrice >= min && salePrice <= max;
   });
   cardReload(clone, true, plece)
}
let all = document.querySelector('.left-block__coll-title');
all.onclick = () => {
   getData("/goods")
      .then(res => cardReload(res, true, plece))
}
let allA = document.querySelectorAll('.left-block__ul  a');
allA.forEach(a => {
   a.onclick = () => {
      let type = a.getAttribute('data-type');
      getData("/goods")
         .then(res => sectionReload(res, type, true))
   }
})

function sectionReload(arr, type, b) {
   let place = document.querySelector('.categories__collection');
   place.innerHTML = '';
   for (let item of arr) {
      if (b) {
         if (type === item.type) {
            let salePrice = 0;
            let b = false;
            if (item.salePercentage > 0) {
               salePrice = item.price - Math.floor((item.price / 100) * item.salePercentage)
            } else {
               salePrice = item.price;
               b = true;
            }
            place.innerHTML += `<div class="popular-section__wrapper-item" id="${item.id}">
            <div class="item-img">
               <div class="img">
                  <img
                        src="${item.media[0]}"
                        alt="${item.type}"
                        width="230px"
                        height="300px"
                        class="img"
                  >
               </div>
               <img src="../assets/icons/heart-icon.svg" alt="heart" class="heart">
               <div class="sale">
                  Скидка
               </div>
            </div>
            <div class="item-info">
               <h3>${item.title}</h3>
               <div class="item__preview">
                  <div class="item__price">
                        <span class="original-price">${addCommas(item.price) + ' сум'}</span>
                        <span class="sale-price">${addCommas(salePrice) + ' сум'}</span>
               </div>
                  <div class="item__shop">
                        <img src="../assets/icons/korzina.svg" alt="korzina">
                  </div>
               </div>
            </div>
            </div>`
            if (b) {

               let items = document.querySelectorAll('.popular-section__wrapper-item');

               items.forEach(q => {
                  if (+q.id === item.id) {
                     let span = q.querySelector('.original-price');
                     let sale = q.querySelector('.sale');
                     if (sale !== null) {
                        sale.remove();
                     }
                     if (span !== null) {
                        span.remove();
                     }
                  }
               })
            }
         }
      } else {
         for (let t of type) {
            if (t === item.brand) {
               let salePrice = 0;
               let b = false;
               if (item.salePercentage > 0) {
                  salePrice = item.price - Math.floor((item.price / 100) * item.salePercentage)
               } else {
                  salePrice = item.price;
                  b = true;
               }
               place.innerHTML += `<div class="popular-section__wrapper-item" id="${item.id}">
            <div class="item-img">
               <div class="img">
                  <img
                        src="${item.media[0]}"
                        alt="${item.type}"
                        width="230px"
                        height="300px"
                        class="img"
                  >
               </div>
               <img src="../assets/icons/heart-icon.svg" alt="heart" class="heart">
               <div class="sale">
                  Скиндка
               </div>
            </div>
            <div class="item-info">
               <h3>${item.title}</h3>
               <div class="item__preview">
                  <div class="item__price">
                        <span class="original-price">${addCommas(item.price) + ' сум'}</span>
                        <span class="sale-price">${addCommas(salePrice) + ' сум'}</span>
               </div>
                  <div class="item__shop">
                        <img src="../assets/icons/korzina.svg" alt="korzina">
                  </div>
               </div>
            </div>
            </div>`
               if (b) {

                  let items = document.querySelectorAll('.popular-section__wrapper-item');

                  items.forEach(q => {
                     if (+q.id === item.id) {
                        let span = q.querySelector('.original-price');
                        let sale = q.querySelector('.sale');
                        if (sale !== null) {
                           sale.remove();
                        }
                        if (span !== null) {
                           span.remove();
                        }
                     }
                  })
               }
            }
         }
      }
   }
   heart(false);
}

let lies = document.querySelectorAll('.brend__ul li');
let inputSaveds = [];
lies.forEach(li => [
   li.onclick = () => {
      inputSaveds = [];
      lies.forEach(el => {
         let input = el.querySelector('input');
         if (input.checked === true) {
            inputSaveds.push(input.getAttribute('data-type'))
         }
      })
      if (inputSaveds.length > 0) {
         getData("/goods")
            .then(res => sectionReload(res, inputSaveds, false))
      } else {
         getData("/goods")
            .then(res => cardReload(res, true, plece))
      }
   }
])

let maxBud = document.getElementById("budget");
let minBud = document.getElementById("budget-min");
let rangeValue = maxBud.value;
let valueMin = minBud.value;
let rangeNumber = document.getElementById("max");
let minNumder = document.getElementById('min');
rangeNumber.textContent = rangeValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
minNumder.textContent = valueMin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
maxBud.oninput = () => {
   let rangeValue = maxBud.value;
   let rangeNumber = document.getElementById("max");
   rangeNumber.textContent = rangeValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
minBud.oninput = () => {
   let valueMin = minBud.value;
   let minNumder = document.getElementById('min');
   minNumder.textContent = valueMin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
maxBud.onchange = () => {
   let rangeValue = maxBud.value;
   let valueMin = minBud.value;
   getData("/goods")
      .then(res => spawnProduct(res, valueMin, rangeValue))
}
minBud.onchange = () => {
   let rangeValue = maxBud.value;
   let valueMin = minBud.value;
   getData("/goods")
      .then(res => spawnProduct(res, valueMin, rangeValue))
}