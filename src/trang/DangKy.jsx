import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function DangKy() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }
    // Xử lý đăng ký ở đây
    console.log('Đăng ký:', formData);
    
    // Giả lập đăng ký thành công và chuyển hướng
    // Trong thực tế, bạn sẽ gọi API và kiểm tra kết quả
    if (formData.fullName && formData.email && formData.password) {
      // Lưu thông tin đăng ký vào localStorage hoặc context
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userName', formData.fullName);
      
      // Chuyển hướng đến dashboard
      navigate('/dashboard');
    }
  };

  const focusOn = (e) => { 
    e.currentTarget.style.border = '1px solid #f59e0b'; 
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.15)'; 
  };
  const focusOff = (e) => { 
    e.currentTarget.style.border = '1px solid #e5e7eb'; 
    e.currentTarget.style.boxShadow = 'none'; 
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'radial-gradient(1200px 600px at 20% -10%, rgba(245, 158, 11, 0.12), transparent), radial-gradient(900px 500px at 100% 0%, rgba(253, 230, 138, 0.16), transparent), #fffaf0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(10px)',
        borderRadius: 20,
        padding: '48px 40px',
        boxShadow: '0 24px 60px rgba(0,0,0,0.001)',
        border: '1px solid rgba(241, 227, 180, 0.6)',
        width: '100%',
        maxWidth: 520,
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, background: '#fde68a' }} />
            </div>
            <div>
              <div style={{ fontWeight: 800, color: '#111827', fontSize: 20 }}>Gia Phả TH</div>
              <div style={{ fontSize: 12, color: '#6b7280' }}>Kết nối thế hệ</div>
            </div>
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#0f172a', margin: 0 }}>Đăng ký tài khoản</h1>
          <p style={{ color: '#6b7280', marginTop: 8 }}>Tạo tài khoản để bắt đầu quản lý gia phả</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 20 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#374151' }}>Họ và tên</label>
            <div style={{ position: 'relative' }}>
              <i className="bi-person-fill" style={{ 
                position: 'absolute', 
                left: 16, 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: '#9ca3af',
                fontSize: 18
              }} />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onFocus={focusOn}
                onBlur={focusOff}
                placeholder="Nhập họ và tên đầy đủ"
                required
                style={{
                  width: '100%',
                  padding: '16px 16px 16px 48px',
                  borderRadius: 12,
                  border: '1px solid #e5e7eb',
                  outline: 'none',
                  fontSize: 16,
                  boxSizing: 'border-box',
                  transition: 'all 0.2s ease'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#374151' }}>Email</label>
            <div style={{ position: 'relative' }}>
              <i className="bi-envelope-fill" style={{ 
                position: 'absolute', 
                left: 16, 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: '#9ca3af',
                fontSize: 18
              }} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={focusOn}
                onBlur={focusOff}
                placeholder="Nhập địa chỉ email"
                required
                style={{
                  width: '100%',
                  padding: '16px 16px 16px 48px',
                  borderRadius: 12,
                  border: '1px solid #e5e7eb',
                  outline: 'none',
                  fontSize: 16,
                  boxSizing: 'border-box',
                  transition: 'all 0.2s ease'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#374151' }}>Số điện thoại</label>
            <div style={{ position: 'relative' }}>
              <i className="bi-telephone-fill" style={{ 
                position: 'absolute', 
                left: 16, 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: '#9ca3af',
                fontSize: 18
              }} />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onFocus={focusOn}
                onBlur={focusOff}
                placeholder="Nhập số điện thoại"
                required
                style={{
                  width: '100%',
                  padding: '16px 16px 16px 48px',
                  borderRadius: 12,
                  border: '1px solid #e5e7eb',
                  outline: 'none',
                  fontSize: 16,
                  boxSizing: 'border-box',
                  transition: 'all 0.2s ease'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#374151' }}>Mật khẩu</label>
            <div style={{ position: 'relative' }}>
              <i className="bi-lock-fill" style={{ 
                position: 'absolute', 
                left: 16, 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: '#9ca3af',
                fontSize: 18
              }} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={focusOn}
                onBlur={focusOff}
                placeholder="Tạo mật khẩu mạnh"
                required
                style={{
                  width: '100%',
                  padding: '16px 16px 16px 48px',
                  borderRadius: 12,
                  border: '1px solid #e5e7eb',
                  outline: 'none',
                  fontSize: 16,
                  boxSizing: 'border-box',
                  transition: 'all 0.2s ease'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#374151' }}>Xác nhận mật khẩu</label>
            <div style={{ position: 'relative' }}>
              <i className="bi-shield-check" style={{ 
                position: 'absolute', 
                left: 16, 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: '#9ca3af',
                fontSize: 18
              }} />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onFocus={focusOn}
                onBlur={focusOff}
                placeholder="Nhập lại mật khẩu"
                required
                style={{
                  width: '100%',
                  padding: '16px 16px 16px 48px',
                  borderRadius: 12,
                  border: '1px solid #e5e7eb',
                  outline: 'none',
                  fontSize: 16,
                  boxSizing: 'border-box',
                  transition: 'all 0.2s ease'
                }}
              />
            </div>
          </div>

          <div style={{ marginTop: 8 }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" style={{ accentColor: '#f59e0b', marginTop: 2 }} />
              <span style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.4 }}>
                Tôi đồng ý với <a href="#" style={{ color: '#92400e', textDecoration: 'none' }}>Điều khoản sử dụng</a> và <a href="#" style={{ color: '#92400e', textDecoration: 'none' }}>Chính sách bảo mật</a>
              </span>
            </label>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: 12,
              background: '#0b0b16',
              color: '#fff',
              border: 'none',
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              marginTop: 8
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 22px rgba(0,0,0,0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Tạo tài khoản
          </button>
        </form>

        {/* Divider */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          margin: '32px 0',
          color: '#9ca3af'
        }}>
          <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} />
          <span style={{ padding: '0 16px', fontSize: 14 }}>hoặc</span>
          <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} />
        </div>

        {/* Social Register */}
        <div style={{ display: 'grid', gap: 12 }}>
          <button style={{
            width: '100%',
            padding: '14px',
            borderRadius: 12,
            border: '1px solid #e5e7eb',
            background: '#fff',
            color: '#374151',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.border = '1px solid #f59e0b';
            e.currentTarget.style.background = '#fff7cc';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.border = '1px solid #e5e7eb';
            e.currentTarget.style.background = '#fff';
          }}>
            <i className="bi-google" style={{ color: '#db4437' }} />
            Đăng ký với Google
          </button>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <span style={{ color: '#6b7280', fontSize: 14 }}>Đã có tài khoản? </span>
          <Link 
            to="/dang-nhap" 
            style={{ 
              color: '#92400e', 
              textDecoration: 'none', 
              fontWeight: 600,
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#b45309'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#92400e'}
          >
            Đăng nhập ngay
          </Link>
        </div>

        {/* Back to home */}
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Link 
            to="/" 
            style={{ 
              color: '#9ca3af', 
              textDecoration: 'none', 
              fontSize: 14,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#6b7280'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
          >
            <i className="bi-arrow-left" />
            Quay về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DangKy;
