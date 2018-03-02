<template lang="pug">
  no-ssr    
    a.button.secondary.-has-icon(v-cloak 
             v-if="account"
             :href="courseLink"
             download)
      i.fa.fa-download
      | Download

    button.button.primary.-small(v-else v-cloak @click="openLogin") Download

</template>

<script>
export default {
  name: 'downloadButton',
  props: ['courseLink', 'account'],
  methods: {
    openLogin () {
      this.$modal.show('login-form', {
        newAccount: true,
        headerTitle: 'Sign up to upload the video!',
        header: 'Please create a free account to download the course.'
      })
    }
  }
}
</script>
