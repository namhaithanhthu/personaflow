export const TOUR_STEPS = [
  {
    step: 1,
    id: 'header-info',
    title: 'Thanh Nhịp Sinh Học & Giờ Vàng',
    desc: 'Hiển thị giao thức hiện tại, chuỗi ngày kỷ luật (Streak) và khung giờ làm việc hiệu quả nhất của bạn (Chronotype). Khi quá tải hoặc kiệt sức, hãy bấm nút "Tụt Mood" để giảm 70% khối lượng việc mà vẫn bảo toàn chuỗi.',
    target: '#tour-header',
  },
  {
    step: 2,
    id: 'tabs-navigation',
    title: '3 Tab Điều Hướng Tinh Gọn',
    desc: 'Giao diện được phân bổ khoa học: Tab 1 "Thực Hành Hôm Nay" để tập trung làm việc, Tab 2 "Thống Kê & Chuỗi" để theo dõi biểu đồ tiến độ, và Tab 3 "Hồ Sơ" để xem nhịp sinh học hoặc đổi phương pháp.',
    target: '#tour-tabs',
  },
  {
    step: 3,
    id: 'quick-start',
    title: 'Lộ Trình 3 Bước Mỗi Ngày',
    desc: 'Mỗi sáng khi mở app, hãy làm theo đúng 3 bước đánh số 1 -> 2 -> 3 ở đây. Khi đã thành phản xạ tự nhiên, bạn có thể bấm "Đã hiểu, thu gọn" để tiết kiệm không gian màn hình.',
    target: '#tour-quick-start',
  },
  {
    step: 4,
    id: 'workspace',
    title: 'Khu Vực Hành Động Chính',
    desc: 'Nhiệm vụ số 1 luôn có viền màu đất nung Terracotta nổi bật. Bạn có thể bấm thẳng vào tên việc để sửa (Inline Edit), di chuột để hiện thùng rác xóa (Delete), hoặc bấm "? Cách áp dụng" để đọc cẩm nang phương pháp.',
    target: '#tour-workspace',
  },
];

export const CONTEXTUAL_FAQS = {
  procrastination: [
    {
      q: 'Tại sao việc phụ của tôi lại bị khóa mờ?',
      a: 'Theo phương pháp "Eat That Frog", não bộ luôn có xu hướng làm việc lặt vặt để trốn tránh việc khó nhất. Ứng dụng cố tình khóa các việc phụ cho đến khi bạn hoàn thành "Con Ếch", giúp bạn không còn đường thoái lui.',
      keywords: ['khóa', 'mờ', 'con ếch', 'việc phụ', 'không bấm được'],
    },
    {
      q: 'Quy tắc 5 giây (5-Second Rule) hoạt động ra sao?',
      a: 'Não bạn chỉ mất khoảng 5 giây để nghĩ ra lý do lười biếng hoặc trì hoãn. Khi bấm nút "Kích hoạt 5 giây", bạn đếm ngược 5-4-3-2-1 và lập tức đặt tay vào làm việc trước khi sự do dự kịp xuất hiện.',
      keywords: ['5 giây', '5-second', 'đếm ngược', 'bắt đầu ngay'],
    },
    {
      q: 'Làm sao để sửa hoặc đổi Con Ếch khác?',
      a: 'Bạn chỉ cần bấm trực tiếp vào tên Con Ếch hoặc bấm vào icon cây bút chì ở góc phải thẻ để chỉnh sửa. Nếu muốn đổi hẳn việc khác, hãy bấm icon thùng rác để xóa rồi nhập việc mới.',
      keywords: ['sửa', 'đổi ếch', 'xóa ếch', 'thay đổi'],
    },
  ],
  overwhelmed: [
    {
      q: 'Tại sao lại là 2 phút mà không phải 15 hay 30 phút?',
      a: 'Khi bạn đang mệt mỏi hoặc choáng ngợp, mục tiêu 30 phút sẽ tạo cảm giác nặng nề khiến bạn không muốn nhấc tay. 2 phút nhỏ đến mức não bạn không thể từ chối. Khi đã làm xong 2 phút, đà quán tính sẽ tự nhiên kéo bạn làm tiếp.',
      keywords: ['2 phút', 'choáng ngợp', 'atomic habits', 'tại sao 2 phút'],
    },
    {
      q: 'Mỏ neo thói quen (Habit Stacking Anchor) là gì?',
      a: 'Đó là việc gắn một thói quen mới 2 phút ngay sau một hành động quen thuộc bạn làm hàng ngày (VD: "Sau khi tôi uống cà phê sáng, tôi sẽ mở sách đọc 1 trang"). Mỏ neo giúp não tự động kích hoạt hành vi mà không cần đắn đo.',
      keywords: ['mỏ neo', 'anchor', 'stacking', 'xếp chồng'],
    },
    {
      q: 'Thanh 7 chấm tròn bên cạnh thói quen có ý nghĩa gì?',
      a: 'Đó là chuỗi 7 ngày gần nhất (Streak). Mỗi ngày bạn tích hoàn thành, một chấm xanh lá sẽ sáng lên. Nhìn thấy chuỗi liên tục sẽ tạo động lực tâm lý giúp bạn không muốn bỏ dở.',
      keywords: ['chấm tròn', '7 ngày', 'streak', 'lịch sử'],
    },
  ],
  unfocused_busy: [
    {
      q: 'Tại sao ô Q1 (Làm ngay) lại giới hạn tối đa 3 việc?',
      a: 'Nghiên cứu chỉ ra rằng nếu bạn có quá 3 việc "khẩn cấp và quan trọng" trong một ngày, thực chất bạn chẳng có việc nào thực sự ưu tiên cả. Giới hạn 3 việc buộc bạn phải chọn lọc việc sinh tử nhất để xử lý.',
      keywords: ['q1', 'tối đa 3', 'giới hạn', 'eisenhower'],
    },
    {
      q: 'Làm sao phân biệt Q1 (Khẩn cấp) và Q2 (Quan trọng dài hạn)?',
      a: 'Q1 là việc nếu không làm ngay hôm nay sẽ có hậu quả xấu tức thì (sự cố, hạn chót báo cáo). Q2 là việc không ai hối thúc bạn hôm nay, nhưng nếu kiên trì làm thì sau 6 tháng cuộc đời bạn sẽ sang trang (học kỹ năng mới, tập thể thao, tối ưu quy trình).',
      keywords: ['q1 q2', 'phân biệt', 'quan trọng', 'khẩn cấp'],
    },
  ],
  distracted: [
    {
      q: 'Bãi đáp xao nhãng (Parking Lot) giúp ích gì cho tôi?',
      a: 'Khi đang tập trung mà nảy ra ý muốn lướt mạng hay mua đồ, nếu bạn cố đè nén thì não sẽ càng bồn chồn. Nếu bạn ghi nhanh nó vào Bãi đáp trong 3 giây, não sẽ an tâm rằng "ý nghĩ này đã được cất giữ an toàn" và ngoan ngoãn quay lại làm việc.',
      keywords: ['bãi đáp', 'parking lot', 'xao nhãng', 'ý nghĩ linh tinh'],
    },
    {
      q: 'Nếu tôi không hoàn thành việc trong 25 phút Pomodoro thì sao?',
      a: 'Hoàn toàn bình thường! Hãy cứ nghỉ ngơi đúng 5 phút khi hết giờ, sau đó bấm tiếp phiên 25 phút thứ hai để làm tiếp. Pomodoro đo lường "thời gian bạn không xao nhãng", chứ không ép bạn phải xong việc ngay.',
      keywords: ['pomodoro', '25 phút', 'chưa xong', 'nghỉ giải lao'],
    },
  ],
  general: [
    {
      q: 'Nút "Tụt Mood" (Chế độ MVE) dùng khi nào?',
      a: 'Hãy bấm nút này khi bạn bị ốm, kiệt sức sau ngày dài hoặc tâm trạng quá chùng xuống. Ứng dụng sẽ tự động thu gọn 70% khối lượng việc về mức "Nỗ lực tối thiểu" để bạn chỉ cần hoàn thành một việc siêu nhỏ là được tính giữ chuỗi ngày, không bị cảm giác tội lỗi.',
      keywords: ['tụt mood', 'mve', 'burnout', 'cứu chuỗi', 'kiệt sức'],
    },
    {
      q: 'Giờ vàng Chronotype có ý nghĩa gì?',
      a: 'Đó là khung giờ mà đồng hồ sinh học của bạn tỉnh táo nhất theo bài trắc nghiệm ban đầu (Sáng sớm, Chiều hoặc Đêm). Bạn nên để dành nhiệm vụ khó nhất trong ngày vào đúng khung giờ này.',
      keywords: ['chronotype', 'giờ vàng', 'sinh học', 'năng lượng'],
    },
    {
      q: 'Làm sao để đổi phương pháp kỷ luật khác hoặc làm lại test?',
      a: 'Bạn chỉ cần chuyển sang Tab 3 "Hồ Sơ & Đổi Phương Pháp". Tại đây bạn có thể bấm "Kích Hoạt Giao Thức" của bất kỳ phương pháp nào, hoặc bấm "Làm Lại Bài Test Chẩn Đoán" để trả lời lại từ đầu.',
      keywords: ['đổi phương pháp', 'làm lại test', 'chẩn đoán lại', 'reset'],
    },
    {
      q: 'Dữ liệu của tôi có bị mất khi tắt trình duyệt không?',
      a: 'Không hề! Mọi công việc bạn thêm, sửa, xóa, chuỗi ngày streak và trạng thái đóng mở hướng dẫn đều được lưu tự động trên bộ nhớ máy tính của bạn (LocalStorage).',
      keywords: ['lưu', 'mất dữ liệu', 'localstorage', 'tắt máy'],
    },
  ],
};
