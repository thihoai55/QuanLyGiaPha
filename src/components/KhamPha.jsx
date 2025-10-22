import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { genealogies, categories, stats } from '../data/khamphaData';

function KhamPha() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("trending");
    const [viewMode, setViewMode] = useState("grid");
    const [selectedGenealogy, setSelectedGenealogy] = useState(null);
    const [bookmarkedIds, setBookmarkedIds] = useState(["1", "3"]);


    const filteredGenealogies = genealogies
        .filter(gen => {
            const matchesSearch = gen.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                gen.surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                gen.location.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "all" || gen.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            if (sortBy === "trending") return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0) || b.views - a.views;
            if (sortBy === "popular") return b.likes - a.likes;
            if (sortBy === "members") return b.members - a.members;
            if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            return 0;
        });

    const toggleBookmark = (id) => {
        setBookmarkedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    return (
        <div style={{ padding: '16px', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>
            {/* Header with gradient background */}
            <div style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #fffbeb 0%, #fff7ed 50%, #fef3c7 100%)',
                padding: '32px',
                border: '2px solid #fcd34d80',
                marginBottom: '32px'
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at 30% 50%, rgba(251,191,36,0.1), transparent 50%)'
                }} />
                
                <div style={{ position: 'relative' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                <div style={{
                                    padding: '8px',
                                    borderRadius: '12px',
                                    background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                                    color: '#fff',
                                    boxShadow: '0 4px 12px rgba(245,158,11,0.3)'
                                }}>
                                    <i className="bi-tree" style={{ fontSize: '24px' }} />
                                </div>
                                <h1 style={{
                                    margin: 0,
                                    background: 'linear-gradient(135deg, #92400e, #b45309, #c2410c)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontSize: '28px',
                                    fontWeight: '700'
                                }}>
                                    Khám phá gia phả công khai
                                </h1>
                            </div>
                            <p style={{ color: '#6b7280', fontSize: '16px', margin: 0 }}>
                                Tìm hiểu và kết nối với các dòng họ từ khắp mọi miền đất nước
                            </p>
                        </div>
                        
                        <div style={{
                            background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                            color: '#fff',
                            padding: '8px 16px',
                            borderRadius: '999px',
                            fontWeight: '700',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '14px',
                            border: 'none',
                            boxShadow: '0 4px 12px rgba(245,158,11,0.3)'
                        }}>
                            <i className="bi-star" style={{ fontSize: '16px' }} />
                            Nổi bật
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '16px'
                    }}>
                        {stats.map((stat, index) => (
                            <Card key={stat.label} style={{
                                padding: '16px',
                                background: 'rgba(255, 255, 255, 0.8)',
                                backdropFilter: 'blur(4px)',
                                borderColor: '#fcd34d80',
                                borderRadius: '12px',
                                border: '1px solid #fcd34d80',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                                transition: 'all 0.3s ease',
                                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <div style={{
                                        padding: '8px',
                                        borderRadius: '8px',
                                        background: `linear-gradient(135deg, ${stat.color.includes('amber-500') ? '#f59e0b' : '#f97316'}, ${stat.color.includes('yellow-600') ? '#fbbf24' : '#f59e0b'})`,
                                        color: '#fff'
                                    }}>
                                        <i className={stat.icon} style={{ fontSize: '20px' }} />
                                    </div>
                                    <div style={{
                                        fontSize: '12px',
                                        fontWeight: '700',
                                        background: '#dcfce7',
                                        color: '#166534',
                                        padding: '4px 8px',
                                        borderRadius: '999px'
                                    }}>
                                        {stat.change}
                                    </div>
                                </div>
                                <p style={{ color: '#6b7280', fontSize: '12px', margin: '0 0 4px 0' }}>{stat.label}</p>
                                <p style={{ fontWeight: '600', fontSize: '18px', margin: 0 }}>{stat.value}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div style={{ marginBottom: '24px' }}>
                {/* Search Bar and Controls */}
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '16px',
                    marginBottom: '16px'
                }}>
                    <div style={{ 
                        display: 'flex', 
                        gap: '12px', 
                        flexWrap: 'wrap',
                        alignItems: 'center'
                    }}>
                        {/* Search Input */}
                        <div style={{ 
                            position: 'relative', 
                            flex: 1, 
                            minWidth: '300px' 
                        }}>
                            <i className="bi-search" style={{
                                position: 'absolute',
                                left: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                fontSize: '18px',
                                color: '#f59e0b',
                                zIndex: 1
                            }} />
                            <Input
                                placeholder="Tìm kiếm theo họ, tên gia phả, địa điểm..."
                                style={{
                                    paddingLeft: '44px',
                                    background: '#fff',
                                    border: '1px solid #fde68a',
                                    borderRadius: '8px',
                                    height: '44px',
                                    fontSize: '14px',
                                    transition: 'all 0.2s ease',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                    width: '100%',
                                    boxSizing: 'border-box'
                                }}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = '#f59e0b';
                                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.1)';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = '#fde68a';
                                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                                }}
                            />
                        </div>
                        
                        {/* Filter Controls */}
                        <div style={{ 
                            display: 'flex', 
                            gap: '12px',
                            alignItems: 'center',
                            flexWrap: 'wrap'
                        }}>
                            {/* Category Filter */}
                            <div style={{ position: 'relative' }}>
                                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                    <SelectTrigger 
                                        style={{
                                            width: '180px',
                                            background: '#fff',
                                            border: '1px solid #fde68a',
                                            height: '44px',
                                            borderRadius: '8px',
                                            padding: '0 12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                            fontSize: '14px'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = '#f59e0b';
                                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(245,158,11,0.15)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = '#fde68a';
                                            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                                        }}
                                    >
                                        <i className="bi-funnel" style={{ fontSize: '16px', color: '#f59e0b' }} />
                                        <SelectValue placeholder="Chọn danh mục" />
                                    </SelectTrigger>
                                    <SelectContent 
                                        style={{
                                            background: '#fff',
                                            border: '1px solid #fde68a',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                            zIndex: 50,
                                            minWidth: '180px'
                                        }}
                                        onOpenAutoFocus={(e) => e.preventDefault()}
                                    >
                                        {categories.map(cat => (
                                            <SelectItem 
                                                key={cat.value} 
                                                value={cat.value}
                                                style={{
                                                    padding: '8px 12px',
                                                    cursor: 'pointer',
                                                    borderRadius: '4px',
                                                    transition: 'all 0.2s ease',
                                                    fontSize: '14px',
                                                    background: 'transparent',
                                                    border: 'none'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = '#fef3c7';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = 'transparent';
                                                }}
                                            >
                                                {cat.label} ({cat.count})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Sort Filter */}
                            <div style={{ position: 'relative' }}>
                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger 
                                        style={{
                                            width: '180px',
                                            background: '#fff',
                                            border: '1px solid #fde68a',
                                            height: '44px',
                                            borderRadius: '8px',
                                            padding: '0 12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                            fontSize: '14px'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = '#f59e0b';
                                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(245,158,11,0.15)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = '#fde68a';
                                            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                                        }}
                                    >
                                        <i className="bi-sort-alpha-down" style={{ fontSize: '16px', color: '#f59e0b' }} />
                                        <SelectValue placeholder="Sắp xếp theo" />
                                    </SelectTrigger>
                                    <SelectContent 
                                        style={{
                                            background: '#fff',
                                            border: '1px solid #fde68a',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                            zIndex: 50,
                                            minWidth: '180px'
                                        }}
                                        onOpenAutoFocus={(e) => e.preventDefault()}
                                    >
                                        <SelectItem 
                                            value="trending"
                                            style={{
                                                padding: '8px 12px',
                                                cursor: 'pointer',
                                                borderRadius: '4px',
                                                transition: 'all 0.2s ease',
                                                fontSize: '14px',
                                                background: 'transparent',
                                                border: 'none'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = '#fef3c7';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'transparent';
                                            }}
                                        >
                                            Đang thịnh hành
                                        </SelectItem>
                                        <SelectItem 
                                            value="popular"
                                            style={{
                                                padding: '8px 12px',
                                                cursor: 'pointer',
                                                borderRadius: '4px',
                                                transition: 'all 0.2s ease',
                                                fontSize: '14px',
                                                background: 'transparent',
                                                border: 'none'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = '#fef3c7';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'transparent';
                                            }}
                                        >
                                            Phổ biến nhất
                                        </SelectItem>
                                        <SelectItem 
                                            value="members"
                                            style={{
                                                padding: '8px 12px',
                                                cursor: 'pointer',
                                                borderRadius: '4px',
                                                transition: 'all 0.2s ease',
                                                fontSize: '14px',
                                                background: 'transparent',
                                                border: 'none'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = '#fef3c7';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'transparent';
                                            }}
                                        >
                                            Nhiều thành viên
                                        </SelectItem>
                                        <SelectItem 
                                            value="newest"
                                            style={{
                                                padding: '8px 12px',
                                                cursor: 'pointer',
                                                borderRadius: '4px',
                                                transition: 'all 0.2s ease',
                                                fontSize: '14px',
                                                background: 'transparent',
                                                border: 'none'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = '#fef3c7';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'transparent';
                                            }}
                                        >
                                            Mới nhất
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* View Mode Toggle */}
                            <div style={{
                                display: 'flex',
                                gap: '4px',
                                padding: '4px',
                                background: '#fffbeb',
                                borderRadius: '8px',
                                border: '1px solid #fde68a',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                height: '44px',
                                alignItems: 'center'
                            }}>
                                <button
                                    style={{
                                        background: viewMode === "grid" ? 'linear-gradient(135deg, #f59e0b, #fbbf24)' : 'transparent',
                                        color: viewMode === "grid" ? '#fff' : '#374151',
                                        border: 'none',
                                        padding: '8px 12px',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        boxShadow: viewMode === "grid" ? '0 2px 4px rgba(245,158,11,0.3)' : 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '16px'
                                    }}
                                    onClick={() => setViewMode("grid")}
                                    onMouseEnter={(e) => {
                                        if (viewMode !== "grid") {
                                            e.currentTarget.style.background = '#fef3c7';
                                            e.currentTarget.style.transform = 'scale(1.05)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (viewMode !== "grid") {
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.transform = 'scale(1)';
                                        }
                                    }}
                                >
                                    <i className="bi-grid-3x3-gap" />
                                </button>
                                <button
                                    style={{
                                        background: viewMode === "list" ? 'linear-gradient(135deg, #f59e0b, #fbbf24)' : 'transparent',
                                        color: viewMode === "list" ? '#fff' : '#374151',
                                        border: 'none',
                                        padding: '8px 12px',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        boxShadow: viewMode === "list" ? '0 2px 4px rgba(245,158,11,0.3)' : 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '16px'
                                    }}
                                    onClick={() => setViewMode("list")}
                                    onMouseEnter={(e) => {
                                        if (viewMode !== "list") {
                                            e.currentTarget.style.background = '#fef3c7';
                                            e.currentTarget.style.transform = 'scale(1.05)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (viewMode !== "list") {
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.transform = 'scale(1)';
                                        }
                                    }}
                                >
                                    <i className="bi-list" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Category Tabs */}
                <div style={{ width: '100%' }}>
                    <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                        <TabsList style={{
                            background: '#fffbeb',
                            border: '1px solid #fde68a',
                            padding: '4px',
                            borderRadius: '8px',
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '4px',
                            width: '100%',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                        }}>
                            {categories.map(cat => (
                                <TabsTrigger
                                    key={cat.value}
                                    value={cat.value}
                                    style={{
                                        padding: '8px 16px',
                                        borderRadius: '6px',
                                        border: 'none !important',
                                        outline: 'none',
                                        background: selectedCategory === cat.value ? 'linear-gradient(135deg, #f59e0b, #fbbf24)' : 'transparent',
                                        color: selectedCategory === cat.value ? '#fff' : '#374151',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        transition: 'all 0.2s ease',
                                        whiteSpace: 'nowrap',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        boxShadow: selectedCategory === cat.value ? '0 2px 4px rgba(245,158,11,0.3)' : 'none',
                                        transform: selectedCategory === cat.value ? 'translateY(-1px)' : 'translateY(0)',
                                        flex: '1',
                                        minWidth: '120px',
                                        justifyContent: 'center'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (selectedCategory !== cat.value) {
                                            e.currentTarget.style.background = '#fef3c7';
                                            e.currentTarget.style.transform = 'translateY(-1px)';
                                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                                            e.currentTarget.style.border = 'none';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (selectedCategory !== cat.value) {
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = 'none';
                                            e.currentTarget.style.border = 'none';
                                        }
                                    }}
                                >
                                    {cat.label}
                                    <span style={{
                                        background: selectedCategory === cat.value ? 'rgba(255,255,255,0.2)' : '#f3f4f6',
                                        color: selectedCategory === cat.value ? '#fff' : '#6b7280',
                                        fontSize: '12px',
                                        padding: '2px 6px',
                                        borderRadius: '999px',
                                        fontWeight: '600'
                                    }}>
                                        {cat.count}
                                    </span>
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                </div>
            </div>

            {/* Results Count */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <p style={{ color: '#6b7280', margin: 0 }}>
                    Tìm thấy <span style={{ color: '#f59e0b', fontWeight: '600' }}>{filteredGenealogies.length}</span> gia phả
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#6b7280' }}>
                    <i className="bi-activity" style={{ color: '#f59e0b' }} />
                    Cập nhật liên tục
                </div>
            </div>

            {/* Genealogies Grid/List */}
            <div style={{
                display: viewMode === "grid" ? 'grid' : 'flex',
                gridTemplateColumns: viewMode === "grid" ? 'repeat(auto-fit, minmax(350px, 1fr))' : 'none',
                flexDirection: viewMode === "list" ? 'column' : 'row',
                gap: '24px'
            }}>
                {filteredGenealogies.map((gen, index) => (
                    <Card
                        key={gen.id}
                        style={{
                            overflow: 'hidden',
                            background: '#fff',
                            borderColor: '#fde68a80',
                            borderRadius: '12px',
                            border: '1px solid #fde68a80',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                            transition: 'all 0.3s ease',
                            animation: `fadeInUp 0.6s ease-out ${index * 0.05}s both`,
                            display: viewMode === "list" ? 'flex' : 'block',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#f59e0b';
                            e.currentTarget.style.boxShadow = '0 8px 25px rgba(245,158,11,0.15)';
                            e.currentTarget.style.transform = 'translateY(-4px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#fde68a80';
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        {/* Image */}
                        {gen.imageUrl && (
                            <div style={{
                                position: 'relative',
                                overflow: 'hidden',
                                height: viewMode === "list" ? '200px' : '200px',
                                width: viewMode === "list" ? '300px' : '100%'
                            }}>
                                <img
                                    src={gen.imageUrl}
                                    alt={gen.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.5s ease'
                                    }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)'
                                }} />
                                
                                {/* Badges on image */}
                                <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '8px' }}>
                                    {gen.isTrending && (
                                        <div style={{
                                            background: 'linear-gradient(135deg, #ef4444, #f97316)',
                                            color: '#fff',
                                            fontSize: '12px',
                                            fontWeight: '700',
                                            padding: '4px 8px',
                                            borderRadius: '999px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                        }}>
                                            <i className="bi-graph-up" style={{ fontSize: '12px' }} />
                                            Hot
                                        </div>
                                    )}
                                    {gen.isVerified && (
                                        <div style={{
                                            background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                                            color: '#fff',
                                            fontSize: '12px',
                                            fontWeight: '700',
                                            padding: '4px 8px',
                                            borderRadius: '999px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                        }}>
                                            <i className="bi-award" style={{ fontSize: '12px' }} />
                                            Xác minh
                                        </div>
                                    )}
                                </div>

                                {/* Bookmark button */}
                                <Button
                                    size="sm"
                                    style={{
                                        position: 'absolute',
                                        top: '12px',
                                        right: '12px',
                                        background: 'rgba(255, 255, 255, 0.9)',
                                        backdropFilter: 'blur(4px)',
                                        border: 'none',
                                        padding: '8px'
                                    }}
                                    onClick={() => toggleBookmark(gen.id)}
                                >
                                    <i className={`bi-bookmark${bookmarkedIds.includes(gen.id) ? '-fill' : ''}`} style={{
                                        fontSize: '16px',
                                        color: bookmarkedIds.includes(gen.id) ? '#f59e0b' : '#6b7280'
                                    }} />
                                </Button>
                            </div>
                        )}

                        {/* Content */}
                        <div style={{ padding: '24px', flex: 1 }}>
                            <div style={{ marginBottom: '16px' }}>
                                {/* Header */}
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '12px' }}>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                            <div style={{
                                                background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                                                color: '#fff',
                                                fontSize: '12px',
                                                fontWeight: '700',
                                                padding: '4px 8px',
                                                borderRadius: '999px',
                                                border: 'none'
                                            }}>
                                                {gen.surname}
                                            </div>
                                            <div style={{
                                                border: '1px solid #fcd34d',
                                                color: '#f59e0b',
                                                fontSize: '12px',
                                                fontWeight: '500',
                                                padding: '4px 8px',
                                                borderRadius: '999px',
                                                background: 'transparent'
                                            }}>
                                                {gen.category}
                                            </div>
                                        </div>
                                        <h3 style={{
                                            margin: '0 0 8px 0',
                                            fontSize: '18px',
                                            fontWeight: '600',
                                            color: '#1f2937'
                                        }}>
                                            {gen.name}
                                        </h3>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#6b7280' }}>
                                            <div style={{
                                                width: '20px',
                                                height: '20px',
                                                borderRadius: '50%',
                                                background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                                                color: '#fff',
                                                fontSize: '10px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: '700'
                                            }}>
                                                {gen.ownerAvatar}
                                            </div>
                                            <span>{gen.owner}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <p style={{
                                    fontSize: '14px',
                                    color: '#6b7280',
                                    margin: '0 0 12px 0',
                                    lineHeight: '1.5',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}>
                                    {gen.description}
                                </p>

                                {/* Tags */}
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                                    {gen.tags.map(tag => (
                                        <div
                                            key={tag}
                                            style={{
                                                background: '#fffbeb',
                                                color: '#f59e0b',
                                                border: '1px solid #fde68a',
                                                fontSize: '12px',
                                                fontWeight: '500',
                                                padding: '4px 8px',
                                                borderRadius: '999px'
                                            }}
                                        >
                                            #{tag}
                                        </div>
                                    ))}
                                </div>

                                <Separator style={{ background: '#fde68a30', margin: '16px 0' }} />

                                {/* Stats */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(2, 1fr)',
                                    gap: '16px',
                                    marginBottom: '16px'
                                }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', marginBottom: '4px' }}>
                                            <div style={{ padding: '4px', borderRadius: '4px', background: '#fffbeb' }}>
                                                <i className="bi-people" style={{ fontSize: '16px', color: '#f59e0b' }} />
                                            </div>
                                            <span style={{ color: '#6b7280' }}>Thành viên</span>
                                        </div>
                                        <p style={{ color: '#f59e0b', fontWeight: '600', margin: 0 }}>{gen.members}</p>
                                    </div>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', marginBottom: '4px' }}>
                                            <div style={{ padding: '4px', borderRadius: '4px', background: '#fef3c7' }}>
                                                <i className="bi-tree" style={{ fontSize: '16px', color: '#f59e0b' }} />
                                            </div>
                                            <span style={{ color: '#6b7280' }}>Đời</span>
                                        </div>
                                        <p style={{ color: '#f59e0b', fontWeight: '600', margin: 0 }}>{gen.generations}</p>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    paddingTop: '12px',
                                    borderTop: '1px solid #fde68a30'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: '#6b7280' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <i className="bi-eye" style={{ fontSize: '16px', color: '#f59e0b' }} />
                                            <span>{gen.views}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <i className="bi-heart" style={{ fontSize: '16px', color: '#ef4444' }} />
                                            <span>{gen.likes}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <i className="bi-geo-alt" style={{ fontSize: '14px', color: '#f59e0b' }} />
                                            <span style={{ fontSize: '12px' }}>{gen.location}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                                <Button
                                    style={{
                                        flex: 1,
                                        background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '8px',
                                        padding: '12px 16px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 12px rgba(245,158,11,0.25)',
                                        transition: 'all 0.2s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px'
                                    }}
                                    onClick={() => setSelectedGenealogy(gen)}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'linear-gradient(135deg, #d97706, #f59e0b)';
                                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(245,158,11,0.4)';
                                        e.currentTarget.style.transform = 'translateY(-1px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'linear-gradient(135deg, #f59e0b, #fbbf24)';
                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(245,158,11,0.25)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                        Xem chi tiết
                                        <i className="bi-arrow-up-right" style={{ fontSize: '16px' }} />
                                    </Button>
                                    <Button
                                        size="icon"
                                        style={{
                                            border: '1px solid #fcd34d',
                                            background: 'transparent',
                                            color: '#f59e0b',
                                            borderRadius: '8px',
                                            padding: '12px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = '#fffbeb';
                                            e.currentTarget.style.borderColor = '#f59e0b';
                                            e.currentTarget.style.transform = 'scale(1.05)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.borderColor = '#fcd34d';
                                            e.currentTarget.style.transform = 'scale(1)';
                                        }}
                                    >
                                        <i className="bi-share" style={{ fontSize: '16px' }} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Empty State */}
            {filteredGenealogies.length === 0 && (
                <div style={{ textAlign: 'center', padding: '64px 0' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: '#fffbeb',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px'
                    }}>
                        <i className="bi-search" style={{ fontSize: '32px', color: '#f59e0b' }} />
                    </div>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: '600' }}>Không tìm thấy gia phả</h3>
                    <p style={{ color: '#6b7280', margin: 0 }}>
                        Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                    </p>
                </div>
            )}

            {/* Modal for genealogy details */}
            {selectedGenealogy && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 50,
                    padding: '16px'
                }}
                onClick={() => setSelectedGenealogy(null)}
                >
                    <div style={{
                        background: '#fff',
                        borderRadius: '12px',
                        maxWidth: '600px',
                        maxHeight: '80vh',
                        overflow: 'auto',
                        width: '100%',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}
                    onClick={(e) => e.stopPropagation()}
                    >
                        <div style={{ padding: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                <i className="bi-tree" style={{ fontSize: '20px', color: '#f59e0b' }} />
                                <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>
                                    {selectedGenealogy.name}
                                </h2>
                            </div>
                            <p style={{ color: '#6b7280', margin: '0 0 24px 0' }}>
                                Thông tin chi tiết về gia phả
                            </p>
                            
                            {/* Image */}
                            {selectedGenealogy.imageUrl && (
                                <div style={{ height: '200px', borderRadius: '8px', overflow: 'hidden', marginBottom: '24px' }}>
                                    <img
                                        src={selectedGenealogy.imageUrl}
                                        alt={selectedGenealogy.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                            )}

                            {/* Info Grid */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '16px',
                                marginBottom: '24px'
                            }}>
                                <div style={{ padding: '16px', borderRadius: '8px', background: '#fffbeb', border: '1px solid #fde68a' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                        <i className="bi-people" style={{ fontSize: '16px', color: '#f59e0b' }} />
                                        <span style={{ fontSize: '14px', color: '#6b7280' }}>Thành viên</span>
                                    </div>
                                    <p style={{ margin: 0, fontWeight: '600' }}>{selectedGenealogy.members} người</p>
                                </div>
                                <div style={{ padding: '16px', borderRadius: '8px', background: '#fef3c7', border: '1px solid #fde68a' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                        <i className="bi-tree" style={{ fontSize: '16px', color: '#f59e0b' }} />
                                        <span style={{ fontSize: '14px', color: '#6b7280' }}>Số đời</span>
                                    </div>
                                    <p style={{ margin: 0, fontWeight: '600' }}>{selectedGenealogy.generations} đời</p>
                                </div>
                                <div style={{ padding: '16px', borderRadius: '8px', background: '#fff7ed', border: '1px solid #fed7aa' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                        <i className="bi-eye" style={{ fontSize: '16px', color: '#f97316' }} />
                                        <span style={{ fontSize: '14px', color: '#6b7280' }}>Lượt xem</span>
                                    </div>
                                    <p style={{ margin: 0, fontWeight: '600' }}>{selectedGenealogy.views}</p>
                                </div>
                                <div style={{ padding: '16px', borderRadius: '8px', background: '#fef2f2', border: '1px solid #fecaca' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                        <i className="bi-heart" style={{ fontSize: '16px', color: '#ef4444' }} />
                                        <span style={{ fontSize: '14px', color: '#6b7280' }}>Lượt thích</span>
                                    </div>
                                    <p style={{ margin: 0, fontWeight: '600' }}>{selectedGenealogy.likes}</p>
                                </div>
                            </div>

                            {/* Details */}
                            <div style={{ marginBottom: '24px' }}>
                                <div style={{ marginBottom: '16px' }}>
                                    <h4 style={{ margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <i className="bi-geo-alt" style={{ fontSize: '16px', color: '#f59e0b' }} />
                                        Nguồn gốc
                                    </h4>
                                    <p style={{ color: '#6b7280', margin: 0 }}>{selectedGenealogy.location}</p>
                                </div>
                                
                                <div style={{ marginBottom: '16px' }}>
                                    <h4 style={{ margin: '0 0 8px 0' }}>Mô tả</h4>
                                    <p style={{ color: '#6b7280', margin: 0 }}>{selectedGenealogy.description}</p>
                                </div>

                                <div style={{ marginBottom: '16px' }}>
                                    <h4 style={{ margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <i className="bi-clock" style={{ fontSize: '16px', color: '#f59e0b' }} />
                                        Thời gian
                                    </h4>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: '#6b7280' }}>
                                        <span>Tạo: {selectedGenealogy.createdAt}</span>
                                        <span>•</span>
                                        <span>Cập nhật: {selectedGenealogy.lastUpdated}</span>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '16px' }}>
                                    <h4 style={{ margin: '0 0 8px 0' }}>Quản lý bởi</h4>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '8px', background: '#fffbeb', border: '1px solid #fde68a' }}>
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                                            color: '#fff',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: '700'
                                        }}>
                                            {selectedGenealogy.ownerAvatar}
                                        </div>
                                        <div>
                                            <p style={{ margin: 0, fontWeight: '600' }}>{selectedGenealogy.owner}</p>
                                            <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>Quản trị viên</p>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '16px' }}>
                                    <h4 style={{ margin: '0 0 8px 0' }}>Thẻ</h4>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {selectedGenealogy.tags.map(tag => (
                                            <div
                                                key={tag}
                                                style={{
                                                    background: '#fffbeb',
                                                    color: '#f59e0b',
                                                    border: '1px solid #fde68a',
                                                    fontSize: '12px',
                                                    fontWeight: '500',
                                                    padding: '4px 8px',
                                                    borderRadius: '999px'
                                                }}
                                            >
                                                #{tag}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <Button style={{
                                    flex: 1,
                                    background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '12px 16px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px'
                                }}>
                                    <i className="bi-heart" style={{ fontSize: '16px' }} />
                                    Yêu thích
                                </Button>
                                <Button style={{
                                    flex: 1,
                                    border: '1px solid #fcd34d',
                                    background: 'transparent',
                                    color: '#f59e0b',
                                    borderRadius: '8px',
                                    padding: '12px 16px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px'
                                }}>
                                    <i className="bi-share" style={{ fontSize: '16px' }} />
                                    Chia sẻ
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}

export default KhamPha;
