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
      form.form(v-on:submit.prevent="submit")
        .form-group
          label.visually-hidden Name
          input(class="input -hollow" placeholder="Name" v-model="name")
        .form-group
          label.visually-hidden Email
          input(class="input -hollow" placeholder="Email" type="email" v-model="email")
        .form-group
          label.visually-hidden Message
          textarea(class="textarea -hollow" placeholder="Message" rows="5" v-model="message")

        .form-error
          .-is-error(v-if="formError.length > 0" v-text="formError")
          .-is-success(v-if="formSuccess.length > 0" v-text="formSuccess")

        .form-group
          input.button.primary(type="button" value="Submit" @click="sendForm()")
</template>
<script>
export default {
  middleware: 'anonymous',
  head () {
    return {
      title: 'Contact Us'
    }
  },
  data () {
    return {
      name: '',
      email: '',
      message: '',
      debounceTimer: setTimeout(() => {}),
      formError: '',
      formSuccess: ''
    }
  },
  methods: {
    resetFormMessages () {
      this.formSuccess = this.formError = ''
    },
    sendForm () {
      this.resetFormMessages()
      clearTimeout(this.debounceTimer)
      this.debounceTimer = setTimeout(() => {
        if (this.name === '') {
          this.formError = 'Please enter your name'
          return false
        }
        if (this.email === '') {
          this.formError = 'Please enter a valid email'
          return false
        }
        if (this.message === '') {
          this.formError = 'Please enter a message'
          return false
        }
        this.$store.dispatch('sendContactRequest', {
          name: this.name,
          email: this.email,
          message: this.message
        })
          .then(() => {
            this.formSuccess = 'Successfully sent your message.'
          })
          .catch((err) => {
            this.formError = 'Error sending your email. Please try again later.'
            console.error(err)
          })
      }, 500)
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
