<template>
  <div class="bg-white p-4 shadow-md rounded-md max-w-md">
    <h2 class="text-md mb-4">
      Job ID: <span class="font-bold">{{ jobId }}</span>
    </h2>

    <div v-if="jobData" class="text-sm">
      <p class="mb-2">Status: {{ jobData.status }}</p>
      <p class="mb-2">Status code UUID: {{ jobData.status_code_uuid }}</p>
    </div>

    <Button v-else size="small" :loading="isLoading" @click="fetchJobStatus">
      Get job status
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getJobStatus } from '@/services/api'
import { JobStatus } from '@/models'

const props = defineProps<{
  jobId: string
}>()

const jobData = ref<JobStatus | null>(null)
const isLoading = ref(false)

async function fetchJobStatus() {
  try {
    isLoading.value = true
    const { data } = await getJobStatus(props.jobId)
    jobData.value = data.entities[0]
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped></style>
