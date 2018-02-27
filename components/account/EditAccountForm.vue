<template lang="pug">
form.form.card
  .form-group
    label Profile Image
    .upload
      button.button.primary.border Upload Image
      input.input(type="file" accept="image/*" placeholder="Profile Image" v-on:change="updateProfileImage" ref="fileInput")
  .form-group
    label Display Name
    input.input(type="email" placeholder="Display Name" v-model="newData.displayName" v-on:input="updateField('displayName')")

  .form-error
    .-is-error(v-if="formError.length > 0" v-text="formError")
    .-is-success(v-if="formSuccess.length > 0" v-text="formSuccess")
</template>

<script>
import firebase from 'firebase'

export default {
  props: ['account'],
  data () {
    return {
      newData: {
        displayName: this.account.displayName,
        image: this.account.image
      },
      debounceTimer: setTimeout(() => {}),
      formError: '',
      formSuccess: ''
    }
  },
  methods: {
    resetFormMessages () {
      this.formSuccess = this.formError = ''
    },
    updateField (key) {
      this.resetFormMessages()
      clearTimeout(this.debounceTimer)
      this.debounceTimer = setTimeout(() => {
        console.info('update field', key)
        this.$store.dispatch('userUpdate', this.newData)
          .then(() => {
            this.formSuccess = 'Successfully updated your account details'
          })
          .catch((err) => {
            this.formError = 'Error saving the profile changes'
            console.error(err)
          })
      }, 500)
    },
    updateProfileImage () {
      this.resetFormMessages()
      const file = this.$refs.fileInput.files[0]
      const ref = firebase.storage().ref(`accounts/profile/${this.account.uid}`)
      ref.put(file).then((snapshot) => {
        return this.$store.dispatch('userUpdateImage', snapshot.downloadURL)
      })
        .then(() => {
          this.formSuccess = 'Successfully uploaded a new profile image'
          // reset the form input
          this.$refs.fileInput.value = null
        })
        .catch((err) => {
          this.formError = 'Error uploading new profile image'
          console.error(err)
        })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~assets/css/_variables'
label
  font-weight 600
  margin-bottom 5px
.form-group.-switched
  display flex
  flex-direction: row
  align-items center
</style>
