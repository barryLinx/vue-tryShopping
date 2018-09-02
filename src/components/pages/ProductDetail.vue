<template>
  <div>
      <!-- <loading :active.sync="isLoading"></loading> -->
     <div class="container">
        <nav aria-label="breadcrumb ">
            <ol class="breadcrumb bg-transparent pl-0">
              <li class="breadcrumb-item"> <router-link to="/" >Grocery Store</router-link> </li>
              <li class="breadcrumb-item">{{product.category}}</li>
              <li class="breadcrumb-item active" aria-current="page">{{product.title}}</li>
            </ol>
          </nav>
       <div class="row">         
         <div class="col-md-4">
           <div class="sticky-top" style="top:15px;">
              
              <h1 class="h2">{{product.title}}</h1>
              <div class="d-flex justify-content-end align-items-end">
                 <span class="text-muted" v-if="!product.price">售價 ${{product.origin_price}}</span>
                 <del class="text-muted" v-if="product.price">原價 ${{product.origin_price}}</del>
                 <div class="h3 ml-auto mb-0 text-danger">
                    <small >特價 NT$</small>
                    <strong>{{product.price}}</strong>
                 </div>
              </div>
              <hr>
              <!-- 尺寸:
              <div class="btn-group btn-group-toggle btn-group-sm mb-3" data-toggle="buttons">
                  <label class="btn btn-outline-secondary active">
                    <input type="radio" name="options" id="option1" autocomplete="off" checked> SM
                  </label>
                  <label class="btn btn-outline-secondary disabled">
                    <input type="radio" name="options" id="option2" autocomplete="off">MD
                  </label>
                  <label class="btn btn-outline-secondary">
                    <input type="radio" name="options" id="option3" autocomplete="off"> XL
                  </label>
                </div> -->
  
                <div class="input-group ">
                  <select name="" id="" v-model="selected" class="form-control mr-1">
                    <option v-for="(item, index) in product.num" :key="index" :value="item">{{item}}/{{product.unit}}</option>                  
                  </select>
                  <a href="" class="btn btn-primary" @click.prevent="addToCart(product.id)">
                    <i class="fa fa-cart-plus" aria-hidden="true"></i> 加入購物車</a>
                </div>
           </div>           
         </div>
         <div class="col-md-8">
           <h2>{{product.title}}</h2>          
                            
            
              <p class="card-text text-muted ">{{product.description}}</p>
             
                <img :src="product.imageUrl" class="w-100 mt-5" alt="">  
               
                 
              <div v-html="product.content"></div>

               <div class="alert alert-secondary mt-4" role="alert">
                 <h3 class="text-center">購物說明</h3>
                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, at! Totam, exercitationem repellat. Saepe facere amet expedita perferendis voluptatem dicta dignissimos tempora ut atque, rerum doloribus? Magni, blanditiis. Assumenda, distinctio!</p>
              </div>
             
               
              <!-- <h3 class="text-center mt-5">合身剪裁</h3>
              <img src="https://images.unsplash.com/photo-1490126125528-a0c3b2998dcd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a7d2f4ad62efd5c276043602a6c8a74d&auto=format&fit=crop&w=634&q=80" alt="">
              <h3 class="text-center mt-5">合身剪裁</h3>
              <img src="https://images.unsplash.com/photo-1490126125528-a0c3b2998dcd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a7d2f4ad62efd5c276043602a6c8a74d&auto=format&fit=crop&w=634&q=80" alt="">
              <h3 class="text-center mt-5">合身剪裁</h3>
              <img src="https://images.unsplash.com/photo-1490126125528-a0c3b2998dcd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a7d2f4ad62efd5c276043602a6c8a74d&auto=format&fit=crop&w=634&q=80" alt=""> -->
         </div>
       </div>
     </div>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
  data(){
    return{
      // product:{},
      // isLoading:false, //改vuex
       selected:1
      
       };
  },
  methods:{
     addToCart(id){
      const vm = this ;
      let qty = vm.selected;
      console.log(qty);
       this.$store.dispatch('addToCartAction',{id,qty});     
      //localstore 儲放
      //  const vm = this ;
      //  const api = `${process.env.APIPATH}/api/${process.env.BARRYPATH}/cart`;     
      //  const cart ={
      //   product_id : id,
      //   qty
      // };
      //   console.log(qty);
      //   this.$http.post(api,{data:cart}).then((response)=>{         
      //      //vm.getCart(); //取回購物車狀態           
      //      console.log(vm.cart);
      //   });
    },
     getProduct(id){
      
        this.$store.dispatch('productsModules/getProductId',{id});
    //     const vm = this;
    //     const api =`${process.env.APIPATH}/api/${process.env.BARRYPATH}/product/${id}`;
    //     vm.$store.state.isLoading = true;
        
    //    this.$http.get(api).then((response)=>{
    //      if (response.data.success) {          
    //         vm.product = response.data.product ;
    //          vm.$store.state.isLoading = false;
    //       }
    //    });
     },
  },
  computed:{
    ...mapState('productsModules',['product']),
    
  },
  created(){   
   // let id = this.$route.params.id; 
    //console.log('ID =',this.$route.params.Pid);
    this.getProduct(this.$route.params.Pid);

  }
 
}
</script>
