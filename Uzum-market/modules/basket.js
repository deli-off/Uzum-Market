import { getData } from "/modules/HTTP.request";
import { basketCount, addCommas, savedCount } from "./function.js";
let voidLike = document.querySelector('.void-basket');
let menu = document.querySelector('.visidel');
let savedsBasket = JSON.parse(localStorage.getItem('savedsBasket')) || [];
let saveds = JSON.parse(localStorage.getItem('saveds')) || [];
let sevedsNumder = {};
basketCount(savedsBasket);
savedCount(saveds);

if (voidLike !== null) {
   if (!savedsBasket.length > 0) {
      menu.style.display = 'none';
      voidLike.style.display = 'flex';
   } else {
      menu.style.display = 'flex';
      voidLike.style.display = 'none';
   }
}

getData("/goods")
   .then(res => reload(savedsBasket, res))

function reload(arr, data) {
   let place = document.querySelector('.saveds-basket-wrapper');
   place.innerHTML = ''
   for (let item of data) {
      for (let id of arr) {
         if (item.id === +id) {
            let salePrice = 0;
            if (item.salePercentage > 0) {
               salePrice = item.price - Math.floor((item.price / 100) * item.salePercentage);
            } else {
               salePrice = item.price
            }
            place.innerHTML += `<div class="popular-section__wrapper-item item" id="${item.id}">
            <img src="${item.media[0]}" alt="${item.type}" width="143px " height="187px" class="img">
      <div class="item-info info">
         <h3>${item.title}</h3>
         <span class="sale-price text" data-price=${item.price}>${salePrice + ' сум'}</span>
         <div class="basket-counter">
            <button class="minus">-</button>
            <span class="span">1</span>
            <button class="plus">+</button>
         </div>
         <button class="item-del">
            Удалить
         </button>
      </div>
   </div>`
         }
      }
   }
   let products = document.querySelectorAll('.popular-section__wrapper-item');
   if (!savedsBasket.length > 0) {
      place.style.display = 'none';
      menu.style.display = 'none';
      voidLike.style.display = 'flex';
   } else {
      place.style.display = 'flex';
      menu.style.display = 'flex';
      voidLike.style.display = 'none';
   }
   products.forEach(item => {
      let n = 1;
      sevedsNumder[item.id] = n;
      totalSale(sevedsNumder)
      let place = document.querySelector('.saveds-basket-wrapper');
      let info = item.querySelector('.info');
      let h = info.querySelector('h3');
      let basketCount_one = info.querySelector('.basket-counter');
      let del = info.querySelector('.item-del');
      let price = info.querySelector('.text');
      let minus = item.querySelector('.minus');
      let plus = item.querySelector('.plus');
      let span = item.querySelector('.span');
      if (!savedsBasket.length > 0) {
         place.style.display = 'none'
      } else {
         place.style.display = 'flex'
      }
      let money = price.innerHTML.split(' ').at(0);
      money = +money;
      item.addEventListener('click', function (e) {
         if (e.target !== info && e.target !== h && e.target !== basketCount_one && e.target !== del && e.target !== price && e.target !== minus && e.target !== plus && e.target !== span) {
            location.assign('/pages/product.html?id=' + item.id)
         }
      });
      minus.onclick = () => {
         if (n > 1) {
            n--;
            sevedsNumder[item.id] = n;
            span.innerHTML = n;
            price.innerHTML = money * n + ' сум';
            totalSale(sevedsNumder);
         }
      }
      plus.onclick = () => {
         n++;
         sevedsNumder[item.id] = n;
         span.innerHTML = n;
         price.innerHTML = money * n + ' сум';
         totalSale(sevedsNumder);
      }
      del.onclick = () => {
         savedsBasket = savedsBasket.filter(id => id !== item.id);
         localStorage.setItem("savedsBasket", JSON.stringify(savedsBasket));
         item.remove();
         if (!savedsBasket.length > 0) {
            place.style.display = 'none';
            menu.style.display = 'none';
            voidLike.style.display = 'flex';
         } else {
            place.style.display = 'flex';
            menu.style.display = 'flex';
            voidLike.style.display = 'none';
         }
         basketCount(savedsBasket);
         delete sevedsNumder[item.id];
         totalSale(sevedsNumder);
      }
   })
}
function priceMoney(total, price_total) {
   let menu = document.querySelector('.visidel');
   let menu_texts = menu.querySelectorAll('.visidel__text');
   let menu_title = menu.querySelector('.visidel__price');
   let totalOne = 0;
   for (let key in sevedsNumder) {
      let index = sevedsNumder[key];
      totalOne += index;
   }
   menu_texts.forEach(text => {
      if (+text.getAttribute('data-index') === 1) {
         text.innerHTML = `Итого товаров: ${totalOne} шт.`;
      } else {
         text.innerHTML = `Итого скидки: ${addCommas(total)} сум`;
      }
   });
   menu_title.innerHTML = `${addCommas(price_total)} сум`;
   totalOne = 0;
}
function totalSale(saveds) {
   let price_total = 0;
   let sum = 0;
   let products = document.querySelectorAll('.popular-section__wrapper-item');
   products.forEach(el => {
      let info = el.querySelector('.info');
      let price = info.querySelector('.text');
      let money = price.innerHTML.split(' ').at(0);
      let reallyMoney = price.getAttribute('data-price');
      reallyMoney = +reallyMoney;
      money = +money;
      sum += reallyMoney * saveds[el.id] - money;
      price_total += money;
   })
   priceMoney(sum, price_total)
   sum = 0;
   price_total = 0;
}
