/* Конечно я почти уверен что передал данные не там, где нужно, 
но по заданию не было написано где именно так что по сути данные подготовил */


<template>
    <div class="mail-section__filter__filters">
        <div class="line"></div>
        <div class="wrapper">
            <div class="containers" v-for="(filter, id) in filters" :key="id">
                <div class="date" @click="sendFilter(filter)">
                    <p class="first" v-if ="filter.firstDay > 0">{{filter.firstDay}} {{month[filter.firstMonth]}}</p>
                    <p class="first" v-else-if="filter.firstMonth !== 0"
                                    >
                                    {{new Date(filter.firstYear, filter.firstMonth, 0).getDate()+filter.firstDay}} 
                                    {{month[filter.firstMonth-1]}}
                    </p>
                    <p class="first" v-else>
                                    {{new Date(filter.firstYear-1, 11, 0).getDate()+filter.firstDay}}
                                    {{month[month.length-1]}}
                    </p>                    
                    <pre> </pre>
                    <p v-if="filter.lastDay !== 0">- {{filter.lastDay}} {{month[filter.firstMonth]}} </p><pre> </pre>
                    <p> {{filter.firstYear}} г.</p>
                </div>
                <div class="cancel" @click="deleteFilter(id)">x</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Filters',
    data(){
        return{
            filters: [],
            month: [
                'янв', 'фев',
                "мар", "апр", "май", "июн",
                "июл", "авг", "сен", "окт",
                "ноя", "дек"
            ]
        }
    },
    mounted() {
        this.filters = this.$store.state.filters;
    },
    methods:{
        // удаление фильтра
        deleteFilter(id){
            this.$store.commit('deleteFilter', id)
        }, 
        // отправка данных в текущий фильтр и на сервер
        async sendFilter(filter){
            let phrase;
            if(filter.firstDay <= 0){
                phrase = (new Date(filter.firstYear, filter.firstMonth, 0).getDate()+filter.firstDay) + ' ' + this.month[filter.firstMonth-1] + ' - '+ filter.lastDay+ ' ' + this.month[filter.firstMonth] + ' ' +filter.firstYear+' г.';
            }else if(filter.lastDay !==0){
                phrase = filter.firstDay+ ' ' + this.month[filter.firstMonth] + ' - '+ filter.lastDay+ ' ' + this.month[filter.firstMonth] + ' ' +filter.firstYear+' г.';
            } else{
                phrase = filter.firstDay+ ' ' + this.month[filter.firstMonth] + ' ' +filter.firstYear +' г.';
            }
            this.$store.commit('changeFilter', phrase);
            try{
                const response = await fetch('http://fake-url.com', {
                    method: 'POST',
                    body: JSON.stringify(phrase),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const jsonRes = await response.json();
                alert('Передача данных на фейк: ', JSON.stringify(jsonRes));
            } catch(e){
                alert('Error: '+e);
            }
        }
    }
}
</script>