<template lang="pug">
form(v-on:submit.prevent="signup")
  .form-group
    label Email
    .control
      input.form-control(v-bind:class="{ 'is-danger': invalidEmail }" type="email" placeholder="New Account Email" v-model="email" autocomplete="email")

    p.help.is-danger(v-if="invalidEmail" v-cloak) This email is invalid

  .form-group
    label Password
    .control
      input.form-control(v-bind:class="{ 'is-danger': invalidPassword }" type="password" placeholder="New Account Password" v-model="password")

    p.help.is-danger(v-if="invalidPassword" v-cloak) This password is invalid

  .form-checkbox
    label 
      input(type="checkbox" name="terms")
      span I accept the terms and conditions

  slot
    .form-group
      nuxt-link(to="/account/login") I already have an account

  .form-actions
    button.button.primary(type="submit") Sign Up

  .form-actions
    GoogleButton.button.secondary(label="Sign Up With Google")

  .form-actions
    GithubButton.button.secondary(label="Sign Up With Github")

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

</style>