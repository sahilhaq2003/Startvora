import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
// Tailwind CSS used instead of Layout.css

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/business-ideation', label: 'Business Ideation', icon: '💡' },
    { path: '/business-plan', label: 'Business Plan', icon: '📝' },
    { path: '/market-analysis', label: 'Market Analysis', icon: '📈' },
    { path: '/swot', label: 'SWOT Analysis', icon: '🧩' },
    { path: '/legal-guidance', label: 'Legal Guidance', icon: '⚖️' },
    { path: '/budget-planner', label: 'Budget Planner', icon: '📅' },
    { path: '/tasks', label: 'Tasks', icon: '✅' },
    { path: '/contacts', label: 'Contacts', icon: '👥' },
    { path: '/expenses', label: 'Expenses', icon: '💰' },
    { path: '/user-profile', label: 'User Profile', icon: '👤' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gradient-to-b from-blue-900 to-blue-700 text-white flex flex-col fixed h-screen left-0 top-0">
        <div className="px-6 py-6 border-b border-white/10">
          <h2 className="m-0 text-xl font-bold">Startvora</h2>
        </div>

        <nav className="flex-1 py-4 flex flex-col gap-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            const baseClasses = 'flex items-center gap-3 px-6 py-3 transition-all';
            const activeClasses = 'bg-white/15 text-white border-l-4 border-green-500 font-semibold';
            const inactiveClasses = 'text-white/80 hover:bg-white/10';
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-6 py-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-md cursor-pointer text-sm transition-all flex items-center justify-center gap-2 hover:bg-white/20"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 min-h-screen ml-64">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
