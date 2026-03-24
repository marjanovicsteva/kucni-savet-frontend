<template>
  <div class="container">
    <span class="loading">Loading...</span>
  </div>
</template>

<style scoped>
.container {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  inset: 0;
}

.loading {
  animation: blink 1s infinite;
}

@keyframes blink {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
