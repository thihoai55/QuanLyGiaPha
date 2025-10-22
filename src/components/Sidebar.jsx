import React from 'react';

const Sidebar = ({ activeTab, setActiveTab, handleLogout }) => {
    return (
        <div style={{
            width: 280,
            background: 'linear-gradient(180deg, #ffffff 0%, #fefefe 100%)',
            minHeight: '100vh',
            position: 'fixed',
            left: 0,
            top: 70,
            zIndex: 10,
            borderRight: '1px solid #e5e7eb',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '2px 0 10px rgba(0, 0, 0, 0.05)',
            transition: 'all 0.3s ease'
        }}>
            {/* Family Banner */}
            <div style={{
                background: 'linear-gradient(135deg, #f59e0b 50%, #d97706 90%, #dc2626 100%)',
                margin: '24px 20px',
                padding: '24px',
                borderRadius: 16,
                color: '#fff',
                textAlign: 'center',
                boxShadow: '0 8px 25px rgba(245, 158, 11, 0.3)',
                transition: 'all 0.3s ease',
                transform: 'translateY(0)'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(245, 158, 11, 0.4)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(245, 158, 11, 0.3)';
            }}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                    <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: 8,
                        background: 'rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <i className="bi-tree" style={{ color: '#fff', fontSize: 20 }} />
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 700 }}>
                        Gia phả họ Nguyễn - Nghệ An 
                    </div>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav style={{ flex: 1, padding: '0 20px' }}>
                {[
                    { id: 'dashboard', label: 'Bảng điều khiển', icon: 'bi-speedometer2' },
                    { id: 'family-tree', label: 'Cây gia phả', icon: 'bi-tree' },
                    { id: 'album', label: 'Album', icon: 'bi-images' },
                    { id: 'members', label: 'Thành viên', icon: 'bi-people' },
                    { id: 'invitations', label: 'Lời mời', icon: 'bi-person-plus', badge: 2 },
                    { id: 'suggestions', label: 'Đề xuất', icon: 'bi-lightbulb', badge: 3 },
                    { id: 'events', label: 'Sự kiện', icon: 'bi-calendar-event' },
                    { id: 'forum', label: 'Diễn đàn', icon: 'bi-chat-dots' },
                    { id: 'explore', label: 'Khám phá', icon: 'bi-compass' },
                    { id: 'settings', label: 'Cài đặt', icon: 'bi-gear' },
                    { id: 'logout', label: 'Đăng xuất', icon: 'bi-box-arrow-right', isLogout: true }
                ].map((item) => (
                     <button
                         key={item.id}
                         onClick={() => item.isLogout ? handleLogout() : setActiveTab(item.id)}
                         style={{
                             width: '100%',
                             display: 'flex',
                             alignItems: 'center',
                             gap: 12,
                             padding: '14px 16px',
                             marginBottom: 6,
                             border: 'none',
                             background: activeTab === item.id ? 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' : item.isLogout ? 'transparent' : 'transparent',
                             color: activeTab === item.id ? '#92400e' : item.isLogout ? '#ef4444' : '#374151',
                             cursor: 'pointer',
                             transition: 'all 0.3s ease',
                             textAlign: 'left',
                             fontSize: 14,
                             fontWeight: activeTab === item.id ? 600 : 500,
                             borderRadius: 12,
                             position: 'relative',
                             boxShadow: activeTab === item.id ? '0 4px 15px rgba(245, 158, 11, 0.2)' : 'none',
                             transform: activeTab === item.id ? 'translateX(4px)' : 'translateX(0)'
                         }}
                         onMouseEnter={(e) => {
                             if (activeTab !== item.id) {
                                 if (item.isLogout) {
                                     e.currentTarget.style.background = 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)';
                                     e.currentTarget.style.transform = 'translateX(4px)';
                                     e.currentTarget.style.boxShadow = '0 2px 8px rgba(239, 68, 68, 0.1)';
                                 } else {
                                     e.currentTarget.style.background = 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)';
                                     e.currentTarget.style.transform = 'translateX(4px)';
                                     e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                                 }
                             }
                         }}
                         onMouseLeave={(e) => {
                             if (activeTab !== item.id) {
                                 e.currentTarget.style.background = 'transparent';
                                 e.currentTarget.style.transform = 'translateX(0)';
                                 e.currentTarget.style.boxShadow = 'none';
                             }
                         }}
                     >
                        <i className={item.icon} style={{ fontSize: 16, color: activeTab === item.id ? '#f59e0b' : item.isLogout ? '#ef4444' : '#6b7280' }} />
                        <span style={{ flex: 1 }}>{item.label}</span>
                        {item.badge && (
                            <div style={{
                                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                color: '#fff',
                                fontSize: 10,
                                fontWeight: 700,
                                padding: '4px 8px',
                                borderRadius: '50%',
                                minWidth: 20,
                                minHeight: 20,
                                textAlign: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)',
                                animation: 'pulse 2s infinite'
                            }}>
                                {item.badge}
                            </div>
                        )}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
