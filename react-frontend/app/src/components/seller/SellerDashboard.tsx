import { currentUser, mockProducts, mockOrders } from '../../data/mockData';
import { Link, useNavigate } from 'react-router';
import { Package, ShoppingBag, DollarSign, TrendingUp, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect } from 'react';

export function SellerDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser.role !== 'seller') {
      navigate('/');
    }
  }, [navigate]);

  const sellerProducts = mockProducts.filter(p => p.sellerId === currentUser.id);
  const totalProducts = sellerProducts.length;
  const totalSales = sellerProducts.reduce((sum, p) => sum + p.soldCount, 0);
  const totalRevenue = sellerProducts.reduce((sum, p) => sum + (p.price * p.soldCount), 0);
  const averageRating = sellerProducts.reduce((sum, p) => sum + p.rating, 0) / totalProducts;

  const stats = [
    {
      label: 'Tổng Sản Phẩm',
      value: totalProducts,
      icon: Package,
      color: 'from-primary to-primary/80',
      textColor: 'text-primary'
    },
    {
      label: 'Đã Bán',
      value: totalSales.toLocaleString(),
      icon: ShoppingBag,
      color: 'from-secondary to-secondary/80',
      textColor: 'text-secondary'
    },
    {
      label: 'Doanh Thu',
      value: `₫${(totalRevenue / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      color: 'from-gold to-gold/80',
      textColor: 'text-gold'
    },
    {
      label: 'Đánh Giá TB',
      value: averageRating.toFixed(1),
      icon: TrendingUp,
      color: 'from-accent to-accent/80',
      textColor: 'text-accent'
    }
  ];

  return (
    <div className="min-h-screen bg-sand/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl mb-2">Kênh Người Bán</h1>
          <p className="text-muted-foreground">{currentUser.shopName}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              className="bg-white rounded-xl shadow p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className={`text-3xl ${stat.textColor}`} style={{ fontFamily: 'var(--font-mono)' }}>
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          className="bg-white rounded-xl shadow p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl mb-6">Hành Động Nhanh</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/seller/add-product"
              className="flex items-center gap-4 p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Thêm Sản Phẩm</h3>
                <p className="text-sm text-muted-foreground">Đăng sản phẩm mới</p>
              </div>
            </Link>

            <Link
              to="/seller/products"
              className="flex items-center gap-4 p-6 bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-xl hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Quản Lý Sản Phẩm</h3>
                <p className="text-sm text-muted-foreground">Xem và chỉnh sửa</p>
              </div>
            </Link>

            <Link
              to="/products"
              className="flex items-center gap-4 p-6 bg-gradient-to-br from-gold/10 to-gold/20 rounded-xl hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-gold rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Xem Cửa Hàng</h3>
                <p className="text-sm text-muted-foreground">Góc nhìn khách hàng</p>
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Recent Products */}
        <motion.div
          className="bg-white rounded-xl shadow p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl">Sản Phẩm Của Tôi</h2>
            <Link to="/seller/products" className="text-primary hover:underline text-sm">
              Xem Tất Cả →
            </Link>
          </div>

          {sellerProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Bạn chưa có sản phẩm nào</p>
              <Link
                to="/seller/add-product"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-all"
              >
                <Plus className="w-5 h-5" />
                Thêm Sản Phẩm Đầu Tiên
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {sellerProducts.slice(0, 4).map(product => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="group block"
                >
                  <div className="bg-sand/10 rounded-xl overflow-hidden hover:shadow-lg transition-all">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
                        {product.name}
                      </h3>
                      <p className="text-destructive mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
                        ₫{product.price.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>⭐ {product.rating}</span>
                        <span>•</span>
                        <span>Đã bán {product.soldCount}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
