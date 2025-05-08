<template>
  <div
    class="d-flex justify-content-center align-items-center"
    style="height: 100vh; background-color: #9a7dff"
  >
    <table>
      <tr>
        <img src="" />
        <br />
      </tr>
      <tr>
        <td><label for="nickname">NICKNAME </label></td>
        <td><input type="text" id="nickname" /></td>
      </tr>
      <tr>
        <td><label for="id"> ID </label></td>
        <td><input type="text" id="id" /></td>
      </tr>
      <tr>
        <td><label for="password">Password </label></td>
        <td><input type="password" id="password" /></td>
      </tr>
    </table>
  </div>
</template>

<script setup></script>

<style scoped>
tr {
  color: white;
}

td {
  width: 130px;
  height: 40px;
}

input {
  border-radius: 10px 10px;
}
</style>
