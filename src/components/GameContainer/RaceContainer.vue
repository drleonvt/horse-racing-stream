<script>
import RaceTrack from './RaceContainer/RaceTrack.vue'
import { mapGetters } from 'vuex'
import TipContainer from './RaceContainer/TipContainer.vue'

export default {
  name: 'RaceContainer',
  components: { TipContainer, RaceTrack },
  computed: {
    ...mapGetters({
      ROUND_HORSE_LIST: 'program/_GET_CURRENT_PROGRAM_HORSES',
      IS_RACE_RUNNING: 'program/_IS_RACE_RUNNING',
      CURRENT_ROUND: 'program/_GET_CURRENT_ROUND',
      ROUNDS: 'program/_GET_ROUNDS'
    })
  }
}
</script>

<template>
  <div class="race-container">
    <div class="flex gap-y-2 flex-col items-center my-auto w-full py-2.5">
      <template v-if="ROUNDS">
        <div class="flex flex-row w-full">
          <div class="flex flex-col gap-y-1 w-full" v-for="(currentRound, roundIdx) in ROUNDS">
            <RaceTrack
              v-for="(horse, idx) in ROUND_HORSE_LIST"
              :key="`race-track-${currentRound?.id}_${horse.id}`"
              :roundIdx="roundIdx !== ROUNDS.length - 1 ? roundIdx : undefined"
              :round="currentRound"
              :horse="horse"
              :idx="idx" />
          </div>
        </div>
        <div v-if="CURRENT_ROUND" class="round-name">{{ CURRENT_ROUND?.title }} - {{ CURRENT_ROUND?.distance }}m</div>
      </template>
      <template v-else>
        <div class="text-xl text-zinc-400 font-bold">No race scheduled yet!</div>
      </template>

      <!-- Tips -->
      <TipContainer v-if="CURRENT_ROUND"/>
      <!-- /Tips -->
    </div>
  </div>
</template>

<style scoped>
.race-container {
  @apply flex-1 flex flex-col overflow-auto px-10 bg-zinc-50 border-l-zinc-300 border-l border-r-zinc-300 border-r;
}

.round-name {
  @apply bg-red-600 px-2 rounded-full text-white font-bold text-lg;
}
</style>
