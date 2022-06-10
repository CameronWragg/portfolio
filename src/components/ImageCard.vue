<template>
  <MDBRow :cols="['1','md-3']" class="g-4 my-5 px-5">
    <MDBCol>
      <MDBCard text="white" bg="dark">
          <a v-mdb-ripple="{ color: 'dark' }">
          <MDBCardImg src="./images/hive-fi.jpeg" top alt="Hive-Fi Project Logo"/>
          </a>
          <MDBCardBody>
          <MDBCardTitle>Hive-Fi</MDBCardTitle>
          <MDBCardText>
              A raspberry pi hi-fi project to allow seamless streaming of spotify 
              or airplay audio streams in high fidelity to a non-smart audio system.
          </MDBCardText>
          <MDBBtn tag="a" href="https://github.com/CameronWragg/hive-fi" color="light">See on GitHub</MDBBtn>
          </MDBCardBody>
      </MDBCard>
    </MDBCol>
    <MDBCol>
      <MDBCard text="white" bg="dark">
          <a v-mdb-ripple="{ color: 'dark' }">
          <MDBCardImg src="./images/aoc.png" top alt="Advent of Code Logo" />
          </a>
          <MDBCardBody>
          <MDBCardTitle>Advent of Code 2021</MDBCardTitle>
          <MDBCardText>
              A repository containing code snippets to challenges from 2021's Advent of Code.
          </MDBCardText>
          <MDBBtn tag="a" href="https://github.com/CameronWragg/advent-of-code-2021" color="light">See on GitHub</MDBBtn>
          </MDBCardBody>
      </MDBCard>
    </MDBCol>
    <MDBCol>
      <MDBCard text="white" bg="dark">
          <a v-mdb-ripple="{ color: 'dark' }">
          <MDBCardImg src="./images/undergraduate-project.png" top alt="Code snippet for OnBeforeSave function" />
          </a>
          <MDBCardBody>
          <MDBCardTitle>Undergraduate Project</MDBCardTitle>
          <MDBCardText>
              A Visual Studio IDE Plugin to scrape user error data for use in studies of student learning and development.
          </MDBCardText>
          <MDBBtn tag="a" href="https://github.com/CameronWragg/UndergraduateProject" color="light">See on GitHub</MDBBtn>
          </MDBCardBody>
      </MDBCard>
    </MDBCol>
  </MDBRow>
</template>

<script>
  import { MDBCard, MDBRow, MDBCol, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImg, MDBBtn, mdbRipple } from "mdb-vue-ui-kit";
  export default {
    components: {
      MDBCard,
      MDBRow,
      MDBCol,
      MDBCardBody,
      MDBCardTitle,
      MDBCardText,
      MDBCardImg,
      MDBBtn
    },
    directives: {
      mdbRipple
    }
  };
</script>