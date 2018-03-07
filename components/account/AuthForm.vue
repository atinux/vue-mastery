<template lang="pug">
form.form(v-on:submit.prevent="submit")
  h3.form-title {{ title }}
  .form-header(v-if="header" v-html="header")

  .form-group
    .callout.-info(v-if="isNew" v-cloak)
      h4 Benefits for creating an account include:
      ul
        li The ability to track your progress as you complete lessons
        li Early access to lessons before we officially release them
        li Access to download our ultimate Vue.js Cheat Sheet

  .form-group
    label.label Email
    input.input(v-bind:class="{ '-is-error': invalidEmail }"
                type="email"
                placeholder="Account Email"
                @focus="isFocus = true"
                @blur="isFocus = false"
                v-model="email"
                autocomplete="email")
    span.help-text.-is-error(v-if="invalidEmail" v-cloak) This email is invalid

  .form-group(v-if="rememberPassword" v-cloak)
    label.label Password
    input.input(v-bind:class="{ '-is-error': invalidPassword }" :type="passwordFieldType" placeholder="Password" v-model="password")
    span.help-text.-is-error(v-if="invalidPassword" v-cloak) This password is invalid
    button(type="password" @click="switchVisibility") show / hide

  .form-group.-center(v-if="isNew" v-cloak)
    label.checkbox
      input(type="checkbox" name="terms" v-model="terms" @click="checkDisabled")
      span I accept the terms and conditions

  .form-error.text-center
    span.help-text.-is-error(v-if="formError.length > 0" v-text="formError" v-cloak)

  .form-actions(@click="checkDisabled")
    button.button.primary.-full(type="submit" :disabled="actionDisabled") {{ label }}
    .control-group.-spaced(v-if="rememberPassword" v-cloak)
      label {{ label }} with:
      GoogleButton.button.secondary.border.-has-icon.-small(:label="'Google'" :disabled="actionDisabled")
      GithubButton.button.secondary.border.-has-icon.-small(:label="'Github'" :disabled="actionDisabled")

  .form-footer
    .control-group(v-if="isNew" v-cloak)
      button.button.link(type="button" @click="switchForm") I already have an account
    .control-group.-separate(v-else)
      button.button.link(type="button" @click="switchForm" v-if="rememberPassword" v-cloak) Signup
      button.button.link(type="button" @click="retrievePassword" v-if="rememberPassword" v-cloak) Forgot your password?
      button.button.link(type="button" @click="switchForm(false)" v-if="!rememberPassword" v-cloak) Or Sign in
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
  props: {
    newAccount: {
      default: false
    },
    headerTitle: {
      default: false
    },
    header: {
      default: false
    }
  },
  data () {
    return {
      email: '',
      password: '',
      passwordFieldType: 'password',
      formError: '',
      isNew: this.newAccount,
      terms: !this.newAccount,
      rememberPassword: true,
      isFocus: false
    }
  },
  computed: {
    title () {
      if (this.headerTitle) return this.headerTitle
      let t = this.rememberPassword ? 'Welcome back!' : 'Retrieve your password'
      if (this.isNew) t = 'Let\'s Get You Signed Up.'
      return t
    },
    label () {
      let l = this.rememberPassword ? 'Log In' : 'Reset'
      if (this.isNew) l = 'Sign Up'
      return l
    },
    invalidEmail () {
      if (!this.isFocus) {
        return !this.email.includes('@') && this.email !== ''
      }
    },
    invalidPassword () {
      return !this.password.length > 6
    },
    actionDisabled () {
      return this.isNew ? !this.terms : false
    }
  },
  methods: {
    switchForm (isNew) {
      this.rememberPassword = true
      this.isNew = isNew === false ? isNew : !this.isNew
      this.terms = false
      this.formError = ''
    },
    retrievePassword () {
      this.rememberPassword = false
    },
    checkDisabled () {
      this.formError = ''
      if (!this.terms && this.isNew) this.formError = 'Please read and accept the terms and conditions'
    },
    checkForm () {
      let invalid = false
      if (this.rememberPassword) invalid = this.invalidPassword
      if (this.invalidEmail) invalid = true
      return invalid
    },
    submit () {
      // Check if the form is valid and display errors
      this.formError = ''
      if (this.checkForm()) return false

      // Define which action we do according to the state
      let action = 'userCreate'
      if (!this.isNew) {
        action = this.rememberPassword ? 'userLogin' : 'userRetrievePassword'
      }

      // Dispach information to the store
      this.$store.dispatch(action, {
        email: this.email,
        password: this.password
      })
        .then(() => {
          if (action === 'userRetrievePassword') {
            this.switchForm(false)
          }
        })
        .catch((error) => {
          console.log(error)
          this.formError = error.message
        })
    },
    switchVisibility () {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    }
  }
}
</script>

<style lang="stylus" scoped>
.form-actions .control-group label
  margin-right 2%
</style>
