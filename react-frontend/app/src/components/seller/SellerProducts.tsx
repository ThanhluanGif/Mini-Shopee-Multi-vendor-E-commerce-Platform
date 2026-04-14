import { currentUser, mockProducts } from '../../data/mockData';
import { Link, useNavigate } from 'react-router';
import { Edit, Trash2, Plus, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function SellerProducts() {
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser.role !== 'seller') {
      navigate('/');
    }
  }, [navigate]);

  const sellerProducts = mockProducts.filter(p => p.sellerId === currentUser.id);

  const handleDelete = (productId: string, productName: string) => {
    toast.success('Sản phẩm đã được xóa', { description: productName });
  };

  return (
    <div className="min-h-screen bg-sand/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl mb-2">Quản Lý Sản Phẩm</h1>
            <p className="text-muted-foreground">{sellerProducts.length} sản phẩm</p>
          </div>
          <Link
            to="/seller/add-product"
            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            Thêm Sản Phẩm
          </Link>
        </div>

        {/* Products Table */}
        {sellerProducts.length === 0 ? (
          <motion.div
            className="bg-white rounded-xl shadow p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-muted-foreground mb-6">Bạn chưa có sản phẩm nào</p>
            <Link
              to="/seller/add-product"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-all"
            >
              <Plus className="w-5 h-5" />
              Thêm Sản Phẩm Đầu Tiên
            </Link>
          </motion.div>
        ) : (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-sand/20 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Sản Phẩm</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Danh Mục</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Giá</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Kho</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Đã Bán</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Đánh Giá</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {sellerProducts.map((product, idx) => (
                    <motion.tr
                      key={product.id}
                      className="border-b border-border last:border-0 hover:bg-sand/10 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-sand/10 flex-shrink-0">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium line-clamp-2">{product.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{product.category}</td>
                      <td className="px-6 py-4 text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
                        ₫{product.price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={product.stock < 20 ? 'text-destructive' : ''}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">{product.soldCount.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm">⭐ {product.rating}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/products/${product.id}`}
                            className="p-2 hover:bg-sand/50 rounded-lg transition-colors"
                            title="Xem"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            className="p-2 hover:bg-sand/50 rounded-lg transition-colors"
                            title="Chỉnh sửa"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id, product.name)}
                            className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                            title="Xóa"
                          >
                            <Trash2 className="w-4 h-4" />
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
              {sellerProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  className="p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <div className="flex gap-4 mb-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-sand/10 flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium mb-2 line-clamp-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
                      <p className="text-destructive" style={{ fontFamily: 'var(--font-mono)' }}>
                        ₫{product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Kho</p>
                      <p className={product.stock < 20 ? 'text-destructive' : ''}>{product.stock}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Đã bán</p>
                      <p>{product.soldCount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Đánh giá</p>
                      <p>⭐ {product.rating}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/products/${product.id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-sand/50 transition-colors text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      Xem
                    </Link>
                    <button
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-sand/50 transition-colors text-sm"
                    >
                      <Edit className="w-4 h-4" />
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      className="px-4 py-2 border border-destructive text-destructive rounded-lg hover:bg-destructive/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
