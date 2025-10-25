// Dữ liệu cây gia phả sử dụng dữ liệu thành viên mới
export const familyTreeData = {
    id: 'g1-1',
    name: 'Nguyễn Văn Cường',
    gender: 'male',
    birthYear: 1920,
    deathYear: 2000,
    job: 'Nông dân',
    generation: 1,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    marriageStatus: 'married', // 'single', 'married', 'divorced', 'widowed'
    spouse: { 
        id: 'g1-1-s', 
        name: 'Trần Thị Lan', 
        gender: 'female', 
        birthYear: 1925, 
        deathYear: 2005, 
        job: 'Nội trợ', 
        generation: 1,
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        marriageStatus: 'married'
    },
    children: [
        {
            id: 'g2-1',
            name: 'Nguyễn Văn Bình',
            gender: 'male',
            birthYear: 1945,
            job: 'Giáo viên',
            generation: 2,
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            marriageStatus: 'married',
            spouse: { 
                id: 'g2-1-s', 
                name: 'Trần Thị Mai', 
                gender: 'female', 
                birthYear: 1948, 
                job: 'Giáo viên', 
                generation: 2,
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
                marriageStatus: 'married'
            },
            children: [
                {
                    id: 'g3-1',
                    name: 'Nguyễn Văn Dũng',
                    gender: 'male',
                    birthYear: 1970,
                    job: 'Kỹ sư',
                    generation: 3,
                    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
                    marriageStatus: 'married',
                    spouse: { 
                        id: 'g3-1-s', 
                        name: 'Lê Thị Hương', 
                        gender: 'female', 
                        birthYear: 1972, 
                        job: 'Bác sĩ', 
                        generation: 3,
                        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
                        marriageStatus: 'married'
                    },
                    children: [
                        { 
                            id: 'g4-1', 
                            name: 'Nguyễn Văn Giang', 
                            gender: 'male', 
                            birthYear: 1995, 
                            job: 'Lập trình viên', 
                            generation: 4,
                            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
                            marriageStatus: 'single' // Chưa kết hôn - có thể thêm vợ/chồng
                        },
                        { 
                            id: 'g4-2', 
                            name: 'Nguyễn Thị Mai', 
                            gender: 'female', 
                            birthYear: 1998, 
                            job: 'Thiết kế', 
                            generation: 4,
                            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
                            marriageStatus: 'single' // Chưa kết hôn - có thể thêm vợ/chồng
                        }
                    ]
                },
                {
                    id: 'g3-2',
                    name: 'Nguyễn Thị Linh',
                    gender: 'female',
                    birthYear: 1975,
                    job: 'Bác sĩ',
                    generation: 3,
                    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
                    marriageStatus: 'divorced', // Đã ly hôn - có thể thêm vợ/chồng mới
                    spouse: { 
                        id: 'g3-2-s', 
                        name: 'Phạm Văn Tuấn', 
                        gender: 'male', 
                        birthYear: 1973, 
                        job: 'Doanh nhân', 
                        generation: 3,
                        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
                        marriageStatus: 'divorced'
                    },
                    children: []
                }
            ]
        },
        {
            id: 'g2-2',
            name: 'Nguyễn Thị Hoa',
            gender: 'female',
            birthYear: 1950,
            job: 'Y tá',
            generation: 2,
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
            marriageStatus: 'married',
            spouse: { 
                id: 'g2-2-s', 
                name: 'Hoàng Văn Minh', 
                gender: 'male', 
                birthYear: 1948, 
                job: 'Kỹ sư', 
                generation: 2,
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
                marriageStatus: 'married'
            },
            children: [
                {
                    id: 'g3-3',
                    name: 'Hoàng Văn Nam',
                    gender: 'male',
                    birthYear: 1980,
                    job: 'Kinh doanh',
                    generation: 3,
                    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
                    marriageStatus: 'married',
                    spouse: { 
                        id: 'g3-3-s', 
                        name: 'Vũ Thị Thảo', 
                        gender: 'female', 
                        birthYear: 1982, 
                        job: 'Giáo viên', 
                        generation: 3,
                        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
                        marriageStatus: 'married'
                    },
                    children: [
                        { 
                            id: 'g4-3', 
                            name: 'Hoàng Văn An', 
                            gender: 'male', 
                            birthYear: 2005, 
                            job: 'Học sinh', 
                            generation: 4,
                            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
                            marriageStatus: 'single' // Chưa kết hôn - có thể thêm vợ/chồng
                        }
                    ]
                }
            ]
        }
    ]
};

export function countMembers(node) {
    if (!node) return 0;
    const childrenCount = (node.children || []).reduce((sum, c) => sum + countMembers(c), 0);
    return 1 + childrenCount;
}


