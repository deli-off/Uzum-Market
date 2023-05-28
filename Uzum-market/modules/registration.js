import axios from 'axios'
let form = document.forms.registrationForm;

form.onsubmit = (e) => {
   e.preventDefault();
   let user = {};
   let fm = new FormData(e.target);
   fm.forEach((value, key) => {
      user[key] = value;
   });
   user.saveds = [];
   user.basket = [];
   if (user.firstname && user.lastname && user.email && user.password) {
      axios.post('http://localhost:3000/users', user)
         .then(res => {
            if (res.status === 200 || res.status === 201) {
               localStorage.setItem('user', JSON.stringify(user))
               window.location.assign("/pages/login.html");
            }
         })
   } else {
      alert("Заполните все поля");
   }
};
