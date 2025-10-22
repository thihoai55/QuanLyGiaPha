export const eventsData = [
    { id: '1', title: 'Giỗ tổ họ Nguyễn', type: 'memorial', date: '2025-10-15', time: '08:00', location: 'Nhà thờ họ Nguyễn, Hà Nội', organizer: 'Nguyễn Văn An', attendees: 145, maxAttendees: 200, description: 'Lễ giỗ tổ tiên hàng năm của họ Nguyễn. Tất cả con cháu đều được mời tham dự.', status: 'upcoming', isImportant: true, reminder: '1 tuần trước', imageUrl: 'https://images.unsplash.com/photo-1700324781657-bb71b4534ad0?q=80&w=1080&auto=format&fit=crop' },
    { id: '2', title: 'Sinh nhật cụ Nguyễn Văn Bình', type: 'birthday', date: '2025-10-20', time: '18:00', location: 'Nhà hàng Hoàng Gia, Hà Nội', organizer: 'Nguyễn Thị Mai', attendees: 50, maxAttendees: 60, description: 'Mừng thọ 90 tuổi cụ Nguyễn Văn Bình', status: 'upcoming', isImportant: true, reminder: '3 ngày trước' },
    { id: '3', title: 'Họp mặt gia đình', type: 'other', date: '2025-10-25', time: '10:00', location: 'Vườn sinh thái Thiên Đức', organizer: 'Trần Văn Cường', attendees: 80, description: 'Họp mặt định kỳ hàng quý của các gia đình trong dòng họ', status: 'upcoming', reminder: '1 ngày trước', imageUrl: 'https://images.unsplash.com/photo-1760328249117-18488466e34c?q=80&w=1080&auto=format&fit=crop' },
    { id: '4', title: 'Lễ cưới Nguyễn Văn Đức - Trần Thị Hoa', type: 'wedding', date: '2025-11-01', time: '16:00', location: 'Trung tâm hội nghị Melia, Hà Nội', organizer: 'Nguyễn Văn Đức', attendees: 230, maxAttendees: 300, description: 'Lễ cưới của con trai thứ của ông Nguyễn Văn An', status: 'upcoming', isImportant: true, reminder: '2 tuần trước' },
    { id: '5', title: 'Lễ thôi nôi bé Nguyễn Minh An', type: 'ceremony', date: '2025-11-10', time: '11:00', location: 'Nhà riêng, số 123 Láng Hạ', organizer: 'Nguyễn Văn Hùng', attendees: 35, description: 'Lễ thôi nôi cho cháu đích tôn đời thứ 8', status: 'upcoming' }
];

export const eventTypes = [
    { id: 'all', label: 'Tất cả', icon: 'calendar', color: 'from-gray-400 to-gray-600' },
    { id: 'memorial', label: 'Giỗ tổ', icon: 'church', color: 'from-purple-400 to-purple-600' },
    { id: 'birthday', label: 'Sinh nhật', icon: 'cake', color: 'from-pink-400 to-pink-600' },
    { id: 'wedding', label: 'Cưới hỏi', icon: 'heart', color: 'from-red-400 to-red-600' },
    { id: 'ceremony', label: 'Lễ nghi', icon: 'party', color: 'from-blue-400 to-blue-600' },
    { id: 'other', label: 'Khác', icon: 'gift', color: 'from-green-400 to-green-600' }
];

