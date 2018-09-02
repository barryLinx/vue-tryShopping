<template>
  <div class="coupon">
    <div class="container">
       <div class="box">
         <h2>優惠碼:<span class="promo" >F520</span></h2>
         <p><b> 50% OFF</b></p>
         <p >期限: <span class="expire">12 21, 2018</span> </p>
          <button v-clipboard:copy="'F520'" class="btn btn-outline-info">Copy</button>
      </div>
       <div class="box">
         <h2>優惠碼:<span class="promo">R200</span></h2>
         <p><b> 80% OFF</b></p>
          <p >期限: <span class="expire">11 21, 2018</span> </p>
          <button v-clipboard:copy="'R200'" class="btn btn-outline-info">Copy</button> 
       
       </div>
       <div class="box">
         <h2>優惠碼:<span class="promo">Q200</span></h2>
         <p><b> 55% OFF</b></p>
         <p >期限: <span class="expire">09 21, 2018</span> </p>
         
            <button  v-clipboard:copy="'Q200'" class=" btn btn-outline-info" data-toggle="tooltip" data-placement="top" title="Tooltip on top">
              
              Copy
            </button> 
         
       </div>
    </div>
   
    
  </div>
</template>

<style scoped>

.container{
  font-family:Arial, Helvetica, sans-serif,微軟正黑體;
  display: grid;
  grid-template-columns: repeat(3,auto); 
  grid-gap: 30px;  
  color: #ffffff
}

.box{ 
  background-color: #555;  
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.box button{
  margin-bottom: 20px;
}

.box:hover{
  border: 2px solid #ffffff;
 box-shadow: 0 0 6px 6px #666;
}

.box .promo{
  font-size: 55px;
  color:aquamarine;
}

.box b{
  font-size: 33px;
}

.expire {
   font-size: 20px;
    color: #ddffdd;
}

.tooltip {
    position: relative;
    
}

</style>

