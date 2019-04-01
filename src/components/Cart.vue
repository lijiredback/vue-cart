<template>
  <div>
    <h1>{{ title }}</h1>
    <table class="center table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>名称</th>
          <th>单价</th>
          <th>数量</th>
          <th>总价</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(c, index) in cart" :key="c.id" :class="{ 'active-line': c.active }">
          <td>
            <input type="checkbox" v-model="c.active">
          </td>
          <td>{{ c.text }}</td>
          <td>￥{{ c.price }}</td>
          <td>
            <button @click="minusCount(index)">-</button>
            {{ c.count }}
            <button @click="plusCount(index)">+</button>
          </td>
          <td>￥{{ c.price * c.count }}</td>
        </tr>
        <tr>
          <td></td>
          <td colspan="2">{{ activeCount }} / {{ count }}</td>
          <td colspan="2">{{ totalPrice }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String }
  },
  data() {
    return {
      cart: []
    };
  },
  created() {
    this.$bus.$on("addGoodToCart", good => {
      const ret = this.cart.find(v => v.id === good.id);
      if (ret) {
        // 购物车中，已有该商品
        ret.count += 1;
      } else {
        this.cart.push({
          ...good,
          count: 1,
          active: true
        });
      }
    });
  },
  methods: {
    minusCount(index) {
      let count = this.cart[index].count;
      console.log(count);

      if (count > 1) {
        this.cart[index].count -= 1;
      } else {
        this.cart.splice(index, 1);
      }
    },
    plusCount(index) {
      this.cart[index].count += 1;
    }
  },
  computed: {
    activeCount() {
      return this.cart.filter(v => v.active).length;
    },
    count() {
      return this.cart.length;
    },
    totalPrice() {
      let num = 0;
      this.cart.forEach(item => {
        if (item.active) {
          num += item.count * item.price;
        }
      });
      return num;
    }
  }
};
</script>

<style scoped>
.active-line {
  color: green;
}

@import "../assets/bootstrap.min.css";
</style>