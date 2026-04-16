'use client';

import { useRouter } from 'next/navigation';
import { Shield, Store, User, Ban, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { currentUser, mockUsers } from '../../data/mockData';

export function AdminUsers() {
  const router = useRouter();

  useEffect(() => {
    if (currentUser.role !== 'admin') {
      router.replace('/');
    }
  }, [router]);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="w-5 h-5 text-gold" />;
      case 'seller':
        return <Store className="w-5 h-5 text-secondary" />;
      default:
        return <User className="w-5 h-5 text-primary" />;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-gold/10 text-gold';
      case 'seller':
        return 'bg-secondary/10 text-secondary';
      default:
        return 'bg-primary/10 text-primary';
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Quản Trị Viên';
      case 'seller':
        return 'Người Bán';
      default:
        return 'Người Mua';
    }
  };

  const handleBanUser = (userId: string, userName: string) => {
    toast.success('Đã khóa tài khoản', { description: userName });
  };

  const handleActivateUser = (userId: string, userName: string) => {
    toast.success('Đã kích hoạt tài khoản', { description: userName });
  };

  return (
    <div className="min-h-screen bg-sand/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl mb-2">Quản Lý Người Dùng</h1>
          <p className="text-muted-foreground">{mockUsers.length} người dùng</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Người Mua', count: mockUsers.filter(u => u.role === 'buyer').length, color: 'from-primary/10 to-primary/5', textColor: 'text-primary' },
            { label: 'Người Bán', count: mockUsers.filter(u => u.role === 'seller').length, color: 'from-secondary/10 to-secondary/5', textColor: 'text-secondary' },
            { label: 'Quản Trị', count: mockUsers.filter(u => u.role === 'admin').length, color: 'from-gold/10 to-gold/5', textColor: 'text-gold' }
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              className={`bg-gradient-to-br ${stat.color} rounded-xl p-6`}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className={`text-4xl ${stat.textColor}`} style={{ fontFamily: 'var(--font-mono)' }}>
                {stat.count}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Users List */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {/* Desktop View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-sand/20 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Người Dùng</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Vai Trò</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Cửa Hàng</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map((user, idx) => (
                  <motion.tr
                    key={user.id}
                    className="border-b border-border last:border-0 hover:bg-sand/10 transition-colors"
                    initial={false}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-medium">{user.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getRoleIcon(user.role)}
                        <span className={`px-3 py-1 rounded-full text-xs ${getRoleBadge(user.role)}`}>
                          {getRoleText(user.role)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {user.shopName || '—'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleActivateUser(user.id, user.name)}
                          className="p-2 hover:bg-secondary/10 text-secondary rounded-lg transition-colors"
                          title="Kích hoạt"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleBanUser(user.id, user.name)}
                          className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                          title="Khóa"
                          disabled={user.role === 'admin'}
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="md:hidden divide-y divide-border">
            {mockUsers.map((user, idx) => (
              <motion.div
                key={user.id}
                className="p-4"
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium mb-1">{user.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{user.email}</p>
                    <div className="flex items-center gap-2">
                      {getRoleIcon(user.role)}
                      <span className={`px-3 py-1 rounded-full text-xs ${getRoleBadge(user.role)}`}>
                        {getRoleText(user.role)}
                      </span>
                    </div>
                  </div>
                </div>

                {user.shopName && (
                  <div className="mb-3 text-sm">
                    <span className="text-muted-foreground">Cửa hàng: </span>
                    <span>{user.shopName}</span>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => handleActivateUser(user.id, user.name)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-secondary text-secondary rounded-lg hover:bg-secondary/10 transition-colors text-sm"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Kích hoạt
                  </button>
                  <button
                    onClick={() => handleBanUser(user.id, user.name)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-destructive text-destructive rounded-lg hover:bg-destructive/10 transition-colors text-sm"
                    disabled={user.role === 'admin'}
                  >
                    <Ban className="w-4 h-4" />
                    Khóa
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
