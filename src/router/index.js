import Vue from 'vue'
import Router from 'vue-router'

import Shopping from '@/components/shopping'
import Product from '@/components/pages/Products'
import ProductDetail from '@/components/pages/ProductDetail'
import CheckPay from '@/components/pages/checkPay'
import Login from '@/components/pages/Login'

import OrderCheck from '@/components/pages/OrderCheck'
import CouponFree from '@/components/pages/CouponFree'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'*',
      redirect:'/',
    },
   
    {
      path: '/',
      name: 'Shopping',
      component: Shopping,
      children:[
        {
          path:'/',
          name:'products',
          component:Product,
        },
        {
          path:'productdetail/:Pid',
          name:'productdetail',
          component:ProductDetail,
        },
       
        {
          path:'checkPay',
          name:'checkPay',
          component:CheckPay,
         //meta:{ requiresAuth: true},  //登入驗證 才行
        },
        {
          path:'ordercheck/:orderId',
          name:'OrderCheck',
          component: OrderCheck,         
        },
        {
          path:'couponFree',
          name:'CouponFree',
          component:CouponFree,
        }  
                      
      ]
    },
    
  ]
})
