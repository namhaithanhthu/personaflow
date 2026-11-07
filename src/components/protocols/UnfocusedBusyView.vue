<template>
  <div class="space-y-6">
    <!-- Protocol Header with Help Guide Button -->
    <div class="bg-[#F3EFE6] border border-[#E6E0D3] rounded-3xl p-5 sm:p-6 shadow-xs">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span class="text-[11px] font-bold text-[#7D6A58] uppercase tracking-wider font-mono">
            Giao thức: Eisenhower Matrix + Pareto 80/20
          </span>
          <h3 class="text-lg sm:text-xl font-bold text-[#2C2A29] mt-0.5">
            Phân Loại 4 Góc Phần Tư & Giới Hạn Việc Cấp Bách
          </h3>
          <p class="text-xs text-[#78736A] mt-1 max-w-2xl leading-relaxed">
            Nguyên tắc Dwight Eisenhower: 80% kết quả vượt trội đến từ 20% việc quan trọng dài hạn (Q2). Chúng tôi khống chế <strong>tối đa 3 việc trong Q1 (Làm ngay)</strong> để bạn thoát khỏi trạng thái "chữa cháy" liên tục.
          </p>
        </div>

        <div class="shrink-0 flex items-center gap-2">
          <!-- Guide Modal Trigger -->
          <button
            @click="isGuideOpen = true"
            class="px-3 py-2 rounded-xl bg-white hover:bg-[#FAF8F5] text-[#2C2A29] text-xs font-semibold border border-[#D8D0C2] transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
          >
            <HelpCircle :size="15" class="text-[#7D6A58]" />
            <span>Cách áp dụng</span>
          </button>

          <button
            v-if="hasAnyCompleted"
            @click="clearAllCompleted"
            class="px-3 py-2 rounded-xl bg-white hover:bg-rose-50 text-rose-700 text-xs font-semibold border border-[#D8D0C2] transition-colors cursor-pointer"
          >
            Dọn dẹp việc đã xong
          </button>

          <button
            @click="showAddModal = true"
            class="px-4 py-2 rounded-xl bg-[#7D6A58] hover:bg-[#685646] text-white font-semibold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <span>+</span>
            <span>Phân Loại Nhiệm Vụ Mới</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 2x2 QUADRANTS GRID -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <!-- Q1: KHẨN CẤP & QUAN TRỌNG (DO FIRST - MAX 3) -->
      <div class="bg-white border-2 border-[#C86D51]/50 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between border-b border-[#E6E0D3] pb-2.5 mb-3">
            <div class="flex items-center gap-2">
              <span class="text-base">🚨</span>
              <div>
                <h4 class="font-bold text-sm text-[#2C2A29]">Q1: Làm Ngay (Khẩn & Quan Trọng)</h4>
                <p class="text-[11px] text-[#78736A]">Giải quyết lập tức trước khi làm việc khác</p>
              </div>
            </div>
            <span
              :class="[
                'text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border',
                quadrants.q1.length >= 3
                  ? 'bg-[#FAF0EB] text-[#C86D51] border-[#C86D51]/40'
                  : 'bg-[#F3EFE6] text-[#78736A] border-[#E6E0D3]'
              ]"
            >
              {{ quadrants.q1.length }}/3 Việc tối đa
            </span>
          </div>

          <!-- Task List in Q1 -->
          <div class="space-y-2">
            <div
              v-for="task in quadrants.q1"
              :key="task.id"
              class="group bg-[#FAF8F5] border border-[#E6E0D3] rounded-xl p-3 flex items-center justify-between gap-2.5 shadow-2xs transition-all hover:border-[#D8D0C2]"
            >
              <div class="flex items-center gap-2.5 min-w-0 flex-1">
                <input
                  type="checkbox"
                  :checked="task.completed"
                  @change="toggleTask('q1', task.id)"
                  class="w-4 h-4 rounded text-[#C86D51] accent-[#C86D51] cursor-pointer shrink-0"
                />

                <!-- Inline Edit -->
                <div v-if="editingTaskId === task.id" class="flex items-center gap-1.5 flex-1">
                  <input
                    v-model="editTaskTitle"
                    type="text"
                    class="flex-1 bg-white border border-[#C86D51] rounded px-2 py-0.5 text-xs text-[#2C2A29] focus:outline-none"
                    @keyup.enter="saveEditTask('q1', task.id)"
                    @keyup.esc="editingTaskId = null"
                    autoFocus
                  />
                  <button @click="saveEditTask('q1', task.id)" class="text-xs text-[#5F7A61] font-semibold">Lưu</button>
                  <button @click="editingTaskId = null" class="text-xs text-[#78736A]">Hủy</button>
                </div>

                <span
                  v-else
                  @click="startEditTask(task)"
                  :class="[
                    'text-xs font-medium cursor-pointer hover:underline truncate',
                    task.completed ? 'line-through text-[#78736A] opacity-60' : 'text-[#2C2A29]'
                  ]"
                  title="Bấm để chỉnh sửa"
                >
                  {{ task.title }}
                </span>
              </div>

              <!-- Actions on Hover -->
              <div class="flex items-center gap-1 shrink-0">
                <button
                  @click="startEditTask(task)"
                  class="opacity-0 group-hover:opacity-100 text-[#78736A] hover:text-[#2C2A29] p-1 cursor-pointer"
                  title="Sửa việc"
                >
                  <Edit3 :size="13" />
                </button>
                <button
                  @click="removeTask('q1', task.id)"
                  class="opacity-0 group-hover:opacity-100 text-[#78736A] hover:text-rose-600 p-1 cursor-pointer"
                  title="Xóa việc"
                >
                  <Trash2 :size="13" />
                </button>
              </div>
            </div>

            <!-- Empty State Q1 -->
            <div v-if="quadrants.q1.length === 0" class="text-center py-6 text-xs text-[#78736A] border border-dashed border-[#E6E0D3] rounded-xl bg-white/40">
              <p>Chưa có việc Q1. Rất tốt, tâm trí bạn đang không bị áp lực đè nặng!</p>
              <button
                @click="addSampleTask('q1', 'Khắc phục lỗi hệ thống thanh toán đơn hàng')"
                class="mt-2 text-xs text-[#C86D51] font-semibold hover:underline cursor-pointer"
              >
                + Thêm 1 việc Q1 mẫu
              </button>
            </div>
          </div>
        </div>

        <div v-if="quadrants.q1.length >= 3" class="mt-3 p-2 rounded-xl bg-[#FAF0EB] border border-[#C86D51]/30 text-[11px] text-[#C86D51]">
          ⚠️ Đã chạm trần 3 việc Q1. Hãy hoàn tất hoặc dời bớt sang Q2/Q3 trước khi nhận thêm.
        </div>
      </div>

      <!-- Q2: QUAN TRỌNG & KHÔNG KHẨN CẤP (SCHEDULE - 80/20 VALUE) -->
      <div class="bg-white border-2 border-[#5F7A61]/50 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between border-b border-[#E6E0D3] pb-2.5 mb-3">
            <div class="flex items-center gap-2">
              <span class="text-base">💎</span>
              <div>
                <h4 class="font-bold text-sm text-[#2C2A29]">Q2: Lên Lịch (Tạo 80% Giá Trị Tương Lai)</h4>
                <p class="text-[11px] text-[#78736A]">Phát triển bản thân, học hỏi, quy trình dài hạn</p>
              </div>
            </div>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#EEF3EF] text-[#5F7A61] border border-[#5F7A61]/30">
              {{ quadrants.q2.length }} Việc
            </span>
          </div>

          <div class="space-y-2">
            <div
              v-for="task in quadrants.q2"
              :key="task.id"
              class="group bg-[#FAF8F5] border border-[#E6E0D3] rounded-xl p-3 flex items-center justify-between gap-2.5 shadow-2xs transition-all hover:border-[#D8D0C2]"
            >
              <div class="flex items-center gap-2.5 min-w-0 flex-1">
                <input
                  type="checkbox"
                  :checked="task.completed"
                  @change="toggleTask('q2', task.id)"
                  class="w-4 h-4 rounded text-[#5F7A61] accent-[#5F7A61] cursor-pointer shrink-0"
                />

                <div v-if="editingTaskId === task.id" class="flex items-center gap-1.5 flex-1">
                  <input
                    v-model="editTaskTitle"
                    type="text"
                    class="flex-1 bg-white border border-[#5F7A61] rounded px-2 py-0.5 text-xs text-[#2C2A29] focus:outline-none"
                    @keyup.enter="saveEditTask('q2', task.id)"
                    @keyup.esc="editingTaskId = null"
                    autoFocus
                  />
                  <button @click="saveEditTask('q2', task.id)" class="text-xs text-[#5F7A61] font-semibold">Lưu</button>
                  <button @click="editingTaskId = null" class="text-xs text-[#78736A]">Hủy</button>
                </div>

                <span
                  v-else
                  @click="startEditTask(task)"
                  :class="[
                    'text-xs font-medium cursor-pointer hover:underline truncate',
                    task.completed ? 'line-through text-[#78736A] opacity-60' : 'text-[#2C2A29]'
                  ]"
                  title="Bấm để chỉnh sửa"
                >
                  {{ task.title }}
                </span>
              </div>

              <div class="flex items-center gap-1 shrink-0">
                <button
                  @click="startEditTask(task)"
                  class="opacity-0 group-hover:opacity-100 text-[#78736A] hover:text-[#2C2A29] p-1 cursor-pointer"
                  title="Sửa việc"
                >
                  <Edit3 :size="13" />
                </button>
                <button
                  @click="removeTask('q2', task.id)"
                  class="opacity-0 group-hover:opacity-100 text-[#78736A] hover:text-rose-600 p-1 cursor-pointer"
                  title="Xóa việc"
                >
                  <Trash2 :size="13" />
                </button>
              </div>
            </div>

            <div v-if="quadrants.q2.length === 0" class="text-center py-6 text-xs text-[#78736A] border border-dashed border-[#E6E0D3] rounded-xl bg-white/40">
              <p>Chưa có mục tiêu dài hạn nào trong Q2.</p>
              <button
                @click="addSampleTask('q2', 'Đọc 1 bài nghiên cứu về Kiến trúc Cloud')"
                class="mt-2 text-xs text-[#5F7A61] font-semibold hover:underline cursor-pointer"
              >
                + Thêm 1 việc Q2 mẫu
              </button>
            </div>
          </div>
        </div>

        <div class="mt-3 p-2 rounded-xl bg-[#EEF3EF] text-[11px] text-[#5F7A61]">
          ✨ Đây là góc phần tư quyết định thành công bền vững của bạn.
        </div>
      </div>

      <!-- Q3: KHẨN CẤP & KHÔNG QUAN TRỌNG (DELEGATE / RÚT NGẮN) -->
      <div class="bg-white border border-[#E6E0D3] rounded-3xl p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between border-b border-[#E6E0D3] pb-2.5 mb-3">
            <div class="flex items-center gap-2">
              <span class="text-base">🤝</span>
              <div>
                <h4 class="font-bold text-sm text-[#2C2A29]">Q3: Ủy Quyền / Tinh Giản</h4>
                <p class="text-[11px] text-[#78736A]">Nhờ người khác làm hoặc gom lại giải quyết 1 lần</p>
              </div>
            </div>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F3EFE6] text-[#78736A]">
              {{ quadrants.q3.length }} Việc
            </span>
          </div>

          <div class="space-y-2">
            <div
              v-for="task in quadrants.q3"
              :key="task.id"
              class="group bg-[#FAF8F5] border border-[#E6E0D3] rounded-xl p-3 flex items-center justify-between gap-2.5 shadow-2xs transition-all hover:border-[#D8D0C2]"
            >
              <div class="flex items-center gap-2.5 min-w-0 flex-1">
                <input
                  type="checkbox"
                  :checked="task.completed"
                  @change="toggleTask('q3', task.id)"
                  class="w-4 h-4 rounded text-[#7D6A58] accent-[#7D6A58] cursor-pointer shrink-0"
                />

                <div v-if="editingTaskId === task.id" class="flex items-center gap-1.5 flex-1">
                  <input
                    v-model="editTaskTitle"
                    type="text"
                    class="flex-1 bg-white border border-[#7D6A58] rounded px-2 py-0.5 text-xs text-[#2C2A29] focus:outline-none"
                    @keyup.enter="saveEditTask('q3', task.id)"
                    @keyup.esc="editingTaskId = null"
                    autoFocus
                  />
                  <button @click="saveEditTask('q3', task.id)" class="text-xs text-[#5F7A61] font-semibold">Lưu</button>
                  <button @click="editingTaskId = null" class="text-xs text-[#78736A]">Hủy</button>
                </div>

                <span
                  v-else
                  @click="startEditTask(task)"
                  :class="[
                    'text-xs font-medium cursor-pointer hover:underline truncate',
                    task.completed ? 'line-through text-[#78736A] opacity-60' : 'text-[#2C2A29]'
                  ]"
                >
                  {{ task.title }}
                </span>
              </div>

              <div class="flex items-center gap-1 shrink-0">
                <button
                  @click="startEditTask(task)"
                  class="opacity-0 group-hover:opacity-100 text-[#78736A] hover:text-[#2C2A29] p-1 cursor-pointer"
                >
                  <Edit3 :size="13" />
                </button>
                <button
                  @click="removeTask('q3', task.id)"
                  class="opacity-0 group-hover:opacity-100 text-[#78736A] hover:text-rose-600 p-1 cursor-pointer"
                >
                  <Trash2 :size="13" />
                </button>
              </div>
            </div>

            <div v-if="quadrants.q3.length === 0" class="text-center py-4 text-xs text-[#78736A]">
              Không có việc ủy quyền.
            </div>
          </div>
        </div>
      </div>

      <!-- Q4: KHÔNG QUAN TRỌNG & KHÔNG KHẨN CẤP (ELIMINATE) -->
      <div class="bg-white border border-[#E6E0D3] rounded-3xl p-5 shadow-xs flex flex-col justify-between opacity-85">
        <div>
          <div class="flex items-center justify-between border-b border-[#E6E0D3] pb-2.5 mb-3">
            <div class="flex items-center gap-2">
              <span class="text-base">🗑️</span>
              <div>
                <h4 class="font-bold text-sm text-[#2C2A29]">Q4: Loại Bỏ (Thời Gian Chết)</h4>
                <p class="text-[11px] text-[#78736A]">Những việc tiêu tốn năng lượng mà không tạo kết quả</p>
              </div>
            </div>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F3EFE6] text-[#78736A]">
              {{ quadrants.q4.length }} Việc
            </span>
          </div>

          <div class="space-y-2">
            <div
              v-for="task in quadrants.q4"
              :key="task.id"
              class="group bg-[#FAF8F5] border border-[#E6E0D3] rounded-xl p-3 flex items-center justify-between gap-2.5 shadow-2xs transition-all hover:border-[#D8D0C2]"
            >
              <div class="flex items-center gap-2.5 min-w-0 flex-1">
                <input
                  type="checkbox"
                  :checked="task.completed"
                  @change="toggleTask('q4', task.id)"
                  class="w-4 h-4 rounded text-[#78736A] accent-[#78736A] cursor-pointer shrink-0"
                />

                <div v-if="editingTaskId === task.id" class="flex items-center gap-1.5 flex-1">
                  <input
                    v-model="editTaskTitle"
                    type="text"
                    class="flex-1 bg-white border border-[#78736A] rounded px-2 py-0.5 text-xs text-[#2C2A29] focus:outline-none"
                    @keyup.enter="saveEditTask('q4', task.id)"
                    @keyup.esc="editingTaskId = null"
                    autoFocus
                  />
                  <button @click="saveEditTask('q4', task.id)" class="text-xs text-[#5F7A61] font-semibold">Lưu</button>
                  <button @click="editingTaskId = null" class="text-xs text-[#78736A]">Hủy</button>
                </div>

                <span
                  v-else
                  @click="startEditTask(task)"
                  :class="[
                    'text-xs font-medium cursor-pointer hover:underline truncate',
                    task.completed ? 'line-through text-[#78736A] opacity-60' : 'text-[#78736A]'
                  ]"
                >
                  {{ task.title }}
                </span>
              </div>

              <div class="flex items-center gap-1 shrink-0">
                <button
                  @click="startEditTask(task)"
                  class="opacity-0 group-hover:opacity-100 text-[#78736A] hover:text-[#2C2A29] p-1 cursor-pointer"
                >
                  <Edit3 :size="13" />
                </button>
                <button
                  @click="removeTask('q4', task.id)"
                  class="opacity-0 group-hover:opacity-100 text-[#78736A] hover:text-rose-600 p-1 cursor-pointer"
                >
                  <Trash2 :size="13" />
                </button>
              </div>
            </div>

            <div v-if="quadrants.q4.length === 0" class="text-center py-4 text-xs text-[#78736A]">
              Không có việc lãng phí.
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL: ADD TASK WITH SMART PLACEHOLDERS -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 z-50 bg-[#2C2A29]/70 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div class="bg-[#FAF8F5] border border-[#E6E0D3] rounded-3xl max-w-md w-full p-6 shadow-2xl animate-in zoom-in-95">
        <div class="flex items-center justify-between border-b border-[#E6E0D3] pb-3 mb-4">
          <h3 class="text-sm font-bold text-[#2C2A29]">Phân Loại Nhiệm Vụ Vào Ma Trận</h3>
          <button @click="showAddModal = false" class="text-[#78736A] hover:text-[#2C2A29]">✕</button>
        </div>

        <form @submit.prevent="addTask" class="space-y-4 text-xs">
          <div>
            <label class="block font-semibold text-[#2C2A29] mb-1">Nội dung nhiệm vụ *</label>
            <input
              v-model="newTaskTitle"
              type="text"
              required
              placeholder="VD: Nộp báo cáo tài chính Q4 trước 11:30..."
              class="w-full bg-white border border-[#E6E0D3] rounded-xl px-3 py-2 text-xs text-[#2C2A29] focus:outline-none focus:border-[#7D6A58]"
            />
          </div>

          <div>
            <label class="block font-semibold text-[#2C2A29] mb-1">Chọn góc phần tư chiến lược:</label>
            <select
              v-model="selectedQuadrant"
              class="w-full bg-white border border-[#E6E0D3] rounded-xl px-3 py-2 text-xs text-[#2C2A29] focus:outline-none focus:border-[#7D6A58]"
            >
              <option value="q1">🚨 Q1: Khẩn & Quan Trọng (Làm Ngay - Max 3)</option>
              <option value="q2">💎 Q2: Quan Trọng & Không Khẩn (Lên Lịch - 80/20)</option>
              <option value="q3">🤝 Q3: Khẩn & Không Quan Trọng (Ủy Quyền)</option>
              <option value="q4">🗑️ Q4: Không Khẩn & Không Quan Trọng (Loại Bỏ)</option>
            </select>
          </div>

          <div class="flex gap-2 pt-2">
            <button
              type="button"
              @click="showAddModal = false"
              class="flex-1 py-2 bg-[#E6E0D3] rounded-xl text-xs font-semibold text-[#78736A]"
            >
              Hủy
            </button>
            <button
              type="submit"
              class="flex-1 py-2 bg-[#7D6A58] text-white rounded-xl text-xs font-semibold shadow-xs"
            >
              Thêm Vào Ma Trận
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Method Guide Modal -->
    <MethodGuideModal
      :is-open="isGuideOpen"
      :guide="PROTOCOLS.unfocused_busy.guideModal"
      @close="isGuideOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
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

const quadrants = ref(props.data.quadrants || { q1: [], q2: [], q3: [], q4: [] });
const isGuideOpen = ref(false);
const showAddModal = ref(false);
const newTaskTitle = ref('');
const selectedQuadrant = ref('q1');

// Inline edit state
const editingTaskId = ref(null);
const editTaskTitle = ref('');

const hasAnyCompleted = computed(() => {
  return Object.values(quadrants.value).some(list => list.some(t => t.completed));
});

function startEditTask(task) {
  editingTaskId.value = task.id;
  editTaskTitle.value = task.title;
}

function saveEditTask(qKey, id) {
  const task = quadrants.value[qKey].find(t => t.id === id);
  if (task && editTaskTitle.value.trim()) {
    task.title = editTaskTitle.value.trim();
  }
  editingTaskId.value = null;
  saveData();
}

function toggleTask(qKey, id) {
  const task = quadrants.value[qKey].find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveData();
  }
}

function removeTask(qKey, id) {
  quadrants.value[qKey] = quadrants.value[qKey].filter(t => t.id !== id);
  saveData();
}

function clearAllCompleted() {
  Object.keys(quadrants.value).forEach(qKey => {
    quadrants.value[qKey] = quadrants.value[qKey].filter(t => !t.completed);
  });
  saveData();
}

function addSampleTask(qKey, title) {
  quadrants.value[qKey].push({
    id: 'm-' + Date.now(),
    title,
    completed: false,
  });
  saveData();
}

function addTask() {
  if (!newTaskTitle.value.trim()) return;

  if (selectedQuadrant.value === 'q1' && quadrants.value.q1.length >= 3) {
    alert('Quy tắc Eisenhower khống chế tối đa 3 việc Q1 mỗi ngày để tránh kiệt sức! Hãy hoàn tất việc cũ hoặc xếp sang Q2.');
    return;
  }

  quadrants.value[selectedQuadrant.value].push({
    id: 'm-' + Date.now(),
    title: newTaskTitle.value.trim(),
    completed: false,
  });

  newTaskTitle.value = '';
  showAddModal.value = false;
  saveData();
}

function saveData() {
  emit('update-data', {
    quadrants: quadrants.value,
  });
}
</script>
