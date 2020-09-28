import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    filters: [],
    currFilter: ''
  },
  mutations: {
    addFilter(state, datas){
      if(datas.day <= 0){
        
          state.filters.push({firstMonth: datas.month,
                              firstYear: datas.year,
                              firstDay: datas.day,
                              lastDay: datas.lastDay
                              })
        
        
                            console.log(state.filters);
      } else if(datas.lastDay === 0){        
        state.filters.push({firstMonth: datas.month, 
                            firstYear: datas.year, 
                            firstDay: datas.day,
                            lastDay: datas.lastDay
                          })
        console.log(state.filters);
      } else {
        state.filters.push({firstMonth: datas.month, 
                            firstYear: datas.year, 
                            firstDay: datas.day,
                            lastDay: datas.lastDay
                          })
        console.log(state.filters);
      }
    }, 
    deleteFilter(state, id){
      state.filters.splice(id, 1);
    },
    changeFilter(state, phrase){
      state.currFilter = phrase;
    }    
  },
  actions: {
  },
  modules: {
  }
})
