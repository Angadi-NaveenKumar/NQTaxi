import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const btnPrimary = "rounded-xl bg-primary px-6 py-2.5 font-bold text-black transition-all hover:bg-primary-dark";
const cardClass = "rounded-2xl border border-border bg-surface p-5 shadow-sm";
const inputClass = "w-full rounded-xl border border-border bg-elevated px-4 py-3 text-text outline-none focus:border-primary";
const labelClass = "mb-1.5 block text-sm font-medium text-text";

function Toast({ message }) {
  if (!message) return null;
  return <div className="fixed top-6 right-6 z-50 rounded-lg bg-success px-5 py-3 text-sm text-white shadow-lg">{message}</div>;
}

// Profile Button Component
export function ProfileButton() {
  return (
    <Link
      to="/profile"
      className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-surface shadow-lg transition-transform hover:scale-105 active:scale-95 md:h-14 md:w-14"
      aria-label="Profile"
    >
      <span className="text-xl md:text-2xl">👤</span>
    </Link>
  );
}

const ROLES = [
  { value: "customer", label: "Customer" },
  { value: "driver", label: "Driver" },
  { value: "manager", label: "Manager" },
  { value: "admin", label: "Admin" },
];

const baseFields = [
  { key: "fullName", label: "Full Name", type: "text", placeholder: "Enter full name", required: true },
  { key: "phone", label: "Phone Number", type: "tel", placeholder: "10-digit mobile number", required: true },
  { key: "email", label: "Email Address", type: "email", placeholder: "Enter email address", required: true },
];

const ROLE_FIELDS = {
  customer: [...baseFields, { key: "address", label: "Home Address", type: "text", placeholder: "Street, area, city", fullWidth: true }],
  driver: [...baseFields, { key: "licenseNumber", label: "Driving License Number", type: "text", placeholder: "DL number", required: true }, { key: "vehicleNumber", label: "Vehicle Registration Number", type: "text", placeholder: "e.g. TS09 AB 1234", required: true }],
  manager: [...baseFields, { key: "employeeId", label: "Employee ID", type: "text", placeholder: "Company employee ID", required: true }],
  admin: [...baseFields, { key: "adminId", label: "Admin ID", type: "text", placeholder: "System admin ID", required: true }],
};

const ROLE_DESCRIPTIONS = {
  customer: "Book rides, manage payments and track your trip history.",
  driver: "Complete all driver & vehicle details to start accepting rides.",
  manager: "Manage fleet operations, drivers and regional performance.",
  admin: "Full system access for user management and platform settings.",
};

export default function ProfileSettings() {
  const [role, setRole] = useState("customer");
  const [form, setForm] = useState(() => {
    const fields = ROLE_FIELDS.customer ?? [];
    return Object.fromEntries(fields.map((f) => [f.key, ""]));
  });
  const [profileImage, setProfileImage] = useState(null);
  const [toast, setToast] = useState("");
  const fields = useMemo(() => ROLE_FIELDS[role] ?? [], [role]);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    const newFields = ROLE_FIELDS[newRole] ?? [];
    setForm(Object.fromEntries(newFields.map((f) => [f.key, ""])));
  };

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = () => {
    const required = fields.filter((f) => f.required);
    const missing = required.filter((f) => !String(form[f.key] ?? "").trim());
    if (missing.length > 0) {
      setToast(`Please fill: ${missing.map((f) => f.label).join(", ")}`);
      setTimeout(() => setToast(""), 3500);
      return;
    }
    setToast(`Profile saved as ${ROLES.find((r) => r.value === role)?.label}.`);
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <div className="relative mx-auto max-w-3xl">
      <Toast message={toast} />

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text">Profile Settings</h1>
        <ProfileButton />
      </div>

      <div className={`mb-5 ${cardClass}`}>
        <div className="text-center">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="mx-auto mb-4 h-[90px] w-[90px] rounded-full border-[3px] border-primary object-cover" />
          ) : (
            <div className="mx-auto mb-4 flex h-[90px] w-[90px] items-center justify-center rounded-full border-[3px] border-dashed border-info text-xs text-muted">
              Upload Photo
            </div>
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm text-muted" />
        </div>
      </div>

      <div className={`mb-5 ${cardClass}`}>
        <h2 className="mb-2 text-lg font-bold text-text">Account Type</h2>
        <p className="mb-4 text-sm text-muted">Select whether you are a Customer, Driver, Manager or Admin.</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {ROLES.map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => handleRoleChange(r.value)}
              className={[
                "rounded-xl border-2 px-3 py-3 text-sm font-bold transition-colors",
                role === r.value ? "border-primary bg-primary/20 text-text" : "border-border bg-elevated text-muted hover:border-primary"
              ].join(" ")}
            >
              {r.label}
            </button>
          ))}
        </div>
        <p className="mt-4 rounded-lg bg-primary/10 px-3 py-2 text-sm text-text">{ROLE_DESCRIPTIONS[role]}</p>
      </div>

      <div className={`mb-5 ${cardClass}`}>
        <h2 className="mb-1 text-lg font-bold text-text">{ROLES.find((r) => r.value === role)?.label} Profile</h2>
        <p className="mb-5 text-sm text-muted">
          {role === "driver" ? "Fill in all driver and vehicle details below to complete your registration." : "Enter your profile information below."}
        </p>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {fields.map((field) => (
            <div key={field.key} className={field.fullWidth ? "md:col-span-2" : ""}>
              <label className={labelClass}>
                {field.label}
                {field.required && <span className="text-danger"> *</span>}
              </label>
              <input
                type={field.type || "text"}
                placeholder={field.placeholder}
                className={inputClass}
                value={form[field.key] ?? ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
              />
            </div>
          ))}
        </div>
        {role === "driver" && (
          <div className="mt-6 rounded-xl border border-dashed border-primary/50 bg-primary/5 p-4">
            <p className="text-sm font-semibold text-text">Driver documents</p>
            <p className="mt-1 text-xs text-muted">
              Keep your license, RC, insurance and permit details ready. NQTaxi may verify documents before activating your driver account.
            </p>
          </div>
        )}
      </div>

      <button type="button" onClick={handleSave} className={`w-full py-3.5 text-base ${btnPrimary}`}>
        Save Profile
      </button>
    </div>
  );
}