<template>
  <button type="button" class="btn" v-on:click.prevent="GithubButton" v-text="label" v-bind:disabled="disabled"></button>
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
