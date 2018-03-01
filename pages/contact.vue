<template lang="pug">
.container
  .wrapper
    .contact-body
      h1.title Contact Us
      p If you have any feedback, suggestions, or need a little support we're here to help.  If you've run into a bug with your Vue.js application and need a hand (aside from googling your error) we'd recommend the <a href="https://forum.vuejs.org/" target="_new">Vue.js Forum</a> or <a href="https://discordapp.com/invite/HBherRA" target="_new">Vue Land Chat</a>. 
      
      h3.subtitle Follow us
      .social
        a.button.primary.link.-has-icon(href='https://www.facebook.com/vuemastery' target="_blank")
          i.fab.fa-facebook
        a.button.primary.link.-has-icon(href='https://twitter.com/vuemastery' target="_blank")
          i.fab.fa-twitter
        a.button.primary.link.-has-icon(href='https://medium.com/vue-mastery' target="_blank")
          i.fab.fa-medium
        a.button.primary.link.-has-icon(href='https://www.youtube.com/vue-mastery' target="_blank")
          i.fab.fa-youtube

    .contact-form
      form.form(v-on:submit.prevent="submit" action="https://docs.google.com/forms/d/e/1FAIpQLSfY8hkPIJTVCPW1Bctg1WDIDfbOaScuWMNkt9AmEhx_TvzZbw/formResponse")
        .form-group
          label.visually-hidden Name
          input(class="input -hollow" placeholder="Name" name="entry.716801693")
        .form-group
          label.visually-hidden Email
          input(class="input -hollow" placeholder="Email" type="email" name="entry.107063592")
        .form-group
          label.visually-hidden Message
          textarea(class="textarea -hollow" placeholder="Message" rows="5" name="entry.617438327")
        .form-group
          input.button.primary(type="submit" value="Submit")
</template>
<script>
export default {
  middleware: 'anonymous',
  // head: {
  //   title: 'Contact Us'
  // }
  head () {
    return {
      title: 'Contact Us'
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '../assets/css/_variables'
  .wrapper
    margin-top ($vertical-space/4)
    margin-bottom ($vertical-space/4)
    grid-template-columns 1fr
    grid-row-gap ($vertical-space/4)
    grid-template-areas "body"\
                        "form"

    +laptop-up()
      margin-top $vertical-space
      margin-bottom $vertical-space
      grid-template-columns 1fr 1fr
      grid-row-gap $vertical-space * 1.5
      grid-column-gap ($vertical-space/2)
      grid-template-areas "body form"

  .contact-body
    grid-area body
  .contact-form
    grid-area form
  .title
    color: $primary-color
    font-weight 600
  .subtitle
    color $secondary-color
    margin-bottom 0
  .social
    display flex
    font-size 2em
    margin-right 1em

</style>
