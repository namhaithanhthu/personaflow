<template>
  <div class="space-y-6">
    <!-- User Diagnostic Profile Overview Card -->
    <div class="bg-white border border-[#E6E0D3] rounded-3xl p-6 sm:p-7 shadow-xs">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6E0D3] pb-5 mb-5">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-2xl bg-[#FAF0EB] text-[#C86D51] border border-[#C86D51]/30 flex items-center justify-center text-xl font-bold">
            👤
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-base sm:text-lg font-bold text-[#2C2A29]">
                Hồ Sơ Kỷ Luật & Nhịp Sinh Học Của Bạn
              </h3>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#EEF3EF] text-[#5F7A61] border border-[#5F7A61]/20">
                Đang hoạt động
              </span>
            </div>
            <p class="text-xs text-[#78736A] mt-0.5">
              Được thiết lập dựa trên kết quả bài trắc nghiệm chẩn đoán ban đầu
            </p>
          </div>
        </div>

        <button
          @click="$emit('retake-quiz')"
          class="px-4 py-2 rounded-xl bg-[#F3EFE6] hover:bg-[#E6E0D3] text-[#78736A] hover:text-[#2C2A29] text-xs font-semibold border border-[#D8D0C2] transition-colors cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
        >
          <RotateCcw :size="14" />
          <span>Làm Lại Bài Test Chẩn Đoán</span>
        </button>
      </div>

      <!-- Profile Attributes Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div class="bg-[#FAF8F5] border border-[#E6E0D3] rounded-2xl p-4">
          <span class="text-[11px] font-semibold text-[#78736A] uppercase tracking-wider block">
            ⚡ Khung Giờ Đỉnh Cao (Chronotype)
          </span>
          <div class="font-bold text-sm text-[#2C2A29] mt-1">
            {{ getChronotypeText() }}
          </div>
          <p class="text-[11px] text-[#78736A] mt-1 leading-relaxed">
            Nên xếp các nhiệm vụ khó nhất vào khung giờ này để đạt hiệu suất cao nhất.
          </p>
        </div>

        <div class="bg-[#FAF8F5] border border-[#E6E0D3] rounded-2xl p-4">
          <span class="text-[11px] font-semibold text-[#78736A] uppercase tracking-wider block">
            ⏱️ Quỹ Thời Gian Cam Kết
          </span>
          <div class="font-bold text-sm text-[#2C2A29] mt-1">
            {{ getCommitmentText() }}
          </div>
          <p class="text-[11px] text-[#78736A] mt-1 leading-relaxed">
            Duy trì tối thiểu mỗi ngày để tích lũy chuỗi thói quen bền bỉ.
          </p>
        </div>

        <div class="bg-[#FAF8F5] border border-[#E6E0D3] rounded-2xl p-4">
          <span class="text-[11px] font-semibold text-[#78736A] uppercase tracking-wider block">
            🎯 Động Lực Tâm Lý
          </span>
          <div class="font-bold text-sm text-[#2C2A29] mt-1">
            {{ getMotivationText() }}
          </div>
          <p class="text-[11px] text-[#78736A] mt-1 leading-relaxed">
            Bộ não bạn phản hồi tích cực nhất với cơ chế này.
          </p>
        </div>
      </div>
    </div>

    <!-- Methodology Library Header -->
    <div class="flex items-center justify-between">
      <div>
        <h4 class="font-bold text-base text-[#2C2A29] flex items-center gap-2">
          <span>📚</span> Thư Viện 4 Phương Pháp Kỷ Luật
        </h4>
        <p class="text-xs text-[#78736A] mt-0.5">
          Bạn có thể bấm vào bất kỳ phương pháp nào để đổi sang giao thức đó ngay lập tức
        </p>
      </div>
    </div>

    <!-- 4 Methods Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div
        v-for="p in Object.values(PROTOCOLS)"
        :key="p.id"
        :class="[
          'bg-white border rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-between transition-all',
          currentProtocolId === p.id
            ? 'border-[#C86D51] ring-2 ring-[#C86D51]/10 bg-[#FAF0EB]/20'
            : 'border-[#E6E0D3] hover:border-[#D8D0C2]'
        ]"
      >
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm">{{ p.badge }}</span>
            <span
              v-if="currentProtocolId === p.id"
              class="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#C86D51] text-white"
            >
              ĐANG SỬ DỤNG
            </span>
          </div>

          <h5 class="font-bold text-sm sm:text-base text-[#2C2A29]">
            {{ p.name }}
          </h5>
          <span class="text-[11px] text-[#78736A] font-mono block mb-2">
            Tác giả: {{ p.methodology }}
          </span>

          <p class="text-xs text-[#78736A] leading-relaxed mb-4">
            {{ p.description }}
          </p>

          <blockquote class="text-[11px] italic text-[#2C2A29]/80 border-l-2 border-[#C86D51]/60 pl-2.5 mb-4 font-serif">
            {{ p.quote }}
          </blockquote>
        </div>

        <div class="flex items-center gap-2 pt-3 border-t border-[#E6E0D3]">
          <button
            @click="openGuide(p)"
            class="flex-1 py-2 px-3 rounded-xl bg-[#F3EFE6] hover:bg-[#E6E0D3] text-[#2C2A29] text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <HelpCircle :size="14" />
            <span>Xem Cẩm Nang</span>
          </button>

          <button
            v-if="currentProtocolId !== p.id"
            @click="$emit('switch-protocol', p.id)"
            class="flex-1 py-2 px-3 rounded-xl bg-[#C86D51] hover:bg-[#B35B40] text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          >
            Kích Hoạt Giao Thức
          </button>
          <div
            v-else
            class="flex-1 py-2 px-3 rounded-xl bg-[#EEF3EF] text-[#5F7A61] text-xs font-semibold text-center"
          >
            ✓ Đang chạy
          </div>
        </div>
      </div>
    </div>

    <!-- Methodology Guide Modal -->
    <MethodGuideModal
      :is-open="isGuideOpen"
      :guide="activeGuide"
      @close="isGuideOpen = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RotateCcw, HelpCircle } from 'lucide-vue-next';
import { PROTOCOLS } from '../data/protocols';
import MethodGuideModal from './MethodGuideModal.vue';

const props = defineProps({
  userProfile: {
    type: Object,
    required: true,
  },
  currentProtocolId: {
    type: String,
    required: true,
  },
});

defineEmits(['retake-quiz', 'switch-protocol']);

const isGuideOpen = ref(false);
const activeGuide = ref(PROTOCOLS.procrastination.guideModal);

function openGuide(p) {
  activeGuide.value = p.guideModal;
  isGuideOpen.value = true;
}

function getChronotypeText() {
  const map = {
    morning: 'Sáng sớm (06:00 - 11:00)',
    afternoon: 'Buổi chiều (13:00 - 17:00)',
    night: 'Đêm muộn (20:00 - 00:00)',
  };
  return map[props.userProfile.chronotype] || 'Sáng sớm (06:00 - 11:00)';
}

function getCommitmentText() {
  const map = {
    '15min': '15 phút/ngày (Khởi đầu nhẹ)',
    '45min': '45 phút/ngày (Tiêu chuẩn)',
    '120min': '> 2 tiếng/ngày (Cường độ cao)',
  };
  return map[props.userProfile.dailyTimeCommitment] || '45 phút/ngày';
}

function getMotivationText() {
  const map = {
    stats: 'Thích số liệu & biểu đồ tiến độ',
    atomic: 'Tối giản từng bước nhỏ 2 phút',
    timer: 'Áp lực đếm ngược Pomodoro',
  };
  return map[props.userProfile.motivationStyle] || 'Tối giản từng bước nhỏ';
}
</script>
