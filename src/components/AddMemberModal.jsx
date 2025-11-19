import React, { useEffect, useMemo, useState } from 'react';
import { familyMembersData } from '../data/familyMembersData';

export default function AddMemberModal({ open, onClose, onSubmit }) {
    const [activeTab, setActiveTab] = useState('basic');
    const [isDeceased, setIsDeceased] = useState(false);
    // Basic tab controlled state needed for Family tab reflection
    const [basic, setBasic] = useState({
        lastMiddleName: '',
        firstName: '',
        gender: '',
        generation: '',
        birthDate: '',
        birthPlace: '',
        job: '',
        education: ''
    });
    const [relations, setRelations] = useState({ parent: '', spouse: '' });
    const [relationIds, setRelationIds] = useState({ parentId: null, spouseId: null });

    useEffect(() => {
        if (open) {
            setActiveTab('basic');
            setBasic({
                lastMiddleName: '',
                firstName: '',
                gender: '',
                generation: '',
                birthDate: '',
                birthPlace: '',
                job: '',
                education: ''
            });
            setRelations({ parent: '', spouse: '' });
            setRelationIds({ parentId: null, spouseId: null });
            setIsDeceased(false);
        }
    }, [open]);

    const stop = (e) => e.stopPropagation();

    const parentSuggestions = useMemo(() => {
        const q = relations.parent.trim().toLowerCase();
        if (!q) return [];
        return familyMembersData.filter(m => (m.name || '').toLowerCase().includes(q)).slice(0, 10);
    }, [relations.parent]);

    const spouseSuggestions = useMemo(() => {
        const q = relations.spouse.trim().toLowerCase();
        if (!q) return [];
        return familyMembersData
            .filter(m => (m.name || '').toLowerCase().includes(q))
            .filter(m => {
                if (!basic.gender) return true;
                if (basic.gender === 'male') return m.gender === 'female';
                if (basic.gender === 'female') return m.gender === 'male';
                return true;
            })
            .slice(0, 10);
    }, [relations.spouse, basic.gender]);

    const resolveRelationsIds = () => {
        let parentId = null;
        let spouseId = null;

        if (relations.parent.trim()) {
            const parent = familyMembersData.find(m => m.name === relations.parent.trim());
            parentId = parent ? parent.id : null;
        }

        if (relations.spouse.trim()) {
            const spouse = familyMembersData.find(m => m.name === relations.spouse.trim());
            spouseId = spouse ? spouse.id : null;
        }

        setRelationIds({ parentId, spouseId });
        return { parentId, spouseId };
    };

    const buildNewMember = () => {
        const { parentId, spouseId } = resolveRelationsIds();

        const fullName = `${basic.lastMiddleName} ${basic.firstName}`.trim();
        const birthYear = basic.birthDate ? new Date(basic.birthDate).getFullYear() : undefined;
        const currentYear = new Date().getFullYear();
        const age = birthYear && birthYear <= currentYear ? currentYear - birthYear : undefined;

        const newMember = {
            id: `dyn-${Date.now()}`,
            name: fullName,
            gender: basic.gender || '',
            generation: basic.generation ? Number(basic.generation) : undefined,
            birthYear: birthYear,
            birthDate: basic.birthDate || '',
            address: basic.birthPlace || '',
            job: basic.job || '',
            phone: '',
            email: '',
            age: age,
            marriageStatus: spouseId ? 'married' : 'single',
            spouse: null,
            children: [],
            parents: parentId ? [parentId] : [],
            siblings: [],
            notes: '',
        };

        if (!newMember.name || !newMember.gender || !newMember.generation) {
            return null;
        }

        return newMember;
    };

    const handleSubmit = () => {
        const newMember = buildNewMember();
        if (!newMember) return;
        if (typeof onSubmit === 'function') {
            onSubmit(newMember);
        }
    };

    if (!open) return null;

    return (
        <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(17,24,39,0.5)', backdropFilter: 'blur(2px)', display: 'grid', placeItems: 'center', zIndex: 1000 }}>
            <div onClick={stop} style={{ width: 600, maxWidth: '90vw', maxHeight: '86vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.25)', border: '1px solid #e5e7eb', animation: 'modalIn 0.2s ease-out' }}>
                <style>{`
          @keyframes modalIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
          .tab-btn { background:#fff; border:1px solid #e5e7eb; padding:10px 16px; border-radius:12px; cursor:pointer; display:flex; align-items:center; gap:8px; color:#374151; font-weight:600 }
          .tab-btn.active { border-color:#f59e0b; box-shadow:0 0 0 3px rgba(245,158,11,.15); color:#111827 }
          .field { background:#fff; border:1px solid #f59e0b; border-radius:12px; padding:10px 12px; display:flex; align-items:center; gap:8px }
          .field input, .field select { border:none; outline:none; width:100%; background:transparent }
          .label { font-size:13px; color:#6b7280; margin-bottom:6px; font-weight:600 }
          .pill-toggle { display:flex; gap:12px }
          .pill { flex:1; display:flex; align-items:center; justify-content:center; padding:10px 12px; border-radius:10px; border:1px solid #e5e7eb; cursor:pointer; font-weight:600 }
          .pill.active.green { background:#22c55e1a; color:#166534; border-color:#86efac }
          .pill.active.gray { background:#f3f4f6; color:#111827; border-color:#e5e7eb }
          .field:focus-within { border-color:#f59e0b; box-shadow:0 0 0 3px rgba(245,158,11,.15); }
          .field i { color:#f59e0b }
          .card { background:#fff7ed; border:1px solid #fde68a; border-radius:12px; padding:14px }
          .rel-row { display:flex; align-items:center; justify-content:space-between; padding:8px 10px; border-radius:10px; background:#fff; border:1px solid #f3f4f6 }
          .rel-label { display:flex; align-items:center; gap:8px; color:#374151; font-weight:600 }
          .rel-badge { padding:6px 10px; border-radius:999px; font-weight:600; font-size:12px; border:1px solid #e5e7eb; color:#6b7280; background:#fff }
          .rel-badge.filled { color:#111827; border-color:#d1d5db }
          .textarea { width:100%; min-height:88px; resize:vertical; border:none; outline:none; background:transparent }
        `}</style>

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 20, borderBottom: '1px solid #f3f4f6' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: '#fef3c7', display: 'grid', placeItems: 'center' }}>
                        <i className="bi-person-plus" style={{ color: '#f59e0b' , fontSize: 25}} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 20, fontWeight: 700, color: '#111827' }}>Thêm thành viên mới</div>
                        <div style={{ fontSize: 12, color: '#6b7280' }}>Điền đầy đủ thông tin để thêm thành viên vào gia phả</div>
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

                {/* Body (scrollable) */}
                <div style={{ padding: '0 20px 20px', overflow: 'auto' }}>
                    {activeTab === 'basic' && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            {/* Họ và tên đệm */}
                            <div>
                                <div className="label">Họ và tên đệm *</div>
                                <div className="field"><i className="bi-person" /><input placeholder="Nguyễn Văn" value={basic.lastMiddleName} onChange={e => setBasic(prev => ({ ...prev, lastMiddleName: e.target.value }))} /></div>
                            </div>
                            {/* Tên */}
                            <div>
                                <div className="label">Tên *</div>
                                <div className="field"><i className="bi-type" /><input placeholder="An" value={basic.firstName} onChange={e => setBasic(prev => ({ ...prev, firstName: e.target.value }))} /></div>
                            </div>
                            {/* Giới tính */}
                            <div>
                                <div className="label">Giới tính *</div>
                                <div className="field"><i className="bi-gender-ambiguous" /><select value={basic.gender} onChange={e => setBasic(prev => ({ ...prev, gender: e.target.value }))}><option value="" disabled>Chọn giới tính</option><option value="male">Nam</option><option value="female">Nữ</option></select></div>
                            </div>
                            {/* Thế hệ */}
                            <div>
                                <div className="label">Thế hệ *</div>
                                <div className="field"><i className="bi-diagram-3" /><select value={basic.generation} onChange={e => setBasic(prev => ({ ...prev, generation: e.target.value }))}><option value="" disabled>Chọn đời</option>{Array.from({ length: 20 }, (_, i) => i + 1).map(g => (<option key={g} value={g}>Đời {g}</option>))}</select></div>
                            </div>
                            {/* Ngày sinh */}
                            <div>
                                <div className="label">Ngày sinh</div>
                                <div className="field"><input type="date" placeholder="mm/dd/yyyy" value={basic.birthDate} onChange={e => setBasic(prev => ({ ...prev, birthDate: e.target.value }))} /></div>
                            </div>
                            {/* Nơi sinh */}
                            <div>
                                <div className="label">Nơi sinh</div>
                                <div className="field"><i className="bi-geo" /><input placeholder="Hà Nội" value={basic.birthPlace} onChange={e => setBasic(prev => ({ ...prev, birthPlace: e.target.value }))} /></div>
                            </div>
                            {/* Trạng thái */}
                            <div style={{ gridColumn: '1 / -1' }}>
                                <div className="label">Trạng thái</div>
                                <div className="pill-toggle">
                                    <button type="button" onClick={() => setIsDeceased(false)} className={`pill ${!isDeceased ? 'active green' : ''}`}><i className="bi-heart" style={{ color: '#16a34a', marginRight: 8 }} /> Còn sống</button>
                                    <button type="button" onClick={() => setIsDeceased(true)} className={`pill ${isDeceased ? 'active gray' : ''}`}><i className="bi-emoji-dizzy" style={{ color: '#6b7280', marginRight: 8 }} /> Đã mất</button>
                                </div>
                            </div>
                            {/* Ngày mất (ẩn/hiện khi chọn Đã mất) */}
                            {isDeceased && (
                                <div style={{ gridColumn: '1 / -1' }}>
                                    <div className="label">Ngày mất</div>
                                    <div className="field"><input type="date" /></div>
                                </div>
                            )}
                            {/* Nghề nghiệp */}
                            <div>
                                <div className="label">Nghề nghiệp</div>
                                <div className="field"><i className="bi-briefcase" /><input placeholder="Kỹ sư, bác sĩ, v.v." value={basic.job} onChange={e => setBasic(prev => ({ ...prev, job: e.target.value }))} /></div>
                            </div>
                            {/* Học vấn */}
                            <div>
                                <div className="label">Học vấn</div>
                                <div className="field"><i className="bi-mortarboard" /><select value={basic.education} onChange={e => setBasic(prev => ({ ...prev, education: e.target.value }))}><option value="" disabled>
                                    Chọn trình độ</option><option>Tiểu học</option><option>Trung học</option><option>Cao đẳng</option><option>Đại học</option><option>Thạc sĩ</option><option>Tiến sĩ</option></select></div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'contact' && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
                            <div>
                                <div className="label">Số điện thoại</div>
                                <div className="field"><i className="bi-telephone" style={{ color: '#f59e0b' }} /><input placeholder="0912345678" /></div>
                            </div>
                            <div>
                                <div className="label">Email</div>
                                <div className="field"><i className="bi-envelope" style={{ color: '#f59e0b' }} /><input placeholder="nguyenthihoai@gmail.com" /></div>
                            </div>
                            <div>
                                <div className="label">Địa chỉ hiện tại</div>
                                <div className="field" style={{ alignItems: 'flex-start' }}>
                                    <i className="bi-geo-alt" style={{ color: '#f59e0b', marginTop: 0 }} />
                                    <textarea className="textarea" placeholder="Số nhà, đường, phường/xã, quận/huyện, thành phố" />
                                </div>
                            </div>
                            <div>
                                <div className="label">Ghi chú</div>
                                <div className="field" style={{ alignItems: 'flex-start' }}>
                                    <i className="bi-journal-text" style={{ color: '#f59e0b', marginTop: 0 }} />
                                    <textarea className="textarea" placeholder="Thông tin bổ sung về thành viên..." />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'family' && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
                            {/* Cha/Mẹ */}
                            <div>
                                <div className="label">Cha/Mẹ</div>
                                <div className="field" style={{ justifyContent: 'space-between' }}>
                                    <input
                                        list="parent-options"
                                        placeholder="Chọn cha hoặc mẹ"
                                        value={relations.parent}
                                        onChange={e => setRelations(prev => ({ ...prev, parent: e.target.value }))}
                                        onBlur={resolveRelationsIds}
                                    />
                                    <i className="bi-caret-down" style={{ color: '#9ca3af' }} />
                                </div>
                                <datalist id="parent-options">
                                    {parentSuggestions.map(m => (
                                        <option key={m.id} value={m.name} />
                                    ))}
                                </datalist>
                                <div style={{ fontSize: 12, color: '#6b7280', marginTop: 6 }}>Chọn người cha hoặc mẹ để xác định vị trí trong cây gia phả</div>
                            </div>
                            {/* Vợ/Chồng */}
                            <div>
                                <div className="label">Vợ/Chồng</div>
                                <div className="field" style={{ justifyContent: 'space-between' }}>
                                    <input
                                        list="spouse-options"
                                        placeholder="Chọn vợ hoặc chồng"
                                        value={relations.spouse}
                                        onChange={e => setRelations(prev => ({ ...prev, spouse: e.target.value }))}
                                        onBlur={resolveRelationsIds}
                                    />
                                    <i className="bi-caret-down" style={{ color: '#9ca3af' }} />
                                </div>
                                <datalist id="spouse-options">
                                    {spouseSuggestions.map(m => (
                                        <option key={m.id} value={m.name} />
                                    ))}
                                </datalist>
                            </div>

                            {/* Summary card refined */}
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
                                        <div className={`rel-badge ${basic.generation ? 'filled' : ''}`}>{basic.generation ? `Đời ${basic.generation}` : 'Chưa chọn'}</div>
                                    </div>
                                    <div className="rel-row">
                                        <div className="rel-label"><i className="bi-person" style={{ color: '#f59e0b' }} /> Cha/Mẹ</div>
                                        <div className={`rel-badge ${relations.parent ? 'filled' : ''}`}>{relations.parent || 'Chưa chọn'}</div>
                                    </div>
                                    <div className="rel-row">
                                        <div className="rel-label"><i className="bi-heart" style={{ color: '#f59e0b' }} /> Vợ/Chồng</div>
                                        <div className={`rel-badge ${relations.spouse ? 'filled' : ''}`}>{relations.spouse || 'Chưa chọn'}</div>
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
                        <i className="bi-check2" /> Thêm thành viên
                    </button>
                </div>
            </div>
        </div>
    );
}



