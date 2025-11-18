import React, { useMemo, useState, useEffect } from 'react';
import { eventsData, eventTypes as eventTypesData } from '../data/eventsData';
import CreateEventModal from './CreateEventModal';

const Icon = ({ name, size = 16, color = '#6b7280' }) => <i className={`bi-${name}`} style={{ fontSize: size, color }} />;

const StatCard = ({ label, value, icon, gradient, onClick }) => (
    <div style={{ background: '#fff', border: '1px solid #f5d08a', borderRadius: 12, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'transform .15s ease', cursor: 'pointer' }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
        onClick={onClick}
    >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                {icon}
            </div>
            <div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{label}</div>
                <div style={{ fontSize: 22, fontWeight: 700 }}>{value}</div>
            </div>
        </div>
    </div>
);

const StatsPopup = ({ isOpen, onClose, type, data, events, getDateGradient }) => {
    if (!isOpen) return null;

    const getPopupContent = () => {
        switch (type) {
            case 'upcoming':
                return {
                    title: 'Sự kiện sắp diễn ra',
                    events: events.filter(e => e.status === 'upcoming').slice(0, 5),
                    emptyMessage: 'Không có sự kiện sắp diễn ra'
                };
            case 'thisMonth':
                const thisMonthEvents = events.filter(e => {
                    const d = new Date(e.date);
                    const now = new Date();
                    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
                });
                return {
                    title: 'Sự kiện tháng này',
                    events: thisMonthEvents.slice(0, 5),
                    emptyMessage: 'Không có sự kiện trong tháng này'
                };
            case 'important':
                return {
                    title: 'Sự kiện quan trọng',
                    events: events.filter(e => e.isImportant).slice(0, 5),
                    emptyMessage: 'Không có sự kiện quan trọng'
                };
            case 'attendees':
                return {
                    title: 'Chi tiết người tham gia',
                    events: events.slice(0, 5),
                    emptyMessage: 'Không có dữ liệu người tham gia'
                };
            default:
                return { title: '', events: [], emptyMessage: '' };
        }
    };

    const content = getPopupContent();

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}
            onClick={onClose}
        >
            <div style={{ background: '#fff', borderRadius: 16, padding: 24, maxWidth: 500, width: '90%', maxHeight: '80vh', overflow: 'auto', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: '#111827', margin: 0 }}>{content.title}</h3>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#6b7280' }}>×</button>
                </div>
                
                {content.events.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {content.events.map((event, index) => (
                            <div key={event.id} style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 12, padding: 16 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{ width: 40, height: 40, borderRadius: 8, background: getDateGradient(event.date), display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#374151', fontSize: 14, fontWeight: 700 }}>
                                        {new Date(event.date).getDate()}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 16, fontWeight: 600, color: '#111827', marginBottom: 4 }}>{event.title}</div>
                                        <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 2 }}>{event.time}</div>
                                        <div style={{ fontSize: 13, color: '#6b7280' }}>{event.location}</div>
                                        {type === 'attendees' && (
                                            <div style={{ fontSize: 13, color: '#059669', marginTop: 4, fontWeight: 600 }}>
                                                {event.attendees} người tham gia
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {content.events.length === 5 && (
                            <div style={{ textAlign: 'center', color: '#6b7280', fontSize: 14, marginTop: 8 }}>
                                ... và {Math.max(0, (type === 'upcoming' ? events.filter(e => e.status === 'upcoming').length : 
                                    type === 'thisMonth' ? events.filter(e => {
                                        const d = new Date(e.date);
                                        const now = new Date();
                                        return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
                                    }).length :
                                    type === 'important' ? events.filter(e => e.isImportant).length : events.length) - 5)} sự kiện khác
                            </div>
                        )}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', color: '#6b7280', padding: 40 }}>
                        {content.emptyMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

function SuKien() {
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('list'); // list | calendar
    const [activeType, setActiveType] = useState('all');
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupType, setPopupType] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const eventTypes = useMemo(() => eventTypesData, []);
    const [events, setEvents] = useState(() => eventsData.slice());

    const upcomingEvents = useMemo(() => events.filter(e => e.status === 'upcoming'), [events]);
    const sortedEvents = useMemo(() => {
        return [...upcomingEvents].sort((a, b) => a.date.localeCompare(b.date));
    }, [upcomingEvents]);

    const filteredByType = useMemo(() => {
        if (activeType === 'all') return sortedEvents;
        return sortedEvents.filter(e => e.type === activeType);
    }, [sortedEvents, activeType]);

    const filteredEvents = useMemo(() => {
        const q = (searchQuery || '').toLowerCase();
        return filteredByType.filter(e => e.title.toLowerCase().includes(q) || e.description?.toLowerCase().includes(q) || e.location.toLowerCase().includes(q));
    }, [filteredByType, searchQuery]);

    const stats = useMemo(() => {
        const totalUpcoming = filteredByType.length;
        const thisMonth = filteredByType.filter(e => {
            const d = new Date(e.date);
            const now = new Date();
            return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
        }).length;
        const important = filteredByType.filter(e => e.isImportant).length;
        const totalAttendees = filteredByType.reduce((s, e) => s + (e.attendees || 0), 0);
        return { totalUpcoming, thisMonth, important, totalAttendees };
    }, [filteredByType]);

    const getTypeColor = (typeId) => {
        const t = eventTypes.find(t => t.id === typeId);
        return t?.color || 'from-gray-400 to-gray-600';
    };

    const getDateGradient = (date) => {
        const day = new Date(date).getDate();
        const gradients = [
            'linear-gradient(135deg, #fef3c7, #fde68a)', // Vàng nhạt
            'linear-gradient(135deg, #dbeafe, #bfdbfe)', // Xanh dương nhạt
            'linear-gradient(135deg, #f3e8ff, #e9d5ff)', // Tím nhạt
            'linear-gradient(135deg, #fce7f3, #fbcfe8)', // Hồng nhạt
            'linear-gradient(135deg, #ecfdf5, #d1fae5)', // Xanh lá nhạt
            'linear-gradient(135deg, #fef2f2, #fecaca)', // Đỏ nhạt
            'linear-gradient(135deg, #f0f9ff, #bae6fd)', // Xanh cyan nhạt
            'linear-gradient(135deg, #fefce8, #fef3c7)', // Vàng cam nhạt
            'linear-gradient(135deg, #f5f3ff, #e0e7ff)', // Xanh tím nhạt
            'linear-gradient(135deg, #f0fdf4, #dcfce7)', // Xanh mint nhạt
            'linear-gradient(135deg, #fef7ff, #f3e8ff)', // Tím hồng nhạt
            'linear-gradient(135deg, #f0f9ff, #e0f2fe)', // Xanh sky nhạt
            'linear-gradient(135deg, #fefce8, #fef3c7)', // Vàng nhạt
            'linear-gradient(135deg, #f0fdf4, #dcfce7)', // Xanh lá nhạt
            'linear-gradient(135deg, #fef2f2, #fecaca)', // Đỏ nhạt
            'linear-gradient(135deg, #f3e8ff, #e9d5ff)', // Tím nhạt
            'linear-gradient(135deg, #dbeafe, #bfdbfe)', // Xanh dương nhạt
            'linear-gradient(135deg, #fce7f3, #fbcfe8)', // Hồng nhạt
            'linear-gradient(135deg, #ecfdf5, #d1fae5)', // Xanh lá nhạt
            'linear-gradient(135deg, #fef2f2, #fecaca)', // Đỏ nhạt
            'linear-gradient(135deg, #f0f9ff, #bae6fd)', // Xanh cyan nhạt
            'linear-gradient(135deg, #fefce8, #fef3c7)', // Vàng cam nhạt
            'linear-gradient(135deg, #f5f3ff, #e0e7ff)', // Xanh tím nhạt
            'linear-gradient(135deg, #f0fdf4, #dcfce7)', // Xanh mint nhạt
            'linear-gradient(135deg, #fef7ff, #f3e8ff)', // Tím hồng nhạt
            'linear-gradient(135deg, #f0f9ff, #e0f2fe)', // Xanh sky nhạt
            'linear-gradient(135deg, #fefce8, #fef3c7)', // Vàng nhạt
            'linear-gradient(135deg, #f0fdf4, #dcfce7)', // Xanh lá nhạt
            'linear-gradient(135deg, #fef2f2, #fecaca)', // Đỏ nhạt
            'linear-gradient(135deg, #f3e8ff, #e9d5ff)', // Tím nhạt
            'linear-gradient(135deg, #dbeafe, #bfdbfe)'  // Xanh dương nhạt
        ];
        return gradients[day % gradients.length];
    };

    const formatDateVN = (iso) => {
        const d = new Date(iso);
        const dd = String(d.getDate()).padStart(2, '0');
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const yyyy = d.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
    };

    const handleStatClick = (type) => {
        setPopupType(type);
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
        setPopupType('');
    };

    const handleCreateEvent = (event) => {
        setEvents(prev => [...prev, event]);
        setIsAddOpen(false);
    };

    const resetForm = () => {
        setIsAddOpen(false);
    };

    // Calendar functions
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();
        
        const days = [];
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(new Date(year, month, day));
        }
        
        return days;
    };

    const getEventsForDate = (date) => {
        if (!date) return [];
        // Sử dụng local date để tránh lỗi timezone
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;
        return events.filter(event => event.date === dateStr);
    };

    const getEventsForSelectedDate = () => {
        // Sử dụng local date để tránh lỗi timezone
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const day = String(selectedDate.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;
        
        let filteredEvents = events.filter(event => event.date === dateStr);
        
        if (activeType !== 'all') {
            filteredEvents = filteredEvents.filter(event => event.type === activeType);
        }
        
        return filteredEvents;
    };

    const navigateMonth = (direction) => {
        setCurrentMonth(prev => {
            const newMonth = new Date(prev);
            newMonth.setMonth(prev.getMonth() + direction);
            return newMonth;
        });
    };

    const formatMonthYear = (date) => {
        const months = [
            'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
            'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
        ];
        return `${months[date.getMonth()]} ${date.getFullYear()}`;
    };

    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp_sukien { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    return (
        <div style={{ padding: 32, background: '#fef3c7', minHeight: 'calc(100vh - 70px)' }}>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg,#f59e0b,#dc2626)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform .15s ease' }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                    >
                        <Icon name="calendar" size={22} color="#fff" />
                    </div>
                    <div>
                        <div style={{ fontSize: 24, fontWeight: 800, color: '#111827' }}>Sự kiện gia đình</div>
                        <div style={{ color: '#6b7280', marginTop: 6, fontSize: 13 }}>Quản lý các sự kiện và lễ nghi trong gia tộc</div>
                    </div>
                </div>
                <button onClick={() => setIsAddOpen(true)} style={{ background: 'linear-gradient(90deg,#f59e0b,#fb923c)', color: '#fff', border: '1px solid #f59e0b', borderRadius: 10, padding: '10px 14px', cursor: 'pointer', fontWeight: 700, transition: 'transform .15s ease, filter .15s ease' }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.filter = 'brightness(1.05)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.filter = 'none'; }}
                >
                    <span style={{ marginRight: 8 }}>＋</span> Tạo sự kiện
                </button>
            </div>

            {/* Thống kê sự kiện */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 16 }}>
                <StatCard label="Sắp diễn ra" value={stats.totalUpcoming.toString()} icon={<Icon name="clock" color="#fff" />} gradient="linear-gradient(135deg,#60a5fa,#2563eb)" onClick={() => handleStatClick('upcoming')} />
                <StatCard label="Tháng này" value={stats.thisMonth.toString()} icon={<Icon name="calendar" color="#fff" />} gradient="linear-gradient(135deg,#34d399,#059669)" onClick={() => handleStatClick('thisMonth')} />
                <StatCard label="Quan trọng" value={stats.important.toString()} icon={<Icon name="exclamation-triangle" color="#fff" />} gradient="linear-gradient(135deg,#fb923c,#ef4444)" onClick={() => handleStatClick('important')} />
                <StatCard label="Tổng người tham gia" value={stats.totalAttendees.toString()} icon={<Icon name="people" color="#fff" />} gradient="linear-gradient(135deg,#a78bfa,#7c3aed)" onClick={() => handleStatClick('attendees')} />
            </div>

            <div style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'center' }}>
                <div style={{ position: 'relative', flex: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', borderRadius: 10, transition: 'transform .15s ease' }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                > 
                    <i className="bi-search" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                    <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Tìm kiếm sự kiện..." style={{ width: '95%', height: 40, padding: '0 12px 0 36px', borderRadius: 10, border: '1px solid #fbbf24', outline: 'none', background: '#fff' }}
                        onFocus={(e) => { e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.15)'; }}
                        onBlur={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
                    />
                </div>
                <div style={{ display: 'flex', border: '1px solid #fcd34d', borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'transform .15s ease' }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                    <button onClick={() => setViewMode('list')} style={{ padding: '8px 12px', background: viewMode === 'list' ? '#f59e0b' : '#fff', color: viewMode === 'list' ? '#fff' : '#374151', border: 'none', cursor: 'pointer', transition: 'all .15s ease' }}
                        onMouseEnter={(e) => { 
                            if (viewMode !== 'list') {
                                e.currentTarget.style.background = '#fef3c7';
                            }
                        }}
                        onMouseLeave={(e) => { 
                            if (viewMode !== 'list') {
                                e.currentTarget.style.background = '#fff';
                            }
                        }}
                    >Danh sách</button>
                    <button onClick={() => setViewMode('calendar')} style={{ padding: '8px 12px', background: viewMode === 'calendar' ? '#f59e0b' : '#fff', color: viewMode === 'calendar' ? '#fff' : '#374151', border: 'none', cursor: 'pointer', transition: 'all .15s ease' }}
                        onMouseEnter={(e) => { 
                            if (viewMode !== 'calendar') {
                                e.currentTarget.style.background = '#fef3c7';
                            }
                        }}
                        onMouseLeave={(e) => { 
                            if (viewMode !== 'calendar') {
                                e.currentTarget.style.background = '#fff';
                            }
                        }}
                    >Lịch</button>
                </div>
            </div>

            <div style={{ background: '#fff', border: '1px solid #f3f4f6', borderRadius: 12, padding: 8, display: 'flex', gap: 8, overflowX: 'auto', flexWrap: 'wrap', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'transform .15s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
                {eventTypes.map((t) => (
                    <button key={t.id} onClick={() => setActiveType(t.id)} style={{ whiteSpace: 'nowrap', borderRadius: 10, border: activeType === t.id ? '1px solid #fb923c' : '1px solid #e5e7eb', background: activeType === t.id ? 'linear-gradient(90deg,#f59e0b,#fb923c)' : '#fff', color: activeType === t.id ? '#fff' : '#374151', padding: '8px 12px', display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', transition: 'all .15s ease' }}
                        onMouseEnter={(e) => { 
                            if (activeType !== t.id) {
                                e.currentTarget.style.transform = 'translateY(-1px)'; 
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                            }
                        }}
                        onMouseLeave={(e) => { 
                            if (activeType !== t.id) {
                                e.currentTarget.style.transform = 'translateY(0)'; 
                                e.currentTarget.style.boxShadow = 'none';
                            }
                        }}
                    >
                        <Icon name={t.icon} color={activeType === t.id ? '#fff' : '#6b7280'} />
                        {t.label}
                    </button>
                ))}
            </div>

            {viewMode === 'list' ? (
                <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {filteredEvents.map((event, index) => (
                        <div key={event.id} style={{ background: '#fff', border: '2px solid #fcd34d', borderRadius: 16, overflow: 'hidden', boxShadow: '0 6px 16px rgba(245,158,11,0.15)', transition: 'transform .2s ease, box-shadow .2s ease', animation: `fadeInUp_sukien .4s ease-out ${index * 0.05}s both` }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 24px rgba(245,158,11,0.25)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(245,158,11,0.15)'; }}
                        >
                            <div style={{ display: 'flex', alignItems: 'stretch' }}>
                                <div style={{ width: 90, flexShrink: 0, background: getDateGradient(event.date), color: '#374151', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 12, border: '1px solid rgba(0,0,0,0.05)' }}>
                                    <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1 }}>{new Date(event.date).getDate()}</div>
                                    <div style={{ fontSize: 12, marginTop: 4, fontWeight: 600 }}>Tháng {new Date(event.date).getMonth() + 1}</div>
                                </div>
                                <div style={{ flex: 1, padding: 20, position: 'relative' }}>
                                    <button style={{ position: 'absolute', right: 12, top: 12, border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, borderRadius: 8 }}
                                        onMouseEnter={(e) => { e.currentTarget.style.background = '#fff7ed'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                                    >
                                        <Icon name="three-dots-vertical" />
                                    </button>
                                    <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: 8, paddingRight: 28 }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                                <div style={{ fontSize: 18, fontWeight: 700, color: '#111827' }}>{event.title}</div>
                                                {event.isImportant && <span style={{ background: '#ef4444', color: '#fff', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, background: '#fff', borderRadius: '50%' }} /> Quan trọng</span>}
                                            </div>
                                            <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>{event.description}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, fontSize: 14, color: '#374151' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ color: '#d97706' }}><Icon name="clock" /></span> <span style={{ color: '#111827' }}>{event.time}</span></div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ color: '#d97706' }}><Icon name="geo-alt" /></span> <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.location}</span></div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ color: '#d97706' }}><Icon name="people" /></span> <span>{event.attendees}{event.maxAttendees ? ` / ${event.maxAttendees}` : ''}</span></div>
                                        {event.reminder && <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ color: '#d97706' }}><Icon name="bell" /></span> <span>Nhắc {event.reminder}</span></div>}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16, paddingTop: 16, borderTop: '1px solid #fde68a' }}>
                                        <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid #fcd34d', background: '#fff', padding: '8px 14px', borderRadius: 999, cursor: 'pointer', transition: 'transform .1s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}><span style={{ width: 28, height: 28, borderRadius: '50%', background: '#fef3c7', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="check-circle" /></span> Tham gia</button>
                                        <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid #fcd34d', background: '#fff', padding: '8px 14px', borderRadius: 999, cursor: 'pointer', transition: 'transform .1s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}><span style={{ width: 28, height: 28, borderRadius: '50%', background: '#fef3c7', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="share" /></span> Chia sẻ</button>
                                        <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid #fcd34d', background: '#fff', padding: '8px 14px', borderRadius: 999, cursor: 'pointer', transition: 'transform .1s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}><span style={{ width: 28, height: 28, borderRadius: '50%', background: '#fef3c7', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="pencil-square" /></span> Sửa</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filteredEvents.length === 0 && (
                        <div style={{ textAlign: 'center', color: '#6b7280', padding: 24, background: '#fff', border: '1px dashed #fde68a', borderRadius: 12 }}>Không có sự kiện phù hợp</div>
                    )}
                </div>
            ) : (
                <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
                    {/* Calendar */}
                    <div style={{ background: '#fff', border: '1px solid #f3f4f6', borderRadius: 12, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'transform .15s ease' }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                        {/* Calendar Header */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111827', margin: 0 }}>{formatMonthYear(currentMonth)}</h3>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <button onClick={() => navigateMonth(-1)} style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all .15s ease' }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = '#f9fafb'; e.currentTarget.style.borderColor = '#d1d5db'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#e5e7eb'; }}
                                >
                                    <Icon name="chevron-left" size={14} />
                                </button>
                                <button onClick={() => navigateMonth(1)} style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all .15s ease' }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = '#f9fafb'; e.currentTarget.style.borderColor = '#d1d5db'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#e5e7eb'; }}
                                >
                                    <Icon name="chevron-right" size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Calendar Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1, marginBottom: 8 }}>
                            {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(day => (
                                <div key={day} style={{ padding: 8, textAlign: 'center', fontSize: 12, fontWeight: 600, color: '#6b7280', background: '#f9fafb' }}>
                                    {day}
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
                            {getDaysInMonth(currentMonth).map((day, index) => {
                                if (!day) {
                                    return <div key={index} style={{ height: 40 }} />;
                                }
                                
                                const dayEvents = getEventsForDate(day);
                                const isSelected = day.toDateString() === selectedDate.toDateString();
                                const isToday = day.toDateString() === new Date().toDateString();
                                
                                return (
                                    <div key={day.getDate()} 
                                        style={{ 
                                            height: 40, 
                                            width: 40,
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'center', 
                                            cursor: 'pointer', 
                                            borderRadius: isSelected ? '50%' : 8,
                                            background: isSelected ? '#f59e0b' : isToday ? '#fef3c7' : 'transparent',
                                            color: isSelected ? '#fff' : isToday ? '#92400e' : '#374151',
                                            fontWeight: isSelected || isToday ? 700 : 500,
                                            position: 'relative',
                                            transition: 'all .15s ease',
                                            margin: '0 auto'
                                        }}
                                        onClick={() => setSelectedDate(day)}
                                        onMouseEnter={(e) => { 
                                            if (!isSelected) {
                                                e.currentTarget.style.background = '#f3f4f6'; 
                                                e.currentTarget.style.transform = 'scale(1.05)';
                                            }
                                        }}
                                        onMouseLeave={(e) => { 
                                            if (!isSelected) {
                                                e.currentTarget.style.background = isToday ? '#fef3c7' : 'transparent'; 
                                                e.currentTarget.style.transform = 'scale(1)';
                                            }
                                        }}
                                    >
                                        {day.getDate()}
                                        {dayEvents.length > 0 && (
                                            <div style={{ 
                                                position: 'absolute', 
                                                bottom: 2, 
                                                left: '50%', 
                                                transform: 'translateX(-50%)', 
                                                width: 4, 
                                                height: 4, 
                                                borderRadius: '50%', 
                                                background: isSelected ? '#fff' : '#f59e0b' 
                                            }} />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Events for Selected Date */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 12, background: '#fff', borderRadius: 12, border: '1px solid #f3f4f6', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'transform .15s ease' }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            <Icon name="calendar" color="#f59e0b" />
                            <span style={{ fontWeight: 600, color: '#111827' }}>
                                Sự kiện ngày {selectedDate.getDate()}/{selectedDate.getMonth() + 1}
                            </span>
                        </div>
                        
                        {getEventsForSelectedDate().length > 0 ? (
                            getEventsForSelectedDate().map(event => (
                                <div key={event.id} style={{ background: '#fff', border: '1px solid #f3f4f6', borderRadius: 12, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'transform .15s ease' }}
                                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                                        <div style={{ width: 40, height: 40, borderRadius: 10, background: getDateGradient(event.date), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Icon name={eventTypes.find(t => t.id === event.type)?.icon || 'calendar'} color="#374151" />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 700, color: '#111827', marginBottom: 4 }}>{event.title}</div>
                                            {event.isImportant && (
                                                <span style={{ background: '#ef4444', color: '#fff', fontSize: 10, fontWeight: 600, padding: '2px 6px', borderRadius: 999 }}>
                                                    Quan trọng
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6b7280', marginBottom: 4 }}>
                                        <Icon name="clock" size={12} /> {event.time}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6b7280', marginBottom: 4 }}>
                                        <Icon name="geo-alt" size={12} /> {event.location}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#059669', fontWeight: 600 }}>
                                        <Icon name="people" size={12} /> {event.attendees} người tham gia
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ textAlign: 'center', color: '#6b7280', padding: 24, background: '#fff', border: '1px dashed #fde68a', borderRadius: 12 }}>
                                Không có sự kiện nào trong ngày này
                            </div>
                        )}
                    </div>
                </div>
            )}

            <StatsPopup 
                isOpen={popupOpen} 
                onClose={closePopup} 
                type={popupType} 
                data={stats} 
                events={filteredEvents}
                getDateGradient={getDateGradient}
            />

            {/* Create Event Modal */}
            <CreateEventModal 
                isOpen={isAddOpen} 
                onClose={resetForm} 
                onCreateEvent={handleCreateEvent} 
            />
        </div>
    );
}

export default SuKien;


