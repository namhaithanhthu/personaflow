<template>
  <div class="bg-[#F3EFE6] border border-[#E6E0D3] rounded-3xl p-4 sm:p-5 shadow-xs transition-all">
    <div class="flex items-center justify-between gap-3">
      <div class="flex items-center gap-2.5">
        <span class="text-lg">🧭</span>
        <div>
          <div class="flex items-center gap-2">
            <h4 class="font-bold text-sm sm:text-base text-[#2C2A29]">
              3 Bước Thực Hành Hôm Nay: {{ protocol.name }}
            </h4>
            <span class="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E6E0D3] text-[#78736A]">
              Hướng dẫn nhanh
            </span>
          </div>
          <p class="text-xs text-[#78736A] mt-0.5">
            Lộ trình từng bước giúp bạn bắt đầu phiên làm việc chuẩn phương pháp khoa học
          </p>
        </div>
      </div>

      <button
        @click="toggleCollapse"
        class="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white border border-[#D8D0C2] hover:bg-[#FAF8F5] text-[#78736A] hover:text-[#2C2A29] transition-colors shrink-0 cursor-pointer flex items-center gap-1.5"
      >
        <span>{{ isCollapsed ? 'Mở rộng 3 bước' : 'Đã hiểu, thu gọn' }}</span>
        <ChevronUp v-if="!isCollapsed" :size="14" />
        <ChevronDown v-else :size="14" />
      </button>
    </div>

    <!-- Collapsible 3-Step Content -->
    <div v-show="!isCollapsed" class="mt-4 pt-4 border-t border-[#E6E0D3]/80 grid grid-cols-1 md:grid-cols-3 gap-3 animate-in fade-in">
      <div
        v-for="st in protocol.quickSteps"
        :key="st.step"
        class="bg-white border border-[#E6E0D3] rounded-2xl p-3.5 flex items-start gap-3 shadow-2xs"
      >
        <div class="w-6 h-6 rounded-full bg-[#C86D51] text-white flex items-center justify-center font-bold font-mono text-xs shrink-0 mt-0.5">
          {{ st.step }}
        </div>
        <div>
          <h5 class="font-bold text-xs sm:text-sm text-[#2C2A29]">
            {{ st.title }}
          </h5>
          <p class="text-[11px] sm:text-xs text-[#78736A] mt-0.5 leading-relaxed">
            {{ st.desc }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ChevronUp, ChevronDown } from 'lucide-vue-next';

defineProps({
  protocol: {
    type: Object,
    required: true,
  },
});

const isCollapsed = ref(false);

onMounted(() => {
  const saved = localStorage.getItem('personaflow_guide_collapsed');
  if (saved !== null) {
    isCollapsed.value = saved === 'true';
  }
});

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value;
  localStorage.setItem('personaflow_guide_collapsed', isCollapsed.value.toString());
}
</script>
