<template lang="pug">
form.form(v-cloak v-if="account")
  label.checkbox
    input(type="checkbox" :checked="isSubscribed()" @change="subscribedToMailingList")
    | I want to get notified when there is new lesson available for this course

</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      account: result => result.account.account,
      course: result => result.courses.course
    })
  },
  methods: {
    isSubscribed () {
      let subscribed = false
      if (this.account && typeof (this.account['courses']) !== 'undefined') {
        const completedCourse = this.account.courses[this.course.id]
        if (completedCourse) {
          subscribed = completedCourse.subscribed || false
        }
      }
      return subscribed
    },
    subscribedToMailingList () {
      this.$store.dispatch('userUpdateSubscribe', this.course.id)
    }
  }
}
</script>
