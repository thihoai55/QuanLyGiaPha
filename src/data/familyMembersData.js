// Dữ liệu ảo chi tiết cho thành viên gia phả
export const familyMembersData = [
  // Thế hệ 1 - Tổ tiên
  {
    id: 'g1-1',
    name: 'Nguyễn Văn Cường',
    gender: 'male',
    generation: 1,
    birthYear: 1920,
    deathYear: 2000,
    age: 80,
    birthDate: '15/03/1920',
    deathDate: '20/12/2000',
    address: 'Nghệ An',
    job: 'Nông dân',
    phone: 'Không có',
    email: 'Không có',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    marriageStatus: 'married',
    spouse: {
      id: 'g1-1-s',
      name: 'Trần Thị Lan',
      gender: 'female',
      generation: 1,
      birthYear: 1925,
      deathYear: 2005,
      age: 80,
      birthDate: '10/08/1925',
      deathDate: '15/06/2005',
      address: 'Nghệ An',
      job: 'Nội trợ',
      phone: 'Không có',
      email: 'Không có',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      marriageStatus: 'married'
    },
    children: ['g2-1', 'g2-2'],
    parents: [],
    siblings: [],
    notes: 'Tổ tiên của dòng họ Nguyễn, người đã lập nghiệp tại Nghệ An'
  },

  // Thế hệ 2
  {
    id: 'g2-1',
    name: 'Nguyễn Văn Bình',
    gender: 'male',
    generation: 2,
    birthYear: 1945,
    age: 79,
    birthDate: '20/05/1945',
    address: 'Hà Nội',
    job: 'Giáo viên',
    phone: '0912345678',
    email: 'nguyenvanbinh@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    marriageStatus: 'married',
    spouse: {
      id: 'g2-1-s',
      name: 'Trần Thị Mai',
      gender: 'female',
      generation: 2,
      birthYear: 1948,
      age: 76,
      birthDate: '12/11/1948',
      address: 'Hà Nội',
      job: 'Giáo viên',
      phone: '0923456789',
      email: 'tranthimai@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      marriageStatus: 'married'
    },
    children: ['g3-1', 'g3-2'],
    parents: ['g1-1'],
    siblings: ['g2-2'],
    notes: 'Con trai cả, hiện đã nghỉ hưu, sống tại Hà Nội'
  },
  {
    id: 'g2-2',
    name: 'Nguyễn Thị Hoa',
    gender: 'female',
    generation: 2,
    birthYear: 1950,
    age: 74,
    birthDate: '08/07/1950',
    address: 'TP. Hồ Chí Minh',
    job: 'Y tá',
    phone: '0934567890',
    email: 'nguyenthihua@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    marriageStatus: 'married',
    spouse: {
      id: 'g2-2-s',
      name: 'Hoàng Văn Minh',
      gender: 'male',
      generation: 2,
      birthYear: 1948,
      age: 76,
      birthDate: '25/03/1948',
      address: 'TP. Hồ Chí Minh',
      job: 'Kỹ sư',
      phone: '0945678901',
      email: 'hoangvanminh@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      marriageStatus: 'married'
    },
    children: ['g3-3'],
    parents: ['g1-1'],
    siblings: ['g2-1'],
    notes: 'Con gái, hiện sống tại TP. Hồ Chí Minh'
  },

  // Thế hệ 3
  {
    id: 'g3-1',
    name: 'Nguyễn Văn Dũng',
    gender: 'male',
    generation: 3,
    birthYear: 1970,
    age: 54,
    birthDate: '15/09/1970',
    address: 'Hà Nội',
    job: 'Kỹ sư',
    phone: '0956789012',
    email: 'nguyenvandung@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    marriageStatus: 'married',
    spouse: {
      id: 'g3-1-s',
      name: 'Lê Thị Hương',
      gender: 'female',
      generation: 3,
      birthYear: 1972,
      age: 52,
      birthDate: '22/04/1972',
      address: 'Hà Nội',
      job: 'Bác sĩ',
      phone: '0967890123',
      email: 'lethihuong@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      marriageStatus: 'married'
    },
    children: ['g4-1', 'g4-2'],
    parents: ['g2-1'],
    siblings: ['g3-2'],
    notes: 'Con trai cả của ông Bình, hiện làm việc tại Hà Nội'
  },
  {
    id: 'g3-2',
    name: 'Nguyễn Thị Linh',
    gender: 'female',
    generation: 3,
    birthYear: 1975,
    age: 49,
    birthDate: '30/12/1975',
    address: 'Đà Nẵng',
    job: 'Bác sĩ',
    phone: '0978901234',
    email: 'nguyenthilinh@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    marriageStatus: 'divorced', // Đã ly hôn - có thể thêm vợ/chồng mới
    spouse: {
      id: 'g3-2-s',
      name: 'Phạm Văn Tuấn',
      gender: 'male',
      generation: 3,
      birthYear: 1973,
      age: 51,
      birthDate: '18/06/1973',
      address: 'Đà Nẵng',
      job: 'Doanh nhân',
      phone: '0989012345',
      email: 'phamvantuan@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      marriageStatus: 'divorced'
    },
    children: [],
    parents: ['g2-1'],
    siblings: ['g3-1'],
    notes: 'Con gái của ông Bình, hiện sống tại Đà Nẵng'
  },
  {
    id: 'g3-3',
    name: 'Hoàng Văn Nam',
    gender: 'male',
    generation: 3,
    birthYear: 1980,
    age: 44,
    birthDate: '05/03/1980',
    address: 'TP. Hồ Chí Minh',
    job: 'Kinh doanh',
    phone: '0990123456',
    email: 'hoangvannam@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    marriageStatus: 'married',
    spouse: {
      id: 'g3-3-s',
      name: 'Vũ Thị Thảo',
      gender: 'female',
      generation: 3,
      birthYear: 1982,
      age: 42,
      birthDate: '14/08/1982',
      address: 'TP. Hồ Chí Minh',
      job: 'Giáo viên',
      phone: '0901234567',
      email: 'vuthithao@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      marriageStatus: 'married'
    },
    children: ['g4-3'],
    parents: ['g2-2'],
    siblings: [],
    notes: 'Con trai của bà Hoa, hiện sống tại TP. Hồ Chí Minh'
  },

  // Thế hệ 4
  {
    id: 'g4-1',
    name: 'Nguyễn Văn Giang',
    gender: 'male',
    generation: 4,
    birthYear: 1995,
    age: 29,
    birthDate: '10/01/1995',
    address: 'Hà Nội',
    job: 'Lập trình viên',
    phone: '0912345678',
    email: 'nguyenvangiang@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    marriageStatus: 'single', // Chưa kết hôn - có thể thêm vợ/chồng
    spouse: null,
    children: [],
    parents: ['g3-1'],
    siblings: ['g4-2'],
    notes: 'Con trai của ông Dũng, hiện đang làm việc tại Hà Nội'
  },
  {
    id: 'g4-2',
    name: 'Nguyễn Thị Mai',
    gender: 'female',
    generation: 4,
    birthYear: 1998,
    age: 26,
    birthDate: '25/06/1998',
    address: 'Hà Nội',
    job: 'Thiết kế',
    phone: '0923456789',
    email: 'nguyenthimai@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    marriageStatus: 'single', // Chưa kết hôn - có thể thêm vợ/chồng
    spouse: null,
    children: [],
    parents: ['g3-1'],
    siblings: ['g4-1'],
    notes: 'Con gái của ông Dũng, hiện đang làm việc tại Hà Nội'
  },
  {
    id: 'g4-3',
    name: 'Hoàng Văn An',
    gender: 'male',
    generation: 4,
    birthYear: 2005,
    age: 19,
    birthDate: '12/11/2005',
    address: 'TP. Hồ Chí Minh',
    job: 'Học sinh',
    phone: '0934567890',
    email: 'hoangvanan@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    marriageStatus: 'single', // Chưa kết hôn - có thể thêm vợ/chồng
    spouse: null,
    children: [],
    parents: ['g3-3'],
    siblings: [],
    notes: 'Con trai của ông Nam, hiện đang học đại học'
  }
];

// Hàm lấy thông tin thành viên theo ID
export const getMemberById = (id) => {
  return familyMembersData.find(member => member.id === id);
};

// Hàm lấy tất cả thành viên theo thế hệ
export const getMembersByGeneration = (generation) => {
  return familyMembersData.filter(member => member.generation === generation);
};

// Hàm lấy tổng số thành viên
export const getTotalMembers = () => {
  return familyMembersData.length;
};

// Hàm lấy số thế hệ
export const getTotalGenerations = () => {
  const generations = new Set(familyMembersData.map(member => member.generation));
  return generations.size;
};

// Hàm lấy thống kê theo giới tính
export const getGenderStats = () => {
  const male = familyMembersData.filter(member => member.gender === 'male').length;
  const female = familyMembersData.filter(member => member.gender === 'female').length;
  return { male, female, total: male + female };
};

// Hàm lấy thống kê theo thế hệ
export const getGenerationStats = () => {
  const stats = {};
  familyMembersData.forEach(member => {
    if (!stats[member.generation]) {
      stats[member.generation] = 0;
    }
    stats[member.generation]++;
  });
  return stats;
};

// Hàm lấy thống kê theo nghề nghiệp
export const getJobStats = () => {
  const stats = {};
  familyMembersData.forEach(member => {
    if (!stats[member.job]) {
      stats[member.job] = 0;
    }
    stats[member.job]++;
  });
  return stats;
};

// Hàm lấy thống kê theo địa chỉ
export const getLocationStats = () => {
  const stats = {};
  familyMembersData.forEach(member => {
    if (!stats[member.address]) {
      stats[member.address] = 0;
    }
    stats[member.address]++;
  });
  return stats;
};

// Build a hierarchical family tree from the flat `familyMembersData` list.
export const buildFamilyTree = (members = familyMembersData) => {
  console.log("Starting buildFamilyTree with members:", members);
  if (!Array.isArray(members)) {
    console.error("Invalid input: members must be an array");
    return null;
  }

  // Create id -> node map
  const map = new Map();
  
  // First pass: Create all nodes with basic properties
  members.forEach(m => {
    if (!m || !m.id) {
      console.error("Invalid member:", m);
      return;
    }
    const node = {
      ...m,
      children: [],
      spouseLinks: [],
      marriageStatus: m.marriageStatus || 'single'
    };
    map.set(m.id, node);
    console.log("Created node for member:", m.id, node);
  });

  // Second pass: Set up relationships
  members.forEach(m => {
    const node = map.get(m.id);
    
    // Set up spouse links
    if (m.spouse) {
      const spouseLink = {
        id: m.spouse.id,
        status: m.spouse.marriageStatus || m.marriageStatus || 'married',
        side: 'right',
        data: { ...m.spouse },
        children: [],
        isActiveMarriage: m.marriageStatus === 'married'
      };
      node.spouseLinks = [spouseLink];
      delete node.spouse; // Remove old spouse property
    }

    // Set up children
    if (Array.isArray(m.children)) {
      m.children.forEach(childId => {
        const childNode = map.get(childId);
        if (childNode) {
          // Update child's generation
          childNode.generation = (node.generation || 0) + 1;
          
          // Add child to appropriate location
          if (node.spouseLinks && node.spouseLinks.length > 0 && node.marriageStatus === 'married') {
            // Add to active marriage's children
            node.spouseLinks[0].children.push(childNode);
          } else {
            // Add to direct children
            node.children.push(childNode);
          }
        }
      });
    }
  });

  console.log("Processed nodes:", Array.from(map.values()));

  // Find root node (generation 1 or no parents)
  let root = Array.from(map.values()).find(node => 
    node.generation === 1 || (node.parents && node.parents.length === 0)
  );

  // If no obvious root found, use node with lowest generation
  if (!root) {
    root = Array.from(map.values()).reduce((min, node) => 
      (!min || (node.generation < min.generation)) ? node : min
    , null);
  }

  console.log("Found root node:", root);
  return root;
};
