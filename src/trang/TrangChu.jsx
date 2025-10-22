import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const scrollTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const linkBase = { color: '#111827', textDecoration: 'none', padding: '6px 8px', borderRadius: 8, transition: 'color .2s ease, background .2s ease, transform .2s ease' };
  const onEnter = (e) => { e.currentTarget.style.color = '#92400e'; e.currentTarget.style.background = '#fff7cc'; e.currentTarget.style.transform = 'translateY(-2px)'; };
  const onLeave = (e) => { e.currentTarget.style.color = '#111827'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; };
  return (
    <header style={{ position: 'sticky', top: 0, borderBottom: '1px solid #e5e7eb', background: '#ffffff', boxShadow: '0 10px 24px rgba(0,0,0,0.06)', zIndex: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 22, height: 22, borderRadius: 4, background: '#fde68a' }} />
          </div>
          <div>
            <div style={{ fontWeight: 800, color: '#111827' }}>Gia Phả TH</div>
            <div style={{ fontSize: 12, color: '#6b7280', marginTop: -2 }}>Kết nối thế hệ</div>
          </div>
        </div>
        <nav style={{ display: 'flex', gap: 18, color: '#111827', fontWeight: 600 }}>
          <a href="#trang-chu" onClick={scrollTo('trang-chu')} style={linkBase} onMouseEnter={onEnter} onMouseLeave={onLeave}>Trang chủ</a>
          <a href="#tinh-nang" onClick={scrollTo('tinh-nang')} style={linkBase} onMouseEnter={onEnter} onMouseLeave={onLeave}>Tính năng</a>
          <a href="#bang-gia" onClick={scrollTo('bang-gia')} style={linkBase} onMouseEnter={onEnter} onMouseLeave={onLeave}>Bảng giá</a>
          <a href="#huong-dan" onClick={scrollTo('huong-dan')} style={linkBase} onMouseEnter={onEnter} onMouseLeave={onLeave}>Hướng dẫn</a>
          <a href="#ve-chung-toi" onClick={scrollTo('ve-chung-toi')} style={linkBase} onMouseEnter={onEnter} onMouseLeave={onLeave}>Về chúng tôi</a>
          <a href="#lien-he" onClick={scrollTo('lien-he')} style={linkBase} onMouseEnter={onEnter} onMouseLeave={onLeave}>Liên hệ</a>
        </nav>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link to="/dang-nhap" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 12px', borderRadius: 10, border: '1px solid #e5e7eb', color: '#111827', textDecoration: 'none', transition: 'all .2s ease' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            <i className="bi-box-arrow-in-right" /> Đăng nhập
          </Link>
          <Link to="/dang-ky" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 12px', borderRadius: 10, background: '#0b0b16', color: '#fff', textDecoration: 'none', fontWeight: 700, boxShadow: '0 10px 22px rgba(0,0,0,0.18)', transition: 'transform .2s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}>
            <i className="bi-person-plus" /> Đăng ký
          </Link>
        </div>
      </div>
    </header>
  );
}

function HeroCoDien() {
  return (
    <section id="trang-chu" style={{ position: 'relative', padding: '72px 20px 48px', background: 'radial-gradient(1200px 600px at 20% -10%, rgba(245, 158, 11, 0.15), transparent), radial-gradient(900px 500px at 100% 0%, rgba(253, 230, 138, 0.22), transparent), #fffaf0', borderBottom: '1px solid #f1f5f9', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 28, alignItems: 'center' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: '#fff7cc', borderRadius: 999, color: '#92400e', fontSize: 13, boxShadow: '0 8px 22px rgba(245,158,11,0.25)', transform: 'translateY(-6px)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} />
            <span>Nền tảng gia phả số 1 Việt Nam</span>
          </div>
          <h1 style={{ fontSize: 64, lineHeight: 1.05, margin: '14px 0 0', color: '#0f172a', fontWeight: 800, letterSpacing: -1.5 }}>
            Kết nối gia đình<br />qua<br />nhiều thế hệ
          </h1>
          <p style={{ color: '#334155', marginTop: 16, maxWidth: 640 }}>
            Lưu giữ, quản lý và chia sẻ lịch sử gia đình một cách dễ dàng với nền tảng gia phả hiện đại và an toàn.
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 20 }}>
            <Link to="/dang-ky" style={{ padding: '14px 18px', borderRadius: 12, background: '#0b0b16', color: '#fff', textDecoration: 'none', fontWeight: 700 }}>Tạo gia phả miễn phí</Link>
            <a href="#tinh-nang" style={{ padding: '14px 18px', borderRadius: 12, border: '1px solid #e5e7eb', color: '#0f172a', textDecoration: 'none' }}>Xem demo</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {[0, 1, 2, 3].map((_, i) => (
                <div key={i} style={{ width: 34, height: 34, borderRadius: '50%', background: '#e5e7eb', display: 'grid', placeItems: 'center', marginLeft: i === 0 ? 0 : -10, border: '2px solid #fff' }}>
                  <i className="bi-person-fill" style={{ color: '#0f172a' }} />
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gap: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {[0, 1, 2, 3, 4].map((_, i) => (
                  <i key={i} className="bi-star-fill" style={{ color: '#f59e0b' }} />
                ))}
              </div>
              <div style={{ color: '#475569', fontSize: 14 }}>Được tin dùng bởi <span style={{ fontWeight: 800, color: '#0f172a' }}>50,000+</span> gia đình</div>
            </div>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.18)', border: '1px solid #f1e3b4' }}>
            <div style={{ width: '100%', height: 360, background: 'url(https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=1600&auto=format&fit=crop) center/cover no-repeat' }} />
          </div>
          <div style={{ position: 'absolute', left: '10%', right: '10%', bottom: -16, height: 32, background: 'linear-gradient(90deg, rgba(253,230,138,0.0), rgba(253,230,138,0.6), rgba(253,230,138,0.0))', filter: 'blur(6px)', borderRadius: 999 }} />
        </div>
      </div>
    </section>
  );
}

function TinhNang() {
  return (
    <section id="tinh-nang" style={{ position: 'relative', padding: '48px 20px', backgroundImage: 'radial-gradient(900px 500px at 0% 0%, rgba(253,230,138,0.35), transparent)', backgroundColor: '#ffffff' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', margin: 0, fontSize: 34, color: '#111827' }}>Tất cả những gì bạn cần</h2>
        <p style={{ textAlign: 'center', color: '#6b7280', marginTop: 8 }}>Công cụ đầy đủ để quản lý, lưu trữ và chia sẻ lịch sử gia đình của bạn</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 24, marginTop: 20 }}>
          {[
            {
              title: 'Tạo cây gia phả',
              desc: 'Tính năng cho phép bạn khởi tạo, thiết kế và tùy chỉnh cây gia phả trực quan. Người dùng có thể thêm, sửa, hoặc xóa các thành viên, xác lập quan hệ giữa các thế hệ, giúp toàn bộ lịch sử gia đình được thể hiện rõ ràng, sinh động và dễ dàng mở rộng về sau.',
              icon: 'bi-grid'
            },
            {
              title: 'Quản lý thành viên',
              desc: 'Lưu trữ và quản lý chi tiết thông tin từng thành viên trong gia đình như họ tên, ngày sinh, hình ảnh, vai trò, thế hệ, và các mối quan hệ. Dễ dàng tìm kiếm, chỉnh sửa hoặc cập nhật thông tin mà không sợ mất dữ liệu nhờ cơ chế lưu trữ an toàn và ổn định.',
              icon: 'bi-people'
            },
            {
              title: 'Bảo mật thông tin',
              desc: 'Hệ thống cung cấp các tùy chọn bảo mật mạnh mẽ, giúp bạn kiểm soát quyền riêng tư của gia phả. Người dùng có thể quyết định ai được xem, chỉnh sửa hoặc chia sẻ dữ liệu, đảm bảo toàn bộ thông tin cá nhân và lịch sử gia đình luôn được bảo vệ tuyệt đối.',
              icon: 'bi-shield-lock'
            },
            {
              title: 'Khám phá gia phả',
              desc: 'Cho phép bạn tìm kiếm, xem và học hỏi từ các gia phả công khai được chia sẻ bởi cộng đồng. Đây là cơ hội để kết nối với các dòng họ khác, mở rộng mối quan hệ, cũng như tìm lại cội nguồn hoặc những nhánh họ xa đã thất lạc.',
              icon: 'bi-search'
            },
            {
              title: 'Diễn đàn giao lưu',
              desc: 'Một không gian cộng đồng mở nơi các thành viên có thể chia sẻ câu chuyện, kinh nghiệm và truyền thống gia đình. Tại đây, mọi người có thể đặt câu hỏi, thảo luận về văn hóa, phong tục, hoặc cùng nhau đóng góp ý kiến để phát triển hệ thống gia phả Việt Nam ngày càng phong phú hơn.',
              icon: 'bi-chat-dots'
            },
            {
              title: 'Thống kê chi tiết',
              desc: 'Cung cấp các biểu đồ, số liệu và báo cáo thống kê về gia phả như số lượng thế hệ, giới tính, độ tuổi trung bình, hay phân bố địa lý của các thành viên. Tính năng này giúp người dùng hiểu sâu hơn về cấu trúc và lịch sử phát triển của gia đình mình.',
              icon: 'bi-bar-chart'
            }

          ].map((f, i) => (
            <div key={i} style={{ background: '#ffffff', border: '1px solid #f3f4f6', borderRadius: 18, padding: 24, display: 'grid', gap: 12, minHeight: 220, alignContent: 'start', transition: 'transform .2s ease, box-shadow .2s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 18px 36px rgba(0,0,0,0.12)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 0 rgba(0,0,0,0)'; }}>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: '#fff7cc', border: '1px solid #f59e0b', display: 'grid', placeItems: 'center', color: '#92400e' }}>
                <i className={f.icon} style={{ fontSize: 24 }} />
              </div>
              <div style={{ fontWeight: 800, color: '#111827', fontSize: 20 }}>{f.title}</div>
              <div style={{ color: '#6b7280', fontSize: 15, lineHeight: 1.8 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HuongDan() {
  const Step = ({ index, title, desc, showArrow }) => (
    <div style={{ position: 'relative', background: '#ffffff', border: '1px solid #f3f4f6', borderRadius: 16, padding: 24, minHeight: 220, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
      <div>
        <div style={{ fontSize: 64, color: '#e5e7eb', fontWeight: 800 }}>{index}</div>
        <div style={{ fontWeight: 700, color: '#0f172a', marginTop: 6 }}>{title}</div>
        <div style={{ color: '#6b7280', marginTop: 8 }}>{desc}</div>
      </div>
      {showArrow && (
        <div style={{ position: 'absolute', right: -14, top: '50%', transform: 'translateY(-50%)', width: 28, height: 28, borderRadius: '50%', background: '#fde68a', border: '1px solid #f59e0b', display: 'grid', placeItems: 'center', color: '#111827', boxShadow: '0 8px 22px rgba(245,158,11,0.25)' }}>
          <i className="bi-arrow-right" style={{ fontSize: 16 }} />
        </div>
      )}
    </div>
  );

  return (
    <section id="huong-dan" style={{ padding: '40px 20px', backgroundImage: 'radial-gradient(900px 500px at 100% 50%, rgba(253,230,138,0.30), transparent)', backgroundColor: '#fffef8', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 12, color: '#64748b', padding: '6px 10px', borderRadius: 999, background: '#f3f4f6' }}>Cách thức hoạt động</span>
          <h2 style={{ margin: '10px 0 0', fontSize: 34, color: '#111827' }}>Bắt đầu chỉ trong 3 bước</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          <Step index="01" title="Đăng ký tài khoản" desc="Tạo tài khoản miễn phí chỉ trong vài giây" showArrow />
          <Step index="02" title="Thêm thành viên" desc="Nhập thông tin các thành viên trong gia đình" showArrow />
          <Step index="03" title="Chia sẻ & Quản lý" desc="Mời thành viên tham gia và quản lý cùng nhau" />
        </div>
      </div>
    </section>
  );
}

function LyDoChonChungToi() {
  const bullets = [
    'Miễn phí trọn đời',
    'Không giới hạn thành viên',
    'Sao lưu tự động',
    'Hỗ trợ 24/7',
    'Xuất PDF chất lượng cao',
    'Ứng dụng di động'
  ];
  return (
    <section style={{ padding: '48px 20px', backgroundImage: 'radial-gradient(900px 500px at 0% 50%, rgba(253,230,138,0.32), transparent)', backgroundColor: '#ffffff' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: 12, color: '#64748b', padding: '6px 10px', borderRadius: 999, background: '#f3f4f6' }}>Lợi ích</span>
          <h2 style={{ margin: '10px 0 12px', fontSize: 40, color: '#0f172a', lineHeight: 1.15 }}>Tại sao chọn Gia Phả Việt?</h2>
          <p style={{ color: '#475569', marginBottom: 12 }}>Chúng tôi cam kết mang đến trải nghiệm tốt nhất cho việc quản lý gia phả của bạn</p>
          <div style={{ display: 'grid', gap: 12 }}>
            {bullets.map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#0f172a' }}>
                <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'grid', placeItems: 'center' }}>
                  <i className="bi-check2" />
                </span>
                <span style={{ color: '#0f172a', fontWeight: 600 }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.18)' }}>
            <img alt="benefits" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop" style={{ width: '100%', height: 420, objectFit: 'cover' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function BangGia() {
  const khungStyle = {
    borderRadius: 16,
    padding: 18,
    background: '#ffffff',
    border: '1px solid #f5e6b3',
    boxShadow: '0 6px 16px rgba(0,0,0,0.05)'
  };
  const data = [
    { name: 'Khởi đầu', price: 'Miễn phí' },
    { name: 'Cơ bản', price: '500.000đ/12 tháng' },
    { name: 'Đoàn viên', price: '1.000.000đ/12 tháng' },
    { name: 'Đồng tâm', price: '2.000.000đ/12 tháng' },
    { name: 'Thịnh vượng', price: '5.000.000đ/12 tháng' },
    { name: 'Bản sắc', price: '10.000.000đ/12 tháng' }
  ];
  return (
    <section id="bang-gia" style={{ padding: '40px 20px', backgroundImage: 'radial-gradient(900px 500px at 100% 0%, rgba(253,230,138,0.32), transparent)', backgroundColor: '#fffefb', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', margin: 0, fontSize: 28, color: '#111827', fontFamily: 'Georgia, serif' }}>Bảng giá</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginTop: 16 }}>
          {data.map((p, i) => (
            <div key={i} style={khungStyle} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 18px 36px rgba(0,0,0,0.12)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.05)'; }}>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 26, color: '#b45309' }}>{p.name}</div>
              <div style={{ color: '#111827', marginTop: 6, fontWeight: 700 }}>{p.price}</div>
              <ul style={{ margin: '10px 0 12px', paddingLeft: 18, color: '#6b7280' }}>
                <li>200 thành viên</li>
                <li>1 người quản lý</li>
                <li>1Gb dung lượng</li>
                <li>Website gia phả dòng họ</li>
              </ul>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', color: '#111827' }}>Xem chi tiết</button>
                <button style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #f59e0b', background: '#fde68a', color: '#111827', fontWeight: 700 }}>Đăng ký ngay</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VeChungToi() {
  const testimonials = useMemo(() => ([
    {
      name: 'Nguyễn Văn An',
      role: 'Trưởng dòng họ Nguyễn - Hà Nội',
      text: 'Gia Phả Việt đã giúp gia đình tôi kết nối lại với hàng trăm thành viên sau nhiều thế hệ. Thật tuyệt vời!',
    },
    {
      name: 'Trần Thị Bình',
      role: 'Quản lý gia phả họ Trần',
      text: 'Giao diện dễ sử dụng, tính năng đầy đủ. Tôi đã giới thiệu cho nhiều người thân sử dụng.',
    },
    {
      name: 'Lê Văn Cường',
      role: 'Thành viên gia phả họ Lê',
      text: 'Cách tốt nhất để lưu giữ lịch sử gia đình. Dữ liệu được bảo mật tốt và dễ dàng chia sẻ.',
    },
    {
      name: 'Phạm Thu Hà',
      role: 'Thư ký hội đồng gia tộc',
      text: 'Các sự kiện, lễ giỗ được nhắc lịch tự động, cả gia đình chủ động sắp xếp rất thuận tiện.',
    },
    {
      name: 'Đỗ Quang Minh',
      role: 'Admin website dòng họ Đỗ',
      text: 'Khả năng tùy biến website dòng họ đẹp và nhanh, xuất file cây gia phả để in rất rõ ràng.',
    },
    {
      name: 'Võ Anh Tuấn',
      role: 'Thành viên họ Võ - Quảng Nam',
      text: 'Mình thích nhất phần tìm kiếm họ hàng theo đời và quan hệ xưng hô, rất trực quan.',
    },
  ]), []);

  const chunk = (arr, size) => {
    const out = [];
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
    return out;
  };

  const pages = useMemo(() => chunk(testimonials, 3), [testimonials]);
  const [page, setPage] = useState(0);
  const intervalRef = useRef(null);

  const startAuto = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setPage((p) => (p + 1) % pages.length);
    }, 5000);
  };

  useEffect(() => {
    startAuto();
    return () => clearInterval(intervalRef.current);
  }, [pages.length]);

  const goPrev = () => {
    setPage((p) => (p - 1 + pages.length) % pages.length);
    startAuto();
  };
  const goNext = () => {
    setPage((p) => (p + 1) % pages.length);
    startAuto();
  };

  return (
    <section id="ve-chung-toi" style={{ padding: '40px 20px', position: 'relative', backgroundImage: 'radial-gradient(900px 500px at 0% 100%, rgba(253,230,138,0.28), transparent)', backgroundColor: '#ffffff' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 10 }}>
          <span style={{ fontSize: 12, color: '#64748b', padding: '6px 10px', borderRadius: 999, background: '#f3f4f6' }}>Đánh giá</span>
          <h2 style={{ margin: '10px 0 0', fontSize: 34, color: '#111827' }}>Người dùng nói gì về chúng tôi</h2>
        </div>

        <div style={{ overflow: 'hidden', position: 'relative' }}>
          <div
            style={{
              display: 'flex',
              width: `${pages.length * 100}%`,
              transform: `translateX(-${page * (100 / pages.length)}%)`,
              transition: 'transform .6s ease',
            }}
          >
            {pages.map((group, idx) => (
              <div key={idx} style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, width: `${100 / pages.length}%`, padding: '6px 2px' }}>
                {group.map((t, i) => (
                  <div key={`${idx}-${i}`} style={{ background: '#ffffff', border: '1px solid #f3f4f6', borderRadius: 16, padding: 18, minHeight: 220, display: 'grid', gap: 12, boxShadow: '0 8px 22px rgba(0,0,0,0.06)', transition: 'transform .2s ease, box-shadow .2s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 30px rgba(0,0,0,0.10)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 22px rgba(0,0,0,0.06)'; }}>
                    <div style={{ color: '#f59e0b' }}>★★★★★</div>
                    <div style={{ color: '#475569', fontStyle: 'italic' }}>&quot;{t.text}&quot;</div>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#f3f4f6' }} />
                      <div>
                        <div style={{ fontWeight: 700, color: '#111827' }}>{t.name}</div>
                        <div style={{ color: '#6b7280', fontSize: 13 }}>{t.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <button onClick={goPrev} aria-label="Trước" style={{ position: 'absolute', left: -10, top: '50%', transform: 'translateY(-50%)', padding: 16, borderRadius: 999, border: '1px solid #f59e0b', background: '#fde68a', color: '#111827', fontSize: 24, lineHeight: 1, boxShadow: '0 10px 24px rgba(245,158,11,0.25)', cursor: 'pointer' }}>{'‹'}</button>
          <button onClick={goNext} aria-label="Sau" style={{ position: 'absolute', right: -10, top: '50%', transform: 'translateY(-50%)', padding: 16, borderRadius: 999, border: '1px solid #f59e0b', background: '#fde68a', color: '#111827', fontSize: 24, lineHeight: 1, boxShadow: '0 10px 24px rgba(245,158,11,0.25)', cursor: 'pointer' }}>{'›'}</button>
        </div>
      </div>
    </section>
  );
}

function LienHe() {
  const focusOn = (e) => { e.currentTarget.style.border = '1px solid #f59e0b'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.15)'; };
  const focusOff = (e) => { e.currentTarget.style.border = '1px solid #e5e7eb'; e.currentTarget.style.boxShadow = 'none'; };
  return (
    <section id="lien-he" style={{ padding: '32px 20px', backgroundImage: 'radial-gradient(900px 500px at 100% 100%, rgba(253,230,138,0.26), transparent)', backgroundColor: '#fffef9' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 16, alignItems: 'start' }}>
        <div style={{ minWidth: 0 }}>
          <h2 style={{ marginTop: 0, fontSize: 28, color: '#111827' }}>Liên hệ</h2>
          <div style={{ color: '#6b7280', display: 'grid', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <i className="bi-envelope-fill" style={{ color: '#92400e' }} />
              <span>nguyenthihoai552004@gmail.com</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <i className="bi-telephone-fill" style={{ color: '#92400e' }} />
              <span>0819923174</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <i className="bi-geo-alt-fill" style={{ color: '#92400e' }} />
              <span>Nghệ An, Việt Nam</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: '#f9fafb', border: '1px solid #e5e7eb', display: 'grid', placeItems: 'center', color: '#3b82f6' }}>
              <i className="bi-twitter" />
            </div>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: '#f9fafb', border: '1px solid #e5e7eb', display: 'grid', placeItems: 'center', color: '#0ea5e9' }}>
              <i className="bi-facebook" />
            </div>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: '#f9fafb', border: '1px solid #e5e7eb', display: 'grid', placeItems: 'center', color: '#10b981' }}>
              <i className="bi-whatsapp" />
            </div>
          </div>
        </div>
        <form style={{ background: '#ffffff', border: '1px solid #f3f4f6', borderRadius: 12, padding: 16, display: 'grid', gap: 10, minWidth: 0 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 6 }}>Họ và tên</label>
            <input onFocus={focusOn} onBlur={focusOff} style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #e5e7eb', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6 }}>Email</label>
            <input type="email" onFocus={focusOn} onBlur={focusOff} style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #e5e7eb', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6 }}>Lời nhắn</label>
            <textarea rows="4" onFocus={focusOn} onBlur={focusOff} style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #e5e7eb', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
          </div>
          <button type="button" style={{ padding: '12px 16px', borderRadius: 10, background: '#0b0b16', color: '#fff' }}>Gửi liên hệ</button>
        </form>
      </div>
    </section>
  );
}

function ChanTrang() {
  return (
    <footer style={{ 
      borderTop: '1px solid #f1f5f9', 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)', 
      color: '#cbd5e1',
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
              <div style={{ fontWeight: 800, color: '#fff' }}>Gia Phả Việt</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: -2 }}>Kết nối thế hệ</div>
            </div>
          </div>
          <div style={{ marginBottom: 14, lineHeight: 1.6, color: '#cbd5e1' }}>Nền tảng quản lý gia phả hiện đại, giúp bạn lưu giữ và chia sẻ lịch sử gia đình một cách dễ dàng và an toàn.</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 10 }}>
            <input placeholder="Email của bạn" onFocus={(e) => { e.currentTarget.style.border = '1px solid #f59e0b'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.15)'; }} onBlur={(e) => { e.currentTarget.style.border = '1px solid #e5e7eb'; e.currentTarget.style.boxShadow = 'none'; }} style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid #e5e7eb', background: '#fff', outline: 'none', boxSizing: 'border-box' }} />
            <button style={{ padding: '10px 12px', borderRadius: 10, background: '#0b0b16', color: '#fff', whiteSpace: 'nowrap' }}>Đăng ký</button>
          </div>
        </div>
        <div>
          <div style={{ fontWeight: 700, color: '#fff', marginBottom: 10 }}>Liên kết</div>
          <div style={{ display: 'grid', gap: 10 }}>
            {['Tính năng', 'Bảng giá', 'Demo', 'Blog'].map((t, i) => (
              <a key={i} href="#" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color .2s ease' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#f59e0b'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#cbd5e1'; }}>{t}</a>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontWeight: 700, color: '#fff', marginBottom: 10 }}>Hỗ trợ</div>
          <div style={{ display: 'grid', gap: 10 }}>
            {['Trung tâm trợ giúp', 'Tài liệu', 'Liên hệ', 'Câu hỏi thường gặp'].map((t, i) => (
              <a key={i} href="#" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color .2s ease' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#f59e0b'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#cbd5e1'; }}>{t}</a>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontWeight: 700, color: '#fff', marginBottom: 10 }}>Liên hệ</div>
          <div style={{ display: 'grid', gap: 8, color: '#cbd5e1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><i className="bi-envelope-fill" style={{ color: '#f59e0b' }} /><span>support@giaphaviet.com</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><i className="bi-telephone-fill" style={{ color: '#f59e0b' }} /><span>1900 1234</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><i className="bi-geo-alt-fill" style={{ color: '#f59e0b' }} /><span>Hà Nội, Việt Nam</span></div>
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
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '18px 24px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: '#94a3b8' }}>
        <span>© {new Date().getFullYear()} Gia Phả TH. Bảo lưu mọi quyền.</span>
        <div style={{ display: 'flex', gap: 12 }}>
          {['Chính sách bảo mật', 'Điều khoản sử dụng', 'Chính sách Cookie'].map((t, i) => (
            <span key={i} style={{ transition: 'color .2s ease', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#f59e0b'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; }}>{t}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}

function TrangChu() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#fff' }}>
      <Header />
      <HeroCoDien />
      <TinhNang />
      <BangGia />
      <VeChungToi />
      <HuongDan />
      <LyDoChonChungToi />
      <LienHe />
      <ChanTrang />
    </div>
  );
}

export default TrangChu;


