import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import productsModules from './Products';
import AlertsModules from './AlertMessage';
Vue.use(Vuex);

export default new Vuex.Store({
  strict:true,
  modules:{
    productsModules,
    AlertsModules,
  },
  state:{
    isLoading:false,   
    cart:[],
    cartLength:0,
    status:{
      loadingItem:'', //哪個元素正在讀取中
    },  

  },
  //非同步 載入資料
  actions:{
    // payload 載荷
    updateLoading(context,status){
      //setTimeout();
      context.commit('Loading',status);
    },
   
    getCartActtion(context){
      // const vm = this ;
        const api = `${process.env.APIPATH}/api/${process.env.BARRYPATH}/cart`;
        axios.get(api).then((response)=>{ 
              //  console.log('data',response.data.data);
               //  console.log(response.data.data.carts);            
               console.log(response.data.data);
               context.commit('CART',response.data.data);  
                        
         });
       },
    addToCartAction(context,{id,qty}){      
      const api = `${process.env.APIPATH}/api/${process.env.BARRYPATH}/cart`;     
       const cart ={
        product_id : id,
        qty
      };
        context.commit('loadingItem',id);
        axios.post(api,{data:cart}).then((response)=>{
          //console.log(response);
           context.dispatch('getCartActtion');//取回購物車狀態   
           const timestamp = Math.floor(new Date() / 1000); 
           context.dispatch('AlertsModules/updateMessage',{message:response.data.message,status:'success',timestamp:timestamp});
           context.dispatch('AlertsModules/removeMessageWithTiming',timestamp);
           context.commit('loadingItem','');
        
        });
    },
    removeCartAction(context,id){
       // const vm = this ;
        const url =`${process.env.APIPATH}/api/${process.env.BARRYPATH}/cart/${id}`;
       //vm.isLoading = true ; //讀取完歸零
       axios.delete(url).then((response)=>{         
         //  console.log(response); 
           //const timestamp = Math.floor(new Date() / 1000); 
           context.dispatch('getCartActtion'); // this.getCart();
           context.dispatch('AlertsModules/updateMessage',{message:response.data.message,status:'danger'});
           //context.dispatch('AlertsModules/removeMessageWithTiming',timestamp);
           // context.commit('AlertsModules/updateMessage',{message:response.data.message,status:'danger'});                  
           //this.$bus.$emit('messsage:push',res.data.message,'danger');          
            
       });
    },
    addcoupon(context,coupon_code){
      const url = `${process.env.APIPATH}/api/${process.env.BARRYPATH}/coupon`;
      const coupon ={
        code : coupon_code        
     };
     context.commit('Loading',true,{root:true});
     axios.post(url,{data:coupon}).then((response)=>{          
       
        //const timestamp = Math.floor(new Date() / 1000); 
        context.dispatch('AlertsModules/updateMessage',{message:response.data.message,status:'danger'});
        //context.dispatch('AlertsModules/removeMessageWithTiming',timestamp);
        context.dispatch('getCartActtion'); // this.getCart();
        context.commit('Loading',false,{root:true});
           // vm.isLoading = false;
         });
    },   
    
  },
  //操作 state 同步行為 ,對資料進行整理可以在這作
  mutations:{
    Loading(state,payload){
      state.isLoading = payload;
    },   
    CART(state,payload){
      state.cart = payload;
      state.cartLength = state.cart.carts.length;
   
    },
    loadingItem(state,payload){
      state.status.loadingItem = payload;
      console.log(payload);
    }

  },
  // 邏輯運算 呈現到 view
  getters:{  
    Loading(state,status){
      return state.isLoading ;
    },
    Cart(state){
      return state.cart ;
    },

  },
});





