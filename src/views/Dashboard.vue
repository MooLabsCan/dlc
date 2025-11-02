<script setup>
import DashboardHeader from '../components/dashboard/DashboardHeader.vue'
import ProgressCircle from '../components/ui/ProgressCircle.vue'
import TaskList from '../components/tasks/TaskList.vue'
import AcknowledgementFeed from '../components/dashboard/AcknowledgementFeed.vue'
import RankStatus from '../components/dashboard/RankStatus.vue'
import { useTasksStore } from '../store'
const { progress } = useTasksStore()
</script>

<template>
  <div class="container">
    <div class="hero">
      <DashboardHeader />
      <div class="progress-block">
        <ProgressCircle :value="progress" />
      </div>
    </div>

    <div class="grid-2">
      <div>
        <div class="h2">Today's Tasks</div>
        <TaskList />
      </div>
      <div>
        <div class="card" style="margin-bottom:12px">
          <div class="h2">Acknowledgements</div>
          <AcknowledgementFeed />
        </div>
        <RankStatus />
      </div>
    </div>
  </div>
</template>
