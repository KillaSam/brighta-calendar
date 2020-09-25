<template>
    <table class="one-calendar">
        <thead>            
            <tr>
                <td class="arrow" @click="prevMonth()">‹</td>
                <td colspan="5" class="name-month">
                    <span id="month-cal">{{month[currMonth]}}</span> 
                    {{currYear}}
                </td>
                <td class="arrow" @click="nextMonth()">›</td>
            </tr>
        </thead>
        <tbody>
            <tr >
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
        <tfoot>
            <tr>
                <td>M</td>
                <td>T</td>
                <td>W</td>
                <td>T</td>
                <td>F</td>
                <td>S</td>                
                <td>S</td>
            </tr>
            <tr>
                <td><button @click="chooseToday">Today</button></td>
                <td><button @click="chooseYesterday">Yesterday</button></td>
                <td><button >7days</button></td>
                <td><button >30days</button></td>
                <td><button @click="thisMonth" >This month</button></td>
                <td><button >Last Month</button></td>
            </tr>
        </tfoot>
    </table>
</template>

<script>
export default {
    name: 'Calendar',
    data(){
        return {
            currDate: new Date(),
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
            trueDay: 'day',
            disDay: 'day1',
            month: [
                'January', 'February',
                'March', 'April', 'May', 
                'June', 'July', 'August',
                'September', 'October', 'November',
                'December'
            ],
        }
    },
    mounted(){
        this.currMonth = this.currDate.getMonth();
        this.currYear = this.currDate.getFullYear();
        this.showMonth();
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
            if(this.currMonth !== 11)this.currMonth += 1;
            else {
                this.currMonth = 0;
                this.currYear +=1;     
            }
            this.showMonth();
            if(document.querySelectorAll('.day-choose').length>0){
                while(document.querySelectorAll('.day-choose').length>0){
                    while(document.querySelectorAll('.day-between').length>0){
                        document.querySelectorAll('.day-between')[0].className = 'day';    
                    }
                    document.querySelectorAll('.day-choose')[0].className = 'day';
                }
                this.flagFirst = 0;
                this.flagLast = 0;
            }
        },
        prevMonth(){
            if(this.currMonth !== 0)this.currMonth -= 1;
            else {
                this.currMonth = 11;
                this.currYear -=1;     
            }            
            this.showMonth();
            if(document.querySelectorAll('.day-choose').length>0){
               while(document.querySelectorAll('.day-choose').length>0){
                    while(document.querySelectorAll('.day-between').length>0){
                        document.querySelectorAll('.day-between')[0].className = 'day';    
                    }
                    document.querySelectorAll('.day-choose')[0].className = 'day';
                }
                this.flagFirst = 0;
                this.flagLast = 0;
            }
        }, 
        choosen(e){
            if(e.target.className === "day" || e.target.className === "day-between"){
                const choosenDay = parseInt(e.target.innerHTML);
                if(this.flagFirst === 0 && this.flagLast === 0){
                    this.flagFirst = choosenDay;
                    e.target.className = "day-choose";
                } else if(this.flagFirst !== 0 && this.flagLast === 0){
                    if(this.flagFirst > choosenDay){
                        this.flagLast = this.flagFirst;
                        this.flagFirst = choosenDay;
                        for(let i = this.flagFirst; i <this.flagLast; i++){
                            document.getElementById('day_'+i).className = 'day-between';
                        }
                        e.target.className = "day-choose";
                    } else if(this.flagFirst < choosenDay){
                        this.flagLast = choosenDay;
                        for(let i = this.flagFirst+1; i <this.flagLast; i++){
                            document.getElementById('day_'+i).className = 'day-between';
                        }
                        e.target.className = "day-choose";
                    }
                } else {
                    if(this.flagFirst < choosenDay && this.flagLast > choosenDay) {
                        const between = Math.round((this.flagFirst+this.flagLast)/2);
                        if(between > choosenDay){
                            document.querySelectorAll('.day-choose')[0].className = "day";
                            for(let i = this.flagFirst+1; i<choosenDay; i++){
                                document.querySelectorAll('.day-between')[0].className = "day";
                                console.log('AAA');
                            }
                            document.querySelectorAll('.day-between')[0].className = "day-choose";
                            this.flagFirst = choosenDay;
                        } else {
                            document.querySelectorAll('.day-choose')[1].className = "day";
                            for(let i = choosenDay+1; i<this.flagLast; i++){
                                document.querySelectorAll('.day-between')[document.querySelectorAll('.day-between').length-1].className = "day";
                            }
                            document.querySelectorAll('.day-between')[document.querySelectorAll('.day-between').length-1].className = "day-choose";
                            this.flagLast = choosenDay;
                        }
                    } else {
                        while(document.querySelectorAll('.day-between').length>0){
                            document.querySelectorAll('.day-between')[0].className = 'day';    
                        }
                        this.flagFirst = choosenDay;
                        this.flagLast = 0;
                        document.querySelectorAll('.day-choose')[0].className = 'day';    
                        document.querySelectorAll('.day-choose')[0].className = 'day';    
                        document.getElementById('day_'+choosenDay).className = 'day-choose';
                    }
                }
            }
            
            
        },
        cleanDate(){
            while(document.querySelectorAll('.day-choose').length>0){
                document.querySelectorAll('.day-choose')[0].className = 'day';
            }
            while(document.querySelectorAll('.day-between').length>0){
                document.querySelectorAll('.day-between')[0].className = 'day';
            }          
        },
        chooseToday(){
            if(document.querySelectorAll('.day-choose').length !== 0){
                this.cleanDate();
            } 
            this.currMonth = this.currDate.getMonth();
            this.currYear = this.currDate.getFullYear();
            this.showMonth();
            this.flagFirst = this.currDate.getDate();
            this.flagLast = 0;
             
            document.getElementById('day_'+this.flagFirst).className = 'day-choose';
        },
        chooseYesterday(){
            //if(this.currDate.getDate()-1 === 0){
            if(this.arrDayInMonth.length === 0){
                if(this.currDate.getMonth() === 0){
                //if(this.arrDayInMonth.length === 0){
                    this.currMonth = 11;
                    this.currYear -= -1;
                    this.showMonth();
                    this.flagFirst = 31;
                    this.flagLast = 0;
                    this.cleanDate();
                    document.getElementById('day_'+this.flagFirst).className = 'day-choose';
                } else {
                   
                    this.currMonth = this.currDate.getMonth()-1;
                    this.showMonth();
                    this.flagFirst = new Date(this.currYear, this.currMonth+1, 0).getDate();
                    this.flagLast = 0;
                    if(document.querySelectorAll('.day-choose').length !== 0){
                        this.cleanDate();
                    }                
                    document.getElementById('day_'+this.flagFirst).className = "day-choose";
                    console.log(new Date(this.currYear, this.currMonth+1, 0).getDate());
                }
            } else {
                this.currMonth = this.currDate.getMonth();
                this.currYear = this.currDate.getFullYear();
                this.showMonth();
                this.flagFirst = this.currDate.getDate()-1;
                this.flagLast = 0;
                this.cleanDate();
                document.getElementById('day_'+this.flagFirst).className = 'day-choose';
            }
        },
        thisMonth(){            
            if(document.querySelectorAll('.day-choose').length !== 0){
                this.cleanDate();
            }            
            this.flagFirst = 0;
            this.flagLast = 0;
            this.currMonth = this.currDate.getMonth();
            this.currYear = this.currDate.getFullYear();
            this.showMonth();            
            this.flagFirst = 1;
            this.flagLast = new Date(this.currYear, this.currMonth+1, 0).getDate();
            document.getElementById('day_'+this.flagLast).className = 'day-choose';   
            for (let i = this.flagLast-1; i>this.flagFirst; i--){
                document.getElementById('day_'+i).className = 'day-between';
            }     
            document.getElementById('day_1').className = 'day-choose';   
        }
    }
}
</script>