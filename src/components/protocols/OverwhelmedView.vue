<template>
  <div class="space-y-6">
    <!-- Protocol Header with Help Guide Button -->
    <div class="bg-[#F3EFE6] border border-[#E6E0D3] rounded-3xl p-5 sm:p-6 shadow-xs">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span class="text-[11px] font-bold text-[#5F7A61] uppercase tracking-wider font-mono">
            Giao thức: Atomic Habits + 2-Minute Rule
          </span>
          <h3 class="text-lg sm:text-xl font-bold text-[#2C2A29] mt-0.5">
            Bẻ Nhỏ Mục Tiêu Khổng Lồ & Xếp Chồng Thói Quen
          </h3>
          <p class="text-xs text-[#78736A] mt-1 max-w-2xl leading-relaxed">
            Nguyên tắc James Clear: Đừng cố ép mình làm một việc lớn khi đang thiếu động lực. Hãy thu nhỏ hành vi sao cho chỉ mất dưới 2 phút để hoàn thành. Khi đã bắt đầu bước một, đà quán tính sẽ lo phần còn lại.
          </p>
        </div>

        <div class="shrink-0 flex items-center gap-2">
          <!-- Guide Modal Trigger -->
          <button
            @click="isGuideOpen = true"
            class="px-3 py-2 rounded-xl bg-white hover:bg-[#FAF8F5] text-[#2C2A29] text-xs font-semibold border border-[#D8D0C2] transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
          >
            <HelpCircle :size="15" class="text-[#5F7A61]" />
            <span>Cách áp dụng</span>
          </button>

          <button
            @click="showShrinkerModal = true"
            class="px-4 py-2 rounded-xl bg-[#5F7A61] hover:bg-[#4E6650] text-white font-semibold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <span>✂️</span>
            <span>Thu Nhỏ 1 Việc Mới (2 Phút)</span>
          </button>
        </div>
      </div>
    </div>

    <!-- WIDGET 1: 2-MINUTE HABIT STACKING LIST -->
    <div class="bg-white border border-[#E6E0D3] rounded-3xl p-6 sm:p-7 shadow-xs">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h4 class="text-base font-bold text-[#2C2A29] flex items-center gap-2">
            <span>🌱</span> Danh Sách Thói Quen 2 Phút Đang Thực Hành
          </h4>
          <p class="text-xs text-[#78736A] mt-0.5">
            Công thức: <em>Sau khi tôi [Thói quen cũ], tôi sẽ thực hiện [Phiên bản 2 phút]</em>.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <button
            v-if="habits.some(h => h.completedToday)"
            @click="clearCompletedHabits"
            class="px-3 py-1.5 rounded-xl bg-[#FAF8F5] hover:bg-rose-50 text-rose-700 border border-[#D8D0C2] text-xs font-medium transition-colors cursor-pointer"
          >
            Dọn dẹp việc đã xong
          </button>

          <span class="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-[#EEF3EF] text-[#5F7A61] border border-[#5F7A61]/20">
            {{ habits.filter(h => h.completedToday).length }}/{{ habits.length }} Đã xong hôm nay
          </span>
        </div>
      </div>

      <!-- Habits Cards -->
      <div class="space-y-4">
        <div
          v-for="habit in habits"
          :key="habit.id"
          class="group bg-[#FAF8F5] border border-[#E6E0D3] rounded-2xl p-4 sm:p-5 shadow-2xs transition-all hover:border-[#D8D0C2]"
        >
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <!-- Left: Stacking Formula / Inline Edit -->
            <div class="flex items-start gap-3.5 flex-1 min-w-0">
              <input
                type="checkbox"
                :checked="habit.completedToday"
                @change="toggleHabit(habit.id)"
                class="w-5 h-5 rounded text-[#5F7A61] accent-[#5F7A61] cursor-pointer mt-1 shrink-0"
              />

              <!-- Inline Editing Mode -->
              <div v-if="editingHabitId === habit.id" class="flex-1 space-y-2">
                <div>
                  <label class="block text-[10px] text-[#78736A] uppercase font-mono">Phiên bản 2 phút:</label>
                  <input
                    v-model="editTwoMin"
                    type="text"
                    class="w-full bg-white border border-[#5F7A61] rounded-lg px-2.5 py-1 text-xs sm:text-sm font-bold text-[#2C2A29] focus:outline-none"
                    placeholder="VD: Mở sách đọc trọn vẹn đúng 1 trang"
                  />
                </div>
                <div>
                  <label class="block text-[10px] text-[#78736A] uppercase font-mono">Thói quen cũ làm mỏ neo:</label>
                  <input
                    v-model="editAnchor"
                    type="text"
                    class="w-full bg-white border border-[#E6E0D3] rounded-lg px-2.5 py-1 text-xs text-[#2C2A29] focus:outline-none"
                    placeholder="VD: Sau khi tôi uống tách cà phê sáng"
                  />
                </div>
                <div class="flex items-center gap-2 pt-1">
                  <button
                    @click="saveEditHabit(habit.id)"
                    class="px-3 py-1 bg-[#5F7A61] text-white text-xs font-semibold rounded-lg cursor-pointer"
                  >
                    Lưu
                  </button>
                  <button
                    @click="editingHabitId = null"
                    class="px-3 py-1 bg-[#E6E0D3] text-[#78736A] text-xs font-semibold rounded-lg cursor-pointer"
                  >
                    Hủy
                  </button>
                </div>
              </div>

              <!-- Normal Display Mode -->
              <div v-else class="flex-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap mb-1">
                  <span class="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#E6E0D3]/80 text-[#78736A]">
                    Mục tiêu gốc: {{ habit.title }}
                  </span>
                  <span
                    v-if="isBurnoutMode"
                    class="text-[10px] font-mono px-2 py-0.5 rounded bg-[#5F7A61] text-white"
                  >
                    MVE: Chỉ cần 30 giây
                  </span>
                </div>

                <!-- 2-Minute Shrinked Version with click-to-edit -->
                <div
                  @click="startEditHabit(habit)"
                  :class="[
                    'text-sm sm:text-base font-bold leading-snug cursor-pointer hover:text-[#5F7A61] inline-flex items-center gap-1.5',
                    habit.completedToday ? 'line-through text-[#78736A] opacity-65' : 'text-[#2C2A29]'
                  ]"
                  title="Bấm để chỉnh sửa thói quen 2 phút này"
                >
                  <span>👉 {{ habit.twoMinuteVersion }}</span>
                  <Edit3 :size="13" class="opacity-0 group-hover:opacity-100 text-[#78736A] transition-opacity" />
                </div>

                <!-- Anchor / Habit Stacking Hook -->
                <div class="text-xs text-[#78736A] mt-1 flex items-center gap-1">
                  <span>⚓ Mỏ neo kích hoạt:</span>
                  <strong class="text-[#2C2A29] font-medium">{{ habit.anchor }}</strong>
                </div>
              </div>
            </div>

            <!-- Right: 7-Day Visual Streak Tracker & Actions -->
            <div class="flex items-center gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E6E0D3]">
              <div class="text-right hidden sm:block">
                <div class="text-[11px] font-bold font-mono text-[#5F7A61]">
                  {{ habit.streakDays }} ngày streak
                </div>
                <div class="text-[10px] text-[#78736A]">7 ngày gần nhất</div>
              </div>

              <!-- 7 Day Dots -->
              <div class="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-[#E6E0D3]">
                <div
                  v-for="(dayDone, idx) in habit.history"
                  :key="idx"
                  :class="[
                    'w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-mono transition-colors',
                    dayDone
                      ? 'bg-[#5F7A61] text-white'
                      : 'bg-[#E6E0D3] text-[#78736A]'
                  ]"
                  :title="`Ngày ${idx + 1}: ${dayDone ? 'Hoàn tất' : 'Chưa xong'}`"
                >
                  <span v-if="dayDone">✓</span>
                </div>
              </div>

              <!-- Edit & Delete Buttons -->
              <button
                @click="startEditHabit(habit)"
                class="opacity-0 group-hover:opacity-100 p-1.5 text-[#78736A] hover:text-[#2C2A29] rounded-lg transition-opacity cursor-pointer"
                title="Sửa thói quen"
              >
                <Edit3 :size="14" />
              </button>

              <button
                @click="removeHabit(habit.id)"
                class="opacity-0 group-hover:opacity-100 p-1.5 text-[#78736A] hover:text-rose-600 rounded-lg transition-opacity cursor-pointer"
                title="Xóa thói quen này"
              >
                <Trash2 :size="14" />
              </button>
            </div>
          </div>
        </div>

        <!-- Guided Empty State -->
        <div
          v-if="habits.length === 0"
          class="text-center py-10 border border-dashed border-[#D8D0C2] rounded-2xl bg-[#FAF8F5]"
        >
          <div class="w-12 h-12 rounded-2xl bg-[#EEF3EF] text-[#5F7A61] flex items-center justify-center text-2xl mx-auto mb-2">
            🌱
          </div>
          <h5 class="font-bold text-sm text-[#2C2A29]">Chưa có thói quen 2 phút nào</h5>
          <p class="text-xs text-[#78736A] max-w-sm mx-auto mt-1 mb-4 leading-relaxed">
            Đừng nản lòng! Hãy bấm nút bên dưới để tạo 3 thói quen mẫu và cảm nhận sự kỳ diệu của quy tắc 2 phút.
          </p>
          <button
            @click="resetSampleHabits"
            class="px-4 py-2 rounded-xl bg-[#5F7A61] hover:bg-[#4E6650] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            + Tạo 3 Thói Quen 2 Phút Mẫu
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL: 2-MINUTE SHRINKER TOOL WITH SMART PLACEHOLDERS -->
    <div
      v-if="showShrinkerModal"
      class="fixed inset-0 z-50 bg-[#2C2A29]/70 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div class="bg-[#FAF8F5] border border-[#E6E0D3] rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl animate-in zoom-in-95">
        <div class="flex items-center justify-between border-b border-[#E6E0D3] pb-3 mb-4">
          <div>
            <span class="text-[10px] font-bold text-[#5F7A61] uppercase tracking-wider font-mono">
              Công Cụ Bẻ Khóa Hành Vi
            </span>
            <h3 class="text-base font-bold text-[#2C2A29]">
              Máy Thu Nhỏ Mục Tiêu 2 Phút (Atomic Habits)
            </h3>
          </div>
          <button @click="showShrinkerModal = false" class="text-[#78736A] hover:text-[#2C2A29] p-1">
            ✕
          </button>
        </div>

        <form @submit.prevent="addShrinkedHabit" class="space-y-4 text-xs">
          <div>
            <label class="block font-semibold text-[#2C2A29] mb-1">
              1. Mục tiêu lớn hiện tại bạn đang thấy choáng ngợp? *
            </label>
            <input
              v-model="newBigGoal"
              type="text"
              required
              placeholder="VD: Đọc hết 1 cuốn sách chuyên môn 400 trang..."
              class="w-full bg-white border border-[#E6E0D3] rounded-xl px-3 py-2.5 text-xs text-[#2C2A29] focus:outline-none focus:border-[#5F7A61]"
            />
          </div>

          <div>
            <label class="block font-semibold text-[#5F7A61] mb-1">
              2. Phiên bản 2 phút (Khởi động cực dễ, dưới 120 giây)? *
            </label>
            <input
              v-model="newTwoMin"
              type="text"
              required
              placeholder="VD: Mở sách đọc đúng 1 trang rồi gấp lại (Đọc sách 30p -> Mở sách đọc 1 trang)"
              class="w-full bg-white border border-[#E6E0D3] rounded-xl px-3 py-2.5 text-xs text-[#2C2A29] focus:outline-none focus:border-[#5F7A61]"
            />
          </div>

          <div>
            <label class="block font-semibold text-[#2C2A29] mb-1">
              3. Thói quen cũ có sẵn để neo vào (Habit Stacking Anchor)? *
            </label>
            <input
              v-model="newAnchor"
              type="text"
              required
              placeholder="VD: Sau khi tôi pha cốc cà phê sáng lúc 07:30..."
              class="w-full bg-white border border-[#E6E0D3] rounded-xl px-3 py-2.5 text-xs text-[#2C2A29] focus:outline-none focus:border-[#5F7A61]"
            />
          </div>

          <div class="flex gap-2 pt-2">
            <button
              type="button"
              @click="showShrinkerModal = false"
              class="flex-1 py-2.5 bg-[#E6E0D3] hover:bg-[#D8D0C2] rounded-xl text-xs font-semibold text-[#78736A] transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              class="flex-1 py-2.5 bg-[#5F7A61] hover:bg-[#4E6650] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              Thêm Thói Quen 2 Phút
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Method Guide Modal -->
    <MethodGuideModal
      :is-open="isGuideOpen"
      :guide="PROTOCOLS.overwhelmed.guideModal"
      @close="isGuideOpen = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { HelpCircle, Trash2, Edit3 } from 'lucide-vue-next';
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

const habits = ref(props.data.habits || []);
const isGuideOpen = ref(false);
const showShrinkerModal = ref(false);

const newBigGoal = ref('');
const newTwoMin = ref('');
const newAnchor = ref('');

// Inline edit state
const editingHabitId = ref(null);
const editTwoMin = ref('');
const editAnchor = ref('');

function startEditHabit(habit) {
  editingHabitId.value = habit.id;
  editTwoMin.value = habit.twoMinuteVersion;
  editAnchor.value = habit.anchor;
}

function saveEditHabit(id) {
  const h = habits.value.find(item => item.id === id);
  if (h && editTwoMin.value.trim()) {
    h.twoMinuteVersion = editTwoMin.value.trim();
    h.anchor = editAnchor.value.trim() || h.anchor;
  }
  editingHabitId.value = null;
  saveData();
}

function toggleHabit(id) {
  const h = habits.value.find(item => item.id === id);
  if (h) {
    h.completedToday = !h.completedToday;
    if (h.completedToday) {
      h.streakDays++;
      h.history[h.history.length - 1] = true;
    } else {
      h.streakDays = Math.max(0, h.streakDays - 1);
      h.history[h.history.length - 1] = false;
    }
    saveData();
  }
}

function removeHabit(id) {
  habits.value = habits.value.filter(h => h.id !== id);
  saveData();
}

function clearCompletedHabits() {
  habits.value = habits.value.filter(h => !h.completedToday);
  saveData();
}

function resetSampleHabits() {
  habits.value = [...INITIAL_MOCK_DATA.overwhelmed.habits];
  saveData();
}

function addShrinkedHabit() {
  if (!newTwoMin.value.trim()) return;

  const newHabitItem = {
    id: 'h-' + Date.now(),
    title: newBigGoal.value.trim() || 'Mục tiêu cá nhân',
    twoMinuteVersion: newTwoMin.value.trim(),
    anchor: newAnchor.value.trim() || 'Sau khi tôi thức dậy',
    completedToday: false,
    streakDays: 0,
    history: [false, false, false, false, false, false, false],
  };

  habits.value.push(newHabitItem);
  newBigGoal.value = '';
  newTwoMin.value = '';
  newAnchor.value = '';
  showShrinkerModal.value = false;
  saveData();
}

function saveData() {
  emit('update-data', {
    habits: habits.value,
  });
}
</script>
