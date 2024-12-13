const StatCard = ({ title, value, description, icon, color }: {
    title: string;
    value: string;
    description: string;
    icon: string;
    color: string;
}) => (
    <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-4">
            <div className={`text-2xl ${color}`}>{icon}</div>
            <div>
                <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
        </div>
        <div className="mt-4">
            <div className={`text-3xl font-bold ${color}`}>{value}</div>
        </div>
    </div>
);

const Dashboard = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome to Labs</h1>
                <p className="text-gray-500">Your AI-powered product development hub</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard
                    title="Active Users"
                    value="156"
                    description="Total users this month"
                    icon="👥"
                    color="text-blue-500"
                />
                <StatCard
                    title="Teams"
                    value="12"
                    description="Collaborative groups"
                    icon="🤝"
                    color="text-purple-500"
                />
                <StatCard
                    title="Conversations"
                    value="1,234"
                    description="AI interactions this month"
                    icon="💬"
                    color="text-green-500"
                />
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-blue-500">AI</span>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">New Conversation Started</h3>
                                <p className="text-sm text-gray-500">2 hours ago</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 