// src/admin/academic-structure1/SchoolProfileSetup.jsx
import React, { useState, useRef } from 'react';
import { Save, Camera, CheckCircle2, Upload } from 'lucide-react';
import { SCHOOL_INFO } from '../data/adminData';

const SchoolProfileSetup = () => {
  const [profile, setProfile] = useState({
    ...SCHOOL_INFO,
    principalName:  'Col. Emmanuel Kwame Asante (Rtd)',
    principalPhone: '0244 000 000',
    founded:        '1998',
    ownership:      'Ghana Armed Forces',
    accreditation:  'Ghana Education Service (GES)',
    postal:         'P.O. Box 1234, Kumasi',
  });
  const [logo,   setLogo]   = useState(null);
  const [toast,  setToast]  = useState(null);
  const fileRef = useRef();
  const set = (k,v) => setProfile(p=>({...p,[k]:v}));
  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(null),3000); };

  const FInput = ({ label, field, placeholder, type='text', span=false }) => (
    <div className={span ? 'sm:col-span-2' : ''}>
      <label className="text-xs font-bold uppercase tracking-wider block mb-1.5" style={{ color:'var(--dark-gray)' }}>{label}</label>
      <input type={type} value={profile[field]||''} onChange={e=>set(field,e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 text-sm rounded-xl border-2 outline-none"
        style={{ borderColor:'var(--medium-gray)', color:'var(--dark-gray)' }}
        onFocus={e=>e.target.style.borderColor='var(--royal-blue)'}
        onBlur={e=>e.target.style.borderColor='var(--medium-gray)'}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed top-4 right-4 z-[60] px-4 py-3 rounded-xl shadow-xl text-white text-sm font-semibold flex items-center gap-2"
          style={{ backgroundColor:'var(--success-dark)' }}>
          <CheckCircle2 size={14}/> {toast}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black" style={{ color:'var(--dark-gray)' }}>School Profile Setup</h1>
          <p className="text-xs text-gray-400 mt-0.5">School identity, contact details and official information</p>
        </div>
        <button type="button" onClick={()=>showToast('School profile saved successfully')}
          className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl text-white"
          style={{ backgroundColor:'var(--royal-blue)' }}>
          <Save size={14}/> Save Profile
        </button>
      </div>

      {/* Logo + Name banner */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden" style={{ borderColor:'var(--medium-gray)' }}>
        <div className="h-24 relative"
          style={{ background:'linear-gradient(135deg,var(--royal-blue),var(--royal-blue-dark))' }}>
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage:'repeating-linear-gradient(45deg,white 0,white 1px,transparent 0,transparent 50%)', backgroundSize:'20px 20px' }}/>
        </div>
        <div className="relative px-6 pb-6">
          <div className="flex items-end gap-5 -mt-10">
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 rounded-2xl border-4 border-white shadow-lg overflow-hidden flex items-center justify-center text-white font-black text-2xl"
                style={{ backgroundColor:'var(--accent-red)' }}>
                {logo ? <img src={logo} alt="logo" className="w-full h-full object-cover"/> : profile.shortName}
              </div>
              <button type="button" onClick={()=>fileRef.current?.click()}
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white shadow-md"
                style={{ backgroundColor:'var(--royal-blue)' }}>
                <Camera size={12}/>
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden"
                onChange={e=>{ const f=e.target.files?.[0]; if(f){ const r=new FileReader(); r.onloadend=()=>setLogo(r.result); r.readAsDataURL(f); } }}/>
            </div>
            <div className="pb-1">
              <h2 className="text-lg font-black" style={{ color:'var(--dark-gray)' }}>{profile.name}</h2>
              <p className="text-sm text-gray-400">{profile.motto}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Identity */}
        <div className="bg-white rounded-2xl border shadow-sm p-5" style={{ borderColor:'var(--medium-gray)' }}>
          <h3 className="font-black text-sm mb-4" style={{ color:'var(--dark-gray)' }}>School Identity</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FInput label="Full School Name"  field="name"      placeholder="Full name" span/>
            <FInput label="Short Name"        field="shortName" placeholder="e.g. AFTS"/>
            <FInput label="School Motto"      field="motto"     placeholder="School motto" span/>
            <FInput label="School Type"       field="type"      placeholder="e.g. Senior High Technical School"/>
            <FInput label="WAEC Centre Code"  field="waecCode"  placeholder="e.g. GH0042"/>
            <FInput label="Founded"           field="founded"   placeholder="e.g. 1998"/>
            <FInput label="Ownership"         field="ownership" placeholder="e.g. Ghana Armed Forces"/>
            <FInput label="Accreditation"     field="accreditation" placeholder="e.g. GES"/>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-2xl border shadow-sm p-5" style={{ borderColor:'var(--medium-gray)' }}>
          <h3 className="font-black text-sm mb-4" style={{ color:'var(--dark-gray)' }}>Contact Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FInput label="Physical Address" field="address"  placeholder="School address" span/>
            <FInput label="Postal Address"   field="postal"   placeholder="P.O. Box..." span/>
            <FInput label="Phone Number"     field="phone"    placeholder="+233 32 200 0001"/>
            <FInput label="Email"            field="email"    placeholder="info@school.edu.gh" type="email"/>
            <FInput label="Website"          field="website"  placeholder="www.school.edu.gh"/>
            <FInput label="Region"           field="region"   placeholder="e.g. Ashanti Region"/>
          </div>
        </div>

        {/* Leadership */}
        <div className="bg-white rounded-2xl border shadow-sm p-5 lg:col-span-2" style={{ borderColor:'var(--medium-gray)' }}>
          <h3 className="font-black text-sm mb-4" style={{ color:'var(--dark-gray)' }}>School Leadership</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FInput label="Headmaster / Principal Name" field="principalName"  placeholder="Full name with title"/>
            <FInput label="Principal Phone"             field="principalPhone" placeholder="0244..."/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolProfileSetup;