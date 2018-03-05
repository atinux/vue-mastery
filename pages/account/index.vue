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
          div
            h4.empty-title You have no courses currently in progress
            p Get started by browsing our recommended course list.
            button.button.secondary.border.-small(type="button" @click="scrollTo" data-target="recommended") Browse Courses

      div.completed-course-list
        aside.completed-course-list
          h3.title Completed Courses
          CourseList(:courses="completed" :account="account"
            v-if="Object.keys(completed).length !== 0" v-cloak)
          .empty(v-else)
            h4.empty-title You have not completed any courses yet

      //- aside.earned-badge-list
      //-   h3.title Earned Badges
      //-   BadgeGrid(:courses="completed" :account="account"
      //-     v-if="Object.keys(completed).length !== 0" v-cloak)
      //-   .empty(v-else)
      //-     h5.empty-title You have not completed any courses yet

      aside.recommend-course-list
        .card.download
          h3 Download the Vue Cheat Sheet
          p All the essential syntax at your fingertips
          DownloadButton(buttonClass='inverted')
        #recommended
          h3.title Recommended Courses
          CourseGrid(:courses="recommended" :account="account" v-if="Object.keys(recommended).length !== 0" v-cloak)

    div.settings(v-if="selectedTab == 'Profile'" v-cloak)
      .profile-settings
        h3.title Update Profile
        EditAccountForm(:account="account")

    div(v-else-if="selectedTab == 'Account Settings'" v-cloak)
      AccountSettings
</template>

<script>
import { mapState } from 'vuex'
import EditAccountForm from '~/components/account/EditAccountForm.vue'
import CourseList from '~/components/courses/All.vue'
import CourseGrid from '~/components/courses/Grid.vue'
import BadgeGrid from '~/components/courses/BadgeGrid.vue'
import AccountSettings from '~/components/account/AccountSettings.vue'
import DownloadButton from '~/components/static/DownloadButton'

export default {
  middleware: 'authenticated',
  components: {
    EditAccountForm,
    CourseList,
    CourseGrid,
    BadgeGrid,
    AccountSettings,
    DownloadButton
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
            const completedLessons = Object.values(startedCourse.completedLessons).filter(completed => completed).length
            // Check how many lessons are completed

            course.progression = `${completedLessons} / ${course.lessonsCount} lesson${completedLessons > 1 ? 's' : ''} completed`
            category = completedLessons >= course.lessonsCount ? 'completed' : 'uncompleted'
          }
        }
        // TODO: Swap completed Course image with badge ?
        // if (category = uncompleted) course.image[0].url = ...
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
      tabs: ['Dashboard', 'Profile', 'Account Settings'],
      editing: false,
      selectedTab: this.$route.query.section || 'Dashboard',
      completed: {},
      recommended: {},
      uncompleted: {}
    }
  },
  mounted () {
    this.$store.dispatch('getAllCourses')
  },
  methods: {
    toggleEditForm () {
      this.editing = !this.editing
    },
    scrollTo: function (e) {
      let target = e.currentTarget.dataset.target
      let element = document.getElementById(target)
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      element.classList.add('-flash')
      setTimeout(function () {
        element.classList.remove('-flash')
      }, 1000)
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
@import '~assets/css/_variables'
.settings
  display flex
  justify-content center
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
  grid-template-areas "main"\
                      "recommend"\
                      "completed"
  +laptop-up()
    grid-template-columns 63% 33%
    grid-column-gap: 4%
    grid-template-areas "main recommend"\
                        "completed recommend"\


.main-course-list,
.completed-course-list,
.recommend-course-list,
.earned-badge-list,
.profile-settings
  .title
    color $secondary-color
    font-weight 600
    margin-bottom: 22px
    +tablet-up()
      font-size 40.5px

.main-course-list
  grid-area main
  margin-bottom $vertical-space

.completed-course-list
  grid-area completed
  grid-row span 2
  margin-bottom ($vertical-space/2)

.recommend-course-list
  grid-area recommend
  margin-bottom $vertical-space

.earned-badge-list
  grid-area aside
  margin-bottom $vertical-space

.account-actions
  display flex
  justify-content start
  margin-bottom: ($vertical-space/2)
  border-bottom solid 2px $secondary-color

.download
  // display flex
  // flex-direction column
  color white
  text-align center
  align-items center
  background-image url(/images/bkg-cheatsheet-main.jpg)
  margin-bottom ($vertical-space/2)
  .button
    margin 0 auto

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

.profile-settings
  width 100%
  margin-bottom: $vertical-space
  +tablet-up()
    width 70%

</style>
