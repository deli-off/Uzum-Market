import { getData } from "/modules/HTTP.request";
import { basketCount, heart, addCommas, savedCount, cardReload } from "./function.js";
let cardConrtainer = document.querySelector('.popular-section__wrapper');
let popular_section = document.querySelector('.popular-section');
let savedsBasket = JSON.parse(localStorage.getItem('savedsBasket')) || [];
let saveds = JSON.parse(localStorage.getItem('saveds')) || [];

getData("/goods")
   .then(res => cardReload(res.slice(15, 30), false, cardConrtainer))

basketCount(savedsBasket);
savedCount(saveds)





getData("/goods")
   .then(res => sectionReload(res))


function sectionReload(arr) {
   let wrapper = document.querySelectorAll('.wr');
   wrapper.forEach(el => {
      el.innerHTML = '';
      for (let item of arr) {
         if (el.getAttribute('data-type') === item.type) {
            let salePrice = 0;
            let b = false;
            if (item.salePercentage > 0) {
               salePrice = item.price - Math.floor((item.price / 100) * item.salePercentage)
            } else {
               salePrice = item.price;
               b = true;
            }
            el.innerHTML += `<div class="popular-section__wrapper-item" id="${item.id}">
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
               <img src="./assets/icons/heart-icon.svg" alt="heart" class="heart">
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
                        <img src="./assets/icons/korzina.svg" alt="korzina">
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
   })
   heart(false);
}

let lengthBtn = document.createElement('button')
lengthBtn.classList.add('btn-reload')
lengthBtn.innerHTML = 'Показать все'
popular_section.append(lengthBtn)

lengthBtn.onclick = () => {
   getData("/goods")
      .then(res => cardReload(res, true, cardConrtainer))
}