<template>
  <div class="container-fluid">
    <slot name="navbar"></slot>
    <div class="content my-5 px-3">
      <slot></slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>
