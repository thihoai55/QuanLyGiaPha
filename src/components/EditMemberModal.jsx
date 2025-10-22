import React, { useEffect, useMemo, useState } from 'react';

function toInputDate(dateStr) {
  if (!dateStr) return '';
  // Accept MM/DD/YYYY, DD/MM/YYYY, YYYY-MM-DD, YYYY/MM/DD, or just YYYY
  const mmdd = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/; // supports both MM/DD and DD/MM
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/;
  const ymdSlashes = /^(\d{4})\/(\d{1,2})\/(\d{1,2})$/;
  const yearOnly = /^(\d{4})$/;
  if (mmdd.test(dateStr)) {
    let [, part1, part2, yyyy] = dateStr.match(mmdd);
    // If first part > 12, interpret as DD/MM
    let mm = Number(part1) > 12 ? part2 : part1;
    let dd = Number(part1) > 12 ? part1 : part2;
    return `${yyyy}-${String(mm).padStart(2,'0')}-${String(dd).padStart(2,'0')}`;
  }
  if (iso.test(dateStr)) return dateStr;
  if (ymdSlashes.test(dateStr)) {
    const [, yyyy, mm, dd] = dateStr.match(ymdSlashes);
    return `${yyyy}-${String(mm).padStart(2,'0')}-${String(dd).padStart(2,'0')}`;
  }
  if (yearOnly.test(String(dateStr))) {
    const [, yyyy] = String(dateStr).match(yearOnly);
    // fallback to Jan 1st for HTML date input; we'll display-only year on submit
    return `${yyyy}-01-01`;
  }
  // Try to extract any 4-digit year from the string
  const yearFound = String(dateStr).match(/(\d{4})/);
  if (yearFound) {
    return `${yearFound[1]}-01-01`;
  }
  return '';
}

function toDisplayDate(inputDate) {
  if (!inputDate) return '';
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/;
  if (iso.test(inputDate)) {
    const [, yyyy, mm, dd] = inputDate.match(iso);
    // If we stored only year (converted to yyyy-01-01), return just yyyy for nicer display
    if (mm === '01' && dd === '01') return `${yyyy}`;
    return `${mm}/${dd}/${yyyy}`;
  }
  return inputDate;
}

export default function EditMemberModal({ open, onClose, member, onSubmit }) {
  const [activeTab, setActiveTab] = useState('basic');
  const [isDeceased, setIsDeceased] = useState(!!member?.deathYear);
  const [basic, setBasic] = useState({
    lastMiddleName: '',
    firstName: '',
    gender: '',
    generation: '',
    birthDate: '',
    birthYearOnly: false,
    birthYear: '',
    birthPlace: '',
    job: '',
    education: ''
  });
  const [relations, setRelations] = useState({ parent: '', spouse: '' });
  const [deathDate, setDeathDate] = useState('');

  useEffect(() => {
    if (!open || !member) return;
    setActiveTab('basic');
    const nameParts = (member.name || '').trim().split(/\s+/);
    const rawBirth = member.birthDate || '';
    const yearOnlyMatch = String(rawBirth).match(/^(\d{4})$/);
    setBasic({
      lastMiddleName: nameParts.slice(0, -1).join(' '),
      firstName: nameParts.slice(-1).join(' '),
      gender: member.gender || '',
      generation: member.generation ? String(member.generation) : '',
      birthDate: yearOnlyMatch ? '' : toInputDate(rawBirth),
      birthYearOnly: !!yearOnlyMatch,
      birthYear: yearOnlyMatch ? yearOnlyMatch[1] : '',
      birthPlace: member.address || '',
      job: member.job || '',
      education: member.education || ''
    });
    setIsDeceased(!!member.deathYear);
    setRelations({ parent: member.parentName || '', spouse: member.spouseName || '' });
    setDeathDate(member.deathYear ? `${member.deathYear}-01-01` : '');
  }, [open, member]);

  const stop = (e) => e.stopPropagation();

  if (!open || !member) return null;

  const handleSubmit = () => {
    const birthDisplay = basic.birthYearOnly && basic.birthYear
      ? String(basic.birthYear)
      : toDisplayDate(basic.birthDate);
    const updated = {
      ...member,
      name: [basic.lastMiddleName, basic.firstName].filter(Boolean).join(' '),
      gender: basic.gender,
      generation: basic.generation ? Number(basic.generation) : undefined,
      birthDate: birthDisplay,
      address: basic.birthPlace,
      job: basic.job,
      education: basic.education,
      deathYear: isDeceased && deathDate ? Number((deathDate || '').slice(0, 4)) : undefined,
      parentName: relations.parent,
      spouseName: relations.spouse,
    };
    onSubmit?.(updated);
    onClose?.();
  };

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(17,24,39,0.5)', backdropFilter: 'blur(2px)', display: 'grid', placeItems: 'center', zIndex: 1000 }}>
      <div onClick={stop} style={{ width: 600, maxWidth: '90vw', maxHeight: '86vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.25)', border: '1px solid #e5e7eb', animation: 'modalIn 0.2s ease-out' }}>
        <style>{`
          @keyframes modalIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
          .tab-btn { background:#fff; border:1px solid #e5e7eb; padding:10px 16px; border-radius:12px; cursor:pointer; display:flex; align-items:center; gap:8px; color:#374151; font-weight:600 }
          .tab-btn.active { border-color:#f59e0b; box-shadow:0 0 0 3px rgba(245,158,11,.15); color:#111827 }
          .field { background:#fff; border:1px solid #f59e0b; border-radius:12px; padding:10px 12px; display:flex; align-items:center; gap:8px }
          .field input, .field select, .field textarea { border:none; outline:none; width:100%; background:transparent }
          .field i { color:#f59e0b }
          .label { font-size:13px; color:#6b7280; margin-bottom:6px; font-weight:600 }
          .pill-toggle { display:flex; gap:12px }
          .pill { flex:1; display:flex; align-items:center; justify-content:center; padding:10px 12px; border-radius:10px; border:1px solid #e5e7eb; cursor:pointer; font-weight:600 }
          .pill.active.green { background:#22c55e1a; color:#166534; border-color:#86efac }
          .pill.active.gray { background:#f3f4f6; color:#111827; border-color:#e5e7eb }
          .card { background:#fff7ed; border:1px solid #fde68a; border-radius:12px; padding:14px }
          .rel-row { display:flex; align-items:center; justify-content:space-between; padding:8px 10px; border-radius:10px; background:#fff; border:1px solid #f3f4f6 }
          .rel-label { display:flex; align-items:center; gap:8px; color:#374151; font-weight:600 }
          .rel-badge { padding:6px 10px; border-radius:999px; font-weight:600; font-size:12px; border:1px solid #e5e7eb; color:#6b7280; background:#fff }
          .textarea { width:100%; min-height:88px; resize:vertical; border:none; outline:none; background:transparent }
        `}</style>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 20, borderBottom: '1px solid #f3f4f6' }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: '#fef3c7', display: 'grid', placeItems: 'center' }}>
            <i className="bi-pencil-square" style={{ color: '#f59e0b', fontSize: 22 }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#111827' }}>Sửa thông tin thành viên</div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>Chỉnh sửa và lưu lại thông tin</div>
          </div>
          <button onClick={onClose} title="Đóng" style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer' }}>✕</button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 10, padding: '12px 20px' }}>
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
        <div style={{ padding: '0 20px 20px', overflow: 'auto' }}>
          {activeTab === 'basic' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <div className="label">Họ và tên đệm *</div>
                <div className="field"><i className="bi-person" /><input placeholder="Nguyễn Văn" value={basic.lastMiddleName} onChange={e => setBasic(prev => ({ ...prev, lastMiddleName: e.target.value }))} /></div>
              </div>
              <div>
                <div className="label">Tên *</div>
                <div className="field"><i className="bi-type" /><input placeholder="An" value={basic.firstName} onChange={e => setBasic(prev => ({ ...prev, firstName: e.target.value }))} /></div>
              </div>
              <div>
                <div className="label">Giới tính *</div>
                <div className="field"><i className="bi-gender-ambiguous" /><select value={basic.gender} onChange={e => setBasic(prev => ({ ...prev, gender: e.target.value }))}><option value="" disabled>Chọn giới tính</option><option value="male">Nam</option><option value="female">Nữ</option></select></div>
              </div>
              <div>
                <div className="label">Thế hệ *</div>
                <div className="field"><i className="bi-diagram-3" /><select value={basic.generation} onChange={e => setBasic(prev => ({ ...prev, generation: e.target.value }))}><option value="" disabled>Chọn đời</option>{Array.from({ length: 20 }, (_, i) => i + 1).map(g => (<option key={g} value={g}>Đời {g}</option>))}</select></div>
              </div>
              <div>
                <div className="label">Ngày sinh</div>
                {basic.birthYearOnly ? (
                  <div className="field"><i className="bi-calendar-event" /><input type="text" placeholder="YYYY" value={basic.birthYear} onChange={e => setBasic(prev => ({ ...prev, birthYear: e.target.value.replace(/[^\d]/g,'').slice(0,4) }))} /></div>
                ) : (
                  <div className="field"><i className="bi-calendar-event" /><input type="date" value={basic.birthDate} onChange={e => setBasic(prev => ({ ...prev, birthDate: e.target.value }))} /></div>
                )}
                <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input id="yearOnly" type="checkbox" checked={basic.birthYearOnly} onChange={e => setBasic(prev => ({ ...prev, birthYearOnly: e.target.checked }))} />
                  <label htmlFor="yearOnly" style={{ fontSize: 12, color: '#6b7280' }}>Chỉ biết năm sinh</label>
                </div>
              </div>
              <div>
                <div className="label">Nơi sinh</div>
                <div className="field"><i className="bi-geo" /><input placeholder="Hà Nội" value={basic.birthPlace} onChange={e => setBasic(prev => ({ ...prev, birthPlace: e.target.value }))} /></div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <div className="label">Trạng thái</div>
                <div className="pill-toggle">
                  <button type="button" onClick={() => setIsDeceased(false)} className={`pill ${!isDeceased ? 'active green' : ''}`}><i className="bi-heart" style={{ color:'#16a34a' }} /> Còn sống</button>
                  <button type="button" onClick={() => setIsDeceased(true)} className={`pill ${isDeceased ? 'active gray' : ''}`}><i className="bi-emoji-dizzy" style={{ color:'#6b7280' }} /> Đã mất</button>
                </div>
              </div>
              {isDeceased && (
                <div style={{ gridColumn: '1 / -1' }}>
                  <div className="label">Ngày mất</div>
                  <div className="field"><i className="bi-calendar2-x" /><input type="date" value={deathDate} onChange={e => setDeathDate(e.target.value)} /></div>
                </div>
              )}
              <div>
                <div className="label">Nghề nghiệp</div>
                <div className="field"><i className="bi-briefcase" /><input placeholder="Kỹ sư, bác sĩ, v.v." value={basic.job} onChange={e => setBasic(prev => ({ ...prev, job: e.target.value }))} /></div>
              </div>
              <div>
                <div className="label">Học vấn</div>
                <div className="field"><i className="bi-mortarboard" /><select value={basic.education} onChange={e => setBasic(prev => ({ ...prev, education: e.target.value }))}><option value="" disabled>Chọn trình độ</option><option>Tiểu học</option><option>Trung học</option><option>Cao đẳng</option><option>Đại học</option><option>Thạc sĩ</option><option>Tiến sĩ</option></select></div>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
              <div>
                <div className="label">Số điện thoại</div>
                <div className="field"><i className="bi-telephone" /><input placeholder="0912345678" defaultValue={member.phone || ''} /></div>
              </div>
              <div>
                <div className="label">Email</div>
                <div className="field"><i className="bi-envelope" /><input placeholder="example@email.com" defaultValue={member.email || ''} /></div>
              </div>
              <div>
                <div className="label">Địa chỉ hiện tại</div>
                <div className="field" style={{ alignItems:'flex-start' }}>
                  <i className="bi-geo-alt" />
                  <textarea className="textarea" placeholder="Số nhà, đường, phường/xã, quận/huyện, thành phố" defaultValue={member.address || ''} />
                </div>
              </div>
              <div>
                <div className="label">Ghi chú</div>
                <div className="field" style={{ alignItems:'flex-start' }}>
                  <i className="bi-journal-text" />
                  <textarea className="textarea" placeholder="Thông tin bổ sung về thành viên..." defaultValue={member.note || ''} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'family' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
              <div>
                <div className="label">Cha/Mẹ</div>
                <div className="field" style={{ justifyContent: 'space-between' }}>
                  <input placeholder="Chọn cha hoặc mẹ" defaultValue={member.parentName || ''} />
                  <i className="bi-caret-down" style={{ color: '#9ca3af' }} />
                </div>
              </div>
              <div>
                <div className="label">Vợ/Chồng</div>
                <div className="field" style={{ justifyContent: 'space-between' }}>
                  <input placeholder="Chọn vợ hoặc chồng" defaultValue={member.spouseName || ''} />
                  <i className="bi-caret-down" style={{ color: '#9ca3af' }} />
                </div>
              </div>

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
                    <div className="rel-badge">{basic.generation ? `Đời ${basic.generation}` : 'Chưa chọn'}</div>
                  </div>
                  <div className="rel-row">
                    <div className="rel-label"><i className="bi-person" style={{ color: '#f59e0b' }} /> Cha/Mẹ</div>
                    <div className="rel-badge">{relations.parent || member.parentName || 'Chưa chọn'}</div>
                  </div>
                  <div className="rel-row">
                    <div className="rel-label"><i className="bi-heart" style={{ color: '#f59e0b' }} /> Vợ/Chồng</div>
                    <div className="rel-badge">{relations.spouse || member.spouseName || 'Chưa chọn'}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, padding: 16, borderTop: '1px solid #f3f4f6' }}>
          <button onClick={onClose} style={{ background: '#fff', border: '1px solid #e5e7eb', color: '#111827', padding: '10px 16px', borderRadius: 10, cursor: 'pointer', fontWeight: 600 }}>Hủy</button>
          <button onClick={handleSubmit} style={{ background: '#f59e0b', border: '1px solid #f59e0b', color: '#fff', padding: '10px 16px', borderRadius: 10, cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
            <i className="bi-save" /> Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
}


