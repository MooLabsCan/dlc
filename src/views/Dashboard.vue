<script setup>
import DashboardHeader from '../components/dashboard/DashboardHeader.vue'
import ProgressCircle from '../components/ui/ProgressCircle.vue'
import TaskList from '../components/tasks/TaskList.vue'
import AcknowledgementFeed from '../components/dashboard/AcknowledgementFeed.vue'
import RankStatus from '../components/dashboard/RankStatus.vue'
import MentorPicker from '../components/mentorship/MentorPicker.vue'
import { useTasksStore } from '../store'
import { useUserStore } from '../stores/user'
const { progress } = useTasksStore()
const userStore = useUserStore()
</script>

<template>
  <div class="container">
    <div class="hero">
      <DashboardHeader />
      <div class="progress-block">
        <ProgressCircle :value="progress" />
      </div>
    </div>

    <div v-if="userStore.accountType==='devotee' && !userStore.mentorUne" class="card section-card" style="margin-bottom:16px;">
      <MentorPicker />
    </div>

    <div class="grid-2">
      <div>
        <div class="h2">Today's Tasks</div>
        <TaskList />
      </div>
      <div>
        <div class="card section-card">
          <div class="h2">Acknowledgements</div>
          <AcknowledgementFeed />
        </div>
        <RankStatus />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 16px;
}

.h2 {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.2px;
  margin-bottom: 10px;
}

.hero {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  align-items: center;
  margin-bottom: 20px;
}

.progress-block {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.section-card {
  margin-bottom: 12px;
  background: radial-gradient(120% 120% at 0% 0%, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05);
  padding: 14px;
}

/* Desktop enhancements */
@media (min-width: 900px) {
  .hero {
    grid-template-columns: 1.6fr 1fr;
    gap: 24px;
    margin-bottom: 28px;
  }
  .progress-block {
    justify-content: flex-end;
  }
  .grid-2 {
    grid-template-columns: 1.4fr 1fr;
    gap: 24px;
  }
}
</style>
