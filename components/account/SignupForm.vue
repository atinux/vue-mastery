<template lang="pug">
form.form(v-on:submit.prevent="signup")
  .form-group
    label.label Email
    input.input(v-bind:class="{ '-is-error': invalidEmail }" type="email" placeholder="New Account Email" v-model="email" autocomplete="email")
    span.help-text.-is-error(v-if="invalidEmail" v-cloak) This email is invalid

  .form-group
    label.label Password
    input.input(v-bind:class="{ '-is-error': invalidPassword }" type="password" placeholder="New Account Password" v-model="password")
    span.help-text.-is-error(v-if="invalidPassword" v-cloak) This password is invalid

  .form-group
    label.checkbox
      input(type="checkbox" name="terms" v-model="terms" @click="checkDisabled")
      span I accept the terms and conditions

  .form-error
    .error(v-if="formError.length > 0" v-text="formError" v-cloak)

  .form-actions(@click="checkDisabled")
    button.button.primary.-small(type="submit") Sign Up
    .control-group
      GoogleButton.button.inverted.-small(label="Sign up with Google" :disabled="!terms")
      GithubButton.button.inverted.-small(label="Sign up with Github" :disabled="!terms")

  .form-footer
    slot
      nuxt-link.button.link.-small(to="/account/login") I already have an account
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
      terms: false,
      formError: ''
    }
  },
  computed: {
    invalidEmail () {
      return !this.email.includes('@') && this.email !== ''
    },
    invalidPassword () {
      return !this.password.length > 12
    }
  },
  methods: {
    signup () {
      this.formError = ''
      if (!this.terms) this.formError = 'Please read and accept the terms and conditions'
      else {
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
    },

    checkDisabled () {
      this.formError = ''
      if (!this.terms) this.formError = 'Please read and accept the terms and conditions'
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
