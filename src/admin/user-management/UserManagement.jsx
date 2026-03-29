import { useState } from "react";
     import AccountCircleIcon from '@mui/icons-material/AccountCircle';
     import FileUploadIcon from '@mui/icons-material/FileUpload';
     import SearchIcon from '@mui/icons-material/Search';
    import GroupAddIcon from '@mui/icons-material/GroupAdd';


const users = [
  { id: "STD2024001", name: "Kwame Asante", role: "STUDENT", dept: "Form 2 Science A", email: "k.asante@student.excellence.edu.gh", status: "Active" },
  { id: "TCH2024001", name: "Mrs. Akosua Mensah", role: "TEACHER", dept: "Mathematics Department", email: "a.mensah@excellence.edu.gh", status: "Active" },
  { id: "HOD2024001", name: "Dr. Kwabena Owusu", role: "HEAD OF DEPT", dept: "Science Department", email: "k.owusu@excellence.edu.gh", status: "Active" },
  { id: "PAR2024001", name: "Mr. Yaw Boateng", role: "PARENT", dept: "Parent of STD2024001", email: "y.boateng@email.com", status: "Pending" },
  { id: "ADM2024001", name: "System Administrator", role: "ADMIN", dept: "IT Department", email: "admin@excellence.edu.gh", status: "Active" },
];

const roleColors = {
  STUDENT: "border-cyan-400 text-cyan-600",
  TEACHER: "border-green-400 text-green-600",
  "HEAD OF DEPT": "border-pink-400 text-pink-500",
  PARENT: "border-orange-400 text-orange-500",
  ADMIN: "border-red-400 text-red-500",
};

const statusColors = {
  Active: "border-green-400 text-green-600",
  Pending: "border-orange-400 text-orange-500",
};

const roleIcons = {
  STUDENT: "🎓",
  TEACHER: "👩‍🏫",
  "HEAD OF DEPT": "👤",
  PARENT: "👨‍👧",
  ADMIN: "👥",
};

const UserManagement = () => {
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [deptFilter, setDeptFilter] = useState("All Departments");
  const [showAddUser, setShowAddUser] = useState(false);
  const [activeNav, setActiveNav] = useState("User Management");
  const [newUser, setNewUser] = useState({
    role: "", firstName: "", lastName: "", email: "", dept: "", password: "Generate Random Password", sendEmail: true,
  });

  const toggleSelect = (id) =>
    setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
  const toggleAll = () =>
    setSelected(selected.length === users.length ? [] : users.map((u) => u.id));

  const filtered = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "All Roles" || u.role === roleFilter;
    const matchStatus = statusFilter === "All Status" || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* SIDEBAR */}


      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-h-screen overflow-auto">
        <div className="bg-white px-8 pt-7 pb-4 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-[var(--royal-blue)]">User Management Console</h1>
              <nav className="text-sm text-gray-400 mt-1">
                <span>Home</span> <span className="mx-1">/</span>
                <span>Admin</span> <span className="mx-1">/</span>
                <span className="text-red-600 font-medium">User Management</span>
              </nav>
            </div>
            <div className="flex gap-2 mt-1">
              <button onClick={() => setShowAddUser(true)}
                className="flex items-center gap-1 px-4 py-2 rounded-lg border-2 border-blue-700 text-blue-700 text-sm font-bold hover:bg-blue-50 transition-all">
             
                <span><AccountCircleIcon/></span> Add User
              </button>
              <button className="flex items-center gap-1 px-4 py-2 rounded-lg border-2 border-blue-700 text-blue-700 text-sm font-bold hover:bg-blue-50 transition-all">
                <span><FileUploadIcon/></span> Export
              </button>
            </div>
          </div>
        </div>

        <div className="px-8 py-6 flex-1">
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2 w-72">
              <span className="text-gray-400"><SearchIcon/></span>
              <input value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users by name, email..."
                className="text-sm outline-none w-full text-gray-700 placeholder-gray-400" />
            </div>
            {[
              { val: roleFilter, set: setRoleFilter, opts: ["All Roles", "STUDENT", "TEACHER", "HEAD OF DEPT", "PARENT", "ADMIN"] },
              { val: statusFilter, set: setStatusFilter, opts: ["All Status", "Active", "Pending"] },
              { val: deptFilter, set: setDeptFilter, opts: ["All Departments", "Form 2 Science A", "Mathematics Department", "Science Department", "IT Department"] },
            ].map((f, i) => (
              <select key={i} value={f.val} onChange={(e) => f.set(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white outline-none cursor-pointer">
                {f.opts.map((o) => <option key={o}>{o}</option>)}
              </select>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4" style={{
          background: 'linear-gradient(90deg, var(--royal-blue), var(--royal-blue-dark))'
        }}>
              <div className="flex items-center gap-3 text-white font-bold text-base">
                
                <span className="text-red-500 bg-amber-50 w-10 h-10 rounded-full flex items-center justify-center"><GroupAddIcon/></span> System Users
              </div>
              <div className="text-white font-semibold text-sm">Total: 1,345 users</div>
            </div>
            <div className="h-1 bg-red-500"></div>

            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-blue-200">
                  <th className="px-6 py-4 text-left w-10">
                    <input type="checkbox" checked={selected.length === users.length}
                      onChange={toggleAll} className="w-4 h-4 accent-blue-700 cursor-pointer" />
                  </th>
                  {["USER ID", "FULL NAME", "ROLE", "DEPARTMENT/CLASS", "EMAIL", "STATUS"].map((h) => (
                    <th key={h} className="px-4 py-4 text-left text-xs font-extrabold text-blue-700 tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, i) => (
                  <tr key={u.id} className={`border-b border-gray-100 hover:bg-blue-50/40 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                    <td className="px-6 py-4">
                      <input type="checkbox" checked={selected.includes(u.id)}
                        onChange={() => toggleSelect(u.id)} className="w-4 h-4 accent-blue-700 cursor-pointer" />
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-gray-700">{u.id}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{roleIcons[u.role]}</span>
                        <span className="text-sm font-medium text-gray-800">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border-2 ${roleColors[u.role]}`}>{u.role}</span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">{u.dept}</td>
                    <td className="px-4 py-4 text-sm text-gray-600">{u.email}</td>
                    <td className="px-4 py-4">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border-2 ${statusColors[u.status]}`}>{u.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
              <span className="text-sm text-gray-500">Showing {filtered.length} of 1,345 users</span>
              <div className="flex items-center gap-1">
                <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 text-gray-500 text-sm hover:bg-gray-100">‹</button>
                {[1, 2, 3, "...", 50].map((p, i) => (
                  <button key={i} className={`w-7 h-7 flex items-center justify-center rounded text-sm border ${p === 1 ? "bg-blue-700 text-white border-blue-700" : "border-gray-300 text-gray-600 hover:bg-gray-100"}`}>{p}</button>
                ))}
                <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 text-gray-500 text-sm hover:bg-gray-100">›</button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white outline-none">
              <option>Bulk Actions</option>
              <option>Delete Selected</option>
              <option>Activate Selected</option>
              <option>Deactivate Selected</option>
            </select>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50">Apply</button>
          </div>
        </div>
      </main>

      {/* ADD USER PANEL */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-end">
          <div className="bg-blue-100/90 border-t-2 border-blue-300 w-full px-8 py-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-800 flex items-center gap-1">
                <span>👤+</span> Add New User
              </h2>
              <button onClick={() => setShowAddUser(false)} className="text-gray-500 hover:text-red-500 text-xl font-bold">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-x-16 gap-y-3">
              <div className="flex flex-col gap-3">
                {[
                  { label: "User Role", key: "role", type: "select", opts: ["Select Role", "Student", "Teacher", "Admin", "Parent"] },
                  { label: "First Name", key: "firstName", type: "input" },
                  { label: "Email Address", key: "email", type: "input" },
                ].map((f) => (
                  <div key={f.key} className="flex items-center gap-3">
                    <label className="text-sm font-semibold text-gray-700 w-36 flex-shrink-0">{f.label} <span className="text-red-500">*</span></label>
                    {f.type === "select" ? (
                      <select value={newUser[f.key]} onChange={(e) => setNewUser({ ...newUser, [f.key]: e.target.value })}
                        className="border border-gray-400 rounded px-3 py-1.5 text-sm bg-white outline-none flex-1">
                        {f.opts.map((o) => <option key={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input value={newUser[f.key]} onChange={(e) => setNewUser({ ...newUser, [f.key]: e.target.value })}
                        className="border border-gray-400 rounded px-3 py-1.5 text-sm bg-white outline-none flex-1" />
                    )}
                  </div>
                ))}
                <div className="flex items-center gap-3">
                  <label className="text-sm font-semibold text-gray-700 w-36 flex-shrink-0">Department/Class <span className="text-red-500">*</span></label>
                  <select className="border border-gray-400 rounded px-3 py-1.5 text-sm bg-white outline-none flex-1">
                    <option>Select Department/Class</option>
                    <option>IT Department</option>
                    <option>Mathematics Department</option>
                    <option>Science Department</option>
                  </select>
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-sm font-semibold text-gray-700 w-36 flex-shrink-0">Password Option</label>
                  <select className="border border-gray-400 rounded px-3 py-1.5 text-sm bg-white outline-none flex-1">
                    <option>Generate Random Password</option>
                    <option>Set Manual Password</option>
                  </select>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <input type="checkbox" checked={newUser.sendEmail}
                    onChange={(e) => setNewUser({ ...newUser, sendEmail: e.target.checked })}
                    className="w-4 h-4 accent-blue-700" />
                  <label className="text-sm text-gray-700">Send welcome email with login credentials</label>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <label className="text-sm font-semibold text-gray-700 w-24 flex-shrink-0">User ID <span className="text-red-500">*</span></label>
                  <input placeholder="Auto-generated" disabled
                    className="border border-gray-300 rounded px-3 py-1.5 text-sm bg-gray-100 text-gray-400 outline-none w-44" />
                  <span className="text-xs text-gray-500">Will be auto-generated based on role</span>
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-sm font-semibold text-gray-700 w-24 flex-shrink-0">Last Name <span className="text-red-500">*</span></label>
                  <input value={newUser.lastName} onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                    className="border border-gray-400 rounded px-3 py-1.5 text-sm bg-white outline-none w-44" />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowAddUser(false)}
                className="px-6 py-2 rounded-lg border-2 border-blue-700 text-blue-700 font-bold text-sm bg-white hover:bg-blue-50 transition-all">
                Cancel
              </button>
              <button className="px-6 py-2 rounded-lg font-bold text-sm text-white transition-all"
                style={{ background: "linear-gradient(90deg, #1a237e, #1e3a8a)" }}>
                Create User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;