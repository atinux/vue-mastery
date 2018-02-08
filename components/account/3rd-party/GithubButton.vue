<template lang="pug">
  button(type="button" @click.prevent="GithubButton" :disabled="disabled")
    i.fab.fa-github
    | {{ label }}
  //- <button type="button" class="btn" v-on:click.prevent="GithubButton"  v-bind:disabled="disabled">
  //-   <i class="fab fa-github"></i>
  //-   {{ label }}
  //- </button>
</template>

<script>
export default {
  name: 'GithubButton',
  props: {
    label: {
      required: true
    },
    disabled: {
      default: false
    }
  },
  methods: {
    GithubButton () {
      this.$store.dispatch('userGithubLogin')
    }
  }
}
</script>
