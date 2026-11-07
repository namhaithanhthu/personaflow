<template>
  <header class="border-b border-[#E6E0D3] bg-[#FAF8F5]/90 backdrop-blur-md sticky top-0 z-30 px-4 transition-all">
    <div class="max-w-6xl mx-auto flex items-center justify-between h-16 gap-3">
      <!-- Left: Logo & Subtitle -->
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-xl bg-[#C86D51] text-white flex items-center justify-center font-bold text-sm shadow-xs">
          PF
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="font-bold text-base tracking-tight text-[#2C2A29]">PersonaFlow</span>
            <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#E6E0D3]/80 text-[#78736A] border border-[#D8D0C2] hidden sm:inline-block">
              {{ currentProtocol.badge.split(' ')[0] }} {{ currentProtocol.name }}
            </span>
          </div>
          <span class="text-[11px] text-[#78736A] block leading-tight">
            Kỷ luật cá nhân hóa theo rào cản gốc
          </span>
        </div>
      </div>

      <!-- Right: Chronotype, Streak, Burnout Toggle -->
      <div class="flex items-center gap-2 text-xs">
        <!-- Chronotype Energy Hour -->
        <div
          class="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#F3EFE6] border border-[#E6E0D3] text-[#78736A]"
          :title="`Khung giờ năng lượng tốt nhất: ${chronotypeText}`"
        >
          <span>⚡</span>
          <span class="font-mono text-[#2C2A29] font-medium">{{ chronotypeText }}</span>
        </div>

        <!-- Streak Counter -->
        <div
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF0EB] border border-[#C86D51]/30 text-[#C86D51] font-mono font-bold"
          title="Chuỗi ngày duy trì kỷ luật"
        >
          <span>🔥</span>
          <span>{{ streakDays }} Ngày</span>
        </div>

        <!-- Graceful Degradation / Burnout Toggle -->
        <button
          @click="$emit('toggle-burnout')"
          :class="[
            'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer',
            isBurnoutMode
              ? 'bg-[#5F7A61] text-white border-[#5F7A61] shadow-xs'
              : 'bg-[#F3EFE6] hover:bg-[#EBE5D8] text-[#78736A] hover:text-[#2C2A29] border-[#E6E0D3]'
          ]"
          :title="isBurnoutMode ? 'Đang bật Chế độ Nỗ lực tối thiểu (MVE)' : 'Bấm khi bạn đang kiệt sức để giảm 70% khối lượng việc'"
        >
          <span>{{ isBurnoutMode ? '🍃 Đang Bật MVE' : '🛋️ Tụt Mood' }}</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { PROTOCOLS } from '../data/protocols';

const props = defineProps({
  userProfile: {
    type: Object,
    required: true,
  },
  isBurnoutMode: {
    type: Boolean,
    default: false,
  },
  streakDays: {
    type: Number,
    default: 1,
  },
});

defineEmits(['toggle-burnout']);

const currentProtocol = computed(() => {
  return PROTOCOLS[props.userProfile.assignedProtocol] || PROTOCOLS.procrastination;
});

const chronotypeText = computed(() => {
  const map = {
    morning: '06:00 - 11:00 (Sáng)',
    afternoon: '13:00 - 17:00 (Chiều)',
    night: '20:00 - 00:00 (Đêm)',
  };
  return map[props.userProfile.chronotype] || '06:00 - 11:00';
});
</script>
