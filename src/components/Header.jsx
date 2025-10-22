import React, { useState } from 'react';
import NotificationDropdown from './NotificationDropdown';
import { getNotificationStats } from '../data/notificationsData';
import './Header.css';

const Header = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    
    // Mock data for notifications - in real app this would come from context/API
    const mockNotifications = [
        {
            id: "1",
            type: "invite",
            title: "Lời mời tham gia gia phả",
            message: "Nguyễn Thị Lan mời bạn tham gia vào Gia phả họ Nguyễn",
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
            message: "Trần Văn Minh đề xuất thêm mối quan hệ",
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
            message: "Phạm Văn Đức đã trả lời bài viết của bạn",
            from: "Phạm Văn Đức",
            time: "2 giờ trước",
            isRead: true,
            avatar: "PVD"
        }
    ];
    
    const notificationStats = getNotificationStats(mockNotifications);
    const unreadCount = notificationStats.unread;

    return (
        <div style={{
            height: 70,
            background: '#fff',
            borderBottom: '1px solid #f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
            {/* Left - Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: 8,
                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <i className="bi-tree" style={{ color: '#fff', fontSize: 20 }} />
                    </div>
                    <div>
                        <div style={{ fontSize: 18, fontWeight: 700, color: '#111827' }}>Gia Phả Thị Hoài</div>
                        <div style={{ fontSize: 12, color: '#6b7280' }}>Kết nối thế hệ</div>
                    </div>
                </div>
            </div>

            {/* Center - Search */}
            <div style={{ flex: 1, maxWidth: 500, margin: '0 40px' }}>
                <div style={{ position: 'relative' }}>
                    <i className="bi-search" style={{
                        position: 'absolute',
                        left: 16,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#9ca3af',
                        fontSize: 16
                    }} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm thành viên, sự kiện..."
                        style={{
                            width: '100%',
                            height: 40,
                            padding: '0 16px 0 44px',
                            borderRadius: 20,
                            border: '1px solid #e5e7eb',
                            background: '#f9fafb',
                            outline: 'none',
                            fontSize: 14,
                            transition: 'all 0.2s ease'
                        }}
                        onFocus={(e) => {
                            e.currentTarget.style.border = '1px solid #f59e0b';
                            e.currentTarget.style.background = '#fff';
                            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.currentTarget.style.border = '1px solid #e5e7eb';
                            e.currentTarget.style.background = '#f9fafb';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    />
                </div>
            </div>

            {/* Right - Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <button style={{
                    background: 'none',
                    border: 'none',
                    fontSize: 20,
                    color: '#6b7280',
                    cursor: 'pointer',
                    padding: 8,
                    borderRadius: 8,
                    transition: 'all 0.2s ease'
                }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#f3f4f6';
                        e.currentTarget.style.color = '#374151';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'none';
                        e.currentTarget.style.color = '#6b7280';
                    }}
                >
                    <i className="bi-question-circle" />
                </button>

                {/* Notification Button with Dropdown */}
                <div style={{ position: 'relative' }}>
                    <button 
                        onClick={() => setShowNotifications(!showNotifications)}
                        style={{
                            background: showNotifications ? '#fef3c7' : 'none',
                            border: 'none',
                            fontSize: 20,
                            color: showNotifications ? '#d97706' : '#6b7280',
                            cursor: 'pointer',
                            padding: 8,
                            borderRadius: 8,
                            transition: 'all 0.2s ease',
                            position: 'relative'
                        }}
                        onMouseEnter={(e) => {
                            if (!showNotifications) {
                                e.currentTarget.style.background = '#f3f4f6';
                                e.currentTarget.style.color = '#374151';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!showNotifications) {
                                e.currentTarget.style.background = 'none';
                                e.currentTarget.style.color = '#6b7280';
                            }
                        }}
                    >
                        <i className="bi-bell" />
                        {unreadCount > 0 && (
                            <div 
                                className="notification-badge"
                                style={{
                                    position: 'absolute',
                                    top: 4,
                                    right: 4,
                                    minWidth: 18,
                                    height: 18,
                                    background: unreadCount > 9 ? '#ef4444' : 'linear-gradient(135deg, #f59e0b, #f97316)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff',
                                    fontSize: 10,
                                    fontWeight: '700',
                                    padding: unreadCount > 9 ? '2px 4px' : '0',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                }}
                            >
                                {unreadCount > 9 ? '9+' : unreadCount}
                            </div>
                        )}
                    </button>
                    
                    {/* Notification Dropdown */}
                    <NotificationDropdown 
                        isOpen={showNotifications}
                        onClose={() => setShowNotifications(false)}
                    />
                </div>

                <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 600
                }}>
                    TH
                </div>

                <button style={{
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: 20,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                >
                    Xuất PDF
                </button>

                <button style={{
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: 20,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                >
                    Sao lưu dữ liệu
                </button>
            </div>
        </div>
    );
};

export default Header;
