// src/admin/data/adminData.js
// Central data source for admin portal — students, parents, all linked

// ─── STUDENTS
export const STUDENTS = [
  // ── FORM 1 
  // Form 1 Science A - Track A
  { id:1,  studentId:'AFTS/2025/001', firstName:'Kwabena',  lastName:'Acheampong', gender:'Male',   dob:'2009-03-12', program:'General Science', year:'Form 1', formClass:'Form 1 Science A', track:'A', house:'Warrior',  status:'Active',   attendance:96, avgScore:84, parentId:1,  enrollDate:'2024-09-02', address:'Uaddara Barracks, Kumasi' },
  { id:2,  studentId:'AFTS/2025/002', firstName:'Adwoa',    lastName:'Mensah',     gender:'Female', dob:'2009-07-18', program:'General Science', year:'Form 1', formClass:'Form 1 Science A', track:'A', house:'Eagle',    status:'Active',   attendance:100,avgScore:91, parentId:2,  enrollDate:'2024-09-02', address:'Asokwa, Kumasi'            },
  { id:3,  studentId:'AFTS/2025/003', firstName:'Kofi',     lastName:'Boateng',    gender:'Male',   dob:'2009-01-25', program:'General Science', year:'Form 1', formClass:'Form 1 Science A', track:'A', house:'Phoenix',  status:'Active',   attendance:88, avgScore:72, parentId:3,  enrollDate:'2024-09-02', address:'Bantama, Kumasi'            },
  { id:4,  studentId:'AFTS/2025/004', firstName:'Ama',      lastName:'Darkwah',    gender:'Female', dob:'2009-05-04', program:'General Science', year:'Form 1', formClass:'Form 1 Science A', track:'A', house:'Warrior',  status:'Active',   attendance:94, avgScore:79, parentId:4,  enrollDate:'2024-09-02', address:'Nhyiaeso, Kumasi'           },
  { id:5,  studentId:'AFTS/2025/005', firstName:'Yaw',      lastName:'Asante',     gender:'Male',   dob:'2009-11-09', program:'General Science', year:'Form 1', formClass:'Form 1 Science A', track:'A', house:'Eagle',    status:'Active',   attendance:92, avgScore:76, parentId:5,  enrollDate:'2024-09-02', address:'Adum, Kumasi'               },
  { id:6,  studentId:'AFTS/2025/006', firstName:'Efua',     lastName:'Osei',       gender:'Female', dob:'2009-08-30', program:'General Science', year:'Form 1', formClass:'Form 1 Science A', track:'A', house:'Phoenix',  status:'Active',   attendance:98, avgScore:88, parentId:6,  enrollDate:'2024-09-02', address:'Oforikrom, Kumasi'          },

  // Form 1 Arts B - Track B
  { id:7,  studentId:'AFTS/2025/007', firstName:'Nana',     lastName:'Frimpong',   gender:'Male',   dob:'2009-04-16', program:'General Arts',    year:'Form 1', formClass:'Form 1 Arts B',    track:'B', house:'Warrior',  status:'Active',   attendance:90, avgScore:70, parentId:7,  enrollDate:'2024-09-02', address:'Suame, Kumasi'              },
  { id:8,  studentId:'AFTS/2025/008', firstName:'Akosua',   lastName:'Tawiah',     gender:'Female', dob:'2009-02-22', program:'General Arts',    year:'Form 1', formClass:'Form 1 Arts B',    track:'B', house:'Eagle',    status:'Active',   attendance:86, avgScore:65, parentId:8,  enrollDate:'2024-09-02', address:'Dichemso, Kumasi'           },
  { id:9,  studentId:'AFTS/2025/009', firstName:'Kwame',    lastName:'Bonsu',      gender:'Male',   dob:'2009-09-14', program:'General Arts',    year:'Form 1', formClass:'Form 1 Arts B',    track:'B', house:'Phoenix',  status:'Active',   attendance:99, avgScore:92, parentId:9,  enrollDate:'2024-09-02', address:'Kumasi Central'             },
  { id:10, studentId:'AFTS/2025/010', firstName:'Abena',    lastName:'Annan',      gender:'Female', dob:'2009-06-07', program:'General Arts',    year:'Form 1', formClass:'Form 1 Arts B',    track:'B', house:'Warrior',  status:'Active',   attendance:82, avgScore:61, parentId:10, enrollDate:'2024-09-02', address:'Ayigya, Kumasi'             },

  // Form 1 Business A - Track A
  { id:11, studentId:'AFTS/2025/011', firstName:'Esi',      lastName:'Adjei',      gender:'Female', dob:'2009-12-03', program:'Business',        year:'Form 1', formClass:'Form 1 Business A',track:'A', house:'Eagle',    status:'Active',   attendance:95, avgScore:80, parentId:11, enrollDate:'2024-09-02', address:'Tafo, Kumasi'               },
  { id:12, studentId:'AFTS/2025/012', firstName:'Fiifi',    lastName:'Sarpong',    gender:'Male',   dob:'2009-10-19', program:'Business',        year:'Form 1', formClass:'Form 1 Business A',track:'A', house:'Phoenix',  status:'Active',   attendance:91, avgScore:74, parentId:12, enrollDate:'2024-09-02', address:'Manhyia, Kumasi'            },

  // Form 1 Technical B - Track B
  { id:13, studentId:'AFTS/2025/013', firstName:'Kojo',     lastName:'Asare',      gender:'Male',   dob:'2009-07-27', program:'Technical',       year:'Form 1', formClass:'Form 1 Tech B',    track:'B', house:'Warrior',  status:'Active',   attendance:87, avgScore:68, parentId:13, enrollDate:'2024-09-02', address:'Kwadaso, Kumasi'            },
  { id:14, studentId:'AFTS/2025/014', firstName:'Maame',    lastName:'Owusu',      gender:'Female', dob:'2009-03-31', program:'Technical',       year:'Form 1', formClass:'Form 1 Tech B',    track:'B', house:'Eagle',    status:'Active',   attendance:93, avgScore:77, parentId:14, enrollDate:'2024-09-02', address:'Patasi, Kumasi'             },

  // ── FORM 2 
  // Form 2 Science A - Track A
  { id:15, studentId:'AFTS/2024/001', firstName:'Kofi',     lastName:'Asante',     gender:'Male',   dob:'2008-03-15', program:'General Science', year:'Form 2', formClass:'Form 2 Science A', track:'A', house:'Warrior',  status:'Active',   attendance:94, avgScore:82, parentId:1,  enrollDate:'2023-09-04', address:'Uaddara Barracks, Kumasi'  },
  { id:16, studentId:'AFTS/2024/002', firstName:'Ama',      lastName:'Darko',      gender:'Female', dob:'2008-08-22', program:'General Science', year:'Form 2', formClass:'Form 2 Science A', track:'A', house:'Eagle',    status:'Active',   attendance:100,avgScore:79, parentId:15, enrollDate:'2023-09-04', address:'Adum, Kumasi'               },
  { id:17, studentId:'AFTS/2024/003', firstName:'Abena',    lastName:'Asante',     gender:'Female', dob:'2009-07-10', program:'General Arts',    year:'Form 1', formClass:'Form 1 Arts A',    track:'A', house:'Eagle',    status:'Active',   attendance:98, avgScore:89, parentId:1,  enrollDate:'2024-09-02', address:'Uaddara Barracks, Kumasi'  },
  { id:18, studentId:'AFTS/2024/004', firstName:'Kweku',    lastName:'Darko',      gender:'Male',   dob:'2008-04-19', program:'General Science', year:'Form 2', formClass:'Form 2 Science A', track:'A', house:'Phoenix',  status:'Active',   attendance:90, avgScore:73, parentId:16, enrollDate:'2023-09-04', address:'Nhyiaeso, Kumasi'           },
  { id:19, studentId:'AFTS/2024/005', firstName:'Akua',     lastName:'Acheampong', gender:'Female', dob:'2008-09-28', program:'General Science', year:'Form 2', formClass:'Form 2 Science A', track:'A', house:'Warrior',  status:'Active',   attendance:97, avgScore:86, parentId:17, enrollDate:'2023-09-04', address:'Bantama, Kumasi'            },
  { id:20, studentId:'AFTS/2024/006', firstName:'Nana Yaw', lastName:'Mensah',     gender:'Male',   dob:'2008-01-06', program:'General Science', year:'Form 2', formClass:'Form 2 Science A', track:'A', house:'Eagle',    status:'Active',   attendance:85, avgScore:67, parentId:18, enrollDate:'2023-09-04', address:'Oforikrom, Kumasi'          },

  // Form 2 Science B - Track B
  { id:21, studentId:'AFTS/2024/007', firstName:'Esi',      lastName:'Boateng',    gender:'Female', dob:'2008-06-13', program:'General Science', year:'Form 2', formClass:'Form 2 Science B', track:'B', house:'Phoenix',  status:'Active',   attendance:96, avgScore:83, parentId:19, enrollDate:'2023-09-04', address:'Asokwa, Kumasi'             },
  { id:22, studentId:'AFTS/2024/008', firstName:'Kwabena',  lastName:'Frimpong',   gender:'Male',   dob:'2008-11-24', program:'General Science', year:'Form 2', formClass:'Form 2 Science B', track:'B', house:'Warrior',  status:'Active',   attendance:89, avgScore:71, parentId:20, enrollDate:'2023-09-04', address:'Suame, Kumasi'              },
  { id:23, studentId:'AFTS/2024/009', firstName:'Adwoa',    lastName:'Bonsu',      gender:'Female', dob:'2008-02-17', program:'General Science', year:'Form 2', formClass:'Form 2 Science B', track:'B', house:'Eagle',    status:'Inactive', attendance:62, avgScore:51, parentId:21, enrollDate:'2023-09-04', address:'Tafo, Kumasi'               },

  // Form 2 Arts A - Track A
  { id:24, studentId:'AFTS/2024/010', firstName:'Kojo',     lastName:'Tawiah',     gender:'Male',   dob:'2008-07-05', program:'General Arts',    year:'Form 2', formClass:'Form 2 Arts A',    track:'A', house:'Phoenix',  status:'Active',   attendance:91, avgScore:74, parentId:22, enrollDate:'2023-09-04', address:'Dichemso, Kumasi'           },
  { id:25, studentId:'AFTS/2024/011', firstName:'Abena',    lastName:'Adjei',      gender:'Female', dob:'2008-05-20', program:'General Arts',    year:'Form 2', formClass:'Form 2 Arts A',    track:'A', house:'Warrior',  status:'Active',   attendance:93, avgScore:77, parentId:23, enrollDate:'2023-09-04', address:'Kumasi Central'             },
  { id:26, studentId:'AFTS/2024/012', firstName:'Fiifi',    lastName:'Sarpong',    gender:'Male',   dob:'2008-10-11', program:'General Arts',    year:'Form 2', formClass:'Form 2 Arts A',    track:'A', house:'Eagle',    status:'Active',   attendance:87, avgScore:69, parentId:24, enrollDate:'2023-09-04', address:'Manhyia, Kumasi'            },

  // Form 2 Business B - Track B
  { id:27, studentId:'AFTS/2024/013', firstName:'Yaa',      lastName:'Asare',      gender:'Female', dob:'2008-12-29', program:'Business',        year:'Form 2', formClass:'Form 2 Business B',track:'B', house:'Phoenix',  status:'Active',   attendance:99, avgScore:90, parentId:25, enrollDate:'2023-09-04', address:'Ayigya, Kumasi'             },
  { id:28, studentId:'AFTS/2024/014', firstName:'Kwame',    lastName:'Annan',      gender:'Male',   dob:'2008-08-03', program:'Business',        year:'Form 2', formClass:'Form 2 Business B',track:'B', house:'Warrior',  status:'Active',   attendance:84, avgScore:64, parentId:26, enrollDate:'2023-09-04', address:'Kwadaso, Kumasi'            },

  // Form 2 Tech A - Track A
  { id:29, studentId:'AFTS/2024/015', firstName:'Nana',     lastName:'Owusu',      gender:'Male',   dob:'2008-04-08', program:'Technical',       year:'Form 2', formClass:'Form 2 Tech A',    track:'A', house:'Eagle',    status:'Active',   attendance:88, avgScore:70, parentId:27, enrollDate:'2023-09-04', address:'Patasi, Kumasi'             },
  { id:30, studentId:'AFTS/2024/016', firstName:'Akosua',   lastName:'Agyemang',   gender:'Female', dob:'2008-03-22', program:'Technical',       year:'Form 2', formClass:'Form 2 Tech A',    track:'A', house:'Phoenix',  status:'Active',   attendance:95, avgScore:81, parentId:28, enrollDate:'2023-09-04', address:'Kwadaso, Kumasi'            },

  // ── FORM 3 
  // Form 3 Science A - Track A
  { id:31, studentId:'AFTS/2023/001', firstName:'Abena',    lastName:'Frimpong',   gender:'Female', dob:'2007-07-25', program:'General Science', year:'Form 3', formClass:'Form 3 Science A', track:'A', house:'Phoenix',  status:'Active',   attendance:97, avgScore:88, parentId:29, enrollDate:'2022-09-05', address:'Asokwa, Kumasi'             },
  { id:32, studentId:'AFTS/2023/002', firstName:'Kwabena',  lastName:'Agyei',      gender:'Male',   dob:'2007-02-14', program:'General Science', year:'Form 3', formClass:'Form 3 Science A', track:'A', house:'Warrior',  status:'Active',   attendance:93, avgScore:80, parentId:30, enrollDate:'2022-09-05', address:'Bantama, Kumasi'            },
  { id:33, studentId:'AFTS/2023/003', firstName:'Maame Esi',lastName:'Darko',      gender:'Female', dob:'2007-10-06', program:'General Science', year:'Form 3', formClass:'Form 3 Science A', track:'A', house:'Eagle',    status:'Active',   attendance:89, avgScore:73, parentId:31, enrollDate:'2022-09-05', address:'Nhyiaeso, Kumasi'           },
  { id:34, studentId:'AFTS/2023/004', firstName:'Yaw',      lastName:'Ampofo',     gender:'Male',   dob:'2007-05-31', program:'General Science', year:'Form 3', formClass:'Form 3 Science A', track:'A', house:'Phoenix',  status:'Active',   attendance:91, avgScore:75, parentId:32, enrollDate:'2022-09-05', address:'Oforikrom, Kumasi'          },

  // Form 3 Science B - Track B
  { id:35, studentId:'AFTS/2023/005', firstName:'Kofi',     lastName:'Asante',     gender:'Male',   dob:'2007-03-15', program:'General Science', year:'Form 3', formClass:'Form 3 Science B', track:'B', house:'Warrior',  status:'Active',   attendance:96, avgScore:87, parentId:1,  enrollDate:'2022-09-05', address:'Uaddara Barracks, Kumasi'  },
  { id:36, studentId:'AFTS/2023/006', firstName:'Ama',      lastName:'Boateng',    gender:'Female', dob:'2007-09-18', program:'General Science', year:'Form 3', formClass:'Form 3 Science B', track:'B', house:'Eagle',    status:'Active',   attendance:100,avgScore:94, parentId:33, enrollDate:'2022-09-05', address:'Adum, Kumasi'               },
  { id:37, studentId:'AFTS/2023/007', firstName:'Ekow',     lastName:'Asare',      gender:'Male',   dob:'2007-12-22', program:'General Science', year:'Form 3', formClass:'Form 3 Science B', track:'B', house:'Phoenix',  status:'Inactive', attendance:58, avgScore:49, parentId:34, enrollDate:'2022-09-05', address:'Tafo, Kumasi'               },

  // Form 3 Arts A - Track A
  { id:38, studentId:'AFTS/2023/008', firstName:'Yaw',      lastName:'Mensah',     gender:'Male',   dob:'2006-11-10', program:'General Arts',    year:'Form 3', formClass:'Form 3 Arts A',    track:'A', house:'Warrior',  status:'Active',   attendance:88, avgScore:65, parentId:35, enrollDate:'2022-09-05', address:'Nhyiaeso, Kumasi'           },
  { id:39, studentId:'AFTS/2023/009', firstName:'Akua',     lastName:'Tawiah',     gender:'Female', dob:'2006-08-14', program:'General Arts',    year:'Form 3', formClass:'Form 3 Arts A',    track:'A', house:'Eagle',    status:'Active',   attendance:95, avgScore:82, parentId:36, enrollDate:'2022-09-05', address:'Dichemso, Kumasi'           },
  { id:40, studentId:'AFTS/2023/010', firstName:'Nana Kwame',lastName:'Bonsu',     gender:'Male',   dob:'2006-04-27', program:'General Arts',    year:'Form 3', formClass:'Form 3 Arts A',    track:'A', house:'Phoenix',  status:'Active',   attendance:90, avgScore:71, parentId:37, enrollDate:'2022-09-05', address:'Kumasi Central'             },

  // Form 3 Business A - Track A
  { id:41, studentId:'AFTS/2023/011', firstName:'Afia',     lastName:'Sarpong',    gender:'Female', dob:'2007-03-07', program:'Business',        year:'Form 3', formClass:'Form 3 Business A',track:'A', house:'Phoenix',  status:'Active',   attendance:93, avgScore:76, parentId:38, enrollDate:'2022-09-05', address:'Manhyia, Kumasi'            },
  { id:42, studentId:'AFTS/2023/012', firstName:'Kweku',    lastName:'Adjei',      gender:'Male',   dob:'2007-07-19', program:'Business',        year:'Form 3', formClass:'Form 3 Business A',track:'A', house:'Warrior',  status:'Active',   attendance:86, avgScore:67, parentId:39, enrollDate:'2022-09-05', address:'Ayigya, Kumasi'             },
  { id:43, studentId:'AFTS/2023/013', firstName:'Esi',      lastName:'Frimpong',   gender:'Female', dob:'2007-01-23', program:'Business',        year:'Form 3', formClass:'Form 3 Business A',track:'A', house:'Eagle',    status:'Active',   attendance:98, avgScore:90, parentId:40, enrollDate:'2022-09-05', address:'Asokwa, Kumasi'             },

  // Form 3 Tech A - Track A
  { id:44, studentId:'AFTS/2023/014', firstName:'Kojo',     lastName:'Annan',      gender:'Male',   dob:'2007-06-05', program:'Technical',       year:'Form 3', formClass:'Form 3 Tech A',    track:'A', house:'Phoenix',  status:'Active',   attendance:91, avgScore:73, parentId:41, enrollDate:'2022-09-05', address:'Kwadaso, Kumasi'            },
  { id:45, studentId:'AFTS/2023/015', firstName:'Adwoa',    lastName:'Asante',     gender:'Female', dob:'2007-10-30', program:'Technical',       year:'Form 3', formClass:'Form 3 Tech A',    track:'A', house:'Warrior',  status:'Active',   attendance:96, avgScore:84, parentId:42, enrollDate:'2022-09-05', address:'Uaddara Barracks, Kumasi'  },

  // Form 3 Tech B - Track B
  { id:46, studentId:'AFTS/2023/016', firstName:'Fiifi',    lastName:'Mensah',     gender:'Male',   dob:'2007-08-12', program:'Technical',       year:'Form 3', formClass:'Form 3 Tech B',    track:'B', house:'Eagle',    status:'Active',   attendance:87, avgScore:69, parentId:43, enrollDate:'2022-09-05', address:'Patasi, Kumasi'             },
  { id:47, studentId:'AFTS/2023/017', firstName:'Yaa',      lastName:'Acheampong', gender:'Female', dob:'2007-02-28', program:'Technical',       year:'Form 3', formClass:'Form 3 Tech B',    track:'B', house:'Phoenix',  status:'Active',   attendance:99, avgScore:92, parentId:44, enrollDate:'2022-09-05', address:'Suame, Kumasi'              },
  { id:48, studentId:'AFTS/2023/018', firstName:'Kwame',    lastName:'Osei',       gender:'Male',   dob:'2007-04-15', program:'Technical',       year:'Form 3', formClass:'Form 3 Tech B',    track:'B', house:'Warrior',  status:'Suspended',attendance:45, avgScore:42, parentId:45, enrollDate:'2022-09-05', address:'Bantama, Kumasi'            },
];

// ─── PARENTS 
export const PARENTS = [
  { id:1,  title:'Mr',  firstName:'Emmanuel',  lastName:'Asante',     email:'e.asante@gmail.com',      phone:'0244123456', occupation:'Civil Engineer',    address:'Uaddara Barracks, Kumasi', status:'Active',   registeredDate:'2022-09-05' },
  { id:2,  title:'Mrs', firstName:'Grace',     lastName:'Mensah',     email:'g.mensah@gmail.com',      phone:'0277654321', occupation:'Nurse',             address:'Asokwa, Kumasi',           status:'Active',   registeredDate:'2024-09-02' },
  { id:3,  title:'Mr',  firstName:'Samuel',    lastName:'Boateng',    email:'s.boateng@yahoo.com',     phone:'0200334455', occupation:'Soldier',            address:'Bantama, Kumasi',          status:'Active',   registeredDate:'2024-09-02' },
  { id:4,  title:'Mrs', firstName:'Akua',      lastName:'Darkwah',    email:'a.darkwah@gmail.com',     phone:'0244565758', occupation:'Teacher',            address:'Nhyiaeso, Kumasi',         status:'Active',   registeredDate:'2024-09-02' },
  { id:5,  title:'Mr',  firstName:'Kwabena',   lastName:'Asante',     email:'k.asante@outlook.com',    phone:'0277112233', occupation:'Business Owner',     address:'Adum, Kumasi',             status:'Active',   registeredDate:'2024-09-02' },
  { id:6,  title:'Mrs', firstName:'Comfort',   lastName:'Osei',       email:'c.osei@gmail.com',        phone:'0244888111', occupation:'Accountant',         address:'Oforikrom, Kumasi',        status:'Active',   registeredDate:'2024-09-02' },
  { id:7,  title:'Mr',  firstName:'Richard',   lastName:'Frimpong',   email:'r.frimpong@gmail.com',    phone:'0207456789', occupation:'Police Officer',      address:'Suame, Kumasi',            status:'Active',   registeredDate:'2024-09-02' },
  { id:8,  title:'Mrs', firstName:'Janet',     lastName:'Tawiah',     email:'j.tawiah@yahoo.com',      phone:'0244321777', occupation:'Trader',             address:'Dichemso, Kumasi',         status:'Active',   registeredDate:'2024-09-02' },
  { id:9,  title:'Mr',  firstName:'Eric',      lastName:'Bonsu',      email:'e.bonsu@gmail.com',       phone:'0277888999', occupation:'Lawyer',             address:'Kumasi Central',           status:'Active',   registeredDate:'2024-09-02' },
  { id:10, title:'Mrs', firstName:'Abena',     lastName:'Annan',      email:'abena.annan@gmail.com',   phone:'0244567890', occupation:'Civil Servant',      address:'Ayigya, Kumasi',           status:'Active',   registeredDate:'2024-09-02' },
  { id:11, title:'Mr',  firstName:'Kofi',      lastName:'Adjei',      email:'k.adjei@outlook.com',     phone:'0200111222', occupation:'Banker',             address:'Tafo, Kumasi',             status:'Active',   registeredDate:'2024-09-02' },
  { id:12, title:'Mrs', firstName:'Efua',      lastName:'Sarpong',    email:'e.sarpong@gmail.com',     phone:'0277222333', occupation:'Pharmacist',         address:'Manhyia, Kumasi',          status:'Active',   registeredDate:'2024-09-02' },
  { id:13, title:'Mr',  firstName:'Kwame',     lastName:'Asare',      email:'k.asare@yahoo.com',       phone:'0244444555', occupation:'Mechanic',           address:'Kwadaso, Kumasi',          status:'Active',   registeredDate:'2024-09-02' },
  { id:14, title:'Mrs', firstName:'Ama',       lastName:'Owusu',      email:'a.owusu@gmail.com',       phone:'0207333444', occupation:'Nurse',              address:'Patasi, Kumasi',           status:'Active',   registeredDate:'2024-09-02' },
  { id:15, title:'Mr',  firstName:'Kweku',     lastName:'Darko',      email:'kweku.darko@gmail.com',   phone:'0277765432', occupation:'Driver',             address:'Adum, Kumasi',             status:'Active',   registeredDate:'2023-09-04' },
  { id:16, title:'Mrs', firstName:'Abena',     lastName:'Kwarteng',   email:'a.kwarteng@outlook.com',  phone:'0244876543', occupation:'Market Woman',        address:'Nhyiaeso, Kumasi',         status:'Active',   registeredDate:'2023-09-04' },
  { id:17, title:'Mr',  firstName:'Nana',      lastName:'Acheampong', email:'n.acheampong@gmail.com',  phone:'0207654987', occupation:'Engineer',           address:'Bantama, Kumasi',          status:'Active',   registeredDate:'2023-09-04' },
  { id:18, title:'Mrs', firstName:'Esi',       lastName:'Mensah',     email:'esi.mensah@gmail.com',    phone:'0277543210', occupation:'Doctor',             address:'Oforikrom, Kumasi',        status:'Active',   registeredDate:'2023-09-04' },
  { id:19, title:'Mr',  firstName:'Yaw',       lastName:'Boateng',    email:'y.boateng@yahoo.com',     phone:'0244765432', occupation:'Pastor',             address:'Asokwa, Kumasi',           status:'Active',   registeredDate:'2023-09-04' },
  { id:20, title:'Mrs', firstName:'Akosua',    lastName:'Frimpong',   email:'a.frimpong@gmail.com',    phone:'0207876543', occupation:'Seamstress',         address:'Suame, Kumasi',            status:'Active',   registeredDate:'2023-09-04' },
  { id:21, title:'Mr',  firstName:'Fiifi',     lastName:'Bonsu',      email:'f.bonsu@outlook.com',     phone:'0277234567', occupation:'Retired Officer',    address:'Tafo, Kumasi',             status:'Inactive', registeredDate:'2023-09-04' },
  { id:22, title:'Mrs', firstName:'Adwoa',     lastName:'Tawiah',     email:'adwoa.tawiah@gmail.com',  phone:'0244345678', occupation:'Caterer',            address:'Dichemso, Kumasi',         status:'Active',   registeredDate:'2023-09-04' },
  { id:23, title:'Mr',  firstName:'Kwame',     lastName:'Adjei',      email:'kwame.adjei@gmail.com',   phone:'0200456789', occupation:'Electrician',        address:'Kumasi Central',           status:'Active',   registeredDate:'2023-09-04' },
  { id:24, title:'Mrs', firstName:'Yaa',       lastName:'Sarpong',    email:'y.sarpong@yahoo.com',     phone:'0277345678', occupation:'Nurse',              address:'Manhyia, Kumasi',          status:'Active',   registeredDate:'2023-09-04' },
  { id:25, title:'Mr',  firstName:'Kojo',      lastName:'Asare',      email:'kojo.asare@gmail.com',    phone:'0244678901', occupation:'Soldier',            address:'Ayigya, Kumasi',           status:'Active',   registeredDate:'2023-09-04' },
  { id:26, title:'Mrs', firstName:'Maame',     lastName:'Annan',      email:'m.annan@outlook.com',     phone:'0207567890', occupation:'Lecturer',           address:'Kwadaso, Kumasi',          status:'Active',   registeredDate:'2023-09-04' },
  { id:27, title:'Mr',  firstName:'Nana Yaw',  lastName:'Owusu',      email:'ny.owusu@gmail.com',      phone:'0277456789', occupation:'Contractor',         address:'Patasi, Kumasi',           status:'Active',   registeredDate:'2023-09-04' },
  { id:28, title:'Mrs', firstName:'Akua',      lastName:'Agyemang',   email:'a.agyemang@gmail.com',    phone:'0244890123', occupation:'Business Executive', address:'Kwadaso, Kumasi',          status:'Active',   registeredDate:'2023-09-04' },
  { id:29, title:'Mr',  firstName:'Samuel',    lastName:'Frimpong',   email:'sf.frimpong@gmail.com',   phone:'0200567890', occupation:'Business Owner',     address:'Asokwa, Kumasi',           status:'Active',   registeredDate:'2022-09-05' },
  { id:30, title:'Mrs', firstName:'Grace',     lastName:'Agyei',      email:'grace.agyei@yahoo.com',   phone:'0277567891', occupation:'Trader',             address:'Bantama, Kumasi',          status:'Active',   registeredDate:'2022-09-05' },
  { id:31, title:'Mr',  firstName:'Kwabena',   lastName:'Darko',      email:'kwabena.darko@gmail.com', phone:'0244901234', occupation:'Driver',             address:'Nhyiaeso, Kumasi',         status:'Active',   registeredDate:'2022-09-05' },
  { id:32, title:'Mrs', firstName:'Esi',       lastName:'Ampofo',     email:'esi.ampofo@outlook.com',  phone:'0207678901', occupation:'Tailor',             address:'Oforikrom, Kumasi',        status:'Active',   registeredDate:'2022-09-05' },
  { id:33, title:'Mr',  firstName:'Yaw',       lastName:'Boateng',    email:'yaw.boateng@gmail.com',   phone:'0277678901', occupation:'Teacher',            address:'Adum, Kumasi',             status:'Active',   registeredDate:'2022-09-05' },
  { id:34, title:'Mrs', firstName:'Abena',     lastName:'Asare',      email:'abena.asare@yahoo.com',   phone:'0244012345', occupation:'Hairdresser',        address:'Tafo, Kumasi',             status:'Inactive', registeredDate:'2022-09-05' },
  { id:35, title:'Mr',  firstName:'Kofi',      lastName:'Mensah',     email:'kofi.mensah@gmail.com',   phone:'0207789012', occupation:'Police Officer',     address:'Nhyiaeso, Kumasi',         status:'Active',   registeredDate:'2022-09-05' },
  { id:36, title:'Mrs', firstName:'Comfort',   lastName:'Tawiah',     email:'comfort.tawiah@gmail.com',phone:'0277789012', occupation:'Banker',             address:'Dichemso, Kumasi',         status:'Active',   registeredDate:'2022-09-05' },
  { id:37, title:'Mr',  firstName:'Kwame',     lastName:'Bonsu',      email:'kwame.bonsu@outlook.com', phone:'0244123789', occupation:'Contractor',         address:'Kumasi Central',           status:'Active',   registeredDate:'2022-09-05' },
  { id:38, title:'Mrs', firstName:'Akua',      lastName:'Sarpong',    email:'akua.sarpong@gmail.com',  phone:'0200234567', occupation:'Civil Servant',      address:'Manhyia, Kumasi',          status:'Active',   registeredDate:'2022-09-05' },
  { id:39, title:'Mr',  firstName:'Nana',      lastName:'Adjei',      email:'nana.adjei@yahoo.com',    phone:'0277890123', occupation:'Farmer',             address:'Ayigya, Kumasi',           status:'Active',   registeredDate:'2022-09-05' },
  { id:40, title:'Mrs', firstName:'Yaa',       lastName:'Frimpong',   email:'yaa.frimpong@gmail.com',  phone:'0244234890', occupation:'Nurse',              address:'Asokwa, Kumasi',           status:'Active',   registeredDate:'2022-09-05' },
  { id:41, title:'Mr',  firstName:'Kojo',      lastName:'Annan',      email:'kojo.annan@gmail.com',    phone:'0207890234', occupation:'Mechanic',           address:'Kwadaso, Kumasi',          status:'Active',   registeredDate:'2022-09-05' },
  { id:42, title:'Mrs', firstName:'Adwoa',     lastName:'Asante',     email:'adwoa.asante@outlook.com',phone:'0277901234', occupation:'Doctor',             address:'Uaddara Barracks, Kumasi', status:'Active',   registeredDate:'2022-09-05' },
  { id:43, title:'Mr',  firstName:'Fiifi',     lastName:'Mensah',     email:'fiifi.mensah@gmail.com',  phone:'0244345901', occupation:'Engineer',           address:'Patasi, Kumasi',           status:'Active',   registeredDate:'2022-09-05' },
  { id:44, title:'Mrs', firstName:'Akosua',    lastName:'Acheampong', email:'a.acheampong@gmail.com',  phone:'0200345678', occupation:'Business Owner',     address:'Suame, Kumasi',            status:'Active',   registeredDate:'2022-09-05' },
  { id:45, title:'Mr',  firstName:'Kwabena',   lastName:'Osei',       email:'kwabena.osei@yahoo.com',  phone:'0277012345', occupation:'Retired Soldier',    address:'Bantama, Kumasi',          status:'Active',   registeredDate:'2022-09-05' },
];

// ─── Parent → children lookup 
// Build automatically from STUDENTS
export const PARENT_CHILDREN = PARENTS.reduce((acc, parent) => {
  acc[parent.id] = STUDENTS.filter(s => s.parentId === parent.id);
  return acc;
}, {});

// ─── Student → parent lookup 
export const STUDENT_PARENT = STUDENTS.reduce((acc, student) => {
  acc[student.id] = PARENTS.find(p => p.id === student.parentId) || null;
  return acc;
}, {});

// ─── Summary stats 
export const SCHOOL_STATS = {
  totalStudents:  STUDENTS.length,
  activeStudents: STUDENTS.filter(s => s.status === 'Active').length,
  trackA:         STUDENTS.filter(s => s.track === 'A').length,
  trackB:         STUDENTS.filter(s => s.track === 'B').length,
  form1:          STUDENTS.filter(s => s.year === 'Form 1').length,
  form2:          STUDENTS.filter(s => s.year === 'Form 2').length,
  form3:          STUDENTS.filter(s => s.year === 'Form 3').length,
  totalParents:   PARENTS.length,
  activeParents:  PARENTS.filter(p => p.status === 'Active').length,
  programs: {
    science:   STUDENTS.filter(s => s.program === 'General Science').length,
    arts:      STUDENTS.filter(s => s.program === 'General Arts').length,
    business:  STUDENTS.filter(s => s.program === 'Business').length,
    technical: STUDENTS.filter(s => s.program === 'Technical').length,
  },
};