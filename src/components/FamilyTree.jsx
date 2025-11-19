import React, { useState, useEffect } from 'react';
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
import AddSpouseModal from './AddSpouseModal';
import AddChildModal from './AddChildModal';
import EditMemberModal from './EditMemberModal';
import { familyMembersData, buildFamilyTree } from '../data/familyMembersData';
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
  const [showAddSpouseModal, setShowAddSpouseModal] = useState(false);
  const [showAddChildModal, setShowAddChildModal] = useState(false);
  // Build familyData từ dữ liệu gốc + các thành viên động lưu trong localStorage
  const [familyData, setFamilyData] = useState(() => {
    let allMembers = familyMembersData;
    try {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem('extraFamilyMembers') : null;
      if (raw) {
        const extras = JSON.parse(raw);
        if (Array.isArray(extras)) {
          allMembers = [...familyMembersData, ...extras];
        }
      }
    } catch (e) {
      console.error('Error reading extraFamilyMembers from localStorage', e);
    }

    // Chuẩn hóa quan hệ cha/con: dựa vào trường parents để bổ sung children cho cha/mẹ
    const normalizedMembers = allMembers.map(m => ({
      ...m,
      children: Array.isArray(m.children) ? [...m.children] : []
    }));

    normalizedMembers.forEach(member => {
      if (Array.isArray(member.parents)) {
        member.parents.forEach(parentId => {
          const parent = normalizedMembers.find(p => p.id === parentId);
          if (parent) {
            if (!Array.isArray(parent.children)) parent.children = [];
            if (!parent.children.includes(member.id)) {
              parent.children.push(member.id);
            }
          }
        });
      }
    });

    const initialTree = buildFamilyTree(normalizedMembers);

    // Thêm các thuộc tính cần thiết cho cấu trúc mới
    const enhanceNode = (node, visited = new WeakSet()) => {
      if (!node || visited.has(node)) return node;
      visited.add(node);

      // Nếu node có thuộc tính spouse (dạng raw) chuyển sang spouseLinks
      if (node.spouse && !node.spouseLinks) {
        node.spouseLinks = [{
          id: node.spouse.id,
          status: node.spouse.marriageStatus || 'married',
          side: 'right',
          data: node.spouse,
          children: node.children ? [...node.children] : [],
          isActiveMarriage: node.spouse.marriageStatus !== 'divorced'
        }];
        // remove raw spouse to avoid confusion
        delete node.spouse;
      }

      node.children = node.children || [];
      node.spouseLinks = node.spouseLinks || [];
      node.marriageStatus = node.marriageStatus || 'single';

      // Đệ quy cho children (thông thường buildFamilyTree sẽ đặt child nodes ở đây)
      node.children = node.children.map(child => enhanceNode(child, visited));

      // Đệ quy cho các children nằm trong spouseLinks[] (nếu buildFamilyTree nhóm con theo marriage)
      node.spouseLinks = node.spouseLinks.map(link => {
        // ensure link.children is array of nodes
        link.children = (Array.isArray(link.children) ? link.children : []).map(ch => enhanceNode(ch, visited));
        // ensure link.data exists (raw spouse info)
        link.data = link.data || null;
        return link;
      });

      return node;
    };

    const enhancedTree = enhanceNode(initialTree);

    return enhancedTree;
  });
  // Do not persist to localStorage; always use source data during development
  // No post-init rebuild or debug logging - component uses source data only
  const [showEditModal, setShowEditModal] = useState(false);
  // no localStorage utility - component uses source data only

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 10, 50));
  };

  const handleMemberClick = (member) => {
    setSelectedMember(member);
  };

  // Hàm kiểm tra xem có thể thêm vợ/chồng không
  const canAddSpouse = (member) => {
    if (!member) return false;
    // If the selected item is a spouse node (id ends with -s), resolve to the owner node
    let effective = member;
    if (typeof member.id === 'string' && member.id.endsWith('-s')) {
      const owner = findSpouseOwner(familyData, member.id)?.ownerNode;
      if (owner) effective = owner;
    }

    // Quy tắc permission:
    // - Nếu người đó là người ruột (isFamilyMember === true OR isInLaw not true),
    //   thì khi đã ly hôn vẫn được quyền thêm vợ/chồng mới.
    // - Nếu người đó là dâu/rể (isInLaw === true || isFamilyMember === false),
    //   và đang ở trạng thái 'divorced', thì KHÔNG được quyền thêm vợ/chồng mới.
    // Determine if the effective node is an in-law (dâu/rể). Fallback: id ending with '-s' indicates spouse node
    const isInLaw = effective.isInLaw === true || effective.isFamilyMember === false || (typeof effective.id === 'string' && effective.id.endsWith('-s'));
    const isDivorced = effective.marriageStatus === 'divorced';

    if (isDivorced && isInLaw) return false; // divorced in-law cannot add spouse

    // Allow adding spouse when single, or when divorced but not an in-law (i.e., blood member)
    return effective.marriageStatus === 'single' || (isDivorced && !isInLaw);
  };

  // Helper: whether this member currently has action permissions (in-law who is divorced loses all non-edit functions)
  const hasActiveFunctions = (member) => {
    if (!member) return false;
    const isInLaw = member.isInLaw === true || member.isFamilyMember === false || (typeof member.id === 'string' && member.id.endsWith('-s'));
    if (isInLaw && member.marriageStatus === 'divorced') return false;
    return true;
  };

  // Hàm kiểm tra xem có thể thêm con không
  const canAddChild = (member) => {
    if (!member) return false;
    // If member has no active functions (e.g., divorced in-law), they cannot add child
    if (!hasActiveFunctions(member)) return false;
    // If selected node is a spouse, check both the spouse's status and the owner marriage status
    if (typeof member.id === 'string' && member.id.endsWith('-s')) {
      const owner = findSpouseOwner(familyData, member.id)?.ownerNode;
      const spouseStatus = member.marriageStatus;
      const ownerStatus = owner?.marriageStatus;
      return spouseStatus === 'married' || ownerStatus === 'married';
    }

    // For regular member, just check their marriageStatus
    return member.marriageStatus === 'married';
  };

  // Hàm thêm vợ/chồng mới
  const handleAddSpouse = (memberId, newSpouse) => {
    console.log('[FamilyTree] handleAddSpouse called for', memberId, newSpouse);
    
    setFamilyData(prev => {
      // 1. Clone cây
      const root = JSON.parse(JSON.stringify(prev));

      // 2. Tìm node "chủ" (owner)
      let targetNode = null;
      const ownerInfo = findSpouseOwner(root, memberId);
      
      if (ownerInfo) {
        targetNode = ownerInfo.ownerNode;
      } else {
        targetNode = findNodeById(root, memberId); 
      }

      if (!targetNode) {
        console.error('Target member not found:', memberId);
        return prev;
      }

      // 3. Tạo node vợ/chồng mới
      const newSpouseNode = {
        ...newSpouse,
        id: `${targetNode.id}-s-${Date.now()}`, 
        generation: targetNode.generation,
        marriageStatus: 'married',
        isInLaw: true,
        isFamilyMember: false
      };

      // 4. Cập nhật trạng thái của owner
      targetNode.marriageStatus = 'married';

      if (!targetNode.spouseLinks) {
        targetNode.spouseLinks = [];
      }

      // 5. Xử lý ly hôn vợ/chồng cũ và ĐỒNG BỘ HÓA
      targetNode.spouseLinks.forEach(link => {
        if (link.status === 'married') {
          link.status = 'divorced';
          link.isActiveMarriage = false;
          
          if (link.data) {
            link.data.marriageStatus = 'divorced';
          }
          
          const exSpouseNode = findNodeById(root, link.id);
          if (exSpouseNode) {
            exSpouseNode.marriageStatus = 'divorced';
          }
        }
      });

      // 6. SỬA: Xác định bên (side) cho vợ/chồng mới
      // Kiểm tra xem đã có ai ở bên phải chưa (thường là người đầu tiên)
      const hasRightLink = targetNode.spouseLinks.some(link => link.side === 'right');
      
      // Nếu bên phải đã có người, thêm người mới vào bên trái
      const newSide = hasRightLink ? 'left' : 'right';

      console.log(`[FamilyTree] Determining side. Has right link: ${hasRightLink}. Assigning new spouse to: ${newSide}`);

      // 7. Tạo marriage link mới
      const marriageLink = {
        id: newSpouseNode.id,
        status: 'married',
        side: newSide, // <-- SỬ DỤNG BIẾN newSide
        data: newSpouseNode,
        children: [],
        isActiveMarriage: true
      };

      // 8. Thêm vào spouseLinks của owner
      targetNode.spouseLinks.push(marriageLink);

      // 9. Lưu và cập nhật state
      try {
        localStorage.setItem('familyData', JSON.stringify(root));
      } catch (e) {
        console.error('Error saving to localStorage:', e);
      }

      const updatedOwnerNode = findNodeById(root, targetNode.id);
      setSelectedMember(updatedOwnerNode);

      return root; // Trả về cây đã cập nhật
    });
    
    setShowAddSpouseModal(false);
  };

  // Hàm thêm con mới
  const handleAddChild = (memberId, newChildData) => {
    // SỬA 1: Dùng memberId, không dùng selectedMember
    if (!memberId) return;

    setFamilyData((prev) => {
      // Clone cây hiện tại để tránh mutate trực tiếp
      const root = JSON.parse(JSON.stringify(prev));

      // Hàm đệ quy tìm parent node (giữ nguyên)
      const findParentNode = (node, id) => {
        if (node.id === id) return node;

        // Tìm trong spouseLinks
        if (node.spouseLinks) {
          for (let link of node.spouseLinks) {
            if (link.id === id) return node; // Trả về owner node, logic này ok
            const foundInSpouse = findParentNode(link.data || {}, id);
            if (foundInSpouse) return foundInSpouse;
            if (link.children) {
              for (let ch of link.children) {
                const foundChild = findParentNode(ch, id);
                if (foundChild) return foundChild;
              }
            }
          }
        }

        // Tìm trong children
        if (node.children) {
          for (let ch of node.children) {
            const foundChild = findParentNode(ch, id);
            if (foundChild) return foundChild;
          }
        }

        return null;
      };

      // SỬA 2: Dùng memberId (từ tham số) để tìm
      const parentNode = findParentNode(root, memberId);

      if (!parentNode) {
        console.warn('Không tìm thấy node cha:', memberId);
        return prev;
      }

      // SỬA 3: Lấy thông tin từ 'newChildData' (tham số thứ 2)
      const newChild = {
        id: `${memberId}-c-${Date.now()}`, // Tạo ID con dựa trên ID cha
        name: newChildData.name,           // Lấy tên từ newChildData
        gender: newChildData.gender,         // Lấy giới tính từ newChildData
        birthYear: newChildData.birthYear || "",
        job: newChildData.job || "",
        marriageStatus: "single",
        children: [],
        spouseLinks: [],
        generation: (parentNode.generation || 0) + 1,
      };

      // Logic gắn con (giữ nguyên, dù có thể vẫn chưa xử lý đúng ca dâu/rể)
      const activeSpouse = parentNode.spouseLinks?.find(l => l.status === "married");
      if (activeSpouse) {
        if (!activeSpouse.children) activeSpouse.children = [];
        activeSpouse.children.push(newChild);
      } else {
        if (!parentNode.children) parentNode.children = [];
        parentNode.children.push(newChild);
      }

      // Cập nhật selectedMember và re-render (giữ nguyên)
      const updatedTree = JSON.parse(JSON.stringify(root));

      // Cập nhật selectedMember (có thể muốn chọn đứa con mới thay vì cha)
      // Thử tìm node con vừa thêm:
      const addedChildNode = findNodeById(updatedTree, newChild.id);
      setSelectedMember(addedChildNode || findNodeById(updatedTree, parentNode.id));

      return updatedTree;
    });

    setShowAddChildModal(false);
  };


  const MemberCard = ({ member, isRoot = false }) => {
    const isAlive = !member.deathYear;
    const age = member.deathYear
      ? parseInt(member.deathYear) - parseInt(member.birthYear)
      : new Date().getFullYear() - parseInt(member.birthYear);

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
                {member.birthYear} {member.deathYear && `- ${member.deathYear}`}
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
          <span style={{ color: '#6b7280', fontSize: '16px' }}>{member.job || '—'}</span>
        </div>

        {/* Footer: Đời x (trái) + Tuổi/Đã mất (phải) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
          <span style={{
            fontSize: '14px', padding: '10px 16px', borderRadius: '16px', background: '#fff',
            border: '2px solid #ede9fe', color: '#111827', boxShadow: 'inset 0 0 0 1px #f4f4f5'
          }}>Đời {member.generation}</span>
          {member.deathYear ? (
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

        {/* Trạng thái hôn nhân */}
        {member.marriageStatus && (
          <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'center' }}>
            <span style={{
              fontSize: '12px', padding: '6px 12px', borderRadius: '12px',
              background: member.marriageStatus === 'married' ? '#dcfce7' :
                member.marriageStatus === 'divorced' ? '#fef3c7' : '#e0f2fe',
              color: member.marriageStatus === 'married' ? '#166534' :
                member.marriageStatus === 'divorced' ? '#92400e' : '#0c4a6e',
              border: '1px solid',
              borderColor: member.marriageStatus === 'married' ? '#bbf7d0' :
                member.marriageStatus === 'divorced' ? '#fde68a' : '#93c5fd'
            }}>
              {member.marriageStatus === 'married' ? 'Đã kết hôn' :
                member.marriageStatus === 'divorced' ? 'Đã ly hôn' : 'Độc thân'}
            </span>
          </div>
        )}

        {/* Hiển thị vai trò trong gia đình */}
        {member.id.endsWith('-s') && (
          <div style={{ marginTop: '4px', display: 'flex', justifyContent: 'center' }}>
            <span style={{
              fontSize: '10px', padding: '4px 8px', borderRadius: '8px',
              background: '#f3f4f6', color: '#6b7280', border: '1px solid #e5e7eb'
            }}>
              {member.gender === 'male' ? 'Rể' : 'Dâu'}
            </span>
          </div>
        )}
      </div>
    );
  };

  const findNodeById = (root, id) => {
    if (!root || !id) return null;
    let found = null;
    const walk = (n) => {
      if (!n || found) return;
      if (n.id === id) { found = n; return; }
      // check spouseLinks (link data or link id)
      if (n.spouseLinks && n.spouseLinks.length) {
        for (let i = 0; i < n.spouseLinks.length; i++) {
          const link = n.spouseLinks[i];
          if ((link.id && link.id === id) || (link.data && link.data.id === id)) {
            // if the spouse exists as a top-level node it will be found elsewhere; otherwise return the link.data (raw)
            if (link.data && (!link.data.children || link.data.children.length === 0) && !link.data.generation) {
              found = link.data;
              return;
            }
          }
        }
      }
      // check nested spouse object (legacy)
      if (n.spouse && n.spouse.id === id) { found = n.spouse; return; }
      if (n.children) n.children.forEach(walk);
      if (n.spouseLinks && n.spouseLinks.length) {
        n.spouseLinks.forEach(link => {
          if (link.children) link.children.forEach(walk);
        });
      }
    };
    walk(root);
    return found;
  };

  // Find a node in the tree that has a spouseLink referencing the given member id.
  // Returns { ownerNode, link } if found, otherwise null.
  const findSpouseOwner = (root, memberId) => {
    if (!root || !memberId) return null;
    let result = null;
    const walk = (n) => {
      if (!n || result) return;
      if (n.spouseLinks && n.spouseLinks.length > 0) {
        for (let i = 0; i < n.spouseLinks.length; i++) {
          const link = n.spouseLinks[i];
          if ((link.id && link.id === memberId) || (link.data && link.data.id === memberId)) {
            result = { ownerNode: n, link };
            return;
          }
        }
      }
      if (n.children) n.children.forEach(w => walk(w));
    };
    walk(root);
    return result;
  };

  const MemberNode = ({ member, isRoot = false }) => {
    console.log("MemberNode rendering for:", member?.id, "isRoot:", isRoot);
    if (!member) {
      console.error("MemberNode received null/undefined member");
      return null;
    }

    // Kiểm tra xem member này có phải là một phần của cặp vợ chồng khác không
    const external = findSpouseOwner(familyData, member.id);
    console.log("External relationship found:", external);
    if (external && external.ownerNode && external.ownerNode.id !== member.id) {
      const owner = external.ownerNode;
      const link = external.link;

      // Quyết định thứ tự: nếu link.side === 'right' thì owner ở bên trái, member ở bên phải
      const pairLeft = link.side === 'right' ? owner : member;
      const pairRight = link.side === 'right' ? member : owner;

      // Lấy danh sách con của cặp vợ chồng này
      const coupleChildren = link.status === 'married' ? (link.children || []) : [];

      // Xác định xem cặp đôi này có phải là cuộc hôn nhân hiện tại không
      const isCurrentMarriage = link.status === 'married';

      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative' }}>
            {/* Thẻ vợ/chồng bên trái */}
            <MemberCard member={pairLeft} />

            {/* Đường kết nối giữa cặp đôi */}
            <div style={{
              width: '2px',
              height: '28px',
              background: isCurrentMarriage ? '#10b981' : '#f59e0b', // Màu xanh cho hôn nhân hiện tại, cam cho ly hôn
              borderRadius: '2px',
              opacity: isCurrentMarriage ? 1 : 0.7 // Giảm độ đậm cho quan hệ ly hôn
            }} />

            {/* Thẻ vợ/chồng bên phải */}
            <MemberCard member={pairRight} />
          </div>

          {/* Hiển thị con cái của cặp đôi */}
          {coupleChildren && coupleChildren.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '24px' }}>
              {/* Đường dọc từ cặp đôi xuống con cái */}
              <div style={{
                width: '2px',
                height: '24px',
                background: '#fbbf24',
                borderRadius: '2px',
                opacity: isCurrentMarriage ? 1 : 0.7 // Giảm độ đậm cho quan hệ ly hôn
              }} />

              <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                {coupleChildren.map((child, index) => (
                  <div key={child.id || index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {coupleChildren.length > 1 && (
                      <div style={{ position: 'relative', width: '100%', height: '16px' }}>
                        {/* Đường ngang nối các con */}
                        {index === 0 && (
                          <div style={{
                            position: 'absolute',
                            top: 0,
                            left: '50%',
                            width: '50%',
                            height: '1px',
                            background: '#fbbf24',
                            opacity: isCurrentMarriage ? 1 : 0.7
                          }} />
                        )}
                        {index === coupleChildren.length - 1 && (
                          <div style={{
                            position: 'absolute',
                            top: 0,
                            right: '50%',
                            width: '50%',
                            height: '1px',
                            background: '#fbbf24',
                            opacity: isCurrentMarriage ? 1 : 0.7
                          }} />
                        )}
                        {index > 0 && index < coupleChildren.length - 1 && (
                          <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '1px',
                            background: '#fbbf24',
                            opacity: isCurrentMarriage ? 1 : 0.7
                          }} />
                        )}
                        {/* Đường dọc xuống mỗi con */}
                        <div style={{
                          width: '1px',
                          height: '16px',
                          background: '#fbbf24',
                          margin: '0 auto',
                          opacity: isCurrentMarriage ? 1 : 0.7
                        }} />
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
    }
    // Build spouse links from spouseLinks if present, otherwise fallback to single spouse
    const spouseLinks = member.spouseLinks && member.spouseLinks.length > 0
      ? member.spouseLinks
      : (member.spouse ? [{ id: member.spouse.id, status: member.spouse.marriageStatus || 'married', side: 'right' }] : []);

    const leftLinks = spouseLinks.filter(s => s.side === 'left');
    const rightLinks = spouseLinks.filter(s => s.side === 'right');

    const renderSpouseCard = (link, idx) => {
      // try to find the full node in the tree so we show complete info. If not present,
      // use the inline data saved on the link (created when adding a new spouse) so we
      // can render full info without adding a top-level duplicate node.
      const found = findNodeById(familyData, link.id);
      const node = found || link.data || { id: link.id, name: '(không rõ)', marriageStatus: link.status };
      const lineColor = link.status === 'divorced' ? '#f59e0b' : '#10b981';
      const lineStyle = {
        background: lineColor,
        height: '2px',
        width: '18px',
        borderRadius: '2px',
        opacity: link.status === 'divorced' ? 0.7 : 1
      };

      return (
        <React.Fragment key={node.id + '-' + idx}>
          {/* spouse card */}
          <MemberCard member={node} />
          {/* marriage line (to main member) */}
          <div style={lineStyle} />
        </React.Fragment>
      );
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        {/* Couple Section with left spouses, main member, right spouses */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Left spouses (render each with a line towards main) */}
          {leftLinks.map((l, i) => (
            <div key={l.id + '-left-' + i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {renderSpouseCard(l, i)}
            </div>
          ))}

          {/* Main Member */}
          <MemberCard member={member} isRoot={isRoot} />

          {/* Right spouses */}
          {rightLinks.map((l, i) => (
            <div key={l.id + '-right-' + i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* marriage line */}
              <div style={{ width: '18px', height: '2px', background: l.status === 'divorced' ? '#f59e0b' : '#10b981', borderRadius: '2px' }} />
              {/* spouse card */}
              <MemberCard member={findNodeById(familyData, l.id) || l.data || { id: l.id, name: '(không rõ)', marriageStatus: l.status }} />
            </div>
          ))}
        </div>

        {/* Children Section: prefer children attached to spouseLinks (couple grouping), fallback to member.children */}
        {(() => {
          // Collect children from spouseLinks based on marriage status
          let marriedLinkChildren = [];
          let divorcedLinkChildren = [];

          if (member.spouseLinks && member.spouseLinks.length > 0) {
            member.spouseLinks.forEach(link => {
              if (link.children && link.children.length > 0) {
                if (link.status === 'married') {
                  marriedLinkChildren = marriedLinkChildren.concat(link.children);
                } else if (link.status === 'divorced') {
                  divorcedLinkChildren = divorcedLinkChildren.concat(link.children);
                }
              }
            });
          }

          // Also consider direct children array as a fallback (some data uses member.children)
          const directChildren = Array.isArray(member.children) ? member.children : [];

          // Prefer children grouped under spouseLinks; if none, fall back to direct children
          let marriedChildrenToRender = marriedLinkChildren.length ? marriedLinkChildren : [];
          let divorcedChildrenToRender = divorcedLinkChildren.length ? divorcedLinkChildren : [];

          if (!marriedChildrenToRender.length && !divorcedChildrenToRender.length && directChildren.length) {
            marriedChildrenToRender = marriedChildrenToRender.concat(directChildren);
          }

          if (!marriedChildrenToRender.length && !divorcedChildrenToRender.length) return null;

          // Render helper function for child connections
          const renderChildConnections = (children, isDivorced = false) => {
            if (!children || children.length === 0) return null;
            return (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '24px' }}>
                {/* Vertical line from couple to horizontal line */}
                <div style={{
                  width: '2px',
                  height: '24px',
                  background: '#fbbf24',
                  borderRadius: '2px',
                  opacity: isDivorced ? 0.7 : 1
                }} />

                {/* Horizontal line connecting to children */}
                <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                  {children.map((child, index) => (
                    <div key={child.id || index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      {children.length > 1 && (
                        <div style={{ position: 'relative', width: '100%', height: '16px' }}>
                          {index === 0 && (
                            <div style={{
                              position: 'absolute',
                              top: 0,
                              left: '50%',
                              width: '50%',
                              height: '1px',
                              background: '#fbbf24',
                              opacity: isDivorced ? 0.7 : 1
                            }} />
                          )}
                          {index === children.length - 1 && (
                            <div style={{
                              position: 'absolute',
                              top: 0,
                              right: '50%',
                              width: '50%',
                              height: '1px',
                              background: '#fbbf24',
                              opacity: isDivorced ? 0.7 : 1
                            }} />
                          )}
                          {index > 0 && index < children.length - 1 && (
                            <div style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '1px',
                              background: '#fbbf24',
                              opacity: isDivorced ? 0.7 : 1
                            }} />
                          )}
                          <div style={{
                            width: '1px',
                            height: '16px',
                            background: '#fbbf24',
                            margin: '0 auto',
                            opacity: isDivorced ? 0.7 : 1
                          }} />
                        </div>
                      )}
                      <MemberNode member={child} />
                    </div>
                  ))}
                </div>
              </div>
            );
          };

          // Render both sets of children
          return (
            <>
              {renderChildConnections(marriedChildrenToRender, false)}
              {renderChildConnections(divorcedChildrenToRender, true)}
            </>
          );
        })()}
      </div>
    );
  };

  return (
    <div style={{ padding: '32px', background: '#fef3c7', minHeight: 'calc(100vh - 70px)' }}>
      <style>{`
        .action-btn { width:100%; padding:10px 16px; border-radius:10px; border:none; display:flex; align-items:center; justify-content:center; gap:8px; font-weight:600; cursor:pointer; transition: transform .12s ease, box-shadow .12s ease, opacity .12s; box-shadow: 0 6px 18px rgba(2,6,23,0.08); }
        .action-btn.edit-btn { background: linear-gradient(90deg,#3b82f6,#1d4ed8); color:#fff }
        .action-btn.edit-btn:hover { transform: translateY(-3px); box-shadow: 0 18px 40px rgba(59,130,246,0.18); }
        .action-btn.edit-btn:active { transform: translateY(0); opacity: 0.95 }
        .action-btn.edit-btn:focus { outline: 3px solid rgba(59,130,246,0.12); }
      `}</style>
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
          {/* (localStorage disabled) */}
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
          {!familyData ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <h3>Không thể tải dữ liệu gia phả</h3>
              <p>Vui lòng kiểm tra console để biết thêm chi tiết.</p>
            </div>
          ) : (
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
          )}
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
                    <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                      Đời {selectedMember.generation}
                      {selectedMember.id.endsWith('-s') && (
                        <span style={{
                          marginLeft: '8px',
                          padding: '2px 6px',
                          background: '#f3f4f6',
                          color: '#6b7280',
                          borderRadius: '4px',
                          fontSize: '10px'
                        }}>
                          {selectedMember.gender === 'male' ? 'Rể' : 'Dâu'}
                        </span>
                      )}
                    </div>
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
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Năm sinh</div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>{selectedMember.birthYear}</div>
                  </div>
                </div>

                {selectedMember.deathYear && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#f3f4f6', borderRadius: '8px' }}>
                    <Icon name="x-circle" size={16} color="#6b7280" />
                    <div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>Năm mất</div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>{selectedMember.deathYear}</div>
                    </div>
                  </div>
                )}

                {selectedMember.job && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#dbeafe', borderRadius: '8px' }}>
                    <Icon name="briefcase" size={16} color="#6b7280" />
                    <div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>Nghề nghiệp</div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>{selectedMember.job}</div>
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
                <button className="action-btn edit-btn" onClick={() => setShowEditModal(true)}>
                  <Icon name="pencil-square" size={16} color="#fff" />
                  Chỉnh sửa thông tin
                </button>

                {/* Nút thêm vợ/chồng - chỉ hiển thị cho người ruột khi có thể thêm */}
                {canAddSpouse(selectedMember) && (
                  <button
                    onClick={() => setShowAddSpouseModal(true)}
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      background: 'linear-gradient(90deg,#ec4899,#be185d)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <Icon name="heart" size={16} color="#fff" />
                    {selectedMember.marriageStatus === 'single' ? 'Thêm vợ/chồng' : 'Thêm vợ/chồng mới'}
                  </button>
                )}

                {/* Thông báo cho người dâu/rể đã ly hôn */}
                {selectedMember.id.endsWith('-s') && selectedMember.marriageStatus === 'divorced' && (
                  <div style={{
                    width: '100%',
                    maxWidth: '100%',
                    boxSizing: 'border-box',
                    padding: '12px 16px',
                    background: '#fef3c7',
                    color: '#92400e',
                    border: '1px solid #fbbf24',
                    borderRadius: '8px',
                    fontSize: '13px',
                    textAlign: 'center',
                    fontWeight: '500',
                    wordBreak: 'break-word',
                    overflow: 'hidden'
                  }}>
                    <Icon name="info-circle" size={14} color="#92400e" style={{ marginRight: '6px' }} />
                    Người dâu/rể đã ly hôn không có quyền thêm vợ/chồng mới
                  </div>
                )}

                {/* Nút thêm con - hiển thị khi có thể thêm */}
                {canAddChild(selectedMember) && (
                  <button
                    onClick={() => setShowAddChildModal(true)}
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      background: 'linear-gradient(90deg,#10b981,#059669)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <Icon name="person-plus" size={16} color="#fff" />
                    Thêm con
                  </button>
                )}
                {/* Nếu là người độc thân: hiển thị hướng dẫn không thể thêm con, nên thêm vợ/chồng trước */}
                {selectedMember.marriageStatus === 'single' && (
                  <div style={{
                    width: '100%',
                    maxWidth: '100%',
                    boxSizing: 'border-box',
                    padding: '12px 16px',
                    background: '#fff7ed',
                    color: '#78350f',
                    border: '1px solid #fcd34d',
                    borderRadius: '8px',
                    fontSize: '13px',
                    textAlign: 'center',
                    fontWeight: '500',
                    wordBreak: 'break-word',
                    overflow: 'hidden'
                  }}>
                    <Icon name="info-circle" size={14} color="#78350f" style={{ marginRight: '6px' }} />
                    Người đang ở trạng thái "Độc thân" không thể thêm con trực tiếp. Vui lòng thêm vợ/chồng trước.
                  </div>
                )}
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

      {/* Modals */}
      <AddSpouseModal
        isOpen={showAddSpouseModal}
        onClose={() => setShowAddSpouseModal(false)}
        onAddSpouse={handleAddSpouse}
        member={selectedMember}
      />

      <AddChildModal
        isOpen={showAddChildModal}
        onClose={() => setShowAddChildModal(false)}
        onAddChild={handleAddChild}
        member={selectedMember}
      />

      <EditMemberModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        member={selectedMember}
        familyData={familyData} 
        onSubmit={(updated) => {
          setFamilyData(prev => {
            const root = JSON.parse(JSON.stringify(prev));

            // Hàm cập nhật node và các spouseLinks liên quan
            const updateNodeAndSpouses = (node) => {
              if (!node) return node;

              // Nếu node hiện tại là node cần update
              if (node.id === updated.id) {
                const newNode = { ...node, ...updated };

                // Cập nhật marriageStatus trong spouseLinks nếu cần
                if (updated.marriageStatus && newNode.spouseLinks) {
                  newNode.spouseLinks = newNode.spouseLinks.map(link => {
                    if (link.status === 'married') {
                      // Cập nhật trạng thái hôn nhân
                      return {
                        ...link,
                        status: updated.marriageStatus,
                        isActiveMarriage: updated.marriageStatus === 'married'
                      };
                    }
                    return link;
                  });
                }
                return newNode;
              }

              // Kiểm tra và cập nhật trong spouseLinks
              if (node.spouseLinks) {
                let needsUpdate = false;
                const updatedSpouseLinks = node.spouseLinks.map(link => {
                  if (link.id === updated.id || (link.data && link.data.id === updated.id)) {
                    needsUpdate = true;
                    // Cập nhật data trong link
                    const updatedLink = {
                      ...link,
                      data: { ...(link.data || {}), ...updated }
                    };

                    // Nếu marriageStatus được cập nhật, đồng bộ hóa status
                    if (updated.marriageStatus) {
                      updatedLink.status = updated.marriageStatus;
                      updatedLink.isActiveMarriage = updated.marriageStatus === 'married';
                    }

                    return updatedLink;
                  }
                  return link;
                });

                if (needsUpdate) {
                  node = {
                    ...node,
                    spouseLinks: updatedSpouseLinks,
                    // Cập nhật marriageStatus của node chính nếu cần
                    marriageStatus: updated.marriageStatus || node.marriageStatus
                  };
                }
              }

              // Đệ quy cho children
              if (node.children) {
                node.children = node.children.map(updateNodeAndSpouses);
              }

              return node;
            };

            const newTree = updateNodeAndSpouses(root);
            // Nếu cập nhật trạng thái hôn nhân, đồng bộ hóa với đối tác (owner/spouse) và trong spouseLinks
            try {
              if (updated.marriageStatus) {
                const targetStatus = updated.marriageStatus;

                // Helper: update a marriage link and its inline data
                const syncLink = (link) => {
                  if (!link) return;
                  link.status = targetStatus;
                  link.isActiveMarriage = targetStatus === 'married';
                  if (link.data) link.data.marriageStatus = targetStatus;
                };

                // Case A: updated is a spouse link (we can find its owner)
                const ownerInfo = findSpouseOwner(newTree, updated.id);
                if (ownerInfo && ownerInfo.ownerNode) {
                  const owner = ownerInfo.ownerNode;
                  // update owner's marriageStatus to match
                  owner.marriageStatus = targetStatus;

                  // update the specific link in owner.spouseLinks
                  if (owner.spouseLinks) {
                    owner.spouseLinks = owner.spouseLinks.map(link => {
                      if (link.id === updated.id || (link.data && link.data.id === updated.id)) {
                        const newLink = { ...link };
                        syncLink(newLink);

                        // If partner exists as a top-level node, sync them too
                        const partnerNode = findNodeById(newTree, newLink.id) || (newLink.data || null);
                        if (partnerNode) {
                          partnerNode.marriageStatus = targetStatus;
                          // if partner has spouseLinks, ensure their links reflect status for this owner
                          if (partnerNode.spouseLinks) {
                            partnerNode.spouseLinks = partnerNode.spouseLinks.map(pl => {
                              if (pl.id === owner.id || (pl.data && pl.data.id === owner.id)) {
                                const tmp = { ...pl };
                                tmp.status = targetStatus;
                                tmp.isActiveMarriage = targetStatus === 'married';
                                if (tmp.data) tmp.data.marriageStatus = targetStatus;
                                return tmp;
                              }
                              return pl;
                            });
                          }
                        }

                        return newLink;
                      }
                      return link;
                    });
                  }
                } else {
                  // Case B: updated is an owner/top-level node -> sync all his spouseLinks and partner nodes
                  const walkAndSync = (node) => {
                    if (!node) return;
                    if (node.id === updated.id) {
                      node.marriageStatus = targetStatus;
                      if (node.spouseLinks) {
                        node.spouseLinks = node.spouseLinks.map(link => {
                          const newLink = { ...link };
                          syncLink(newLink);

                          // Sync partner node if exists in tree
                          const partner = findNodeById(newTree, newLink.id) || (newLink.data || null);
                          if (partner) {
                            partner.marriageStatus = targetStatus;
                            if (partner.spouseLinks) {
                              partner.spouseLinks = partner.spouseLinks.map(pl => {
                                if (pl.id === node.id || (pl.data && pl.data.id === node.id)) {
                                  const tmp = { ...pl };
                                  tmp.status = targetStatus;
                                  tmp.isActiveMarriage = targetStatus === 'married';
                                  if (tmp.data) tmp.data.marriageStatus = targetStatus;
                                  return tmp;
                                }
                                return pl;
                              });
                            }
                          }

                          return newLink;
                        });
                      }
                    }
                    if (node.children) node.children.forEach(walkAndSync);
                    if (node.spouseLinks) node.spouseLinks.forEach(l => {
                      if (l.children) l.children.forEach(walkAndSync);
                    });
                  };
                  walkAndSync(newTree);
                }
              }

              // Lưu vào localStorage (best-effort)
              try {
                localStorage.setItem('familyData', JSON.stringify(newTree));
              } catch (e) {
                console.error('Error saving to localStorage:', e);
              }
            } catch (e) {
              console.error('Error syncing marriage status:', e);
            }

            // Đồng bộ selectedMember với node mới
            try {
              const refreshed = findNodeById(newTree, updated.id) || (findSpouseOwner(newTree, updated.id)?.ownerNode) || null;
              if (refreshed) setSelectedMember(refreshed);
            } catch (e) { }

            return newTree;
          });

          setShowEditModal(false);
        }}
      />
    </div>
  );
}
