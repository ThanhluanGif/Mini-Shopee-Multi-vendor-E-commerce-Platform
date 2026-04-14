import { Link } from 'react-router';
import { Home, Search } from 'lucide-react';
import { motion } from 'motion/react';

export function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-sand/30 to-secondary/5 flex items-center justify-center p-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-9xl mb-4 text-primary" style={{ fontFamily: 'var(--font-mono)' }}>
          404
        </h1>
        <h2 className="text-3xl md:text-4xl mb-4">Không Tìm Thấy Trang</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
          >
            <Home className="w-5 h-5" />
            Về Trang Chủ
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-white text-foreground px-8 py-3 rounded-full border-2 border-border hover:border-primary hover:text-primary transition-all"
          >
            <Search className="w-5 h-5" />
            Khám Phá Sản Phẩm
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
