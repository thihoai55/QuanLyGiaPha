import React, { useMemo, useState } from 'react';
import { forumPosts, forumCategories, forumMembers } from '../data/forumData';
import { CreatePost } from './CreatePost';

const StatCard = ({ label, value, icon, gradient, onClick }) => (
    <div onClick={onClick} style={{ background: '#fff', border: '1px solid #f5d08a', borderRadius: 12, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', cursor: onClick ? 'pointer' : 'default', transition: 'transform .15s ease' }}
        onMouseEnter={(e) => { if (onClick) e.currentTarget.style.transform = 'translateY(-2px)'; }}
        onMouseLeave={(e) => { if (onClick) e.currentTarget.style.transform = 'translateY(0)'; }}
    >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>
                {icon}
            </div>
            <div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{label}</div>
                <div style={{ fontSize: 22, fontWeight: 700 }}>{value}</div>
            </div>
        </div>
    </div>
);

const Badge = ({ children, tone = 'solid' }) => {
    const styles = tone === 'solid'
        ? { background: 'linear-gradient(135deg,#f59e0b,#dc2626)', color: '#fff', border: 'none' }
        : { background: '#fff', color: '#92400e', border: '1px solid #fbbf24' };
    return (
        <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 8px', borderRadius: 12, ...styles }}>
            {children}
        </span>
    );
};

const Icon = ({ name, size = 16, color = '#6b7280' }) => (
    <i className={`bi-${name}`} style={{ fontSize: size, color }} />
);

const PostCard = ({ post, pinned }) => (
    <div style={{
        background: pinned ? 'linear-gradient(90deg,#fff7ed,#fff1e6)' : '#fff',
        border: `1px solid ${pinned ? '#f59e0b55' : '#f3f4f6'}`,
        borderRadius: 14,
        padding: 18,
        boxShadow: pinned ? '0 6px 16px rgba(245,158,11,0.15)' : '0 2px 8px rgba(0,0,0,0.04)',
        cursor: 'pointer',
        transition: 'all .2s ease'
    }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
    >
        <div style={{ display: 'flex', gap: 14 }}>
            <div style={{ flexShrink: 0 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: pinned ? 'linear-gradient(135deg,#f59e0b,#dc2626)' : 'linear-gradient(135deg,#3b82f6,#7c3aed)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                    {post.authorAvatar}
                </div>
            </div>
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
                    {pinned && <Icon name="pin-angle-fill" size={14} color="#b45309" />}
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#111827' }}>{post.title}</div>
                    <Badge tone={pinned ? 'solid' : 'outline'}>{post.category}</Badge>
                    {post.isHot && (
                        <span style={{ background: 'linear-gradient(135deg,#fb923c,#ef4444)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 8px', borderRadius: 12, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                            <Icon name="graph-up" size={12} color="#fff" /> Hot
                        </span>
                    )}
                </div>
                <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 8 }}>{post.content}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: '#6b7280' }}>
                    <span style={{ color: '#92400e', fontWeight: 600 }}>{post.author}</span>
                    <span>•</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name="clock" size={12} /> {post.createdAt}</span>
                </div>
                {post.tags && post.tags.length > 0 && (
                    <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                        {post.tags.map((tag) => (
                            <span key={tag} style={{ fontSize: 11, color: '#92400e', border: '1px solid #fcd34d', padding: '2px 8px', borderRadius: 999 }}>#{tag}</span>
                        ))}
                    </div>
                )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10, minWidth: 140 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#6b7280', fontSize: 13 }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name="chat-dots" /> {post.replies}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name="hand-thumbs-up" /> {post.likes}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name="eye" /> {post.views}</span>
                </div>
            </div>
        </div>
    </div>
);

function DienDan() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [showFilter, setShowFilter] = useState(false);
    const [showSort, setShowSort] = useState(false);
    const [hotOnly, setHotOnly] = useState(false);
    const [sortBy, setSortBy] = useState('latest');
    const [showMembersModal, setShowMembersModal] = useState(false);
    const [postsModal, setPostsModal] = useState({ open: false, title: '', items: [] });
    const [showCreatePost, setShowCreatePost] = useState(false);

    const [posts, setPosts] = useState(() => forumPosts.slice());
    const categories = useMemo(() => forumCategories, []);

    const filteredByCategory = useMemo(() => {
        if (activeTab === 'all' || activeTab === 'members') return posts;
        return posts.filter(p => p.categoryId === activeTab);
    }, [posts, activeTab]);

    const searched = useMemo(() => {
        const q = (searchQuery || '').toLowerCase();
        return filteredByCategory.filter(p => p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q));
    }, [filteredByCategory, searchQuery]);

    const filteredPosts = useMemo(() => {
        let arr = hotOnly ? searched.filter(p => p.isHot) : searched.slice();
        switch (sortBy) {
            case 'views':
                arr.sort((a, b) => (b.views || 0) - (a.views || 0));
                break;
            case 'likes':
                arr.sort((a, b) => (b.likes || 0) - (a.likes || 0));
                break;
            case 'replies':
                arr.sort((a, b) => (b.replies || 0) - (a.replies || 0));
                break;
            default:
                arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        return arr;
    }, [searched, hotOnly, sortBy]);

    const pinnedPosts = filteredPosts.filter(p => p.isPinned);
    const regularPosts = filteredPosts.filter(p => !p.isPinned);

    return (
        <div style={{ padding: 32, background: '#fef3c7', minHeight: 'calc(100vh - 70px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, gap: 12, flexWrap: 'wrap' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg,#f59e0b,#dc2626)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name="chat-dots" size={22} color="#fff" />
                        </div>
                        <div style={{ fontSize: 24, fontWeight: 800, color: '#111827' }}>Diễn đàn cộng đồng</div>
                    </div>
                    <div style={{ color: '#6b7280', marginTop: 6, fontSize: 13 }}>Chia sẻ và thảo luận về gia phả, văn hóa dòng họ</div>
                </div>
                <button onClick={() => setShowCreatePost(true)} style={{ background: 'linear-gradient(90deg,#f59e0b,#fb923c)', color: '#fff', border: '1px solid #f59e0b', borderRadius: 10, padding: '10px 14px', cursor: 'pointer', fontWeight: 700 }}
                    onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.05)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.filter = 'none'; }}
                >
                    <span style={{ marginRight: 8 }}>＋</span> Tạo bài viết
                </button>
            </div>
            
            {/* Stat cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 16 }}>
                <StatCard label="Tổng bài viết" value={filteredByCategory.length.toString()} icon={<Icon name="chat-dots" color="#fff" />} gradient="linear-gradient(135deg,#60a5fa,#2563eb)" onClick={() => setPostsModal({ open: true, title: 'Tổng bài viết', items: filteredByCategory })} />
                <StatCard label="Thành viên" value={forumMembers.length.toString()} icon={<Icon name="people" color="#fff" />} gradient="linear-gradient(135deg,#34d399,#059669)" onClick={() => setShowMembersModal(true)} />
                <StatCard label="Bài hot" value={filteredByCategory.filter(p => p.isHot).length.toString()} icon={<Icon name="graph-up" color="#fff" />} gradient="linear-gradient(135deg,#fb923c,#ef4444)" onClick={() => setPostsModal({ open: true, title: 'Bài hot', items: filteredByCategory.filter(p => p.isHot) })} />
                <StatCard label="Hôm nay" value={filteredByCategory.filter(p => { const d = new Date(p.createdAt); const now = new Date(); return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate(); }).length.toString()} icon={<Icon name="clock" color="#fff" />} gradient="linear-gradient(135deg,#a78bfa,#7c3aed)" onClick={() => { const now = new Date(); const items = filteredByCategory.filter(p => { const d = new Date(p.createdAt); return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate(); }); setPostsModal({ open: true, title: 'Bài hôm nay', items }); }} />
            </div>

            {/* Search and filter */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: 240 }}>
                    <i className="bi-search" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                    <input
                        placeholder="Tìm kiếm bài viết, chủ đề..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ width: '95%', height: 40, padding: '0 12px 0 36px', borderRadius: 10, border: '1px solid #fbbf24', outline: 'none', background: '#fff'}}
                        onFocus={(e) => { e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.15)'; }}
                        onBlur={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
                    />
                </div>
                <div style={{ display: 'flex', gap: 12, position: 'relative' }}>
                    <button onClick={() => { setShowFilter(v => !v); setShowSort(false); }} style={{ border: '1px solid #fcd34d', background: '#fff', borderRadius: 10, padding: '8px 12px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                        <Icon name="funnel" /> <span style={{ marginLeft: 8 }}>Lọc</span>
                    </button>
                    <button onClick={() => { setShowSort(v => !v); setShowFilter(false); }} style={{ border: '1px solid #fcd34d', background: '#fff', borderRadius: 10, padding: '8px 12px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                        <Icon name="sort-down" /> <span style={{ marginLeft: 8 }}>Sắp xếp</span>
                    </button>
                    {showFilter && (
                        <div style={{ position: 'absolute', top: '120%', right: 0, background: '#fff', border: '1px solid #f3f4f6', borderRadius: 10, padding: 12, boxShadow: '0 8px 20px rgba(0,0,0,0.08)', minWidth: 220, zIndex: 5 }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#374151' }}>
                                <input type="checkbox" checked={hotOnly} onChange={(e) => setHotOnly(e.target.checked)} /> Chỉ bài hot
                            </label>
                        </div>
                    )}
                    {showSort && (
                        <div style={{ position: 'absolute', top: '120%', right: 0, background: '#fff', border: '1px solid #f3f4f6', borderRadius: 10, padding: 12, boxShadow: '0 8px 20px rgba(0,0,0,0.08)', minWidth: 220, zIndex: 5 }}>
                            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 6 }}>Sắp xếp theo</div>
                            {[
                                { id: 'latest', label: 'Mới nhất' },
                                { id: 'views', label: 'Lượt xem' },
                                { id: 'likes', label: 'Lượt thích' },
                                { id: 'replies', label: 'Trả lời' }
                            ].map(opt => (
                                <button key={opt.id} onClick={() => { setSortBy(opt.id); setShowSort(false); }} style={{ display: 'block', width: '100%', textAlign: 'left', background: sortBy === opt.id ? '#fef3c7' : '#fff', border: '1px solid #f3f4f6', color: '#374151', padding: '6px 8px', borderRadius: 8, marginBottom: 6, cursor: 'pointer' }}>
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div style={{ background: '#fff', border: '1px solid #f3f4f6', borderRadius: 12, padding: 8, display: 'flex', gap: 8, overflowX: 'auto' }}>
                {categories.filter(c => c.id !== 'members').map((c) => (
                    <button key={c.id} onClick={() => setActiveTab(c.id)} style={{ whiteSpace: 'nowrap', borderRadius: 10, border: activeTab === c.id ? '1px solid #fb923c' : '1px solid #e5e7eb', background: activeTab === c.id ? 'linear-gradient(90deg,#f59e0b,#fb923c)' : '#fff', color: activeTab === c.id ? '#fff' : '#374151', padding: '8px 12px', display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                        <Icon name={c.icon} color={activeTab === c.id ? '#fff' : '#6b7280'} />
                        {c.label}
                    </button>
                ))}
            </div>

            <div style={{ marginTop: 16, display: activeTab !== 'members' ? 'block' : 'none' }}>
                {pinnedPosts.length > 0 && (
                    <div style={{ marginBottom: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#b45309', margin: '8px 0' }}>
                            <Icon name="pin-angle-fill" /> <span style={{ fontSize: 12, color: '#6b7280' }}>Bài viết ghim</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {pinnedPosts.map((p) => (
                                <PostCard key={p.id} post={p} pinned />
                            ))}
                        </div>
                    </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {regularPosts.map((p) => (
                        <PostCard key={p.id} post={p} />
                    ))}
                </div>
            </div>

            {activeTab !== 'all' && activeTab !== 'members' && filteredPosts.length === 0 && (
                <div style={{ marginTop: 16 }}>
                    <div style={{ textAlign: 'center', padding: '48px 16px', background: '#fff7ed', border: '2px dashed #fde68a', color: '#d97706', borderRadius: 12 }}>
                        <Icon name="info-circle" size={24} color="#f59e0b" />
                        <div style={{ marginTop: 8, color: '#6b7280' }}>Hiển thị bài viết trong danh mục: <b>{categories.find(c => c.id === activeTab)?.label}</b></div>
                    </div>
                </div>
            )}

            {showMembersModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }} onClick={() => setShowMembersModal(false)}>
                    <div style={{ width: 'min(800px, 92vw)', maxHeight: '80vh', overflow: 'auto', background: '#fff', borderRadius: 14, border: '1px solid #f3f4f6', boxShadow: '0 12px 28px rgba(0,0,0,0.2)' }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ padding: 16, borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ fontWeight: 800, color: '#111827' }}>Thành viên tham gia diễn đàn</div>
                            <button onClick={() => setShowMembersModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Icon name="x-lg" /></button>
                        </div>
                        <div style={{ padding: 16, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                            {forumMembers.map((m) => (
                                <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 12, border: '1px solid #f3f4f6', borderRadius: 10, padding: 12 }}>
                                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#f59e0b,#dc2626)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{m.initials}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 700, color: '#111827' }}>{m.name}</div>
                                        <div style={{ fontSize: 12, color: '#6b7280' }}>Tham gia: {new Date(m.joinedAt).toLocaleDateString('vi-VN')}</div>
                                    </div>
                                    <div style={{ fontSize: 12, color: '#6b7280' }}><Icon name="chat-dots" /> {m.posts} bài</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {postsModal.open && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }} onClick={() => setPostsModal({ open: false, title: '', items: [] })}>
                    <div style={{ width: 'min(900px, 94vw)', maxHeight: '82vh', overflow: 'auto', background: '#fff', borderRadius: 14, border: '1px solid #f3f4f6', boxShadow: '0 12px 28px rgba(0,0,0,0.2)' }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ padding: 16, borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ fontWeight: 800, color: '#111827' }}>{postsModal.title}</div>
                            <button onClick={() => setPostsModal({ open: false, title: '', items: [] })} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Icon name="x-lg" /></button>
                        </div>
                        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {postsModal.items.length === 0 ? (
                                <div style={{ textAlign: 'center', color: '#6b7280', padding: 24 }}>Không có bài phù hợp</div>
                            ) : (
                                postsModal.items.map((p) => (
                                    <PostCard key={p.id} post={p} pinned={p.isPinned} />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}

            <button title="Tạo bài viết" onClick={() => setShowCreatePost(true)} style={{ position: 'fixed', right: 24, bottom: 24, width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg,#f59e0b,#fb923c)', border: '1px solid #f59e0b', color: '#fff', fontSize: 24, cursor: 'pointer', boxShadow: '0 10px 24px rgba(245,158,11,0.35)' }}
                onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.05)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.filter = 'none'; }}
            >
                ＋
            </button>

            {/* Create Post Modal */}
            <CreatePost
                open={showCreatePost}
                onOpenChange={setShowCreatePost}
                onCreatePost={(post) => {
                    setPosts(prev => [post, ...prev]);
                }}
            />
        </div>
    );
}

export default DienDan;


