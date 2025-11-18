import React, { useState } from 'react';

export default function ViewMemberModal({ open, onClose, member, onNavigateToId, canGoBack, onBack }) {
  const [activeTab, setActiveTab] = useState('basic');
  if (!open || !member) return null;

  const stop = (e) => e.stopPropagation();

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(17,24,39,0.5)', backdropFilter: 'blur(2px)', display: 'grid', placeItems: 'center', zIndex: 1000 }}>
      <div onClick={stop} style={{ width: 600, maxWidth: '90vw', maxHeight: '86vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>
        <style>{`
          .tab-btn { background:#fff; border:1px solid #e5e7eb; padding:10px 16px; border-radius:12px; cursor:pointer; display:flex; align-items:center; gap:8px; color:#374151; font-weight:600 }
          .tab-btn.active { border-color:#f59e0b; box-shadow:0 0 0 3px rgba(245,158,11,.15); color:#111827 }
          .field { background:#fff; border:1px solid #fde68a; border-radius:12px; padding:10px 12px; display:flex; align-items:center; gap:8px }
          .field input, .field select, .field textarea { border:none; outline:none; width:100%; background:transparent }
          .field i { color:#f59e0b }
          .label { font-size:13px; color:#6b7280; margin-bottom:6px; font-weight:600 }
          .badge { padding:6px 10px; border-radius:999px; border:1px solid #e5e7eb; background:#fff; font-weight:700; font-size:12px }
          .card { background:#fff7ed; border:1px solid #fde68a; border-radius:12px; padding:14px }
          .rel-row { display:flex; align-items:center; justify-content:space-between; padding:8px 10px; border-radius:10px; background:#fff; border:1px solid #f3f4f6 }
          .rel-label { display:flex; align-items:center; gap:8px; color:#374151; font-weight:600 }
          .rel-badge { padding:6px 10px; border-radius:999px; font-weight:600; font-size:12px; border:1px solid #e5e7eb; color:#6b7280; background:#fff }
          .rel-badge.filled { color:#111827; border-color:#d1d5db }
          .textarea { width:100%; min-height:88px; resize:vertical; border:none; outline:none; background:transparent }
        `}</style>

        {/* Header */}
        <div style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #f3f4f6' }}>
          {canGoBack && (
            <button
              onClick={e => { e.stopPropagation(); onBack && onBack(); }}
              title="Quay lại"
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                border: '1px solid #e5e7eb',
                background: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <i className="bi bi-arrow-left" />
            </button>
          )}
          <div style={{ width: 40, height: 40, borderRadius: 999, background: '#fff', border: '6px solid #fef3c7', display: 'grid', placeItems: 'center', fontSize: 22 }}>
            {member.gender === 'male' ? '👤' : '👩'}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{member.name}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
              <span className="badge">Đời {member.generation || '—'}</span>
              <span className="badge" style={{ color: member.deathYear ? '#111827' : '#166534', background: member.deathYear ? '#f3f4f6' : '#dcfce7', borderColor: member.deathYear ? '#e5e7eb' : '#bbf7d0' }}>
                {member.deathYear ? 'Đã mất' : 'Còn sống'}
              </span>
            </div>
          </div>
          <button onClick={onClose} title="Đóng" style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer' }}>✕</button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 10, padding: '12px 18px' }}>
          <button onClick={() => setActiveTab('basic')} className={`tab-btn ${activeTab === 'basic' ? 'active' : ''}`}>
            <i className="bi-person" /> Cơ bản
          </button>
          <button onClick={() => setActiveTab('contact')} className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}>
            <i className="bi-telephone" /> Liên hệ
          </button>
          <button onClick={() => setActiveTab('family')} className={`tab-btn ${activeTab === 'family' ? 'active' : ''}`}>
            <i className="bi-people" /> Gia đình
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '0 18px 18px', overflow: 'auto' }}>
          {activeTab === 'basic' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <div className="label">Họ và tên đệm *</div>
                <div className="field"><i className="bi-person" /><input value={(member.name || '').split(' ').slice(0, -1).join(' ')} disabled /></div>
              </div>
              <div>
                <div className="label">Tên *</div>
                <div className="field"><i className="bi-type" /><input value={(member.name || '').split(' ').slice(-1).join(' ')} disabled /></div>
              </div>
              <div>
                <div className="label">Giới tính *</div>
                <div className="field"><i className="bi-gender-ambiguous" /><input value={member.gender === 'male' ? 'Nam' : 'Nữ'} disabled /></div>
              </div>
              <div>
                <div className="label">Thế hệ *</div>
                <div className="field"><i className="bi-diagram-3" /><input value={`Đời ${member.generation || ''}`} disabled /></div>
              </div>
              <div>
                <div className="label">Ngày sinh</div>
                <div className="field"><i className="bi-calendar-event" /><input value={member.birthDate || ''} disabled /></div>
              </div>
              <div>
                <div className="label">Nơi sinh</div>
                <div className="field"><i className="bi-geo" /><input value={member.address || ''} disabled /></div>
              </div>
              <div>
                <div className="label">Nghề nghiệp</div>
                <div className="field"><i className="bi-briefcase" /><input value={member.job || ''} disabled /></div>
              </div>
              <div>
                <div className="label">Học vấn</div>
                <div className="field"><i className="bi-mortarboard" /><input value={member.education || ''} disabled /></div>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
              <div>
                <div className="label">Số điện thoại</div>
                <div className="field"><i className="bi-telephone" /><input value={member.phone || ''} disabled /></div>
              </div>
              <div>
                <div className="label">Email</div>
                <div className="field"><i className="bi-envelope" /><input value={member.email || ''} disabled /></div>
              </div>
              <div>
                <div className="label">Địa chỉ hiện tại</div>
                <div className="field" style={{ alignItems:'flex-start' }}>
                  <i className="bi-geo-alt" />
                  <textarea className="textarea" value={member.address || ''} disabled />
                </div>
              </div>
              <div>
                <div className="label">Ghi chú</div>
                <div className="field" style={{ alignItems:'flex-start' }}>
                  <i className="bi-journal-text" />
                  <textarea className="textarea" value={member.note || ''} disabled />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'family' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
              <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: '#fef3c7', display: 'grid', placeItems: 'center' }}>
                    <i className="bi-people" style={{ color: '#f59e0b' }} />
                  </div>
                  <div style={{ fontWeight: 700, color: '#111827' }}>Quan hệ gia đình</div>
                </div>
                <div style={{ display: 'grid', gap: 8 }}>
                  <div className="rel-row">
                    <div className="rel-label"><i className="bi-diagram-3" style={{ color: '#f59e0b' }} /> Thế hệ</div>
                    <div className="rel-badge filled">{member.generation ? `Đời ${member.generation}` : 'Chưa chọn'}</div>
                  </div>
                  <div className="rel-row">
                    <div className="rel-label"><i className="bi-person" style={{ color: '#f59e0b' }} /> Cha/Mẹ</div>
                    <div
                      className="rel-badge"
                      style={{ cursor: member.parentIds && member.parentIds.length ? 'pointer' : 'default' }}
                      onClick={() => {
                        if (!onNavigateToId || !member.parentIds || !member.parentIds.length) return;
                        onNavigateToId(member.parentIds[0]);
                      }}
                    >
                      {member.parentName || 'Chưa chọn'}
                    </div>
                  </div>
                  <div className="rel-row">
                    <div className="rel-label"><i className="bi-heart" style={{ color: '#f59e0b' }} /> Vợ/Chồng</div>
                    <div
                      className="rel-badge"
                      style={{ cursor: member.spouseId ? 'pointer' : 'default' }}
                      onClick={() => {
                        if (!onNavigateToId || !member.spouseId) return;
                        onNavigateToId(member.spouseId);
                      }}
                    >
                      {member.spouseName || 'Chưa chọn'}
                    </div>
                  </div>
                  <div className="rel-row">
                    <div className="rel-label"><i className="bi-people" style={{ color: '#f59e0b' }} /> Anh/Chị/Em</div>
                    <div
                      className="rel-badge"
                      style={{ cursor: member.siblingIds && member.siblingIds.length ? 'pointer' : 'default' }}
                      onClick={() => {
                        if (!onNavigateToId || !member.siblingIds || !member.siblingIds.length) return;
                        onNavigateToId(member.siblingIds[0]);
                      }}
                    >
                      {member.siblingNames || 'Chưa có'}
                    </div>
                  </div>
                  <div className="rel-row">
                    <div className="rel-label"><i className="bi-people" style={{ color: '#f59e0b' }} /> Con cái</div>
                    <div
                      className="rel-badge"
                      style={{ cursor: member.childrenIds && member.childrenIds.length ? 'pointer' : 'default' }}
                      onClick={() => {
                        if (!onNavigateToId || !member.childrenIds || !member.childrenIds.length) return;
                        onNavigateToId(member.childrenIds[0]);
                      }}
                    >
                      {member.childrenNames || 'Chưa có'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, padding: 14, borderTop: '1px solid #f3f4f6' }}>
          <button onClick={onClose} style={{ background: '#fff', border: '1px solid #e5e7eb', color: '#111827', padding: '10px 16px', borderRadius: 10, cursor: 'pointer', fontWeight: 600 }}>Đóng</button>
        </div>
      </div>
    </div>
  );
}


