import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router';
import { mockProducts, categories } from '../data/mockData';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { motion } from 'motion/react';

export function Products() {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'Tất Cả');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  const searchQuery = searchParams.get('search') || '';

  const filteredProducts = useMemo(() => {
    let products = [...mockProducts];

    // Filter by category
    if (selectedCategory !== 'Tất Cả') {
      products = products.filter(p => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        products.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      default: // popular
        products.sort((a, b) => b.soldCount - a.soldCount);
    }

    return products;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-sand/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl mb-2">
            {searchQuery ? `Kết quả tìm kiếm: "${searchQuery}"` : 'Tất Cả Sản Phẩm'}
          </h1>
          <p className="text-muted-foreground">
            Tìm thấy {filteredProducts.length} sản phẩm
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <aside className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl shadow p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Bộ Lọc
                </h3>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="mb-3 text-sm text-muted-foreground">Danh Mục</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                        selectedCategory === category
                          ? 'bg-primary text-white'
                          : 'hover:bg-sand/50'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <h4 className="mb-3 text-sm text-muted-foreground">Sắp Xếp</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                >
                  <option value="popular">Phổ biến</option>
                  <option value="newest">Mới nhất</option>
                  <option value="price-asc">Giá thấp đến cao</option>
                  <option value="price-desc">Giá cao đến thấp</option>
                  <option value="rating">Đánh giá cao</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden w-full mb-4 px-4 py-3 bg-white rounded-lg shadow flex items-center justify-center gap-2"
            >
              <SlidersHorizontal className="w-5 h-5" />
              {showFilters ? 'Ẩn Bộ Lọc' : 'Hiện Bộ Lọc'}
            </button>

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl shadow p-12 text-center">
                <p className="text-muted-foreground">Không tìm thấy sản phẩm nào</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link to={`/products/${product.id}`} className="group block">
                      <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                        <div className="aspect-square overflow-hidden bg-sand/10 relative">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {product.tags.includes('hot') && (
                            <span className="absolute top-2 left-2 bg-destructive text-white text-xs px-3 py-1 rounded-full">
                              HOT
                            </span>
                          )}
                          {product.tags.includes('new') && (
                            <span className="absolute top-2 left-2 bg-secondary text-white text-xs px-3 py-1 rounded-full">
                              MỚI
                            </span>
                          )}
                          {product.tags.includes('freeship') && (
                            <span className="absolute top-2 right-2 bg-gold text-foreground text-xs px-3 py-1 rounded-full">
                              FREE SHIP
                            </span>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="text-sm mb-2 line-clamp-2 min-h-[2.5rem] group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-destructive mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
                            ₫{product.price.toLocaleString()}
                          </p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>⭐ {product.rating}</span>
                            <span>Đã bán {product.soldCount > 1000 ? `${(product.soldCount / 1000).toFixed(1)}k` : product.soldCount}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 truncate">
                            {product.shopName}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
