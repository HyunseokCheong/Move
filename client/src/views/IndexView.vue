<template>
  <div class="overlay">
    <div class="frame">
        <div class="content">
            <h1>Move</h1>
            <p>원하는 곳 어디에서나 시청하십시오</p>
            <p id="p2">시청할 준비가 되셨나요? 구독을 생성하거나 액세스하려면 이메일 주소를 입력하세요.</p>
        </div>
        <LogIn/>
    </div>
  </div>
</template>

<script>
import LogIn from "@/components/LogIn";

export default {
    name: 'IndexView',
    data() {
        return {
            loginform: false,
        };
    },
    components: {
        LogIn,
    }
};
</script>

<style scoped>
#p2 {
  margin-top: -18px;
  font-size: 17px;
}

.content p {
  margin-top: -18px;
  font-size: 24px;
}

.content {
  font-family: sans-serif;
  text-align: center;
  width: 750px;
  height: 500px;
  color: white;
  font-size: 28px;
}

.overlay {
  background: url("https://i.ibb.co/ynf52h8/zgeTuV.jpg") no-repeat;
  background-size: cover;
  background-position: center;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.frame {
  position: fixed;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.75);
}

@media (max-width: 748px) {
  .content {
    width: 90%;
  }
  .errorBox {
    width: 100%;
    margin-left: 0px;
  }
}
</style>