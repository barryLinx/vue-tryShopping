<template>
  <div>
    <!-- <loading :active.sync="isLoading"></loading>       -->
     
    <div class="container">
      <div class="row">
        <div class="col-md-3 mb-3 position-relative">
            <div class="list-group sticky-top">             
                  <a data-toggle="list" class="list-group-item list-group-item-action"
                     v-for="(item, index) in categories" :key="index" href="#"                      
                     @click.prevent="categoryTag = item ,searchKey = 2">                     
                      <Icon :iconitem="item"/> {{item}}
                       <!-- <i class="fas fa-gift" ></i>   :class="{ 'active': item === searchText}"-->
                  </a>                           
            </div>
        </div>
       <div class="col-md-8">  
                <!-- Forms     @keyup.enter="searchText"-->
                    <form class="form-inline mb-3">
                        <input class="form-control mr-sm-2" type="search" 
                           placeholder="輸入商品名稱" 
                           v-model="searchText"
                           @keypress.enter="searchKey = 1"                                 
                           aria-label="Search">
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit" 
                          
                           >
                        <i class="fas fa-search"></i> Search</button>
                   </form>     
                <!-- Tab panes -->
                <!-- card text-center h-100 border-0 box-shadow -->                   
                      <!-- card -->
                      <div class="row">
                        <div  class="col-md-4 mb-4" v-if="item.is_enabled == 1" v-for="(item, index) in categoryArray[currentPage]" :key="index">
                          <div class="card text-center  h-100  border-0 box-shadow">
                              <router-link :to="`/productdetail/${item.id}`" >
                                  <img class="card-img-top"  :src="item.imageUrl"
                                       alt="Card image cap">
                               </router-link> 
                          
                            <div class="card-body">
                               <span class="badge badge-secondary ml-auto float-right ml-2">{{item.category}}</span>
                                <h5 class="card-title">
                                  <router-link class="text-dark" :to="`/productdetail/${item.id}`" >{{item.title}}</router-link>
                                 <!--text-truncate <a href="" class="text-dark">{{item.title}}</a>  -->
                                </h5>                             
                                <p class="card-text "><small class="text-muted ">{{item.description}}</small> </p>  
                            </div>
                             <ul class="list-group list-group-flush">
                                  <!-- <div class="h5">2,800 元</div> -->
                                <li class="list-group-item" v-if="!item.price"> 
                                  <div class="h5 text-muted" v-if="!item.price"> {{item.origin_price}} 元</div>
                                </li>
                                     <!-- 僅顯示原價 -->
                                     <!-- 僅顯示原價 + 優惠價 -->
                                <li class="list-group-item" v-if="item.price"> 
                                  <del class="h6 text-muted" v-if="item.price">原價 {{item.origin_price}} 元</del> 
                                 </li>
                                <li class="list-group-item" v-if="item.price"> 
                                  <div class="h5 text-primary" v-if="item.price">售價 {{item.price}} 元</div>
                                  </li>
                            </ul>
                            <!-- <div class="card-body">
                               <div class="d-flex justify-content-between align-items-baseline">
                                 
                                
                                 <div class="h5" v-if="!item.price"> {{item.origin_price}} 元</div>
                                 
                                  <del class="h6" v-if="item.price">原價 {{item.origin_price}} 元</del>       
                                  <div class="h5" v-if="item.price">售價 {{item.price}} 元</div>
                                </div>    
                             </div> -->
                            <div class="card-footer border-top-0 bg-white">
                              <!-- <router-link :to="`/productdetail/${book.id}`">查看更多</router-link> -->
                             
                              <!-- <router-link class="btn btn-outline-secondary btn-sm"
                                :to="`/productdetail/${item.id}`"
                               >
                                 查看更多
                              </router-link> -->
                             
                               <button type="button" class="btn btn-outline-primary btn-sm "
                               @click="addToCart(item.id)"
                                >
                                <i class="fas fa-spinner fa-spin" v-if="item.id === loadingItem"></i>
                                 <i class="fa fa-cart-plus" aria-hidden="true"></i> 加到購物車
                            </button>                             
                            </div>
                          </div>
                        </div>                       
                      </div>
                    <div  class="d-flex justify-content-center">
                       <nav aria-label="Page navigation example">
                         <ul class="pagination">
                           <li class="page-item" :class="{'disabled':currentPage == 0}">
                            <a class="page-link" href="#"
                           
                              @click.prevent="currentPage -= 1"
                               aria-label="Previous">
                             <span aria-hidden="true">&laquo;</span>
                             <span class="sr-only">Previous</span>
                            </a>
                           </li>
                         <li class="page-item" :class="{'active':currentPage === page - 1}" v-for="(page, index) in categoryArray.length" :key="index">
                           <a class="page-link" href="#" @click.prevent ="currentPage = page - 1">{{page}}</a>
                        </li>
                
                        <li class="page-item"   :class="{'disabled':currentPage == (categoryArray.length -1)}">
                           <a class="page-link" href="#"
                          
                            @click.prevent="currentPage += 1"
                             aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span class="sr-only">Next</span>
                           </a>
                        </li>
                     </ul>
                  </nav>
                </div>
          </div> 
       </div>
     </div>
    
  </div>
</template>
<script>
//import ListGroup from '@/components/ListGroup';
import $ from 'jquery';
import Icon from "@/components/Icon";
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "Product",
  components: {
    Icon
  },
  data() {
    return {
      // products:[],  Vuex
      // categoryName:[], Vuex
      //pagination:[],     
      categoryTag: "",
      searchText: "",
      status: {
        loadingItem: "" //哪個元素正在讀取中
      },
      searchKey:0,
      currentPage:0,
        //isLoading:false,   //改vuex
    };
  },
  
  created() {
    this.getProducts();
    this.getCategoriesActtion();
  },
  methods: { 
    ...mapActions("productsModules", ["getCategoriesActtion"]),     
     getProducts(page = 1){
       this.$store.dispatch('productsModules/getProductActtion');
    //     // const vm = this ;
    //     // const api = `${process.env.APIPATH}/api/${process.env.BARRYPATH}/products?page=${page}`;
    //     // //vm.$store.state.isLoading = true;
    //     // vm.$store.dispatch('updateLoading',true);
    //     // this.$http.get(api).then((response)=>{
    //     //   if (response.data.success) {

    //     //     vm.products = response.data.products;
    //     //      let  categoryArray =  Array.from(
    //     //       new Set(
    //     //         vm.products.map(function(item) {
    //     //           return item.category
    //     //         })
    //     //       )
    //     //     );
    //     //      categoryArray.unshift('全部商品');

    //     //     vm.categoryName = categoryArray;
    //     //     console.log(vm.products);
    //     //     vm.pagination = response.data.pagination;
    //     //     //vm.$store.state.isLoading = false;
    //     //     vm.$store.dispatch('updateLoading',false);

    //     //   }
    //     // });
    },

    addToCart(id, qty = 1) {
      this.$store.dispatch("addToCartAction", { id, qty });

      // //localstore 儲放
      // const vm = this ;
      //  const api = `${process.env.APIPATH}/api/${process.env.BARRYPATH}/cart`;
      //  vm.status.loadingItem = id ;
      //  const cart ={
      //   product_id : id,
      //   qty
      // };
      //   this.$http.post(api,{data:cart}).then((response)=>{
      //     vm.status.loadingItem = '' ; //讀取動畫完歸零
      //    vm.$bus.$emit('messsage:push',response.data.message,'success');
      //     // vm.getCart(); //取回購物車狀態
      //      console.log(vm.cart);
      //   });
    },
    seachProd() {
      const vm = this;
      vm.categoryTag = vm.searchText.trim();
      // console.log('categoryTag',vm.categoryTag);
    }
  },
  computed: {    
    ...mapState("productsModules", ["products", "categories", "pagination"]),
    categoryArray() {
      const vm = this;
   
      console.log('vm.products',vm.products);
      const newData = [];
      let seachArry = [];
      switch (vm.searchKey) {
        case 1:
           if (vm.searchText.trim() !=='') {
                 vm.categoryTag = '';
                seachArry = vm.products.filter((item) => item.title.toLowerCase()
                        .includes(vm.searchText.toLowerCase()));
           
                console.log('FFFseachArry',seachArry);
             }
          break;

        case 2:
           if(vm.categoryTag !=='' ){
               vm.searchText = '';
               vm.currentPage = 0;
               seachArry = vm.products.filter((item) => item.category.toLowerCase()
                          .includes(vm.categoryTag.toLowerCase()));  
               console.log('AllCategoryTagseachArry',seachArry);
           
              // console.log('CFFFseachArry',seachArry);       
             }
              if( vm.categoryTag == "全部商品"){
                seachArry = vm.products;
             }
          break;
      
        default:
             seachArry = vm.products;
          break;
      }

      seachArry.forEach((item,i) => {       
        if (i % 10 ===0) {
          newData.push([]);               
        }
         const page = parseInt(i/10);      
         newData[page].push(item); //將物件推入      
      });
       //console.log('seachArry',seachArry);
      console.log('newData',newData);
      return newData;
     
    },
   
    //...mapGetters('productsModules',['categories','products']),
    

    isLoading() {
      return this.$store.state.isLoading;
    },
    loadingItem() {
      return this.$store.state.status.loadingItem;
    }
  }
};
</script>

<style scoped>
</style>


