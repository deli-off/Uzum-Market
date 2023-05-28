import { getData } from "/modules/HTTP.request";
let user = JSON.parse(localStorage.getItem('user'))
let form = document.forms.loginForm
let emailInput = document.querySelector('#email')
let passInput = document.querySelector('#password')
getData("/users")
   .then(res => loginReload(res))

console.log(user);


function loginReload(arr) {
   form.onsubmit = (e) => {
      e.preventDefault()
      for (let item of arr) {
         if (emailInput.value === item.email && passInput.value === item.password) {
            location.assign('../index.html')
            localStorage.setItem('user', JSON.stringify(item))
         }
      }
   }
}