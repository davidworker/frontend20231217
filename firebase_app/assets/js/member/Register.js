let auth = '';
let regEmail = '';
let regPassword = '';
let regBtn = '';

class Register {
    constructor(firebaseAuth) {
        auth = firebaseAuth;
        regEmail = document.querySelector('#register-email');
        regPassword = document.querySelector('#register-password');
        regBtn = document.querySelector('#register-btn');
        regBtn.addEventListener('click', () => {
            let email = regEmail.value;
            let pwd = regPassword.value;
            this.doRegister(email, pwd);
        })
    }

    doRegister = async (email, pwd) => {
        if (!email || !pwd) {
            Swal.fire({
                title: '註冊錯誤',
                html: '信箱密碼未輸入',
                icon: 'error'
            })
            return;
        }

        let user = await auth.register(email, pwd);
        if (user) {
            await Swal.fire({
                title: '註冊成功',
                html: `登入信箱:${user.email}`,
                icon: 'success'
            })
        } else {
            Swal.fire({
                title: '註冊失敗',
                html: '請確認信箱是否已註冊',
                icon: 'error'
            })
        }
    }
}

export { Register }