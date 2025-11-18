import React, { useState } from "react";

const Icon = ({ name, size = 16, color = '#6b7280' }) => (
    <i className={`bi-${name}`} style={{ fontSize: size, color }} />
);

const categories = [
  { id: "general", name: "Thảo luận chung", color: "bg-blue-500" },
  { id: "history", name: "Lịch sử gia tộc", color: "bg-purple-500" },
  { id: "genealogy", name: "Tra cứu gia phả", color: "bg-green-500" },
  { id: "events", name: "Sự kiện", color: "bg-orange-500" },
  { id: "stories", name: "Câu chuyện", color: "bg-pink-500" },
  { id: "photos", name: "Ảnh & Video", color: "bg-indigo-500" },
];

export function CreatePost({ open, onOpenChange, onCreatePost }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleRemoveImage = (index) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!title || !content || !category) return;

    const selectedCategory = categories.find(cat => cat.id === category);
    const now = new Date();
    const initials = title
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(word => word[0]?.toUpperCase())
      .join('') || 'US';

    const post = {
      id: Date.now().toString(),
      title,
      content,
      author: 'Thành viên mới',
      authorAvatar: initials,
      category: selectedCategory ? selectedCategory.name : 'Khác',
      categoryId: category,
      replies: 0,
      likes: 0,
      views: 0,
      createdAt: now.toISOString(),
      tags,
    };

    if (typeof onCreatePost === 'function') {
      onCreatePost(post);
    }

    onOpenChange(false);
    // Reset form
    setTitle("");
    setContent("");
    setCategory("");
    setTags([]);
    setUploadedImages([]);
  };

  const insertFormatting = (format) => {
    // Simple text formatting - in a real app, you'd use a rich text editor
    const textarea = document.getElementById('post-content');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    let newText = content;

    switch (format) {
      case 'bold':
        newText = content.substring(0, start) + `**${selectedText}**` + content.substring(end);
        break;
      case 'italic':
        newText = content.substring(0, start) + `*${selectedText}*` + content.substring(end);
        break;
      case 'list':
        newText = content.substring(0, start) + `\n- ${selectedText}` + content.substring(end);
        break;
      default:
        newText = content;
        break;
    }

    setContent(newText);
  };

  if (!open) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '60px 20px 0 20px' }} onClick={() => onOpenChange(false)}>
      <div style={{ width: 'min(600px, 90vw)', maxHeight: '85vh', overflow: 'auto', background: '#fff', borderRadius: 14, border: '1px solid #f3f4f6', boxShadow: '0 12px 28px rgba(0,0,0,0.2)' }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{ padding: 16, borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontWeight: 800, color: '#111827', fontSize: 18 }}>Tạo bài viết mới</div>
          <button onClick={() => onOpenChange(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <Icon name="x-lg" size={20} />
          </button>
        </div>

        <div style={{ padding: 24 }}>
          {/* Title Input */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Tiêu đề bài viết</label>
            <input
              placeholder="Nhập tiêu đề bài viết của bạn..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: '100%', height: 40, padding: '0 12px', borderRadius: 10, border: '1px solid #fbbf24', outline: 'none', background: '#fff', fontSize: 14, boxSizing: 'border-box' }}
              onFocus={(e) => { e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.15)'; }}
              onBlur={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
            />
          </div>

          {/* Category Select */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Chủ đề</label>
            <div style={{ position: 'relative' }}>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ width: '100%', height: 40, padding: '0 12px', borderRadius: 10, border: '1px solid #fbbf24', outline: 'none', background: '#fff', fontSize: 14, boxSizing: 'border-box' }}
                onFocus={(e) => { e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.15)'; }}
                onBlur={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
              >
                <option value="">Chọn chủ đề</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Content Editor */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Nội dung</label>
            
            {/* Formatting Toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 8, background: '#fef3c7', border: '1px solid #fbbf24', borderRadius: '10px 10px 0 0' }}>
              <button
                type="button"
                onClick={() => insertFormatting('bold')}
                style={{ padding: 6, borderRadius: 6, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#fbbf24'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                <Icon name="type-bold" size={16} />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('italic')}
                style={{ padding: 6, borderRadius: 6, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#fbbf24'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                <Icon name="type-italic" size={16} />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('list')}
                style={{ padding: 6, borderRadius: 6, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#fbbf24'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                <Icon name="list-ul" size={16} />
              </button>
              <div style={{ width: 1, height: 24, background: '#f59e0b', margin: '0 4px' }}></div>
              <button
                type="button"
                style={{ padding: 6, borderRadius: 6, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#fbbf24'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                <Icon name="link-45deg" size={16} />
              </button>
              <button
                type="button"
                style={{ padding: 6, borderRadius: 6, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#fbbf24'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                <Icon name="justify-left" size={16} />
              </button>
            </div>

            <textarea
              id="post-content"
              placeholder="Viết nội dung bài viết của bạn..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ width: '100%', minHeight: 200, padding: 12, borderRadius: '0 0 10px 10px', border: '1px solid #fbbf24', borderTop: 'none', outline: 'none', background: '#fff', fontSize: 14, resize: 'vertical', boxSizing: 'border-box' }}
              onFocus={(e) => { e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.15)'; }}
              onBlur={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
            />
            <p style={{ fontSize: 12, color: '#f59e0b', marginTop: 4 }}>
              {content.length} ký tự
            </p>
          </div>

          {/* Image Upload */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Hình ảnh</label>
            <div style={{ border: '2px dashed #f59e0b', borderRadius: 10, padding: 32, textAlign: 'center', background: '#fef3c7', cursor: 'pointer', transition: 'background-color 0.2s' }}
                 onMouseEnter={(e) => { e.currentTarget.style.background = '#fde68a'; }}
                 onMouseLeave={(e) => { e.currentTarget.style.background = '#fef3c7'; }}>
              <Icon name="cloud-upload" size={40} color="#f59e0b" />
              <p style={{ color: '#92400e', marginTop: 12, fontWeight: 600 }}>Kéo thả ảnh vào đây hoặc click để chọn</p>
              <p style={{ fontSize: 12, color: '#d97706', marginTop: 4 }}>Hỗ trợ: JPG, PNG, GIF (tối đa 5MB mỗi ảnh)</p>
            </div>

            {/* Uploaded Images Preview */}
            {uploadedImages.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 16 }}>
                {uploadedImages.map((image, index) => (
                  <div key={index} style={{ position: 'relative', borderRadius: 10, overflow: 'hidden' }}>
                    <img
                      src={image}
                      alt={`Upload ${index + 1}`}
                      style={{ width: '100%', height: 96, objectFit: 'cover', border: '2px solid #fbbf24' }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      style={{ position: 'absolute', top: 4, right: 4, width: 24, height: 24, borderRadius: '50%', background: '#ef4444', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tags Input */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
              <Icon name="tag" size={14} style={{ marginRight: 4 }} />
              Thẻ tag
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                placeholder="Nhập tag và nhấn Enter..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                style={{ flex: 1, height: 40, padding: '0 12px', borderRadius: 10, border: '1px solid #fbbf24', outline: 'none', background: '#fff', fontSize: 14, boxSizing: 'border-box' }}
                onFocus={(e) => { e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.15)'; }}
                onBlur={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
              />
              <button
                type="button"
                onClick={handleAddTag}
                style={{ padding: '8px 16px', borderRadius: 10, border: '1px solid #f59e0b', background: '#fff', color: '#92400e', cursor: 'pointer', fontWeight: 600 }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#fef3c7'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; }}
              >
                Thêm
              </button>
            </div>

            {/* Tags Display */}
            {tags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
                {tags.map((tag) => (
                  <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, padding: '4px 8px', borderRadius: 12, background: '#fef3c7', color: '#92400e', border: '1px solid #fbbf24' }}>
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d97706', fontSize: 14, padding: 2 }}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 20, borderTop: '1px solid #fbbf24' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#d97706' }}>
              <Icon name="image" size={16} />
              <span>{uploadedImages.length} ảnh đã tải lên</span>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                style={{ padding: '10px 20px', borderRadius: 10, border: '1px solid #f59e0b', background: '#fff', color: '#92400e', cursor: 'pointer', fontWeight: 600 }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#fef3c7'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; }}
              >
                Hủy
              </button>
              <button
                type="button"
                style={{ padding: '10px 20px', borderRadius: 10, border: '1px solid #f59e0b', background: '#fff', color: '#92400e', cursor: 'pointer', fontWeight: 600 }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#fef3c7'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; }}
              >
                Lưu nháp
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!title || !content || !category}
                style={{ 
                  padding: '10px 20px', 
                  borderRadius: 10, 
                  border: '1px solid #f59e0b', 
                  background: (!title || !content || !category) ? '#f3f4f6' : 'linear-gradient(90deg,#f59e0b,#fb923c)', 
                  color: (!title || !content || !category) ? '#9ca3af' : '#fff', 
                  cursor: (!title || !content || !category) ? 'not-allowed' : 'pointer', 
                  fontWeight: 600,
                  opacity: (!title || !content || !category) ? 0.5 : 1
                }}
                onMouseEnter={(e) => { 
                  if (title && content && category) {
                    e.currentTarget.style.filter = 'brightness(1.05)'; 
                  }
                }}
                onMouseLeave={(e) => { 
                  if (title && content && category) {
                    e.currentTarget.style.filter = 'none'; 
                  }
                }}
              >
                Đăng bài
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
