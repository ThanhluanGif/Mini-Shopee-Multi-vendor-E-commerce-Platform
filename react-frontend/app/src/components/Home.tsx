import { Link } from 'react-router';
import { ArrowRight, TrendingUp, Shield, Truck, Tag } from 'lucide-react';
import { mockProducts, categories } from '../data/mockData';
import { motion } from 'motion/react';

export function Home() {
  const featuredProducts = mockProducts.filter(p => p.tags.includes('hot') || p.tags.includes('bestseller')).slice(0, 6);
  const newProducts = mockProducts.filter(p => p.tags.includes('new')).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-sand/30 to-secondary/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 text-foreground leading-tight">
                Khám Phá
                <br />
                <span className="text-primary">Chợ Số</span>
                <br />
                Hiện Đại
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Hàng ngàn sản phẩm chất lượng từ các nhà bán uy tín. Mua sắm dễ dàng, giao hàng nhanh chóng.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Khám Phá Ngay
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 bg-white text-foreground px-8 py-3.5 rounded-full border-2 border-border hover:border-primary hover:text-primary transition-all"
                >
                  Đăng Ký Bán Hàng
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {featuredProducts.slice(0, 4).map((product, idx) => (
                <motion.div
                  key={product.id}
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                >
                  <Link to={`/products/${product.id}`}>
                    <div className="aspect-square rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl" />
      </section>

      {/* Features */}
      <section className="py-12 bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: 'Miễn Phí Ship', desc: 'Đơn từ 50k' },
              { icon: Shield, title: 'Hoàn Tiền 111%', desc: 'Hàng giả' },
              { icon: Tag, title: 'Deal Sốc', desc: 'Mỗi ngày' },
              { icon: TrendingUp, title: 'Xu Hướng', desc: 'Hot nhất' }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col items-center text-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm md:text-base">{feature.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl mb-8">Danh Mục Nổi Bật</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.slice(1).map((category, idx) => (
              <Link
                key={category}
                to={`/products?category=${encodeURIComponent(category)}`}
                className="group"
              >
                <motion.div
                  className="aspect-square bg-gradient-to-br from-sand/50 to-white rounded-2xl p-6 flex items-center justify-center text-center border border-border hover:border-primary hover:shadow-lg transition-all cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">
                    {category}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-sand/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl">Sản Phẩm Nổi Bật</h2>
            <Link
              to="/products"
              className="text-primary hover:text-primary/80 flex items-center gap-2 group"
            >
              Xem Tất Cả
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link to={`/products/${product.id}`} className="group block">
                  <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                    <div className="aspect-square overflow-hidden bg-sand/10">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm mb-2 line-clamp-2 min-h-[2.5rem] group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-destructive mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
                        ₫{product.price.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Đã bán {product.soldCount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Products */}
      {newProducts.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl mb-8">Sản Phẩm Mới</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {newProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link to={`/products/${product.id}`} className="group block">
                    <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                      <div className="aspect-[4/3] overflow-hidden bg-sand/10 relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <span className="absolute top-2 left-2 bg-secondary text-white text-xs px-3 py-1 rounded-full">
                          MỚI
                        </span>
                      </div>
                      <div className="p-4">
                        <h3 className="mb-2 line-clamp-2 min-h-[3rem] group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-lg text-destructive mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
                          ₫{product.price.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>⭐ {product.rating}</span>
                          <span>•</span>
                          <span>Đã bán {product.soldCount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
