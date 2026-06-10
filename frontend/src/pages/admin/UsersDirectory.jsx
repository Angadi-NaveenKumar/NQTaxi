import { useMemo, useState } from 'react';
import { directoryUsers } from '../../data/users';
import AdminLayout from '../../components/layout/AdminLayout';
import AdminTopbar from '../../components/layout/AdminTopbar';
import UserCard from '../../components/admin/UserCard';

export default function UsersDirectory({ email, onLogout, onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return directoryUsers;

    return directoryUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(q) ||
        user.handle.toLowerCase().includes(q) ||
        user.role.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <AdminLayout
      activePage="users"
      onNavigate={onNavigate}
      onLogout={onLogout}
      variant="light"
    >
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <span className="absolute -top-12 left-[8%] h-48 w-48 rounded-full bg-info opacity-20" />
        <span className="absolute bottom-[10%] left-[2%] h-32 w-32 rounded-[30%_70%_50%_50%] bg-success opacity-20" />
        <span className="absolute right-[5%] top-[20%] h-24 w-24 rounded-full bg-primary opacity-20" />
      </div>

      <AdminTopbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        profileName="Rebecca"
        profileAvatar="https://randomuser.me/api/portraits/women/44.jpg"
      />

      <div className="relative z-[1] flex-1 px-4 pb-8 pt-5 sm:px-8">
        <section className="min-h-[calc(100vh-6rem)] rounded-md border border-white/[0.08] bg-bg-secondary p-7 shadow-panel">
          <header className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <h1 className="m-0 text-lg font-medium tracking-wide text-primary">User Management</h1>
            <button
              type="button"
              className="cursor-pointer rounded-full border-[1.5px] border-primary bg-transparent px-5 py-2 font-sans text-xs font-semibold tracking-wider text-primary transition-[background,color] hover:bg-primary/15"
            >
              ADD USER +
            </button>
          </header>

          {filteredUsers.length === 0 ? (
            <p className="my-8 text-center text-[0.9375rem] text-text-secondary">No users match your search.</p>
          ) : (
            <div className="grid grid-cols-1 gap-5 min-[520px]:grid-cols-2 min-[900px]:grid-cols-3 min-[1200px]:grid-cols-4">
              {filteredUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          )}
        </section>
      </div>
    </AdminLayout>
  );
}
