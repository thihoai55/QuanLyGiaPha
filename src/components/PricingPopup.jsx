import React from 'react';

const PricingPopup = ({ showPricingPopup, setShowPricingPopup }) => {
    if (!showPricingPopup) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            animation: 'fadeInUp 0.3s ease-out'
        }}>
            <div style={{
                background: '#fff',
                borderRadius: 20,
                padding: '40px',
                maxWidth: 1200,
                width: '90%',
                maxHeight: '90vh',
                overflow: 'auto',
                position: 'relative',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
            }}>
                {/* Close Button */}
                <button
                    onClick={() => setShowPricingPopup(false)}
                    style={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        background: 'none',
                        border: 'none',
                        fontSize: 24,
                        color: '#6b7280',
                        cursor: 'pointer',
                        padding: 8,
                        borderRadius: 8,
                        transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#f3f4f6';
                        e.currentTarget.style.color = '#374151';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'none';
                        e.currentTarget.style.color = '#6b7280';
                    }}
                >
                    <i className="bi-x" />
                </button>

                {/* Title */}
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <h2 style={{ fontSize: 32, fontWeight: 700, color: '#111827', margin: '0 0 8px 0' }}>
                        Bảng giá dịch vụ
                    </h2>
                    <p style={{ fontSize: 16, color: '#6b7280', margin: 0 }}>
                        Chọn gói phù hợp với nhu cầu gia phả của bạn
                    </p>
                </div>

                {/* Pricing Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
                    {[
                        {
                            name: 'Cơ bản',
                            price: '500.000',
                            period: '12 tháng',
                            members: '200 thành viên',
                            managers: '1 người quản lý',
                            storage: '2 GB dung lượng lưu trữ',
                            color: '#3b82f6'
                        },
                        {
                            name: 'Đoàn viên',
                            price: '1.000.000',
                            period: '12 tháng',
                            members: '500 thành viên',
                            managers: '2 người quản lý',
                            storage: '3 GB dung lượng lưu trữ',
                            color: '#10b981'
                        },
                        {
                            name: 'Đồng tâm',
                            price: '2.000.000',
                            period: '12 tháng',
                            members: '2.000 thành viên',
                            managers: '5 người quản lý',
                            storage: '10 GB dung lượng lưu trữ',
                            color: '#f59e0b'
                        },
                        {
                            name: 'Thịnh vượng',
                            price: '5.000.000',
                            period: '12 tháng',
                            members: '10.000 thành viên',
                            managers: '10 người quản lý',
                            storage: '25 GB dung lượng lưu trữ',
                            color: '#8b5cf6'
                        },
                        {
                            name: 'Bản sắc',
                            price: '10.000.000',
                            period: '12 tháng',
                            members: 'Không giới hạn thành viên',
                            managers: '15 người quản lý',
                            storage: '50 GB dung lượng lưu trữ',
                            color: '#ef4444'
                        }
                    ].map((plan, index) => (
                        <div key={index} style={{
                            background: '#fff',
                            borderRadius: 16,
                            padding: '24px',
                            border: '2px solid #f3f4f6',
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.borderColor = plan.color;
                            e.currentTarget.style.boxShadow = `0 8px 25px ${plan.color}20`;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = '#f3f4f6';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                        >
                            {/* Header */}
                            <div style={{
                                background: `linear-gradient(135deg, ${plan.color}15, ${plan.color}25)`,
                                margin: '-24px -24px 20px -24px',
                                padding: '20px 24px',
                                textAlign: 'center',
                                position: 'relative'
                            }}>
                                <h3 style={{ fontSize: 20, fontWeight: 700, color: plan.color, margin: '0 0 8px 0' }}>
                                    {plan.name}
                                </h3>
                                <div style={{ fontSize: 24, fontWeight: 800, color: '#111827', marginBottom: 4 }}>
                                    {plan.price}đ
                                </div>
                                <div style={{ fontSize: 14, color: '#6b7280' }}>
                                    / {plan.period}
                                </div>
                            </div>

                            {/* Features */}
                            <div style={{ marginBottom: 24 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                                    <i className="bi-people" style={{ color: plan.color, fontSize: 16 }} />
                                    <span style={{ fontSize: 14, color: '#374151' }}>{plan.members}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                                    <i className="bi-person-gear" style={{ color: plan.color, fontSize: 16 }} />
                                    <span style={{ fontSize: 14, color: '#374151' }}>{plan.managers}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <i className="bi-hdd" style={{ color: plan.color, fontSize: 16 }} />
                                    <span style={{ fontSize: 14, color: '#374151' }}>{plan.storage}</span>
                                </div>
                            </div>

                            {/* Upgrade Button */}
                            <button style={{
                                width: '100%',
                                background: `linear-gradient(135deg, ${plan.color}, ${plan.color}dd)`,
                                color: '#fff',
                                border: 'none',
                                padding: '12px 16px',
                                borderRadius: 12,
                                fontSize: 14,
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 8
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-1px)';
                                e.currentTarget.style.boxShadow = `0 4px 12px ${plan.color}40`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                            >
                                Nâng cấp ngay
                                <i className="bi-arrow-up-right" style={{ fontSize: 12 }} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PricingPopup;
