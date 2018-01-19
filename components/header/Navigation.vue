<template lang="pug">

  .header
    .container
      nuxt-link.logo(to="/")
        span.visually-hidden Vue mastery
        img(src="/images/logo.png" role="logo")

      nav.navbar(role="navigation" aria-label="main navigation")
        .navbar-main
          nuxt-link.navbar-item(to="/courses") Courses
          nuxt-link.navbar-item(to="/about") About
        .navbar-secondary(v-cloak v-if="user")
          button.btn(type="button" v-on:click="signOut") Sign Out
          nuxt-link.navbar-profile(to="/account")
            img(v-bind:src="account.image" v-bind:alt="account.displayName")
        .navbar-secondary(v-cloak v-else)
          nuxt-link.btn.white(to="/account/signup") Sign Up
          nuxt-link.btn(to="/account/login") Login
  
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'user',
      'account'
    ])
  },
  data () {
    return {
      editing: false
    }
  },
  methods: {
    signOut () {
      this.$store.dispatch('userLogout')
        .then(() => {
          this.$router.push('/account/login')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
$header-height = 100px
$green = #39B982

.btn
  height 44px
  width 100px
  font-size 18px
  border-radius 22px
  border none
  color #fff
  background $green
  border 1px solid #ffffff
  display flex
  justify-content center
  align-items center
  
  &:hover
    border-color $green
    background #ffffff
    color $green

  &.white
    border-color $green
    background #ffffff
    color $green
    &:hover
      border-color #ffffff
      background $green
      color #ffffff


.container
.navbar
  height $header-height
  display flex
  flex-wrap wrap
  align-items center

.header
  box-shadow 0 1px 0 0 #E4E4E4
  background-color: #fff
  height $header-height

.navbar
  justify-content space-between
  flex: 1

.navbar-item
  white-space nowrap
  color #36495E
  font-family "Source Sans Pro"
  font-size 20px
  padding-right 52px
  &:last-child
    padding-right 0

.logo
  display block
  max-width 282px
  min-width 200px
  margin-right 70px
  margin-top -10px

  img
    display block
    width 100%

.visually-hidden
  border 0
  clip rect(0 0 0 0)
  height 1px
  margin -1px
  overflow hidden
  padding 0
  position absolute
  width 1px

.navbar-secondary
  display: flex
  align-items: center

  .btn
    margin-left 18px

.navbar-profile
  display flex
  margin-left 18px
  border-radius 50%
  overflow hidden
  box-shadow 0 1px 0 0 #E4E4E4
  width 40px
  height 40px

  img
    width 100%

</style>