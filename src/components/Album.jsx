import { useState } from "react";
import { 
  Image as ImageIcon, 
  Plus, 
  Search, 
  Grid3x3, 
  LayoutGrid,
  Calendar,
  MapPin,
  Users,
  Download,
  Share2,
  Heart,
  X,
  Upload,
  FolderPlus,
  TrendingUp,
  Clock,
  Star
} from "lucide-react";
import { 
  mockPhotos, 
  mockAlbums, 
  getAlbumStats, 
  getMostLikedPhotos, 
  getLatestPhotos,
  getPhotosByMonth 
} from "../data/albumData";

function Album() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState("1");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [createAlbumDialogOpen, setCreateAlbumDialogOpen] = useState(false);
  const [statsModalOpen, setStatsModalOpen] = useState(false);
  const [selectedStatType, setSelectedStatType] = useState("");

  // Form states
  const [photoTitle, setPhotoTitle] = useState("");
  const [photoAlbum, setPhotoAlbum] = useState("");
  const [photoDescription, setPhotoDescription] = useState("");
  const [photoDate, setPhotoDate] = useState("");
  const [photoLocation, setPhotoLocation] = useState("");
  const [albumName, setAlbumName] = useState("");
  const [albumDescription, setAlbumDescription] = useState("");

  // Get stats data
  const stats = getAlbumStats();

  const filteredPhotos = mockPhotos.filter(photo => {
    const matchesSearch = photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         photo.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAlbum = selectedAlbum === "1" || photo.album === mockAlbums.find(a => a.id === selectedAlbum)?.name;
    return matchesSearch && matchesAlbum;
  });

  const handleUploadSubmit = () => {
    console.log("Upload photo:", { photoTitle, photoAlbum, photoDescription, photoDate, photoLocation });
    setUploadDialogOpen(false);
    setPhotoTitle("");
    setPhotoAlbum("");
    setPhotoDescription("");
    setPhotoDate("");
    setPhotoLocation("");
  };

  const handleCreateAlbumSubmit = () => {
    console.log("Create album:", { albumName, albumDescription });
    setCreateAlbumDialogOpen(false);
    setAlbumName("");
    setAlbumDescription("");
  };

  const handleStatsClick = (statType) => {
    setSelectedStatType(statType);
    setStatsModalOpen(true);
  };

  const getStatsModalData = () => {
    switch (selectedStatType) {
      case 'totalPhotos':
        return {
          title: 'Tất cả ảnh',
          description: 'Danh sách tất cả ảnh trong thư viện',
          photos: mockPhotos,
          icon: ImageIcon,
          isPhotoList: true
        };
      case 'albums':
        return {
          title: 'Albums',
          description: 'Danh sách các album',
          photos: mockAlbums.slice(1), // Bỏ "Tất cả ảnh"
          icon: LayoutGrid,
          isPhotoList: false
        };
      case 'likes':
        return {
          title: 'Ảnh được thích nhiều nhất',
          description: 'Top ảnh có nhiều lượt thích nhất',
          photos: getMostLikedPhotos(10),
          icon: Heart,
          isPhotoList: true
        };
      case 'thisMonth':
        return {
          title: 'Ảnh tháng này',
          description: 'Ảnh được tải lên trong tháng hiện tại',
          photos: getPhotosByMonth(new Date().getMonth() + 1, new Date().getFullYear()),
          icon: Calendar,
          isPhotoList: true
        };
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ color: '#92400e', fontSize: '28px', fontWeight: 'bold', margin: '0 0 8px 0' }}>Thư viện ảnh gia đình</h1>
          <p style={{ color: '#b45309', margin: '0' }}>Lưu giữ những khoảnh khắc đáng nhớ</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px 16px',
              border: '1px solid #f59e0b',
              borderRadius: '8px',
              background: 'white',
              color: '#b45309',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onClick={() => setCreateAlbumDialogOpen(true)}
            onMouseEnter={(e) => e.target.style.background = '#fef3c7'}
            onMouseLeave={(e) => e.target.style.background = 'white'}
          >
            <FolderPlus style={{ width: '16px', height: '16px', marginRight: '8px' }} />
            Tạo album
          </button>
          <button
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px 16px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onClick={() => setUploadDialogOpen(true)}
            onMouseEnter={(e) => e.target.style.background = 'linear-gradient(135deg, #d97706 0%, #dc2626 100%)'}
            onMouseLeave={(e) => e.target.style.background = 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)'}
          >
            <Upload style={{ width: '16px', height: '16px', marginRight: '8px' }} />
            Tải ảnh lên
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div 
          style={{ 
            background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)', 
            border: '1px solid #f59e0b', 
            borderRadius: '8px', 
            padding: '24px',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onClick={() => handleStatsClick('totalPhotos')}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '14px', color: '#b45309', margin: '0 0 4px 0' }}>Tổng số ảnh</p>
              <h3 style={{ color: '#92400e', fontSize: '24px', fontWeight: 'bold', margin: '0' }}>{stats.totalPhotos}</h3>
            </div>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ImageIcon style={{ width: '24px', height: '24px', color: '#d97706' }} />
            </div>
          </div>
        </div>

        <div 
          style={{ 
            background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)', 
            border: '1px solid #f59e0b', 
            borderRadius: '8px', 
            padding: '24px',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onClick={() => handleStatsClick('albums')}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '14px', color: '#b45309', margin: '0 0 4px 0' }}>Albums</p>
              <h3 style={{ color: '#92400e', fontSize: '24px', fontWeight: 'bold', margin: '0' }}>{stats.totalAlbums}</h3>
            </div>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(234, 88, 12, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LayoutGrid style={{ width: '24px', height: '24px', color: '#ea580c' }} />
            </div>
          </div>
        </div>

        <div 
          style={{ 
            background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)', 
            border: '1px solid #f59e0b', 
            borderRadius: '8px', 
            padding: '24px',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onClick={() => handleStatsClick('likes')}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '14px', color: '#b45309', margin: '0 0 4px 0' }}>Đã thích</p>
              <h3 style={{ color: '#92400e', fontSize: '24px', fontWeight: 'bold', margin: '0' }}>{stats.totalLikes}</h3>
            </div>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Heart style={{ width: '24px', height: '24px', color: '#ef4444' }} />
            </div>
          </div>
        </div>

        <div 
          style={{ 
            background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)', 
            border: '1px solid #f59e0b', 
            borderRadius: '8px', 
            padding: '24px',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onClick={() => handleStatsClick('thisMonth')}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '14px', color: '#b45309', margin: '0 0 4px 0' }}>Tháng này</p>
              <h3 style={{ color: '#92400e', fontSize: '24px', fontWeight: 'bold', margin: '0' }}>+{stats.thisMonthPhotos}</h3>
            </div>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(34, 197, 94, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Calendar style={{ width: '24px', height: '24px', color: '#22c55e' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Albums Tabs and Filters */}
      <div style={{ border: '1px solid #f59e0b', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.8)', padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          {/* Album Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fef3c7', borderRadius: '8px', padding: '4px' }}>
            {mockAlbums.slice(0, 6).map((album) => (
              <button
                key={album.id}
                onClick={() => setSelectedAlbum(album.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  background: selectedAlbum === album.id 
                    ? 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)' 
                    : 'transparent',
                  color: selectedAlbum === album.id ? 'white' : '#92400e',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontWeight: selectedAlbum === album.id ? '600' : '500'
                }}
                onMouseEnter={(e) => {
                  if (selectedAlbum !== album.id) {
                    e.target.style.background = '#fde68a';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedAlbum !== album.id) {
                    e.target.style.background = 'transparent';
                  }
                }}
              >
                {album.name}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#f59e0b' }} />
              <input
                type="text"
                placeholder="Tìm kiếm ảnh..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  paddingLeft: '40px',
                  paddingRight: '16px',
                  paddingTop: '8px',
                  paddingBottom: '8px',
                  border: '1px solid #f59e0b',
                  borderRadius: '8px',
                  outline: 'none',
                  fontSize: '14px',
                  width: '200px'
                }}
                onFocus={(e) => e.target.style.borderColor = '#d97706'}
                onBlur={(e) => e.target.style.borderColor = '#f59e0b'}
              />
            </div>

            {/* View Mode Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fef3c7', borderRadius: '8px', padding: '4px' }}>
              <button
                onClick={() => setViewMode("grid")}
                style={{
                  padding: '8px',
                  borderRadius: '6px',
                  border: 'none',
                  background: viewMode === "grid" ? '#f59e0b' : 'transparent',
                  color: viewMode === "grid" ? 'white' : '#92400e',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (viewMode !== "grid") {
                    e.target.style.background = '#fde68a';
                  }
                }}
                onMouseLeave={(e) => {
                  if (viewMode !== "grid") {
                    e.target.style.background = 'transparent';
                  }
                }}
              >
                <Grid3x3 style={{ width: '16px', height: '16px' }} />
              </button>
              <button
                onClick={() => setViewMode("masonry")}
                style={{
                  padding: '8px',
                  borderRadius: '6px',
                  border: 'none',
                  background: viewMode === "masonry" ? '#f59e0b' : 'transparent',
                  color: viewMode === "masonry" ? 'white' : '#92400e',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (viewMode !== "masonry") {
                    e.target.style.background = '#fde68a';
                  }
                }}
                onMouseLeave={(e) => {
                  if (viewMode !== "masonry") {
                    e.target.style.background = 'transparent';
                  }
                }}
              >
                <LayoutGrid style={{ width: '16px', height: '16px' }} />
              </button>
            </div>
          </div>
        </div>

        {/* Photo Grid */}
        {filteredPhotos.length > 0 ? (
          <div style={{
            display: viewMode === "grid" ? 'grid' : 'block',
            gridTemplateColumns: viewMode === "grid" ? 'repeat(auto-fill, minmax(300px, 1fr))' : 'none',
            gap: '16px',
            columnCount: viewMode === "masonry" ? 3 : 'auto',
            columnGap: viewMode === "masonry" ? '16px' : '0'
          }}>
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                style={{
                  breakInside: viewMode === "masonry" ? 'avoid' : 'auto',
                  marginBottom: viewMode === "masonry" ? '16px' : '0',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedPhoto(photo)}
              >
                <div style={{
                  border: '1px solid #f59e0b',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  background: 'white',
                  transition: 'all 0.3s',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}
                >
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <img
                      src={photo.url}
                      alt={photo.title}
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                        transition: 'transform 0.5s'
                      }}
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      padding: '4px 8px',
                      background: '#f59e0b',
                      color: 'white',
                      fontSize: '12px',
                      borderRadius: '12px'
                    }}>
                      {photo.album}
                    </div>
                  </div>
                  <div style={{ padding: '16px' }}>
                    <h4 style={{ color: '#92400e', fontSize: '16px', fontWeight: '600', margin: '0 0 8px 0' }}>{photo.title}</h4>
                    <p style={{ color: '#b45309', fontSize: '14px', margin: '0 0 12px 0' }}>{photo.description}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: '#b45309' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Calendar style={{ width: '16px', height: '16px' }} />
                          {new Date(photo.date).toLocaleDateString('vi-VN')}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <MapPin style={{ width: '16px', height: '16px' }} />
                          {photo.location}
                        </span>
                      </div>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ef4444' }}>
                        <Heart style={{ width: '16px', height: '16px', fill: 'currentColor' }} />
                        {photo.likes}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <ImageIcon style={{ width: '64px', height: '64px', margin: '0 auto 16px', color: '#f59e0b' }} />
            <h3 style={{ color: '#92400e', fontSize: '18px', margin: '0 0 8px 0' }}>Không tìm thấy ảnh</h3>
            <p style={{ color: '#b45309', margin: '0' }}>Thử thay đổi bộ lọc hoặc tải ảnh mới lên</p>
          </div>
        )}
      </div>

      {/* Photo Detail Modal */}
      {selectedPhoto && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            padding: '60px 16px 10px 16px'
          }}
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '8px',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              marginTop: '20px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setSelectedPhoto(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  zIndex: 10,
                  background: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  padding: '8px',
                  borderRadius: '50%',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.7)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.5)'}
              >
                <X style={{ width: '20px', height: '20px' }} />
              </button>
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '70vh',
                  objectFit: 'contain',
                  background: 'black'
                }}
              />
              <div style={{ padding: '24px', background: 'white' }}>
                <h2 style={{ color: '#92400e', fontSize: '20px', fontWeight: 'bold', margin: '0 0 8px 0' }}>{selectedPhoto.title}</h2>
                <p style={{ color: '#b45309', margin: '0 0 24px 0' }}>{selectedPhoto.description}</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#b45309' }}>
                    <Calendar style={{ width: '16px', height: '16px' }} />
                    <span style={{ fontSize: '14px' }}>{new Date(selectedPhoto.date).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#b45309' }}>
                    <MapPin style={{ width: '16px', height: '16px' }} />
                    <span style={{ fontSize: '14px' }}>{selectedPhoto.location}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#b45309' }}>
                    <Users style={{ width: '16px', height: '16px' }} />
                    <span style={{ fontSize: '14px' }}>{selectedPhoto.uploadedBy}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444' }}>
                    <Heart style={{ width: '16px', height: '16px', fill: 'currentColor' }} />
                    <span style={{ fontSize: '14px' }}>{selectedPhoto.likes} lượt thích</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '24px', borderTop: '1px solid #f59e0b' }}>
                  <button style={{
                    flex: 1,
                    padding: '8px 16px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'linear-gradient(135deg, #d97706 0%, #dc2626 100%)'}
                  onMouseLeave={(e) => e.target.style.background = 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)'}
                  >
                    <Heart style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                    Thích
                  </button>
                  <button style={{
                    flex: 1,
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid #f59e0b',
                    color: '#b45309',
                    background: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#fef3c7'}
                  onMouseLeave={(e) => e.target.style.background = 'white'}
                  >
                    <Share2 style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                    Chia sẻ
                  </button>
                  <button style={{
                    flex: 1,
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid #f59e0b',
                    color: '#b45309',
                    background: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#fef3c7'}
                  onMouseLeave={(e) => e.target.style.background = 'white'}
                  >
                    <Download style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                    Tải xuống
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Photo Dialog */}
      {uploadDialogOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            padding: '80px 16px 16px 16px'
          }}
          onClick={() => setUploadDialogOpen(false)}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '8px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '80vh',
              overflowY: 'auto',
              marginTop: '20px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: '24px' }}>
              <h2 style={{ color: '#92400e', fontSize: '20px', fontWeight: 'bold', margin: '0 0 16px 0' }}>Tải ảnh lên</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{
                  border: '2px dashed #f59e0b',
                  borderRadius: '8px',
                  padding: '48px',
                  textAlign: 'center',
                  background: 'rgba(254, 243, 199, 0.5)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(254, 243, 199, 0.8)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(254, 243, 199, 0.5)'}
                >
                  <Upload style={{ width: '48px', height: '48px', margin: '0 auto 16px', color: '#f59e0b' }} />
                  <p style={{ color: '#92400e', margin: '0 0 8px 0' }}>Kéo thả ảnh vào đây hoặc click để chọn</p>
                  <p style={{ fontSize: '14px', color: '#b45309', margin: '0' }}>Hỗ trợ: JPG, PNG, GIF (tối đa 10MB)</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '14px', color: '#92400e', fontWeight: '500' }}>Tiêu đề</label>
                    <input
                      type="text"
                      placeholder="Nhập tiêu đề ảnh"
                      value={photoTitle}
                      onChange={(e) => setPhotoTitle(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #f59e0b',
                        borderRadius: '8px',
                        outline: 'none',
                        fontSize: '14px',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#d97706'}
                      onBlur={(e) => e.target.style.borderColor = '#f59e0b'}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '14px', color: '#92400e', fontWeight: '500' }}>Album</label>
                    <input
                      type="text"
                      placeholder="Chọn album"
                      value={photoAlbum}
                      onChange={(e) => setPhotoAlbum(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #f59e0b',
                        borderRadius: '8px',
                        outline: 'none',
                        fontSize: '14px',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#d97706'}
                      onBlur={(e) => e.target.style.borderColor = '#f59e0b'}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', color: '#92400e', fontWeight: '500' }}>Mô tả</label>
                  <textarea
                    placeholder="Nhập mô tả ảnh"
                    value={photoDescription}
                    onChange={(e) => setPhotoDescription(e.target.value)}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #f59e0b',
                      borderRadius: '8px',
                      outline: 'none',
                      fontSize: '14px',
                      resize: 'none',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#d97706'}
                    onBlur={(e) => e.target.style.borderColor = '#f59e0b'}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '14px', color: '#92400e', fontWeight: '500' }}>Ngày chụp</label>
                    <input
                      type="date"
                      value={photoDate}
                      onChange={(e) => setPhotoDate(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #f59e0b',
                        borderRadius: '8px',
                        outline: 'none',
                        fontSize: '14px',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#d97706'}
                      onBlur={(e) => e.target.style.borderColor = '#f59e0b'}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '14px', color: '#92400e', fontWeight: '500' }}>Địa điểm</label>
                    <input
                      type="text"
                      placeholder="Nhập địa điểm"
                      value={photoLocation}
                      onChange={(e) => setPhotoLocation(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #f59e0b',
                        borderRadius: '8px',
                        outline: 'none',
                        fontSize: '14px',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#d97706'}
                      onBlur={(e) => e.target.style.borderColor = '#f59e0b'}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '16px' }}>
                  <button
                    onClick={() => setUploadDialogOpen(false)}
                    style={{
                      padding: '8px 16px',
                      border: '1px solid #f59e0b',
                      borderRadius: '8px',
                      color: '#b45309',
                      background: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#fef3c7'}
                    onMouseLeave={(e) => e.target.style.background = 'white'}
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleUploadSubmit}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'linear-gradient(135deg, #d97706 0%, #dc2626 100%)'}
                    onMouseLeave={(e) => e.target.style.background = 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)'}
                  >
                    Tải lên
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Album Dialog */}
      {createAlbumDialogOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            padding: '100px 16px 16px 16px'
          }}
          onClick={() => setCreateAlbumDialogOpen(false)}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '8px',
              maxWidth: '400px',
              width: '100%',
              marginTop: '20px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: '24px' }}>
              <h2 style={{ color: '#92400e', fontSize: '20px', fontWeight: 'bold', margin: '0 0 16px 0' }}>Tạo album mới</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', color: '#92400e', fontWeight: '500' }}>Tên album</label>
                  <input
                    type="text"
                    placeholder="Nhập tên album"
                    value={albumName}
                    onChange={(e) => setAlbumName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #f59e0b',
                      borderRadius: '8px',
                      outline: 'none',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#d97706'}
                    onBlur={(e) => e.target.style.borderColor = '#f59e0b'}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', color: '#92400e', fontWeight: '500' }}>Mô tả</label>
                  <textarea
                    placeholder="Nhập mô tả album"
                    value={albumDescription}
                    onChange={(e) => setAlbumDescription(e.target.value)}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #f59e0b',
                      borderRadius: '8px',
                      outline: 'none',
                      fontSize: '14px',
                      resize: 'none',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#d97706'}
                    onBlur={(e) => e.target.style.borderColor = '#f59e0b'}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '16px' }}>
                  <button
                    onClick={() => setCreateAlbumDialogOpen(false)}
                    style={{
                      padding: '8px 16px',
                      border: '1px solid #f59e0b',
                      borderRadius: '8px',
                      color: '#b45309',
                      background: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#fef3c7'}
                    onMouseLeave={(e) => e.target.style.background = 'white'}
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleCreateAlbumSubmit}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'linear-gradient(135deg, #d97706 0%, #dc2626 100%)'}
                    onMouseLeave={(e) => e.target.style.background = 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)'}
                  >
                    Tạo album
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Modal */}
      {statsModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            zIndex: 50,
            padding: '60px 16px 16px 16px'
          }}
          onClick={() => setStatsModalOpen(false)}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '8px',
              maxWidth: '900px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              marginTop: '20px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: '24px' }}>
              {(() => {
                const modalData = getStatsModalData();
                if (!modalData) return null;
                
                const IconComponent = modalData.icon;
                
                return (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <IconComponent style={{ width: '24px', height: '24px', color: '#f59e0b' }} />
                        </div>
                        <div>
                          <h2 style={{ color: '#92400e', fontSize: '24px', fontWeight: 'bold', margin: '0 0 4px 0' }}>{modalData.title}</h2>
                          <p style={{ color: '#b45309', margin: '0' }}>{modalData.description}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setStatsModalOpen(false)}
                        style={{
                          background: 'rgba(0, 0, 0, 0.1)',
                          border: 'none',
                          borderRadius: '50%',
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'background 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.2)'}
                        onMouseLeave={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.1)'}
                      >
                        <X style={{ width: '16px', height: '16px' }} />
                      </button>
                    </div>

                    {!modalData.isPhotoList ? (
                      // Hiển thị danh sách albums
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                        {modalData.photos.map((album) => (
                          <div
                            key={album.id}
                            style={{
                              border: '1px solid #f59e0b',
                              borderRadius: '8px',
                              padding: '16px',
                              background: 'white',
                              transition: 'all 0.2s',
                              cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.transform = 'translateY(-2px)';
                              e.target.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.transform = 'translateY(0)';
                              e.target.style.boxShadow = 'none';
                            }}
                          >
                            <div style={{ textAlign: 'center' }}>
                              <div style={{ width: '60px', height: '60px', borderRadius: '8px', background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <LayoutGrid style={{ width: '24px', height: '24px', color: '#f59e0b' }} />
                              </div>
                              <h3 style={{ color: '#92400e', fontSize: '16px', fontWeight: '600', margin: '0 0 4px 0' }}>{album.name}</h3>
                              <p style={{ color: '#b45309', fontSize: '14px', margin: '0 0 8px 0' }}>{album.photoCount} ảnh</p>
                              <p style={{ color: '#6b7280', fontSize: '12px', margin: '0' }}>{album.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      // Hiển thị danh sách ảnh
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
                        {modalData.photos.map((photo) => (
                          <div
                            key={photo.id}
                            style={{
                              border: '1px solid #f59e0b',
                              borderRadius: '8px',
                              overflow: 'hidden',
                              background: 'white',
                              transition: 'all 0.2s',
                              cursor: 'pointer'
                            }}
                            onClick={() => {
                              setSelectedPhoto(photo);
                              setStatsModalOpen(false);
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.transform = 'translateY(-2px)';
                              e.target.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.transform = 'translateY(0)';
                              e.target.style.boxShadow = 'none';
                            }}
                          >
                            <img
                              src={photo.url}
                              alt={photo.title}
                              style={{
                                width: '100%',
                                height: '150px',
                                objectFit: 'cover'
                              }}
                            />
                            <div style={{ padding: '12px' }}>
                              <h4 style={{ color: '#92400e', fontSize: '14px', fontWeight: '600', margin: '0 0 4px 0' }}>{photo.title}</h4>
                              <p style={{ color: '#b45309', fontSize: '12px', margin: '0 0 8px 0' }}>{photo.description}</p>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                                <span style={{ color: '#6b7280' }}>{new Date(photo.date).toLocaleDateString('vi-VN')}</span>
                                <span style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <Heart style={{ width: '12px', height: '12px', fill: 'currentColor' }} />
                                  {photo.likes}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {modalData.photos.length === 0 && (
                      <div style={{ textAlign: 'center', padding: '48px 0' }}>
                        <IconComponent style={{ width: '64px', height: '64px', margin: '0 auto 16px', color: '#f59e0b' }} />
                        <h3 style={{ color: '#92400e', fontSize: '18px', margin: '0 0 8px 0' }}>Không có dữ liệu</h3>
                        <p style={{ color: '#b45309', margin: '0' }}>Chưa có thông tin để hiển thị</p>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Album;