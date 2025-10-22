import React, { useState } from 'react';
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
// lucide-react icons removed in favor of Bootstrap Icons
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
// import { motion, AnimatePresence } from "motion/react"; // Removed motion dependency

// Bootstrap Icon helper
const Icon = ({ name, size = 16, color = '#6b7280' }) => (
  <i className={`bi bi-${name}`} style={{ fontSize: size, color }} />
);

const Member = {
  id: String,
  name: String,
  gender: String,
  birth: String,
  death: String,
  generation: Number,
  avatar: String,
  phone: String,
  email: String,
  address: String,
  occupation: String,
  children: Array,
  spouse: Object
};

export default function FamilyTree() {
  const [searchQuery, setSearchQuery] = useState("");
  const [zoomLevel, setZoomLevel] = useState(100);
  const [layout, setLayout] = useState("vertical");
  const [selectedMember, setSelectedMember] = useState(null);
  const [showLegend, setShowLegend] = useState(true);
  const [filterGeneration, setFilterGeneration] = useState("all");

  const familyData = {
    id: "1",
    name: "Nguyễn Văn A",
    gender: "male",
    birth: "1920",
    death: "2000",
    generation: 1,
    occupation: "Nông dân",
    spouse: {
      id: "1s",
      name: "Trần Thị Lan",
      gender: "female",
      birth: "1925",
      death: "2005",
      generation: 1,
      occupation: "Nội trợ"
    },
    children: [
      {
        id: "2",
        name: "Nguyễn Văn B",
        gender: "male",
        birth: "1945",
        generation: 2,
        occupation: "Giáo viên",
        phone: "0912345678",
        spouse: {
          id: "2s",
          name: "Trần Thị X",
          gender: "female",
          birth: "1948",
          generation: 2,
          occupation: "Giáo viên",
          phone: "0912345679"
        },
        children: [
          {
            id: "4",
            name: "Nguyễn Văn D",
            gender: "male",
            birth: "1970",
            generation: 3,
            occupation: "Kỹ sư",
            phone: "0923456789",
            email: "nvd@email.com",
            spouse: {
              id: "4s",
              name: "Lê Thị Y",
              gender: "female",
              birth: "1972",
              generation: 3,
              occupation: "Bác sĩ",
              phone: "0923456788",
              email: "lty@email.com"
            },
            children: [
              {
                id: "7",
                name: "Nguyễn Văn G",
                gender: "male",
                birth: "1995",
                generation: 4,
                occupation: "Lập trình viên",
                phone: "0934567890",
                email: "nvg@email.com"
              },
              {
                id: "8",
                name: "Nguyễn Thị H",
                gender: "female",
                birth: "1998",
                generation: 4,
                occupation: "Thiết kế"
              }
            ]
          },
          {
            id: "5",
            name: "Nguyễn Thị E",
            gender: "female",
            birth: "1975",
            generation: 3,
            occupation: "Bác sĩ",
            spouse: {
              id: "5s",
              name: "Phạm Văn Z",
              gender: "male",
              birth: "1973",
              generation: 3,
              occupation: "Doanh nhân"
            }
          }
        ]
      },
      {
        id: "3",
        name: "Nguyễn Thị C",
        gender: "female",
        birth: "1950",
        generation: 2,
        occupation: "Y tá",
        spouse: {
          id: "3s",
          name: "Hoàng Văn W",
          gender: "male",
          birth: "1948",
          generation: 2,
          occupation: "Kỹ sư"
        },
        children: [
          {
            id: "6",
            name: "Hoàng Văn F",
            gender: "male",
            birth: "1980",
            generation: 3,
            occupation: "Kinh doanh",
            spouse: {
              id: "6s",
              name: "Vũ Thị T",
              gender: "female",
              birth: "1982",
              generation: 3,
              occupation: "Giáo viên"
            },
            children: [
              {
                id: "9",
                name: "Hoàng Văn I",
                gender: "male",
                birth: "2005",
                generation: 4,
                occupation: "Học sinh"
              }
            ]
          }
        ]
      }
    ]
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 10, 50));
  };

  const handleMemberClick = (member) => {
    setSelectedMember(member);
  };

  const MemberCard = ({ member, isRoot = false }) => {
    const isAlive = !member.death;
    const age = member.death 
      ? parseInt(member.death) - parseInt(member.birth)
      : new Date().getFullYear() - parseInt(member.birth);

    const isMale = member.gender === 'male';
  const bg = isMale ? '#eef2ff' : '#fde7ef';
    const bd = isMale ? '#60a5fa' : '#f472b6';
  const av = isMale ? '#3b82f6' : '#ec4899';

  return (
    <div style={{
      width: '260px',
      minHeight: '170px',
      borderRadius: '18px',
      padding: '16px',
      border: '2px solid ' + bd,
        background: isRoot ? 'linear-gradient(135deg,#fef3c7,#fde68a)' : bg,
        boxShadow: '0 10px 24px rgba(2,6,23,0.08)',
        cursor: 'pointer',
        transition: 'transform .15s ease, box-shadow .15s ease',
        transform: selectedMember?.id === member.id ? 'scale(1.02)' : 'scale(1)',
        borderColor: selectedMember?.id === member.id ? '#f59e0b' : bd
      }}
      onClick={() => handleMemberClick(member)}
      onMouseEnter={(e) => { 
        e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'; 
        e.currentTarget.style.boxShadow = '0 12px 28px rgba(2,6,23,0.12)'; 
      }}
      onMouseLeave={(e) => { 
        e.currentTarget.style.transform = selectedMember?.id === member.id ? 'scale(1.02)' : 'translateY(0) scale(1)'; 
        e.currentTarget.style.boxShadow = '0 10px 24px rgba(2,6,23,0.08)'; 
    }}>
      {/* Header: avatar lớn + tên + năm sinh-mất */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '68px', height: '68px', borderRadius: '999px',
            background: av, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px'
          }}><Icon name="person-fill" size={28} color="#fff" /></div>
          <div>
              <div style={{ fontWeight: 800, fontSize: '20px' }}>{member.name}</div>
            <div style={{ color: '#6b7280', fontSize: '16px', marginTop: '2px' }}>
                {member.birth} {member.death && `- ${member.death}`}
              </div>
            </div>
          </div>
          {isRoot && (
          <span style={{
            fontSize: '12px', padding: '4px 10px', borderRadius: '999px', background: '#eef2ff',
            color: '#3730a3', border: '1px solid #c7d2fe'
            }}>Tổ tiên</span>
          )}
      </div>

      {/* Nghề nghiệp */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px' }}>
        <span style={{ fontSize: '18px' }}>💼</span>
          <span style={{ color: '#6b7280', fontSize: '16px' }}>{member.occupation || '—'}</span>
      </div>

      {/* Footer: Đời x (trái) + Tuổi/Đã mất (phải) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
        <span style={{
          fontSize: '14px', padding: '10px 16px', borderRadius: '16px', background: '#fff',
          border: '2px solid #ede9fe', color: '#111827', boxShadow: 'inset 0 0 0 1px #f4f4f5'
          }}>Đời {member.generation}</span>
          {member.death ? (
          <span style={{
            fontSize: '14px', padding: '10px 16px', borderRadius: '16px', background: '#eef2ff',
            color: '#111827', border: '1px solid #e5e7eb'
          }}>Đã mất</span>
        ) : (
          <span style={{
            fontSize: '14px', padding: '10px 16px', borderRadius: '16px', background: '#ecfeff',
            color: '#065f46', border: '1px solid #99f6e4'
          }}>{age ? `${age} tuổi` : '—'}</span>
        )}
      </div>
    </div>
  );
  };

  const MemberNode = ({ member, isRoot = false }) => {
  return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        {/* Couple Section */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Main Member */}
          <MemberCard member={member} isRoot={isRoot} />
          
          {/* Marriage Line & Spouse */}
          {member.spouse && (
            <>
              {/* Marriage Line */}
              <div style={{ width: '18px', height: '2px', background: '#ef4444', borderRadius: '2px' }} />
              
              {/* Spouse Card */}
              <MemberCard member={member.spouse} />
            </>
          )}
        </div>
        
        {/* Children Section */}
        {member.children && member.children.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '24px' }}>
            {/* Vertical line from couple to horizontal line */}
            <div style={{ width: '2px', height: '24px', background: '#fbbf24', borderRadius: '2px' }} />
            
            {/* Horizontal line connecting to children */}
            <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
              {member.children.map((child, index) => (
                <div key={child.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {member.children.length > 1 && (
                    <div style={{ position: 'relative', width: '100%', height: '16px' }}>
                      {index === 0 && (
                        <div style={{ position: 'absolute', top: 0, left: '50%', width: '50%', height: '1px', background: '#fbbf24' }} />
                      )}
                      {index === member.children.length - 1 && (
                        <div style={{ position: 'absolute', top: 0, right: '50%', width: '50%', height: '1px', background: '#fbbf24' }} />
                      )}
                      {index > 0 && index < member.children.length - 1 && (
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1px', background: '#fbbf24' }} />
                      )}
                      <div style={{ width: '1px', height: '16px', background: '#fbbf24', margin: '0 auto' }} />
                    </div>
                  )}
                  <MemberNode member={child} />
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
  };

  return (
    <div style={{ padding: '32px', background: '#fef3c7', minHeight: 'calc(100vh - 70px)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          <div>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#111827' }}>Cây gia phả</div>
            <div style={{ color: '#6b7280', marginTop: '6px', fontSize: '13px' }}>Sơ đồ cây gia đình họ Nguyễn</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* small compact badges with two distinct colors */}
          <div style={{ background: '#e0f2fe', border: '1px solid #93c5fd', borderRadius: '10px', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icon name="people" size={14} color="#0c4a6e" />
            <span style={{ fontSize: 12, color: '#0c4a6e' }}>156 thành viên</span>
          </div>
          <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '10px', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icon name="diagram-3" size={14} color="#7f1d1d" />
            <span style={{ fontSize: 12, color: '#7f1d1d' }}>7 thế hệ</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ background: '#fff', border: '1px solid #f3f4f6', borderRadius: '12px', padding: '16px', marginBottom: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
            <Icon name="search" size={16} color="#9ca3af" />
          </span>
            <input 
              placeholder="Tìm kiếm thành viên..."
              style={{ width: '95%', height: '40px', padding: '0 12px 0 36px', borderRadius: '10px', border: '1px solid #fbbf24', outline: 'none', background: '#fff' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
    </div>

          {/* Filter */}
          <div style={{ display: 'flex', border: '1px solid #fbbf24', borderRadius: '8px', overflow: 'hidden', background: '#fff' }}>
            <button style={{ padding: '8px 12px', background: '#fff', color: '#a16207', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Icon name="funnel" size={16} color="#a16207" />
              Lọc
              <Icon name="caret-down" size={14} color="#a16207" />
            </button>
          </div>

          {/* Zoom Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid #fcd34d', borderRadius: '8px', padding: '4px' }}>
            <button onClick={handleZoomOut} style={{ width: '32px', height: '32px', borderRadius: '6px', border: 'none', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Icon name="zoom-out" size={16} color="#374151" />
            </button>
            <div style={{ padding: '0 8px', fontSize: '14px', fontWeight: '600', minWidth: '50px', textAlign: 'center' }}>
              {zoomLevel}%
            </div>
            <button onClick={handleZoomIn} style={{ width: '32px', height: '32px', borderRadius: '6px', border: 'none', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Icon name="zoom-in" size={16} color="#374151" />
            </button>
          </div>

          {/* Action Buttons */}
          <button style={{ padding: '8px 12px', background: 'linear-gradient(90deg,#f59e0b,#fb923c)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Icon name="download" size={16} color="#fff" />
            Xuất
          </button>
        </div>
    </div>

      {/* Main Content */}
      <div style={{ display: 'flex', gap: '16px', minHeight: '0' }}>
        {/* Tree View */}
        <div style={{ flex: 1, background: 'linear-gradient(135deg,#fff7d6,#fde68a)', border: '1px solid #f3f4f6', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', overflow: 'auto' }}>
          <div 
            style={{ 
              minWidth: 'max-content', 
              display: 'flex', 
              justifyContent: 'center',
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: "top center",
              transition: "transform 0.3s ease"
            }}
          >
            <MemberNode member={familyData} isRoot={true} />
          </div>
        </div>

        {/* Side Panel */}
        {selectedMember && (
          <div style={{ width: '320px', background: '#fff', border: '1px solid #f3f4f6', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            {/* Header */}
            <div style={{ padding: '16px', borderBottom: '1px solid #f3f4f6', background: 'linear-gradient(135deg,#fef3c7,#fde68a)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: selectedMember.gender === 'male' ? 'linear-gradient(135deg,#3b82f6,#1d4ed8)' : 'linear-gradient(135deg,#ec4899,#be185d)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '24px', color: '#fff' }}>👤</span>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0 }}>{selectedMember.name}</h3>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Đời {selectedMember.generation}</div>
                  </div>
                </div>
                <button onClick={() => setSelectedMember(null)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#6b7280', padding: '4px', borderRadius: '6px' }}>
                  <Icon name="x-lg" size={18} color="#6b7280" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: '16px', maxHeight: '400px', overflow: 'auto' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#fef3c7', borderRadius: '8px' }}>
                  <Icon name="calendar-event" size={16} color="#6b7280" />
                  <div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Ngày sinh</div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>{selectedMember.birth}</div>
                  </div>
                </div>

                {selectedMember.death && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#f3f4f6', borderRadius: '8px' }}>
                    <Icon name="x-circle" size={16} color="#6b7280" />
                    <div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>Ngày mất</div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>{selectedMember.death}</div>
                    </div>
                  </div>
                )}

                {selectedMember.occupation && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#dbeafe', borderRadius: '8px' }}>
                    <Icon name="briefcase" size={16} color="#6b7280" />
                    <div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>Nghề nghiệp</div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>{selectedMember.occupation}</div>
                    </div>
                  </div>
                )}

                {selectedMember.phone && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#dcfce7', borderRadius: '8px' }}>
                    <Icon name="telephone" size={16} color="#6b7280" />
                    <div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>Điện thoại</div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>{selectedMember.phone}</div>
                    </div>
                  </div>
                )}

                {selectedMember.email && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#f3e8ff', borderRadius: '8px' }}>
                    <Icon name="envelope" size={16} color="#6b7280" />
                    <div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>Email</div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>{selectedMember.email}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div style={{ padding: '16px', borderTop: '1px solid #f3f4f6' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button style={{ width: '100%', padding: '10px 16px', background: 'linear-gradient(90deg,#3b82f6,#1d4ed8)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                  Chỉnh sửa thông tin
                </button>
                <button style={{ width: '100%', padding: '10px 16px', background: '#fff', color: '#374151', border: '1px solid #fcd34d', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                  Thêm con
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      {showLegend && (
        <div style={{ marginTop: '16px', background: '#fff', border: '1px solid #f3f4f6', borderRadius: '12px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>Chú thích</h4>
            <button onClick={() => setShowLegend(false)} style={{ background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', color: '#6b7280', padding: '4px', borderRadius: '6px' }}>
              <Icon name="x-lg" size={16} color="#6b7280" />
            </button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '4px', border: '2px solid #3b82f6', background: '#dbeafe' }}></div>
              <span>Nam</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '4px', border: '2px solid #ec4899', background: '#fce7f3' }}></div>
              <span>Nữ</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '4px', border: '2px solid #f59e0b', background: '#fef3c7' }}></div>
              <span>Tổ tiên</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '24px', height: '2px', background: '#fbbf24' }}></div>
              <span>Quan hệ cha - con</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ padding: '4px 8px', background: '#dcfce7', color: '#16a34a', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>Còn sống</div>
              <div style={{ padding: '4px 8px', background: '#f3f4f6', color: '#6b7280', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>Đã mất</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
