<template>
  <button type="button" class="btn" v-on:click.prevent="GoogleButton" v-text="label" v-html="icon + label" v-bind:disabled="disabled"></button>
</template>

<script>
export default {
  name: 'GoogleButton',
  props: {
    label: {
      required: true
    },
    disabled: {
      default: false
    }
  },
  methods: {
    GoogleButton () {
      this.$store.dispatch('userGoogleLogin')
    }
  },
  computed: {
    icon () {
      return '<i class="fab fa-google"></i>'
    }
  }
}
</script>
