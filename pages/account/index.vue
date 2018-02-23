<template lang="pug">
  div
    .wrapper
      .account(v-if="account" v-cloak)
        .account-image
          a(v-bind:href="account.image" target="_blank" title="Click To View")
            img(v-bind:src="account.image" width="100" height="100" v-bind:alt="imageAlt")
        .account-info
          h3(v-text="account.displayName")

      .account-actions
        button.tab(type="button" v-for="tab in tabs" @click="selectedTab = tab" :class="{'active-tab': selectedTab == tab}") {{ tab }}

      div.account-content
        div.course-list(v-if="selectedTab == 'Dashboard'" v-cloak)
          div.main-course-list
            h3.title In Progress
            //- TODO: Add percentage completed above Action
            CourseList
          aside.completed-course-list
            h3.title Completed Courses
            //- TODO: Add list of completed courses with Course image swapped with badge
            CourseList
          div.recommend-course-list
            h3.title Recommended Courses
            //- TODO: Add all courses not already in progress list.
            CourseList
        div(v-else-if="selectedTab == 'Settings'" v-cloak)
          h4 Settings
          h3 Edit Your Profile
          div(v-if="account" v-cloak)
            EditAccountForm(:current="account")
          button.button.secondary.-has-icon.-small(type="button" v-on:click="deleteAccount")
            span
              i.fa.fa-cog
              | Delete Account
          //- pre(v-text="`${JSON.stringify(account, null, 2)}`")
</template>

<script>
import { mapState } from 'vuex'
import EditAccountForm from '~/components/account/EditAccountForm.vue'
import CourseList from '~/components/courses/All.vue'

export default {
  middleware: 'authenticated',
  components: {
    EditAccountForm,
    CourseList
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
      tabs: ['Dashboard', 'Settings'],
      editing: false,
      selectedTab: 'Dashboard'
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
    },
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
.account
  display flex
  justify-items flex-start
  align-items center
  margin ($vertical-space/3) 0

.account-image
  margin-right 20px
  width 100px

  img
    border-radius 100px
    overflow hidden

.account-info
  color $secondary-color

.course-list
  display grid
  grid-template-columns 63% 33%
  grid-column-gap: 4%
  grid-template-areas "main aside"\
                      "recommend recommend"

.main-course-list
  grid-area main

  .title
    color $secondary-color
    font-weight 600
    margin-bottom: 22px
    +tablet-up()
      font-size 40.5px

.completed-course-list
  grid-area aside
  .title
    color $primary-color
    font-weight 600
    margin-bottom: 22px
    +tablet-up()
      font-size 40.5px

.recommend-course-list
  grid-area recommend
  .title
    color $secondary-color
    font-weight 600
    margin-bottom: 22px
    +tablet-up()
      font-size 40.5px


.account-actions
  display flex
  justify-content start
  margin-bottom: ($vertical-space/2)
  border-bottom solid 2px $secondary-color

.tab
  display inline-block
  height $button-height-small
  width max-content
  margin 0.25em 0
  padding 0 10px
  color $gray
  text-decoration none
  text-align center
  line-height $button-height-small
  border none
  cursor pointer

  &:focus
    outline none

.active-tab
  color $secondary-color
  font-weight 600

pre
  white-space pre-wrap

</style>
