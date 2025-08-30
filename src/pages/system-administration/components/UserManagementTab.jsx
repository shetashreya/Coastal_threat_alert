import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const UserManagementTab = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'viewer',
    department: '',
    phone: ''
  });

  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'super_admin', label: 'Super Administrator' },
    { value: 'admin', label: 'Administrator' },
    { value: 'coordinator', label: 'Emergency Coordinator' },
    { value: 'analyst', label: 'Environmental Analyst' },
    { value: 'operator', label: 'System Operator' },
    { value: 'viewer', label: 'Community Viewer' }
  ];

  const departmentOptions = [
    { value: 'emergency', label: 'Emergency Management' },
    { value: 'environmental', label: 'Environmental Services' },
    { value: 'operations', label: 'Operations Center' },
    { value: 'community', label: 'Community Relations' },
    { value: 'technical', label: 'Technical Support' }
  ];

  const mockUsers = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@coastalguard.gov",
      role: "super_admin",
      department: "Emergency Management",
      phone: "+1-555-0101",
      status: "active",
      lastLogin: new Date(Date.now() - 3600000),
      permissions: ["all_access", "user_management", "system_config"]
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      email: "m.rodriguez@coastalguard.gov",
      role: "coordinator",
      department: "Emergency Management",
      phone: "+1-555-0102",
      status: "active",
      lastLogin: new Date(Date.now() - 7200000),
      permissions: ["alert_management", "community_alerts", "data_analytics"]
    },
    {
      id: 3,
      name: "Dr. Emily Chen",
      email: "emily.chen@coastalguard.gov",
      role: "analyst",
      department: "Environmental Services",
      phone: "+1-555-0103",
      status: "active",
      lastLogin: new Date(Date.now() - 1800000),
      permissions: ["data_analytics", "environmental_monitoring", "reports"]
    },
    {
      id: 4,
      name: "James Wilson",
      email: "james.wilson@coastalguard.gov",
      role: "operator",
      department: "Operations Center",
      phone: "+1-555-0104",
      status: "inactive",
      lastLogin: new Date(Date.now() - 86400000),
      permissions: ["system_monitoring", "basic_alerts"]
    },
    {
      id: 5,
      name: "Maria Garcia",
      email: "maria.garcia@community.gov",
      role: "viewer",
      department: "Community Relations",
      phone: "+1-555-0105",
      status: "active",
      lastLogin: new Date(Date.now() - 10800000),
      permissions: ["view_alerts", "community_feedback"]
    }
  ];

  useEffect(() => {
    setUsers(mockUsers);
  }, []);

  const filteredUsers = users?.filter(user => {
    const matchesSearch = user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesRole = filterRole === 'all' || user?.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleUserSelect = (userId, checked) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers?.filter(id => id !== userId));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedUsers(filteredUsers?.map(user => user?.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on users:`, selectedUsers);
    setSelectedUsers([]);
  };

  const handleAddUser = () => {
    const user = {
      id: users?.length + 1,
      ...newUser,
      status: 'active',
      lastLogin: new Date(),
      permissions: getRolePermissions(newUser?.role)
    };
    setUsers([...users, user]);
    setNewUser({ name: '', email: '', role: 'viewer', department: '', phone: '' });
    setShowAddUserModal(false);
  };

  const getRolePermissions = (role) => {
    const rolePermissions = {
      super_admin: ["all_access", "user_management", "system_config"],
      admin: ["alert_management", "user_management", "data_analytics", "system_monitoring"],
      coordinator: ["alert_management", "community_alerts", "data_analytics"],
      analyst: ["data_analytics", "environmental_monitoring", "reports"],
      operator: ["system_monitoring", "basic_alerts"],
      viewer: ["view_alerts", "community_feedback"]
    };
    return rolePermissions?.[role] || [];
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      super_admin: 'bg-purple-100 text-purple-800',
      admin: 'bg-red-100 text-red-800',
      coordinator: 'bg-blue-100 text-blue-800',
      analyst: 'bg-green-100 text-green-800',
      operator: 'bg-yellow-100 text-yellow-800',
      viewer: 'bg-gray-100 text-gray-800'
    };
    return colors?.[role] || 'bg-gray-100 text-gray-800';
  };

  const formatLastLogin = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-foreground">User Management</h3>
          <p className="text-sm text-muted-foreground">
            Manage user accounts, roles, and permissions
          </p>
        </div>
        <Button
          variant="default"
          iconName="UserPlus"
          iconPosition="left"
          onClick={() => setShowAddUserModal(true)}
        >
          Add User
        </Button>
      </div>
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            options={roleOptions}
            value={filterRole}
            onChange={setFilterRole}
            placeholder="Filter by role"
          />
        </div>
      </div>
      {/* Bulk Actions */}
      {selectedUsers?.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <span className="text-sm font-medium text-blue-900">
            {selectedUsers?.length} user{selectedUsers?.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Mail"
              onClick={() => handleBulkAction('email')}
            >
              Send Email
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="UserX"
              onClick={() => handleBulkAction('deactivate')}
            >
              Deactivate
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Trash2"
              onClick={() => handleBulkAction('delete')}
            >
              Delete
            </Button>
          </div>
        </div>
      )}
      {/* Users Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="w-12 p-4">
                  <Checkbox
                    checked={selectedUsers?.length === filteredUsers?.length && filteredUsers?.length > 0}
                    onChange={(e) => handleSelectAll(e?.target?.checked)}
                  />
                </th>
                <th className="text-left p-4 font-medium text-foreground">User</th>
                <th className="text-left p-4 font-medium text-foreground">Role</th>
                <th className="text-left p-4 font-medium text-foreground">Department</th>
                <th className="text-left p-4 font-medium text-foreground">Status</th>
                <th className="text-left p-4 font-medium text-foreground">Last Login</th>
                <th className="text-right p-4 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers?.map((user) => (
                <tr key={user?.id} className="hover:bg-muted/25">
                  <td className="p-4">
                    <Checkbox
                      checked={selectedUsers?.includes(user?.id)}
                      onChange={(e) => handleUserSelect(user?.id, e?.target?.checked)}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                        {user?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{user?.name}</p>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(user?.role)}`}>
                      {roleOptions?.find(r => r?.value === user?.role)?.label}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-foreground">{user?.department}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${user?.status === 'active' ? 'bg-success' : 'bg-muted-foreground'}`} />
                      <span className={`text-sm font-medium ${user?.status === 'active' ? 'text-success' : 'text-muted-foreground'}`}>
                        {user?.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {formatLastLogin(user?.lastLogin)}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Edit"
                        onClick={() => console.log('Edit user:', user?.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="MoreHorizontal"
                        onClick={() => console.log('More actions:', user?.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-foreground">Add New User</h4>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setShowAddUserModal(false)}
              />
            </div>
            
            <div className="space-y-4">
              <Input
                label="Full Name"
                type="text"
                placeholder="Enter full name"
                value={newUser?.name}
                onChange={(e) => setNewUser({...newUser, name: e?.target?.value})}
                required
              />
              
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter email address"
                value={newUser?.email}
                onChange={(e) => setNewUser({...newUser, email: e?.target?.value})}
                required
              />
              
              <Select
                label="Role"
                options={roleOptions?.filter(r => r?.value !== 'all')}
                value={newUser?.role}
                onChange={(value) => setNewUser({...newUser, role: value})}
                required
              />
              
              <Select
                label="Department"
                options={departmentOptions}
                value={newUser?.department}
                onChange={(value) => setNewUser({...newUser, department: value})}
                required
              />
              
              <Input
                label="Phone Number"
                type="tel"
                placeholder="Enter phone number"
                value={newUser?.phone}
                onChange={(e) => setNewUser({...newUser, phone: e?.target?.value})}
              />
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowAddUserModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleAddUser}
                disabled={!newUser?.name || !newUser?.email || !newUser?.department}
              >
                Add User
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementTab;