'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Users, Package, ShoppingBag, DollarSign, TrendingUp, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import { currentUser, mockUsers, mockProducts, mockOrders } from '../../data/mockData';

export function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    if (currentUser.role !== 'admin') {
      router.replace('/');
    }
  }, [router]);

  const totalUsers = mockUsers.length;
  const totalProducts = mockProducts.length;
  const totalOrders = mockOrders.length;
  const totalRevenue = mockProducts.reduce((sum, p) => sum + (p.price * p.soldCount), 0);

  const stats = [
    {
      label: 'Tổng Người Dùng',
      value: totalUsers,
      icon: Users,
      color: 'from-primary to-primary/80',
      textColor: 'text-primary',
      link: '/admin/users'
    },
    {
      label: 'Tổng Sản Phẩm',
      value: totalProducts,
      icon: Package,
      color: 'from-secondary to-secondary/80',
      textColor: 'text-secondary',
      link: '/admin/products'
    },
    {
      label: 'Đơn Hàng',
      value: totalOrders,
      icon: ShoppingBag,
      color: 'from-gold to-gold/80',
      textColor: 'text-gold',
      link: '/admin'
    },
    {
      label: 'Tổng Doanh Thu',
      value: `₫${(totalRevenue / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      color: 'from-accent to-accent/80',
      textColor: 'text-accent',
      link: '/admin'
    }
  ];

  const recentActivity = [
    { type: 'user', text: 'Nguyễn Văn An đã đăng ký tài khoản', time: '5 phút trước' },
    { type: 'product', text: 'Sản phẩm mới được thêm bởi Thời Trang Bình', time: '10 phút trước' },
    { type: 'order', text: 'Đơn hàng #O1 đã được giao thành công', time: '15 phút trước' },
    { type: 'user', text: 'Trần Thị Bình đã cập nhật cửa hàng', time: '30 phút trước' },
  ];

  return (
    <div className="min-h-screen bg-sand/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl mb-2">Quản Trị Hệ Thống</h1>
          <p className="text-muted-foreground">Tổng quan nền tảng Mini Shopee</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link href={stat.link} className="block">
                <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-secondary" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className={`text-3xl ${stat.textColor}`} style={{ fontFamily: 'var(--font-mono)' }}>
                    {stat.value}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <motion.div
            className="bg-white rounded-xl shadow p-6"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl flex items-center gap-2">
                <Activity className="w-6 h-6" />
                Hoạt Động Gần Đây
              </h2>
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-3 pb-4 border-b border-border last:border-0"
                  initial={false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                >
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'user' ? 'bg-primary' :
                    activity.type === 'product' ? 'bg-secondary' :
                    'bg-gold'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm">{activity.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="bg-white rounded-xl shadow p-6"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl mb-6">Quản Lý Nhanh</h2>

            <div className="space-y-4">
              <Link
                href="/admin/users"
                className="flex items-center gap-4 p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">Quản Lý Người Dùng</h3>
                  <p className="text-sm text-muted-foreground">Xem và quản lý tài khoản</p>
                </div>
              </Link>

              <Link
                href="/admin/products"
                className="flex items-center gap-4 p-4 bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-xl hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">Quản Lý Sản Phẩm</h3>
                  <p className="text-sm text-muted-foreground">Duyệt và kiểm duyệt SP</p>
                </div>
              </Link>

              <Link
                href="/products"
                className="flex items-center gap-4 p-4 bg-gradient-to-br from-gold/10 to-gold/20 rounded-xl hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 bg-gold rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-6 h-6 text-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">Xem Nền Tảng</h3>
                  <p className="text-sm text-muted-foreground">Góc nhìn người dùng</p>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Top Sellers */}
        <motion.div
          className="bg-white rounded-xl shadow p-6 mt-6"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl mb-6">Top Người Bán</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockUsers.filter(u => u.role === 'seller').map((seller, idx) => {
              const sellerProducts = mockProducts.filter(p => p.sellerId === seller.id);
              const totalSales = sellerProducts.reduce((sum, p) => sum + p.soldCount, 0);
              const revenue = sellerProducts.reduce((sum, p) => sum + (p.price * p.soldCount), 0);

              return (
                <motion.div
                  key={seller.id}
                  className="p-4 bg-sand/10 rounded-xl"
                  initial={false}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + idx * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={seller.avatar}
                      alt={seller.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-medium">{seller.shopName}</h3>
                      <p className="text-sm text-muted-foreground">{seller.name}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Sản phẩm</p>
                      <p className="font-medium">{sellerProducts.length}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Đã bán</p>
                      <p className="font-medium">{totalSales.toLocaleString()}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Doanh thu</p>
                      <p className="font-medium text-destructive" style={{ fontFamily: 'var(--font-mono)' }}>
                        ₫{(revenue / 1000000).toFixed(1)}M
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
