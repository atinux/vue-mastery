<template lang="pug">
form.form.card
  .form-group
    label.label New Password
    input.input(:type="passwordFieldType" placeholder="New Password" v-model="newPassword")
    button(type="password" @click="switchVisibility") show / hide

  .form-group
    label.label Confirm Password
    input.input(:type="passwordFieldType" placeholder="Confirm Password" v-model="confirmPassword" @blur="validatePassword")

  .form-error
    .-is-error(v-if="formError.length > 0" v-text="formError")
    .-is-success(v-if="formSuccess.length > 0" v-text="formSuccess")

  button.button.primary(type="button" @click="updatePassword") Submit
</template>

<script>
export default {
  props: ['account'],
  data () {
    return {
      newPassword: '',
      confirmPassword: '',
      passwordFieldType: 'password',
      debounceTimer: setTimeout(() => {}),
      formError: '',
      formSuccess: ''
    }
  },
  methods: {
    resetFormMessages () {
      this.formSuccess = this.formError = ''
    },
    validatePassword () {
      this.resetFormMessages()
      if (this.confirmPassword !== this.newPassword) {
        this.formError = 'The two passwords don\'t match. Please verify your password'
        return false
      } else return true
    },
    updatePassword () {
      this.resetFormMessages()
      clearTimeout(this.debounceTimer)
      this.debounceTimer = setTimeout(() => {
        if (this.newPassword === '') {
          this.formError = 'Please enter a valid password'
          return false
        }
        if (this.validatePassword()) {
          this.$store.dispatch('userUpdatePassword', this.newPassword)
            .then(() => {
              this.formSuccess = 'Successfully updated your account password'
            })
            .catch((err) => {
              this.formError = 'Error saving your new password. Please try again later.'
              console.error(err)
            })
        }
      }, 500)
    },
    switchVisibility () {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~assets/css/_variables'

</style>
