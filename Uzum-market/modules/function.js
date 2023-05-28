import { getData } from "/modules/HTTP.request";
import axios from 'axios';

let saveds = JSON.parse(localStorage.getItem('saveds')) || [];
let savedsBasket = JSON.parse(localStorage.getItem('savedsBasket')) || [];
let probuct = JSON.parse(localStorage.getItem('probuct')) || [];
let user = JSON.parse(localStorage.getItem('user'));
let usuingINfo = JSON.parse(localStorage.getItem('usuingINfo')) || false;
if (!usuingINfo) {
   login(user);
   usuingINfo = true;
   localStorage.setItem("usuingINfo", JSON.stringify(usuingINfo));
}
function login(user) {
   saveds = user.saveds;
   savedsBasket = user.basket;
   localStorage.setItem("saveds", JSON.stringify(saveds));
   localStorage.setItem("savedsBasket", JSON.stringify(savedsBasket));
}
savedCount(saveds);
basketCount(savedsBasket);
export function basketCount(arr) {
   let basketsCount = document.querySelector('.shop__counter');
   basketsCount.innerHTML = arr.length;
}
export function savedCount(arr) {
   let saveds_Count = document.querySelector('.saveds__count');
   saveds_Count.innerHTML = arr.length;
}
export function repeatHeart(arr) {
   let products = document.querySelectorAll('.popular-section__wrapper-item');
   products.forEach(el => {
      let heart = el.querySelector('.heart')
      if (arr.includes(el.id)) {
         heart.src = '../assets/icons/heart-active-icon.svg';
      } else {
         heart.src = '../assets/icons/heart-icon.svg'
      }
      savedCount(arr)
   });
}
export function repeatBasket(arr) {
   let products = document.querySelectorAll('.popular-section__wrapper-item');
   products.forEach(el => {
      let baskets = el.querySelector('.item__shop img');
      if (arr.includes(el.id)) {
         baskets.style.background = 'grey'
      } else {
         baskets.style.background = '#fff'
      }
      basketCount(arr)
   });
}
export function heart(b) {
   let products = document.querySelectorAll('.popular-section__wrapper-item');
   products.forEach(item => {
      let heart = item.querySelector('.heart');
      let baskets = item.querySelector('.item__shop img');
      item.addEventListener('click', function (e) {
         if (e.target !== heart && e.target !== baskets) {
            probuct = [];
            probuct.push(item.id);
            localStorage.setItem("probuct", JSON.stringify(probuct));
            location.assign('/pages/product.html');
         }
      });
      if (!savedsBasket.includes(item.id)) {
         baskets.style.background = '#fff'
      } else {
         baskets.style.background = 'grey'
      }
      if (!saveds.includes(item.id)) {
         heart.src = '../assets/icons/heart-icon.svg';
      } else {
         heart.src = '../assets/icons/heart-active-icon.svg'
      }
      heart.onclick = () => {
         if (!saveds.includes(item.id)) {
            saveds.push(item.id);
            localStorage.setItem("saveds", JSON.stringify(saveds));
         } else {
            saveds = saveds.filter(elem => elem !== item.id)
            localStorage.setItem("saveds", JSON.stringify(saveds));
            if (b) {
               item.remove();
               savedCount(saveds);
               let voidLike = document.querySelector('.void');
               if (saveds.length === 0) {
                  voidLike.style.display = 'flex'
               } else {
                  voidLike.style.display = 'none'
               }
            }
         }
         repeatHeart(saveds)
      }
      baskets.onclick = () => {
         if (!savedsBasket.includes(item.id)) {
            savedsBasket.push(item.id);
            localStorage.setItem("savedsBasket", JSON.stringify(savedsBasket));
         } else {
            savedsBasket = savedsBasket.filter(elem => elem !== item.id);
            localStorage.setItem("savedsBasket", JSON.stringify(savedsBasket));
         }
         repeatBasket(savedsBasket)
      }
   });
}
export function addCommas(nStr) {
   nStr += '';
   var x = nStr.split('.');
   var x1 = x[0];
   var x2 = x.length > 1 ? '.' + x[1] : '';
   var rgx = /(\d+)(\d{3})/;
   while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
   }
   return x1 + x2;
}
export function cardReload(arr, boolian, place) {
   place.innerHTML = ''
   for (let item of arr) {
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
      if (boolian) {
         heart(false);
      }
   }
}
let end = document.forms.endSave;
end.onsubmit = (e) => {
   e.preventDefault();
   fetch('http://localhost:3000/users/' + user.id, {
      method: 'put',
      body: JSON.stringify({
         "firstname": user.firstname,
         "lastname": user.lastname,
         "email": user.email,
         "password": user.password,
         "saveds": saveds,
         "basket": savedsBasket
      }),
      headers: {
         "Content-type": "application/json; charset=UTF-8"
      }
   }).then(res => {
      localStorage.clear();
      location.assign('../pages/login.html');
   })
}