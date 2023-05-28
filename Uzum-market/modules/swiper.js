import { getData } from "/modules/HTTP.request";
import Swiper from 'swiper/bundle';
import 'swiper/css';
let swiperWrapper = document.querySelector('.swiper-wrapper');
console.log(swiperWrapper);


getData("/goods")
   .then(res => swiperReload(res.slice(15, 21)))

function swiperReload(arr) {
   for (let item of arr) {
      swiperWrapper.innerHTML += `<div class="swiper-slide">
                                    <div class="swiper-slide__left">
                                       <h3>${item.title}</h3>
                                       <span>${item.price + ' сум'}</span>
                                       <p>${item.description}</p>
                                    </div>
                                    <div class="swiper-slider__right">
                                       <img src="${item.media[0]}" alt="${item.type}">
                                    </div>
         
                                    </div>`
   }
   let texts = document.querySelectorAll('.swiper-slide__left p');
   text(texts);
   let swiper = new Swiper('.swiper', {
      speed: 500,
      observer: true,
      observeParents: true,
      observeSlideChildren: true,
      navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev',
      },
      spaceBetween: 80,
      autoplay: {
         delay: 2700,
         stopOnLastSlide: true
      },
      pagination: {
         el: '.swiper-pagination',
      },
      loop: true
   })
}

function text(texts) {
   if (window.innerWidth <= 648 && window.innerWidth > 496) {
      texts.forEach(text => {
         text.innerText = text.innerText.slice(0, 100) + '...';
      })
   } else if (window.innerWidth <= 496 && window.innerWidth > 380) {
      texts.forEach(text => {
         text.innerText = text.innerText.slice(0, 70) + '...';
      })
   } else if (window.innerWidth <= 380) {
      texts.forEach(text => {
         text.innerText = text.innerText.slice(0, 45) + '...';
      })
   }
}

