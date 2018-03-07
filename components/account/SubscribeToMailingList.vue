<template lang="pug">
form.form.card
  .form-group.-switched
    .switch
      input(id="subscribeSwitch" type="checkbox" v-model="subscribedToMailingList" v-on:change="subscribe")
      label(for="subscribeSwitch")
    span I want to receive occasional emails about new educational content

  .form-error
    .callout.-error(v-if="formError.length > 0" v-text="formError")
    .callout.-success(v-if="formSuccess.length > 0" v-text="formSuccess")
</template>

<script>
export default {
  props: ['account'],
  data () {
    return {
      subscribedToMailingList: this.account.subscribedToMailingList,
      debounceTimer: setTimeout(() => {}),
      formError: '',
      formSuccess: ''
    }
  },
  methods: {
    resetFormMessages () {
      this.formSuccess = this.formError = ''
    },
    subscribe () {
      this.resetFormMessages()
      clearTimeout(this.debounceTimer)
      this.debounceTimer = setTimeout(() => {
        console.info('update subscribedToMailingList')
        this.$store.dispatch('userUpdateSubscription', this.subscribedToMailingList)
          .then(() => {
            this.formSuccess = 'Successfully updated your account details'
          })
          .catch((err) => {
            this.formError = 'Error saving the profile changes'
            console.error(err)
          })
      }, 500)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~assets/css/_variables'
.form-group.-switched
  display flex
  flex-direction: row
  align-items center
</style>
