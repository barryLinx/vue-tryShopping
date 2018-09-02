<template>
  <div>
    <h1>404</h1>
    <p>This page does not exist.</p>
    <router-link to="/" class="btn error">Return to Home!</router-link>

  </div>
</template>

<style scoped>
 h1{
      display: block;
      font-family: "Playfair Display";
      margin: 0 0 0.5em;
      line-height: 1.4;
  }
.error{
  background-color: #28c19e;
}
</style>
