<template lang="pug">
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
        CourseList(:courses="inProgress" :account="account" v-if="Object.keys(inProgress).length !== 0" v-cloak)
        .empty(v-else)
          h3.empty-title You have no courses currently in progress

      div.completed-course-list
        aside.completed-course-list
          h3.title Completed Courses
          CourseList(:courses="completed" :account="account"
            v-if="Object.keys(completed).length !== 0" v-cloak)
          .empty(v-else)
            h5.empty-title You have not completed any courses yet

      aside.earned-badge-list
        h3.title Earned Badges
        CourseGrid(:courses="completed" :account="account"
          v-if="Object.keys(completed).length !== 0" v-cloak)
        .empty(v-else)
          h5.empty-title You have not completed any courses yet

      div.recommend-course-list
        h3.title Recommended Courses
        CourseGrid(:courses="recommended" :account="account" v-if="Object.keys(recommended).length !== 0" v-cloak)

    div.settings(v-else-if="selectedTab == 'Settings'" v-cloak)
      div.profile-settings(v-if="account" v-cloak)
        h3.title Edit Profile
        EditAccountForm(:current="account" :account="account")

      div.account-settings
        h3.title Edit Account
        //- TODO: Change password form.
        form.form.card
          label Change Password
          .form-group
            label.label New Password
            input.input(type="password" placeholder="New Password")

          .form-group
            label.label Confirm Password
            input.input(type="password" placeholder="Confirm Password")

          button.button.primary(type="button") Submit

        SubscribeToMailingList(:current="account")

      div.delete-account
        h3.title Delete Account
        p Are you sure you want to delete your account?

        button.button.danger.-has-icon.-small(type="button" v-on:click="deleteAccount")
          span
            i.fa.fa-cog
            | Delete Account
</template>

<script>
import { mapState } from 'vuex'
import EditAccountForm from '~/components/account/EditAccountForm.vue'
import SubscribeToMailingList from '~/components/account/SubscribeToMailingList.vue'
import CourseList from '~/components/courses/All.vue'
import CourseGrid from '~/components/courses/Grid.vue'

export default {
  middleware: 'authenticated',
  components: {
    EditAccountForm,
    SubscribeToMailingList,
    CourseList,
    CourseGrid
  },
  computed: {
    ...mapState({
      account: result => result.account.account,
      courses: result => result.courses.courses
    }),
    inProgress () {
      for (let courseId in this.courses) {
        let category = 'recommended'
        const course = this.courses[courseId]
        // Check if user started the course
        if (this.account.hasOwnProperty('courses') && this.account.courses.hasOwnProperty(course.slug)) {
          const startedCourse = this.account.courses[course.slug]
          if (startedCourse.hasOwnProperty('completedLessons')) {
            const completedLessons = Object.values(startedCourse.completedLessons).filter(completed => completed)
            // Check how many lessons are completed
            course.progression = Math.round(completedLessons.length / course.lessonsCount * 100)
            category = course.progression >= 100 ? 'completed' : 'uncompleted'
          }
        }
        // TODO: Swap completed Course image with badge ?
        // if (category = uncompleted) course.image[0].url = ....
        this[category][courseId] = course
      }
      return this.uncompleted
    },
    imageAlt () {
      return `${this.account.displayName} profile image`
    }
  },
  data () {
    return {
      tabs: ['Dashboard', 'Settings'],
      editing: false,
      selectedTab: 'Dashboard',
      completed: {},
      recommended: {},
      uncompleted: {}
    }
  },
  mounted: function () {
    this.$store.dispatch('getAllCourses')
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
                      "completed aside"\
                      "recommend recommend"

.main-course-list
  grid-area main
  margin-bottom $vertical-space
  .title
    color $secondary-color
    font-weight 600
    margin-bottom: 22px
    +tablet-up()
      font-size 40.5px

.completed-course-list
  grid-area completed
  margin-bottom ($vertical-space/2)
  .title
    color $secondary-color
    font-weight 600
    margin-bottom: 22px
    +tablet-up()
      font-size 40.5px

.recommend-course-list
  grid-area recommend
  margin-bottom $vertical-space
  .grid
    justify-content flex-start
  .title
    color $secondary-color
    font-weight 600
    margin-bottom: 22px
    +tablet-up()
      font-size 40.5px

.earned-badge-list
  grid-area aside
  .title
    color $primary-color
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

.settings > div
  margin-bottom $vertical-space
  .card
    margin-bottom: ($vertical-space/2)

pre
  white-space pre-wrap

</style>
