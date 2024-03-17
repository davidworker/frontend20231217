import { App } from './Firebase/App.js';
import { Auth } from './Firebase/Auth.js';

let app = await App.init();
let auth = new Auth(app);

let regEmail = document.querySelector('#register-email');
let regPassword = document.querySelector('#register-password');
let regBtn = document.querySelector('#register-btn');

regBtn.addEventListener('click', () => {
    let email = regEmail.value;
    let pwd = regPassword.value;
    doRegister(email, pwd);
})

const doRegister = async (email, pwd) => {
    if (!email || !pwd) {
        alert('信箱密碼未輸入');
        return;
    }

    let user = await auth.register(email, pwd);
    if (user) {
        alert('註冊成功');
    } else {
        alert('註冊失敗');
    }
}