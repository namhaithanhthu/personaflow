<template>
  <div class="min-h-screen bg-[#FAF8F5] text-[#2C2A29] flex flex-col font-sans selection:bg-[#C86D51]/20">
    <!-- ONBOARDING QUIZ VIEW (If no profile exists) -->
    <div v-if="!userProfile" class="flex-1 flex items-center justify-center py-6">
      <OnboardingQuiz @quiz-completed="handleQuizCompleted" />
    </div>

    <!-- MAIN APP DASHBOARD VIEW -->
    <div v-else class="flex-1 flex flex-col">
      <!-- Fixed Header Bar with Tour Target -->
      <div id="tour-header">
        <HeaderBar
          :user-profile="userProfile"
          :is-burnout-mode="isBurnoutMode"
          :streak-days="streakDays"
          @toggle-burnout="toggleBurnoutMode"
        />
      </div>

      <!-- PRIMARY 3-TAB NAVIGATION (PROGRESSIVE DISCLOSURE) -->
      <div id="tour-tabs" class="border-b border-[#E6E0D3] bg-[#FAF8F5] sticky top-16 z-20 transition-all">
        <div class="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <nav class="flex items-center gap-1 sm:gap-2">
            <!-- TAB 1: THỰC HÀNH HÔM NAY (DEFAULT) -->
            <button
              @click="activeMainTab = 'today'"
              :class="[
                'px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 cursor-pointer',
                activeMainTab === 'today'
                  ? 'border-[#C86D51] text-[#C86D51]'
                  : 'border-transparent text-[#78736A] hover:text-[#2C2A29]'
              ]"
            >
              <span>🧭</span>
              <span>Thực Hành Hôm Nay</span>
            </button>

            <!-- TAB 2: THỐNG KÊ & CHUỖI -->
            <button
              @click="activeMainTab = 'analytics'"
              :class="[
                'px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 cursor-pointer',
                activeMainTab === 'analytics'
                  ? 'border-[#C86D51] text-[#C86D51]'
                  : 'border-transparent text-[#78736A] hover:text-[#2C2A29]'
              ]"
            >
              <span>📊</span>
              <span>Thống Kê & Chuỗi</span>
            </button>

            <!-- TAB 3: HỒ SƠ & ĐỔI PHƯƠNG PHÁP -->
            <button
              @click="activeMainTab = 'profile'"
              :class="[
                'px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 cursor-pointer',
                activeMainTab === 'profile'
                  ? 'border-[#C86D51] text-[#C86D51]'
                  : 'border-transparent text-[#78736A] hover:text-[#2C2A29]'
              ]"
            >
              <span>👤</span>
              <span>Hồ Sơ & Đổi Phương Pháp</span>
            </button>
          </nav>

          <!-- Current Active Protocol Label -->
          <div class="hidden md:flex items-center gap-2 text-xs text-[#78736A] font-mono">
            <span>Đang dùng:</span>
            <strong class="text-[#2C2A29] font-semibold">{{ currentProtocol.name }}</strong>
          </div>
        </div>
      </div>

      <!-- Main Body Container -->
      <main class="max-w-6xl mx-auto w-full px-4 py-6 sm:py-8 flex-1 flex flex-col gap-6">
        <!-- TAB 1: THỰC HÀNH HÔM NAY -->
        <div v-if="activeMainTab === 'today'" class="space-y-6">
          <!-- Collapsible 3-Step Quick Start Banner -->
          <div id="tour-quick-start">
            <QuickStartBanner :protocol="currentProtocol" />
          </div>

          <!-- Graceful Degradation / Burnout Warning Banner -->
          <BurnoutBanner
            :is-burnout-mode="isBurnoutMode"
            @turn-off="isBurnoutMode = false"
          />

          <!-- Active Protocol Workspace -->
          <div id="tour-workspace" class="space-y-6">
            <ProcrastinationView
              v-if="userProfile.assignedProtocol === 'procrastination'"
              :data="protocolData.procrastination"
              :is-burnout-mode="isBurnoutMode"
              @update-data="saveProtocolData('procrastination', $event)"
            />

            <OverwhelmedView
              v-else-if="userProfile.assignedProtocol === 'overwhelmed'"
              :data="protocolData.overwhelmed"
              :is-burnout-mode="isBurnoutMode"
              @update-data="saveProtocolData('overwhelmed', $event)"
            />

            <UnfocusedBusyView
              v-else-if="userProfile.assignedProtocol === 'unfocused_busy'"
              :data="protocolData.unfocused_busy"
              :is-burnout-mode="isBurnoutMode"
              @update-data="saveProtocolData('unfocused_busy', $event)"
            />

            <DistractedView
              v-else-if="userProfile.assignedProtocol === 'distracted'"
              :data="protocolData.distracted"
              :is-burnout-mode="isBurnoutMode"
              @update-data="saveProtocolData('distracted', $event)"
            />
          </div>
        </div>

        <!-- TAB 2: THỐNG KÊ & CHUỖI KỶ LUẬT (CHART.JS) -->
        <div v-else-if="activeMainTab === 'analytics'">
          <AnalyticsTab />
        </div>

        <!-- TAB 3: HỒ SƠ & THƯ VIỆN ĐỔI PHƯƠNG PHÁP -->
        <div v-else-if="activeMainTab === 'profile'">
          <ProfileTab
            :user-profile="userProfile"
            :current-protocol-id="userProfile.assignedProtocol"
            @retake-quiz="handleRetakeQuiz"
            @switch-protocol="handleChangeProtocol"
          />
        </div>
      </main>

      <!-- FlowGuide Interactive Assistant Companion -->
      <FlowGuideAssistant :user-profile="userProfile" />

      <!-- Editorial Minimalist Footer -->
      <footer class="border-t border-[#E6E0D3] py-4 px-4 text-center text-xs text-[#78736A] bg-[#FAF8F5]">
        <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>PersonaFlow • Diagnostic-Driven Self-Development & Discipline</span>
          <span class="font-mono text-[11px]">Được xây dựng trên nền tảng Vue 3 & Khoa học Hành vi</span>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import OnboardingQuiz from './components/OnboardingQuiz.vue';
import HeaderBar from './components/HeaderBar.vue';
import QuickStartBanner from './components/QuickStartBanner.vue';
import BurnoutBanner from './components/BurnoutBanner.vue';
import AnalyticsTab from './components/AnalyticsTab.vue';
import ProfileTab from './components/ProfileTab.vue';
import FlowGuideAssistant from './components/FlowGuideAssistant.vue';

// 4 Protocol Views
import ProcrastinationView from './components/protocols/ProcrastinationView.vue';
import OverwhelmedView from './components/protocols/OverwhelmedView.vue';
import UnfocusedBusyView from './components/protocols/UnfocusedBusyView.vue';
import DistractedView from './components/protocols/DistractedView.vue';

import { PROTOCOLS, INITIAL_MOCK_DATA } from './data/protocols';

// State
const userProfile = ref(null);
const activeMainTab = ref('today'); // 'today' | 'analytics' | 'profile'
const isBurnoutMode = ref(false);
const streakDays = ref(5);

const protocolData = ref({ ...INITIAL_MOCK_DATA });

const currentProtocol = computed(() => {
  if (!userProfile.value) return PROTOCOLS.procrastination;
  return PROTOCOLS[userProfile.value.assignedProtocol] || PROTOCOLS.procrastination;
});

// Initialize from localStorage
onMounted(() => {
  const savedProfile = localStorage.getItem('personaflow_profile');
  if (savedProfile) {
    try {
      userProfile.value = JSON.parse(savedProfile);
    } catch {
      userProfile.value = null;
    }
  }

  const savedData = localStorage.getItem('personaflow_data');
  if (savedData) {
    try {
      protocolData.value = { ...INITIAL_MOCK_DATA, ...JSON.parse(savedData) };
    } catch {
      protocolData.value = { ...INITIAL_MOCK_DATA };
    }
  }

  const savedBurnout = localStorage.getItem('personaflow_burnout');
  if (savedBurnout) {
    isBurnoutMode.value = savedBurnout === 'true';
  }

  const savedTab = localStorage.getItem('personaflow_active_tab');
  if (savedTab) {
    activeMainTab.value = savedTab;
  }
});

// Watch and sync tab to localStorage
watch(activeMainTab, (newTab) => {
  localStorage.setItem('personaflow_active_tab', newTab);
});

// Watch and sync burnout mode to localStorage
watch(isBurnoutMode, (newVal) => {
  localStorage.setItem('personaflow_burnout', newVal ? 'true' : 'false');
});

function handleQuizCompleted(profile) {
  userProfile.value = profile;
  activeMainTab.value = 'today';
  localStorage.setItem('personaflow_profile', JSON.stringify(profile));
  localStorage.setItem('personaflow_data', JSON.stringify(protocolData.value));
}

function handleRetakeQuiz() {
  if (window.confirm('Bạn có chắc muốn thực hiện lại bài chẩn đoán 4 bước từ đầu?')) {
    localStorage.removeItem('personaflow_profile');
    userProfile.value = null;
  }
}

function handleChangeProtocol(protocolId) {
  if (userProfile.value) {
    userProfile.value.assignedProtocol = protocolId;
    localStorage.setItem('personaflow_profile', JSON.stringify(userProfile.value));
    activeMainTab.value = 'today';
  }
}

function toggleBurnoutMode() {
  isBurnoutMode.value = !isBurnoutMode.value;
}

function saveProtocolData(protocolKey, updated) {
  protocolData.value[protocolKey] = updated;
  localStorage.setItem('personaflow_data', JSON.stringify(protocolData.value));
}
</script>
