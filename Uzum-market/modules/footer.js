let footerWrapper = document.querySelector('.footer')

export function footer() {
   footerWrapper.innerHTML += `
                       <div class="footer__inner container">
                        <div class="footer__inner-about">
                            <h3>О нас</h3>
                            <a href="https://uzum.uz/ru/about/delivery-points">Пункты выдачи</a>
                            <a href="https://uzum.uz/ru/about/careers">Вакансии</a>
                        </div>
                        <div class="footer__inner-about">
                            <h3>Пользователям</h3>
                            <a href="https://uzum.uz/">Связаться с нами</a>
                           <a href="https://uzum.uz/ru/faq">Вопрос-ответ</a>
                        </div>
                        <div class="footer__inner-about">
                           <h3>Для предпринимателей</h3>
                           <a href="https://seller.uzum.uz">Продавайте на Uzum</a>
                           <a href="https://seller.uzum.uz/seller/signin ">Вход для продавцов</a>
                        </div>
                        <div class="footer__inner-app">
                        <div class="skachat">
                        
                            <h3>Скачать приложение</h3>
                            <div class="apps">
                                <a href="https://apps.apple.com/us/app/uzum-market-internet-do-kon/id1640483056">
                                    <img src="../assets/icons/app-store.svg" alt="appstore">
                                </a>
                                <a href="https://play.google.com/store/search?q=uzum+market&c=apps">
                                    <img src="../assets/icons/playmarket.svg" alt="playmarket">
                                </a>
                                </div>
                            </div>
                            <div class="socials">
                                <h3>Uzum в соцсетях</h3>
                                <div class="socials-wrapper">
                                    <a href="https://instagram.com/uzum.market?igshid=YmMyMTA2M2Y=">
                                        <img src="../assets/icons/instagram.svg" alt="instagram">
                                    </a>
                                    <a href="https://t.me/uzum_market">
                                        <img src="../assets/icons/telegram.svg" alt="telegram">
                                    </a>
                                    <a href="https://youtube.com/@uzum_na_easy">
                                        <img src="../assets/icons/youtube.svg" alt="youtube">
                                    </a>
                                    <a href="https://m.facebook.com/UzumUzbekistan/">
                                        <img src="../assets/icons/facebook.svg" alt="facebook">
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="footer__confid ">
                        <hr>
                        <div class="footer__confid-inner container">
                            <div class="user-confid">
                                <a href="https://legal.uzum.uz/privacy-policy.html">
                                    Соглашение о конфиденциальности
                                </a>
                                <a href="https://legal.uzum.uz/user-agreement-ru.html">Пользовательское соглашение</a>
                            </div>
                            <div class="code-confid">
                                <span>«2023© ИП ООО «UZUM MARKET». ИНН 309376127. Все права защищены»</span>
                            </div>
                        </div>
                    </div>
`
}

footer()