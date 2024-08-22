<script setup>
import { ref } from 'vue'
import data from '../service/data'
import MenuCard from '../components/MenuCard.vue'
import ShoppingCart from '../components/ShoppingCart.vue'
import OrderedContent from '../components/OrderedContent.vue'
import NavBar from '../components/NavBar.vue'

const cartItems = ref([])
const orderedContent = ref({})

const handleClickMenuItem = (props) => {
  if (cartItems.value.findIndex((el) => el.id === props.id) !== -1) return
  cartItems.value.unshift({ ...props, quantity: 1 })
}
const handleRemoveCartItem = (id) => {
  const index = cartItems.value.findIndex((el) => el.id === id)
  cartItems.value.splice(index, 1)
}
const handleSubmit = ({ memo, total }) => {
  if (cartItems.value.length === 0) return

  orderedContent.value = {
    items: cartItems.value.map(({ name, quantity, price }) => ({
      name,
      quantity,
      subtotal: quantity * price
    })),
    memo,
    total
  }
  cartItems.value = []
}
</script>

<template>
  <NavBar />
  <main>
    <h1>餐點管理工具</h1>
    <a-row>
      <a-col :span="7">
        <div class="menu">
          <MenuCard
            v-for="item in data"
            :key="item.id"
            :data="item"
            :disabled="cartItems.findIndex((el) => el.id === item.id) !== -1"
            @onClick="handleClickMenuItem"
          />
        </div>
      </a-col>
      <a-col :span="1" />
      <a-col :span="16">
        <ShoppingCart
          :data="cartItems"
          @onRemoveCartItem="handleRemoveCartItem"
          @onSubmit="handleSubmit"
        />
      </a-col>
    </a-row>
    <a-divider />
    <a-row>
      <a-col :span="4" />
      <a-col :span="16">
        <p class="noOrder" v-if="!orderedContent.items">尚未建立訂單</p>
        <OrderedContent
          v-else
          :orderList="orderedContent.items"
          :memo="orderedContent.memo"
          :total="orderedContent.total"
      /></a-col>
      <a-col :span="4" />
    </a-row>
  </main>
</template>

<style scoped>
main {
  padding-bottom: 30px;
}
.menu {
  border: 1px solid #ccc;
  border-bottom: none;
  border-radius: 10px;
  overflow: hidden;
}
.noOrder {
  text-align: center;
}
</style>
