<template>
  <MDBNavbar dark bg="dark" position="top" container>
    <MDBNavbarBrand class="h1">def cameron_wragg(about_me: dict) -> SoftwareEngineer:</MDBNavbarBrand>
    <MDBNavbarToggler
      @click="collapse_header = !collapse_header"
      target="#navbarSupportedContent"
      dark
    ></MDBNavbarToggler>
    <MDBCollapse v-model="collapse_header" id="navbarSupportedContent">
      <MDBNavbarNav class="mb-2 ps-5 mb-lg-0">
        <MDBNavbarItem to="/">
          Home
        </MDBNavbarItem>
        <MDBNavbarItem to="/projects">
          Projects
        </MDBNavbarItem>
        <MDBNavbarItem href="https://uk.linkedin.com/in/cameronwragg">
          LinkedIn
        </MDBNavbarItem>
        <MDBNavbarItem href="https://github.com/CameronWragg">
          GitHub
        </MDBNavbarItem>
        <MDBNavbarItem href="#" disabled>
          return about_me["profession"]
        </MDBNavbarItem>
      </MDBNavbarNav>
    </MDBCollapse>
  </MDBNavbar>
</template>

<script>
  import {
    MDBNavbar,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBCollapse
  } from 'mdb-vue-ui-kit';
  import { ref } from 'vue';
  export default {
    components: {
      MDBNavbar,
      MDBNavbarToggler,
      MDBNavbarBrand,
      MDBNavbarNav,
      MDBNavbarItem,
      MDBCollapse
    },
    setup() {
      const collapse_header = ref(false);
      return {
        collapse_header
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
