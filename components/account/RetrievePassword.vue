<template>
  <div>
    <form v-on:submit.prevent="retrievePassword">
      <div class="form-group">
        <label>Email</label>
        <div class="control">
          <input class="form-control" v-bind:class="{ 'is-danger': invalidEmail }" type="email" placeholder="Account Email" v-model="email">
        </div>
        <p class="error" v-if="invalidEmail">This email is invalid</p>
      </div>

      <div class="form-group">
        <p><nuxt-link to="/account/login">Or Sign In!</nuxt-link></p>
      </div>

      <div class="form-group">
        <div class="flash flash-error" v-if="formError.length > 0" v-text="formError"></div>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary">Reset</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data () {
    return {
      email: '',
      formError: ''
    }
  },
  computed: {
    invalidEmail () {
      return false // !this.email.includes('@')
    }
  },
  methods: {
    retrievePassword () {
      this.formError = ''
      console.log(this.$store)
      this.$store.dispatch('userRetrievePassword', {
        email: this.email
      })
        .then(() => {
          this.$router.push('/account/Login')
        })
        .catch((error) => {
          console.log(error)
          this.formError = error.message
        })
    }
  }
}
</script>
