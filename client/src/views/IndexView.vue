<template>
    <div class="index-page">
        <div class="index-info">
            <div class="index-info-title">
                <span class="index-info-title-1">M</span>
                <span>ove</span>
            </div>
            <span class="index-info-subtitle"
                >원하는 곳 어디에서나 시청하십시오</span
            >
            <span class="index-info-content"
                >로그인 하거나 회원가입 하십시오</span
            >
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
