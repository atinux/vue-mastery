<template lang="pug">
form(v-on:submit.prevent="signup")
  .form-group
    label.visually-hidden Email
    input.input.primary.-hollow(v-bind:class="{ 'is-danger': invalidEmail }" type="email" placeholder="New Account Email" v-model="email" autocomplete="email")

    p.error(v-if="invalidEmail" v-cloak) This email is invalid

  .form-group
    label.visually-hidden Password
    input.input.primary.-hollow(v-bind:class="{ 'is-danger': invalidPassword }" type="password" placeholder="New Account Password" v-model="password")

    p.error(v-if="invalidPassword" v-cloak) This password is invalid

  .form-group
    GoogleButton.button.inverted.primary.-small(label="Sign Up With Google")
    GithubButton.button.inverted.primary.-small(label="Sign Up With Github")
  
  .flash-error(v-if="formError.length > 0" v-text="formError" v-cloak)

  .form-checkbox
    label 
      input(type="checkbox" name="terms")
      span I accept the terms and conditions

  .form-actions
    button.button.primary(type="submit") Sign Up

  .form-footer
    slot
      nuxt-link(to="/account/login") I already have an account

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