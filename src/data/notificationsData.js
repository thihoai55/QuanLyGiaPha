// Dữ liệu thông báo cho component Notifications

export const notifications = [
  {
    id: "1",
    type: "invite",
    title: "Lời mời tham gia gia phả",
    message: "Nguyễn Thị Lan mời bạn tham gia vào Gia phả họ Nguyễn - Chi nhánh miền Nam",
    from: "Nguyễn Thị Lan",
    time: "5 phút trước",
    isRead: false,
    actionRequired: true,
    avatar: "NTL"
  },
  {
    id: "2",
    type: "suggestion",
    title: "Đề xuất chỉnh sửa quan hệ",
    message: "Trần Văn Minh đề xuất thêm mối quan hệ: Nguyễn Văn An là cha của Nguyễn Văn Bình",
    from: "Trần Văn Minh",
    time: "1 giờ trước",
    isRead: false,
    actionRequired: true,
    avatar: "TVM"
  },
  {
    id: "3",
    type: "comment",
    title: "Bình luận mới trên diễn đàn",
    message: "Phạm Văn Đức đã trả lời bài viết của bạn trong diễn đàn: 'Hướng dẫn cách xác định đời thứ trong gia phả'",
    from: "Phạm Văn Đức",
    time: "2 giờ trước",
    isRead: false,
    avatar: "PVD"
  },
  {
    id: "4",
    type: "event",
    title: "Nhắc nhở sự kiện",
    message: "Sinh nhật ông Nguyễn Văn An sẽ diễn ra vào ngày 15/10/2025 (còn 5 ngày)",
    time: "3 giờ trước",
    isRead: true
  },
  {
    id: "5",
    type: "system",
    title: "Cập nhật hệ thống",
    message: "Tính năng xuất PDF gia phả đã được cải thiện với nhiều mẫu thiết kế mới",
    time: "1 ngày trước",
    isRead: true
  },
  {
    id: "6",
    type: "suggestion",
    title: "Đề xuất cập nhật thông tin",
    message: "Lê Thị Mai đề xuất cập nhật thông tin nghề nghiệp của Nguyễn Văn Cường",
    from: "Lê Thị Mai",
    time: "2 ngày trước",
    isRead: true,
    actionRequired: true,
    avatar: "LTM"
  },
  {
    id: "7",
    type: "comment",
    title: "Được đánh dấu trong ảnh",
    message: "Nguyễn Văn Hùng đã đánh dấu bạn trong ảnh 'Tết Nguyên Đán 2024'",
    from: "Nguyễn Văn Hùng",
    time: "3 ngày trước",
    isRead: true,
    avatar: "NVH"
  },
  {
    id: "8",
    type: "invite",
    title: "Lời mời tham gia sự kiện",
    message: "Bạn được mời tham gia lễ cúng tổ tiên vào ngày 20/10/2024 tại nhà thờ họ",
    from: "Nguyễn Văn Minh",
    time: "4 ngày trước",
    isRead: true,
    actionRequired: true,
    avatar: "NVM"
  },
  {
    id: "9",
    type: "system",
    title: "Bảo trì hệ thống",
    message: "Hệ thống sẽ được bảo trì từ 2:00 - 4:00 ngày 25/10/2024. Vui lòng lưu công việc trước đó.",
    time: "5 ngày trước",
    isRead: true
  },
  {
    id: "10",
    type: "suggestion",
    title: "Đề xuất thêm ảnh",
    message: "Trần Thị Hoa đề xuất thêm ảnh chân dung cho thành viên Nguyễn Văn Đức",
    from: "Trần Thị Hoa",
    time: "1 tuần trước",
    isRead: true,
    actionRequired: true,
    avatar: "TTH"
  }
];

export const notificationTypes = {
  invite: {
    icon: "bi-person-plus",
    color: "#2563eb",
    bgColor: "linear-gradient(135deg, #dbeafe, #bfdbfe)"
  },
  suggestion: {
    icon: "bi-git-pull-request", 
    color: "#ea580c",
    bgColor: "linear-gradient(135deg, #fed7aa, #fdba74)"
  },
  comment: {
    icon: "bi-chat-dots",
    color: "#16a34a", 
    bgColor: "linear-gradient(135deg, #dcfce7, #bbf7d0)"
  },
  event: {
    icon: "bi-calendar-event",
    color: "#9333ea",
    bgColor: "linear-gradient(135deg, #e9d5ff, #d8b4fe)"
  },
  system: {
    icon: "bi-bell",
    color: "#d97706",
    bgColor: "linear-gradient(135deg, #fef3c7, #fde68a)"
  }
};

export const getNotificationStats = (notifications) => {
  const total = notifications.length;
  const unread = notifications.filter(n => !n.isRead).length;
  const actionRequired = notifications.filter(n => n.actionRequired && !n.isRead).length;
  
  return {
    total,
    unread,
    actionRequired,
    read: total - unread
  };
};
