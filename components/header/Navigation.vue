<template lang="pug">
  .header
    .container
      nuxt-link.logo(to="/")
        span.visually-hidden Vue mastery
        img(src="/images/logo.png" role="logo")

      nav.navbar(role="navigation" aria-label="main navigation")
        .navbar-main
          router-link.navbar-item(to="/courses") Courses
          router-link.navbar-item(to="/about") About
        no-ssr
          .navbar-secondary(v-cloak v-if="accounts")
            button.button.primary.-small(type="button" v-on:click="signOut") Sign Out
            nuxt-link.navbar-profile(to="/account")
              img(v-bind:src="accounts.photoURL" v-bind:alt="accounts.displayName")
          .navbar-secondary(v-cloak v-else)
            button.button.inverted.-small(type="button" v-on:click="openSignUp") Sign Up
            button.button.primary.-small(type="button" v-on:click="openLogin") Login

    no-ssr
      modal(name="login-form" v-cloak height="auto")
        LoginForm
          button.button.link(type="button" v-on:click="openSignUp") Sign Up
          button.button.link(type="button" v-on:click="openPassword") Forgot your password?
    no-ssr
      modal(name="sign-up-form" v-cloak height="auto")
        SignupForm
          button.button.link(type="button" v-on:click="openLogin") I already have an account

    no-ssr
      modal(name="password-form" v-cloak height="auto")
        RetrievePasswordForm
          button.button.link(type="button" v-on:click="openLogin") Or Sign In!
</template>

<script>
import { mapState } from 'vuex'
import LoginForm from '~/components/account/LoginForm.vue'
import RetrievePasswordForm from '~/components/account/RetrievePassword.vue'
import SignupForm from '~/components/account/SignupForm.vue'

export default {
  components: {
    LoginForm,
    SignupForm,
    RetrievePasswordForm
  },
  computed: {
    ...mapState({
      accounts: result => result.accounts.user
    })
  },
  watch: {
    accounts () {
      this.$modal.hide('login-form')
      this.$modal.hide('sign-up-form')
    }
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
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    openLogin () {
      this.$modal.hide('sign-up-form')
      this.$modal.hide('password-form')
      this.$modal.show('login-form')
    },
    openSignUp () {
      this.$modal.hide('login-form')
      this.$modal.hide('password-form')
      this.$modal.show('sign-up-form')
    },
    openPassword () {
      this.$modal.hide('login-form')
      this.$modal.show('password-form')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/css/_variables.styl'

.container
.navbar
  height $header-height
  display flex
  flex-wrap wrap
  align-items center

.header
  // background-color: #A8D7DD
  height $header-height
  padding: 0 4%
  position: relative
  z-index: 2

  // &.index
  //   background-color: transparent

.navbar
  justify-content space-between
  flex: 1

.navbar-item
  padding-right 52px
  color #36495E
  font-family $font-family-base
  font-size 20px
  text-decoration: none;
  white-space nowrap

  &.nuxt-link-active
    text-decoration: underline

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

.navbar-secondary
  display: flex
  align-items: center

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
