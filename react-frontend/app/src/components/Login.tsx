import { useState } from 'react';
import { useNavigate } from 'react-router';
import { mockUsers, setCurrentUser } from '../data/mockData';
import { Store, User, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'motion/react';

export function Login() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<'buyer' | 'seller' | 'admin'>('buyer');

  const handleLogin = (role: 'buyer' | 'seller' | 'admin') => {
    const user = mockUsers.find(u => u.role === role);
    if (user) {
      setCurrentUser(user);
      toast.success(`Đăng nhập thành công với vai trò ${role === 'buyer' ? 'Người mua' : role === 'seller' ? 'Người bán' : 'Admin'}`, {
        description: user.name
      });

      // Redirect based on role
      setTimeout(() => {
        if (role === 'seller') {
          navigate('/seller');
        } else if (role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
        window.location.reload(); // Refresh to update navbar
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-sand/30 to-secondary/5 flex items-center justify-center p-4">
      <motion.div
        className="max-w-4xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Store className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl mb-2">Chào Mừng Đến Mini Shopee</h1>
          <p className="text-muted-foreground">Chọn vai trò để trải nghiệm demo</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Buyer */}
          <motion.div
            className={`bg-white rounded-2xl p-8 shadow-lg cursor-pointer border-2 transition-all ${
              selectedRole === 'buyer' ? 'border-primary scale-105' : 'border-transparent hover:border-sand'
            }`}
            onClick={() => setSelectedRole('buyer')}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl text-center mb-3">Người Mua</h2>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Mua sắm các sản phẩm từ nhiều người bán khác nhau
            </p>
            <ul className="text-sm space-y-2 text-muted-foreground mb-6">
              <li>✓ Tìm kiếm sản phẩm</li>
              <li>✓ Thêm vào giỏ hàng</li>
              <li>✓ Đặt hàng & theo dõi</li>
            </ul>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLogin('buyer');
              }}
              className="w-full bg-primary text-white py-2.5 rounded-lg hover:bg-primary/90 transition-all"
            >
              Đăng Nhập
            </button>
          </motion.div>

          {/* Seller */}
          <motion.div
            className={`bg-white rounded-2xl p-8 shadow-lg cursor-pointer border-2 transition-all ${
              selectedRole === 'seller' ? 'border-secondary scale-105' : 'border-transparent hover:border-sand'
            }`}
            onClick={() => setSelectedRole('seller')}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Store className="w-8 h-8 text-secondary" />
            </div>
            <h2 className="text-xl text-center mb-3">Người Bán</h2>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Quản lý cửa hàng và bán sản phẩm của bạn
            </p>
            <ul className="text-sm space-y-2 text-muted-foreground mb-6">
              <li>✓ Quản lý sản phẩm</li>
              <li>✓ Thêm sản phẩm mới</li>
              <li>✓ Theo dõi doanh số</li>
            </ul>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLogin('seller');
              }}
              className="w-full bg-secondary text-white py-2.5 rounded-lg hover:bg-secondary/90 transition-all"
            >
              Đăng Nhập
            </button>
          </motion.div>

          {/* Admin */}
          <motion.div
            className={`bg-white rounded-2xl p-8 shadow-lg cursor-pointer border-2 transition-all ${
              selectedRole === 'admin' ? 'border-gold scale-105' : 'border-transparent hover:border-sand'
            }`}
            onClick={() => setSelectedRole('admin')}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-gold/5 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-gold" />
            </div>
            <h2 className="text-xl text-center mb-3">Quản Trị Viên</h2>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Quản lý toàn bộ hệ thống nền tảng
            </p>
            <ul className="text-sm space-y-2 text-muted-foreground mb-6">
              <li>✓ Quản lý người dùng</li>
              <li>✓ Quản lý sản phẩm</li>
              <li>✓ Thống kê hệ thống</li>
            </ul>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLogin('admin');
              }}
              className="w-full bg-gold text-foreground py-2.5 rounded-lg hover:bg-gold/90 transition-all"
            >
              Đăng Nhập
            </button>
          </motion.div>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>💡 Đây là demo - bạn có thể chuyển đổi giữa các vai trò bất kỳ lúc nào</p>
        </div>
      </motion.div>
    </div>
  );
}
