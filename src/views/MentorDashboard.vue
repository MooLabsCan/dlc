<script setup>
import DashboardHeader from '../components/dashboard/DashboardHeader.vue'
import RankStatus from '../components/dashboard/RankStatus.vue'
import MentorApplicants from '../components/mentorship/MentorApplicants.vue'
</script>

<template>
  <div class="container">
    <div class="hero">
      <DashboardHeader />
      <MentorApplicants />
    </div>
    <RankStatus />
  </div>
</template>
