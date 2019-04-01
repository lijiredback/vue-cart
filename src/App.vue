<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <ul>
      <li v-for="(good,index) in goods" :key="good.id">
        <span>{{ good.text }}</span>
        <span>￥{{ good.price }}</span>
        <button @click="addGoodToCart(index)">添加</button>
      </li>
    </ul>
    <cart :title="title"></cart>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Cart from "./components/Cart.vue";
import axios from "axios";

export default {
  name: "app",
  components: {
    // HelloWorld
    Cart
  },
  async created() {
    try {
      const response = await axios.get("/api/goods");
      console.log(response);
      this.goods = response.data.goodsList;
    } catch (error) {
      console.log(error);
    }
  },
  data() {
    return {
      goods: [],
      title: "我的购物车"
    };
  },
  methods: {
    addGoodToCart(index) {
      // 获取 goods 中的对应项
      const good = this.goods[index];
      this.$bus.$emit("addGoodToCart", good);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
