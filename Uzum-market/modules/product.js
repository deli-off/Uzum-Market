import { getData } from "/modules/HTTP.request";
import { heart, basketCount, addCommas, savedCount } from "./function.js";

let savedsBasket = JSON.parse(localStorage.getItem('savedsBasket')) || [];
let saveds = JSON.parse(localStorage.getItem('saveds')) || [];

let img = document.querySelector('.product-image__bigger');
let probuct = JSON.parse(localStorage.getItem('probuct')) || [];
let w = img.getBoundingClientRect().width;
img.style.height = w + 50 + 'px';
getData("/goods")
   .then(res => pageReload(res.filter(item => item.id === +probuct[0])))
basketCount(savedsBasket);
savedCount(saveds)
function pageReload(arr) {
   for (let item of arr) {
      let title = document.querySelector('.product-info__title h2')
      let scrollImages = document.querySelector('.product-image__scroll')
      let biggerImg = document.querySelector('.product-image__bigger img')
      let sale_price = document.querySelector('.sale-price')
      let originalPrice = document.querySelector('.original-price')
      let description = document.querySelector('.product-predesc p')
      let minusBtn = document.querySelector('.minus-btn')
      let plusBtn = document.querySelector('.plus-btn')
      let countSpan = document.querySelector('.span')
      let basketBtn = document.querySelector('.korzina')
      let savedBtn = document.querySelector('.saved');
      let org_img = document.querySelector('.org-img');
      let swiper = document.querySelector('.swiper');
      if (saveds.includes(`${item.id}`)) {
         savedBtn.setAttribute('disabled', '');
      }
      if (!saveds.includes(`${item.id}`)) {
         savedBtn.onclick = () => {
            saveds.push(`${item.id}`);
            localStorage.setItem("saveds", JSON.stringify(saveds))
            savedBtn.setAttribute('disabled', '');
            savedCount(saveds)
         }
      }
      if (savedsBasket.includes(`${item.id}`)) {
         basketBtn.setAttribute('disabled', '');
      }
      if (!savedsBasket.includes(`${item.id}`)) {
         basketBtn.onclick = () => {
            savedsBasket.push(`${item.id}`);
            localStorage.setItem("savedsBasket", JSON.stringify(savedsBasket))
            basketBtn.setAttribute('disabled', '');
            basketCount(savedsBasket);
         }
      }


      let salePrice = 0
      let n = 1
      if (item.salePercentage > 0) {
         salePrice = item.price - Math.floor((item.price / 100) * item.salePercentage)
      } else {
         salePrice = item.price
      }
      title.innerHTML = item.title
      biggerImg.src = item.media[0]
      let imgArr = scrollImages.querySelectorAll('img');
      imgArr.forEach(img => {
         img.src = item.media[0]
      })
      if (item.media.length === 1) {
         swiper.style.display = 'none'
      } else {
         org_img.style.display = 'none';
         let wrapper = document.querySelector('.swiper-wrapper');
         for (let media of item.media) {
            let slide = document.createElement('div');
            slide.classList.add('swiper-slide');
            wrapper.append(slide)
         }
         let slides = document.querySelectorAll('.product-image__bigger .swiper-slide');
         for (let item_img = 0; item_img < item.media.length; item_img++) {
            for (let slide = 0; slide < slides.length; slide++) {
               let img = document.createElement('img');
               img.src = item.media[item_img];
               img.height = 550;
               img.width = 506;
               img.alt = 'tide';
               if (item_img === slide) {
                  slides[slide].append(img);
               }
            }
         }
         let swiper = new Swiper('.product-swiper', {
            navigation: {
               nextEl: '.swiper-button-next',
               prevEl: '.swiper-button-prev',
            },
            loop: true,
         })
      }
      sale_price.innerHTML = addCommas(salePrice) + ' сум'
      originalPrice.innerHTML = addCommas(item.price) + ' сум'
      description.innerHTML = item.description
      plusBtn.onclick = () => {
         n++
         countSpan.innerHTML = n
         sale_price.innerHTML = salePrice * n + ' сум'
      }
      minusBtn.onclick = () => {
         if (n > 1) {
            n--
            countSpan.innerHTML = n
            sale_price.innerHTML = salePrice * n + ' сум'
         }
      }
   }
}



