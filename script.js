'use strict';

window.addEventListener('load', initPage);
let errorMsg = document.querySelector('#errorMsg');
let registerRef = document.querySelector('#registerForm');
let contentRef = document.querySelector('#contentContainer');
let loginRef = document.querySelector('#loginForm');
document.querySelector('#btnLoggaUt').addEventListener('click', logOut);

function initPage() {
registerRef.classList.add('d-none');
contentRef.classList.add('d-none');
loginRef.classList.remove('d-none');
document.querySelector('#btnLoggaIn').addEventListener('click', validateLogin);
document.querySelector('#btnRegistrera').addEventListener('click', changeToRegister);
}

function validateLogin(event) {
event.preventDefault();
    try {
        let username = document.querySelector('#username');
        let password = document.querySelector('#password');

        if (!users.some(user => user.username === username.value && user.password === password.value)) {
            throw {
                'msg': 'Du har angett fel användarnamn eller lösenord'
            }
        } else {
            errorMsg.innerHTML = '';
            console.log('Du har rätt användarnamn och lösenord');
            initContent();
        }
    } catch(error) {
        console.log(error);
        errorMsg.innerHTML = error.msg;
    }
}

function changeToRegister(event) {
event.preventDefault();
errorMsg.innerHTML = '';
loginRef.classList.add('d-none');
registerRef.classList.remove('d-none');
document.querySelector('#newUserLogin').addEventListener('click', validateRegistration);
}

function validateRegistration(event) {
event.preventDefault();
try {
    let newUsername = document.querySelector('#uName');
    let newPassword = document.querySelector('#pWord');
    let newPasswordAgain = document.querySelector('#pWordAgain');
    let passwordRegex = /^(?=.*[a-ö])(?=.*[A-Ö])(?=.*\d)[a-öA-Ö\d]{8,}$/;

    if(users.some(user => user.username === newUsername.value)){
        throw {
            'msg': 'Användarnamnet finns redan',
        }

    } else if(newUsername.value.length < 6) {
        throw {
            'msg': 'Användarnamnet måste vara minst 6 tecken',
        }
    } else {
        console.log('Snyggt. Du har ett unikt användarnamn');
        if(newPassword.value === newPasswordAgain.value) {
            console.log('Dina lösenord matchar');
            if(newPassword.value.length < 8){
                throw {
                    'msg': 'Lösenordet måste vara minst 8 tecken',
                } 
            } else {
                console.log('Ditt lösenord är tillräckligt långt');
                if(!passwordRegex.test(newPassword.value)){
                    throw {
                        'msg': 'Lösenordet måste innehålla minst en stor bokstav, en liten bokstav och ett nummer',
                    }
                } else {
                    console.log('Snyggt! Ditt lösenord uppfyller alla vilkor');
                    users.push({
                        username: newUsername.value,
                        password: newPassword.value
                    });
                    console.log(users);
                    initContent();
                    //12345678öÄ
                }
            }
        } else {
            throw {
                'msg': 'Lösenorden matchar inte',
            }
        }
    }
} catch(error) {
    console.log(error);
    errorMsg.innerHTML = error.msg;
}
}

function initContent(event) {
    contentRef.classList.remove('d-none');
    registerRef.classList.add('d-none');
    console.log('Du har lyckats logga in');
    loginRef.classList.add('d-none');
}

function logOut() {
    initPage()
}