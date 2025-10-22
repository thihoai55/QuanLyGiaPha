import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import FamilyTree from '../components/FamilyTree';
import Footer from '../components/Footer';
import PricingPopup from '../components/PricingPopup';
import Members from '../components/Members';
import DienDan from '../components/diendan';
import SuKien from '../components/SuKien';
import KhamPha from '../components/KhamPha';
import Settings from '../components/Settings';
import Album from '../components/Album';

function Dashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showPricingPopup, setShowPricingPopup] = useState(false);
    const [treeZoom, setTreeZoom] = useState(0.6);

    // Add CSS animations for the statistics bars and pulse effect
    React.useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn0 { to { width: 5%; } }
            @keyframes slideIn1 { to { width: 15%; } }
            @keyframes slideIn2 { to { width: 35%; } }
            @keyframes slideIn3 { to { width: 60%; } }
            @keyframes slideIn4 { to { width: 85%; } }
            @keyframes slideIn5 { to { width: 70%; } }
            @keyframes slideIn6 { to { width: 30%; } }
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes bubbleFloat1 {
                0% { transform: translate(0px, 0px) scale(0.5); opacity: 0; }
                25% { transform: translate(20px, -30px) scale(0.8); opacity: 0.8; }
                50% { transform: translate(-15px, -50px) scale(1); opacity: 1; }
                75% { transform: translate(30px, -20px) scale(0.9); opacity: 0.7; }
                100% { transform: translate(0px, 0px) scale(0.5); opacity: 0; }
            }
            @keyframes bubbleFloat2 {
                0% { transform: translate(0px, 0px) scale(0.3); opacity: 0; }
                20% { transform: translate(-25px, -20px) scale(0.6); opacity: 0.6; }
                40% { transform: translate(15px, -40px) scale(0.9); opacity: 0.9; }
                60% { transform: translate(-10px, -60px) scale(1.1); opacity: 1; }
                80% { transform: translate(20px, -30px) scale(0.7); opacity: 0.5; }
                100% { transform: translate(0px, 0px) scale(0.3); opacity: 0; }
            }
            @keyframes bubbleFloat3 {
                0% { transform: translate(0px, 0px) scale(0.4); opacity: 0; }
                30% { transform: translate(35px, -25px) scale(0.7); opacity: 0.7; }
                60% { transform: translate(-20px, -45px) scale(1.2); opacity: 1; }
                90% { transform: translate(10px, -15px) scale(0.6); opacity: 0.4; }
                100% { transform: translate(0px, 0px) scale(0.4); opacity: 0; }
            }
            @keyframes bubbleFloat4 {
                0% { transform: translate(0px, 0px) scale(0.6); opacity: 0; }
                15% { transform: translate(-30px, -35px) scale(0.8); opacity: 0.8; }
                45% { transform: translate(25px, -55px) scale(1.1); opacity: 1; }
                75% { transform: translate(-15px, -25px) scale(0.9); opacity: 0.6; }
                100% { transform: translate(0px, 0px) scale(0.6); opacity: 0; }
            }
            .bubble {
                position: absolute !important;
                border-radius: 50% !important;
                background: linear-gradient(135deg, rgba(245, 158, 11, 0.8), rgba(220, 38, 38, 0.8)) !important;
                pointer-events: none !important;
                z-index: 1 !important;
                box-shadow: 0 0 20px rgba(245, 158, 11, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.3) !important;
                border: 2px solid rgba(255, 255, 255, 0.4) !important;
            }
            .bubble:nth-child(1) { left: 5%; top: 80%; width: 30px; height: 30px; animation: bubbleFloat1 6s infinite ease-in-out; animation-delay: 0s; }
            .bubble:nth-child(2) { left: 15%; top: 70%; width: 25px; height: 25px; animation: bubbleFloat2 8s infinite ease-in-out; animation-delay: 1s; }
            .bubble:nth-child(3) { left: 25%; top: 85%; width: 35px; height: 35px; animation: bubbleFloat3 7s infinite ease-in-out; animation-delay: 2s; }
            .bubble:nth-child(4) { left: 40%; top: 75%; width: 28px; height: 28px; animation: bubbleFloat4 5s infinite ease-in-out; animation-delay: 0.5s; }
            .bubble:nth-child(5) { left: 55%; top: 90%; width: 32px; height: 32px; animation: bubbleFloat1 9s infinite ease-in-out; animation-delay: 1.5s; }
            .bubble:nth-child(6) { left: 70%; top: 65%; width: 26px; height: 26px; animation: bubbleFloat2 6.5s infinite ease-in-out; animation-delay: 2.5s; }
            .bubble:nth-child(7) { left: 85%; top: 80%; width: 30px; height: 30px; animation: bubbleFloat3 8.5s infinite ease-in-out; animation-delay: 3s; }
            .bubble:nth-child(8) { left: 10%; top: 60%; width: 24px; height: 24px; animation: bubbleFloat4 7.5s infinite ease-in-out; animation-delay: 0.8s; }
            .bubble:nth-child(9) { left: 30%; top: 95%; width: 38px; height: 38px; animation: bubbleFloat1 5.5s infinite ease-in-out; animation-delay: 1.2s; }
            .bubble:nth-child(10) { left: 60%; top: 55%; width: 22px; height: 22px; animation: bubbleFloat2 9.5s infinite ease-in-out; animation-delay: 2.2s; }
            .bubble:nth-child(11) { left: 80%; top: 70%; width: 34px; height: 34px; animation: bubbleFloat3 6.8s infinite ease-in-out; animation-delay: 0.3s; }
            .bubble:nth-child(12) { left: 45%; top: 85%; width: 20px; height: 20px; animation: bubbleFloat4 8.2s infinite ease-in-out; animation-delay: 1.8s; }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    // Get user info from localStorage
    const getUserInfo = () => {
        // Set sample data if not exists
        if (!localStorage.getItem('userName')) {
            localStorage.setItem('userName', 'Nguyễn Văn Admin');
        }
        if (!localStorage.getItem('userRole')) {
            localStorage.setItem('userRole', 'Quản trị viên');
        }
        if (!localStorage.getItem('lastLogin')) {
            // Set last login to 2 hours ago for testing
            const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
            localStorage.setItem('lastLogin', twoHoursAgo.toISOString());
        }

        const userName = localStorage.getItem('userName') || 'Người dùng';
        const userRole = localStorage.getItem('userRole') || 'Thành viên';
        const lastLogin = localStorage.getItem('lastLogin');

        return {
            userName,
            userRole,
            lastLogin: lastLogin ? new Date(lastLogin) : new Date()
        };
    };

    // Format last update time
    const formatLastUpdate = (date) => {
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) {
            return `${diffMins} phút trước`;
        } else if (diffHours < 24) {
            return `${diffHours} giờ trước`;
        } else if (diffDays === 1) {
            return 'Hôm qua';
        } else if (diffDays < 7) {
            return `${diffDays} ngày trước`;
        } else {
            return date.toLocaleDateString('vi-VN');
        }
    };

    const userInfo = getUserInfo();

    // Debug log
    console.log('User Info:', userInfo);
    console.log('Formatted time:', formatLastUpdate(userInfo.lastLogin));

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        localStorage.removeItem('userRole');
        localStorage.removeItem('lastLogin');
        window.location.href = '/';
    };

    return (
        <div style={{ minHeight: '100vh', background: '#fafafa' }}>
            <Header />
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                handleLogout={handleLogout}
            />
            <div style={{ marginLeft: 280, marginTop: 70 }}>


                {activeTab === 'members' ? (
                    <Members />
                ) : activeTab === 'forum' ? (
                    <DienDan />
                ) : activeTab === 'events' ? (
                    <SuKien />
                ) : activeTab === 'family-tree' ? (
                    <FamilyTree />
                ) : activeTab === 'explore' ? (
                    <KhamPha />
                ) : activeTab === 'settings' ? (
                    <Settings />
                ) : activeTab === 'album' ? (
                    <Album />
                ) : (
                    <MainContent
                        userInfo={userInfo}
                        formatLastUpdate={formatLastUpdate}
                        setShowPricingPopup={setShowPricingPopup}
                        setActiveTab={setActiveTab}
                    />
                )}
                <Footer />
            </div>
            <PricingPopup
                showPricingPopup={showPricingPopup}
                setShowPricingPopup={setShowPricingPopup}
            />
        </div>
    );
}

export default Dashboard;