// Dữ liệu mẫu danh sách thành viên
import { familyMembersData } from './familyMembersData';

// Helper: tìm member (người ruột) theo id trong familyMembersData
const findMainMemberById = (id) => familyMembersData.find(m => m.id === id);

// Xây map id -> bản ghi (bao gồm người ruột và dâu/rể đủ điều kiện)
const peopleMap = new Map();

familyMembersData.forEach(main => {
  if (!main || !main.id) return;

  // Thêm người ruột vào map
  peopleMap.set(main.id, {
    ...main,
    isInLaw: false,
    isFamilyMember: true,
  });

  // Xử lý spouse (dâu/rể) nếu có
  if (main.spouse) {
    const s = main.spouse;
    if (!s.id) return;

    const isDivorcedInLaw = s.marriageStatus === 'divorced';
    // BỎ QUA dâu/rể đã ly hôn
    if (isDivorcedInLaw) return;

    // Thêm dâu/rể (in-law) vào map
    peopleMap.set(s.id, {
      ...s,
      isInLaw: true,
      isFamilyMember: false,
      partnerId: main.id,
    });
  }
});

// Tạo danh sách membersData với đầy đủ thông tin cơ bản + quan hệ (parentName, spouseName)
export const membersData = Array.from(peopleMap.values()).map(person => {
  let parentName = '';
  let spouseName = '';
  let childrenIds = [];
  let siblingIds = [];

  // Tính cha/mẹ
  if (person.isInLaw) {
    // Dâu/rể: lấy cha mẹ của người vợ/chồng ruột trong familyMembersData
    const partner = familyMembersData.find(m => m.spouse && m.spouse.id === person.id);
    if (partner && Array.isArray(partner.parents) && partner.parents.length > 0) {
      const names = partner.parents
        .map(pid => findMainMemberById(pid))
        .filter(Boolean)
        .map(p => p.name);
      parentName = names.join(' & ');
    }
  } else {
    // Người ruột: dùng m.parents (list id) để suy ra tên cha/mẹ
    if (Array.isArray(person.parents) && person.parents.length > 0) {
      const names = person.parents
        .map(pid => findMainMemberById(pid))
        .filter(Boolean)
        .map(p => p.name);
      parentName = names.join(' & ');
    }
  }

  // Tính vợ/chồng (spouseName)
  if (person.isInLaw) {
    // Dâu/rể: tìm người ruột có spouse.id = person.id và đang ở trạng thái hôn nhân hợp lệ
    const partner = familyMembersData.find(m => m.spouse && m.spouse.id === person.id);
    if (partner && partner.marriageStatus === 'married') {
      spouseName = partner.name;
    }
  } else {
    // Người ruột: dùng trường spouse nếu đang kết hôn
    const main = findMainMemberById(person.id);
    if (main && main.spouse && main.marriageStatus === 'married') {
      spouseName = main.spouse.name;
    }
  }

  // Tính con cái (childrenIds)
  if (person.isInLaw) {
    const partner = familyMembersData.find(m => m.spouse && m.spouse.id === person.id);
    if (partner && Array.isArray(partner.children)) {
      childrenIds = partner.children.slice();
    }
  } else {
    if (Array.isArray(person.children)) {
      childrenIds = person.children.slice();
    }
  }

  // Tính anh/chị/em (siblings)
  if (person.isInLaw) {
    const partner = familyMembersData.find(m => m.spouse && m.spouse.id === person.id);
    if (partner && Array.isArray(partner.siblings)) {
      siblingIds = partner.siblings.slice();
    }
  } else {
    if (Array.isArray(person.siblings)) {
      siblingIds = person.siblings.slice();
    }
  }

  const childrenNames = childrenIds
    .map(cid => findMainMemberById(cid))
    .filter(Boolean)
    .map(c => c.name)
    .join(', ');

  const siblingNames = siblingIds
    .map(sid => findMainMemberById(sid))
    .filter(Boolean)
    .map(s => s.name)
    .join(', ');

  return {
    id: person.id,
    name: person.name,
    gender: person.gender,
    generation: person.generation,
    age: person.age,
    birthDate: person.birthDate,
    address: person.address,
    job: person.job,
    phone: person.phone,
    email: person.email,
    deathYear: person.deathYear,
    // Thông tin quan hệ để ViewMemberModal dùng
    parentName,
    spouseName,
    childrenNames,
    siblingNames,
    // Thông tin quan hệ dạng ID để điều hướng
    parentIds: Array.isArray(person.parents) ? person.parents.slice() : [],
    spouseId: (person.isInLaw
      ? (familyMembersData.find(m => m.spouse && m.spouse.id === person.id)?.id || null)
      : (findMainMemberById(person.id)?.spouse?.id || null)
    ) || null,
    childrenIds,
    siblingIds,
    marriageStatus: person.marriageStatus || 'single',
    isInLaw: !!person.isInLaw,
    isFamilyMember: person.isFamilyMember !== false,
  };
});

