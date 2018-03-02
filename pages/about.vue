<template lang="pug">
.container
  .wrapper
    .mission-media
      iframe(src="https://player.vimeo.com/video/257980016" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen)
      //- vimeo-player(ref="player" video-id="257980016" player-width="860")

    .mission
      h1.title Our Mission
      p To be the ultimate learning resource for Vue Developers. We do this by:
      ul
        li Creating weekly tutorials in video and article format.
        li Co-producing the Official Vue.js News.
        li Producing the Official Vue.js Podcast.
        li Paid subscriptions coming soon for exclusive content.
        li $5 of your montly payment goes to the Vue Project.

      nuxt-link.button.secondary.border(to="/courses") View Our Courses

    .team-media
      img(src="/images/vue-mastery-team.jpg" alt="Vue Mastery Team")

    .team
      h1.title About The Team
      p The Vue Mastery team is based in Orlando, Florida where Gregg Pollack (Teacher), Adam Jahr (Teacher), Chase Gregory (Marketing), and Melissa Koch (Legal & Business) reside.
      p Dustin Delatore (Design/Development) and Pierre Schweiger (Development) are the digital nomads on our team.  Your guess is as good as ours as to where they are or if they even have Internet at the moment.

      nuxt-link.button.secondary.border(to="/contact") Contact Us

    .why-media
      iframe(src="https://player.vimeo.com/video/258154307" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen)
      //- vimeo-player(ref="player" video-id="258154307" player-width="860")
    .why
      h1.title Why Learn Vue?
      p We worked closely with the Vue Core team to produce this video which walks you through the core principles of this JS Framework.

      nuxt-link.button.secondary.border(to="/courses") START LEARNING NOW
  CheatSheetAlt
</template>

<script>
import PlayerPlaceholder from "~/components/static/PlayerPlaceholder";
import CheatSheetAlt from "~/components/static/CheatSheetAlt";

export default {
  middleware: "anonymous",
  // head: {
  //   title: 'About page'
  // },
  head() {
    return {
      title: "About page"
    };
  },
  components: {
    PlayerPlaceholder,
    CheatSheetAlt
  }
};
</script>

<style lang="stylus" scoped>
@import '../assets/css/_variables';

containers = mission mission-media team-media team why why-media;

.wrapper {
  margin-top: ($vertical-space / 4);
  margin-bottom: ($vertical-space / 4);
  grid-template-columns: 1fr;
  grid-row-gap: ($vertical-space / 4);
  align-items: center;
  grid-template-areas: 'mission-media' 'mission' 'team-media' 'team' 'why-media' 'why';
}

for container in containers {
  .{container} {
    grid-area: container;
  }
}

.title {
  color: $primary-color;
  font-weight: 600;

  +tablet-up() {
    font-size: 56px;
  }
}

ul {
  list-style-type: disc;
  padding-left: 25px;
  padding-bottom: 30px;
  line-height: 25px;
}

+laptop-up() {
  .wrapper {
    margin-top: $vertical-space;
    margin-bottom: $vertical-space;
    grid-template-columns: 1fr 1fr;
    grid-row-gap: $vertical-space * 1.5;
    grid-column-gap: ($vertical-space / 2);
    align-items: center;
    grid-template-areas: 'mission mission-media' 'team-media team' 'why why-media';
  }
}
</style>
