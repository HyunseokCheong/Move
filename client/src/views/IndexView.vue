<template>
    <div class="index-page">
        <div class="index-info">
            <span>Move</span>
            <span>원하는 곳 어디에서나 시청하십시오</span>
            <span>로그인 하거나 회원가입 하십시오</span>
        </div>
        <LogIn />
    </div>
</template>

<script>
import LogIn from "@/components/LogIn";

export default {
    name: "IndexView",
    components: {
        LogIn,
    },
};
</script>
