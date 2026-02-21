<script setup lang="ts">
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-background-primary">
    <div class="card p-8 w-full max-w-md">
      <h1 class="text-2xl font-display font-bold text-center mb-6">ExportHub</h1>
      <p class="text-text-secondary text-center mb-8">Login to your account</p>
      
      <form class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input type="email" class="input-field" placeholder="admin@example.com" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Password</label>
          <input type="password" class="input-field" placeholder="••••••••" />
        </div>
        <button type="submit" class="btn-primary w-full">Login</button>
      </form>
    </div>
  </div>
</template>
