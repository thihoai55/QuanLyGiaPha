import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            borderTop: '2px solid rgb(255, 171, 74)',
            background: '#fef3c7',
            color: '#92400e',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 24, alignItems: 'start' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 8, background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ width: 22, height: 22, borderRadius: 4, background: '#fff' }} />
                        </div>
                        <div>
                            <div style={{ fontWeight: 800, color: '#92400e' }}>Gia Phả Việt</div>
                            <div style={{ fontSize: 12, color: '#a16207', marginTop: -2 }}>Kết nối thế hệ</div>
                        </div>
                    </div>
                    <div style={{ marginBottom: 14, lineHeight: 1.6, color: '#92400e' }}>Nền tảng quản lý gia phả hiện đại, giúp bạn lưu giữ và chia sẻ lịch sử gia đình một cách dễ dàng và an toàn.</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 10 }}>
                        <input placeholder="Email của bạn" onFocus={(e) => { e.currentTarget.style.border = '1px solid #f59e0b'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.15)'; }} onBlur={(e) => { e.currentTarget.style.border = '1px solid #e5e7eb'; e.currentTarget.style.boxShadow = 'none'; }} style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid #e5e7eb', background: '#fff', outline: 'none', boxSizing: 'border-box' }} />
                        <button style={{ padding: '10px 12px', borderRadius: 10, background: '#0b0b16', color: '#fff', whiteSpace: 'nowrap' }}>Đăng ký</button>
                    </div>
                </div>
                <div>
                    <div style={{ fontWeight: 700, color: '#92400e', marginBottom: 10 }}>Liên kết</div>
                    <div style={{ display: 'grid', gap: 10 }}>
                        {['Tính năng', 'Bảng giá', 'Demo', 'Blog'].map((t, i) => (
                            <a key={i} href="#" style={{ color: '#92400e', textDecoration: 'none', transition: 'color .2s ease' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#d97706'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#92400e'; }}>{t}</a>
                        ))}
                    </div>
                </div>
                <div>
                    <div style={{ fontWeight: 700, color: '#92400e', marginBottom: 10 }}>Hỗ trợ</div>
                    <div style={{ display: 'grid', gap: 10 }}>
                        {['Trung tâm trợ giúp', 'Tài liệu', 'Liên hệ', 'Câu hỏi thường gặp'].map((t, i) => (
                            <a key={i} href="#" style={{ color: '#92400e', textDecoration: 'none', transition: 'color .2s ease' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#d97706'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#92400e'; }}>{t}</a>
                        ))}
                    </div>
                </div>
                <div>
                    <div style={{ fontWeight: 700, color: '#92400e', marginBottom: 10 }}>Liên hệ</div>
                    <div style={{ display: 'grid', gap: 8, color: '#92400e' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><i className="bi-envelope-fill" style={{ color: '#d97706' }} /><span>support@giaphaviet.com</span></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><i className="bi-telephone-fill" style={{ color: '#d97706' }} /><span>1900 1234</span></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><i className="bi-geo-alt-fill" style={{ color: '#d97706' }} /><span>Hà Nội, Việt Nam</span></div>
                    </div>
                    <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                        {['twitter', 'facebook', 'whatsapp'].map((n, i) => (
                            <div key={i} style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', display: 'grid', placeItems: 'center', color: i === 0 ? '#60a5fa' : i === 1 ? '#34d399' : '#fbbf24', transition: 'transform .2s ease, box-shadow .2s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 18px rgba(0,0,0,0.2)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; }}>
                                <i className={`bi-${n}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '18px 24px', borderTop: '1px solid rgba(217, 119, 6, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: '#a16207' }}>
                <span>© {new Date().getFullYear()} Gia Phả TH. Bảo lưu mọi quyền.</span>
                <div style={{ display: 'flex', gap: 12 }}>
                    {['Chính sách bảo mật', 'Điều khoản sử dụng', 'Chính sách Cookie'].map((t, i) => (
                        <span key={i} style={{ transition: 'color .2s ease', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#d97706'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#a16207'; }}>{t}</span>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
