<template>
  <div class="max-w-2xl mx-auto px-4 py-8 sm:py-12">
    <!-- Quiz Card Container -->
    <div v-if="!isAnalyzing" class="bg-[#F3EFE6] border border-[#E6E0D3] rounded-3xl p-6 sm:p-10 shadow-xs relative">
      <!-- Progress Bar & Step Badge -->
      <div class="mb-8">
        <div class="flex items-center justify-between text-xs font-semibold text-[#78736A] uppercase tracking-wider mb-2">
          <span>Bước {{ currentStep + 1 }} / {{ QUESTIONS.length }}</span>
          <span>{{ Math.round(((currentStep + 1) / QUESTIONS.length) * 100) }}% Hoàn tất</span>
        </div>
        <div class="w-full bg-[#E6E0D3] h-2 rounded-full overflow-hidden">
          <div
            class="bg-[#C86D51] h-full rounded-full transition-all duration-300"
            :style="{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }"
          ></div>
        </div>
      </div>

      <!-- Question Title & Subtitle -->
      <div class="mb-6">
        <h2 class="text-xl sm:text-2xl font-bold text-[#2C2A29] leading-snug tracking-tight">
          {{ currentQuestion.title }}
        </h2>
        <p class="text-xs sm:text-sm text-[#78736A] mt-1.5 leading-relaxed">
          {{ currentQuestion.subtitle }}
        </p>
      </div>

      <!-- Options Grid -->
      <div class="space-y-3 mb-8">
        <button
          v-for="opt in currentQuestion.options"
          :key="opt.value"
          @click="selectOption(opt.value)"
          :class="[
            'w-full text-left p-4 sm:p-4.5 rounded-2xl border transition-all flex items-start gap-3.5',
            answers[currentQuestion.id] === opt.value
              ? 'bg-[#FAF8F5] border-[#C86D51] shadow-xs'
              : 'bg-[#FAF8F5]/60 hover:bg-[#FAF8F5] border-[#E6E0D3] hover:border-[#D8D0C2]'
          ]"
        >
          <!-- Radio Indicator -->
          <div
            :class="[
              'w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors',
              answers[currentQuestion.id] === opt.value
                ? 'border-[#C86D51] bg-[#C86D51]'
                : 'border-[#D8D0C2] bg-white'
            ]"
          >
            <div v-if="answers[currentQuestion.id] === opt.value" class="w-2 h-2 rounded-full bg-white"></div>
          </div>

          <div class="flex-1 min-w-0">
            <div class="font-semibold text-sm sm:text-base text-[#2C2A29]">
              {{ opt.label }}
            </div>
            <div class="text-xs text-[#78736A] mt-0.5 leading-relaxed">
              {{ opt.desc }}
            </div>
          </div>
        </button>
      </div>

      <!-- Step Navigation Buttons -->
      <div class="flex items-center justify-between pt-2 border-t border-[#E6E0D3]">
        <button
          v-if="currentStep > 0"
          @click="prevStep"
          class="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#78736A] hover:text-[#2C2A29] hover:bg-[#E6E0D3]/50 transition-colors"
        >
          ← Quay lại
        </button>
        <div v-else></div>

        <button
          :disabled="!answers[currentQuestion.id]"
          @click="nextStep"
          :class="[
            'px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2',
            answers[currentQuestion.id]
              ? 'bg-[#C86D51] hover:bg-[#B35B40] text-white shadow-xs cursor-pointer'
              : 'bg-[#E6E0D3] text-[#78736A] cursor-not-allowed opacity-60'
          ]"
        >
          <span>{{ currentStep === QUESTIONS.length - 1 ? 'Hoàn Tất & Khởi Tạo Hồ Sơ' : 'Tiếp tục' }}</span>
          <span>→</span>
        </button>
      </div>
    </div>

    <!-- Diagnostic Analysis Loading Screen -->
    <div v-else class="bg-[#F3EFE6] border border-[#E6E0D3] rounded-3xl p-10 sm:p-14 text-center shadow-xs">
      <!-- Pulsing Compass Animation -->
      <div class="w-16 h-16 mx-auto rounded-2xl bg-[#C86D51]/10 border border-[#C86D51]/30 flex items-center justify-center text-[#C86D51] text-2xl animate-pulse mb-6">
        ⚖️
      </div>

      <h3 class="text-xl sm:text-2xl font-bold text-[#2C2A29] mb-2">
        Đang phân tích hồ sơ kỷ luật của bạn...
      </h3>
      <p class="text-xs sm:text-sm text-[#78736A] max-w-md mx-auto leading-relaxed mb-6">
        Hệ thống đang đối chiếu rào cản tâm lý của bạn với các giao thức kỷ luật khoa học (Eat That Frog, Atomic Habits, Eisenhower, Deep Work)...
      </p>

      <!-- Status checklist simulation -->
      <div class="max-w-xs mx-auto space-y-2 text-left text-xs text-[#78736A]">
        <div class="flex items-center gap-2">
          <span class="text-[#5F7A61] font-bold">✓</span>
          <span>Nhận diện rào cản gốc: {{ getPainPointLabel() }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-[#5F7A61] font-bold">✓</span>
          <span>Khớp nhịp sinh học năng lượng đỉnh cao</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-[#C86D51] font-bold animate-spin">⏳</span>
          <span>Kích hoạt giao thức điều trị chuyên biệt...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { QUESTIONS, PROTOCOLS } from '../data/protocols';

const emit = defineEmits(['quiz-completed']);

const currentStep = ref(0);
const isAnalyzing = ref(false);

const answers = ref({
  rootPainPoint: null,
  chronotype: null,
  dailyTimeCommitment: null,
  motivationStyle: null,
});

const currentQuestion = computed(() => QUESTIONS[currentStep.value]);

function selectOption(val) {
  answers.value[currentQuestion.value.id] = val;
}

function prevStep() {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
}

function nextStep() {
  if (currentStep.value < QUESTIONS.length - 1) {
    currentStep.value++;
  } else {
    // Finish Quiz -> Trigger Analysis
    isAnalyzing.value = true;
    setTimeout(() => {
      const assignedProtocolKey = answers.value.rootPainPoint || 'procrastination';
      const userProfile = {
        ...answers.value,
        assignedProtocol: assignedProtocolKey,
        streakDays: 1,
        lastActiveDate: new Date().toISOString().split('T')[0],
        isBurnoutMode: false,
        createdAt: new Date().toISOString(),
      };
      emit('quiz-completed', userProfile);
    }, 1800);
  }
}

function getPainPointLabel() {
  const q1 = QUESTIONS[0].options.find(o => o.value === answers.value.rootPainPoint);
  return q1 ? q1.label : 'Đang xử lý';
}
</script>
