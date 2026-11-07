<template>
  <div>
    <!-- 1. FLOATING ACTION PILL (BOTTOM-RIGHT) -->
    <div v-if="!isTourActive" class="fixed bottom-5 right-5 z-40 animate-in fade-in">
      <button
        @click="isOpen = !isOpen"
        :class="[
          'group flex items-center gap-2.5 px-4 py-2.5 rounded-full border shadow-lg transition-all duration-300 cursor-pointer active:scale-95',
          isOpen
            ? 'bg-[#2C2A29] text-white border-[#2C2A29]'
            : 'bg-[#FAF8F5] hover:bg-[#F3EFE6] text-[#2C2A29] border-[#E6E0D3] hover:border-[#C86D51]'
        ]"
      >
        <!-- Animated Avatar Ring -->
        <div class="relative flex items-center justify-center">
          <div class="w-7 h-7 rounded-full bg-[#C86D51] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            🌿
          </div>
          <span class="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#5F7A61] border-2 border-white"></span>
        </div>

        <div class="text-left">
          <span class="text-xs font-bold block leading-tight">FlowGuide</span>
          <span class="text-[10px] text-[#78736A] group-hover:text-[#C86D51] block leading-tight">
            {{ isOpen ? 'Đóng trợ lý' : 'Hỏi & Hướng dẫn' }}
          </span>
        </div>
      </button>
    </div>

    <!-- 2. ASSISTANT SLIDE-OVER DRAWER -->
    <div
      v-if="isOpen && !isTourActive"
      class="fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] max-h-[82vh] bg-[#FAF8F5] border border-[#E6E0D3] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95"
    >
      <!-- Drawer Header -->
      <div class="bg-[#F3EFE6] border-b border-[#E6E0D3] p-4 flex items-center justify-between shrink-0">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-full bg-[#C86D51] text-white flex items-center justify-center font-bold text-sm shadow-2xs">
            🌿
          </div>
          <div>
            <div class="flex items-center gap-1.5">
              <h4 class="font-bold text-sm text-[#2C2A29]">Trợ Lý FlowGuide</h4>
              <span class="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#EEF3EF] text-[#5F7A61] border border-[#5F7A61]/30">
                Đang trực tuyến
              </span>
            </div>
            <p class="text-[11px] text-[#78736A]">
              Giải thích tính năng & chỉ dẫn cách dùng PersonaFlow
            </p>
          </div>
        </div>

        <button
          @click="isOpen = false"
          class="w-7 h-7 rounded-full bg-white hover:bg-[#FAF8F5] text-[#78736A] hover:text-[#2C2A29] flex items-center justify-center transition-colors cursor-pointer border border-[#E6E0D3]"
        >
          <X :size="14" />
        </button>
      </div>

      <!-- Drawer Scrollable Body -->
      <div class="p-4 sm:p-5 overflow-y-auto space-y-5 text-xs flex-1">
        <!-- FEATURE 1: INTERACTIVE SPOTLIGHT TOUR BANNER -->
        <div class="bg-[#FAF0EB] border border-[#C86D51]/30 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-2xs">
          <div>
            <div class="flex items-center gap-1.5 text-[#C86D51] font-bold">
              <Compass :size="16" />
              <span>Tour Tham Quan Tương Tác</span>
            </div>
            <p class="text-[11px] text-[#78736A] mt-0.5">
              Dẫn bạn đi 1 vòng chiếu sáng các nút bấm chính (1 phút).
            </p>
          </div>

          <button
            @click="startTour"
            class="px-3.5 py-2 rounded-xl bg-[#C86D51] hover:bg-[#B35B40] text-white font-semibold text-xs transition-colors shrink-0 cursor-pointer shadow-xs"
          >
            Bắt đầu tour →
          </button>
        </div>

        <!-- FEATURE 2: SEARCH KNOWLEDGE BASE -->
        <div>
          <label class="block font-bold text-[#2C2A29] mb-1.5 flex items-center gap-1">
            <Search :size="13" class="text-[#78736A]" />
            <span>Bạn muốn hỏi gì về ứng dụng?</span>
          </label>
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Gõ từ khóa: con ếch, 2 phút, tụt mood, streak..."
              class="w-full bg-white border border-[#E6E0D3] rounded-xl px-3 py-2 text-xs text-[#2C2A29] focus:outline-none focus:border-[#C86D51] pr-7"
            />
            <button
              v-if="searchQuery"
              @click="searchQuery = ''"
              class="absolute right-2.5 top-2.5 text-[#78736A] hover:text-[#2C2A29]"
            >
              ✕
            </button>
          </div>

          <!-- Search Results -->
          <div v-if="searchQuery.trim()" class="mt-2 space-y-2">
            <div
              v-for="(item, idx) in searchResults"
              :key="idx"
              class="bg-white border border-[#E6E0D3] rounded-xl p-3 shadow-2xs"
            >
              <div class="font-bold text-[#C86D51] mb-1">
                ❓ {{ item.q }}
              </div>
              <p class="text-[#2C2A29] leading-relaxed text-[11px]">
                {{ item.a }}
              </p>
            </div>

            <div v-if="searchResults.length === 0" class="text-center py-4 text-[#78736A]">
              Không tìm thấy câu trả lời khớp với "{{ searchQuery }}". Hãy xem các câu hỏi mẫu bên dưới!
            </div>
          </div>
        </div>

        <!-- FEATURE 3: CONTEXTUAL FAQS BY ACTIVE PROTOCOL -->
        <div v-if="!searchQuery.trim()" class="space-y-3">
          <div class="flex items-center justify-between border-b border-[#E6E0D3] pb-2">
            <span class="font-bold text-[#2C2A29] flex items-center gap-1">
              <Lightbulb :size="14" class="text-[#C86D51]" />
              <span>Câu hỏi về {{ activeProtocol.name }}:</span>
            </span>
            <span class="text-[10px] text-[#78736A]">Bấm để xem giải thích</span>
          </div>

          <!-- Accordion FAQ Items -->
          <div class="space-y-2">
            <div
              v-for="(faq, idx) in currentProtocolFaqs"
              :key="'p-' + idx"
              class="border border-[#E6E0D3] rounded-xl overflow-hidden bg-white shadow-2xs"
            >
              <button
                @click="toggleFaq('p-' + idx)"
                class="w-full text-left p-3 font-semibold text-[#2C2A29] hover:bg-[#F3EFE6]/50 flex items-center justify-between gap-2 transition-colors cursor-pointer"
              >
                <span>{{ faq.q }}</span>
                <span class="text-[#78736A] text-xs shrink-0">
                  {{ openFaqKey === 'p-' + idx ? '▲' : '▼' }}
                </span>
              </button>
              <div
                v-if="openFaqKey === 'p-' + idx"
                class="px-3 pb-3 text-[11px] text-[#78736A] leading-relaxed border-t border-[#E6E0D3]/60 bg-[#FAF8F5] pt-2"
              >
                {{ faq.a }}
              </div>
            </div>
          </div>

          <!-- General App FAQs -->
          <div class="pt-3">
            <span class="font-bold text-[#78736A] block mb-2 text-[11px] uppercase tracking-wider font-mono">
              Thắc mắc chung về tính năng:
            </span>
            <div class="space-y-2">
              <div
                v-for="(faq, idx) in generalFaqs"
                :key="'g-' + idx"
                class="border border-[#E6E0D3] rounded-xl overflow-hidden bg-white shadow-2xs"
              >
                <button
                  @click="toggleFaq('g-' + idx)"
                  class="w-full text-left p-2.5 font-medium text-[#2C2A29] hover:bg-[#F3EFE6]/50 flex items-center justify-between gap-2 transition-colors cursor-pointer text-[11px]"
                >
                  <span>{{ faq.q }}</span>
                  <span class="text-[#78736A] text-xs shrink-0">
                    {{ openFaqKey === 'g-' + idx ? '▲' : '▼' }}
                  </span>
                </button>
                <div
                  v-if="openFaqKey === 'g-' + idx"
                  class="px-2.5 pb-2.5 text-[11px] text-[#78736A] leading-relaxed border-t border-[#E6E0D3]/60 bg-[#FAF8F5] pt-2"
                >
                  {{ faq.a }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Drawer Footer -->
      <div class="bg-[#F3EFE6] border-t border-[#E6E0D3] p-3 text-center text-[11px] text-[#78736A]">
        PersonaFlow luôn lắng nghe và đồng hành cùng kỷ luật của bạn 🌿
      </div>
    </div>

    <!-- 3. INTERACTIVE SPOTLIGHT TOUR OVERLAY -->
    <div v-if="isTourActive" class="fixed inset-0 z-50 pointer-events-auto">
      <!-- Dark semi-transparent backdrop -->
      <div class="fixed inset-0 bg-[#2C2A29]/65 transition-all duration-300"></div>

      <!-- Spotlight Floating Card -->
      <div
        class="fixed z-50 max-w-md w-[92vw] sm:w-[400px] bg-[#FAF8F5] border-2 border-[#C86D51] rounded-3xl p-6 shadow-2xl animate-in zoom-in-95"
        :style="cardPositionStyle"
      >
        <!-- Step Badge & Header -->
        <div class="flex items-center justify-between mb-3 border-b border-[#E6E0D3] pb-2.5">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-[#C86D51] text-white flex items-center justify-center font-bold font-mono text-xs">
              {{ currentTourStep.step }}
            </span>
            <span class="text-xs font-bold text-[#C86D51] uppercase tracking-wider font-mono">
              Bước {{ currentTourStepIndex + 1 }} / {{ TOUR_STEPS.length }}
            </span>
          </div>

          <button
            @click="stopTour"
            class="text-xs text-[#78736A] hover:text-[#2C2A29] cursor-pointer"
          >
            Đóng tour ✕
          </button>
        </div>

        <!-- Step Title & Description -->
        <h4 class="font-bold text-base text-[#2C2A29] mb-2">
          {{ currentTourStep.title }}
        </h4>
        <p class="text-xs text-[#78736A] leading-relaxed mb-6">
          {{ currentTourStep.desc }}
        </p>

        <!-- Navigation Buttons -->
        <div class="flex items-center justify-between pt-2 border-t border-[#E6E0D3]">
          <button
            v-if="currentTourStepIndex > 0"
            @click="prevTourStep"
            class="px-3.5 py-1.5 rounded-xl bg-[#E6E0D3] text-[#78736A] hover:text-[#2C2A29] text-xs font-semibold cursor-pointer"
          >
            ← Trước
          </button>
          <div v-else></div>

          <button
            @click="nextTourStep"
            class="px-4 py-2 rounded-xl bg-[#C86D51] hover:bg-[#B35B40] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>{{ currentTourStepIndex === TOUR_STEPS.length - 1 ? 'Hoàn tất tour ✓' : 'Tiếp theo →' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { X, Search, Compass, Lightbulb } from 'lucide-vue-next';
import { TOUR_STEPS, CONTEXTUAL_FAQS } from '../data/assistantKnowledge';
import { PROTOCOLS } from '../data/protocols';

const props = defineProps({
  userProfile: {
    type: Object,
    required: true,
  },
});

const isOpen = ref(false);
const searchQuery = ref('');
const openFaqKey = ref(null);

// Spotlight Tour State
const isTourActive = ref(false);
const currentTourStepIndex = ref(0);

const activeProtocol = computed(() => {
  return PROTOCOLS[props.userProfile.assignedProtocol] || PROTOCOLS.procrastination;
});

const currentProtocolFaqs = computed(() => {
  return CONTEXTUAL_FAQS[props.userProfile.assignedProtocol] || CONTEXTUAL_FAQS.procrastination;
});

const generalFaqs = computed(() => {
  return CONTEXTUAL_FAQS.general;
});

// All FAQs combined for search
const allFaqs = computed(() => {
  let list = [...generalFaqs.value];
  Object.keys(CONTEXTUAL_FAQS).forEach((k) => {
    if (k !== 'general') {
      list = list.concat(CONTEXTUAL_FAQS[k]);
    }
  });
  return list;
});

const searchResults = computed(() => {
  const q = searchQuery.value.toLowerCase().trim();
  if (!q) return [];
  return allFaqs.value.filter((item) => {
    return (
      item.q.toLowerCase().includes(q) ||
      item.a.toLowerCase().includes(q) ||
      (item.keywords && item.keywords.some((kw) => kw.includes(q)))
    );
  });
});

const currentTourStep = computed(() => {
  return TOUR_STEPS[currentTourStepIndex.value];
});

// Calculate responsive centered position for tour card
const cardPositionStyle = computed(() => {
  // Center in bottom half of viewport so target element is visible above
  return {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
});

function toggleFaq(key) {
  openFaqKey.value = openFaqKey.value === key ? null : key;
}

function startTour() {
  isOpen.value = false;
  currentTourStepIndex.value = 0;
  isTourActive.value = true;
  highlightTarget();
}

function stopTour() {
  isTourActive.value = false;
  removeHighlight();
  localStorage.setItem('personaflow_seen_tour', 'true');
}

function nextTourStep() {
  if (currentTourStepIndex.value < TOUR_STEPS.length - 1) {
    currentTourStepIndex.value++;
    highlightTarget();
  } else {
    stopTour();
  }
}

function prevTourStep() {
  if (currentTourStepIndex.value > 0) {
    currentTourStepIndex.value--;
    highlightTarget();
  }
}

function highlightTarget() {
  removeHighlight();
  setTimeout(() => {
    const selector = currentTourStep.value.target;
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-4', 'ring-[#C86D51]', 'ring-offset-4', 'relative', 'z-50', 'bg-white', 'transition-all');
    }
  }, 100);
}

function removeHighlight() {
  TOUR_STEPS.forEach((st) => {
    const el = document.querySelector(st.target);
    if (el) {
      el.classList.remove('ring-4', 'ring-[#C86D51]', 'ring-offset-4', 'relative', 'z-50', 'bg-white');
    }
  });
}

onMounted(() => {
  // If user has never taken tour, can auto suggest after 3 seconds
  const seenTour = localStorage.getItem('personaflow_seen_tour');
  if (!seenTour) {
    // Leave drawer closed by default, user can click anytime
  }
});
</script>
