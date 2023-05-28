import { getData } from "/modules/HTTP.request";
let probuct = JSON.parse(localStorage.getItem('probuct')) || [];
let saveds = JSON.parse(localStorage.getItem('saveds')) || [];
let savedsBasket = JSON.parse(localStorage.getItem('savedsBasket')) || [];
let user = JSON.parse(localStorage.getItem('user'));
let headerWrapper = document.querySelector('.header');
if (window.NodeList && !NodeList.prototype.forEach) {
   NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
         callback.call(thisArg, this[i], i, this);
      }
   };
}


export function header() {
   headerWrapper.innerHTML += `
   <div class="header__inner container">
   <div class="header__wrapper">
      <div class="header__logo">
         <h1>
            <a href="/" class="header__img">
               <img src="../assets/icons/haeder-logo.svg" alt="logo">
            </a>
            <a href="/" class="--dis dis-img">
            <img src="../assets/icons/logo__two.svg" alt="logo" >
         </a>
         </h1>
      </div>
      <div class="header__catalog">
         <button type="button">Каталог</button>
      </div>
      <div class="header__search">
         <div class="search-input">
            <div class="search-input-box">
               <input type="text" name="headerSearch" placeholder="Искать товары" class="headerSearch">
               <div class="search-icon">
                  <img src="../assets/icons/search-icon.svg" alt="search">
               </div>
            </div>
            <div class="list"></div>
         </div>
      </div>
      <div class="header__nav">
         <ul>
            <li class='user'>
               <img src="../assets/icons/user-icon.svg" alt="user">
               <a href="#">${user.firstname}</a>
            </li>
            <li>
               <a href="/pages/saved.html">
                  Избранное
                  <span class="count saveds__count">0</span>
               </a>
            </li>
            <li>
               <a href="/pages/basket.html">
                  Корзина
                  <span class="count shop__counter">0</span>
               </a>
            </li>
         </ul>
      </div>
   </div>
   <div class="header__search --dis">
      <div class="search-input">
         <div class="search-input-box">
            <input type="text" name="headerSearch" placeholder="Искать товары" class="headerSearch">
            <div class="search-icon">
               <img src="../assets/icons/search-icon.svg" alt="search">
            </div>
         </div>
         <div class="list"></div>
      </div>
   </div>
</div>
<div class="modal">
<div class="modal__dialog">
   <div class="modal__content">
         <div data-close class="modal__close">&times;</div>
         <div class="modal__title">Хотите выйти?</div>
         <div class="btn-box">
         <form name='endSave'>
         <button class="btn-one btn_dark btn_min true">Да</button>
         </form>
      </div>
   </div>
</div>
</div>`
   let headerInner = document.querySelector('.header__wrapper')
   let haederList = document.querySelector('.header-list')
   let bg = document.querySelector('.body-active')
   let swiper = document.querySelector('.swiper');
   let userOne = document.querySelectorAll('.user');
   let modal = document.querySelector('.modal')
   let closeBtns = document.querySelectorAll('[data-close]')
   userOne.forEach((btn) => {
      btn.onclick = () => {
         modal.classList.add('show', 'fade')
      }
   })
   closeBtns.forEach((btn) => {
      btn.onclick = () => {
         modal.classList.remove('show', 'fade')
      }
   })
   let catalogBtn = document.querySelector('.header__catalog button')
   let lists = document.querySelectorAll('.list')
   let inputs = document.querySelectorAll('.headerSearch')
   let searchInput = document.querySelector('.search-input');

   getData("/goods")
      .then(res => onInput(res))


   function searchReload(arr, val) {
      lists.forEach(list => {
         list.innerHTML = ''
      })
      for (let item of arr) {
         let re = new RegExp(val, "g")
         let title = item.title.toLowerCase().replace(re, `<b style="color:red">${val}</b>`)
         lists.forEach(list => {
            list.innerHTML += `
            <a href="../pages/product.html">
               <div class="search-item" id="${item.id}">
                     <span>${title}</span>
               </div>
            </a>`
            let serchItem = document.querySelectorAll('.search-item')
            serchItem.forEach(el => {
               el.onclick = () => {
                  probuct = [];
                  localStorage.setItem("probuct", JSON.stringify(probuct));
                  probuct.push(el.id)
                  localStorage.setItem("probuct", JSON.stringify(probuct));
               }
            })
         })
      }
   }

   function onInput(arr) {
      inputs.forEach(input => {
         input.oninput = () => {
            let val = input.value.toLowerCase().trim();
            let filtered = arr.filter(item => item.title.toLowerCase().includes(val))
            if (val.length > 0) {
               lists.forEach(list => {
                  list.style.display = 'block';
               })
               bg.classList.add('body-active__block')
               searchReload(filtered, val)
               if (swiper !== null) {
                  swiper.classList.add('swiper-active')
               }
               headerInner.style.alignItems = 'start'

            } else {
               lists.forEach(list => {
                  list.style.display = 'none';
               })
               bg.classList.remove('body-active__block')
               if (swiper !== null) {
                  swiper.classList.remove('swiper-active')
               }
               headerInner.style.alignItems = 'center'
            }
         }
      })
   }
   catalogBtn.onclick = () => {
      location.assign('http://localhost:5173/pages/categories.html')
   }
}
header()