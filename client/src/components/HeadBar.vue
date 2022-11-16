<template>
    <div class="headbar">
        <div class="headbar-title">
            {{ msg }}
        </div>
    </div>
</template>

<script>
export default {
    name: "HeadBar",
    props: {
        msg: String,
    },
};
</script>

<style>
.headbar {
    width: 100%;
    height: 56px;

    display: flex;
    flex-direction: row;
    align-items: center;

    border: solid 1px black;
}
.headbar-title {
    margin-left: 10px;
}
</style>
