import { Outlet, Link, useNavigate } from 'react-router';
import { ShoppingCart, User, Search, Menu, Store, LayoutDashboard } from 'lucide-react';
import { currentUser, mockCart } from '../data/mockData';
import { useState } from 'react';
import { Toaster } from 'sonner';

export function Layout() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemCount = mockCart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-right" richColors />
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top bar */}
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl tracking-tight text-primary">Mini Shopee</h1>
                <p className="text-xs text-muted-foreground -mt-1">Marketplace</p>
              </div>
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full px-4 py-2.5 pr-12 rounded-full bg-sand/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Right side actions */}
            <div className="flex items-center gap-4">
              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 hover:bg-sand/50 rounded-lg transition-colors"
              >
                <ShoppingCart className="w-6 h-6 text-foreground" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-destructive text-white text-xs w-5 h-5 flex items-center justify-center rounded-full" style={{ fontFamily: 'var(--font-mono)' }}>
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              <div className="relative group">
                <button className="flex items-center gap-2 p-2 hover:bg-sand/50 rounded-lg transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-gold flex items-center justify-center">
                    <User className="w-5 h-5 text-foreground" />
                  </div>
                  <span className="hidden lg:block text-sm">{currentUser.name}</span>
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-3 border-b border-border">
                    <p className="font-medium text-sm">{currentUser.name}</p>
                    <p className="text-xs text-muted-foreground">{currentUser.email}</p>
                    <p className="text-xs mt-1 px-2 py-0.5 bg-sand rounded-full inline-block capitalize">
                      {currentUser.role}
                    </p>
                  </div>
                  <div className="p-2">
                    <Link
                      to="/orders"
                      className="block px-3 py-2 text-sm hover:bg-sand/50 rounded transition-colors"
                    >
                      Đơn Hàng Của Tôi
                    </Link>
                    {currentUser.role === 'seller' && (
                      <>
                        <Link
                          to="/seller"
                          className="block px-3 py-2 text-sm hover:bg-sand/50 rounded transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 inline mr-2" />
                          Kênh Người Bán
                        </Link>
                        <Link
                          to="/seller/products"
                          className="block px-3 py-2 text-sm hover:bg-sand/50 rounded transition-colors"
                        >
                          Quản Lý Sản Phẩm
                        </Link>
                      </>
                    )}
                    {currentUser.role === 'admin' && (
                      <>
                        <Link
                          to="/admin"
                          className="block px-3 py-2 text-sm hover:bg-sand/50 rounded transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 inline mr-2" />
                          Quản Trị Hệ Thống
                        </Link>
                        <Link
                          to="/admin/users"
                          className="block px-3 py-2 text-sm hover:bg-sand/50 rounded transition-colors"
                        >
                          Quản Lý Người Dùng
                        </Link>
                        <Link
                          to="/admin/products"
                          className="block px-3 py-2 text-sm hover:bg-sand/50 rounded transition-colors"
                        >
                          Quản Lý Sản Phẩm
                        </Link>
                      </>
                    )}
                    <Link
                      to="/login"
                      className="block px-3 py-2 text-sm hover:bg-sand/50 rounded transition-colors text-destructive"
                    >
                      Đăng Xuất
                    </Link>
                  </div>
                </div>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-sand/50 rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="md:hidden pb-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full px-4 py-2 pr-12 rounded-full bg-sand/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-primary text-white p-1.5 rounded-full"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-cream mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg mb-4">Về Mini Shopee</h3>
              <p className="text-sm text-sand opacity-80">
                Nền tảng thương mại điện tử hàng đầu Việt Nam, kết nối người mua và người bán.
              </p>
            </div>
            <div>
              <h3 className="text-lg mb-4">Dịch Vụ</h3>
              <ul className="text-sm space-y-2 text-sand opacity-80">
                <li>Miễn phí vận chuyển</li>
                <li>Thanh toán COD</li>
                <li>Hoàn tiền 111%</li>
                <li>Bảo hành toàn quốc</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg mb-4">Hỗ Trợ</h3>
              <ul className="text-sm space-y-2 text-sand opacity-80">
                <li>Trung tâm trợ giúp</li>
                <li>Hướng dẫn mua hàng</li>
                <li>Hướng dẫn bán hàng</li>
                <li>Liên hệ chúng tôi</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg mb-4">Liên Hệ</h3>
              <ul className="text-sm space-y-2 text-sand opacity-80">
                <li>Email: support@minishopee.vn</li>
                <li>Hotline: 1900 1234</li>
                <li>Giờ làm việc: 8:00 - 22:00</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-sand/20 mt-8 pt-8 text-center text-sm text-sand/60">
            <p>© 2026 Mini Shopee. Demo Project - Fullstack E-commerce Platform</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
