// Dữ liệu ảo bài viết: dùng createdAt là ISO string và categoryId để lọc chuẩn
export const forumPosts = [
    { id: '1',  title: 'Hướng dẫn xác định đời thứ trong gia phả', author: 'Nguyễn Văn An', authorAvatar: 'NVA', category: 'Hướng dẫn', categoryId: 'guide', content: 'Nguyên tắc xác định đời theo quy ước truyền thống và hiện đại...', replies: 23, likes: 45, views: 1234, createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), isPinned: true, tags: ['hướng dẫn', 'đời thứ'] },
    { id: '2',  title: 'Bảo quản tài liệu gia phả cổ', author: 'Trần Thị Bình', authorAvatar: 'TTB', category: 'Thảo luận', categoryId: 'discussion', content: 'Kinh nghiệm bảo quản giấy cổ, chống ẩm mốc...', replies: 15, likes: 32, views: 876, createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), isHot: true, tags: ['bảo quản'] },
    { id: '3',  title: 'Tìm họ Lê tại Thanh Hóa', author: 'Lê Văn Cường', authorAvatar: 'LVC', category: 'Tìm kiếm', categoryId: 'search', content: 'Cần thông tin nhánh họ Lê làng Đông Sơn...', replies: 8, likes: 12, views: 543, createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), tags: ['tìm kiếm', 'họ Lê'] },
    { id: '4',  title: 'Mẫu sổ gia phả đẹp để tham khảo', author: 'Phạm Văn Đức', authorAvatar: 'PVD', category: 'Chia sẻ', categoryId: 'share', content: 'Chia sẻ một số layout truyền thống và hiện đại...', replies: 34, likes: 67, views: 2145, createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), isPinned: true, isHot: true, tags: ['mẫu', 'thiết kế'] },
    { id: '5',  title: 'Ghi chú hôn nhân đúng chuẩn', author: 'Hoàng Thị Mai', authorAvatar: 'HTM', category: 'Hỏi đáp', categoryId: 'qa', content: 'Ghi chú khi kết hôn khác họ như thế nào?', replies: 19, likes: 28, views: 934, createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), tags: ['hôn nhân'] },
    { id: '6',  title: 'Kinh nghiệm tổ chức giỗ tổ', author: 'Vũ Văn Hùng', authorAvatar: 'VVH', category: 'Thảo luận', categoryId: 'discussion', content: 'Lên lịch, phân công, nghi thức...', replies: 41, likes: 89, views: 3421, createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), isHot: true, tags: ['giỗ tổ'] },
    // Thêm nhiều bài để lọc phong phú
    { id: '7',  title: 'Chuẩn hóa họ tên trong gia phả', author: 'Đặng Thị Huyền', authorAvatar: 'DTH', category: 'Hướng dẫn', categoryId: 'guide', content: 'Quy tắc viết hoa, tên đệm...', replies: 5, likes: 11, views: 210, createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), tags: ['chuẩn hóa'] },
    { id: '8',  title: 'Mẹo số hóa gia phả', author: 'Ngô Quang', authorAvatar: 'NQ', category: 'Chia sẻ', categoryId: 'share', content: 'Chụp ảnh, scan, đặt tên file...', replies: 12, likes: 25, views: 620, createdAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(), tags: ['số hóa'] },
    { id: '9',  title: 'Tuyển thành viên ban biên soạn', author: 'Admin', authorAvatar: 'AD', category: 'Thảo luận', categoryId: 'discussion', content: 'Mời tham gia biên soạn gia phả họ...', replies: 18, likes: 40, views: 980, createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), isHot: true, tags: ['tổ chức'] },
    { id: '10', title: 'Hỏi nguồn gốc họ Phan', author: 'Phan Trí', authorAvatar: 'PT', category: 'Hỏi đáp', categoryId: 'qa', content: 'Gia đình có truyền thuyết, cần kiểm chứng...', replies: 9, likes: 10, views: 300, createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), tags: ['họ Phan'] },
    { id: '11', title: 'Nhờ tìm tư liệu tại Nghệ An', author: 'Mai Hương', authorAvatar: 'MH', category: 'Tìm kiếm', categoryId: 'search', content: 'Thư viện địa phương, nhà thờ họ...', replies: 7, likes: 9, views: 200, createdAt: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(), tags: ['Nghệ An'] },
    { id: '12', title: 'Checklist cập nhật thành viên', author: 'Kiều Oanh', authorAvatar: 'KO', category: 'Hướng dẫn', categoryId: 'guide', content: 'Trước khi thêm/sửa thành viên cần...', replies: 3, likes: 6, views: 150, createdAt: new Date(Date.now() - 50 * 60 * 1000).toISOString() },
    { id: '13', title: 'Chia sẻ template Excel', author: 'Tạ Duy', authorAvatar: 'TD', category: 'Chia sẻ', categoryId: 'share', content: 'Template nhập liệu cây gia phả...', replies: 21, likes: 33, views: 820, createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString() },
    { id: '14', title: 'Trao đổi về ghi chú ly hôn', author: 'Ninh Hà', authorAvatar: 'NH', category: 'Thảo luận', categoryId: 'discussion', content: 'Cách thể hiện trung tính, tôn trọng...', replies: 6, likes: 14, views: 410, createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() },
    { id: '15', title: 'Xin mẫu sơ đồ thế hệ', author: 'Lan Anh', authorAvatar: 'LA', category: 'Hỏi đáp', categoryId: 'qa', content: 'Có mẫu sơ đồ thế hệ đẹp không ạ?', replies: 2, likes: 5, views: 120, createdAt: new Date(Date.now() - 40 * 60 * 1000).toISOString() },
    { id: '16', title: 'Nhờ xác minh phả ký xưa', author: 'Hoài Nam', authorAvatar: 'HN', category: 'Tìm kiếm', categoryId: 'search', content: 'Bản chụp mờ, cần chuyên gia đọc...', replies: 4, likes: 7, views: 190, createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString() },
    { id: '17', title: 'Ảnh tư liệu quý hiếm', author: 'Bùi Hữu', authorAvatar: 'BH', category: 'Chia sẻ', categoryId: 'share', content: 'Một số ảnh xưa cần số hóa...', replies: 13, likes: 28, views: 760, createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), isHot: true },
    { id: '18', title: 'Best practice ghi chú ngày tháng', author: 'Đỗ Hải', authorAvatar: 'ĐH', category: 'Hướng dẫn', categoryId: 'guide', content: 'Định dạng ngày tháng thống nhất...', replies: 1, likes: 3, views: 60, createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
    { id: '19', title: 'Cần tài liệu họ Trịnh', author: 'Trịnh Vinh', authorAvatar: 'TV', category: 'Tìm kiếm', categoryId: 'search', content: 'Đặc biệt khu vực Thanh Hóa...', replies: 5, likes: 8, views: 230, createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() },
    { id: '20', title: 'Tổ chức cuộc thi viết phả ký', author: 'Admin', authorAvatar: 'AD', category: 'Thảo luận', categoryId: 'discussion', content: 'Thể lệ, giải thưởng...', replies: 28, likes: 60, views: 1800, createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), isHot: true },
    { id: '21', title: 'Cách ghi nhận nuôi dưỡng', author: 'Phú Quý', authorAvatar: 'PQ', category: 'Hỏi đáp', categoryId: 'qa', content: 'Con nuôi ghi chú ra sao?', replies: 3, likes: 4, views: 90, createdAt: new Date(Date.now() - 70 * 60 * 1000).toISOString() },
    { id: '22', title: 'Chia sẻ file SVG cây gia phả', author: 'Quốc Việt', authorAvatar: 'QV', category: 'Chia sẻ', categoryId: 'share', content: 'Có thể phóng to rõ nét...', replies: 16, likes: 35, views: 990, createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString() },
    { id: '23', title: 'Checklist kiểm chứng thông tin', author: 'Lan Chi', authorAvatar: 'LC', category: 'Hướng dẫn', categoryId: 'guide', content: 'Nguồn gốc, chéo nguồn...', replies: 7, likes: 13, views: 300, createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() },
    { id: '24', title: 'Nhờ tìm mộ tổ', author: 'Minh Quân', authorAvatar: 'MQ', category: 'Tìm kiếm', categoryId: 'search', content: 'Khu vực Nam Định...', replies: 10, likes: 15, views: 450, createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() }
];

export const forumCategories = [
    { id: 'all', label: 'Tất cả', icon: 'chat-dots' },
    { id: 'guide', label: 'Hướng dẫn', icon: 'star' },
    { id: 'discussion', label: 'Thảo luận', icon: 'chat-left-dots' },
    { id: 'qa', label: 'Hỏi đáp', icon: 'question-circle' },
    { id: 'search', label: 'Tìm kiếm', icon: 'search' },
    { id: 'share', label: 'Chia sẻ', icon: 'bar-chart' },
    { id: 'members', label: 'Thành viên', icon: 'people' }
];

export const forumMembers = [
    { id: 'm1', name: 'Nguyễn Văn An', initials: 'NVA', joinedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), posts: 12 },
    { id: 'm2', name: 'Trần Thị Bình', initials: 'TTB', joinedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), posts: 7 },
    { id: 'm3', name: 'Lê Văn Cường', initials: 'LVC', joinedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), posts: 4 },
    { id: 'm4', name: 'Phạm Văn Đức', initials: 'PVD', joinedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), posts: 16 },
    { id: 'm5', name: 'Hoàng Thị Mai', initials: 'HTM', joinedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), posts: 5 },
    { id: 'm6', name: 'Vũ Văn Hùng', initials: 'VVH', joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), posts: 22 },
    { id: 'm7', name: 'Đặng Thị Huyền', initials: 'DTH', joinedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), posts: 2 },
    { id: 'm8', name: 'Ngô Quang', initials: 'NQ', joinedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), posts: 9 },
    { id: 'm9', name: 'Admin', initials: 'AD', joinedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), posts: 40 },
    { id: 'm10', name: 'Lan Anh', initials: 'LA', joinedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), posts: 3 },
    { id: 'm11', name: 'Hoài Nam', initials: 'HN', joinedAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(), posts: 6 },
    { id: 'm12', name: 'Quốc Việt', initials: 'QV', joinedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), posts: 18 }
];


