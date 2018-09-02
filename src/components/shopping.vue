<template>
  <div >
  <loading :active.sync="isLoading"></loading>
   <Navbar/>
    <AlertMessage/>
    <div class="jumbotron jumbotron-fluid jumbotron-bg d-flex align-items-end">
            <div class="container">
              <div class="bg-lighter p-3 font-weight-bold ">
                  <h1 class="display-4">買了不准退</h1>
                 <p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
              </div>            
            </div>
      </div>     
    <router-view></router-view>

   <Footer/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
// import ListGroup from '@/components/ListGroup';
import Footer from '@/components/Footer'; 
import AlertMessage from '@/components/AlertMessage'; 


export default {
  components:{
    Navbar,    
    Footer,
    AlertMessage,
   
  },
  name: 'shopping',
  computed:{
    isLoading(){
      return  this.$store.state.isLoading; 
    },
  }
 
  
}


</script>

<style>

</style>
