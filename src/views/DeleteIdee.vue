<script setup>

</script>




<template>

</template>
<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  width: 380px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.modal-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.modal-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(226, 75, 74, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e24b4a;
  font-size: 18px;
}

.modal-title {
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #888;
  display: flex;
}

.modal-body {
  border-top: 0.5px solid rgba(255,255,255,0.1);
  padding-top: 16px;
  font-size: 14px;
  color: #888;
  line-height: 1.6;
}

.modal-body strong {
  color: #e8e8f0;
}

.modal-footer {
  display: flex;
  gap: 10px;
}

.btn-annuler {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: 0.5px solid rgba(255,255,255,0.15);
  background: transparent;
  color: #e8e8f0;
  font-size: 14px;
  cursor: pointer;
}

.btn-confirmer {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background: rgba(226, 75, 74, 0.15);
  color: #f09595;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
</style>
