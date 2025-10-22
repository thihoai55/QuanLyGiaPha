import React, { useState } from 'react';
import { eventsData } from '../data/eventsData';

const UpcomingEventsModal = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  // Lọc sự kiện sắp diễn ra (trong vòng 30 ngày tới)
  const now = new Date();
  const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  let upcomingEvents = eventsData.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= now && eventDate <= thirtyDaysFromNow;
  });

  // Lọc theo danh mục
  if (selectedCategory !== 'all') {
    upcomingEvents = upcomingEvents.filter(event => event.category === selectedCategory);
  }

  // Lọc theo tìm kiếm
  if (searchTerm) {
    upcomingEvents = upcomingEvents.filter(event => 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Sắp xếp theo ngày
  upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

  const getCategoryColor = (category) => {
    const colors = {
      'birthday': { bg: '#fce7f3', text: '#be185d' },
      'anniversary': { bg: '#f3e8ff', text: '#7c3aed' },
      'holiday': { bg: '#dcfce7', text: '#166534' },
      'family': { bg: '#dbeafe', text: '#1e40af' },
      'other': { bg: '#f3f4f6', text: '#374151' }
    };
    return colors[category] || colors['other'];
  };

  const getCategoryName = (category) => {
    const names = {
      'birthday': 'Sinh nhật',
      'anniversary': 'Kỷ niệm',
      'holiday': 'Lễ hội',
      'family': 'Gia đình',
      'other': 'Khác'
    };
    return names[category] || 'Khác';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hôm nay';
    if (diffDays === 1) return 'Ngày mai';
    if (diffDays < 7) return `${diffDays} ngày nữa`;
    
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getDaysUntilEvent = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '16px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'hidden',
        border: '2px solid #fde68a'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #dc2626 100%)',
          color: 'white',
          padding: '16px 20px',
          borderRadius: '10px 10px 0 0'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h2 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                margin: 0
              }}>Sự kiện sắp diễn ra</h2>
              <p style={{
                color: '#fef3c7',
                margin: '2px 0 0 0',
                fontSize: '12px'
              }}>Trong vòng 30 ngày tới</p>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '24px',
                fontWeight: 'bold',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Stats section removed as requested */}

        {/* Filters */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #fde68a',
          backgroundColor: 'white'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>Tìm kiếm</label>
              <input
                type="text"
                placeholder="Tìm theo tên sự kiện, mô tả, địa điểm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  padding: '8px 12px',
                  border: '2px solid #fde68a',
                  borderRadius: '6px',
                  outline: 'none',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#f59e0b';
                  e.target.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#fde68a';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>Danh mục</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  padding: '8px 12px',
                  border: '2px solid #fde68a',
                  borderRadius: '6px',
                  outline: 'none',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#f59e0b';
                  e.target.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#fde68a';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="all">Tất cả danh mục</option>
                <option value="birthday">Sinh nhật</option>
                <option value="anniversary">Kỷ niệm</option>
                <option value="holiday">Lễ hội</option>
                <option value="family">Gia đình</option>
                <option value="other">Khác</option>
              </select>
            </div>
          </div>
        </div>

        {/* Events List */}
        <div style={{
          padding: '24px',
          overflowY: 'auto',
          maxHeight: '400px'
        }}>
          {upcomingEvents.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {upcomingEvents.map((event) => {
                const daysUntil = getDaysUntilEvent(event.date);
                const categoryStyle = getCategoryColor(event.category);
                return (
                  <div key={event.id} style={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '16px',
                    transition: 'box-shadow 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between'
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          marginBottom: '8px'
                        }}>
                          <h3 style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            color: '#111827',
                            margin: 0
                          }}>{event.title}</h3>
                          <span style={{
                            padding: '2px 8px',
                            fontSize: '12px',
                            borderRadius: '12px',
                            backgroundColor: categoryStyle.bg,
                            color: categoryStyle.text
                          }}>
                            {getCategoryName(event.category)}
                          </span>
                        </div>
                        <p style={{
                          color: '#6b7280',
                          margin: '0 0 8px 0',
                          fontSize: '14px'
                        }}>{event.description}</p>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px',
                          fontSize: '14px',
                          color: '#6b7280'
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {formatDate(event.date)}
                          </div>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {event.location}
                          </div>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {event.time}
                          </div>
                        </div>
                      </div>
                      <div style={{
                        marginLeft: '16px',
                        textAlign: 'right'
                      }}>
                        <div style={{
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '14px',
                          fontWeight: '500',
                          backgroundColor: daysUntil <= 3 
                            ? '#fecaca' 
                            : daysUntil <= 7 
                            ? '#fef3c7' 
                            : '#dcfce7',
                          color: daysUntil <= 3 
                            ? '#991b1b' 
                            : daysUntil <= 7 
                            ? '#92400e' 
                            : '#166534'
                        }}>
                          {daysUntil === 0 ? 'Hôm nay' : 
                           daysUntil === 1 ? 'Ngày mai' : 
                           `${daysUntil} ngày nữa`}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '32px 0'
            }}>
              <svg style={{
                margin: '0 auto 16px',
                width: '48px',
                height: '48px',
                color: '#9ca3af'
              }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p style={{
                color: '#6b7280',
                fontSize: '16px',
                margin: 0
              }}>Không có sự kiện nào sắp diễn ra</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          backgroundColor: '#fef3c7',
          padding: '16px 24px',
          borderTop: '1px solid #fde68a',
          borderRadius: '0 0 10px 10px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              margin: 0
            }}>
              Hiển thị {upcomingEvents.length} sự kiện sắp diễn ra
            </p>
            <button
              onClick={onClose}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#d97706';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f59e0b';
              }}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEventsModal;