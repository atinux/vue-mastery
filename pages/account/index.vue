<template lang="pug">
  div
    .account(v-if="account" v-cloak)
      .account-image
        a(v-bind:href="account.image" target="_blank" title="Click To View")
          img(v-bind:src="account.image" width="100" height="100" v-bind:alt="imageAlt")
      h2.account-name(v-text="account.displayName")

      .account-actions
        button.button.secondary.border.-has-icon.-small(type="button" v-on:click="toggleEditForm")
          span(v-if="editing") Done
          span(v-else)
            i.fa.fa-cog
            | Edit Account

          //- button.button.primary.border.-small(type="button" class="btn btn-danger" v-on:click="signOut") Sign Out

    div.account-content
      div(v-if="editing" v-cloak)
        h3 Edit Your Profile
        EditAccountForm(:current="account")

      div(v-else)
        div.card(v-if="account" v-cloak)
          p
            | Information pulled from the firebase
            code /account
            | dataset
          pre(v-text="`${JSON.stringify(account, null, 2)}`")
</template>

<script>
import { mapState } from 'vuex'
import EditAccountForm from '~/components/account/EditAccountForm.vue'

export default {
  middleware: 'authenticated',
  components: {
    EditAccountForm
  },
  computed: {
    ...mapState({
      account: result => result.account.account
    }),
    imageAlt () {
      return `${this.account.displayName} profile image`
    }
  },
  data () {
    return {
      editing: false
    }
  },
  methods: {
    toggleEditForm () {
      this.editing = !this.editing
    },
    signOut () {
      this.$store.dispatch('userLogout')
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
@import '~assets/css/_variables.styl'
.account
  display grid
  justify-items center
  margin 0 4%
  border-bottom solid 2px $secondary-color
  grid-template-columns 1fr
  grid-template-areas "avatar"\
                      "account-name"\
                      "account-actions"

  +laptop-up()
    grid-template-columns 25% auto 25%
    grid-template-areas ". avatar ."\
                        "account-actions account-name ."


.account-image
  grid-area avatar
  width 100px

  img
    border-radius 100px
    overflow hidden

.account-name
  grid-area account-name
  color $secondary-color

.account-actions
  grid-area account-actions
  padding 0 4%
  +laptop-up()
    justify-self start

.account-content
  display flex
  justify-content center
  align-items center
  padding ($vertical-space/2) 4%
  > div
    width 100%
    +tablet-up()
      width 50%

pre
  white-space pre-wrap


</style>
