import React, { useState } from 'react';
import { familyMembersData, getMembersByGeneration, getGenderStats, getGenerationStats } from '../data/familyMembersData';

const AllMembersModal = ({ isOpen, onClose }) => {
  const [selectedGeneration, setSelectedGeneration] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('generation');

  if (!isOpen) return null;

  // Lọc dữ liệu theo thế hệ và tìm kiếm
  let filteredMembers = familyMembersData;
  
  if (selectedGeneration !== 'all') {
    filteredMembers = getMembersByGeneration(parseInt(selectedGeneration));
  }

  if (searchTerm) {
    filteredMembers = filteredMembers.filter(member => 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.job.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Sắp xếp dữ liệu
  filteredMembers = [...filteredMembers].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'age':
        return b.age - a.age;
      case 'generation':
        return a.generation - b.generation;
      default:
        return 0;
    }
  });

  const genderStats = getGenderStats();
  const generationStats = getGenerationStats();

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '16px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        maxWidth: '800px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'hidden',
        border: '2px solid #fde68a'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #dc2626 100%)',
          color: 'white',
          padding: '16px 20px',
          borderRadius: '10px 10px 0 0'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h2 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                margin: 0
              }}>Danh sách thành viên gia phả</h2>
              <p style={{
                color: '#fef3c7',
                margin: '2px 0 0 0',
                fontSize: '12px'
              }}>Tổng cộng {familyMembersData.length} thành viên</p>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '24px',
                fontWeight: 'bold',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Stats Cards removed as requested */}

        {/* Filters */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #fde68a',
          backgroundColor: 'white'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>Tìm kiếm</label>
              <input
                type="text"
                placeholder="Tìm theo tên, nghề nghiệp, địa chỉ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  padding: '8px 12px',
                  border: '2px solid #fde68a',
                  borderRadius: '6px',
                  outline: 'none',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#f59e0b';
                  e.target.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#fde68a';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>Thế hệ</label>
              <select
                value={selectedGeneration}
                onChange={(e) => setSelectedGeneration(e.target.value)}
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  padding: '8px 12px',
                  border: '2px solid #fde68a',
                  borderRadius: '6px',
                  outline: 'none',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#f59e0b';
                  e.target.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#fde68a';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="all">Tất cả thế hệ</option>
                {Object.keys(generationStats).map(gen => (
                  <option key={gen} value={gen}>Thế hệ {gen}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>Sắp xếp</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  padding: '8px 12px',
                  border: '2px solid #fde68a',
                  borderRadius: '6px',
                  outline: 'none',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#f59e0b';
                  e.target.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#fde68a';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="generation">Theo thế hệ</option>
                <option value="name">Theo tên</option>
                <option value="age">Theo tuổi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Members List */}
        <div style={{
          padding: '24px',
          overflowY: 'auto',
          maxHeight: '400px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '16px'
          }}>
            {filteredMembers.map((member) => (
              <div key={member.id} style={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '16px',
                transition: 'box-shadow 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}>
                  <img
                    src={member.avatar}
                    alt={member.name}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    flex: 1,
                    minWidth: 0
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#111827',
                        margin: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {member.name}
                      </h3>
                      <span style={{
                        padding: '2px 8px',
                        fontSize: '12px',
                        borderRadius: '12px',
                        backgroundColor: member.gender === 'male' ? '#dbeafe' : '#fce7f3',
                        color: member.gender === 'male' ? '#1e40af' : '#be185d'
                      }}>
                        {member.gender === 'male' ? 'Nam' : 'Nữ'}
                      </span>
                    </div>
                    <p style={{
                      fontSize: '14px',
                      color: '#6b7280',
                      margin: '2px 0'
                    }}>Thế hệ {member.generation}</p>
                    <p style={{
                      fontSize: '14px',
                      color: '#6b7280',
                      margin: '2px 0'
                    }}>{member.age || (member.birthYear ? new Date().getFullYear() - member.birthYear : 'N/A')} tuổi</p>
                    <p style={{
                      fontSize: '14px',
                      color: '#6b7280',
                      margin: '2px 0'
                    }}>{member.job || 'Chưa cập nhật'}</p>
                    <p style={{
                      fontSize: '14px',
                      color: '#6b7280',
                      margin: '2px 0'
                    }}>{member.address || 'Chưa cập nhật'}</p>
                    {member.phone && member.phone !== 'Không có' && (
                      <p style={{
                        fontSize: '14px',
                        color: '#6b7280',
                        margin: '2px 0'
                      }}>{member.phone}</p>
                    )}
                    {member.spouse && (
                      <div style={{
                        marginTop: '8px',
                        padding: '8px',
                        backgroundColor: '#f9fafb',
                        borderRadius: '4px'
                      }}>
                        <p style={{
                          fontSize: '12px',
                          color: '#6b7280',
                          margin: '0 0 2px 0'
                        }}>Vợ/Chồng:</p>
                        <p style={{
                          fontSize: '14px',
                          fontWeight: '500',
                          margin: 0
                        }}>{member.spouse.name}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredMembers.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '32px 0'
            }}>
              <p style={{
                color: '#6b7280',
                fontSize: '16px'
              }}>Không tìm thấy thành viên nào</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          backgroundColor: '#fef3c7',
          padding: '16px 24px',
          borderTop: '1px solid #fde68a',
          borderRadius: '0 0 10px 10px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              margin: 0
            }}>
              Hiển thị {filteredMembers.length} / {familyMembersData.length} thành viên
            </p>
            <button
              onClick={onClose}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#d97706';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f59e0b';
              }}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllMembersModal;