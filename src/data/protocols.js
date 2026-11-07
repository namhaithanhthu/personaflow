export const QUESTIONS = [
  {
    id: 'rootPainPoint',
    title: 'Rào cản lớn nhất đối với tính kỷ luật của bạn là gì?',
    subtitle: 'Hãy thành thật với chính mình. Đây là căn cứ để chọn giao thức phù hợp nhất.',
    options: [
      {
        value: 'procrastination',
        label: 'Hay trì hoãn những việc khó hoặc quan trọng nhất',
        desc: 'Luôn tìm cớ làm việc lặt vặt để né tránh nhiệm vụ lớn, tạo cảm giác tội lỗi.',
        icon: 'TimerReset',
      },
      {
        value: 'overwhelmed',
        label: 'Dễ bị choáng ngợp bởi mục tiêu lớn, cả thèm chóng chán',
        desc: 'Đặt mục tiêu quá hoành tráng rồi đuối sức chỉ sau vài ngày.',
        icon: 'Layers',
      },
      {
        value: 'unfocused_busy',
        label: 'Bận rộn cả ngày nhưng không hiệu quả, làm việc lan man',
        desc: 'Làm rất nhiều việc nhưng cuối ngày thấy những việc then chốt vẫn dậm chân.',
        icon: 'Grid',
      },
      {
        value: 'distracted',
        label: 'Dễ mất tập trung bởi điện thoại và mạng xã hội',
        desc: 'Vừa ngồi vào bàn là có thôi thúc kiểm tra thông báo, lướt web vô thức.',
        icon: 'BellOff',
      },
    ],
  },
  {
    id: 'chronotype',
    title: 'Khung giờ nào bạn cảm thấy năng lượng và đầu óc tỉnh táo nhất?',
    subtitle: 'Giúp xếp lịch các nhiệm vụ trọng tâm vào thời điểm hoàng kim sinh học của bạn.',
    options: [
      {
        value: 'morning',
        label: 'Sáng sớm (06:00 - 11:00)',
        desc: 'Đầu óc thanh thản, ít bị người khác làm phiền, thích hợp việc đòi hỏi tư duy sâu.',
        icon: 'Sunrise',
      },
      {
        value: 'afternoon',
        label: 'Buổi chiều (13:00 - 17:00)',
        desc: 'Bắt nhịp tốt sau giấc trưa, xử lý công việc liên tục và tương tác hiệu quả.',
        icon: 'Sun',
      },
      {
        value: 'night',
        label: 'Đêm muộn (20:00 - 00:00)',
        desc: 'Yên tĩnh tuyệt đối, sáng tạo tốt khi cả thế giới đã nghỉ ngơi.',
        icon: 'Moon',
      },
    ],
  },
  {
    id: 'dailyTimeCommitment',
    title: 'Quỹ thời gian tối đa bạn thực sự cam kết kỷ luật mỗi ngày?',
    subtitle: 'Thà bắt đầu nhỏ mà làm liên tục 30 ngày, còn hơn quá sức rồi bỏ cuộc sau 3 ngày.',
    options: [
      {
        value: '15min',
        label: '15 phút (Khởi đầu nhẹ nhàng)',
        desc: 'Thích hợp cho người mới, chỉ cần 1 thói quen cốt lõi để xây đà.',
        icon: 'Feather',
      },
      {
        value: '45min',
        label: '45 phút (Tiêu chuẩn cân bằng)',
        desc: '1 phiên tập trung sâu trọn vẹn mỗi ngày để tạo bước nhảy vọt.',
        icon: 'Clock',
      },
      {
        value: '120min',
        label: '> 2 tiếng (Cường độ cao)',
        desc: 'Dành cho người đang trong giai đoạn chạy nước rút hoặc học kỹ năng lớn.',
        icon: 'Zap',
      },
    ],
  },
  {
    id: 'motivationStyle',
    title: 'Điều gì tạo cho bạn nhiều động lực tâm lý bền bỉ nhất?',
    subtitle: 'Cách bộ não bạn phản hồi với phần thưởng và áp lực.',
    options: [
      {
        value: 'stats',
        label: 'Thích nhìn số liệu thống kê & biểu đồ tiến bộ',
        desc: 'Cảm giác thỏa mãn khi thấy biểu đồ đi lên và các con số cụ thể.',
        icon: 'BarChart2',
      },
      {
        value: 'atomic',
        label: 'Thích tối giản từng bước nhỏ, không gánh nặng',
        desc: 'Thấy nhẹ nhõm khi mục tiêu được cắt gọt thành hành động cực dễ.',
        icon: 'Sparkles',
      },
      {
        value: 'timer',
        label: 'Cần áp lực đếm ngược & phiên làm việc dứt khoát',
        desc: 'Hiệu quả nhất khi có đồng hồ đếm lùi tạo tính khẩn trương.',
        icon: 'Hourglass',
      },
    ],
  },
];

export const PROTOCOLS = {
  procrastination: {
    id: 'procrastination',
    code: 'FROG_5SEC',
    name: 'Eat That Frog + 5-Second Rule',
    title: 'Giao Thức Tiêu Diệt Trì Hoãn',
    methodology: 'Brian Tracy (Eat That Frog) & Mel Robbins (5-Second Rule)',
    description: 'Chỉ chọn ra đúng 1 "Con Ếch" to nhất trong ngày để giải quyết đầu tiên. Mọi việc phụ sẽ bị làm mờ cho đến khi Con Ếch hoàn tất.',
    color: '#C86D51',
    lightBg: '#FAF0EB',
    badge: '🐸 Con Ếch Trong Ngày',
    quote: '"Nếu việc của bạn là phải ăn một con ếch sống, cách tốt nhất là hãy ăn nó ngay vào đầu giờ sáng."',
    quickSteps: [
      {
        step: 1,
        title: 'Xác định "Con Ếch"',
        desc: 'Chọn ra đúng 1 việc khó nhất, quan trọng nhất hoặc việc bạn đang muốn né tránh nhất hôm nay.',
      },
      {
        step: 2,
        title: 'Bấm đếm ngược 5 giây',
        desc: 'Bấm nút "Kích hoạt 5 giây" để phá vỡ sự do dự trước khi não kịp bịa ra lý do lười biếng.',
      },
      {
        step: 3,
        title: 'Xử lý xong mới mở khóa',
        desc: 'Tập trung dứt điểm Con Ếch. Toàn bộ việc phụ bên dưới sẽ tự động mở khóa để bạn làm tiếp.',
      },
    ],
    guideModal: {
      tag: 'Brian Tracy & Mel Robbins',
      title: 'Cẩm Nang: Ăn Con Ếch & Luật 5 Giây',
      coreWhy: 'Não người có xu hướng tiết kiệm năng lượng bằng cách làm những việc lặt vặt (dọn bàn, check mail, xem tin) để tự an ủi rằng "mình vẫn đang bận rộn". Quy luật Eat That Frog chặn đứng lối thoát này bằng cách khóa toàn bộ việc phụ lại.',
      goldenRule: 'Không bao giờ được chạm vào việc thứ 2 khi "Con Ếch" chưa được giải quyết xong.',
      badPractice: 'Chia ngày thành 10 việc nhỏ rồi làm từ từ, để việc khó nhất đến tối muộn rồi kiệt sức bỏ dở.',
      goodPractice: 'Đặt việc làm báo cáo hoặc giải quyết khiếu nại lên làm Con Ếch, đếm 5-4-3-2-1 và giải quyết dứt điểm ngay trước 11:00 sáng.',
    },
  },
  overwhelmed: {
    id: 'overwhelmed',
    code: 'ATOMIC_2MIN',
    name: 'Atomic Habits + 2-Minute Rule',
    title: 'Giao Thức Từng Bước Nhỏ',
    methodology: 'James Clear (Atomic Habits) & David Allen (GTD)',
    description: 'Bẻ gãy mọi mục tiêu khổng lồ thành phiên bản khởi động 2 phút, kết hợp kỹ thuật Xếp chồng thói quen (Habit Stacking).',
    color: '#5F7A61',
    lightBg: '#EEF3EF',
    badge: '🌱 Quy Tắc 2 Phút',
    quote: '"Một thói quen phải được thiết lập trước khi nó có thể được cải thiện. Hãy bắt đầu nhỏ đến mức bạn không thể từ chối."',
    quickSteps: [
      {
        step: 1,
        title: 'Thu nhỏ mục tiêu về 2 phút',
        desc: 'Biến mục tiêu lớn (chạy 5km, học 2 tiếng) thành hành động dưới 120 giây (xỏ giày, mở sách đọc 1 trang).',
      },
      {
        step: 2,
        title: 'Neo vào thói quen cũ',
        desc: 'Dùng công thức: "Sau khi tôi [Thói quen cũ], tôi sẽ thực hiện [Phiên bản 2 phút]".',
      },
      {
        step: 3,
        title: 'Tích lũy chuỗi 7 ngày',
        desc: 'Đánh dấu hoàn thành mỗi ngày. Khi thói quen thành phản xạ tự nhiên, bạn mới tăng độ khó.',
      },
    ],
    guideModal: {
      tag: 'James Clear (Atomic Habits)',
      title: 'Cẩm Nang: Thói Quen Nguyên Tử & Luật 2 Phút',
      coreWhy: 'Nguyên nhân lớn nhất của sự bỏ cuộc là bạn đặt mục tiêu quá tham vọng ngay từ đầu (VD: quyết tâm tập gym 2 tiếng/ngày). Quy tắc 2 phút giúp bạn vượt qua lực cản ban đầu: khi đã xỏ giày bước ra cửa, bạn sẽ tự động chạy tiếp.',
      goldenRule: 'Mục tiêu 2 phút chỉ dùng để thiết lập nghi thức xuất phát, không phải đích đến.',
      badPractice: 'Đọc mục tiêu "Viết luận văn tốt nghiệp 100 trang" rồi ngồi đờ người cả buổi chiều vì không biết bắt đầu từ đâu.',
      goodPractice: 'Thu nhỏ thành "Ngồi vào bàn mở file Word và gõ đúng 1 câu mở đầu sau khi uống nước", sau đó quán tính sẽ kéo bạn viết tiếp 3 trang.',
    },
  },
  unfocused_busy: {
    id: 'unfocused_busy',
    code: 'EISENHOWER_8020',
    name: 'Eisenhower Matrix + Pareto 80/20',
    title: 'Giao Thức Ma Trận Ưu Tiên',
    methodology: 'Dwight Eisenhower & Vilfredo Pareto',
    description: 'Phân loại công việc vào 4 góc phần tư chiến lược. Khống chế tối đa 3 việc Khẩn cấp & Quan trọng (Q1) để thoát khỏi bẫy bận rộn ảo.',
    color: '#7D6A58',
    lightBg: '#F3EFE9',
    badge: '🎯 4 Góc Phần Tư',
    quote: '"Điều quan trọng hiếm khi khẩn cấp, và điều khẩn cấp hiếm khi quan trọng."',
    quickSteps: [
      {
        step: 1,
        title: 'Phân loại việc vào 4 ô',
        desc: 'Xác định rõ việc nào thực sự tạo giá trị dài hạn (Q2) và việc nào chỉ là chữa cháy khẩn cấp (Q1).',
      },
      {
        step: 2,
        title: 'Khống chế trần Q1 tối đa 3 việc',
        desc: 'Hệ thống tự động ngăn chặn bạn đưa quá 3 việc vào Q1 để bảo vệ bạn khỏi sự kiệt sức.',
      },
      {
        step: 3,
        title: 'Đầu tư 80% sức lực cho Q2',
        desc: 'Dành phần lớn thời gian rảnh cho Q2 (Học hỏi, thể thao, quy trình) để giảm thiểu rủi ro phát sinh trong tương lai.',
      },
    ],
    guideModal: {
      tag: 'Dwight Eisenhower & Pareto 80/20',
      title: 'Cẩm Nang: Ma Trận Ưu Tiên Eisenhower',
      coreWhy: 'Hầu hết mọi người bận rộn cả ngày với các việc "Khẩn cấp nhưng Không quan trọng" (Q3: tin nhắn réo, họp vô thưởng vô phạt). Ma trận giúp bạn tỉnh táo phân biệt việc khẩn cấp ảo và tập trung vào Q2 - nơi sinh ra 80% thành công lâu dài.',
      goldenRule: 'Không bao giờ để danh sách Q1 vượt quá 3 việc trong một ngày làm việc.',
      badPractice: 'Coi tất cả email và tin nhắn nhóm đều là "Khẩn cấp & Quan trọng", dẫn đến hết ngày mà dự án chính chưa nhúc nhích.',
      goodPractice: 'Đưa 1 việc then chốt vào Q1 để giải quyết, lên lịch 90 phút cho Q2 (học kỹ năng), và dồn việc Q3 lại trả lời 1 lần lúc cuối ngày.',
    },
  },
  distracted: {
    id: 'distracted',
    code: 'DEEPWORK_POMO',
    name: 'Deep Work + Pomodoro + Distraction Dump',
    title: 'Giao Thức Khắc Chế Xao Nhãng',
    methodology: 'Cal Newport (Deep Work) & Francesco Cirillo (Pomodoro)',
    description: 'Tập trung tuyệt đối trong các phiên đếm lùi kết hợp Bãi đáp xao nhãng (Parking Lot) để trút mọi suy nghĩ linh tinh ra khỏi đầu.',
    color: '#935845',
    lightBg: '#F7EDE9',
    badge: '⏳ Deep Work Timer',
    quote: '"Khả năng tập trung sâu sắc là siêu năng lực của thế kỷ 21."',
    quickSteps: [
      {
        step: 1,
        title: 'Khóa mục tiêu và đặt 25 phút',
        desc: 'Nhập tên nhiệm vụ cụ thể bạn muốn hoàn thành và bấm bắt đầu phiên Pomodoro 25 phút.',
      },
      {
        step: 2,
        title: 'Trút ngay ý nghĩ linh tinh',
        desc: 'Khi có suy nghĩ muốn mở Shopee, Facebook hay xem tin tức, gõ ngay vào "Bãi đáp xao nhãng".',
      },
      {
        step: 3,
        title: 'Nghỉ giải lao 5 phút có kiểm soát',
        desc: 'Khi chuông reo, đứng dậy vươn vai thư giãn 5 phút rồi mới quay lại giải quyết danh sách bãi đáp.',
      },
    ],
    guideModal: {
      tag: 'Cal Newport (Deep Work)',
      title: 'Cẩm Nang: Làm Việc Sâu & Bãi Đáp Xao Nhãng',
      coreWhy: 'Khi đang làm việc sâu, một ý nghĩ nảy ra (VD: "Phải kiểm tra giá vé máy bay") sẽ liên tục làm phiền vỏ não bạn. Càng cố đè nén, bạn càng mất tập trung. Nhưng nếu ghi nó ra "Bãi đáp", não sẽ yên tâm rằng ý nghĩ đó đã được lưu lại an toàn và để bạn tiếp tục tập trung.',
      goldenRule: 'Tuyệt đối không rời bàn làm việc hay chuyển tab trong 25 phút của phiên Pomodoro.',
      badPractice: 'Vừa code hoặc viết bài vừa bật tab mạng xã hội, có thông báo là bấm xem ngay làm đứt mạch tư duy.',
      goodPractice: 'Gõ "Xem thông báo Shopee" vào Bãi đáp xao nhãng trong 3 giây, giữ mạch viết bài cho đến hết 25 phút mới mở điện thoại kiểm tra.',
    },
  },
};

export const INITIAL_MOCK_DATA = {
  procrastination: {
    frog: {
      id: 'frog-main',
      title: 'Hoàn thành đề xuất chiến lược phát triển sản phẩm Q4',
      context: 'Việc then chốt ảnh hưởng đến kết quả cả tháng, cần tập trung trước khi kiểm tra email.',
      durationMinutes: 45,
      completed: false,
      completedAt: null,
    },
    secondaryTasks: [
      { id: 'sec-1', title: 'Phản hồi 3 email đối tác quan trọng', durationMinutes: 15, completed: false },
      { id: 'sec-2', title: 'Soát lại tài liệu hướng dẫn thành viên mới', durationMinutes: 20, completed: false },
      { id: 'sec-3', title: 'Dọn sạch các tab trình duyệt không dùng', durationMinutes: 10, completed: false },
    ],
  },
  overwhelmed: {
    habits: [
      {
        id: 'h-1',
        title: 'Đọc 1 cuốn sách chuyên môn mỗi tuần',
        twoMinuteVersion: 'Mở sách và đọc trọn vẹn đúng 1 trang',
        anchor: 'Sau khi tôi nhấp ngụm cà phê sáng đầu tiên',
        completedToday: false,
        streakDays: 6,
        history: [true, true, true, false, true, true, false],
      },
      {
        id: 'h-2',
        title: 'Tập thể dục duy trì sức bền mỗi ngày',
        twoMinuteVersion: 'Xỏ giày thể thao và hít đất 5 cái',
        anchor: 'Sau khi tôi gập laptop kết thúc phiên làm việc chiều',
        completedToday: true,
        streakDays: 14,
        history: [true, true, true, true, true, true, true],
      },
      {
        id: 'h-3',
        title: 'Thiền định làm dịu tâm trí buổi tối',
        twoMinuteVersion: 'Ngồi tĩnh lặng và hít thở sâu 10 nhịp',
        anchor: 'Sau khi tôi cắm sạc điện thoại ở góc bàn lúc 22:00',
        completedToday: false,
        streakDays: 4,
        history: [false, true, true, true, true, false, false],
      },
    ],
  },
  unfocused_busy: {
    quadrants: {
      q1: [
        { id: 'q1-1', title: 'Xử lý sự cố đồng bộ dữ liệu người dùng', completed: false, tag: 'Hệ thống' },
        { id: 'q1-2', title: 'Gửi báo cáo tiến độ tuần cho ban quản trị', completed: true, tag: 'Báo cáo' },
      ],
      q2: [
        { id: 'q2-1', title: 'Học 1 bài giảng về Kiến trúc Phần mềm', completed: false, tag: 'Nâng cấp' },
        { id: 'q2-2', title: 'Viết tài liệu chuẩn hóa quy trình làm việc', completed: false, tag: 'Quy trình' },
        { id: 'q2-3', title: 'Lên kế hoạch tập luyện và dinh dưỡng tháng mới', completed: true, tag: 'Sức khỏe' },
      ],
      q3: [
        { id: 'q3-1', title: 'Tham gia cuộc họp cập nhật không có nội dung rõ ràng', completed: false, tag: 'Họp' },
        { id: 'q3-2', title: 'Trả lời các câu hỏi lặt vặt trên nhóm chat', completed: true, tag: 'Chat' },
      ],
      q4: [
        { id: 'q4-1', title: 'Lướt tin tức công nghệ ngoài giờ làm việc', completed: false, tag: 'Giải trí' },
        { id: 'q4-2', title: 'Dọn các tập tin tải về từ tháng trước', completed: false, tag: 'Vụn vặt' },
      ],
    },
  },
  distracted: {
    activeTask: 'Thiết kế luồng trải nghiệm người dùng PersonaFlow',
    timerDurationSeconds: 25 * 60,
    breakDurationSeconds: 5 * 60,
    totalSessionsToday: 3,
    distractionDump: [
      { id: 'dump-1', text: 'Nhớ xem lại giá bàn làm việc nâng hạ tối nay', time: '09:20', resolved: false },
      { id: 'dump-2', text: 'Tự dưng muốn tìm kiếm video review giày chạy bộ', time: '10:05', resolved: true },
    ],
  },
};
