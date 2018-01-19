<template lang="pug">
  div
    .account(v-if="account" v-cloak)
      .account-image
        a(v-bind:href="account.image" target="_blank" title="Click To View")
          img(v-bind:src="account.image" width="100" height="100" v-bind:alt="imageAlt")
      h3(v-text="account.displayName")
      p View and manage your account

    div
      div(v-if="editing" v-cloak)
        p Edit Your Profile
        EditAccountForm

      div(v-else)
        div(v-if="account" v-cloak)
          p 
            | Information pulled from the firebase 
            code /account
            | dataset
          pre(v-text="`${JSON.stringify(account, null, 2)}`")

      div
        button(type="button" class="btn btn-primary mr-2" v-on:click="toggleEditForm")
          span(v-if="editing") Done
          span(v-else) Edit

        button(type="button" class="btn btn-danger" v-on:click="signOut") Sign Out
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
    ...mapState([
      'user',
      'account'
    ]),
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
          this.$router.push('/account/login')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .account-image 
    img
      border-radius 100px
      overflow hidden
      border 2px solid #b2b1b0

  pre
    white-space pre-wrap

</style>
