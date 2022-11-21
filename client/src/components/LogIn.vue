<template>
    <div>
       <div class="loginbox" v-if="!loginForm">
            <h1>로그인</h1>
            <transition name="fade" appear="">
            <div v-if="successDiv" class="successDiv">
                등록성공, 로그인
            </div>
            </transition>
            <input type="text" @keyup.enter.prevent="logIn" v-model="login.username" placeholder="아이디">
            <input type="password" @keyup.enter.prevent="logIn" v-model="login.password" placeholder="비밀번호">
            <button @click.prevent="logIn">로그인</button>
            <div class="kayit-ol"><p>넷플릭스에 가입하고싶으세요? <a @click="loginForm = true">지금 가입하세요</a></p></div>
            <div class="kayit-ol-m"><p>기존회원? <br> <a @click="loginForm = false">로그인.</a></p></div>
        </div>
         <div id="kayit" class="loginbox" v-if="loginForm">
            <h1>회원가입</h1>
            <input type="text" v-model="signup.username" placeholder="아이디">
            <input type="password" v-model="signup.password1" placeholder="비밀번호">
            <input type="password" v-model="signup.password2" placeholder="비밀번호 확인">
            <button @click.prevent="signUp">회원 가입</button>
            <div class="kayit-ol"><p>기존회원이신가요?? <a @click="loginForm = false">로그인.</a></p></div>
            <div class="kayit-ol-m"><p>기존회원? <br> <a @click="loginForm = false">로그인.</a></p></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "LogIn",
    data() {
        return {
            login: {
                username: null,
                password: null,
            },
            signup: {
                username: null,
                password1: null,
                password2: null,
                errorMessage: null,
            },
            loginForm: false,
            successDiv : false
        };
    },
    methods: {
        logIn() {
            const username = this.login.username;
            const password = this.login.password;

            const payload = {
                username: username,
                password: password,
            };
            this.$store.dispatch("logIn", payload);
        },
        signUp() {
            const username = this.signup.username;
            const password1 = this.signup.password1;
            const password2 = this.signup.password2;
            if (password1.length < 8){
                this.errorMessage = "비밀번호가 너무 짧습니다."
                alert(this.errorMessage)
            }
            else if (password1 !== password2){
                this.errorMessage = "비밀번호가 일치하지 않습니다."
                alert(this.errorMessage)
            }
            else {
                const payload = {
                    username: username,
                    password1: password1,
                    password2: password2,
                };
                this.$store.dispatch("signUp", payload);
            }
        },
    },
};
</script>

<style scoped>

.kayit-ol-m{
    display: none;
}

.successDiv{
    width: 300px;
    height: auto;
    padding: 10px 0px 10px 0px;
    background: #95f319;
    border-radius: 5px;
    margin-bottom: 10px;
    font-family: FreeSans;
    font-size: 13px;
    text-align: center;
    color:rgb(0, 0, 0)   
}

.errorDiv{
    width: 300px;
    height: auto;
    padding: 10px 0px 10px 0px;
    background: #e87c03;
    border-radius: 5px;
    margin-bottom: 10px;
    font-family: FreeSans;
    font-size: 13px;
    text-align: center;
    color:white
}

#kayit h1{
    margin-right: 190px;
}

.kayit-ol a{
    color: white;
}

.kayit-ol a:hover{
    cursor: pointer;
    text-decoration: underline;
}

.kayit-ol p{
    color: #8c8c8c;
}

.kayit-ol{
    margin-top: 10px;
}

.header img{
    width: 80%;
    margin-top: 22px;
    margin-left: 48px;
}

.frame{
    position: fixed;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.6);
}

.overlay{
    background: url('https://i.ibb.co/ynf52h8/zgeTuV.jpg') no-repeat;
    background-size: cover;
    background-position: center;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.loginbox h1{
    color: white;
    font-size: 29px;
    margin-right: 150px;
    margin-top: 55px;
}

.loginbox button{
    margin-top: 25px;
    width: 300px;
    height: 45px;
    background: #e50914;
    border: 0px;
    outline: 0px;
    color: white;
    font-size: 15px;
    font-weight: 600;
    border-radius: 5px;
}

.loginbox button:hover{
    cursor: pointer;
}

.loginbox input:focus{
   background: #454545;
}

.loginbox input::placeholder{
    color: #8c8c8c;
    font-family: FreeSans;
    font-size: 15px;
}


.loginbox input{
    width: 300px;
    height: 42px;
    background: #333333;
    border: 0px;
    outline: none;
    margin-bottom: 10px;
    border-radius: 5px;
    color: white;
    text-indent:20px;
}


.loginbox{
    width: 423px;
    height: auto;
    background: rgba(0, 0, 0, 0.75);
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 50px;
}

@media (max-width:425px){
    .loginbox{
    width: 90%;
    height: auto;
    padding-bottom: 50px;
    }
    .kayit-ol{
        display: none;
    }
    .kayit-ol-m{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .kayit-ol-m a{
    color: white;
    }

    .kayit-ol-m a:hover{
        cursor: pointer;
        text-decoration: underline;
    }

    .kayit-ol-m p{
        color: #8c8c8c;
    }

    .kayit-ol-m{
        margin-top: 10px;
    }
}


</style>