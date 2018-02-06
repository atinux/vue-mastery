<template lang="pug">
form.form
  .form-group
    label.checkbox
      input(type="checkbox" v-model="subscribed" v-on:change="subscribedToMailingList")
      | I want to get notified when there is new lesson available for this course

  .form-error
    .error(v-if="formError.length > 0" v-text="formError")
    .success(v-if="formSuccess.length > 0" v-text="formSuccess")

</template>

<script>
export default {
  props: ['course'],
  data () {
    return {
      subscribed: this.course.subscribed,
      debounceTimer: setTimeout(() => {}),
      formError: '',
      formSuccess: ''
    }
  },
  methods: {
    resetFormMessages () {
      this.formSuccess = this.formError = ''
    },
    subscribedToMailingList () {
      this.resetFormMessages()
      clearTimeout(this.debounceTimer)
      this.debounceTimer = setTimeout(() => {
        this.$store.dispatch('userUpdateSubscribe', {
          subscribed: this.subscribed,
          courseId: this.course.id
        })
      }, 500)
    }
  }
}
</script>
