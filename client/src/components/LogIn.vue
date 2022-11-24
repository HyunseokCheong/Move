<template>
    <div>
        <div class="index-box" v-if="!loginForm">
            <div class="index-box-top">
                <span
                    :class="{ login: !loginForm }"
                    class="index-box-title"
                    @click="loginForm = false"
                    >로그인</span
                >
                <span
                    :class="{ login: loginForm }"
                    class="index-box-title"
                    @click="loginForm = true"
                    >회원가입</span
                >
            </div>
            <div class="loginbox" v-if="!loginForm">
                <input
                    type="text"
                    @keyup.enter.prevent="logIn"
                    v-model="login.username"
                    placeholder="아이디"
                />
                <input
                    type="password"
                    @keyup.enter.prevent="logIn"
                    v-model="login.password"
                    placeholder="비밀번호"
                />
                <button @click.prevent="logIn">로그인</button>
            </div>
        </div>
        <div class="index-box" v-if="loginForm">
            <div class="index-box-top">
                <span
                    :class="{ login: !loginForm }"
                    class="index-box-title"
                    @click="loginForm = false"
                    >로그인</span
                >
                <span
                    :class="{ login: loginForm }"
                    class="index-box-title"
                    @click="loginForm = true"
                    >회원가입</span
                >
            </div>
            <div id="kayit" class="loginbox" v-if="loginForm">
                <input
                    type="text"
                    v-model="signup.username"
                    placeholder="아이디"
                />
                <input
                    type="password"
                    v-model="signup.password1"
                    placeholder="비밀번호"
                />
                <input
                    type="password"
                    v-model="signup.password2"
                    placeholder="비밀번호 확인"
                />
                <button @click.prevent="signUp">회원 가입</button>
            </div>
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
            successDiv: false,
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
            if (password1.length < 8) {
                this.errorMessage = "비밀번호가 너무 짧습니다.";
                alert(this.errorMessage);
            } else if (password1 !== password2) {
                this.errorMessage = "비밀번호가 일치하지 않습니다.";
                alert(this.errorMessage);
            } else {
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
