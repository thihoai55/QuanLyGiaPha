// Dữ liệu ảnh mẫu
export const mockPhotos = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800",
    title: "Đám cưới cô Lan và chú Minh",
    description: "Ngày vui của gia đình",
    date: "2024-12-15",
    location: "Hà Nội",
    uploadedBy: "Nguyễn Văn A",
    album: "Sự kiện gia đình",
    likes: 24,
    tags: ["đám cưới", "gia đình", "hạnh phúc"]
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
    title: "Tết Nguyên Đán 2024",
    description: "Sum họp gia đình",
    date: "2024-02-10",
    location: "Nghệ An",
    uploadedBy: "Nguyễn Thị B",
    album: "Tết",
    likes: 45,
    tags: ["tết", "sum họp", "truyền thống"]
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",
    title: "Giỗ tổ tiên năm 2024",
    description: "Lễ cúng tổ tiên",
    date: "2024-03-20",
    location: "Làng Phú Thọ",
    uploadedBy: "Nguyễn Văn C",
    album: "Lễ giỗ",
    likes: 32,
    tags: ["giỗ tổ", "truyền thống", "tôn kính"]
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1528642474498-1af0c17fd8c3?w=800",
    title: "Sinh nhật bà nội 80 tuổi",
    description: "Mừng thọ bà nội",
    date: "2024-05-15",
    location: "TP HCM",
    uploadedBy: "Nguyễn Văn D",
    album: "Sinh nhật",
    likes: 56,
    tags: ["sinh nhật", "mừng thọ", "gia đình"]
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    title: "Dã ngoại gia đình",
    description: "Chuyến đi Đà Lạt",
    date: "2024-07-20",
    location: "Đà Lạt",
    uploadedBy: "Nguyễn Thị E",
    album: "Du lịch",
    likes: 38,
    tags: ["du lịch", "đà lạt", "gia đình"]
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800",
    title: "Họp mặt họ Nguyễn",
    description: "Họp mặt đầu năm",
    date: "2024-01-05",
    location: "Hà Nội",
    uploadedBy: "Nguyễn Văn F",
    album: "Sự kiện gia đình",
    likes: 67,
    tags: ["họp mặt", "họ tộc", "truyền thống"]
  },
  {
    id: "7",
    url: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800",
    title: "Lễ cưới anh Minh và chị Lan",
    description: "Ngày cưới của anh chị",
    date: "2024-11-20",
    location: "Hà Nội",
    uploadedBy: "Nguyễn Văn G",
    album: "Sự kiện gia đình",
    likes: 89,
    tags: ["đám cưới", "hạnh phúc", "gia đình"]
  },
  {
    id: "8",
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
    title: "Tết Nguyên Đán 2023",
    description: "Tết năm trước",
    date: "2023-01-22",
    location: "Nghệ An",
    uploadedBy: "Nguyễn Thị H",
    album: "Tết",
    likes: 52,
    tags: ["tết", "năm cũ", "truyền thống"]
  }
];

// Dữ liệu album mẫu
export const mockAlbums = [
  { 
    id: "1", 
    name: "Tất cả ảnh", 
    cover: mockPhotos[0].url, 
    photoCount: mockPhotos.length, 
    date: "2024",
    description: "Tất cả ảnh trong thư viện"
  },
  { 
    id: "2", 
    name: "Sự kiện gia đình", 
    cover: mockPhotos[0].url, 
    photoCount: mockPhotos.filter(p => p.album === "Sự kiện gia đình").length, 
    date: "2024",
    description: "Các sự kiện quan trọng của gia đình"
  },
  { 
    id: "3", 
    name: "Tết", 
    cover: mockPhotos[1].url, 
    photoCount: mockPhotos.filter(p => p.album === "Tết").length, 
    date: "2024",
    description: "Ảnh Tết Nguyên Đán"
  },
  { 
    id: "4", 
    name: "Lễ giỗ", 
    cover: mockPhotos[2].url, 
    photoCount: mockPhotos.filter(p => p.album === "Lễ giỗ").length, 
    date: "2024",
    description: "Lễ giỗ tổ tiên"
  },
  { 
    id: "5", 
    name: "Sinh nhật", 
    cover: mockPhotos[3].url, 
    photoCount: mockPhotos.filter(p => p.album === "Sinh nhật").length, 
    date: "2024",
    description: "Sinh nhật các thành viên"
  },
  { 
    id: "6", 
    name: "Du lịch", 
    cover: mockPhotos[4].url, 
    photoCount: mockPhotos.filter(p => p.album === "Du lịch").length, 
    date: "2024",
    description: "Chuyến du lịch gia đình"
  }
];

// Hàm tính toán thống kê
export const getAlbumStats = () => {
  const totalPhotos = mockPhotos.length;
  const totalAlbums = mockAlbums.length - 1; // Trừ "Tất cả ảnh"
  const totalLikes = mockPhotos.reduce((sum, photo) => sum + photo.likes, 0);
  
  // Tính ảnh tháng này (giả sử tháng hiện tại là tháng 12/2024)
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const thisMonthPhotos = mockPhotos.filter(photo => {
    const photoDate = new Date(photo.date);
    return photoDate.getMonth() + 1 === currentMonth && photoDate.getFullYear() === currentYear;
  }).length;

  return {
    totalPhotos,
    totalAlbums,
    totalLikes,
    thisMonthPhotos
  };
};

// Hàm lấy ảnh theo album
export const getPhotosByAlbum = (albumId) => {
  if (albumId === "1") {
    return mockPhotos;
  }
  const album = mockAlbums.find(a => a.id === albumId);
  return album ? mockPhotos.filter(photo => photo.album === album.name) : [];
};

// Hàm lấy ảnh được thích nhiều nhất
export const getMostLikedPhotos = (limit = 5) => {
  return mockPhotos
    .sort((a, b) => b.likes - a.likes)
    .slice(0, limit);
};

// Hàm lấy ảnh mới nhất
export const getLatestPhotos = (limit = 5) => {
  return mockPhotos
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
};

// Hàm lấy ảnh theo tháng
export const getPhotosByMonth = (month, year) => {
  return mockPhotos.filter(photo => {
    const photoDate = new Date(photo.date);
    return photoDate.getMonth() + 1 === month && photoDate.getFullYear() === year;
  });
};
