<template>
  <div>
               <!-- List Group  迴圈出類別-->
               <!-- <div class="list-group sticky-top"> -->
                  <a  data-toggle="list" class="list-group-item list-group-item-action ">
                     <i class="fas fa-gift"></i> {{product}}
                  </a>
                  <!-- <a href="#profile" data-toggle="list" class="list-group-item list-group-item-action"><i class="fas fa-cut"></i> {{product.category}}</a> -->
                  <!-- <a href="#home" data-toggle="list" class="list-group-item list-group-item-action"><i class="fas fa-gift"></i> 禮品土產</a>
                  <a href="#profile" data-toggle="list" class="list-group-item list-group-item-action"><i class="fab fa-pagelines"></i> 柴米油鹽醬醋茶</a>
                  <a href="#home" data-toggle="list" class="list-group-item list-group-item-action disabled"><i class="fab fa-nutritionix"></i> 鋼鐵鋁鎳</a> -->
                <!-- </div> -->
  </div>
</template>
<script>
export default {
   name:'ListGroup',
   props:['product']
}
</script>

