<template lang="pug">
  .banner
    .wrapper
      h2.title Meet Your Teachers
      .gregg
        img(src="/images/gregg-avatar.jpg")
        h3 Gregg Pollack
        p Gregg is passionate about teaching open source technology online. Previously he created Code School, an online software programming school which was acquired by Pluralsight.  He lives in Orlando, Florida with his two kids Ender and Alanna.
      .adam
        img(src="/images/adam-avatar.jpg")
        h3 Adam Jahr
        p Adam Jahr is a developer and programming instructor passionate about making it easier to learn complex skills. He previously instructed at The Iron Yard’s coding bootcamp before joining Vue Mastery in order to help developers progress along their professional paths.
</template>

<script>
export default { 'name': 'MeetTeachers' }
</script>

<style lang="stylus" scoped>
  @import '~assets/css/_variables'
  .wrapper
    padding-top ($vertical-space/2)
    padding-bottom ($vertical-space/2)
    grid-template-columns 1fr
    grid-row-gap 2em
    grid-template-areas "title"\
                        "gregg"\
                        "adam"
  .title
    grid-area title
    margin-bottom ($vertical-space/2)
    border-bottom solid 2px $secondary-color
    color $secondary-color
    text-align center
  .gregg, .adam
    text-align center
    max-width 500px
    justify-self center
    h3
      color $primary-color
    img
      margin-bottom ($vertical-space/2)
      max-width 245px
  .gregg
    grid-area gregg
  .adam
    grid-area adam
  +tablet-up()
    .wrapper
      padding-top $vertical-space
      padding-bottom $vertical-space
      grid-column-gap 4%
      grid-row-gap 0
      grid-template-columns 1fr 1fr
      grid-template-areas "title title"\
                          "gregg adam"

    .title
      margin-bottom $vertical-space
</style>
