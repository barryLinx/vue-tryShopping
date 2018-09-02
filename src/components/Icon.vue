<template>
 
     <i :class="StatusClass" ></i> 
  
</template>
<script>
export default {
  props:['iconitem'],
  data() {
    return {
      StatusClass: {
        'fab fa-product-hunt':this.iconitem === '全部商品',
        'fas fa-gift': this.iconitem === '水果',
        'fas fa-tshirt': this.iconitem === '衣',
        'fas fa-book': this.iconitem === '書籍',
        'fas fa-tint': this.iconitem === '飲用水',
        'fas fa-boxes': this.iconitem === '櫃子',
      },
    }
  },
}
</script>

