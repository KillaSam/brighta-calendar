import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    filters: [],
    currFilter: ''
  },
  mutations: {
    // добавление нового фильтра 
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

    // удаление фильтра
    deleteFilter(state, id){
      state.filters.splice(id, 1);
    },

    // применение текущего фильтра
    changeFilter(state, phrase){
      state.currFilter = phrase;
    }    
  },
  actions: {
  },
  modules: {
  }
})
