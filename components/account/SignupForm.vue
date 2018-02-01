<template lang="pug">
form(v-on:submit.prevent="signup")
  fieldset
    legend.h2 Sign Up
    .form-group
      label Email
      input.input(v-bind:class="{ '-is-error': invalidEmail }" type="email" placeholder="New Account Email" v-model="email" autocomplete="email")
      span.help-text.-is-error(v-if="invalidEmail" v-cloak) This email is invalid

    .form-group
      label Password
      input.input(v-bind:class="{ 'is-danger': invalidPassword }" type="password" placeholder="New Account Password" v-model="password")
      span.help-text.-is-error(v-if="invalidPassword" v-cloak) This password is invalid

    .form-group
      label.checkbox
        input(type="checkbox" name="terms")
        span I accept the terms and conditions

    slot
      .form-group
        nuxt-link(to="/account/login") I already have an account

    .form-actions
      button.button.primary.-small(type="submit") Sign Up

    .form-actions
      GoogleButton.button.secondary.-small(label="Sign Up With Google")

    .form-actions
      GithubButton.button.secondary.-small(label="Sign Up With Github")
</template>

<script>
import GoogleButton from '~/components/account/3rd-party/GoogleButton.vue'
import GithubButton from '~/components/account/3rd-party/GithubButton.vue'

export default {
  name: 'SignupForm',
  components: {
    GoogleButton,
    GithubButton
  },
  data () {
    return {
      email: '',
      password: '',
      formError: ''
    }
  },
  computed: {
    invalidEmail () {
      return false // !this.email.includes('@')
    },
    invalidPassword () {
      return false // !this.password.length > 12
    }
  },
  methods: {
    signup () {
      this.formError = ''
      this.$store.dispatch('userCreate', {
        email: this.email,
        password: this.password
      })
        .then(() => {
          this.$router.push('/account')
        })
        .catch((error) => {
          console.log(error)
          this.formError = error.message
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~assets/css/_variables.styl'
</style>
