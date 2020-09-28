<template>
  <body id="app">
    <header class="header-page">
      <div class="header-page__logo">
        <img src="./styles/img/LOGO.jpg" alt="logo" class="logo"><p class="version">Beta</p>
      </div>
      <nav class="header-page__nav">
        <div class="notification">
          <img src="./styles/img/Notification.jpg" alt="icon-notification" class="notification__img">
        </div>
        <div class="name">
          <p class="name__title">Артем<span class="flag">&lsaquo;</span></p>
        </div>
        <div class="search">
          <i class="material-icons">search</i>
        </div>
        <div class="language">
          <p class="language__title">Ru <span class="flag">&lsaquo;</span></p>
        </div>
      </nav>
    </header>
    <main class="main-content">
      <aside class="aside-bar">
        <div class="aside-bar__select">
          <div class="aside-bar__select__choose">
            <p class="description">Эксперт</p>
            <span class="flag">&lsaquo;</span>
          </div>
          <img src="./styles/img/Buter.jpg" alt="" class="icon-sdw">
        </div>
        <div class="aside-bar__options">
          <div class="aside-bar__options-all first">
            <img src="./styles/img/Analytic.jpg" alt="Analytic" class="inside-img">
            <p class="description">Аналитика</p>
          </div>
          <div class="aside-bar__options-all">
            <img src="./styles/img/Product.jpg" alt="Product" class="inside-img">
            <p class="description">Продукт</p>
          </div>
          <div class="aside-bar__options-all users">
            <img src="./styles/img/Users.jpg" alt="Users" class="inside-img">
            <p class="description">Пользователи</p>
          </div>
          <div class="aside-bar__options-all">
            <img src="./styles/img/Construct.jpg" alt="Construct" class="inside-img">
            <p class="description">Конструктор сайта</p>
          </div>
          <div class="aside-bar__options-all">
            <img src="./styles/img/Broadcast.jpg" alt="Broadcast" class="inside-img">
            <p class="description">Трансляции</p>
          </div>
          <div class="aside-bar__options-all">
            <img src="./styles/img/Mails.jpg" alt="Mails" class="inside-img">
            <p class="description">Рассылка</p>
          </div>
          <div class="aside-bar__options-all">
            <img src="./styles/img/Marketing.jpg" alt="Marketing" class="inside-img">
            <p class="description">Маркетинг</p>
          </div>
          <div class="aside-bar__options-all">
            <img src="./styles/img/Payment.jpg" alt="Payment" class="inside-img">
            <p class="description">Платежи</p>
          </div>
          <div class="aside-bar__options-all last">
            <img src="./styles/img/Options.jpg" alt="Options" class="inside-img">
            <p class="description">Настройки</p>
          </div>
        </div>
      </aside>
        <section class="mail-section">
          <div class="mail-section__filter">
            <div class="mail-section__filter__wrapper">
              <div class="mail-section__filter__wrapper__filter-options">
                <div class="calendar" @click="calendarShow = true">
                  <div class="my-calendar"></div>
                  <p class="descriptions" v-if="this.$store.state.currFilter === ''">За 1 день</p>
                  <p class="descriptions filter" v-else>{{this.$store.state.currFilter}}</p>
                  <span class="flag">&lsaquo;</span>
                </div>
                <div class="filter-options">
                  <img src="./styles/img/Filter.jpg" alt="Filter" class="my-filter">
                  <p class="descriptions">Фильтр</p>
                  <span class="flag">&lsaquo;</span>
                </div>
              </div>
              <div class="mail-section__filter__wrapper__buttons">
                <button class="onload" v-if="this.$store.state.filters.length === 0">Выгрузить</button>
                <button class="add-contact">Добавить контакты</button>
              </div>
            </div>
            <Filters v-if="this.$store.state.filters.length > 0"/>
          </div>
          <div class="mail-section__mails">
            
          </div>
        </section>
        <section class="fake-slider">
          <div class="slider"></div>
        </section>
      
    </main>
    <Calendar v-if="calendarShow" @close-calendar="calendarShow = false"/>
  </body>
</template>

<script>
import Calendar from './components/Calendar.vue'
import Filters from './components/Filters.vue'

export default {
  name: 'App',
  components: {
    Calendar,
    Filters
  },
  data(){
    return{
      calendarShow: false
    }
  },
  methods: {
  }
}
</script>
