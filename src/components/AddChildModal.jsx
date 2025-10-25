import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

// small icon helper using Bootstrap Icons present in the project
const Icon = ({ name, size = 16, color = '#6b7280' }) => (
  <i className={`bi bi-${name}`} style={{ fontSize: size, color }} />
);

const AddChildModal = ({ isOpen, onClose, onAddChild, member }) => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    birthYear: '',
    job: '',
    phone: '',
    email: '',
    address: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Tên không được để trống';
    if (!formData.gender) newErrors.gender = 'Vui lòng chọn giới tính';
    if (!formData.birthYear) newErrors.birthYear = 'Năm sinh không được để trống';
    else if (isNaN(formData.birthYear) || formData.birthYear < 1900 || formData.birthYear > new Date().getFullYear()) newErrors.birthYear = 'Năm sinh không hợp lệ';
    if (!formData.job.trim()) newErrors.job = 'Nghề nghiệp không được để trống';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newChild = {
      id: `${member.id}-c-${Date.now()}`,
      name: formData.name.trim(),
      gender: formData.gender,
      birthYear: parseInt(formData.birthYear, 10),
      job: formData.job.trim(),
      phone: formData.phone.trim() || 'Không có',
      email: formData.email.trim() || 'Không có',
      address: formData.address.trim() || member.address,
      avatar: `https://images.unsplash.com/photo-${formData.gender === 'male' ? '1507003211169-0a1dd7228f2d' : '1494790108755-2616b612b786'}?w=150&h=150&fit=crop&crop=face`,
      marriageStatus: 'single',
      // generation will be assigned by the parent handler (FamilyTree) so it works when adding child for a spouse node
      generation: undefined,
      spouse: null,
      children: []
    };

    onAddChild(member.id, newChild);
    console.log('[AddChildModal] submitted newChild for member:', member?.id, newChild);
    handleClose();
  };

  const handleClose = () => {
    setFormData({ name: '', gender: '', birthYear: '', job: '', phone: '', email: '', address: '', notes: '' });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div onClick={handleClose} style={{ position: 'fixed', inset: 0, background: 'rgba(17,24,39,0.5)', backdropFilter: 'blur(2px)', display: 'grid', placeItems: 'center', zIndex: 1000 }}>
      <div onClick={e => e.stopPropagation()} style={{ width: 600, maxWidth: '96vw', maxHeight: '86vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.25)', border: '1px solid #e5e7eb', animation: 'modalIn 0.18s ease-out' }}>
        <style>{`
          @keyframes modalIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
          .label { font-size:13px; color:#6b7280; margin-bottom:6px; font-weight:600 }
          .field { background:#fff; border:1px solid #e5e7eb; border-radius:12px; padding:10px 12px; display:flex; align-items:center; gap:8px; transition: border-color .14s ease, box-shadow .14s ease, transform .08s ease }
          .field input, .field select, .field textarea, .textarea { border:none; outline:none; width:100%; background:transparent; font-size:14px; color:#111827 }
          .field:focus-within { border-color:#f59e0b; box-shadow:0 12px 30px rgba(245,158,11,0.12); transform: translateY(-1px) }
          .field input:focus, .field select:focus, .field textarea:focus { outline: none }
          .textarea { min-height:88px; resize:vertical }

          /* Buttons */
          .btn-cancel { flex:1; padding:10px 14px; border-radius:10px; border:1px solid #e5e7eb; background:#fff; color:#374151; font-weight:600; cursor:pointer; transition: transform .12s ease, box-shadow .12s ease; display:inline-flex; align-items:center; justify-content:center; gap:8px }
          .btn-cancel:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(2,6,23,0.06) }
          .btn-cancel:active { transform: translateY(0) }

          .btn-confirm { flex:1; padding:10px 14px; border-radius:10px; border:none; background: linear-gradient(90deg,#f59e0b,#fb923c); color:#fff; font-weight:700; cursor:pointer; transition: transform .12s ease, box-shadow .12s ease; display:inline-flex; align-items:center; justify-content:center; gap:8px }
          .btn-confirm:hover { transform: translateY(-2px); box-shadow: 0 18px 40px rgba(245,158,11,0.18) }
          .btn-confirm:active { transform: translateY(0) }

          /* Error state */
          .field.error { border-color: #ef4444; box-shadow: 0 8px 24px rgba(239,68,68,0.08) }
        `}</style>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 20, borderBottom: '1px solid #f3f4f6' }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: '#fef3c7', display: 'grid', placeItems: 'center' }}>
            <i className="bi-person-plus" style={{ color: '#f59e0b', fontSize: 22 }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#111827' }}>Thêm con mới</div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>Thêm con cho {member?.name}</div>
          </div>
          <button onClick={handleClose} title="Đóng" style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer' }}>✕</button>
        </div>

        {/* Body */}
        <div style={{ padding: 20, overflow: 'auto' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gap: 14 }}>
              <div>
                <div className="label">Tên đầy đủ *</div>
                <div className="field">
                  <i className="bi-person" style={{ color: '#f59e0b' }} />
                  <input value={formData.name} onChange={e => handleInputChange('name', e.target.value)} placeholder="Nhập tên đầy đủ" />
                </div>
                {errors.name && <div style={{ color: '#ef4444', fontSize: 12, marginTop: 6 }}>{errors.name}</div>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <div className="label">Giới tính *</div>
                  <div className="field">
                    <i className="bi-gender-ambiguous" style={{ color: '#f59e0b' }} />
                    <select value={formData.gender} onChange={e => handleInputChange('gender', e.target.value)}>
                      <option value="" disabled>Chọn giới tính</option>
                      <option value="male">Nam</option>
                      <option value="female">Nữ</option>
                    </select>
                  </div>
                  {errors.gender && <div style={{ color: '#ef4444', fontSize: 12, marginTop: 6 }}>{errors.gender}</div>}
                </div>

                <div>
                  <div className="label">Năm sinh *</div>
                  <div className="field">
                    <input type="number" min="1900" max={new Date().getFullYear()} value={formData.birthYear} onChange={e => handleInputChange('birthYear', e.target.value)} placeholder="Ví dụ: 1990" />
                  </div>
                  {errors.birthYear && <div style={{ color: '#ef4444', fontSize: 12, marginTop: 6 }}>{errors.birthYear}</div>}
                </div>
              </div>

              <div>
                <div className="label">Nghề nghiệp *</div>
                <div className="field">
                  <i className="bi-briefcase" style={{ color: '#f59e0b' }} />
                  <input value={formData.job} onChange={e => handleInputChange('job', e.target.value)} placeholder="Nhập nghề nghiệp" />
                </div>
                {errors.job && <div style={{ color: '#ef4444', fontSize: 12, marginTop: 6 }}>{errors.job}</div>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <div className="label">Số điện thoại</div>
                  <div className="field">
                    <i className="bi-telephone" style={{ color: '#f59e0b' }} />
                    <input value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} placeholder="Nhập số điện thoại" />
                  </div>
                </div>
                <div>
                  <div className="label">Email</div>
                  <div className="field">
                    <i className="bi-envelope" style={{ color: '#f59e0b' }} />
                    <input type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} placeholder="Nhập email" />
                  </div>
                </div>
              </div>

              <div>
                <div className="label">Địa chỉ</div>
                <div className="field" style={{ alignItems: 'flex-start' }}>
                  <i className="bi-geo-alt" style={{ color: '#f59e0b', marginTop: -3 }} />
                  <input value={formData.address} onChange={e => handleInputChange('address', e.target.value)} placeholder="Nhập địa chỉ" />
                </div>
              </div>

              <div>
                <div className="label">Ghi chú</div>
                <div className="field" style={{ alignItems: 'flex-start' }}>
                  <i className="bi-journal-text" style={{ color: '#f59e0b', marginTop: -3 }} />
                  <textarea className="textarea" value={formData.notes} onChange={e => handleInputChange('notes', e.target.value)} placeholder="Nhập ghi chú (tùy chọn)" />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 6, paddingTop: 12, borderTop: '1px solid #f3f4f6' }}>
                <Button type="button" onClick={handleClose} className="btn-cancel">Hủy</Button>
                <Button type="submit" className="btn-confirm">
                  <i className="bi-plus-lg" style={{ color: '#fff' }} /> Thêm con
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddChildModal;
