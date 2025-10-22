import React, { useState, useEffect, useRef } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';

function FieldInput(props) {
    return <Input {...props} style={{ 
        height: '40px',
        width: '100%',
        maxWidth: '100%',
        borderRadius: '8px',
        border: '1px solid #fde68a',
        background: '#fff',
        padding: '8px 12px',
        fontSize: '14px',
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)',
        transition: 'all 0.2s ease',
        boxSizing: 'border-box',
        ...props.style 
    }} />;
}

function PrimaryButton(props) {
    const { style, ...rest } = props;
    return <Button {...rest} style={{ 
        background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
        color: '#fff',
        border: '1px solid #f59e0b',
        borderRadius: '8px',
        padding: '10px 16px',
        fontWeight: '600',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(245,158,11,0.25)',
        transition: 'all 0.2s ease',
        minWidth: '120px',
        ...style 
    }} />;
}

function OutlineButton(props) {
    const { style, ...rest } = props;
    return <Button {...rest} style={{ 
        background: '#fff',
        color: '#92400e',
        border: '1px solid #fde68a',
        borderRadius: '8px',
        padding: '10px 16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        minWidth: '120px',
        ...style 
    }} />;
}

function DangerButton(props) {
    const { style, ...rest } = props;
    return <Button {...rest} style={{ 
        background: '#fff',
        color: '#dc2626',
        border: '1px solid #fecaca',
        borderRadius: '8px',
        padding: '10px 16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        minWidth: '120px',
        ...style 
    }} />;
}

function Toggle({ checked, onChange }) {
    return (
        <button
            onClick={() => onChange(!checked)}
            style={{
                width: '44px',
                height: '24px',
                borderRadius: '999px',
                position: 'relative',
                background: checked ? '#f59e0b' : '#e5e7eb',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
            }}
            aria-pressed={checked}
        >
            <span
                style={{
                    position: 'absolute',
                    top: '2px',
                    left: checked ? '22px' : '2px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: '#fff',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                    transition: 'all 0.2s ease'
                }}
            />
        </button>
    );
}

function RowToggle({ icon, title, description, checked, onChange, highlighted }) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px',
            borderRadius: '12px',
            border: highlighted ? '1px solid #fcd34d' : '1px solid #e5e7eb',
            background: highlighted ? '#fffbeb' : '#fff',
            marginBottom: '12px'
        }}>
            <div style={{ flex: 1 }}>
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    marginBottom: '4px', 
                    fontWeight: '600' 
                }}>
                    {icon}
                    <span>{title}</span>
                </div>
                {description && (
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>{description}</div>
                )}
            </div>
            <Toggle checked={checked} onChange={onChange} />
        </div>
    );
}

const StatCard = ({ label, value, max, percentage, index }) => (
    <div style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}>
        <Card style={{ 
            background: '#ffffffcc', 
            backdropFilter: 'blur(4px)', 
            borderColor: '#fcd34d80',
            padding: '16px',
            borderRadius: '12px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>{label}</div>
                <div style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    background: '#fef3c7',
                    color: '#92400e',
                    padding: '2px 8px',
                    borderRadius: '999px'
                }}>{percentage}%</div>
            </div>
            <div style={{ fontWeight: '600', marginBottom: '8px' }}>
                {value} <span style={{ color: '#6b7280', fontSize: '12px' }}>/ {max}</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: '#fde68a', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: `${percentage}%`, height: '100%', background: 'linear-gradient(90deg, #f59e0b, #fbbf24)' }} />
            </div>
        </Card>
    </div>
);

const styles = {
    tabContent: {
        marginTop: '24px'
    },
    card: {
        padding: '20px',
        marginBottom: '16px',
        borderRadius: '12px',
        border: '1px solid #fde68a',
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '8px',
        marginTop: '24px',
        flexWrap: 'wrap'
    },
    formField: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
    },
    label: {
        fontSize: '12px',
        fontWeight: '600',
        color: '#374151',
        marginBottom: '4px'
    },
    formGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px'
    },
    themeGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '12px'
    },
    themeCard: {
        padding: '12px',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        background: '#fff',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        textAlign: 'center'
    },
    themeCardActive: {
        borderColor: '#f59e0b',
        background: '#fffbeb'
    },
    themePreview: {
        width: '100%',
        height: '40px',
        borderRadius: '8px',
        marginBottom: '8px'
    },
    themeName: {
        fontSize: '12px',
        fontWeight: '600',
        marginBottom: '4px'
    },
    activeBadge: {
        fontSize: '10px',
        color: '#f59e0b',
        fontWeight: '700'
    },
    passwordRequirements: {
        fontSize: '12px',
        color: '#6b7280',
        marginTop: '8px'
    },
    sessionItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        background: '#fff'
    },
    sessionInfo: {
        flex: 1
    },
    sessionTitle: {
        fontWeight: '600',
        marginBottom: '4px'
    },
    sessionDetails: {
        fontSize: '12px',
        color: '#6b7280'
    },
    sessionStatus: {
        fontSize: '12px',
        color: '#22c55e',
        fontWeight: '600'
    },
    backupCard: {
        padding: '16px',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        background: '#fff'
    },
    dangerCard: {
        padding: '20px',
        marginBottom: '16px',
        borderRadius: '12px',
        border: '1px solid #fecaca',
        background: '#fef2f2'
    },
    dangerHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '16px'
    },
    dangerIcon: {
        padding: '8px',
        borderRadius: '10px',
        background: '#dc2626',
        color: '#fff'
    },
    dangerTitle: {
        margin: 0,
        fontSize: '18px',
        fontWeight: '600',
        color: '#dc2626'
    },
    dangerDescription: {
        fontSize: '12px',
        color: '#991b1b'
    }
};

function Settings() {
    const tabsListRef = React.useRef(null);
    const indicatorRef = React.useRef(null);
    const [hasChanges, setHasChanges] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [activeTheme, setActiveTheme] = useState('gold');
    const [activeTab, setActiveTab] = useState('profile');
    const [defaultMemberRole, setDefaultMemberRole] = useState('member');
    const [language, setLanguage] = useState('vi');
    const [dateFormat, setDateFormat] = useState('dd/mm/yyyy');
    const [timezone, setTimezone] = useState('asia-ho-chi-minh');
    const [showMemberRoleDropdown, setShowMemberRoleDropdown] = useState(false);
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    const [showDateFormatDropdown, setShowDateFormatDropdown] = useState(false);
    const [showTimezoneDropdown, setShowTimezoneDropdown] = useState(false);
    const [tabContentKey, setTabContentKey] = useState(0);

    const [profileData, setProfileData] = useState({
        fullName: 'Nguyễn Thị HoàiHoài',
        email: 'nguyenthihoai552004@gmail.com',
        phone: '0819923174',
        address: 'Nghệ An, Việt Nam',
        birthDate: '05/05/2004',
        bio: 'Người quản lý gia phả họ Nguyễn tại Nghệ An'
    });

    const [genealogySettings, setGenealogySettings] = useState({
        name: 'Gia phả họ Nguyễn',
        surname: 'Nguyễn',
        description: 'Gia phả dòng họ Nguyễn tại Nghệ An',
        origin: 'Nghệ An, Việt Nam',
        foundingYear: '1450',
        isPublic: true,
        allowSearch: true,
        showContact: false
    });

    const [notifications, setNotifications] = useState({
        emailNewMember: true,
        emailEditSuggestion: true,
        emailEvents: true,
        emailForum: false,
        pushNotifications: false,
        soundEnabled: false,
        dailyDigest: true
    });

    const [privacy, setPrivacy] = useState({
        allowEditSuggestions: true,
        autoApproveAdmins: false,
        requireApproval: true,
        allowInvites: true
    });

    const stats = [
        { label: 'Dung lượng đã dùng', value: '2.4 GB', max: '10 GB', percentage: 24 },
        { label: 'Số thành viên', value: '156', max: 'Không giới hạn', percentage: 100 },
        { label: 'Số ảnh', value: '487', max: '1000', percentage: 48 },
        { label: 'Số tài liệu', value: '23', max: '100', percentage: 23 }
    ];

    const themes = [
        { id: 'gold', name: 'Vàng Gold', gradient: 'linear-gradient(90deg,#f59e0b,#fbbf24)', active: activeTheme === 'gold' },
        { id: 'blue', name: 'Xanh Biển', gradient: 'linear-gradient(90deg,#3b82f6,#06b6d4)', active: activeTheme === 'blue' },
        { id: 'red', name: 'Đỏ Truyền thống', gradient: 'linear-gradient(90deg,#ef4444,#f43f5e)', active: activeTheme === 'red' },
        { id: 'green', name: 'Xanh Lá', gradient: 'linear-gradient(90deg,#22c55e,#10b981)', active: activeTheme === 'green' }
    ];

    const handleSave = () => {
        alert('Đã lưu thay đổi thành công!');
        setHasChanges(false);
    };

    const handleThemeChange = (themeId) => {
        setActiveTheme(themeId);
        setHasChanges(true);
    };

    const handleTabChange = (newTab) => {
        setActiveTab(newTab);
        setTabContentKey(prev => prev + 1);
    };

    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp_settings { 
                from { opacity: 0; transform: translateY(12px); } 
                to { opacity: 1; transform: translateY(0); } 
            }
            .tab-content-animation { animation: fadeInUp_settings 0.4s ease-out; }
            /* Remove focus outline/black border */
            .tabs-trigger:focus, .tabs-trigger:focus-visible, .tabs-trigger:focus-within,
            button:focus, button:focus-visible { outline: none !important; box-shadow: none !important; }
            /* Sliding indicator */
            .tabs-list-with-indicator { position: relative; }
            .tabs-active-indicator { position:absolute; top:4px; height:calc(100% - 8px); border-radius:6px; background:linear-gradient(135deg,#f59e0b,#fbbf24); box-shadow:0 2px 4px rgba(245,158,11,0.3); transition:left .24s ease,width .24s ease; z-index:0; }
            .tabs-trigger { position: relative; z-index: 1; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); overflow: hidden; }
            .tabs-trigger::before { content:''; position:absolute; top:0; left:-100%; width:100%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent); transition:left .5s; }
            .tabs-trigger:hover::before { left:100%; }
            .dropdown-option { transition: all 0.2s ease; }
            .dropdown-option:hover { background-color:#f9fafb !important; transform: translateX(2px); }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    // Sliding indicator follows active tab
    useEffect(() => {
        const move = () => {
            const list = tabsListRef.current;
            const indicator = indicatorRef.current;
            if (!list || !indicator) return;
            const triggers = list.querySelectorAll('[data-value]');
            let activeEl = null;
            triggers.forEach((el) => { if (el.getAttribute('data-value') === activeTab) activeEl = el; });
            if (!activeEl) return;
            const listRect = list.getBoundingClientRect();
            const r = activeEl.getBoundingClientRect();
            indicator.style.left = (r.left - listRect.left) + 'px';
            indicator.style.width = r.width + 'px';
        };
        // ensure DOM is painted
        const id = setTimeout(() => move(), 50);
        const onResize = () => move();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
        // cleanup timeout
        return () => clearTimeout(id);
    }, [activeTab]);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('[data-dropdown]')) {
                setShowMemberRoleDropdown(false);
                setShowLanguageDropdown(false);
                setShowDateFormatDropdown(false);
                setShowTimezoneDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div style={{
            padding: '16px',
            maxWidth: '1200px',
            margin: '0 auto',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #fffbeb, #fff7ed)'
        }}>
            <div style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '16px',
                padding: '20px',
                border: '2px solid #fcd34d80',
                background: 'linear-gradient(135deg, #fffbeb, #fff7ed)',
                marginBottom: '24px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                            <div style={{ padding: '8px', borderRadius: '12px', background: 'linear-gradient(135deg, #f59e0b, #fbbf24)', color: '#fff' }}>
                                <i className="bi-gear" />
                            </div>
                            <h1 style={{
                                margin: 0,
                                background: 'linear-gradient(135deg, #92400e, #b45309, #c2410c)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontSize: '24px',
                                fontWeight: '700'
                            }}>Cài đặt</h1>
                        </div>
                        <div style={{ color: '#6b7280', fontSize: '14px' }}>Quản lý thông tin cá nhân, gia phả và tùy chọn hệ thống</div>
                    </div>
                    <div style={{
                        background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                        color: '#fff',
                        padding: '8px 12px',
                        borderRadius: '999px',
                        fontWeight: '700',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '14px'
                    }}>
                        <i className="bi-award" /> Premium
                    </div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '16px',
                    marginTop: '16px'
                }}>
                    {stats.map((s, i) => (
                        <StatCard key={s.label} {...s} index={i} />
                    ))}
                </div>
            </div>

            {hasChanges && (
                <div style={{
                    position: 'fixed',
                    top: '16px',
                    right: '16px',
                    zIndex: 50,
                    background: '#fff',
                    border: '1px solid #fcd34d',
                    borderRadius: '12px',
                    padding: '16px',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
                    maxWidth: '400px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', fontWeight: '500' }}>
                            <i className="bi-exclamation-triangle" />
                            <span>Bạn có thay đổi chưa lưu</span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', marginLeft: '12px' }}>
                            <Button variant="outline" size="sm" onClick={() => setHasChanges(false)}>Hủy</Button>
                            <Button size="sm" onClick={handleSave}>Lưu thay đổi</Button>
                        </div>
                    </div>
                </div>
            )}

            <div style={{ width: '100%', maxWidth: '100%' }}>
                <Tabs defaultValue="profile" value={activeTab} onValueChange={handleTabChange} className="w-full">
                    <TabsList ref={tabsListRef} className="tabs-list-with-indicator" style={{
                        width: '100%',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                        background: '#fffbeb',
                        border: '1px solid #fde68a',
                        padding: '4px',
                        borderRadius: '8px',
                        marginBottom: '24px'
                    }}>
                        <div ref={indicatorRef} className="tabs-active-indicator" />
                        <TabsTrigger 
                            value="profile" 
                            className="tabs-trigger"
                            style={{
                                flex: '1',
                                minWidth: '120px',
                                textAlign: 'center',
                                padding: '8px 12px',
                                borderRadius: '6px',
                                border: 'none',
                                background: activeTab === 'profile' ? 'linear-gradient(135deg, #f59e0b, #fbbf24)' : 'transparent',
                                color: activeTab === 'profile' ? '#fff' : '#374151',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                                boxShadow: activeTab === 'profile' ? '0 2px 4px rgba(245,158,11,0.3)' : 'none'
                            }}
                        >
                            <i className="bi-person" style={{ marginRight: '8px' }} /> Hồ sơ
                        </TabsTrigger>
                        <TabsTrigger 
                            value="genealogy" 
                            className="tabs-trigger"
                            style={{
                                flex: '1',
                                minWidth: '120px',
                                textAlign: 'center',
                                padding: '8px 12px',
                                borderRadius: '6px',
                                border: 'none',
                                background: activeTab === 'genealogy' ? 'linear-gradient(135deg, #f59e0b, #fbbf24)' : 'transparent',
                                color: activeTab === 'genealogy' ? '#fff' : '#374151',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                                boxShadow: activeTab === 'genealogy' ? '0 2px 4px rgba(245,158,11,0.3)' : 'none'
                            }}
                        >
                            <i className="bi-building" style={{ marginRight: '8px' }} /> Gia phả
                        </TabsTrigger>
                        <TabsTrigger 
                            value="privacy" 
                            className="tabs-trigger"
                            style={{
                                flex: '1',
                                minWidth: '120px',
                                textAlign: 'center',
                                padding: '8px 12px',
                                borderRadius: '6px',
                                border: 'none',
                                background: activeTab === 'privacy' ? 'linear-gradient(135deg, #f59e0b, #fbbf24)' : 'transparent',
                                color: activeTab === 'privacy' ? '#fff' : '#374151',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                                boxShadow: activeTab === 'privacy' ? '0 2px 4px rgba(245,158,11,0.3)' : 'none'
                            }}
                        >
                            <i className="bi-shield-lock" style={{ marginRight: '8px' }} /> Riêng tư
                        </TabsTrigger>
                        <TabsTrigger 
                            value="notifications" 
                            className="tabs-trigger"
                            style={{
                                flex: '1',
                                minWidth: '120px',
                                textAlign: 'center',
                                padding: '8px 12px',
                                borderRadius: '6px',
                                border: 'none',
                                background: activeTab === 'notifications' ? 'linear-gradient(135deg, #f59e0b, #fbbf24)' : 'transparent',
                                color: activeTab === 'notifications' ? '#fff' : '#374151',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                                boxShadow: activeTab === 'notifications' ? '0 2px 4px rgba(245,158,11,0.3)' : 'none'
                            }}
                        >
                            <i className="bi-bell" style={{ marginRight: '8px' }} /> Thông báo
                        </TabsTrigger>
                        <TabsTrigger 
                            value="members" 
                            className="tabs-trigger"
                            style={{
                                flex: '1',
                                minWidth: '120px',
                                textAlign: 'center',
                                padding: '8px 12px',
                                borderRadius: '6px',
                                border: 'none',
                                background: activeTab === 'members' ? 'linear-gradient(135deg, #f59e0b, #fbbf24)' : 'transparent',
                                color: activeTab === 'members' ? '#fff' : '#374151',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                                boxShadow: activeTab === 'members' ? '0 2px 4px rgba(245,158,11,0.3)' : 'none'
                            }}
                        >
                            <i className="bi-people" style={{ marginRight: '8px' }} /> Thành viên
                        </TabsTrigger>
                        <TabsTrigger 
                            value="appearance" 
                            className="tabs-trigger"
                            style={{
                                flex: '1',
                                minWidth: '120px',
                                textAlign: 'center',
                                padding: '8px 12px',
                                borderRadius: '6px',
                                border: 'none',
                                background: activeTab === 'appearance' ? 'linear-gradient(135deg, #f59e0b, #fbbf24)' : 'transparent',
                                color: activeTab === 'appearance' ? '#fff' : '#374151',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                                boxShadow: activeTab === 'appearance' ? '0 2px 4px rgba(245,158,11,0.3)' : 'none'
                            }}
                        >
                            <i className="bi-palette" style={{ marginRight: '8px' }} /> Giao diện
                        </TabsTrigger>
                        <TabsTrigger 
                            value="security" 
                            className="tabs-trigger"
                            style={{
                                flex: '1',
                                minWidth: '120px',
                                textAlign: 'center',
                                padding: '8px 12px',
                                borderRadius: '6px',
                                border: 'none',
                                background: activeTab === 'security' ? 'linear-gradient(135deg, #f59e0b, #fbbf24)' : 'transparent',
                                color: activeTab === 'security' ? '#fff' : '#374151',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                                boxShadow: activeTab === 'security' ? '0 2px 4px rgba(245,158,11,0.3)' : 'none'
                            }}
                        >
                            <i className="bi-shield-check" style={{ marginRight: '8px' }} /> Bảo mật
                        </TabsTrigger>
                        <TabsTrigger 
                            value="advanced" 
                            className="tabs-trigger"
                            style={{
                                flex: '1',
                                minWidth: '120px',
                                textAlign: 'center',
                                padding: '8px 12px',
                                borderRadius: '6px',
                                border: 'none',
                                background: activeTab === 'advanced' ? 'linear-gradient(135deg, #f59e0b, #fbbf24)' : 'transparent',
                                color: activeTab === 'advanced' ? '#fff' : '#374151',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                                boxShadow: activeTab === 'advanced' ? '0 2px 4px rgba(245,158,11,0.3)' : 'none'
                            }}
                        >
                            <i className="bi-hdd" style={{ marginRight: '8px' }} /> Nâng cao
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile" style={{ marginTop: '24px' }} className="tab-content-animation" key={`profile-${tabContentKey}`}>
                        <Card style={{
                            padding: '20px',
                            marginBottom: '16px',
                            borderRadius: '12px',
                            border: '1px solid #fde68a',
                            background: '#fff',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                <div style={{ padding: '8px', borderRadius: '10px', background: 'linear-gradient(135deg, #f59e0b, #fbbf24)', color: '#fff' }}>
                                    <i className="bi-person" />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Thông tin cá nhân</h3>
                                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Cập nhật thông tin hồ sơ của bạn</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '16px', flexWrap: 'wrap' }}>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                                    color: '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: '700',
                                    fontSize: '20px',
                                    marginBottom: '16px'
                                }}>
                                    NVA
                                </div>
                                <div style={{ flex: 1, minWidth: '200px' }}>
                                    <div style={{ fontWeight: '600', marginBottom: '8px' }}>Ảnh đại diện</div>
                                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                        <OutlineButton size="sm">Tải ảnh lên</OutlineButton>
                                        <DangerButton size="sm">Xóa</DangerButton>
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '6px' }}>JPG, PNG hoặc GIF. Tối đa 2MB.</div>
                                </div>
                            </div>

                            <Separator style={{ margin: '16px 0' }} />

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                gap: '16px',
                                marginTop: '16px'
                            }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <label htmlFor="fullName" style={{ fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>Họ và tên</label>
                                    <FieldInput 
                                        id="fullName" 
                                        value={profileData.fullName} 
                                        onChange={(e) => { 
                                            setProfileData({ ...profileData, fullName: e.target.value }); 
                                            setHasChanges(true); 
                                        }} 
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <label htmlFor="email" style={{ fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>Email</label>
                                    <FieldInput 
                                        id="email" 
                                        type="email" 
                                        value={profileData.email} 
                                        onChange={(e) => { 
                                            setProfileData({ ...profileData, email: e.target.value }); 
                                            setHasChanges(true); 
                                        }} 
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <label htmlFor="phone" style={{ fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>Số điện thoại</label>
                                    <FieldInput 
                                        id="phone" 
                                        value={profileData.phone} 
                                        onChange={(e) => { 
                                            setProfileData({ ...profileData, phone: e.target.value }); 
                                            setHasChanges(true); 
                                        }} 
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <label htmlFor="birthDate" style={{ fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>Ngày sinh</label>
                                    <FieldInput 
                                        id="birthDate" 
                                        value={profileData.birthDate} 
                                        onChange={(e) => { 
                                            setProfileData({ ...profileData, birthDate: e.target.value }); 
                                            setHasChanges(true); 
                                        }} 
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '16px' }}>
                                <label htmlFor="address" style={{ fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>Địa chỉ</label>
                                <FieldInput 
                                    id="address" 
                                    value={profileData.address} 
                                    onChange={(e) => { 
                                        setProfileData({ ...profileData, address: e.target.value }); 
                                        setHasChanges(true); 
                                    }} 
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '16px' }}>
                                <label htmlFor="bio" style={{ fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>Tiểu sử</label>
                                <textarea 
                                    id="bio" 
                                    value={profileData.bio} 
                                    onChange={(e) => { 
                                        setProfileData({ ...profileData, bio: e.target.value }); 
                                        setHasChanges(true); 
                                    }} 
                                    style={{
                                        width: '100%',
                                        minHeight: '100px',
                                        borderRadius: '8px',
                                        border: '1px solid #fde68a',
                                        background: '#fff',
                                        padding: '12px',
                                        fontSize: '14px',
                                        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)',
                                        resize: 'vertical',
                                        fontFamily: 'inherit',
                                        boxSizing: 'border-box'
                                    }} 
                                />
                            </div>
                        </Card>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '24px', flexWrap: 'wrap' }}>
                            <OutlineButton onClick={() => setHasChanges(false)}>Hủy</OutlineButton>
                            <PrimaryButton onClick={handleSave}>Lưu thay đổi</PrimaryButton>
                        </div>
                    </TabsContent>

                    <TabsContent value="genealogy" style={{ marginTop: '24px' }} className="tab-content-animation" key={`genealogy-${tabContentKey}`}>
                        <Card style={{
                            padding: '20px',
                            marginBottom: '16px',
                            borderRadius: '12px',
                            border: '1px solid #fde68a',
                            background: '#fff',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                <div style={{ padding: '8px', borderRadius: '10px', background: 'linear-gradient(135deg, #f59e0b, #fbbf24)', color: '#fff' }}>
                                    <i className="bi-building" />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Thông tin gia phả</h3>
                                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Cấu hình thông tin và hiển thị gia phả</div>
                                </div>
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                gap: '16px',
                                marginTop: '16px'
                            }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <label htmlFor="genealogy-name" style={{ fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>Tên gia phả</label>
                                    <FieldInput 
                                        id="genealogy-name" 
                                        value={genealogySettings.name} 
                                        onChange={(e) => { 
                                            setGenealogySettings({ ...genealogySettings, name: e.target.value }); 
                                            setHasChanges(true); 
                                        }} 
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <label htmlFor="surname" style={{ fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>Họ</label>
                                    <FieldInput 
                                        id="surname" 
                                        value={genealogySettings.surname} 
                                        onChange={(e) => { 
                                            setGenealogySettings({ ...genealogySettings, surname: e.target.value }); 
                                            setHasChanges(true); 
                                        }} 
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '16px' }}>
                                <label htmlFor="description" style={{ fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>Mô tả</label>
                                <textarea 
                                    id="description" 
                                    value={genealogySettings.description} 
                                    onChange={(e) => { 
                                        setGenealogySettings({ ...genealogySettings, description: e.target.value }); 
                                        setHasChanges(true); 
                                    }} 
                                    style={{
                                        width: '100%',
                                        minHeight: '100px',
                                        borderRadius: '8px',
                                        border: '1px solid #fde68a',
                                        background: '#fff',
                                        padding: '12px',
                                        fontSize: '14px',
                                        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)',
                                        resize: 'vertical',
                                        fontFamily: 'inherit',
                                        boxSizing: 'border-box'
                                    }} 
                                />
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                gap: '16px',
                                marginTop: '16px'
                            }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <label htmlFor="origin" style={{ fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>Nguồn gốc</label>
                                    <FieldInput 
                                        id="origin" 
                                        value={genealogySettings.origin} 
                                        onChange={(e) => { 
                                            setGenealogySettings({ ...genealogySettings, origin: e.target.value }); 
                                            setHasChanges(true); 
                                        }} 
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <label htmlFor="foundingYear" style={{ fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>Năm bắt đầu</label>
                                    <FieldInput 
                                        id="foundingYear" 
                                        value={genealogySettings.foundingYear} 
                                        onChange={(e) => { 
                                            setGenealogySettings({ ...genealogySettings, foundingYear: e.target.value }); 
                                            setHasChanges(true); 
                                        }} 
                                    />
                                </div>
                            </div>

                            <Separator style={{ margin: '16px 0' }} />

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <div style={{ fontWeight: '600', marginBottom: '8px' }}>Ảnh bìa gia phả</div>
                                <div style={{
                                    height: '120px',
                                    borderRadius: '12px',
                                    border: '2px dashed #fcd34d',
                                    background: '#fffbeb',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#b45309',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    gap: '8px'
                                }}>
                                    <i className="bi-image" style={{ fontSize: '24px', color: '#f59e0b' }} />
                                    <div style={{ fontSize: '14px', fontWeight: '500' }}>Nhấp để tải ảnh bìa lên</div>
                                    <div style={{ fontSize: '12px', opacity: 0.8 }}>PNG, JPG tối đa 5MB</div>
                                </div>
                            </div>
                        </Card>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '24px', flexWrap: 'wrap' }}>
                            <OutlineButton onClick={() => setHasChanges(false)}>Hủy</OutlineButton>
                            <PrimaryButton onClick={handleSave}>Lưu thay đổi</PrimaryButton>
                        </div>
                    </TabsContent>

                    <TabsContent value="privacy" style={styles.tabContent} className="tab-content-animation" key={`privacy-${tabContentKey}`}>
                        <Card style={styles.card}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                <div style={{ padding: '8px', borderRadius: '10px', background: 'linear-gradient(135deg, #f59e0b, #fbbf24)', color: '#fff' }}>
                                    <i className="bi-shield-lock" />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Quyền riêng tư</h3>
                                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Kiểm soát ai có thể xem và tương tác với gia phả</div>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gap: '12px' }}>
                                <RowToggle
                                    icon={<i className="bi-globe" style={{ color: '#b45309' }} />}
                                    title="Chế độ công khai"
                                    description="Cho phép mọi người tìm thấy và xem gia phả của bạn"
                                    checked={genealogySettings.isPublic}
                                    onChange={(v) => { setGenealogySettings({ ...genealogySettings, isPublic: v }); setHasChanges(true); }}
                                    highlighted
                                />
                                <RowToggle
                                    icon={<i className="bi-search" style={{ color: '#b45309' }} />}
                                    title="Cho phép tìm kiếm"
                                    description="Gia phả có thể được tìm thấy trong kết quả tìm kiếm"
                                    checked={genealogySettings.allowSearch}
                                    onChange={(v) => { setGenealogySettings({ ...genealogySettings, allowSearch: v }); setHasChanges(true); }}
                                />
                                <RowToggle
                                    icon={<i className="bi-eye" style={{ color: '#b45309' }} />}
                                    title="Hiển thị thông tin liên hệ"
                                    description="Cho phép người xem thấy email và số điện thoại của thành viên"
                                    checked={genealogySettings.showContact}
                                    onChange={(v) => { setGenealogySettings({ ...genealogySettings, showContact: v }); setHasChanges(true); }}
                                />
                            </div>
                        </Card>

                        <Card style={styles.card}>
                            <h3 style={{ marginTop: 0, marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>Quyền chỉnh sửa</h3>
                            <div style={{ display: 'grid', gap: '12px' }}>
                                <RowToggle
                                    title="Cho phép đề xuất chỉnh sửa"
                                    description="Thành viên có thể gửi đề xuất thay đổi thông tin"
                                    checked={privacy.allowEditSuggestions}
                                    onChange={(v) => { setPrivacy({ ...privacy, allowEditSuggestions: v }); setHasChanges(true); }}
                                />
                                <RowToggle
                                    title="Tự động duyệt đề xuất từ quản trị viên"
                                    description="Đề xuất từ quản trị viên được tự động chấp nhận"
                                    checked={privacy.autoApproveAdmins}
                                    onChange={(v) => { setPrivacy({ ...privacy, autoApproveAdmins: v }); setHasChanges(true); }}
                                />
                            </div>
                        </Card>

                        <div style={styles.buttonGroup}>
                            <OutlineButton onClick={() => setHasChanges(false)}>Hủy</OutlineButton>
                            <PrimaryButton onClick={handleSave}>Lưu thay đổi</PrimaryButton>
                        </div>
                    </TabsContent>

                    <TabsContent value="notifications" style={styles.tabContent} className="tab-content-animation" key={`notifications-${tabContentKey}`}>
                        <Card style={styles.card}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                <div style={{ padding: '8px', borderRadius: '10px', background: 'linear-gradient(135deg, #f59e0b, #fbbf24)', color: '#fff' }}>
                                    <i className="bi-bell" />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Thông báo email</h3>
                                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Nhận thông báo qua email về các hoạt động</div>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gap: '12px' }}>
                                <RowToggle 
                                    title="Thành viên mới" 
                                    description="Nhận email khi có thành viên mới tham gia gia phả" 
                                    checked={notifications.emailNewMember} 
                                    onChange={(v) => { setNotifications({ ...notifications, emailNewMember: v }); setHasChanges(true); }} 
                                />
                                <RowToggle 
                                    title="Đề xuất chỉnh sửa" 
                                    description="Nhận email khi có đề xuất chỉnh sửa thông tin mới" 
                                    checked={notifications.emailEditSuggestion} 
                                    onChange={(v) => { setNotifications({ ...notifications, emailEditSuggestion: v }); setHasChanges(true); }} 
                                />
                                <RowToggle 
                                    title="Sự kiện sắp tới" 
                                    description="Nhắc nhở về sinh nhật, ngày giỗ và các sự kiện quan trọng" 
                                    checked={notifications.emailEvents} 
                                    onChange={(v) => { setNotifications({ ...notifications, emailEvents: v }); setHasChanges(true); }} 
                                />
                                <RowToggle 
                                    title="Hoạt động diễn đàn" 
                                    description="Thông báo về bình luận và câu trả lời trong diễn đàn" 
                                    checked={notifications.emailForum} 
                                    onChange={(v) => { setNotifications({ ...notifications, emailForum: v }); setHasChanges(true); }} 
                                />
                                <RowToggle 
                                    title="Tổng hợp hàng ngày" 
                                    description="Nhận email tổng hợp các hoạt động trong ngày" 
                                    checked={notifications.dailyDigest} 
                                    onChange={(v) => { setNotifications({ ...notifications, dailyDigest: v }); setHasChanges(true); }} 
                                    highlighted 
                                />
                            </div>
                        </Card>

                        <Card style={styles.card}>
                            <h3 style={{ marginTop: 0, marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>Thông báo trong ứng dụng</h3>
                            <div style={{ display: 'grid', gap: '12px' }}>
                                <RowToggle 
                                    title="Thông báo push" 
                                    description="Nhận thông báo ngay trên trình duyệt" 
                                    checked={notifications.pushNotifications} 
                                    onChange={(v) => { setNotifications({ ...notifications, pushNotifications: v }); setHasChanges(true); }} 
                                />
                                <RowToggle 
                                    title="Âm thanh thông báo" 
                                    description="Phát âm thanh khi có thông báo mới" 
                                    checked={notifications.soundEnabled} 
                                    onChange={(v) => { setNotifications({ ...notifications, soundEnabled: v }); setHasChanges(true); }} 
                                />
                            </div>
                        </Card>

                        <div style={styles.buttonGroup}>
                            <OutlineButton onClick={() => setHasChanges(false)}>Hủy</OutlineButton>
                            <PrimaryButton onClick={handleSave}>Lưu thay đổi</PrimaryButton>
                        </div>
                    </TabsContent>

                    <TabsContent value="members" style={styles.tabContent} className="tab-content-animation" key={`members-${tabContentKey}`}>
                        <Card style={styles.card}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                <div style={{ padding: '8px', borderRadius: '10px', background: 'linear-gradient(135deg, #f59e0b, #fbbf24)', color: '#fff' }}>
                                    <i className="bi-people" />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Quyền thành viên</h3>
                                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Quản lý quyền và phê duyệt thành viên</div>
                                </div>
                            </div>

                            <div style={styles.formField}>
                                <label style={styles.label}>Quyền mặc định cho thành viên mới</label>
                                <div style={{ position: 'relative' }} data-dropdown>
                                    <button 
                                        onClick={() => {
                                            setShowMemberRoleDropdown(!showMemberRoleDropdown);
                                            setShowLanguageDropdown(false);
                                            setShowDateFormatDropdown(false);
                                            setShowTimezoneDropdown(false);
                                        }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            height: '40px',
                                            width: '100%',
                                            borderRadius: '8px',
                                            border: '1px solid #fde68a',
                                            background: '#fff',
                                            padding: '0 12px',
                                            fontSize: '14px',
                                            cursor: 'pointer',
                                            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        <span>
                                            {defaultMemberRole === 'admin' && (
                                                <><i className="bi-award" style={{ marginRight: '8px', color: '#b45309' }} /> Quản trị viên</>
                                            )}
                                            {defaultMemberRole === 'member' && (
                                                <><i className="bi-person" style={{ marginRight: '8px', color: '#3b82f6' }} /> Thành viên</>
                                            )}
                                            {defaultMemberRole === 'viewer' && (
                                                <><i className="bi-eye" style={{ marginRight: '8px', color: '#6b7280' }} /> Người xem</>
                                            )}
                                        </span>
                                        <i className={`bi-chevron-${showMemberRoleDropdown ? 'up' : 'down'}`} />
                                    </button>
                                    {showMemberRoleDropdown && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '100%',
                                            left: 0,
                                            right: 0,
                                            background: '#fff',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '8px',
                                            boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                                            zIndex: 50,
                                            marginTop: '4px'
                                        }}>
                                            <div 
                                                className="dropdown-option"
                                                onClick={() => { setDefaultMemberRole('admin'); setShowMemberRoleDropdown(false); setHasChanges(true); }}
                                                style={{
                                                    padding: '8px 12px',
                                                    cursor: 'pointer',
                                                    fontSize: '14px',
                                                    borderBottom: '1px solid #f3f4f6',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                            >
                                                <i className="bi-award" style={{ color: '#b45309' }} /> Quản trị viên
                                            </div>
                                            <div 
                                                className="dropdown-option"
                                                onClick={() => { setDefaultMemberRole('member'); setShowMemberRoleDropdown(false); setHasChanges(true); }}
                                                style={{
                                                    padding: '8px 12px',
                                                    cursor: 'pointer',
                                                    fontSize: '14px',
                                                    borderBottom: '1px solid #f3f4f6',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                            >
                                                <i className="bi-person" style={{ color: '#3b82f6' }} /> Thành viên
                                            </div>
                                            <div 
                                                className="dropdown-option"
                                                onClick={() => { setDefaultMemberRole('viewer'); setShowMemberRoleDropdown(false); setHasChanges(true); }}
                                                style={{
                                                    padding: '8px 12px',
                                                    cursor: 'pointer',
                                                    fontSize: '14px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                            >
                                                <i className="bi-eye" style={{ color: '#6b7280' }} /> Người xem
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <Separator style={{ margin: '16px 0' }} />

                            <div style={{ display: 'grid', gap: '12px' }}>
                                <RowToggle 
                                    title="Yêu cầu phê duyệt" 
                                    description="Thành viên mới cần được phê duyệt trước khi tham gia" 
                                    checked={privacy.requireApproval} 
                                    onChange={(v) => { setPrivacy({ ...privacy, requireApproval: v }); setHasChanges(true); }} 
                                />
                                <RowToggle 
                                    title="Cho phép thành viên mời người khác" 
                                    description="Thành viên có thể gửi lời mời tham gia gia phả" 
                                    checked={privacy.allowInvites} 
                                    onChange={(v) => { setPrivacy({ ...privacy, allowInvites: v }); setHasChanges(true); }} 
                                />
                            </div>
                        </Card>

                        <div style={styles.buttonGroup}>
                            <OutlineButton onClick={() => setHasChanges(false)}>Hủy</OutlineButton>
                            <PrimaryButton onClick={handleSave}>Lưu thay đổi</PrimaryButton>
                        </div>
                    </TabsContent>

                    <TabsContent value="appearance" style={styles.tabContent} className="tab-content-animation" key={`appearance-${tabContentKey}`}>
                        <Card style={styles.card}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                <div style={{ padding: '8px', borderRadius: '10px', background: 'linear-gradient(135deg, #f59e0b, #fbbf24)', color: '#fff' }}>
                                    <i className="bi-palette" />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Giao diện</h3>
                                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Tùy chỉnh giao diện và ngôn ngữ</div>
                                </div>
                            </div>

                            <div>
                                <div style={{ fontWeight: '600', marginBottom: '8px' }}>Chủ đề màu</div>
                                <div style={styles.themeGrid}>
                                    {themes.map((theme) => (
                                        <button 
                                            key={theme.id} 
                                            onClick={() => handleThemeChange(theme.id)}
                                            style={{
                                                ...styles.themeCard,
                                                ...(theme.active ? styles.themeCardActive : {})
                                            }}
                                        >
                                            <div style={{ ...styles.themePreview, background: theme.gradient }} />
                                            <div style={styles.themeName}>{theme.name}</div>
                                            {theme.active && (
                                                <div style={styles.activeBadge}>Đang dùng</div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <Separator style={{ margin: '16px 0' }} />

                            <div style={styles.formGrid}>
                                <div style={styles.formField}>
                                    <label htmlFor="language" style={styles.label}>Ngôn ngữ</label>
                                    <div style={{ position: 'relative' }} data-dropdown>
                                        <button 
                                            onClick={() => {
                                                setShowLanguageDropdown(!showLanguageDropdown);
                                                setShowMemberRoleDropdown(false);
                                                setShowDateFormatDropdown(false);
                                                setShowTimezoneDropdown(false);
                                            }}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                height: '40px',
                                                width: '100%',
                                                borderRadius: '8px',
                                                border: '1px solid #fde68a',
                                                background: '#fff',
                                                padding: '0 12px',
                                                fontSize: '14px',
                                                cursor: 'pointer',
                                                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)',
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            <span>
                                                {language === 'vi' && '🇻🇳 Tiếng Việt'}
                                                {language === 'en' && '🇬🇧 English'}
                                                {language === 'fr' && '🇫🇷 Français'}
                                                {language === 'zh' && '🇨🇳 中文'}
                                            </span>
                                            <i className={`bi-chevron-${showLanguageDropdown ? 'up' : 'down'}`} />
                                        </button>
                                        {showLanguageDropdown && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '100%',
                                                left: 0,
                                                right: 0,
                                                background: '#fff',
                                                border: '1px solid #e5e7eb',
                                                borderRadius: '8px',
                                                boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                                                zIndex: 50,
                                                marginTop: '4px'
                                            }}>
                                                <div 
                                                    className="dropdown-option"
                                                    onClick={() => { setLanguage('vi'); setShowLanguageDropdown(false); setHasChanges(true); }}
                                                    style={{
                                                        padding: '8px 12px',
                                                        cursor: 'pointer',
                                                        fontSize: '14px',
                                                        borderBottom: '1px solid #f3f4f6'
                                                    }}
                                                    onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                                >
                                                    🇻🇳 Tiếng Việt
                                                </div>
                                                <div 
                                                    className="dropdown-option"
                                                    onClick={() => { setLanguage('en'); setShowLanguageDropdown(false); setHasChanges(true); }}
                                                    style={{
                                                        padding: '8px 12px',
                                                        cursor: 'pointer',
                                                        fontSize: '14px',
                                                        borderBottom: '1px solid #f3f4f6'
                                                    }}
                                                    onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                                >
                                                    🇬🇧 English
                                                </div>
                                                <div 
                                                    className="dropdown-option"
                                                    onClick={() => { setLanguage('fr'); setShowLanguageDropdown(false); setHasChanges(true); }}
                                                    style={{
                                                        padding: '8px 12px',
                                                        cursor: 'pointer',
                                                        fontSize: '14px',
                                                        borderBottom: '1px solid #f3f4f6'
                                                    }}
                                                    onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                                >
                                                    🇫🇷 Français
                                                </div>
                                                <div 
                                                    className="dropdown-option"
                                                    onClick={() => { setLanguage('zh'); setShowLanguageDropdown(false); setHasChanges(true); }}
                                                    style={{
                                                        padding: '8px 12px',
                                                        cursor: 'pointer',
                                                        fontSize: '14px'
                                                    }}
                                                    onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                                >
                                                    🇨🇳 中文
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div style={styles.formField}>
                                    <label htmlFor="date-format" style={styles.label}>Định dạng ngày</label>
                                    <div style={{ position: 'relative' }} data-dropdown>
                                        <button 
                                            onClick={() => {
                                                setShowDateFormatDropdown(!showDateFormatDropdown);
                                                setShowMemberRoleDropdown(false);
                                                setShowLanguageDropdown(false);
                                                setShowTimezoneDropdown(false);
                                            }}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                height: '40px',
                                                width: '100%',
                                                borderRadius: '8px',
                                                border: '1px solid #fde68a',
                                                background: '#fff',
                                                padding: '0 12px',
                                                fontSize: '14px',
                                                cursor: 'pointer',
                                                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)',
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            <span>
                                                {dateFormat === 'dd/mm/yyyy' && 'DD/MM/YYYY'}
                                                {dateFormat === 'mm/dd/yyyy' && 'MM/DD/YYYY'}
                                                {dateFormat === 'yyyy-mm-dd' && 'YYYY-MM-DD'}
                                            </span>
                                            <i className={`bi-chevron-${showDateFormatDropdown ? 'up' : 'down'}`} />
                                        </button>
                                        {showDateFormatDropdown && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '100%',
                                                left: 0,
                                                right: 0,
                                                background: '#fff',
                                                border: '1px solid #e5e7eb',
                                                borderRadius: '8px',
                                                boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                                                zIndex: 50,
                                                marginTop: '4px'
                                            }}>
                                                <div 
                                                    className="dropdown-option"
                                                    onClick={() => { setDateFormat('dd/mm/yyyy'); setShowDateFormatDropdown(false); setHasChanges(true); }}
                                                    style={{
                                                        padding: '8px 12px',
                                                        cursor: 'pointer',
                                                        fontSize: '14px',
                                                        borderBottom: '1px solid #f3f4f6'
                                                    }}
                                                    onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                                >
                                                    DD/MM/YYYY
                                                </div>
                                                <div 
                                                    className="dropdown-option"
                                                    onClick={() => { setDateFormat('mm/dd/yyyy'); setShowDateFormatDropdown(false); setHasChanges(true); }}
                                                    style={{
                                                        padding: '8px 12px',
                                                        cursor: 'pointer',
                                                        fontSize: '14px',
                                                        borderBottom: '1px solid #f3f4f6'
                                                    }}
                                                    onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                                >
                                                    MM/DD/YYYY
                                                </div>
                                                <div 
                                                    className="dropdown-option"
                                                    onClick={() => { setDateFormat('yyyy-mm-dd'); setShowDateFormatDropdown(false); setHasChanges(true); }}
                                                    style={{
                                                        padding: '8px 12px',
                                                        cursor: 'pointer',
                                                        fontSize: '14px'
                                                    }}
                                                    onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                                >
                                                    YYYY-MM-DD
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div style={styles.formField}>
                                <label htmlFor="timezone" style={styles.label}>Múi giờ</label>
                                <div style={{ position: 'relative' }} data-dropdown>
                                    <button 
                                        onClick={() => {
                                            setShowTimezoneDropdown(!showTimezoneDropdown);
                                            setShowMemberRoleDropdown(false);
                                            setShowLanguageDropdown(false);
                                            setShowDateFormatDropdown(false);
                                        }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            height: '40px',
                                            width: '100%',
                                            borderRadius: '8px',
                                            border: '1px solid #fde68a',
                                            background: '#fff',
                                            padding: '0 12px',
                                            fontSize: '14px',
                                            cursor: 'pointer',
                                            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        <span>
                                            {timezone === 'asia-ho-chi-minh' && '(GMT+7) Hà Nội, Hồ Chí Minh'}
                                            {timezone === 'asia-bangkok' && '(GMT+7) Bangkok'}
                                            {timezone === 'asia-tokyo' && '(GMT+9) Tokyo'}
                                            {timezone === 'asia-shanghai' && '(GMT+8) Bắc Kinh, Thượng Hải'}
                                        </span>
                                        <i className={`bi-chevron-${showTimezoneDropdown ? 'up' : 'down'}`} />
                                    </button>
                                    {showTimezoneDropdown && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '100%',
                                            left: 0,
                                            right: 0,
                                            background: '#fff',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '8px',
                                            boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                                            zIndex: 50,
                                            marginTop: '4px'
                                        }}>
                                            <div 
                                                className="dropdown-option"
                                                onClick={() => { setTimezone('asia-ho-chi-minh'); setShowTimezoneDropdown(false); setHasChanges(true); }}
                                                style={{
                                                    padding: '8px 12px',
                                                    cursor: 'pointer',
                                                    fontSize: '14px',
                                                    borderBottom: '1px solid #f3f4f6'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                            >
                                                (GMT+7) Hà Nội, Hồ Chí Minh
                                            </div>
                                            <div 
                                                className="dropdown-option"
                                                onClick={() => { setTimezone('asia-bangkok'); setShowTimezoneDropdown(false); setHasChanges(true); }}
                                                style={{
                                                    padding: '8px 12px',
                                                    cursor: 'pointer',
                                                    fontSize: '14px',
                                                    borderBottom: '1px solid #f3f4f6'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                            >
                                                (GMT+7) Bangkok
                                            </div>
                                            <div 
                                                className="dropdown-option"
                                                onClick={() => { setTimezone('asia-tokyo'); setShowTimezoneDropdown(false); setHasChanges(true); }}
                                                style={{
                                                    padding: '8px 12px',
                                                    cursor: 'pointer',
                                                    fontSize: '14px',
                                                    borderBottom: '1px solid #f3f4f6'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                            >
                                                (GMT+9) Tokyo
                                            </div>
                                            <div 
                                                className="dropdown-option"
                                                onClick={() => { setTimezone('asia-shanghai'); setShowTimezoneDropdown(false); setHasChanges(true); }}
                                                style={{
                                                    padding: '8px 12px',
                                                    cursor: 'pointer',
                                                    fontSize: '14px'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                            >
                                                (GMT+8) Bắc Kinh, Thượng Hải
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>

                        <div style={styles.buttonGroup}>
                            <OutlineButton onClick={() => setHasChanges(false)}>Hủy</OutlineButton>
                            <PrimaryButton onClick={handleSave}>Lưu thay đổi</PrimaryButton>
                        </div>
                    </TabsContent>

                    <TabsContent value="security" style={styles.tabContent} className="tab-content-animation" key={`security-${tabContentKey}`}>
                        <Card style={styles.card}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                <div style={{ padding: '8px', borderRadius: '10px', background: 'linear-gradient(135deg, #f59e0b, #fbbf24)', color: '#fff' }}>
                                    <i className="bi-shield-check" />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Bảo mật tài khoản</h3>
                                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Quản lý mật khẩu và bảo mật</div>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gap: '12px' }}>
                                <div style={styles.formField}>
                                    <label htmlFor="current-password" style={styles.label}>Mật khẩu hiện tại</label>
                                    <div style={{ position: 'relative' }}>
                                        <FieldInput 
                                            id="current-password" 
                                            type={showPassword ? 'text' : 'password'} 
                                        />
                                        <button 
                                            onClick={() => setShowPassword(!showPassword)} 
                                            style={{ 
                                                position: 'absolute', 
                                                right: '8px', 
                                                top: '50%', 
                                                transform: 'translateY(-50%)', 
                                                border: 'none', 
                                                background: 'transparent', 
                                                cursor: 'pointer',
                                                padding: '4px'
                                            }}
                                        >
                                            <i className={showPassword ? 'bi-eye-slash' : 'bi-eye'} />
                                        </button>
                                    </div>
                                </div>
                                <div style={styles.formField}>
                                    <label htmlFor="new-password" style={styles.label}>Mật khẩu mới</label>
                                    <FieldInput id="new-password" type="password" />
                                </div>
                                <div style={styles.formField}>
                                    <label htmlFor="confirm-password" style={styles.label}>Xác nhận mật khẩu mới</label>
                                    <FieldInput id="confirm-password" type="password" />
                                </div>
                                <div style={styles.passwordRequirements}>
                                    Mật khẩu phải có ít nhất 8 ký tự, 1 chữ hoa, 1 chữ số và 1 ký tự đặc biệt.
                                </div>
                            </div>

                            <OutlineButton 
                                onClick={() => alert('Đã cập nhật mật khẩu!')} 
                                style={{ marginTop: '12px', width: '100%' }}
                            >
                                Đổi mật khẩu
                            </OutlineButton>

                            <Separator style={{ margin: '16px 0' }} />

                            <div>
                                <h4 style={{ marginTop: 0, marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>Phiên đăng nhập</h4>
                                <div style={{ display: 'grid', gap: '12px' }}>
                                    <div style={styles.sessionItem}>
                                        <div style={styles.sessionInfo}>
                                            <div style={styles.sessionTitle}>Chrome trên Windows</div>
                                            <div style={styles.sessionDetails}>Hà Nội, Việt Nam • Hiện tại</div>
                                        </div>
                                        <div style={styles.sessionStatus}>Đang hoạt động</div>
                                    </div>
                                    <div style={styles.sessionItem}>
                                        <div style={styles.sessionInfo}>
                                            <div style={styles.sessionTitle}>Safari trên iPhone</div>
                                            <div style={styles.sessionDetails}>Hà Nội, Việt Nam • 2 ngày trước</div>
                                        </div>
                                        <DangerButton size="sm">Đăng xuất</DangerButton>
                                    </div>
                                </div>
                            </div>

                            <DangerButton 
                                style={{ marginTop: '12px', width: '100%' }}
                            >
                                Đăng xuất tất cả thiết bị khác
                            </DangerButton>
                        </Card>

                        <div style={styles.buttonGroup}>
                            <PrimaryButton onClick={handleSave}>Lưu thay đổi</PrimaryButton>
                        </div>
                    </TabsContent>

                    <TabsContent value="advanced" style={styles.tabContent} className="tab-content-animation" key={`advanced-${tabContentKey}`}>
                        <Card style={styles.card}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                <div style={{ padding: '8px', borderRadius: '10px', background: 'linear-gradient(135deg, #f59e0b, #fbbf24)', color: '#fff' }}>
                                    <i className="bi-hdd" />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Sao lưu & Khôi phục</h3>
                                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Quản lý dữ liệu gia phả của bạn</div>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gap: '12px' }}>
                                <div style={styles.backupCard}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <i className="bi-hdd" style={{ color: '#b45309' }} />
                                                <div>
                                                    <div style={{ fontWeight: '600' }}>Sao lưu tự động</div>
                                                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Lần cuối: Hôm nay lúc 03:00 AM</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ background: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: '999px', fontSize: '12px' }}>Đang bật</div>
                                    </div>
                                    <OutlineButton style={{ width: '100%' }}>Tải xuống bản sao lưu</OutlineButton>
                                </div>

                                <div style={{ padding: '16px', borderRadius: '12px', border: '1px solid #e5e7eb', background: '#fff' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                        <i className="bi-upload" style={{ color: '#b45309' }} />
                                        <div>
                                            <div style={{ fontWeight: '600' }}>Khôi phục dữ liệu</div>
                                            <div style={{ fontSize: '12px', color: '#6b7280' }}>Nhập dữ liệu từ file sao lưu</div>
                                        </div>
                                    </div>
                                    <OutlineButton style={{ width: '100%' }}>Chọn file để khôi phục</OutlineButton>
                                </div>

                                <div style={{ padding: '16px', borderRadius: '12px', border: '1px solid #e5e7eb', background: '#fff' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                        <i className="bi-download" style={{ color: '#b45309' }} />
                                        <div>
                                            <div style={{ fontWeight: '600' }}>Xuất dữ liệu</div>
                                            <div style={{ fontSize: '12px', color: '#6b7280' }}>Tải xuống tất cả dữ liệu dưới dạng JSON</div>
                                        </div>
                                    </div>
                                    <OutlineButton style={{ width: '100%' }}>Xuất dữ liệu</OutlineButton>
                                </div>
                            </div>
                        </Card>

                        <Card style={styles.dangerCard}>
                            <div style={styles.dangerHeader}>
                                <div style={styles.dangerIcon}>
                                    <i className="bi-exclamation-triangle" />
                                </div>
                                <div>
                                    <h3 style={styles.dangerTitle}>Vùng nguy hiểm</h3>
                                    <div style={styles.dangerDescription}>Các hành động này không thể hoàn tác</div>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gap: '8px' }}>
                                <DangerButton style={{ width: '100%' }}>Xóa gia phả</DangerButton>
                                <DangerButton style={{ width: '100%' }}>Xóa tài khoản</DangerButton>
                            </div>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

export default Settings;