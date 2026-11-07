<template>
  <div v-if="isBurnoutMode" class="bg-[#EEF3EF] border border-[#5F7A61]/30 rounded-2xl p-4 transition-all">
    <div class="flex items-start justify-between gap-3">
      <div class="flex items-start gap-3">
        <div class="w-8 h-8 rounded-xl bg-[#5F7A61] text-white flex items-center justify-center shrink-0 mt-0.5 text-base shadow-2xs">
          🍃
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h4 class="font-bold text-sm text-[#2C2A29]">
              Chế Độ Cứu Chuỗi Đang Bật (Minimum Viable Effort — MVE)
            </h4>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#5F7A61] text-white">
              -70% Áp Lực
            </span>
          </div>
          <p class="text-xs text-[#78736A] mt-1 leading-relaxed">
            Khoa học hành vi chứng minh: <em>Khi tụt năng lượng, hoàn thành 5% vẫn tốt hơn là bỏ cuộc 0%</em>. Mọi mục tiêu hiện tại đã được thu gọn về mức tối thiểu để bạn bảo toàn chuỗi thói quen mà không gây kiệt sức.
          </p>
        </div>
      </div>

      <button
        @click="$emit('turn-off')"
        class="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white border border-[#D8D0C2] hover:bg-[#FAF8F5] text-[#2C2A29] shrink-0 transition-colors cursor-pointer"
      >
        Tắt Chế Độ MVE
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isBurnoutMode: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['turn-off']);
</script>
