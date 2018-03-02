<template lang="pug">
  no-ssr
    .locked-action
      h3 This lesson is locked.
      h5 If you wish to take this lesson please,
      button.button.primary.-small(v-cloak @click="openLogin") Unlock content
</template>

<script>
export default {
  name: 'unlockButton',
  props: ['courseLink', 'account'],
  methods: {
    openLogin () {
      this.$modal.show('login-form', {
        newAccount: true,
        headerTitle: 'Sign up and unlock the content',
        header: 'Please create a free account to unlock the content of the course.'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/_variables'
.locked-action
  position absolute
  top 50%
  left 50%
  background #fff
  padding 40px
  width max-content
  text-align center
  transform translate(-50%, -50%)
  border-radius 6px
  border solid 1px #eee
  color $secondary-color
  h5
    font-weight 600
</style>
