Architecture schema
src/
├── App.vue
├── main.js
├── router/
│   └── index.js
├── store/
│   └── useUserStore.js
│   └── useTasksStore.js
│   └── useRewardsStore.js
├── layouts/
│   ├── MainLayout.vue          // shared header/nav/sidebar
│   └── AuthLayout.vue
├── components/
│   ├── ui/
│   │   ├── DivineButton.vue
│   │   ├── ProgressCircle.vue
│   │   ├── TaskCard.vue
│   │   ├── RewardBadge.vue
│   │   └── NotificationBell.vue
│   ├── tasks/
│   │   ├── TaskList.vue
│   │   ├── TaskCreateModal.vue
│   │   └── TaskDetails.vue
│   ├── dashboard/
│   │   ├── DashboardHeader.vue   // greeting + streak indicator
│   │   ├── DailyOverview.vue     // summary of today’s goals
│   │   ├── ProgressTimeline.vue  // graph of last 7 days
│   │   ├── AcknowledgementFeed.vue // DLC praise & notes
│   │   └── RankStatus.vue
│   ├── rewards/
│   │   └── RewardsPanel.vue
│   └── dlc/
│       └── OversightPanel.vue    // admin view for coaches
├── views/
│   ├── Home.vue                  // philosophical landing page
│   ├── Dashboard.vue             // main daily view
│   ├── Tasks.vue                 // all tasks CRUD
│   ├── Journal.vue               // reflections & notes
│   ├── Rewards.vue
│   └── DLC.vue                   // coach portal
└── assets/
└── icons/, images/, gradients/
