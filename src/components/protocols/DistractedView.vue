<template>
  <div class="space-y-6">
    <!-- Header Protocol with Help Guide Button -->
    <div class="bg-[#F3EFE6] border border-[#E6E0D3] rounded-3xl p-5 sm:p-6 shadow-xs">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span class="text-[11px] font-bold text-[#935845] uppercase tracking-wider font-mono">
            Giao thức: Deep Work + Pomodoro + Distraction Dump
          </span>
          <h3 class="text-lg sm:text-xl font-bold text-[#2C2A29] mt-0.5">
            Tập Trung Sâu Tuyệt Đối & Bãi Đáp Xao Nhãng
          </h3>
          <p class="text-xs text-[#78736A] mt-1 max-w-2xl leading-relaxed">
            Nguyên tắc Cal Newport: Khi đang làm việc mà có ý nghĩ lướt mạng xã hội hay mua sắm nảy ra trong đầu, đừng cố đè nén. Hãy lập tức "đổ" nó vào <strong>Bãi Đáp Xao Nhãng (Parking Lot)</strong> để giải phóng bộ nhớ não và tiếp tục phiên làm việc sâu.
          </p>
        </div>

        <div class="shrink-0 flex items-center gap-2">
          <!-- Guide Modal Trigger -->
          <button
            @click="isGuideOpen = true"
            class="px-3 py-2 rounded-xl bg-white hover:bg-[#FAF8F5] text-[#2C2A29] text-xs font-semibold border border-[#D8D0C2] transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
          >
            <HelpCircle :size="15" class="text-[#935845]" />
            <span>Cách áp dụng</span>
          </button>
        </div>
      </div>
    </div>

    <!-- MAIN TWO COLUMNS: FOCUS TIMER & DISTRACTION PARKING LOT -->
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <!-- LEFT (3 COLS): FOCUS TIMER WIDGET -->
      <div class="lg:col-span-3 bg-white border border-[#E6E0D3] rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between border-b border-[#E6E0D3] pb-3 mb-6">
            <div class="flex items-center gap-2">
              <span class="text-xl">⏳</span>
              <div>
                <h4 class="font-bold text-base text-[#2C2A29]">Đồng Hồ Deep Work Pomodoro</h4>
                <p class="text-xs text-[#78736A]">
                  {{ isBreak ? '☕ Giờ nghỉ giải lao thư thái' : '🔥 Phiên làm việc sâu không xao nhãng' }}
                </p>
              </div>
            </div>

            <!-- Mode Selector / Presets -->
            <div class="flex items-center gap-1 bg-[#F3EFE6] p-1 rounded-xl border border-[#E6E0D3] text-xs">
              <button
                @click="setTimePreset(15)"
                :class="['px-2 py-1 rounded-lg font-mono transition-colors cursor-pointer', durationMinutes === 15 ? 'bg-white text-[#2C2A29] font-bold shadow-2xs' : 'text-[#78736A]']"
              >
                15m
              </button>
              <button
                @click="setTimePreset(25)"
                :class="['px-2 py-1 rounded-lg font-mono transition-colors cursor-pointer', durationMinutes === 25 ? 'bg-white text-[#2C2A29] font-bold shadow-2xs' : 'text-[#78736A]']"
              >
                25m
              </button>
              <button
                @click="setTimePreset(45)"
                :class="['px-2 py-1 rounded-lg font-mono transition-colors cursor-pointer', durationMinutes === 45 ? 'bg-white text-[#2C2A29] font-bold shadow-2xs' : 'text-[#78736A]']"
              >
                45m
              </button>
            </div>
          </div>

          <!-- Active Task Binding Field (Editable) -->
          <div class="mb-6">
            <div class="flex items-center justify-between mb-1">
              <label class="block text-xs font-semibold text-[#78736A] uppercase tracking-wider">
                Đang dồn toàn lực cho nhiệm vụ:
              </label>
              <span class="text-[11px] text-[#C86D51] font-medium">Bấm vào để đổi việc</span>
            </div>
            <input
              v-model="activeTaskTitle"
              @change="saveData"
              type="text"
              placeholder="VD: Thiết kế luồng trải nghiệm người dùng PersonaFlow..."
              class="w-full bg-[#FAF8F5] border border-[#E6E0D3] rounded-xl px-3.5 py-2 text-sm font-bold text-[#2C2A29] focus:outline-none focus:border-[#935845]"
            />
          </div>

          <!-- Giant Digital Clock Display -->
          <div class="text-center my-6 sm:my-8">
            <div
              :class="[
                'text-6xl sm:text-7xl font-extrabold font-mono tracking-tight transition-colors',
                isBreak ? 'text-[#5F7A61]' : 'text-[#C86D51]'
              ]"
            >
              {{ formattedTime }}
            </div>
            <div class="text-xs text-[#78736A] mt-2 font-mono">
              {{ isRunning ? 'Đang đếm lùi... Hãy giữ tập trung!' : 'Sẵn sàng khi bạn bắt đầu' }}
            </div>
          </div>
        </div>

        <!-- Timer Controls & Stats -->
        <div class="pt-4 border-t border-[#E6E0D3]">
          <div class="flex items-center justify-center gap-3">
            <button
              @click="toggleTimer"
              :class="[
                'px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white shadow-xs transition-all cursor-pointer',
                isRunning ? 'bg-[#78736A] hover:bg-[#635F57]' : 'bg-[#C86D51] hover:bg-[#B35B40]'
              ]"
            >
              {{ isRunning ? 'Tạm Dừng' : 'Bắt Đầu Tập Trung' }}
            </button>

            <button
              @click="resetTimer"
              class="px-4 py-2.5 rounded-xl bg-[#F3EFE6] hover:bg-[#E6E0D3] text-[#78736A] hover:text-[#2C2A29] font-semibold text-xs transition-colors cursor-pointer"
            >
              Đặt Lại
            </button>
          </div>

          <div class="text-center text-[11px] text-[#78736A] mt-3 font-mono">
            Hôm nay: <strong class="text-[#2C2A29]">{{ completedSessions }}</strong> phiên Deep Work hoàn thành
          </div>
        </div>
      </div>

      <!-- RIGHT (2 COLS): DISTRACTION PARKING LOT WITH FULL CRUD -->
      <div class="lg:col-span-2 bg-[#F3EFE6] border border-[#E6E0D3] rounded-3xl p-6 shadow-xs flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between border-b border-[#E6E0D3] pb-3 mb-4">
            <div class="flex items-center gap-2">
              <span class="text-lg">🅿️</span>
              <div>
                <h4 class="font-bold text-sm text-[#2C2A29]">Bãi Đáp Xao Nhãng (Parking Lot)</h4>
                <p class="text-[11px] text-[#78736A]">Ghi nhanh ý nghĩ linh tinh để não thanh thản</p>
              </div>
            </div>

            <button
              v-if="distractionDump.some(d => d.resolved)"
              @click="clearResolvedDistractions"
              class="text-[11px] font-semibold text-rose-700 hover:underline cursor-pointer"
            >
              Dọn việc đã xong
            </button>
          </div>

          <!-- Quick Dump Input with Smart Placeholder -->
          <form @submit.prevent="addDistraction" class="flex gap-2 mb-4">
            <input
              v-model="newDistractionText"
              type="text"
              placeholder="VD: Kiểm tra giá đồ Shopee, Xem tin nhắn Messenger..."
              class="flex-1 bg-white border border-[#E6E0D3] rounded-xl px-3 py-2 text-xs text-[#2C2A29] focus:outline-none focus:border-[#C86D51]"
            />
            <button
              type="submit"
              class="px-3.5 py-2 rounded-xl bg-[#935845] hover:bg-[#7D4837] text-white text-xs font-semibold shadow-2xs transition-colors shrink-0 cursor-pointer"
            >
              Trút Bỏ
            </button>
          </form>

          <!-- Dump List with Inline Edit & Delete -->
          <div class="space-y-2 max-h-[300px] overflow-y-auto pr-1">
            <div
              v-for="item in distractionDump"
              :key="item.id"
              class="group bg-white border border-[#E6E0D3] rounded-xl p-3 flex items-start justify-between gap-2 shadow-2xs transition-all hover:border-[#D8D0C2]"
            >
              <div class="flex items-start gap-2 min-w-0 flex-1">
                <input
                  type="checkbox"
                  :checked="item.resolved"
                  @change="toggleDistraction(item.id)"
                  class="w-3.5 h-3.5 rounded text-[#5F7A61] accent-[#5F7A61] cursor-pointer mt-0.5 shrink-0"
                />

                <!-- Inline Edit -->
                <div v-if="editingDumpId === item.id" class="flex items-center gap-1 flex-1">
                  <input
                    v-model="editDumpText"
                    type="text"
                    class="flex-1 bg-[#FAF8F5] border border-[#935845] rounded px-2 py-0.5 text-xs text-[#2C2A29] focus:outline-none"
                    @keyup.enter="saveEditDump(item.id)"
                    @keyup.esc="editingDumpId = null"
                    autoFocus
                  />
                  <button @click="saveEditDump(item.id)" class="text-xs text-[#5F7A61] font-semibold">Lưu</button>
                </div>

                <span
                  v-else
                  @click="startEditDump(item)"
                  :class="[
                    'text-xs leading-snug cursor-pointer truncate',
                    item.resolved ? 'line-through text-[#78736A] opacity-60' : 'text-[#2C2A29]'
                  ]"
                  title="Bấm để chỉnh sửa"
                >
                  {{ item.text }}
                </span>
              </div>

              <!-- Actions on Hover -->
              <div class="flex items-center gap-1.5 shrink-0">
                <span class="text-[10px] font-mono text-[#78736A]">{{ item.time }}</span>
                <button
                  @click="startEditDump(item)"
                  class="opacity-0 group-hover:opacity-100 p-0.5 text-[#78736A] hover:text-[#2C2A29] cursor-pointer"
                >
                  <Edit3 :size="12" />
                </button>
                <button
                  @click="removeDistraction(item.id)"
                  class="opacity-0 group-hover:opacity-100 p-0.5 text-[#78736A] hover:text-rose-600 cursor-pointer"
                >
                  <Trash2 :size="12" />
                </button>
              </div>
            </div>

            <!-- Empty State -->
            <div v-if="distractionDump.length === 0" class="text-center py-8 text-xs text-[#78736A]">
              <p>Bãi đáp đang trống.</p>
              <button
                @click="addSampleDistraction"
                class="mt-2 text-xs text-[#935845] font-semibold hover:underline cursor-pointer"
              >
                + Thêm ý nghĩ xao nhãng mẫu
              </button>
            </div>
          </div>
        </div>

        <div class="text-[11px] text-[#78736A] pt-3 border-t border-[#E6E0D3] mt-4">
          💡 Ghi ra giấy hoặc app giúp não bộ an tâm rằng "nó không bị quên", từ đó ngừng thôi thúc bạn kiểm tra ngay.
        </div>
      </div>
    </div>

    <!-- Method Guide Modal -->
    <MethodGuideModal
      :is-open="isGuideOpen"
      :guide="PROTOCOLS.distracted.guideModal"
      @close="isGuideOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue';
import { HelpCircle, Trash2, Edit3 } from 'lucide-vue-next';
import { PROTOCOLS } from '../../data/protocols';
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

const activeTaskTitle = ref(props.data.activeTask || 'Tập trung hoàn thành mã nguồn module');
const durationMinutes = ref(25);
const timeLeftSeconds = ref(25 * 60);
const isRunning = ref(false);
const isBreak = ref(false);
const completedSessions = ref(props.data.totalSessionsToday || 3);
const distractionDump = ref(props.data.distractionDump || []);
const newDistractionText = ref('');
const isGuideOpen = ref(false);

// Inline edit state
const editingDumpId = ref(null);
const editDumpText = ref('');

let timerInterval = null;

const formattedTime = computed(() => {
  const m = Math.floor(timeLeftSeconds.value / 60).toString().padStart(2, '0');
  const s = (timeLeftSeconds.value % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
});

function setTimePreset(min) {
  if (isRunning.value) clearInterval(timerInterval);
  isRunning.value = false;
  durationMinutes.value = min;
  timeLeftSeconds.value = min * 60;
  isBreak.value = false;
}

function toggleTimer() {
  if (isRunning.value) {
    clearInterval(timerInterval);
    isRunning.value = false;
  } else {
    isRunning.value = true;
    timerInterval = setInterval(() => {
      if (timeLeftSeconds.value > 0) {
        timeLeftSeconds.value--;
      } else {
        clearInterval(timerInterval);
        isRunning.value = false;
        if (!isBreak.value) {
          completedSessions.value++;
          isBreak.value = true;
          timeLeftSeconds.value = 5 * 60;
          alert('🎉 Chúc mừng bạn đã hoàn thành một phiên Deep Work! Hãy nghỉ ngơi 5 phút.');
        } else {
          isBreak.value = false;
          timeLeftSeconds.value = durationMinutes.value * 60;
          alert('⏰ Hết giờ nghỉ giải lao! Sẵn sàng cho phiên tập trung tiếp theo.');
        }
        saveData();
      }
    }, 1000);
  }
}

function resetTimer() {
  if (timerInterval) clearInterval(timerInterval);
  isRunning.value = false;
  isBreak.value = false;
  timeLeftSeconds.value = durationMinutes.value * 60;
}

function addDistraction() {
  if (!newDistractionText.value.trim()) return;

  const now = new Date();
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  distractionDump.value.unshift({
    id: 'd-' + Date.now(),
    text: newDistractionText.value.trim(),
    time: timeStr,
    resolved: false,
  });

  newDistractionText.value = '';
  saveData();
}

function startEditDump(item) {
  editingDumpId.value = item.id;
  editDumpText.value = item.text;
}

function saveEditDump(id) {
  const item = distractionDump.value.find(d => d.id === id);
  if (item && editDumpText.value.trim()) {
    item.text = editDumpText.value.trim();
  }
  editingDumpId.value = null;
  saveData();
}

function toggleDistraction(id) {
  const item = distractionDump.value.find(d => d.id === id);
  if (item) {
    item.resolved = !item.resolved;
    saveData();
  }
}

function removeDistraction(id) {
  distractionDump.value = distractionDump.value.filter(d => d.id !== id);
  saveData();
}

function clearResolvedDistractions() {
  distractionDump.value = distractionDump.value.filter(d => !d.resolved);
  saveData();
}

function addSampleDistraction() {
  distractionDump.value.unshift({
    id: 'd-' + Date.now(),
    text: 'Nhớ xem lại giá bàn phím cơ và lướt Shopee tối nay',
    time: '14:20',
    resolved: false,
  });
  saveData();
}

function saveData() {
  emit('update-data', {
    activeTask: activeTaskTitle.value,
    totalSessionsToday: completedSessions.value,
    distractionDump: distractionDump.value,
  });
}

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
});
</script>
