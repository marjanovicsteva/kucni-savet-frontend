<template>
  <div class="container">
    <img width="30%" class="loading" src="@/assets/kso.png" alt="">
  </div>
</template>

<style scoped>
.container {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  inset: 0;
  z-index: 1001;

  background-color: var(--color-background);
  color: var(--color-text);
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
