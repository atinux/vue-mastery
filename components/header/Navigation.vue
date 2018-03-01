<template lang="pug">
  nav.navbar(role="navigation" aria-label="main navigation" @click="closeNav()")
    .navbar-main
      router-link.navbar-item(to="/courses") Courses
      router-link.navbar-item(to="/about") About
      router-link.navbar-item(to="/contact") Contact
      router-link.navbar-item(to="/account" v-if="account") Dashboard
    no-ssr
      .navbar-secondary(v-cloak v-if="account")
        button.button.primary.-small(type="button" v-on:click="signOut") Sign Out
        nuxt-link.navbar-profile(to="/account?section=Profile")
          img(v-bind:src="account.image" v-bind:alt="account.displayName")
      .navbar-secondary(v-cloak v-else)
        button.button.inverted.-small(type="button" v-on:click="openSignUp") Sign Up
        button.button.primary.-small(type="button" v-on:click="openLogin") Login
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      account: result => result.account.account,
      openNav: result => result.openNav
    })
  },
  methods: {
    ...mapActions([
      'toggleNav'
    ]),
    closeNav () {
      if (this.openNav) {
        this.toggleNav()
      }
    },
    signOut () {
      this.$store.dispatch('userLogout')
        .then(() => {
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    openLogin () {
      this.$modal.show('login-form', { newAccount: false })
    },
    openSignUp () {
      this.$modal.show('login-form', { newAccount: true })
    },
    keyboardNav (e) {
      this.currentPage = this.pages.indexOf(this.$route.name.toLowerCase())

      // Map keyboard shorcut to navigation
      switch (e.keyCode) {
        case 13: { // Enter
          this.toggleNav()
          break
        }
        case 27: { // Escape
          this.toggleNav()
          break
        }
        case 39: { // Right
          // if (this.$route.name.match(/^(courses)$/)) this.nextLessons()
          break
        }
        case 40: { // Left
          // if (this.$route.name.match(/^(courses)$/)) this.previousLessons()
          break
        }
        default: { return null }
      }
      return this.currentPage
    },
    created () {
      // Map keyboard shorcut to navigation
      window.addEventListener('keyup', this.keyboardNav)
    },
    beforeDestroy () {
      window.removeEventListener('keyup')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/_variables'

.navbar
  position: fixed
  height 100%
  display flex
  flex-wrap wrap
  align-items center
  justify-content center
  flex 1
  left 0
  width 100%
  flex-direction column
  background-color #fff
  opacity 0
  transition opacity .2s ease-in
  pointer-events: none
  top 0

  +laptop-up()
    background-color transparent
    pointer-events: none
    opacity: 1
    justify-content space-between
    position relative
    height $header-height
    flex-direction: row

.navbar-item
  color $secondary-color
  font-family $font-family-base
  font-size 20px
  text-decoration none
  white-space nowrap
  opacity: 0

  &.nuxt-link-active
    font-weight 700

  &:last-child
    padding-right 0

  +laptop-up()
    opacity: 1
    padding-right 52px

.button
  opacity: 0
  font-size: 20px

  + button
    margin 0

  +laptop-up()
    font-size: 18px
    opacity: 1


.navbar-main,
.navbar-secondary
  display: flex
  flex-direction: column
  height: 210px
  text-align: center
  justify-content: space-evenly
  align-items: center
  pointer-events: initial

  +laptop-up()
    flex-direction: row
    height: $header-height
    .button
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

<style lang="stylus">
@import '~assets/css/_variables'

.open-nav
  max-height: 100vh
  overflow: hidden

  +laptop-up()
    max-height 100%

  .navbar
    pointer-events: initial
    opacity: 1

  .button,
  .navbar-item
    opacity: 1
    transition-duration: .4s
    for i in (1..2)
      &:nth-child({i})
        transition-delay: (i*100)ms

  .button
    for i in (1..2)
      &:nth-child({i})
        transition-delay: (i*100 + 200)ms
</style>
