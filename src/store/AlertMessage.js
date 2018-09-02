
export default({
  namespaced:true,
  state:{
    messages: []
  },
  actions:{     
     removeMessageWithTiming(context,timestamp) {
      //const vm = this;
      setTimeout(() => {
        context.commit('removeMessageWithTiming',timestamp);       
      }, 5000);
    },
    updateMessage(context,{message,status}) {        
      const timestamp = Math.floor(new Date() / 1000)
      context.commit('updateMessage',{message,status,timestamp}); 
      context.dispatch('removeMessageWithTiming',timestamp);   
    },
  },  
  mutations:{
    // messages(state,payload){
    //   state.message = payload;
    // },
    updateMessage(state,payload){     
      state.messages.push({
        message:payload.message,
        status:payload.status,
        timestamp:payload.timestamp,
      });
    },
    removeMessage(state,payload) {
      state.messages.splice(payload, 1);
    },
    removeMessageWithTiming(state,timestamp){
      state.messages.forEach((item, i) => {
        if (item.timestamp === timestamp) {
          state.messages.splice(i, 1);          
        }
      });
    }
    
  },

});