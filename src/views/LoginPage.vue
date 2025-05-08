<template>
  <div
    class="d-flex justify-content-center align-items-center"
    style="height: 100vh; background-color: #9a7dff"
  >
    <table>
      <tr>
        <img src="" />
      </tr>
      <tr>
        <td><label for="id"> ID </label></td>
        <td><input type="text" id="id" /></td>
      </tr>
      <tr>
        <td><label for="password">Password </label></td>
        <td><input type="password" id="password" /></td>
      </tr>
      <tr>
        <td style="height: 35px"></td>
      </tr>
      <tr>
        <td>
          <button class="badge bg-white" style="color: black">로그인</button>
        </td>
        <td>
          <router-link
            to="/signup"
            class="badge bg-white border border-black"
            style="color: black; text-decoration: none"
            >회원가입</router-link
          >
        </td>
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
