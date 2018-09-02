<template>    
       <nav class="navbar navbar-expand-lg navbar-light bg-lighe  ">
           <a class="navbar-brand "              
              data-toggle="collapse" 
              data-target="#navbarSupportedContent" 
              aria-controls="navbarSupportedContent"  href="#">               
             <router-link to="/" class="logo" ><i class="fas fa-globe text-info mr-1 fa-2x"></i>                   
             </router-link>  
           </a>
            <!-- 改側邊欄位 Sidebar <span>Grocery Store</span>-->
             <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                   <li class="nav-item active">
                    <router-link class="nav-link mt-2" to="/">
                          Home<span class="sr-only">(current)</span>
                    </router-link>
                     
                     <!-- <a class="nav-link mt-2" href="#">Home <span class="sr-only">(current)</span></a> -->
                    </li>  
                     <li class="nav-item active">
                       <router-link class="nav-link mt-2" to="/couponFree">
                          CouponFree<span class="sr-only">(current)</span>
                        </router-link>
                     </li>
                 </ul>
            </div>
            <div class="dropdown ml-auto ">
               <button class="btn btn-sm btn-cart " data-toggle="dropdown" >
                  <i class="fas fa-shopping-cart fa-2x"></i>
                  <span class="badge badge-pill badge-danger">{{cartLength}}</span>
               </button>

               <div class="dropdown-menu dropdown-menu-right" style="min-width:500px">
                <div class="px-4 py-3 ">
                  <div class="table-responsive">
                    <h4 class="font-weight-bold text-center">購物車清單</h4>
                  <table class="table table-sm">
                   
                    <tbody>
                      <tr v-for="(item, index) in cart.carts" :key="index">
                        <td class="text-center align-middle">
                          <button type="button" class="btn btn-outline-danger btn-sm"
                            @click="removeCartItem(item.id)"
                           >
                            <i class="far fa-trash-alt"></i> 
                            </button>                           
                        </td>
                        <td></td>
                        <td class="align-middle">{{item.product.title}}</td>
                        <td class="align-middle">{{item.qty}}/{{item.product.unit}}</td>
                        <td class="align-middle">{{item.total}}</td>
                      </tr>
                      <tr v-if="cartLength == 0">
                        <td class="align-middle">
                          無任何購物項目
                        </td>
                      </tr>
                    
                        <!-- <tr>
                            <td class=" text-center align-middle">
                                <i class="fas fa-trash"></i>
                            </td>
                            <td></td>
                            <td class="align-middle">金牌西裝</td>
                            <td class="align-middle">1件</td>
                            <td class="align-middle">$632</td>
                          </tr> https://barrylinx.github.io/bootstarp4Dashboard/purchasing_stepbuy.html 
                          -->
                    </tbody>
                  </table>
                  <router-link to="/checkPay" v-if="cartLength !== 0" class="btn btn-primary btn-block">結帳去</router-link>
                  
                  <!-- <a href="/checkPay" class="btn btn-primary btn-block">結帳去</a> -->
                </div>
                <div>
                </div>
                </div> 
             </div>
           </div>
     
         </nav>
      
  
</template>

<script>
import {mapState} from 'vuex'
export default {
   name:'Navbar',
     data(){
       return{
        
         // Shopcarts:[],        
       };       
     }, 
     created() {
   
      this.getCart();     
    },
   
   methods:{     
       getCart(){
         this.$store.dispatch('getCartActtion');
      // const vm = this ;
      //  const api = `${process.env.APIPATH}/api/${process.env.BARRYPATH}/cart`;
      //  this.$http.get(api).then((response)=>{        
          
      //         console.log('data',response.data.data);
      //         //console.log(response.data.carts);
      //         this.Shopcarts = response.data.data.carts; 
      //         console.log(response.data.data.carts);
           
      //   });
      },
       removeCartItem(id){
          this.$store.dispatch('removeCartAction',id);
        //  const vm = this ;
        //  const url =`${process.env.APIPATH}/api/${process.env.BARRYPATH}/cart/${id}`;
        //  vm.isLoading = true ; //讀取完歸零
        // this.$http.delete(url).then((res)=>{         
        //     console.log(res);                   
        //     vm.$bus.$emit('messsage:push',res.data.message,'danger'); 
        //     this.getCart();  
               
        // });
     },   
      //  handleScroll () {
      //  this.scrolled = window.scrollY > 0;
      //  console.log('scrollY',window.scrollY);
      // },
    
   },
   computed:{
     ...mapState(['cartLength','cart']),
      // cart(){
      //   return this.$store.state.cart;
      // }

   },
  
   
}
</script>

