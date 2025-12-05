import { UserProfile, Achievement } from './types';

export const COMPANY_LOGO = "https://xuan.media/wp-content/uploads/2024/07/LOGO-XUAN-MEDIA-1-e1720601225789.webp";

// Mock data for images - using picsum for demo purposes
// In production, these would be real URLs
// Generating more images for infinity scroll
const generateImages = (seed: number, count: number) => 
  Array.from({ length: count }, (_, i) => `https://picsum.photos/seed/${seed * 100 + i}/800/1000`);

export const USERS: Record<number, UserProfile> = {
  0: {
    id: 0,
    name: "Tập thể Xuân Media",
    role: "Gia đình Xuân Media",
    wishes: "Chúc đại gia đình Xuân Media một năm mới 2026 Bính Ngọ An Khang Thịnh Vượng, Tấn Tài Tấn Lộc, Vạn Sự Như Ý. Cùng nhau chinh phục những đỉnh cao mới!",
    images: generateImages(0, 15) // More photos for group to fill infinity gallery
  },
  // Generates users 1-12
  ...Array.from({ length: 12 }, (_, i) => i + 1).reduce((acc, id) => {
    acc[id] = {
      id,
      name: `Thành viên Xuân Media ${id}`,
      role: "Nhân sự nòng cốt",
      wishes: `Chúc ${id === 1 ? 'Anh/Chị' : 'bạn'} một năm mới rực rỡ, sức khỏe dồi dào và gặt hái được nhiều thành công trong sự nghiệp.`,
      images: generateImages(id, 15) // Ensure enough images for effect
    };
    return acc;
  }, {} as Record<number, UserProfile>)
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    title: "Chinh phục Deadline",
    description: "Những đêm thức trắng cùng nhau dựng video, chỉnh sửa hình ảnh để kịp tiến độ giao cho khách hàng.",
    icon: "⚡"
  },
  {
    id: 2,
    title: "Sáng tạo không ngừng",
    description: "Hàng trăm concept độc đáo được ra đời, mang lại giá trị thương hiệu vượt trội cho đối tác.",
    icon: "💡"
  },
  {
    id: 3,
    title: "Đoàn kết là sức mạnh",
    description: "Vượt qua những khó khăn của thị trường, chúng ta vẫn đứng vững nhờ sự đồng lòng của tất cả thành viên.",
    icon: "🤝"
  }
];

export const TET_SYMBOLS = {
  peachBlossom: "https://cdn-icons-png.flaticon.com/512/2362/2362624.png", // Simplified icon for demo
  ochnaFlower: "https://cdn-icons-png.flaticon.com/512/10639/10639433.png", // Yellow flower
  godOfWealth: "https://cdn-icons-png.flaticon.com/512/3596/3596048.png",
  lantern: "https://cdn-icons-png.flaticon.com/512/1683/1683793.png"
};

export const YEAR_REVIEW_DATA = [
  {
    month: "Tháng 3",
    title: "Dự Án Khởi Động",
    description: "Ký kết thành công hợp đồng media lớn nhất quý 1, mở đầu năm đầy rực rỡ.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    month: "Tháng 6",
    title: "Team Building Hè",
    description: "Chuyến đi Nha Trang gắn kết tình đồng đội, nạp năng lượng bùng nổ.",
    color: "from-yellow-400 to-orange-500"
  },
  {
    month: "Tháng 9",
    title: "Mở Rộng Quy Mô",
    description: "Chào đón thêm 5 nhân sự tài năng gia nhập đại gia đình Xuân Media.",
    color: "from-green-400 to-emerald-600"
  },
  {
    month: "Tháng 12",
    title: "Về Đích",
    description: "Hoàn thành 120% KPI năm, khẳng định vị thế trên thị trường Media.",
    color: "from-red-500 to-pink-600"
  }
];

export const FUTURE_GOALS = [
  "Top 3 Media Agency",
  "Mở rộng chi nhánh HCM",
  "Doanh thu x3",
  "Đổi mới sáng tạo AI"
];

export const LUCKY_WISHES = [
  "Tiền vô như nước sông Đà, tiền ra nhỏ giọt như cà phê phin.",
  "Hay ăn chóng béo, tiền nhiều như kẹo, tình chặt như keo.",
  "Tình duyên phơi phới, công danh tấn tới, vạn sự an khang.",
  "Sức khỏe vô biên, kiếm được nhiều tiền, đời sướng như tiên.",
  "Vạn sự như ý, tỷ sự như mơ, làm việc như thơ, đời vui như nhạc.",
  "Cung hỷ phát tài, tấn tài tấn lộc, ngũ phúc lâm môn.",
  "Mã đáo thành công, một bước lên mây, vàng bạc đầy tay.",
  "Năm mới Bính Ngọ, sức khỏe dẻo dai như ngựa chiến, vượt mọi chông gai."
];

// Placeholder MP3 for Tet music (Royalty Free)
export const BACKGROUND_MUSIC_URL = "https://cdn.pixabay.com/download/audio/2023/01/24/audio_3493e8e815.mp3?filename=chinese-new-year-136599.mp3";