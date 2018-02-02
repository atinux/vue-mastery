<template lang="pug">
form.form(v-on:submit.prevent="signup")
  .form-group
    label.label Email
    input.input(v-bind:class="{ '-is-error': invalidEmail }" type="email" placeholder="Account Email" v-model="email" autocomplete="email")
    span.help-text.-is-error(v-if="invalidEmail" v-cloak) This email is invalid

  .form-group
    label.label Password
    input.input(v-bind:class="{ '-is-error': invalidPassword }" type="password" placeholder="Password" v-model="password")
    span.help-text.-is-error(v-if="invalidPassword" v-cloak) This password is invalid

  .form-error
    .error(v-if="formError.length > 0" v-text="formError" v-cloak)

  .form-actions
    button.button.primary.-small(type="submit") Log In

  .form-actions
    GoogleButton.button.inverted.-small(label="Sign in with Google")
    GithubButton.button.inverted.-small(label="Sign in with Github")

  .form-footer.-spaced
    slot
      nuxt-link(to="/account/signup") Signup
      |
      nuxt-link(to="/account/password") Forgot your password?

</template>

<script>
import GoogleButton from '~/components/account/3rd-party/GoogleButton.vue'
import GithubButton from '~/components/account/3rd-party/GithubButton.vue'

export default {
  name: 'LoginForm',
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
      return !this.email.includes('@') && this.email !== ''
    },
    invalidPassword () {
      return !this.password.length > 6
    }
  },
  methods: {
    signup () {
      this.formError = ''
      this.$store.dispatch('userLogin', {
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
