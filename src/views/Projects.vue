<template>
  <NavBar/>
  <ImageCard/>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar.vue";
import ImageCard from "@/components/ImageCard.vue";

export default {
  name: "Projects",
  title: "Cameron Wragg - Projects",
  components: {
    NavBar,
    ImageCard
  }
};
</script>