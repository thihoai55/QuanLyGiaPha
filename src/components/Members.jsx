import React, { useMemo, useState } from 'react';
import AddMemberModal from './AddMemberModal';
import ViewMemberModal from './ViewMemberModal';
import EditMemberModal from './EditMemberModal';
import { membersData as initialMembers } from '../data/membersData';

export default function Members() {
  const [query, setQuery] = useState('');
  const [members, setMembers] = useState(() => initialMembers.slice());
  const [generation, setGeneration] = useState('all');
  const [gender, setGender] = useState('all');
  const [life, setLife] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [viewHistory, setViewHistory] = useState([]); // stack lưu lịch sử id đã xem

  const maxGeneration = useMemo(() => {
    return Math.max(...members.map(m => m.generation || 0), 0);
  }, [members]);

  const displayedMembers = useMemo(() => {
    let list = members.slice();
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(m => (m.name || '').toLowerCase().includes(q));
    }
    if (generation !== 'all') list = list.filter(m => String(m.generation) === String(generation));
    if (gender !== 'all') list = list.filter(m => m.gender === gender);
    if (life !== 'all') list = list.filter(m => (life === 'alive' ? !m.deathYear : !!m.deathYear));

    if (sortBy === 'name') list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    else if (sortBy === 'age') list.sort((a, b) => (b.age || 0) - (a.age || 0));
    else if (sortBy === 'generation') list.sort((a, b) => (a.generation || 0) - (b.generation || 0));

    return list;
  }, [query, generation, gender, life, sortBy, members]);

  const handleNavigateToId = (id) => {
    if (!id) return;
    const target = members.find(m => m.id === id);
    if (target) {
      if (selectedMember?.id && selectedMember.id !== target.id) {
        setViewHistory(prev => [...prev, selectedMember.id]);
      }
      setSelectedMember(target);
    }
  };

  const handleOpenView = (member) => {
    setViewHistory([]);
    setSelectedMember(member);
    setOpenView(true);
  };

  const handleBackInModal = () => {
    setViewHistory(prev => {
      if (!prev.length) return prev;
      const history = [...prev];
      const lastId = history.pop();
      const target = members.find(m => m.id === lastId);
      if (target) {
        setSelectedMember(target);
      }
      return history;
    });
  };

  // Style cho select có icon mũi tên và không viền đen
  const selectStyle = {
    background: '#f8fafc',
    border: '1px solid #fde68a',
    borderRadius: 12,
    padding: '10px 40px 10px 12px',
    cursor: 'pointer',
    appearance: 'none',
    outline: 'none',
    backgroundImage:
      "url('data:image/svg+xml;utf8,<svg fill=%22%236b7280%22 height=%2220%22 viewBox=%220 0 24 24%22 width=%2220%22 xmlns=%22http://www.w3.org/2000/svg%22><path d=%22M7 10l5 5 5-5z%22/></svg>')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    backgroundSize: '16px',
    transition: 'all 0.25s ease',
  };

  return (
    <div style={{ padding: '32px', background: '#fef3c7', minHeight: 'calc(100vh - 70px)' }}>
      {/* Hiệu ứng toàn trang */}
      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .stat-card {
          transition: all 0.3s ease;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.08);
        }
      

        button {
          transition: all 0.25s ease;
        }
        button:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }
        select:focus {
          border-color: #f59e0b !important;
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.25);
        }

        @keyframes bounceUpDown {
          0%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-10px);
          }
          50% {
            transform: translateY(-5px);
          }
          70% {
            transform: translateY(-8px);
          }
        }

        .member-card {
          transition: box-shadow 0.3s ease, filter 0.3s ease;
        }

        .member-card:hover {
          animation: bounceUpDown 1s ease infinite;

          box-shadow: 0 10px 24px rgba(0,0,0,0.14),
                      0 0 0 2px rgba(245,158,11,0.28);
          filter: saturate(1.02);
        }


      `}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#111827' }}>Danh sách thành viên</div>
          <div style={{ color: '#6b7280', fontSize: 13, marginTop: 4 }}>Quản lý tất cả thành viên trong gia phả</div>
        </div>
        <button onClick={() => setOpenAddModal(true)} style={{ background: '#f59e0b', color: '#fff', border: 'none', padding: '10px 14px', borderRadius: 10, fontWeight: 600, cursor: 'pointer' }}>+ Thêm thành viên</button>
      </div>

      {/* Thống kê */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
          marginBottom: 16,
        }}
      >
        {[
          {
            title: 'Tổng thành viên',
            value: members.length,
            icon: 'bi-people',
            bg: '#dbeafe',
            color: '#1d4ed8',
          },
          {
            title: 'Nam',
            value: members.filter(m => m.gender === 'male').length,
            icon: 'bi-gender-male',
            bg: '#dcfce7',
            color: '#16a34a',
          },
          {
            title: 'Nữ',
            value: members.filter(m => m.gender === 'female').length,
            icon: 'bi-gender-female',
            bg: '#fde2e4',
            color: '#db2777',
          },
          {
            title: 'Còn sống',
            value: members.filter(m => !m.deathYear).length,
            icon: 'bi-heart-pulse',
            bg: '#fef3c7',
            color: '#d97706',
          },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              background: '#fff',
              borderRadius: 14,
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 3px 8px rgba(0,0,0,0.05)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.08)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 3px 8px rgba(0,0,0,0.05)';
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ color: '#374151', fontSize: 15, fontWeight: 500 }}>{s.title}</div>
              <div style={{ fontWeight: 600, fontSize: 18, color: '#111827' }}>{s.value}</div>
            </div>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: s.bg,
                display: 'grid',
                placeItems: 'center',
                flexShrink: 0,
              }}
            >
              <i className={s.icon} style={{ color: s.color, fontSize: 24 }} />
            </div>
          </div>
        ))}
      </div>





      {/* Bộ lọc */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', background: '#fff', padding: 10, border: '1px solid #fde68a', borderRadius: 14 }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: '#f8fafc', border: '1px solid #fde68a', borderRadius: 12, padding: '10px 12px', minWidth: 420 }}>
          <i className="bi-search" style={{ color: '#6b7280' }} />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Tìm kiếm theo tên, email..." style={{ border: 'none', outline: 'none', width: '100%' }} />
        </div>

        <select value={generation} onChange={e => setGeneration(e.target.value)} style={selectStyle}>
          <option value="all">Tất cả đời</option>
          {Array.from({ length: maxGeneration }, (_, i) => i + 1).map(g => (
            <option key={g} value={g}>Đời {g}</option>
          ))}
        </select>

        <select value={gender} onChange={e => setGender(e.target.value)} style={selectStyle}>
          <option value="all">Tất cả</option>
          <option value="male">Nam</option>
          <option value="female">Nữ</option>
        </select>

        <select value={life} onChange={e => setLife(e.target.value)} style={selectStyle}>
          <option value="all">Tất cả</option>
          <option value="alive">Còn sống</option>
          <option value="dead">Đã mất</option>
        </select>

        <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={selectStyle}>
          <option value="name">Tên A-Z</option>
          <option value="age">Tuổi</option>
          <option value="generation">Thế hệ</option>
        </select>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button title="Lưới" style={{ width: 40, height: 40, borderRadius: 10, border: '1px solid #fde68a', background: '#fff', display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
            <i className="bi-grid-3x3-gap" />
          </button>
          <button title="Danh sách" style={{ width: 40, height: 40, borderRadius: 10, border: '1px solid #fde68a', background: '#fff', display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
            <i className="bi-list" />
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 25 }}>
        <div style={{ color: '#6b7280' }}>
          Hiển thị {displayedMembers.length} trên tổng {members.length} thành viên
        </div>
        <button
          style={{
            background: '#dcfce7', // nền xanh nhạt kiểu Excel
            border: '1px solid #bbf7d0',
            borderRadius: 10,
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            cursor: 'pointer',
            fontWeight: 600, // chữ đậm
            color: '#166534', // xanh đậm
            fontSize: 15,
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#bbf7d0';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = '#dcfce7';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <i
            className="bi bi-download"
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#166534',
              transition: 'transform 0.25s ease',
            }}
          />
          Xuất Excel
        </button>

      </div>

      {/* Danh sách thẻ thành viên */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, paddingTop: 8 }}>
        {displayedMembers.map((m, idx) => (
          <div
            key={m.id || idx}
            className="member-card"
            style={{
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: 16,
              overflow: 'hidden',
              minHeight: 420,
            }}
            
          >

            <div style={{ position: 'relative', height: 78, background: m.gender === 'male' ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' : 'linear-gradient(135deg, #ec4899, #db2777)' }}>
              <button title="Tùy chọn" style={{ position: 'absolute', top: 10, right: 10, width: 28, height: 28, borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer' }}>⋮</button>
              <div style={{ position: 'absolute', left: 16, bottom: -36, width: 72, height: 72, borderRadius: 999, background: '#fff', border: '6px solid #ffffff', display: 'grid', placeItems: 'center', fontSize: 32, boxShadow: '0 8px 18px rgba(0,0,0,0.12)', zIndex: 2 }}>
                {m.gender === 'male' ? '👤' : '👩'}
              </div>
            </div>

            <div style={{ padding: 16, paddingTop: 52 }}>
              <div style={{ marginTop: 16 }}>
                <div style={{ fontWeight: 800, fontSize: 16 }}>{m.name}</div>
                <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                  <span style={{ fontSize: 12, padding: '4px 10px', borderRadius: 999, background: '#fff', border: '1px solid #e5e7eb' }}>Đời {m.generation}</span>
                  <span style={{
                    fontSize: 12,
                    padding: '4px 10px',
                    borderRadius: 999,
                    background: m.deathYear ? '#f3f4f6' : '#16a34a1a',
                    color: m.deathYear ? '#111827' : '#166534',
                    border: `1px solid ${m.deathYear ? '#e5e7eb' : '#16a34a3d'}`
                  }}>
                    {m.deathYear ? 'Đã mất' : `${m.age || ''} tuổi`}
                  </span>
                </div>
              </div>

              <div style={{ display: 'grid', gap: 10, marginTop: 14, color: '#374151', fontSize: 14 }}>
                {m.birthDate && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <i className="bi-calendar-event" style={{ color: '#64748b' }} />
                    <span>{m.birthDate}</span>
                  </div>
                )}
                {m.address && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <i className="bi-geo" style={{ color: '#64748b' }} />
                    <span>{m.address}</span>
                  </div>
                )}
                {m.job && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <i className="bi-briefcase" style={{ color: '#64748b' }} />
                    <span>{m.job}</span>
                  </div>
                )}
                {m.phone && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <i className="bi-telephone" style={{ color: '#64748b' }} />
                    <span>{m.phone}</span>
                  </div>
                )}
              </div>

              <div style={{ height: 1, background: '#e5e7eb', margin: '16px 0' }} />

              <div style={{ display: 'flex', gap: 12 }}>
                <button onClick={() => handleOpenView(m)} style={{ flex: 1, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '10px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <i className="bi-eye" /> Xem
                </button>
                <button onClick={() => { setSelectedMember(m); setOpenEdit(true); }} style={{ flex: 1, background: '#f97316', border: '1px solid #fb923c', color: '#fff', borderRadius: 12, padding: '10px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <i className="bi-pencil" /> Sửa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ViewMemberModal
        open={openView}
        onClose={() => setOpenView(false)}
        member={selectedMember}
        onNavigateToId={handleNavigateToId}
        canGoBack={viewHistory.length > 0}
        onBack={handleBackInModal}
      />
      <EditMemberModal open={openEdit} onClose={() => setOpenEdit(false)} member={selectedMember} onSubmit={(updated) => {
        setMembers(prev => prev.map(m => (m.id && updated.id ? m.id === updated.id : m.name === selectedMember?.name) ? { ...m, ...updated } : m));
      }} />
      <AddMemberModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onSubmit={() => setOpenAddModal(false)}
      />
    </div>
  );
}
