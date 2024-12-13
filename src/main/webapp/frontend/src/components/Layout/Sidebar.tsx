import { NavLink } from 'react-router-dom';

interface NavItem {
    name: string;
    path: string;
    icon: string;
    description: string;
    color: string;
}

const navItems: NavItem[] = [
    {
        name: 'Seldon',
        path: '/',
        icon: '📊',
        description: 'Strategic Planning & Dashboard',
        color: 'text-blue-500'
    },
    {
        name: 'Baley',
        path: '/users',
        icon: '👥',
        description: 'User Management',
        color: 'text-purple-500'
    },
    {
        name: 'Dors',
        path: '/teams',
        icon: '🤝',
        description: 'Team Collaboration',
        color: 'text-orange-500'
    },
    {
        name: 'Daneel',
        path: '/conversations',
        icon: '💬',
        description: 'AI Conversations',
        color: 'text-green-500'
    }
];

const Sidebar = () => {
    return (
        <aside className="w-64 bg-white shadow-sm h-screen">
            <div className="p-4">
                <div className="space-y-4">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `
                                block p-4 rounded-lg transition-all
                                ${isActive 
                                    ? 'bg-gray-100 shadow-sm' 
                                    : 'hover:bg-gray-50'}
                            `}
                        >
                            <div className="flex items-center space-x-3">
                                <span className="text-2xl">{item.icon}</span>
                                <div>
                                    <h3 className={`font-medium ${item.color}`}>
                                        {item.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar; 