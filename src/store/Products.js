
import axios from 'axios';


export default ({
  namespaced:true,
  state:{   
    products:[],
    categories:[],
    pagination:[],
    product:{},
    currentPage:0,

  },
  //非同步 載入資料
  actions:{
    // payload 載荷
   
    getProductActtion(context){      
        const api = `${process.env.APIPATH}/api/${process.env.BARRYPATH}/products/all`;
        context.commit('Loading',true,{root:true});
       
        axios.get(api).then((response) => {
          if (response.data.success) {
             context.commit('PRODUCTS',response.data.products);          
             context.commit('PAGINATION',response.data.pagination);
            console.log('取得產品列表',response.data.products);
            context.commit('Loading',false,{root:true}); 
          }  
        });
    },
    getCategoriesActtion(context){      
      const api = `${process.env.APIPATH}/api/${process.env.BARRYPATH}/products/all`;
           
      axios.get(api).then((response) => {
        if (response.data.success) {         
           context.commit('CATEGORIES',response.data.products);          
        }  
      });
  },
    getProductId(context,{id}){
      const api =`${process.env.APIPATH}/api/${process.env.BARRYPATH}/product/${id}`;
      context.commit('Loading',true,{root:true});
       axios.get(api).then((response)=>{
          if (response.data.success) {   
              context.commit('PRODUCTSID',response.data.product);  
              context.commit('Loading',false,{root:true}); 
           }
        });
    },
    
    
  },
  //操作 state 同步行為 
  mutations:{
    PAGINATION(state,payload){
      state.pagination = payload;   
    },
    PRODUCTS(state,payload){
      state.products = payload;
    },
    PRODUCTSID(state,payload){
      
      state.product = payload;
      
    },
    CATEGORIES(state,payload){
      let filterData = new Set();
      
       payload.forEach(el =>{
        if(el.is_enabled ){             
          filterData.add(el.category); 
        }   
      })

      state.categories = Array.from(filterData);
      state.categories.unshift('全部商品');
      console.log('ss',filterData);
      console.log('state.categories',state.categories);
    },
   

  },
  // 邏輯運算
  getters:{
    categories(state){
      return state.categories;
    },
    products(state){
      return state.products;
    },
    // filterData(state){
    //   const newData = [];
    //   state.products.forEach((item,index) => {
    //     if(index % 10){
    //       newData.push([]);          
    //     }
    //     const page = parseInt(index/10);
    //     newData[page].push(item); //將物件推入        
    //   });

    //   return newData;
    // }
  },
});
