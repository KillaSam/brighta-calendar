<template>
    <div class="calendar-wrapper">
        <div class="calendar-main">
            <div class="filters">    
                <div class="radio-wrapper first">
                    <input type="radio" name="radio" id="radio1" @click="startAgain"> 
                    <label for="radio1">Весь срок</label>       
                </div>
                <div class="radio-wrapper">
                    <input type="radio" name="radio" id="radio2" @click="chooseToday" checked>   
                    <label for="radio2">Сегодня</label>         
                </div>
                <div class="radio-wrapper">
                    <input type="radio" name="radio" id="radio3" @click="chooseYesterday">           
                    <label for="radio3">Вчера</label>      
                     
                </div>
                <div class="radio-wrapper">
                    <input type="radio" name="radio" id="radio4" @click="last7Days">   
                    <label for="radio4">Последние 7 дней</label>         
                </div>
                <div class="radio-wrapper">
                    <input type="radio" name="radio" id="radio5" @click="last30Days">   
                    <label for="radio5">Последние 30 дней</label>         
                </div>
                <div class="radio-wrapper">
                    <input type="radio" name="radio" id="radio6" @click="thisMonth">           
                    <label for="radio6">В этом месяце</label>       
                </div>
                <div class="radio-wrapper">
                    <input type="radio" name="radio" id="radio7" @click="lastMonth">           
                    <label for="radio7">Прошлый месяц</label>       
                </div>
            </div>
            <table class="one-calendar">
                <thead class="header-wrapper">            
                    <tr class="header">
                        <td class="arrow" @click="prevMonth()"><div class="circle"><p class="sign">‹</p></div></td>
                        <td colspan="5" valign="middle" class="name-month">
                            <span id="month-cal">{{month[currMonth]}}</span>,  
                            {{currYear}}
                        </td>
                        <td class="arrow" @click="nextMonth()"><div class="circle"><p class="sign">›</p></div></td>
                    </tr>
                </thead>
                <tbody class="calendar-numbers">
                    <tr class="day-names">
                        <td class="day-names__name">Пн</td>
                        <td class="day-names__name">Вт</td>
                        <td class="day-names__name">Ср</td>
                        <td class="day-names__name">Чт</td>
                        <td class="day-names__name">Пт</td>
                        <td class="day-names__name">Сб</td>
                        <td class="day-names__name">Вс</td>
                    </tr>

                    <tr>
                        <td v-for="day in firstWeek" 
                            :class="day.disabled ? disDay : trueDay"
                            :id="'day_'+day.id"
                            :key="day.id"   
                            @click="choosen"                     
                            > 
                            {{day.numOfMonth}}
                        </td>
                    </tr>
                    <tr>
                        <td class="day"
                            v-for="day in secondWeek" 
                            :id="'day_'+day.id"
                            :key="day.id" 
                            @click="choosen"
                            >
                            {{day.numOfMonth}}
                        </td>
                    </tr>
                    <tr>
                        <td class="day"
                            v-for="day in thirdWeek" 
                            :id="'day_'+day.id"
                            :key="day.id" 
                            @click="choosen" 
                            >
                            {{day.numOfMonth}}
                        </td>
                    </tr>
                    <tr>
                        <td class="day"
                            v-for="day in fourthWeek" 
                            :id="'day_'+day.id"
                            :key="day.id" 
                            @click="choosen" 
                            >
                            {{day.numOfMonth}}
                        </td>
                    </tr>
                    <tr>
                        <td v-for="day in fifthWeek" 
                            :class="day.disabled ? disDay : trueDay"
                            :id="'day_'+day.id"
                            :key="day.id" 
                            @click="choosen" 
                            > 
                            {{day.numOfMonth}}
                        </td>
                    </tr>
                    <tr> 
                        <td v-for="day in sixWeek" 
                            :class="day.disabled ? disDay : trueDay"
                            :id="'day_'+day.id"
                            :key="day.id" 
                            @click="choosen" 
                            >
                            {{day.numOfMonth}}
                        </td>
                    </tr>
                </tbody>
                <tfoot class="button-wrapper">
                    <tr class="button-row">
                        <td class="cancel-button-wrapper">
                            <button class="cancel-button" @click="$emit('close-calendar')">
                                Отмена
                            </button>
                        </td>
                        <td class="refresh-wrapper">
                            <button class="refresh" :disabled="isDisabled" @click="sendData">Обновить</button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Calendar',
    data(){
        return {
            currDate: new Date(),
            isDisabled: false,
            currMonth: 0,
            currYear: 0,
            countDaysInMonth: 0,
            dayFirst: 0,
            dayLast: 0,
            arrDayInMonth: [],
            flagFirst: 0,
            flagLast: 0,
            firstWeek: [],
            secondWeek: [],
            thirdWeek: [],
            fourthWeek: [],
            fifthWeek: [],
            sixWeek: [],
            is30: true,
            trueDay: 'day',
            disDay: 'day1',
            month: [
                'Январь', 'Февраль',
                'Март', 'Апрель', 'Май', 
                'Июнь', 'Июль', 'Август',
                'Сентябрь', 'Октябрь', 'Ноябрь',
                'Декабрь'
            ],
        }
    },
    mounted(){
        this.currMonth = this.currDate.getMonth();
        this.currYear = this.currDate.getFullYear();
        this.showMonth();
        this.chooseToday();
    },
    updated(){
        if(this.flagFirst >= 0 && this.flagLast !== 0){
            document.getElementById('day_'+this.flagFirst).className = 'day-choose1';
                for (let i = this.flagFirst+1; i<this.flagLast; i++){                
                document.getElementById('day_'+i).className = 'day-between';
            }
            document.getElementById('day_'+this.flagLast).className = 'day-choose2';
        } else if(this.flagFirst !== 0 && this.flagLast === 0 ){
            document.getElementById('day_'+this.flagFirst).classList.value = 'day-choose';
        } else if(this.flagFirst <= 0 && this.flagLast !== 0){
            for (let i = 1; i<this.flagLast; i++){                
                document.getElementById('day_'+i).className = 'day-between';
            }
            document.getElementById('day_'+this.flagLast).className = 'day-choose2';
        }
    },
    methods: {
        showMonth(){
            const dayIn = new Date(this.currYear, this.currMonth, 1).getDay();
            this.arrDayInMonth = []; 
            this.firstWeek = [];
            this.secondWeek = []; 
            this.thirdWeek  = [];
            this.fourthWeek = [];
            this.fifthWeek = [];
            this.sixWeek = [];
            this.countDaysInMonth = new Date(this.currYear, this.currMonth+1, 0).getDate();
            this.dayLast = new Date(this.currYear, this.currMonth, this.countDaysInMonth).getDay();
            if(new Date(this.currYear, this.currMonth, 1).getDay() === 0){
                this.dayFirst = 6;    
            } else{
                this.dayFirst = dayIn-1;
            }

            for(let i = 1; i<=this.countDaysInMonth; i++){
                this.arrDayInMonth.push(i);
            }
            const lastMonthDays = new Date(this.currYear, this.currMonth, 0).getDate();
            if(this.dayFirst>=1){
                for(let i = 1; i<=this.dayFirst; i++){
                    this.firstWeek.push({
                        id: i-this.dayFirst, 
                        numOfMonth: lastMonthDays-(this.dayFirst-i), 
                        disabled: true
                    });
                }
                for(let j = 1; j<=7-this.dayFirst; j++){
                    this.firstWeek.push({id: j, numOfMonth: j, disabled: false});
                    this.arrDayInMonth.shift();
                }
            } else {
                for(let i = 1; i <= 7; i++){
                    this.firstWeek.push({id: i, numOfMonth: i, disabled: false});
                    this.arrDayInMonth.shift();
                }
            }
            for(let j=1; j<=21; j++){
                if(this.secondWeek.length<7){
                    this.secondWeek.push({
                        id: this.arrDayInMonth[0], 
                        numOfMonth: this.arrDayInMonth[0], 
                        disabled: false
                    });
                    this.arrDayInMonth.shift();
                } else if(this.thirdWeek.length<7){
                    this.thirdWeek.push({
                        id: this.arrDayInMonth[0], 
                        numOfMonth: this.arrDayInMonth[0], 
                        disabled: false
                    });
                    this.arrDayInMonth.shift();
                } else {
                    this.fourthWeek.push({
                        id: this.arrDayInMonth[0], 
                        numOfMonth: this.arrDayInMonth[0], 
                        disabled: false
                    });
                    this.arrDayInMonth.shift();
                }
            }        
            let nextDays = 1;            
            const atLEAST = this.arrDayInMonth.length;
            if(this.arrDayInMonth.length<=7){
                if(this.arrDayInMonth.length !== 0){
                    for(let x = 1; x<=atLEAST; x++){                        
                        this.fifthWeek.push({
                            id: this.arrDayInMonth[0], 
                            numOfMonth: this.arrDayInMonth[0], 
                            disabled: false
                        });
                        this.arrDayInMonth.shift();
                    }
                }
                while(this.fifthWeek.length !== 7){
                    this.fifthWeek.push({
                            id: this.countDaysInMonth+nextDays, 
                            numOfMonth: nextDays, 
                            disabled: true
                    });
                    nextDays++
                    this.arrDayInMonth.shift();
                }
                for(let i = 1; i<=7; i++){
                    this.sixWeek.push({
                            id: this.countDaysInMonth+nextDays, 
                            numOfMonth: nextDays, 
                            disabled: true
                    });
                    nextDays++
                }
            } else {
                for(let i = 1; i<=atLEAST; i++){
                    if(this.fifthWeek.length<7){
                        this.fifthWeek.push({
                            id: this.arrDayInMonth[0], 
                            numOfMonth: this.arrDayInMonth[0],
                            disabled: false
                        });
                        this.arrDayInMonth.shift();
                    } else {
                        this.sixWeek.push({
                            id: this.arrDayInMonth[0], 
                            numOfMonth: this.arrDayInMonth[0],
                            disabled: false
                        });
                        this.arrDayInMonth.shift();                        
                    }
                }
                while(this.sixWeek.length !== 7){
                    this.sixWeek.push({
                        id: this.countDaysInMonth+nextDays, 
                        numOfMonth: nextDays,
                        disabled: true
                    });
                    nextDays++;
                }
            }                   
        },
        nextMonth(){
            document.getElementById('radio1').checked = true;
            if(this.currMonth !== 11)this.currMonth += 1;
            else {
                this.currMonth = 0;
                this.currYear +=1;     
            }        
            this.cleanDate();            
            this.showMonth();            
            this.flagFirst = 0;
            this.flagLast = 0;      
            this.isDisabled = true;      
        },
        prevMonth(){
            document.getElementById('radio1').checked = true;
            if(this.currMonth !== 0)this.currMonth -= 1;
            else {
                this.currMonth = 11;
                this.currYear -=1;     
            }
            this.cleanDate();
            this.showMonth();            
            this.flagFirst = 0;
            this.flagLast = 0;           
            this.isDisabled = true; 
        }, 
        choosen(e){
            if(e.target.classList.value === "day" || e.target.classList.value === "day-between"){
                const choosenDay = parseInt(e.target.innerHTML);     
                document.getElementById('radio1').checked = true;           
                if(this.flagFirst === 0 && this.flagLast === 0){
                    this.cleanDate();
                    this.flagFirst = choosenDay;
                    e.target.classList.value = "day-choose";
                    this.isDisabled = true;
                } else if(this.flagFirst !== 0 && this.flagLast === 0){
                    this.isDisabled = false;
                    this.cleanDate();
                    if(this.flagFirst > choosenDay){
                        this.flagLast = this.flagFirst;
                        this.flagFirst = choosenDay;
                        document.getElementById('day_'+this.flagFirst).className = 'day-choose1'
                        for(let i = this.flagFirst+1; i <this.flagLast; i++){
                            document.getElementById('day_'+i).classList.value = 'day-between';
                        }
                        document.getElementById('day_'+this.flagLast).className = 'day-choose2'
                    } else if(this.flagFirst < choosenDay){
                        this.flagLast = choosenDay;
                        document.getElementById('day_'+this.flagFirst).className = 'day-choose1'
                        for(let i = this.flagFirst+1; i <this.flagLast; i++){
                            document.getElementById('day_'+i).classList.value = 'day-between';
                        }
                        document.getElementById('day_'+this.flagLast).className = 'day-choose2'
                    }
                } else {
                    if(document.querySelectorAll('.day-choose').length>0 || document.querySelectorAll('.day-choose1').length>0){
                        this.cleanDate();
                    }
                    if(this.flagFirst < choosenDay && this.flagLast > choosenDay) {
                        const between = Math.round((this.flagFirst+this.flagLast)/2);
                        if(between > choosenDay){
                            this.flagFirst = choosenDay;
                            document.getElementById('day_'+this.flagFirst).className = 'day-choose1'
                            for(let i = this.flagFirst+1; i <this.flagLast; i++){
                                document.getElementById('day_'+i).classList.value = 'day-between';
                            }
                            document.getElementById('day_'+this.flagLast).className = 'day-choose2'
                        } else {            
                            this.flagLast = choosenDay;
                            document.getElementById('day_'+this.flagFirst).className = 'day-choose1'
                            for(let i = this.flagFirst+1; i <this.flagLast; i++){
                                document.getElementById('day_'+i).classList.value = 'day-between';
                            }
                            document.getElementById('day_'+this.flagLast).className = 'day-choose2'
                        }
                    } else {
                        this.flagFirst = choosenDay;
                        this.flagLast = 0;   
                        this.isDisabled = true;
                        document.getElementById('day_'+choosenDay).classList.value = 'day-choose';
                    }
                }
            }
            
            
        },
        cleanDate(){                                    
            while(document.querySelectorAll('.day-between').length>0){
                document.querySelectorAll('.day-between')[0].classList.value = "day";
            }                   
            if(document.querySelectorAll('.day-choose1').length>0){
                document.querySelectorAll('.day-choose1')[0].classList.value = "day";
            }
            if(document.querySelectorAll('.day-choose').length>0){
                document.querySelectorAll('.day-choose')[0].classList.value = "day";
            }
            if(document.querySelectorAll('.day-choose2').length>0){
                document.querySelectorAll('.day-choose2')[0].classList.value = "day";
            }
        },
        chooseToday(){
            this.cleanDate();
            this.currMonth = this.currDate.getMonth();
            this.currYear = this.currDate.getFullYear();
            this.showMonth();
            this.flagFirst = this.currDate.getDate();
            this.flagLast = 0;           
            this.isDisabled = false;
        },
        chooseYesterday(){
            this.cleanDate();  
            this.isDisabled = false;
            if(this.currDate.getDate()-1 === 0){     
                if(this.currDate.getMonth() === 0){                
                    this.currMonth = 11;
                    this.currYear -= 1;                    
                    this.showMonth();
                    this.flagFirst = 31;
                    this.flagLast = 0;
                } else {                   
                    this.currMonth = this.currDate.getMonth()-1;
                    this.showMonth();
                    this.flagFirst = new Date(this.currYear, this.currMonth+1, 0).getDate();
                    this.flagLast = 0;
                    this.cleanDate();
                }
            } else {
                this.currMonth = this.currDate.getMonth();
                this.currYear = this.currDate.getFullYear();
                this.showMonth();
                this.flagFirst = this.currDate.getDate()-1;
                this.flagLast = 0;            
            }
        },
        thisMonth(){            
            this.isDisabled = false;
            if(document.querySelectorAll('.day-choose').length !== 0){
                this.cleanDate();
            }            
            this.currMonth = this.currDate.getMonth();
            this.currYear = this.currDate.getFullYear();
            this.showMonth();            
            this.flagFirst = 1;
            this.flagLast = this.countDaysInMonth;
        },
        lastMonth(){
            this.isDisabled = false;
            if(this.currDate.getMonth() === 0){
                this.currMonth = 11;
                this.currYear -= 1;
                if(document.querySelectorAll('.day-choose').length !== 0){
                    this.cleanDate();
                }
                this.showMonth();
                this.flagFirst = 1;
                this.flagLast = 31;                                 
            } else {
                this.currMonth -= 1;
                if(document.querySelectorAll('.day-choose').length !== 0){
                    this.cleanDate();
                }
                this.showMonth();                 
                this.flagFirst = 1;
                this.flagLast = this.countDaysInMonth;                
            }
        },
        startAgain(){
            this.cleanDate();
            this.flagFirst = 0;
            this.isDisabled = true;
        },
        last7Days(){
            this.isDisabled = false;
            this.cleanDate();
            if(this.currDate.getDate()-7 > 0){
                this.currMonth = this.currDate.getMonth();
                this.currYear = this.currDate.getFullYear();
                this.showMonth();
                this.flagFirst = this.currDate.getDate()-6;
                this.flagLast = this.currDate.getDate();     
                document.getElementById('day_'+this.flagFirst).className = 'day-choose1';
                for (let i = this.flagFirst+1; i<this.flagLast; i++){                
                    document.getElementById('day_'+i).className = 'day-between';
                }
                document.getElementById('day_'+this.flagLast).className = 'day-choose2';           
            } else {
                this.currMonth = this.currDate.getMonth();
                this.currYear = this.currDate.getFullYear();
                this.showMonth();
                this.flagFirst = this.currDate.getDate()-6;
                this.flagLast = this.currDate.getDate();
                this.is30 = false;
                for (let i = 1; i<this.flagLast; i++){                
                    document.getElementById('day_'+i).className = 'day-between';
                }
                document.getElementById('day_'+this.flagLast).className = 'day-choose2';
            }
        },
        last30Days(){
            this.isDisabled = false;
            this.cleanDate();
            if(this.currDate.getDate()-30 > 0){
                this.currMonth = this.currDate.getMonth();
                this.currYear = this.currDate.getFullYear();
                this.showMonth();
                this.flagFirst = this.currDate.getDate()-29;
                this.flagLast = this.currDate.getDate();     
                document.getElementById('day_'+this.flagFirst).className = 'day-choose1';
                for (let i = this.flagFirst+1; i<this.flagLast; i++){                
                    document.getElementById('day_'+i).className = 'day-between';
                }
                document.getElementById('day_'+this.flagLast).className = 'day-choose2';                          
            } else {
                this.currMonth = this.currDate.getMonth();
                this.currYear = this.currDate.getFullYear();
                this.showMonth();
                this.is30 = true;
                this.flagFirst = this.currDate.getDate()-29;
                this.flagLast = this.currDate.getDate();     
                for (let i = 1; i<this.flagLast; i++){                
                    document.getElementById('day_'+i).className = 'day-between';
                }
                document.getElementById('day_'+this.flagLast).className = 'day-choose2';                          
            }
        },
        sendData(){
            this.$emit('close-calendar');
            this.$store.commit('addFilter', 
                                {
                                    year: this.currYear, 
                                    month: this.currMonth, 
                                    day: this.flagFirst, 
                                    lastDay: this.flagLast
                                },                                
                              )
        }
    }
}
</script>