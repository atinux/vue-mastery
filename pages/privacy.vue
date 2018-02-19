<template lang="pug">
div
  h1.title Privacy Policy
</template>
<script>
export default {
  middleware: 'anonymous',
  // head: {
  //   title: 'Privacy Policy'
  // }
  head () {
    return {
      title: 'Privacy Policy'
    }
  }
}
</script>
<style lang="stylus" scoped></style>