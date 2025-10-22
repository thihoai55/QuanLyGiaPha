import React, { useState } from 'react';
import { familyMembersData, getTotalMembers, getTotalGenerations } from '../data/familyMembersData';
import { forumPosts } from '../data/forumData';
import { eventsData } from '../data/eventsData';
import AllMembersModal from './AllMembersModal';
import UpcomingEventsModal from './UpcomingEventsModal';

const MainContent = ({ userInfo, formatLastUpdate, setShowPricingPopup, setActiveTab }) => {
    const [showAllMembersModal, setShowAllMembersModal] = useState(false);
    const [showUpcomingEventsModal, setShowUpcomingEventsModal] = useState(false);
    return (
        <div style={{
            padding: '32px',
            background: '#fef3c7',
            minHeight: 'calc(100vh - 70px)',
            position: 'relative'
        }}>
            {/* Welcome Banner */}
            <div style={{
                background: '#fff',
                borderRadius: 16,
                padding: '32px',
                marginBottom: 32,
                color: '#111827',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                animation: 'fadeInUp 0.8s ease-out'
            }}>
                {/* Floating Bubbles */}
                <div className="bubble" />
                <div className="bubble" />
                <div className="bubble" />
                <div className="bubble" />
                <div className="bubble" />
                <div className="bubble" />
                <div className="bubble" />
                <div className="bubble" />
                <div className="bubble" />
                <div className="bubble" />
                <div className="bubble" />
                <div className="bubble" />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <h1 style={{ 
                            fontSize: 28, 
                            fontWeight: 700, 
                            margin: '0 0 8px 0',
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #dc2626 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            Chào mừng trở lại!
                        </h1>
                        <p style={{ fontSize: 16, margin: 0, color: '#6b7280' }}>
                            Gia phả họ Nguyễn Đình - Nghi Công Bắc
                        </p>
                        <button style={{
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                            color: '#fff',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: 20,
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: 'pointer',
                            marginTop: 16,
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-1px)';
                                e.currentTarget.style.boxShadow = '0 6px 16px rgba(245, 158, 11, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.3)';
                            }}
                        >
                            {userInfo.userRole}
                        </button>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>Cập nhật lần cuối</div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>
                            {formatLastUpdate(userInfo.lastLogin)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 32 }}>
                {[
                    {
                        title: 'Tổng thành viên',
                        value: getTotalMembers().toString(),
                        subtitle: 'Tất cả thành viên trong gia phả',
                        icon: 'bi-people',
                        iconColor: '#8b5cf6',
                        change: '+12%',
                        changeColor: '#10b981',
                        isClickable: true,
                        onClick: () => setShowAllMembersModal(true)
                    },
                    {
                        title: 'Số thế hệ',
                        value: getTotalGenerations().toString(),
                        subtitle: 'Từ tổ tiên đến hiện tại',
                        icon: 'bi-tree',
                        iconColor: '#10b981',
                        change: '+2',
                        changeColor: '#f59e0b',
                        isClickable: true,
                        onClick: () => setActiveTab('family-tree')
                    },
                    {
                        title: 'Sự kiện sắp tới',
                        value: '3',
                        subtitle: 'Sinh nhật và kỷ niệm',
                        icon: 'bi-calendar-event',
                        iconColor: '#8b5cf6',
                        change: 'Tuần này',
                        changeColor: '#f59e0b',
                        changeType: 'tag',
                        isClickable: true,
                        onClick: () => setShowUpcomingEventsModal(true)
                    },
                    {
                        title: 'Bảng giá',
                        value: '5',
                        subtitle: 'Gói dịch vụ gia phả',
                        icon: 'bi-credit-card',
                        iconColor: '#8b5cf6',
                        change: 'Nâng cấp',
                        changeColor: '#f59e0b',
                        changeType: 'tag',
                        isPricing: true
                    }
                 ].map((stat, index) => (
                     <div key={index} style={{
                         background: '#fff',
                         borderRadius: 12,
                         padding: '24px',
                         border: '1px solid #f0f0f0',
                         boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
                         transition: 'all 0.3s ease',
                         animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                        cursor: (stat.isPricing || stat.isClickable) ? 'pointer' : 'default'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
                        }}
                        onClick={() => {
                            if (stat.isPricing) {
                                setShowPricingPopup(true);
                            } else if (stat.isClickable && stat.onClick) {
                                stat.onClick();
                            }
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                            <div style={{
                                width: 40,
                                height: 40,
                                borderRadius: 10,
                                background: `${stat.iconColor}15`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <i className={stat.icon} style={{ color: stat.iconColor, fontSize: 20 }} />
                            </div>
                            <div style={{
                                fontSize: 12,
                                fontWeight: 600,
                                color: stat.changeColor,
                                background: stat.changeType === 'tag' ? '#fef3c7' : `${stat.changeColor}15`,
                                padding: '4px 8px',
                                borderRadius: stat.changeType === 'tag' ? 12 : 6
                            }}>
                                {stat.change}
                            </div>
                        </div>
                        <div style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 4 }}>
                            {stat.value}
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 4 }}>
                            {stat.title}
                        </div>
                        <div style={{ fontSize: 12, color: '#6b7280' }}>
                            {stat.subtitle}
                        </div>
                    </div>
                ))}
            </div>

            {/* Content Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32, marginBottom: 32 }}>
                {/* Recent Activity */}
                <div style={{ 
                    background: '#fff', 
                    borderRadius: 12, 
                    padding: '24px', 
                    border: '1px solid #f0f0f0', 
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s ease',
                    animation: 'fadeInUp 0.6s ease-out 0.4s both'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <i className="bi-activity" style={{ color: '#10b981', fontSize: 18 }} />
                            <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', margin: 0 }}>
                                Hoạt động gần đây
                            </h3>
                        </div>
                        <button style={{
                            background: 'none',
                            border: 'none',
                            color: '#f59e0b',
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: 'pointer',
                            padding: '4px 8px',
                            borderRadius: 6,
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#fef3c7';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'none';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                        >
                            Xem tất cả
                        </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {(
                            // Lấy 6 bài viết mới nhất từ forumPosts
                            [...forumPosts]
                                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                .slice(0, 6)
                                .map(post => ({
                                    action: post.title,
                                    user: post.author,
                                    time: formatLastUpdate(new Date(post.createdAt)),
                                    icon: post.categoryId === 'guide' ? 'bi-journal-text'
                                        : post.categoryId === 'discussion' ? 'bi-chat-dots'
                                        : post.categoryId === 'qa' ? 'bi-question-circle'
                                        : post.categoryId === 'search' ? 'bi-search'
                                        : post.categoryId === 'share' ? 'bi-share'
                                        : 'bi-activity',
                                    iconColor: '#f59e0b'
                                }))
                        ).map((activity, index) => (
                            <div key={index} style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 12, 
                                padding: '12px', 
                                borderRadius: 8, 
                                background: '#fafafa',
                                transition: 'all 0.2s ease',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#f3f4f6';
                                e.currentTarget.style.transform = 'translateX(4px)';
                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = '#fafafa';
                                e.currentTarget.style.transform = 'translateX(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                            >
                                <div style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: 8,
                                    background: `${activity.iconColor}15`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <i className={activity.icon} style={{ color: activity.iconColor, fontSize: 14 }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, fontWeight: 500, color: '#111827', marginBottom: 2 }}>
                                        {activity.action}
                                    </div>
                                    <div style={{ fontSize: 12, color: '#6b7280' }}>
                                        bởi {activity.user}
                                    </div>
                                </div>
                                <div style={{ fontSize: 12, color: '#9ca3af' }}>
                                    {activity.time}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Events */}
                <div style={{ 
                    background: '#fff', 
                    borderRadius: 12, 
                    padding: '24px', 
                    border: '1px solid #f0f0f0', 
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s ease',
                    animation: 'fadeInUp 0.6s ease-out 0.5s both'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <i className="bi-calendar-check" style={{ color: '#8b5cf6', fontSize: 18 }} />
                            <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', margin: 0 }}>
                                Sự kiện sắp tới
                            </h3>
                        </div>
                        <button style={{
                            background: 'none',
                            border: 'none',
                            color: '#f59e0b',
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: 'pointer',
                            padding: '4px 8px',
                            borderRadius: 6,
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#fef3c7';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'none';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                        >
                            Thêm mới
                        </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {(
                            // Lọc sự kiện trong 30 ngày tới và sắp xếp gần nhất trước
                            (() => {
                                const now = new Date();
                                const thirtyDays = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
                                const within30 = eventsData.filter(e => {
                                    const d = new Date(e.date);
                                    return d >= now && d <= thirtyDays;
                                }).sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 5);
                                const formatDayMonth = (iso) => {
                                    const d = new Date(iso);
                                    return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
                                };
                                const daysUntil = (iso) => {
                                    const d = new Date(iso);
                                    const diff = Math.ceil((d - now) / (1000 * 60 * 60 * 24));
                                    return diff <= 1 ? (diff === 0 ? 'Hôm nay' : 'Ngày mai') : `${diff} ngày`;
                                };
                                return within30.map(e => ({
                                    title: e.title,
                                    date: formatDayMonth(e.date),
                                    countdown: daysUntil(e.date),
                                    type: e.type
                                }));
                            })()
                        ).map((event, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                                padding: '12px',
                                borderRadius: 8,
                                background: '#fafafa',
                                border: '1px solid #f0f0f0',
                                transition: 'all 0.2s ease',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#f3f4f6';
                                e.currentTarget.style.transform = 'translateX(4px)';
                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                                e.currentTarget.style.borderColor = '#d1d5db';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = '#fafafa';
                                e.currentTarget.style.transform = 'translateX(0)';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.borderColor = '#f0f0f0';
                            }}
                            >
                                <div style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: 8,
                                    background: event.type === 'birthday' ? '#fef3c7' : event.type === 'memorial' ? '#fecaca' : '#dbeafe',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <i className="bi-calendar-event" style={{
                                        color: event.type === 'birthday' ? '#f59e0b' : event.type === 'memorial' ? '#dc2626' : '#3b82f6',
                                        fontSize: 14
                                    }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, fontWeight: 500, color: '#111827', marginBottom: 2 }}>
                                        {event.title}
                                    </div>
                                    <div style={{ fontSize: 12, color: '#6b7280' }}>
                                        {event.date}
                                    </div>
                                </div>
                                <div style={{
                                    fontSize: 12,
                                    fontWeight: 600,
                                    color: '#f59e0b',
                                    background: '#fef3c7',
                                    padding: '4px 8px',
                                    borderRadius: 12
                                }}>
                                    {event.countdown}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div style={{ marginBottom: 32 }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', margin: '0 0 16px 0' }}>
                    Hành động nhanh
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                    {[
                        {
                            title: 'Thêm thành viên',
                            subtitle: 'Mở rộng gia phả',
                            icon: 'bi-people',
                            color: '#3b82f6',
                            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                        },
                        {
                            title: 'Xem cây gia phả',
                            subtitle: 'Khám phá dòng tộc',
                            icon: 'bi-tree',
                            color: '#10b981',
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                        },
                        {
                            title: 'Tạo sự kiện',
                            subtitle: 'Nhắc nhở gia đình',
                            icon: 'bi-bell',
                            color: '#8b5cf6',
                            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
                        }
                     ].map((action, index) => (
                         <div key={index} style={{
                             background: action.background,
                             borderRadius: 12,
                             padding: '24px',
                             color: '#fff',
                             cursor: 'pointer',
                             transition: 'all 0.3s ease',
                             position: 'relative',
                             overflow: 'hidden',
                             animation: `fadeInUp 0.6s ease-out ${0.7 + index * 0.1}s both`
                         }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                                <i className={action.icon} style={{ fontSize: 24 }} />
                            </div>
                            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
                                {action.title}
                            </div>
                            <div style={{ fontSize: 12, opacity: 0.9 }}>
                                {action.subtitle}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Generation Statistics */}
            <div style={{ marginBottom: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <i className="bi-heart-fill" style={{ color: '#ef4444', fontSize: 16 }} />
                    <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', margin: 0 }}>
                        Thống kê theo thế hệ
                    </h3>
                </div>
                <div style={{ 
                    background: '#fff', 
                    borderRadius: 12, 
                    padding: '24px', 
                    border: '1px solid #f0f0f0', 
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s ease',
                    animation: 'fadeInUp 0.6s ease-out 0.6s both'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {[
                            { generation: 'Thế hệ 1', count: 2, percentage: 1, color: '#ef4444', width: 5 },
                            { generation: 'Thế hệ 2', count: 6, percentage: 4, color: '#f97316', width: 15 },
                            { generation: 'Thế hệ 3', count: 18, percentage: 12, color: '#f59e0b', width: 35 },
                            { generation: 'Thế hệ 4', count: 32, percentage: 21, color: '#eab308', width: 60 },
                            { generation: 'Thế hệ 5', count: 45, percentage: 29, color: '#22c55e', width: 85 },
                            { generation: 'Thế hệ 6', count: 38, percentage: 24, color: '#16a34a', width: 70 },
                            { generation: 'Thế hệ 7', count: 15, percentage: 9, color: '#15803d', width: 30 }
                        ].map((gen, index) => (
                            <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ fontSize: 14, fontWeight: 500, color: '#374151' }}>
                                        {gen.generation}
                                    </div>
                                    <div style={{ fontSize: 14, fontWeight: 500, color: '#111827' }}>
                                        {gen.count} người ({gen.percentage}%)
                                    </div>
                                </div>
                                <div style={{ position: 'relative', height: 8, background: '#fef3c7', borderRadius: 4, overflow: 'hidden' }}>
                                    <div style={{
                                        height: '100%',
                                        background: gen.color,
                                        borderRadius: 4,
                                        width: '0%',
                                        animation: `slideIn${index} 1.5s ease-out ${index * 0.2}s forwards`
                                    }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modals */}
            <AllMembersModal 
                isOpen={showAllMembersModal} 
                onClose={() => setShowAllMembersModal(false)} 
            />
            <UpcomingEventsModal 
                isOpen={showUpcomingEventsModal} 
                onClose={() => setShowUpcomingEventsModal(false)} 
            />
        </div>
    );
};

export default MainContent;
