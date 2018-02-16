<template lang="pug">
form.form(v-cloak v-if="account")
  .body
    span Notify me when new lessons are available.
    .switch
      input(id="subscribeSwitch" type="checkbox" :checked="isSubscribed()" @change="subscribedToMailingList")
      label(for="subscribeSwitch") Toggle
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
        const completedCourse = this.account.courses[this.course.slug]
        if (completedCourse) {
          subscribed = completedCourse.subscribed || false
        }
      }
      return subscribed
    },
    subscribedToMailingList () {
      this.$store.dispatch('userUpdateSubscribe', this.course.slug)
    }
  }
}
</script>
<style lang="stylus" scoped>
  .body
    display flex
    justify-content: space-evenly
    align-items: center
</style>
