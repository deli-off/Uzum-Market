import { getData } from "/modules/HTTP.request";
import { basketCount, heart, savedCount, addCommas } from "./function.js";
let voidLike = document.querySelector('.void');
let saveds = JSON.parse(localStorage.getItem('saveds')) || [];
let savedsBasket = JSON.parse(localStorage.getItem('savedsBasket')) || [];
basketCount(savedsBasket)
savedCount(saveds)
if (voidLike !== null) {

   if (saveds.length === 0) {
      voidLike.style.display = 'flex'
   } else {
      voidLike.style.display = 'none'
   }
}

getData("/goods")
   .then(res => reload(saveds, res))



function reload(arr, data) {
   let place = document.querySelector('.saveds-wrapper')
   for (let item of data) {
      for (let id of arr) {
         if (item.id === +id) {
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

   heart(true);
}

