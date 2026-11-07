<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 bg-[#2C2A29]/70 backdrop-blur-xs flex items-center justify-center p-4"
  >
    <div class="bg-[#FAF8F5] border border-[#E6E0D3] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex items-start justify-between border-b border-[#E6E0D3] pb-4 mb-5">
        <div>
          <span class="text-[10px] font-bold uppercase tracking-wider text-[#C86D51] font-mono">
            {{ guide.tag }}
          </span>
          <h3 class="text-base sm:text-lg font-bold text-[#2C2A29] mt-0.5">
            {{ guide.title }}
          </h3>
        </div>
        <button
          @click="$emit('close')"
          class="w-8 h-8 rounded-full bg-[#F3EFE6] hover:bg-[#E6E0D3] text-[#78736A] hover:text-[#2C2A29] flex items-center justify-center transition-colors cursor-pointer"
        >
          ✕
        </button>
      </div>

      <!-- 2-Column Body -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm">
        <!-- Left Column: Core Principle & Golden Rule -->
        <div class="space-y-4">
          <div class="bg-[#F3EFE6] border border-[#E6E0D3] rounded-2xl p-4">
            <h5 class="font-bold text-[#2C2A29] flex items-center gap-1.5 mb-1.5">
              <span>🧠</span> Tại sao phương pháp này hiệu quả?
            </h5>
            <p class="text-xs text-[#78736A] leading-relaxed">
              {{ guide.coreWhy }}
            </p>
          </div>

          <div class="bg-[#FAF0EB] border border-[#C86D51]/30 rounded-2xl p-4">
            <h5 class="font-bold text-[#C86D51] flex items-center gap-1.5 mb-1.5">
              <span>⭐</span> Quy tắc vàng bất biến:
            </h5>
            <p class="text-xs text-[#2C2A29] font-medium leading-relaxed">
              {{ guide.goldenRule }}
            </p>
          </div>
        </div>

        <!-- Right Column: Real-World Comparison (Wrong vs Right) -->
        <div class="space-y-4">
          <!-- Bad practice -->
          <div class="bg-rose-50/70 border border-rose-200 rounded-2xl p-4">
            <h5 class="font-bold text-rose-800 flex items-center gap-1.5 mb-1.5">
              <span>❌</span> Sai lầm thường gặp ngoài đời:
            </h5>
            <p class="text-xs text-rose-950/80 leading-relaxed">
              {{ guide.badPractice }}
            </p>
          </div>

          <!-- Good practice -->
          <div class="bg-[#EEF3EF] border border-[#5F7A61]/30 rounded-2xl p-4">
            <h5 class="font-bold text-[#5F7A61] flex items-center gap-1.5 mb-1.5">
              <span>✅</span> Cách làm chuẩn trên PersonaFlow:
            </h5>
            <p class="text-xs text-[#2C2A29] leading-relaxed">
              {{ guide.goodPractice }}
            </p>
          </div>
        </div>
      </div>

      <!-- Footer Action -->
      <div class="pt-5 mt-5 border-t border-[#E6E0D3] flex justify-end">
        <button
          @click="$emit('close')"
          class="px-5 py-2.5 rounded-xl bg-[#C86D51] hover:bg-[#B35B40] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          Đã Nắm Rõ • Quay Lại Thực Hành
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  guide: {
    type: Object,
    required: true,
  },
});

defineEmits(['close']);
</script>
