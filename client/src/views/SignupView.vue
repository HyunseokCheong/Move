<template>
    <div>
        <h1>Sign Up Page</h1>
        <form @submit.prevent="signUp">
            <label for="username">username : </label>
            <input type="text" id="username" v-model="username" /><br />

            <label for="password1"> password : </label>
            <input type="password" id="password1" v-model="password1" /><br />

            <label for="password2"> password confirmation : </label>
            <input type="password" id="password2" v-model="password2" />

            <input type="submit" value="SignUp" />
        </form>
    </div>
</template>

<script>
export default {
    name: "SignUpView",
    data() {
        return {
            username: null,
            password1: null,
            password2: null,
            errorMessage: null,
        };
    },
    methods: {
        signUp() {
            const username = this.username;
            const password1 = this.password1;
            const password2 = this.password2;
            if (this.password1.length < 8){
                this.errorMessage = "비밀번호가 너무 짧습니다."
                alert(this.errorMessage)
            }
            else if (this.password1 !== this.password2){
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
