import React, { useState } from 'react';
import { eventTypes as eventTypesData } from '../data/eventsData';

const Icon = ({ name, size = 16, color = '#6b7280' }) => <i className={`bi-${name}`} style={{ fontSize: size, color }} />;

const CreateEventModal = ({ isOpen, onClose, onCreateEvent }) => {
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        type: 'all',
        attendees: 0,
        maxAttendees: '',
        isImportant: false,
        reminder: ''
    });

    const eventTypes = eventTypesData;

    const handleInputChange = (field, value) => {
        setNewEvent(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCreateEvent = () => {
        // Validate required fields
        if (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.location) {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc');
            return;
        }

        // Create new event object
        const event = {
            id: Date.now().toString(),
            ...newEvent,
            status: 'upcoming',
            maxAttendees: newEvent.maxAttendees ? parseInt(newEvent.maxAttendees) : null
        };

        // Call the onCreateEvent callback
        onCreateEvent(event);
        
        // Reset form and close modal
        resetForm();
    };

    const resetForm = () => {
        setNewEvent({
            title: '',
            description: '',
            date: '',
            time: '',
            location: '',
            type: 'all',
            attendees: 0,
            maxAttendees: '',
            isImportant: false,
            reminder: ''
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '60px 20px 0 20px' }} onClick={resetForm}>
            <div style={{ width: 'min(600px, 90vw)', maxHeight: '85vh', overflow: 'auto', background: '#fff', borderRadius: 14, border: '1px solid #f3f4f6', boxShadow: '0 12px 28px rgba(0,0,0,0.2)' }} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div style={{ padding: 16, borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontWeight: 800, color: '#111827', fontSize: 18 }}>Tạo sự kiện mới</div>
                    <button onClick={resetForm} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                        <Icon name="x-lg" size={20} />
                    </button>
                </div>

                <div style={{ padding: 24 }}>
                    {/* Title */}
                    <div style={{ marginBottom: 20 }}>
                        <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
                            Tên sự kiện <span style={{ color: '#ef4444' }}>*</span>
                        </label>
                        <input 
                            type="text" 
                            value={newEvent.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            placeholder="Nhập tên sự kiện..."
                            style={{ width: '100%', height: 40, padding: '0 12px', borderRadius: 10, border: '1px solid #fbbf24', outline: 'none', background: '#fff', fontSize: 14, boxSizing: 'border-box' }}
                            onFocus={(e) => { e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.15)'; }}
                            onBlur={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
                        />
                    </div>

                    {/* Date and Time */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                        <div>
                            <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
                                Ngày <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <input 
                                type="date" 
                                value={newEvent.date}
                                onChange={(e) => handleInputChange('date', e.target.value)}
                                style={{ width: '100%', height: 40, padding: '0 12px', borderRadius: 10, border: '1px solid #fbbf24', outline: 'none', background: '#fff', fontSize: 14, boxSizing: 'border-box' }}
                                onFocus={(e) => { e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.15)'; }}
                                onBlur={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
                                Giờ <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <input 
                                type="time" 
                                value={newEvent.time}
                                onChange={(e) => handleInputChange('time', e.target.value)}
                                style={{ width: '100%', height: 40, padding: '0 12px', borderRadius: 10, border: '1px solid #fbbf24', outline: 'none', background: '#fff', fontSize: 14, boxSizing: 'border-box' }}
                                onFocus={(e) => { e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.15)'; }}
                                onBlur={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div style={{ marginBottom: 20 }}>
                        <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
                            Địa điểm <span style={{ color: '#ef4444' }}>*</span>
                        </label>
                        <input 
                            type="text" 
                            value={newEvent.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            placeholder="Nhập địa điểm..."
                            style={{ width: '100%', height: 40, padding: '0 12px', borderRadius: 10, border: '1px solid #fbbf24', outline: 'none', background: '#fff', fontSize: 14, boxSizing: 'border-box' }}
                            onFocus={(e) => { e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.15)'; }}
                            onBlur={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
                        />
                    </div>

                    {/* Description */}
                    <div style={{ marginBottom: 20 }}>
                        <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
                            Mô tả
                        </label>
                        <textarea 
                            value={newEvent.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            placeholder="Nhập mô tả sự kiện..."
                            rows={3}
                            style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #fbbf24', outline: 'none', background: '#fff', fontSize: 14, resize: 'vertical', boxSizing: 'border-box' }}
                            onFocus={(e) => { e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.15)'; }}
                            onBlur={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
                        />
                    </div>

                    {/* Event Type and Max Attendees */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                        <div>
                            <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
                                Loại sự kiện
                            </label>
                            <select 
                                value={newEvent.type}
                                onChange={(e) => handleInputChange('type', e.target.value)}
                                style={{ width: '100%', height: 40, padding: '0 12px', borderRadius: 10, border: '1px solid #fbbf24', outline: 'none', background: '#fff', fontSize: 14, boxSizing: 'border-box' }}
                                onFocus={(e) => { e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.15)'; }}
                                onBlur={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
                            >
                                {eventTypes.map(type => (
                                    <option key={type.id} value={type.id}>{type.label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
                                Số người tối đa
                            </label>
                            <input 
                                type="number" 
                                value={newEvent.maxAttendees}
                                onChange={(e) => handleInputChange('maxAttendees', e.target.value)}
                                placeholder="Không giới hạn"
                                min="1"
                                style={{ width: '100%', height: 40, padding: '0 12px', borderRadius: 10, border: '1px solid #fbbf24', outline: 'none', background: '#fff', fontSize: 14, boxSizing: 'border-box' }}
                                onFocus={(e) => { e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.15)'; }}
                                onBlur={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
                            />
                        </div>
                    </div>

                    {/* Reminder */}
                    <div style={{ marginBottom: 20 }}>
                        <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
                            Nhắc nhở
                        </label>
                        <select 
                            value={newEvent.reminder}
                            onChange={(e) => handleInputChange('reminder', e.target.value)}
                            style={{ width: '100%', height: 40, padding: '0 12px', borderRadius: 10, border: '1px solid #fbbf24', outline: 'none', background: '#fff', fontSize: 14, boxSizing: 'border-box' }}
                            onFocus={(e) => { e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.15)'; }}
                            onBlur={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
                        >
                            <option value="">Không nhắc nhở</option>
                            <option value="1 ngày trước">1 ngày trước</option>
                            <option value="2 ngày trước">2 ngày trước</option>
                            <option value="1 tuần trước">1 tuần trước</option>
                        </select>
                    </div>

                    {/* Important */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                        <input 
                            type="checkbox" 
                            id="important"
                            checked={newEvent.isImportant}
                            onChange={(e) => handleInputChange('isImportant', e.target.checked)}
                            style={{ width: 16, height: 16, accentColor: '#f59e0b' }}
                        />
                        <label htmlFor="important" style={{ fontSize: 14, fontWeight: 600, color: '#374151', cursor: 'pointer' }}>
                            Sự kiện quan trọng
                        </label>
                    </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', borderTop: '1px solid #fbbf24' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#d97706' }}>
                        <Icon name="calendar" size={16} />
                        <span>Tạo sự kiện mới</span>
                    </div>
                    <div style={{ display: 'flex', gap: 12 }}>
                        <button
                            type="button"
                            onClick={resetForm}
                            style={{ padding: '10px 20px', borderRadius: 10, border: '1px solid #f59e0b', background: '#fff', color: '#92400e', cursor: 'pointer', fontWeight: 600 }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = '#fef3c7'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; }}
                        >
                            Hủy
                        </button>
                        <button
                            type="button"
                            onClick={handleCreateEvent}
                            disabled={!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.location}
                            style={{ 
                                padding: '10px 20px', 
                                borderRadius: 10, 
                                border: '1px solid #f59e0b', 
                                background: (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.location) ? '#f3f4f6' : 'linear-gradient(90deg,#f59e0b,#fb923c)', 
                                color: (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.location) ? '#9ca3af' : '#fff', 
                                cursor: (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.location) ? 'not-allowed' : 'pointer', 
                                fontWeight: 600,
                                opacity: (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.location) ? 0.5 : 1
                            }}
                            onMouseEnter={(e) => { 
                                if (newEvent.title && newEvent.date && newEvent.time && newEvent.location) {
                                    e.currentTarget.style.filter = 'brightness(1.05)'; 
                                }
                            }}
                            onMouseLeave={(e) => { 
                                if (newEvent.title && newEvent.date && newEvent.time && newEvent.location) {
                                    e.currentTarget.style.filter = 'none'; 
                                }
                            }}
                        >
                            Tạo sự kiện
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateEventModal;
