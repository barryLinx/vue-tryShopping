<template>
  <div>
    
    <div class="text-secondary h1 text-center mb-3">Grocery Store 結帳</div>
      <div class="form-row mb-2">
        <div class="col-12 col-sm">
          <div class="alert alert-success alert-rounded" role="alert">
            1.輸入訂單資料
          </div>
        </div>
        <!-- <div class="col-12 col-sm">
          <div class="alert alert-secondary alert-rounded" role="alert">
            2.確認訂單
          </div>
        </div> -->
        <div class="col-12 col-sm">
          <div class="alert alert-secondary alert-rounded" role="alert">
            2.完成
          </div>
        </div>
      </div> 

        <div class="row justify-content-center mb-5">
        <div class="col-md-8 ">
          <!--Accordion  -->
          <div class="card">
            <div class="card-header" id="headingOne">
              <div class="mb-0 d-flex justify-content-end ">
                <button class="btn btn-link mr-auto "
                
                 type="button"  >
                  顯示購物車細節     
                </button>
                <span class="h3 ml-auto font-weight-bold">${{cart.total}}</span>            
              </div>                
              </div>                
          </div>
          <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">        
              <table class="table table-sm">
                  <thead>
                      <tr>
                       <th width="30"><button class="btn btn-danger" @click.prevent="removeAll">全部清空</button></th>
                       <th width="100"></th>
                       <th>商品名稱</th>
                       <th width="100">數量</th>
                       <th width="80">小計</th> 
                      </tr>
                    </thead>
                  <tbody>
                    <tr v-for="(item, index) in cart.carts" :key="index">
                      <td class="text-center align-middle">
                        <a href="#" @click.prevent="removeCartItem(item.id)" class="text-dark" data-toggle="modal" data-target="#exampleModal" data-goodsname="金牌西裝" data-count="1" data-moeny="632">
                          <i class="fas fa-trash"></i></a>                         
                      </td>
                      <td><img class="image-wh" :src="item.product.imageUrl" alt=""> </td>                    
                      <td class="align-middle">{{item.product.title}}</td>
                      <td class="align-middle">{{item.qty}}/{{item.product.unit}}</td>
                      <td class="align-middle text-right">${{item.total}}</td>
                    </tr>
                  
                  </tbody>
                  <tfoot>
                  
                    <tr>
                        <td class="text-right font-weight-bold" colspan="4">總金額</td>
                        <td class="font-weight-bold text-right">${{cart.total}}</td>
                      </tr>
                      <tr v-if="cart.final_total !==  cart.total">
                        <td colspan="3" class="text-right text-success">折扣價</td>
                         <td class="text-right text-success">{{ cart.final_total|currency }}</td>
                     </tr>
                  </tfoot>
                </table>
          </div>
          <div class="input-group mb-3 input-group-sm">
              <input type="text" class="form-control" placeholder="請輸入優惠碼"
                 v-model="coupon_code"
                >
              <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button"
                    @click="addcoupon"
                    >
                   套用優惠碼
                </button>
             </div>
          </div>
          <!--Accordion  --> 
           <!-- Form row -->
         
   <form class="mt-4 needs-validation" @submit.prevent="createOrder">
      <div class="h2 bg-light text-center">
          訂購人資訊
      </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputEmail4">Email</label>
            <input type="email"  class="form-control" id="inputEmail4" name="Email" 
              v-validate="'required|email'"
              v-model="form.user.email"
              :class="{'is-invalid':errors.has('Email')}"
              placeholder="Email" >
            <!-- <span class="text-danger">{{ errors.first('Email') }}</span>  ,'is-valid':true-->
              <div class="invalid-feedback text-danger" >
                {{ errors.first('Email') }}
              </div>
              <div class="valid-feedback">
                 Looks good!
             </div>
          </div>
          <div class="form-group col-md-6">
            <label for="inputPassword4">姓名</label>
            <input type="text"  class="form-control" name="name" id="inputPassword4" 
              v-model="form.user.name" 
              v-validate="'required'" 
              :class="{'is-invalid':errors.has('name')}"
             placeholder="輸入姓名" >
            <!-- <span class="text-danger" v-if="errors.has('name')">姓名必需輸入</span> -->
            <div class="invalid-feedback">
               姓名必需輸入
              </div>
          </div>
        </div>
        <div class="form-group">
          <label for="inputAddress">收件人電話</label>
          <input type="text" class="form-control" id="inputAddress"  
            name="tel"
            v-validate="'required'" 
            :class="{'is-invalid':errors.has('tel')}"
            v-model="form.user.tel" placeholder="請輸入電話"        
          > 
           <!-- <span class="text-danger"  v-if="errors.has('tel')">電話不得留空</span> -->
          <div class="invalid-feedback" v-if="errors.has('tel')">
             電話不得留空
          </div>
        </div>

        <div class="form-group">
          <label for="inputAddress2">收件人地址</label>
          <input type="text" class="form-control" id="inputAddress2" name="address" 
           v-model="form.user.address"
           v-validate="'required'"
           :class="{'is-invalid':errors.has('address')}"
          placeholder="Apartment, studio, or floor" >
          <div class="invalid-feedback" v-if="errors.has('address')">
              地址欄位不得留空
            </div>
        </div>
       
        
          <div class="form-group">
            <label for="useraddress">留言</label>
            <textarea name="" id="" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
         </div>
        <div class="text-right">
            <router-link class="btn btn-outline-info " to="/"> <i class="fas fa-angle-double-left"></i> 繼續購物</router-link>
            <!-- <input type="button" class="btn btn-outline-primary mr-1" value="繼續選購"> -->
            <button @click="createOrder" :class="{'disabled':cartLength == 0}" class=" btn btn-primary " >下一步</button>
        </div>  
      </form>
    <!-- Form row -->       
        </div>      
      </div> 

        <!-- Modal delete-->
<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header bg-danger text-white">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>         
          <div class="form-group">
            <label for="EClientEmail1">商品名稱</label>
            <input type="email" class="form-control" id="GoodsName" aria-describedby="emailHelp" placeholder="Enter email">
            
          </div>
          <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="EClientItem">單價</label>
                    <input type="text" class="form-control"  id="ItemPrice" disabled>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="EClientCount">數量</label>
                    <input type="number" class="form-control" id="Count">
                </div>
            </div>   
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>


  </div>
</template>
<script>
 import $ from 'jquery';
 import {mapState} from 'vuex';
export default {
  data(){
    return{
      coupon_code:'',
      // Shopcarts:[],
        form:{
        user:{
          name:'',
          email:'',
          tel:'',
          address:'',
        },
        message:'',
      },      
    };
  },
  
  methods:{  
    getCart(){
       this.$store.dispatch('getCartActtion');
        // const vm = this;
        // const api = `${process.env.APIPATH}/api/${process.env.BARRYPATH}/cart`;
        //   this.$http.get(api).then((response)=>{     
        //            //console.log(response.data.carts);
        //            vm.Shopcarts = response.data.data; 
        //            console.log(response.data.data);           
        //      });
      },
      removeCartItem(id){
        const vm = this;
        this.$store.dispatch('removeCartAction',id);
        vm.getCart();
        console.log('this.cartLength',this.cartLength);
       
       // this.redirtHome();
        //  const vm = this;
        // const api = `${process.env.APIPATH}/api/${process.env.BARRYPATH}/cart/${id}`;
        // this.$http.delete(api).then((response)=>{       
        //        console.log('response',response.data.data);             
        //        vm.getCart();              
        //       // $("#deleteModal").modal("hide");
        //        vm.$bus.$emit('messsage:push',response.data.message,'info');            
        //  });
      }, 
      removeAll(){
         const vm = this;
         let arry = this.cart.carts;         
        for (const key in arry) {
             console.log(arry[key].id);           
             this.$store.dispatch('removeCartAction',arry[key].id);          
        }
  
        this.$router.push('/');

        
         
        //  this.cart.carts.forEach(element => {
        //      this.$store.dispatch('removeCartAction',element);
        //   });
      },
       addcoupon(){
         const vm = this;
         this.$store.dispatch('addcoupon',vm.coupon_code);
        // const vm = this;
        // const url = `${process.env.APIPATH}/api/${process.env.BARRYPATH}/coupon`;
     
        // const coupon ={
        //    code : vm.coupon_code        
        // };
        //  //console.log('vm.coupon_code',vm.coupon_code);
        //   this.$store.commit('Loading',true);
        // //  vm.isLoading = true;
        //  this.$http.post(url,{data:coupon}).then((res)=>{          
        //     console.log(res);        
           
        //     vm.getCart(); //取回購物車狀態
        //     this.$store.commit('Loading',false);
        //    // vm.isLoading = false;
        //  });
      },
    createOrder(){
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.BARRYPATH}/order`;
      const order= vm.form;
      //vm.isLoading = true;
    
       this.$validator.validate().then((result) => { //vee-validate 驗證
       console.log(result);
        if (result) {
          // do stuff if not valid.
          this.$http.post(url,{data: order}).then((res)=>{
               console.log('訂單已建立',res);      
               if (res.data.success) {
                 vm.$router.push(`ordercheck/${res.data.orderId}`);
                 // vm.isLoading = false ; //讀取完歸零
                 console.log('成功'); 
               }else{
                  const timestamp = Math.floor(new Date() / 1000);
                  this.$store.dispatch('AlertsModules/updateMessage',{message:res.data.message,status:'danger',timestamp:timestamp});
                  this.$store.dispatch('AlertsModules/removeMessageWithTiming',timestamp);
               }      
           });
        }else{
           console.log('欄位不完整');  
          // vm.isLoading = false ; //讀取完歸零   
        }
      });
    },

    redirtHome(){
       console.log('cartLength',this.cartLength);  
       console.log('cartLength',this.cart.carts.length); 
       if (this.cartLength == 0) {
           this.$router.push('/');
       }      
    },
  },
  computed:{
      ...mapState(['cartLength','cart']),
    //  cart(){
    //     return this.$store.state.cart;
    //   }
  },    
  created(){
    this.getCart();
    this.redirtHome();
  }

}
</script>

