<template lang="pug">
.settings

  div.account-settings
    h3.title Change Password

    ChangePassword(:account="account")

    h3.title Notifications

    SubscribeToMailingList(:account="account")

    div.delete-account
      h3.title Delete Account
      .card
        p Are you sure you want to delete your account?

        button.button.danger.-has-icon.-small(type="button" v-on:click="deleteAccount")
          span
            i.fa.fa-cog
            | Delete Account
</template>

<script>
import { mapState } from 'vuex'
import ChangePassword from '~/components/account/ChangePassword.vue'
import SubscribeToMailingList from '~/components/account/SubscribeToMailingList.vue'

export default {
  middleware: 'authenticated',
  components: {
    ChangePassword,
    SubscribeToMailingList
  },
  computed: {
    ...mapState({
      account: result => result.account.account
    })
  },
  methods: {
    deleteAccount () {
      this.$store.dispatch('deleteUser')
        .then(() => {
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/_variables'
.settings > div
  margin-bottom $vertical-space
  .card
    margin-bottom: ($vertical-space/2)
.account-settings
  width 100%
  +tablet-up()
    width 70%


.title
  color $secondary-color
  font-weight 600
  margin-bottom: 22px
  +tablet-up()
    font-size 40.5px
</style>
