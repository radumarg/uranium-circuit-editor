<template>
  <div id="logo">
    <table>
      <tr>
        <td>
          <a href="javascript: /* activate mouse pointer change */" v-on:click="goBack">
            <img src="../assets/uranium.png" draggable="false" style="width:auto;height:80px;" alt="Uranium Logo" />
          </a>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "Logo",
  methods: {
    goBack: function() {
      var previousURL = document.referrer;
      if (previousURL.includes("public-project")) {
        // only works for tabs opened via javascript or with target blank
        window.close();
      }
      if (previousURL.includes("transilvania-quantum") && previousURL.includes("projects/project/")){
        window.location.href = previousURL;
      } else {
        window.location.href = "https://uranium.transilvania-quantum.org/";
      }
    },
  }
};
</script>

<style scoped>
table {
  text-align: center;
  width: 100%;
  height: 100%;
  background-color: #374048;
  border-spacing: 0px;
}
th,
td {
  border: 1px solid #374048;
  padding: 7px;
  width: 297px;
  height: 80px;
}
img {
  display: inline-block;
}
</style>