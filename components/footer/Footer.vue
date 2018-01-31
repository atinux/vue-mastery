<template lang="pug">
  .section
    .wrapper
      .brand
        nuxt-link.logo(to="/")
          span.visually-hidden Vue mastery
          img(src="/images/lgo-vue-mastery-white.png" role="logo")
        p A small summary paragraph talking about what Vue Mastery is. Maybe even adding it’s connection to CodePop here as well. Thoughts?
      .nav
        h4 Navigate
        ul
          li
            nuxt-link(to='/courses' class="-inverted") Courses
          li
            nuxt-link(to='/about' class="-inverted") About
          li
            nuxt-link(to='/contact' class="-inverted") Contact
          li
            nuxt-link(to='/privacy' class="-inverted") Privacy Policy
          li
            nuxt-link(to='/terms' class="-inverted") Terms of Service
      .form
        h4 Get notified when we release new lessons.
        form
          .form-group
            label.visually-hidden Name
            input(class="input primary -hollow" placeholder="Name")
          .form-group
            label.visually-hidden Email
            input(class="input primary -hollow" placeholder="Email")
          button(type="submit" class="button primary -small") Subscribe
</template>

<script>
export default {'name': 'Footer'}
</script>

<style lang="stylus" scoped>
  @import '~assets/css/_variables.styl'
  .section
    background-color $secondary-color
    color #fff
  .wrapper
    display grid
    grid-template-columns 1fr
    grid-template-areas "nav"\
                        "brand"\
                        "form"
  .brand
    grid-area brand
    margin-bottom ($vertical-space/2)
    .logo
      display block
      max-width 284px
      min-width 200px
      img
        display block
        width 100%
  .nav
    grid-area nav
    justify-self center
    text-align center
    h4
      text-transform uppercase
    li
      margin 15px 0
  .form
    grid-area form
    form
      display grid
      .button
        justify-self end
  +tablet-up()
    .wrapper
      grid-template-columns 1fr 1fr
      grid-template-areas "brand nav ."\
                          "form . ."
    .nav
      text-align left
  +laptop-up()
    .wrapper
      grid-template-columns 1fr 1fr 1fr
      grid-template-areas "brand nav form"
</style>
