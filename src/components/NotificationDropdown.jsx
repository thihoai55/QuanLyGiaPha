import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { notifications as initialNotifications, notificationTypes, getNotificationStats } from '../data/notificationsData';

function NotificationDropdown({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState("all");
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const getNotificationIcon = (type) => {
    const iconStyle = { fontSize: '16px', width: '16px', height: '16px' };
    const typeConfig = notificationTypes[type] || notificationTypes.system;
    return <i className={typeConfig.icon} style={{ ...iconStyle, color: typeConfig.color }} />;
  };

  const getNotificationBgColor = (type) => {
    const typeConfig = notificationTypes[type] || notificationTypes.system;
    return { background: typeConfig.bgColor };
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleAccept = (id) => {
    console.log("Accept notification:", id);
    markAsRead(id);
  };

  const handleReject = (id) => {
    console.log("Reject notification:", id);
    markAsRead(id);
  };

  const stats = getNotificationStats(notifications);
  const { unreadCount, actionRequiredCount } = stats;

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === "unread") return !n.isRead;
    if (activeTab === "action") return n.actionRequired;
    return true;
  });

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      style={{
        position: 'absolute',
        top: '100%',
        right: 0,
        width: '400px',
        maxHeight: '600px',
        background: '#fff',
        border: '1px solid #fbbf24',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
        zIndex: 1000,
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <div style={{
        padding: '16px',
        borderBottom: '1px solid #fde68a',
        background: 'linear-gradient(135deg, #fef3c7, #fde68a)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="bi-bell" style={{ fontSize: '20px', color: '#d97706' }} />
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#92400e' }}>
              Thông báo
            </h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {unreadCount > 0 && (
              <Button
                onClick={markAllAsRead}
                style={{
                  padding: '4px 8px',
                  background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <i className="bi-check2-all" style={{ fontSize: '12px' }} />
                Đọc tất cả
              </Button>
            )}
            <Button
              onClick={onClose}
              style={{
                padding: '4px',
                background: 'transparent',
                color: '#92400e',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '4px'
              }}
            >
              <i className="bi-x" style={{ fontSize: '16px' }} />
            </Button>
          </div>
        </div>
        <p style={{ margin: 0, fontSize: '14px', color: '#b45309' }}>
          {unreadCount > 0 ? (
            <>Bạn có <span style={{ fontWeight: '600' }}>{unreadCount} thông báo</span> chưa đọc</>
          ) : (
            "Bạn đã đọc tất cả thông báo"
          )}
        </p>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        background: '#fffbeb',
        borderBottom: '1px solid #fde68a'
      }}>
        <button
          onClick={() => setActiveTab("all")}
          style={{
            flex: 1,
            padding: '12px',
            border: 'none',
            background: activeTab === "all" ? 'linear-gradient(135deg, #f59e0b, #f97316)' : 'transparent',
            color: activeTab === "all" ? '#fff' : '#92400e',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s ease'
          }}
        >
          Tất cả ({notifications.length})
        </button>
        <button
          onClick={() => setActiveTab("unread")}
          style={{
            flex: 1,
            padding: '12px',
            border: 'none',
            background: activeTab === "unread" ? 'linear-gradient(135deg, #f59e0b, #f97316)' : 'transparent',
            color: activeTab === "unread" ? '#fff' : '#92400e',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s ease'
          }}
        >
          Chưa đọc ({unreadCount})
        </button>
        <button
          onClick={() => setActiveTab("action")}
          style={{
            flex: 1,
            padding: '12px',
            border: 'none',
            background: activeTab === "action" ? 'linear-gradient(135deg, #f59e0b, #f97316)' : 'transparent',
            color: activeTab === "action" ? '#fff' : '#92400e',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s ease'
          }}
        >
          Cần xử lý ({actionRequiredCount})
        </button>
      </div>

      {/* Notifications List */}
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {filteredNotifications.length > 0 ? (
          filteredNotifications.slice(0, 5).map((notif) => (
            <div
              key={notif.id}
              style={{
                padding: '12px 16px',
                borderBottom: '1px solid #fde68a',
                background: !notif.isRead ? 'linear-gradient(135deg, #fef3c7, #fde68a)' : '#fff',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = !notif.isRead 
                  ? 'linear-gradient(135deg, #fde68a, #fbbf24)' 
                  : '#fef3c7';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = !notif.isRead 
                  ? 'linear-gradient(135deg, #fef3c7, #fde68a)' 
                  : '#fff';
              }}
            >
              <div style={{ display: 'flex', gap: '12px' }}>
                {/* Icon/Avatar */}
                <div style={{ flexShrink: 0 }}>
                  {notif.avatar ? (
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontWeight: '700',
                      fontSize: '12px'
                    }}>
                      {notif.avatar}
                    </div>
                  ) : (
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      ...getNotificationBgColor(notif.type)
                    }}>
                      {getNotificationIcon(notif.type)}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
                    <h4 style={{ 
                      margin: 0,
                      fontSize: '14px',
                      fontWeight: '600',
                      color: !notif.isRead ? '#92400e' : '#b45309',
                      lineHeight: '1.3'
                    }}>
                      {notif.title}
                    </h4>
                    {!notif.isRead && (
                      <span style={{
                        flexShrink: 0,
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #f59e0b, #f97316)'
                      }} />
                    )}
                  </div>
                  
                  <p style={{ 
                    fontSize: '12px', 
                    color: '#b45309', 
                    margin: '0 0 8px 0', 
                    lineHeight: '1.4',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {notif.message}
                  </p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#d97706' }}>
                      {notif.from && (
                        <span>From: {notif.from}</span>
                      )}
                      <span>{notif.time}</span>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {notif.actionRequired && !notif.isRead && (
                        <>
                          <Button
                            onClick={() => handleAccept(notif.id)}
                            style={{
                              padding: '2px 6px',
                              background: 'linear-gradient(135deg, #16a34a, #15803d)',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '10px',
                              fontWeight: '500'
                            }}
                          >
                            ✓
                          </Button>
                          <Button
                            onClick={() => handleReject(notif.id)}
                            style={{
                              padding: '2px 6px',
                              border: '1px solid #fbbf24',
                              background: 'transparent',
                              color: '#b45309',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '10px',
                              fontWeight: '500'
                            }}
                          >
                            ✗
                          </Button>
                        </>
                      )}
                      {!notif.isRead && !notif.actionRequired && (
                        <Button
                          onClick={() => markAsRead(notif.id)}
                          style={{
                            padding: '2px 6px',
                            background: 'transparent',
                            color: '#b45309',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '10px',
                            fontWeight: '500'
                          }}
                        >
                          Đọc
                        </Button>
                      )}
                      <Button
                        onClick={() => deleteNotification(notif.id)}
                        style={{
                          padding: '2px',
                          background: 'transparent',
                          color: '#dc2626',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                        title="Xóa"
                      >
                        <i className="bi-trash" style={{ fontSize: '12px' }} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '32px 16px',
            color: '#b45309'
          }}>
            <i className="bi-bell" style={{ fontSize: '32px', color: '#fbbf24', marginBottom: '8px', display: 'block' }} />
            <p style={{ margin: 0, fontSize: '14px' }}>
              {activeTab === "unread" && "Bạn đã đọc tất cả thông báo"}
              {activeTab === "action" && "Không có thông báo cần xử lý"}
              {activeTab === "all" && "Chưa có thông báo nào"}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      {filteredNotifications.length > 5 && (
        <div style={{
          padding: '12px 16px',
          borderTop: '1px solid #fde68a',
          background: '#fffbeb',
          textAlign: 'center'
        }}>
          <Button
            style={{
              padding: '8px 16px',
              background: 'linear-gradient(135deg, #f59e0b, #f97316)',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Xem tất cả thông báo
          </Button>
        </div>
      )}
    </div>
  );
}

export default NotificationDropdown;
