<template>
  <div class="space-y-6">
    <!-- Protocol Header with Help Guide Button -->
    <div class="bg-[#F3EFE6] border border-[#E6E0D3] rounded-3xl p-5 sm:p-6 shadow-xs">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span class="text-[11px] font-bold text-[#C86D51] uppercase tracking-wider font-mono">
            Giao thức: Eat That Frog + 5-Second Rule
          </span>
          <h3 class="text-lg sm:text-xl font-bold text-[#2C2A29] mt-0.5">
            Xử Lý Con Ếch Lớn Nhất & Phá Vỡ Sự Do Dự
          </h3>
          <p class="text-xs text-[#78736A] mt-1 max-w-2xl leading-relaxed">
            Nguyên tắc Brian Tracy: Bộ não luôn có xu hướng làm việc dễ để trốn tránh việc khó. Khóa toàn bộ việc phụ cho đến khi Con Ếch hoàn tất để triệt tiêu đường thoái lui.
          </p>
        </div>

        <div class="shrink-0 flex items-center gap-2">
          <!-- Guide Modal Trigger -->
          <button
            @click="isGuideOpen = true"
            class="px-3 py-2 rounded-xl bg-white hover:bg-[#FAF8F5] text-[#2C2A29] text-xs font-semibold border border-[#D8D0C2] transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
          >
            <HelpCircle :size="15" class="text-[#C86D51]" />
            <span>Cách áp dụng</span>
          </button>

          <!-- 5-Second Launcher Trigger Button -->
          <button
            @click="start5SecCountdown"
            class="px-4 py-2 rounded-xl bg-[#C86D51] hover:bg-[#B35B40] text-white font-semibold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <span>🚀</span>
            <span>Kích Hoạt 5 Giây</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Active Timer Banner (if working) -->
    <div
      v-if="isWorkingTimerActive"
      class="bg-[#FAF0EB] border border-[#C86D51]/40 rounded-2xl p-4 flex items-center justify-between shadow-xs animate-in fade-in"
    >
      <div class="flex items-center gap-3">
        <div class="w-3 h-3 rounded-full bg-[#C86D51] animate-ping"></div>
        <div>
          <div class="text-xs font-bold text-[#C86D51] uppercase tracking-wider font-mono">
            Đang trong phiên hành động
          </div>
          <div class="text-sm font-semibold text-[#2C2A29]">
            {{ frog ? frog.title : 'Nhiệm vụ trọng tâm' }}
          </div>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <div class="font-mono text-xl font-bold text-[#C86D51]">
          {{ formatTimer(workingSeconds) }}
        </div>
        <button
          @click="completeFrogViaTimer"
          class="px-3.5 py-1.5 rounded-lg bg-[#5F7A61] hover:bg-[#4E6650] text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
        >
          Hoàn Thành Ngay
        </button>
      </div>
    </div>

    <!-- WIDGET 1: THE FROG OF THE DAY (HERO CARD WITH FULL CRUD) -->
    <div
      v-if="frog"
      :class="[
        'bg-white border-2 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden transition-all',
        frog.completed ? 'border-[#5F7A61]/50 bg-[#EEF3EF]/10' : 'border-[#C86D51]'
      ]"
    >
      <div class="absolute -top-3 -right-3 text-7xl opacity-5 pointer-events-none select-none">
        🐸
      </div>

      <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
        <div class="flex items-start gap-3 flex-1 min-w-0">
          <span class="text-3xl shrink-0 mt-0.5">🐸</span>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap mb-1">
              <span class="text-xs font-bold uppercase tracking-wider text-[#C86D51] font-mono">
                Con Ếch Trong Ngày (The Frog #1)
              </span>
              <span
                v-if="isBurnoutMode"
                class="text-[10px] px-2 py-0.5 rounded-full bg-[#5F7A61] text-white font-mono font-medium"
              >
                MVE: 15 Phút
              </span>
            </div>

            <!-- Inline Edit or Title Display -->
            <div v-if="editingFrog" class="space-y-2 mt-2">
              <input
                v-model="editFrogTitle"
                type="text"
                class="w-full bg-[#FAF8F5] border border-[#C86D51] rounded-xl px-3 py-1.5 text-sm sm:text-base font-bold text-[#2C2A29] focus:outline-none"
                placeholder="VD: Hoàn thành đề xuất chiến lược phát triển sản phẩm Q4"
                @keyup.enter="saveEditFrog"
                @keyup.esc="editingFrog = false"
                autoFocus
              />
              <textarea
                v-model="editFrogContext"
                rows="2"
                class="w-full bg-[#FAF8F5] border border-[#E6E0D3] rounded-xl px-3 py-1.5 text-xs text-[#78736A] focus:outline-none"
                placeholder="Ghi chú bối cảnh hoặc lý do việc này quan trọng..."
              ></textarea>
              <div class="flex items-center gap-2">
                <button
                  @click="saveEditFrog"
                  class="px-3 py-1 bg-[#C86D51] text-white text-xs font-semibold rounded-lg cursor-pointer flex items-center gap-1"
                >
                  <Check :size="13" /> Lưu Con Ếch
                </button>
                <button
                  @click="editingFrog = false"
                  class="px-3 py-1 bg-[#E6E0D3] text-[#78736A] text-xs font-semibold rounded-lg cursor-pointer"
                >
                  Hủy
                </button>
              </div>
            </div>

            <div v-else>
              <h4
                @click="startEditFrog"
                class="text-base sm:text-xl font-bold text-[#2C2A29] mt-0.5 hover:text-[#C86D51] cursor-pointer inline-flex items-center gap-2 group"
                title="Bấm để chỉnh sửa tên Con Ếch"
              >
                <span>{{ frog.title }}</span>
                <Edit3 :size="14" class="opacity-0 group-hover:opacity-100 text-[#78736A] transition-opacity" />
              </h4>
              <p class="text-xs sm:text-sm text-[#78736A] leading-relaxed mt-1">
                {{ frog.context || 'Chưa có ghi chú bối cảnh.' }}
              </p>
            </div>
          </div>
        </div>

        <!-- Action Controls -->
        <div class="flex items-center gap-2 shrink-0">
          <button
            @click="startEditFrog"
            class="p-2 rounded-xl bg-[#F3EFE6] hover:bg-[#E6E0D3] text-[#78736A] hover:text-[#2C2A29] transition-colors cursor-pointer"
            title="Chỉnh sửa Con Ếch"
          >
            <Edit3 :size="15" />
          </button>

          <button
            @click="removeFrog"
            class="p-2 rounded-xl bg-[#F3EFE6] hover:bg-rose-100 text-[#78736A] hover:text-rose-600 transition-colors cursor-pointer"
            title="Xóa Con Ếch"
          >
            <Trash2 :size="15" />
          </button>

          <button
            @click="toggleFrog"
            :class="[
              'px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer',
              frog.completed
                ? 'bg-[#5F7A61] text-white shadow-xs'
                : 'bg-[#C86D51] hover:bg-[#B35B40] text-white shadow-xs'
            ]"
          >
            <span>{{ frog.completed ? '✓ Đã Xong Ếch!' : 'Đánh Dấu Xong' }}</span>
          </button>
        </div>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-2 text-xs pt-3 border-t border-[#E6E0D3]">
        <div class="flex items-center gap-3 text-[#78736A]">
          <span>⏱️ Dự tính: <strong>{{ isBurnoutMode ? '15 phút (Đã thu gọn)' : `${frog.durationMinutes} phút` }}</strong></span>
          <span>🎯 Ưu tiên: <strong class="text-[#C86D51]">Số 1 hôm nay</strong></span>
        </div>

        <div v-if="frog.completed" class="text-[#5F7A61] font-semibold flex items-center gap-1">
          <span>🎉 Xuất sắc! Việc khó nhất đã xong, các việc phụ bên dưới đã mở khóa.</span>
        </div>
        <div v-else class="text-[#C86D51] font-medium flex items-center gap-1">
          <span>⏳ Hoàn thành việc này để mở khóa danh sách việc phụ bên dưới.</span>
        </div>
      </div>
    </div>

    <!-- FROG EMPTY STATE -->
    <div
      v-else
      class="bg-white border-2 border-dashed border-[#E6E0D3] rounded-3xl p-8 text-center shadow-xs"
    >
      <div class="w-12 h-12 rounded-2xl bg-[#FAF0EB] text-[#C86D51] flex items-center justify-center text-2xl mx-auto mb-3">
        🐸
      </div>
      <h4 class="font-bold text-base text-[#2C2A29]">
        Chưa có "Con Ếch" nào được chọn hôm nay!
      </h4>
      <p class="text-xs text-[#78736A] max-w-md mx-auto mt-1 mb-4 leading-relaxed">
        Quy tắc vàng: Hãy chọn việc khó nhất mà bạn đang muốn né tránh nhất để đặt lên làm Con Ếch.
      </p>

      <div class="flex flex-wrap items-center justify-center gap-2">
        <button
          @click="resetSampleFrog"
          class="px-4 py-2 rounded-xl bg-[#FAF0EB] hover:bg-[#F5E2D8] text-[#C86D51] text-xs font-semibold transition-colors cursor-pointer"
        >
          + Đặt Con Ếch Mẫu Để Thử Nghiệm
        </button>
        <button
          @click="createNewBlankFrog"
          class="px-4 py-2 rounded-xl bg-[#C86D51] hover:bg-[#B35B40] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          + Tự Nhập Con Ếch Mới
        </button>
      </div>
    </div>

    <!-- WIDGET 2: SECONDARY TASKS (WITH FULL CRUD & LOCKING) -->
    <div class="bg-[#F3EFE6] border border-[#E6E0D3] rounded-3xl p-6 sm:p-7 shadow-xs relative">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h4 class="text-base font-bold text-[#2C2A29]">
            Nhiệm Vụ Thứ Cấp & Việc Phụ
          </h4>
          <p class="text-xs text-[#78736A]">
            Các việc chỉ được phép giải quyết sau khi Con Ếch đã được nuốt trọn.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <button
            v-if="secondaryTasks.some(t => t.completed)"
            @click="clearCompletedSecondary"
            class="px-3 py-1.5 rounded-xl bg-white hover:bg-rose-50 text-rose-700 border border-[#D8D0C2] text-xs font-medium transition-colors cursor-pointer"
          >
            Dọn dẹp việc đã xong
          </button>

          <button
            @click="showAddSecondary = true"
            class="px-3.5 py-1.5 rounded-xl bg-[#2C2A29] hover:bg-[#454240] text-white text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1"
          >
            <Plus :size="14" />
            <span>Thêm việc phụ</span>
          </button>
        </div>
      </div>

      <!-- Quick Add Form -->
      <form
        v-if="showAddSecondary"
        @submit.prevent="addSecondaryTask"
        class="bg-white border border-[#E6E0D3] rounded-2xl p-4 mb-4 shadow-2xs space-y-3"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-[#2C2A29]">Thêm việc phụ mới</span>
          <button type="button" @click="showAddSecondary = false" class="text-xs text-[#78736A]">✕</button>
        </div>
        <div class="flex flex-col sm:flex-row gap-2">
          <input
            v-model="newSecondaryTitle"
            type="text"
            required
            placeholder="VD: Phản hồi 3 email đối tác, Soát lại báo cáo tuần..."
            class="flex-1 bg-[#FAF8F5] border border-[#E6E0D3] rounded-xl px-3 py-2 text-xs text-[#2C2A29] focus:outline-none focus:border-[#C86D51]"
          />
          <input
            v-model.number="newSecondaryDuration"
            type="number"
            min="5"
            placeholder="Phút"
            class="w-20 bg-[#FAF8F5] border border-[#E6E0D3] rounded-xl px-2 py-2 text-xs text-[#2C2A29] text-center focus:outline-none"
          />
          <button
            type="submit"
            class="px-4 py-2 bg-[#C86D51] text-white text-xs font-semibold rounded-xl cursor-pointer"
          >
            Thêm
          </button>
        </div>
      </form>

      <!-- If Frog is NOT completed: Blur & Lock Overlay -->
      <div class="relative">
        <div :class="['space-y-2.5 transition-all', (!frog || !frog.completed) ? 'filter blur-[3px] select-none pointer-events-none opacity-40' : '']">
          <div
            v-for="task in secondaryTasks"
            :key="task.id"
            class="group bg-white border border-[#E6E0D3] rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-2xs transition-all hover:border-[#D8D0C2]"
          >
            <!-- Checkbox & Title / Inline Edit -->
            <div class="flex items-center gap-3 min-w-0 flex-1">
              <input
                type="checkbox"
                :checked="task.completed"
                @change="toggleSecondary(task.id)"
                class="w-4 h-4 rounded text-[#C86D51] accent-[#C86D51] cursor-pointer"
              />

              <!-- Inline edit field if editing -->
              <div v-if="editingTaskId === task.id" class="flex items-center gap-2 flex-1">
                <input
                  v-model="editTaskTitle"
                  type="text"
                  class="flex-1 bg-[#FAF8F5] border border-[#C86D51] rounded-lg px-2 py-1 text-xs text-[#2C2A29] focus:outline-none"
                  @keyup.enter="saveEditTask(task.id)"
                  @keyup.esc="editingTaskId = null"
                  autoFocus
                />
                <button @click="saveEditTask(task.id)" class="text-xs text-[#5F7A61] font-semibold">Lưu</button>
                <button @click="editingTaskId = null" class="text-xs text-[#78736A]">Hủy</button>
              </div>

              <!-- Normal display with click-to-edit -->
              <span
                v-else
                @click="startEditTask(task)"
                :class="[
                  'text-xs sm:text-sm cursor-pointer hover:underline',
                  task.completed ? 'line-through text-[#78736A] opacity-60' : 'text-[#2C2A29]'
                ]"
                title="Bấm để chỉnh sửa tên việc"
              >
                {{ task.title }}
              </span>
            </div>

            <!-- Duration & Actions -->
            <div class="flex items-center gap-2 shrink-0">
              <span class="text-[11px] font-mono text-[#78736A]">
                ~{{ task.durationMinutes }}m
              </span>

              <button
                @click="startEditTask(task)"
                class="opacity-0 group-hover:opacity-100 p-1 text-[#78736A] hover:text-[#2C2A29] transition-opacity cursor-pointer"
                title="Sửa việc này"
              >
                <Edit3 :size="13" />
              </button>

              <button
                @click="removeSecondary(task.id)"
                class="opacity-0 group-hover:opacity-100 p-1 text-[#78736A] hover:text-rose-600 transition-opacity cursor-pointer"
                title="Xóa việc này"
              >
                <Trash2 :size="13" />
              </button>
            </div>
          </div>

          <!-- Empty State when secondary tasks are empty -->
          <div
            v-if="secondaryTasks.length === 0"
            class="text-center py-8 border border-dashed border-[#D8D0C2] rounded-2xl bg-white/40"
          >
            <p class="text-xs text-[#78736A] mb-2">Chưa có nhiệm vụ phụ nào trong danh sách.</p>
            <button
              @click="resetSampleSecondary"
              class="px-3 py-1.5 rounded-xl bg-white border border-[#D8D0C2] text-xs font-semibold text-[#2C2A29] hover:bg-[#FAF8F5] cursor-pointer"
            >
              + Thêm 3 Việc Phụ Mẫu
            </button>
          </div>
        </div>

        <!-- Lock Curtain -->
        <div
          v-if="!frog || !frog.completed"
          class="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
        >
          <div class="w-12 h-12 rounded-2xl bg-white border border-[#D8D0C2] flex items-center justify-center text-xl shadow-xs mb-2">
            🔒
          </div>
          <h5 class="font-bold text-sm text-[#2C2A29]">
            Danh Sách Đang Bị Khóa
          </h5>
          <p class="text-xs text-[#78736A] max-w-sm mt-0.5">
            Quy luật Eat That Frog nghiêm cấm bạn làm việc lặt vặt để trốn tránh việc khó. Hãy hoàn tất "Con Ếch" ở trên trước!
          </p>
        </div>
      </div>
    </div>

    <!-- 5-SECOND COUNTDOWN OVERLAY MODAL -->
    <div
      v-if="countdownActive"
      class="fixed inset-0 z-50 bg-[#2C2A29]/80 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div class="bg-[#FAF8F5] border border-[#E6E0D3] rounded-3xl max-w-md w-full p-8 text-center shadow-2xl animate-in zoom-in-95">
        <span class="text-xs font-bold uppercase tracking-widest text-[#C86D51] font-mono">
          Mel Robbins 5-Second Rule
        </span>
        <h3 class="text-lg font-bold text-[#2C2A29] mt-1 mb-6">
          Đếm ngược để tắt mọi suy nghĩ trì hoãn!
        </h3>

        <!-- Big Countdown Number -->
        <div class="my-6">
          <div
            v-if="countdownNumber > 0"
            class="text-7xl font-extrabold text-[#C86D51] font-mono tracking-tight animate-bounce"
          >
            {{ countdownNumber }}
          </div>
          <div
            v-else
            class="text-3xl sm:text-4xl font-extrabold text-[#5F7A61] font-mono tracking-tight animate-pulse"
          >
            HÀNH ĐỘNG NGAY!
          </div>
        </div>

        <p class="text-xs text-[#78736A] leading-relaxed mb-6">
          Khi não bạn muốn chần chừ, hãy đếm 5-4-3-2-1 và lập tức đặt tay vào bàn phím trước khi não kịp nghĩ ra lý do thoái lui.
        </p>

        <button
          @click="cancelCountdown"
          class="text-xs text-[#78736A] hover:text-[#2C2A29] underline cursor-pointer"
        >
          Hủy bỏ
        </button>
      </div>
    </div>

    <!-- Method Guide Modal -->
    <MethodGuideModal
      :is-open="isGuideOpen"
      :guide="PROTOCOLS.procrastination.guideModal"
      @close="isGuideOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue';
import { HelpCircle, Trash2, Edit3, Plus, Check } from 'lucide-vue-next';
import { PROTOCOLS, INITIAL_MOCK_DATA } from '../../data/protocols';
import MethodGuideModal from '../MethodGuideModal.vue';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  isBurnoutMode: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update-data']);

const frog = ref(props.data.frog);
const secondaryTasks = ref(props.data.secondaryTasks || []);
const isGuideOpen = ref(false);

// Frog editing state
const editingFrog = ref(false);
const editFrogTitle = ref('');
const editFrogContext = ref('');

// Secondary editing & adding state
const showAddSecondary = ref(false);
const newSecondaryTitle = ref('');
const newSecondaryDuration = ref(15);
const editingTaskId = ref(null);
const editTaskTitle = ref('');

// Countdown state
const countdownActive = ref(false);
const countdownNumber = ref(5);
let countdownTimer = null;

// Work timer state
const isWorkingTimerActive = ref(false);
const workingSeconds = ref(0);
let workInterval = null;

function startEditFrog() {
  if (!frog.value) return;
  editFrogTitle.value = frog.value.title;
  editFrogContext.value = frog.value.context || '';
  editingFrog.value = true;
}

function saveEditFrog() {
  if (!editFrogTitle.value.trim() || !frog.value) return;
  frog.value.title = editFrogTitle.value.trim();
  frog.value.context = editFrogContext.value.trim();
  editingFrog.value = false;
  saveData();
}

function removeFrog() {
  if (window.confirm('Bạn có chắc muốn xóa Con Ếch này?')) {
    frog.value = null;
    saveData();
  }
}

function resetSampleFrog() {
  frog.value = { ...INITIAL_MOCK_DATA.procrastination.frog };
  saveData();
}

function createNewBlankFrog() {
  frog.value = {
    id: 'frog-' + Date.now(),
    title: 'Nhiệm vụ khó nhất cần giải quyết ngay',
    context: 'Việc then chốt ảnh hưởng đến kết quả cả ngày.',
    durationMinutes: 45,
    completed: false,
    completedAt: null,
  };
  startEditFrog();
  saveData();
}

function start5SecCountdown() {
  countdownActive.value = true;
  countdownNumber.value = 5;

  if (countdownTimer) clearInterval(countdownTimer);

  countdownTimer = setInterval(() => {
    countdownNumber.value--;
    if (countdownNumber.value <= 0) {
      clearInterval(countdownTimer);
      setTimeout(() => {
        countdownActive.value = false;
        startWorkTimer();
      }, 700);
    }
  }, 900);
}

function cancelCountdown() {
  if (countdownTimer) clearInterval(countdownTimer);
  countdownActive.value = false;
}

function startWorkTimer() {
  isWorkingTimerActive.value = true;
  workingSeconds.value = 0;
  if (workInterval) clearInterval(workInterval);
  workInterval = setInterval(() => {
    workingSeconds.value++;
  }, 1000);
}

function completeFrogViaTimer() {
  if (workInterval) clearInterval(workInterval);
  isWorkingTimerActive.value = false;
  if (frog.value) frog.value.completed = true;
  saveData();
}

function formatTimer(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = (sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function toggleFrog() {
  if (!frog.value) return;
  frog.value.completed = !frog.value.completed;
  if (frog.value.completed && workInterval) {
    clearInterval(workInterval);
    isWorkingTimerActive.value = false;
  }
  saveData();
}

function addSecondaryTask() {
  if (!newSecondaryTitle.value.trim()) return;
  secondaryTasks.value.push({
    id: 'sec-' + Date.now(),
    title: newSecondaryTitle.value.trim(),
    durationMinutes: newSecondaryDuration.value || 15,
    completed: false,
  });
  newSecondaryTitle.value = '';
  newSecondaryDuration.value = 15;
  showAddSecondary.value = false;
  saveData();
}

function startEditTask(task) {
  editingTaskId.value = task.id;
  editTaskTitle.value = task.title;
}

function saveEditTask(id) {
  const t = secondaryTasks.value.find(item => item.id === id);
  if (t && editTaskTitle.value.trim()) {
    t.title = editTaskTitle.value.trim();
  }
  editingTaskId.value = null;
  saveData();
}

function toggleSecondary(id) {
  const t = secondaryTasks.value.find(item => item.id === id);
  if (t) {
    t.completed = !t.completed;
    saveData();
  }
}

function removeSecondary(id) {
  secondaryTasks.value = secondaryTasks.value.filter(item => item.id !== id);
  saveData();
}

function clearCompletedSecondary() {
  secondaryTasks.value = secondaryTasks.value.filter(item => !item.completed);
  saveData();
}

function resetSampleSecondary() {
  secondaryTasks.value = [...INITIAL_MOCK_DATA.procrastination.secondaryTasks];
  saveData();
}

function saveData() {
  emit('update-data', {
    frog: frog.value,
    secondaryTasks: secondaryTasks.value,
  });
}

onUnmounted(() => {
  if (countdownTimer) clearInterval(countdownTimer);
  if (workInterval) clearInterval(workInterval);
});
</script>
