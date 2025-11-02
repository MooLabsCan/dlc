<script setup>
import { onMounted } from 'vue'
import { state, init, joinRoyalPath } from '../store'
import ProgressBar from '../components/ProgressBar.vue'

onMounted(() => {
  if (!state.ready) init()
})
</script>

<template>
  <div class="home">
    <!-- Hero -->
    <section class="hero">
      <div class="hero-inner">
        <h1 class="hero-title">Why We Seek Leaders, Heroes, and Purpose</h1>
        <p class="hero-sub">Humans are wired for purpose. Across history, we’ve looked up to extraordinary figures to give life structure, meaning, and inspiration.</p>
        <button class="cta" @click="joinRoyalPath">Join the Royal Path</button>
      </div>
    </section>

    <div class="content max-w">
      <section class="section-card">
        <h2>Humanity’s Timeless Quest for Meaning</h2>
      <p>
        Humans are wired for purpose. Across history, civilizations have looked up to extraordinary figures — leaders, monarchs,
        and even gods — to give their lives structure, meaning, and inspiration.
      </p>
      <p class="mt-3">
        From the Pharaohs of Egypt to the Tsars of Russia, people found profound comfort and pride in serving someone greater than themselves.
        These leaders weren’t just rulers — they were symbols of cosmic order, national destiny, and personal aspiration.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-3">Pharaohs – Gods on Earth</h2>
      <p>
        In the Old Kingdom of Egypt (c. 2700–2200 BCE), Pharaohs were considered living gods. People actively participated in
        building their legacy: peasants labored to construct the pyramids, temples, and monuments. Citizens took pride in contributing
        to projects that expressed the Pharaoh’s divine order.
      </p>
      <ul class="list-disc pl-6 mt-3">
        <li>Supporting the Pharaoh was supporting the cosmic order (ma’at).</li>
        <li>Success of the state meant survival, prosperity, and spiritual reward.</li>
        <li>Even if daily life was harsh, people found dignity and meaning in being part of something eternal.</li>
      </ul>
      <p class="mt-3">
        Example: The Pyramid of Khufu wasn’t just a tomb — it was a statement of collective human achievement, dedicated to their divine king.
        Citizens were active participants in an extraordinary shared vision.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-3">Tsars – Fathers of a Nation</h2>
      <p>
        In Muscovy and Imperial Russia, the Tsar was seen as God’s representative on Earth. People willingly submitted to absolute monarchy because
        it offered security and stability in a vast, often dangerous land. Achievements in his name — building churches, defending borders, or contributing
        to the economy — became sources of communal pride.
      </p>
      <p class="mt-3">
        Example: Under Peter the Great, Russians embraced radical reforms — learning shipbuilding, modern sciences, and Western military techniques — because he framed
        these changes as elevating the nation under the Tsar’s divine guidance. People felt they were achieving greatness not just for themselves,
        but for the glory of their leader and homeland.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-3">Medieval Europe – Aspirational Monarchy</h2>
      <ul class="list-disc pl-6">
        <li>Knights followed codes of chivalry inspired by their liege lord.</li>
        <li>Townspeople celebrated victories, built cathedrals, or funded guilds to honor the monarch.</li>
      </ul>
      <p class="mt-3">
        Example: In France, during the reign of Louis XIV (“The Sun King”), citizens and nobles took immense pride in Versailles, state ceremonies, and court culture.
        Serving the King became a way to participate in grandeur and legacy.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-3">Why People Crave This Today</h2>
      <p>
        Modern life often lacks the cosmic anchor that religion or monarchy once provided. Many report a loss of purpose and a desire for belonging and significance.
        Humans thrive when they feel they are contributing to something greater than themselves and when their actions are recognized by a figure or system
        they respect.
      </p>
      <p class="mt-3">
        Insight: Even in secular contexts, people follow mentors, coaches, or leaders to achieve mastery, structure, and a sense of higher purpose.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-3">Introducing Divine Life Coaching</h2>
      <ul class="list-disc pl-6">
        <li>You choose a symbolic Divine Leader to guide your growth.</li>
        <li>You receive assignments, rituals, and challenges to achieve in their honor.</li>
        <li>You track progress, earn recognition, and feel pride in collective accomplishment.</li>
      </ul>
      <p class="mt-3">
        Goal: Transform the ancient psychology of discipleship into a voluntary, empowering, gamified system for purpose, pride, and personal growth.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-3">Key Principles</h2>
      <ul class="list-disc pl-6">
        <li>Voluntary Participation – You choose to follow, not forced.</li>
        <li>Shared Achievement – Your work contributes to a greater story.</li>
        <li>Ritual & Discipline – Small daily actions build purpose and pride.</li>
        <li>Gamified Recognition – Ranks, badges, and points give tangible feedback.</li>
        <li>Historical Inspiration – Learn how people thrived under aspirational leadership.</li>
      </ul>
    </section>

    <section class="mt-12 text-center">
      <div v-if="state.user" class="mb-6 inline-block text-left p-4 border rounded-lg bg-white shadow-sm">
        <div class="font-semibold mb-1">Welcome, {{ state.user.name }}</div>
        <div class="text-sm">Rank: {{ state.user.points }} pts</div>
        <div class="mt-2">
          <ProgressBar :value="state.user.points" :max="1500" />
        </div>
      </div>
      <button @click="joinRoyalPath" class="bg-yellow-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-yellow-700">
        Join the Royal Path
      </button>
    </section>

    <section class="mt-12 text-sm text-gray-600">
      <h3 class="font-semibold mb-2">Optional Sidebar / Visuals</h3>
      <ul class="list-disc pl-6">
        <li>Timeline of monarchs and their societal impact.</li>
        <li>Diagram: Discipleship → Ritual → Achievement → Pride.</li>
        <li>Quotes from historical figures or modern thinkers about purpose, loyalty, and achievement.</li>
      </ul>
    </section>
    </div>
  </div>
</template>

<style>:root{--parchment:#f8f2e5;--parchment-deep:#efe4cf;--ink:#2e261c;--muted:#6b5e4d;--gold:#c9963e;--gold-deep:#a6771e;}</style>

<style>
:root {
  --parchment: #f8f2e5;
  --parchment-deep: #efe4cf;
  --ink: #2e261c;
  --muted: #6b5e4d;
  --gold: #c9963e;
  --gold-deep: #a6771e;
}
</style>

<style scoped>
:root {
  --parchment: #f8f2e5;
  --parchment-deep: #efe4cf;
  --ink: #2e261c;
  --muted: #6b5e4d;
  --gold: #c9963e;
  --gold-deep: #a6771e;
}

.home { background: var(--parchment); color: var(--ink); }
.max-w { max-width: 1100px; margin: 0 auto; padding: 2rem 1.25rem; }

/* Hero */
.hero {
  position: relative;
  min-height: 60vh;
  display: grid;
  place-items: center;
  color: #fff;
  background: radial-gradient(ellipse at center, rgba(255,185,87,.25), rgba(24,16,8,.85)),
    url('../assets/ChatGPT Image Sep 25, 2025, 05_03_29 PM.png') center/cover no-repeat;
}
.hero::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, rgba(20,12,6,0.2), rgba(20,12,6,0.85));
}
.hero-inner { position: relative; z-index: 1; text-align: left; max-width: 900px; padding: 2rem; }
.hero-title { font-size: clamp(2.2rem, 4vw + 1rem, 4rem); line-height: 1.05; font-weight: 800; margin: 0 0 1rem; }
.hero-sub { font-size: clamp(1rem, 1vw + .8rem, 1.25rem); line-height: 1.6; opacity: .95; max-width: 800px; }
.cta { margin-top: 1.5rem; background: var(--gold); color: #1a1208; border: none; padding: .85rem 1.25rem; border-radius: .6rem; font-weight: 700; cursor: pointer; box-shadow: 0 6px 18px rgba(0,0,0,.25); }
.cta:hover { background: var(--gold-deep); color: #fff; }

/* Content */
.content { margin-top: -3rem; position: relative; z-index: 2; }
.section-card { background: #fff; border: 1px solid var(--parchment-deep); border-radius: 16px; padding: 1.5rem; box-shadow: 0 10px 30px rgba(0,0,0,.06); margin-bottom: 1.25rem; }
.section-card + .section-card { margin-top: 1rem; }

.section-card h2 { font-size: 1.75rem; margin: 0 0 .75rem; color: var(--ink); }
.section-card p { margin: .5rem 0; color: var(--muted); }
.section-card ul { margin: .5rem 0 .5rem 1.25rem; color: var(--muted); }

/* Utility fallbacks so page doesn’t rely on Tailwind */
.mt-3 { margin-top: .75rem; }
.mt-12 { margin-top: 3rem; }
.mb-8 { margin-bottom: 2rem; }
.text-center { text-align: center; }
.text-sm { font-size: .9rem; }
.text-gray-600 { color: var(--muted); }
.font-semibold { font-weight: 600; }
.inline-block { display: inline-block; }
.text-left { text-align: left; }
.p-4 { padding: 1rem; }
.border { border: 1px solid var(--parchment-deep); }
.rounded-lg { border-radius: 12px; }
.bg-white { background: #fff; }
.shadow-sm { box-shadow: 0 6px 16px rgba(0,0,0,.06); }
.bg-yellow-600 { background: var(--gold); color: #1a1208; border: none; }
.bg-yellow-600:hover { background: var(--gold-deep); color: #fff; }
.py-3 { padding-top: .75rem; padding-bottom: .75rem; }
.px-6 { padding-left: 1.25rem; padding-right: 1.25rem; }
.rounded-lg { border-radius: .6rem; }
.hover\:bg-yellow-700:hover { background: var(--gold-deep); }
.list-disc { list-style: disc; }
.pl-6 { padding-left: 1.25rem; }

/* Responsive */
@media (min-width: 900px) {
  .hero { min-height: 70vh; }
  .section-card { padding: 2rem; }
}
</style>


/* Fallback variables (correct selector) */
