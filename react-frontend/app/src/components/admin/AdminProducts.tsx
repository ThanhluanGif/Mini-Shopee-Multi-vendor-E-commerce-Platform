'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { currentUser, mockProducts } from '../../data/mockData';

export function AdminProducts() {
  const router = useRouter();

  useEffect(() => {
    if (currentUser.role !== 'admin') {
      router.replace('/');
    }
  }, [router]);

  const handleApprove = (productId: string, productName: string) => {
    toast.success('Đã duyệt sản phẩm', { description: productName });
  };

  const handleReject = (productId: string, productName: string) => {
    toast.error('Đã từ chối sản phẩm', { description: productName });
  };

  const handleDelete = (productId: string, productName: string) => {
    toast.success('Đã xóa sản phẩm', { description: productName });
  };

  return (
    <div className="min-h-screen bg-sand/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl mb-2">Quản Lý Sản Phẩm</h1>
          <p className="text-muted-foreground">{mockProducts.length} sản phẩm trên nền tảng</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Tổng Sản Phẩm', value: mockProducts.length, color: 'from-primary/10 to-primary/5', textColor: 'text-primary' },
            { label: 'Đã Bán', value: mockProducts.reduce((sum, p) => sum + p.soldCount, 0).toLocaleString(), color: 'from-secondary/10 to-secondary/5', textColor: 'text-secondary' },
            { label: 'Hot', value: mockProducts.filter(p => p.tags.includes('hot')).length, color: 'from-destructive/10 to-destructive/5', textColor: 'text-destructive' },
            { label: 'Mới', value: mockProducts.filter(p => p.tags.includes('new')).length, color: 'from-gold/10 to-gold/5', textColor: 'text-gold' }
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              className={`bg-gradient-to-br ${stat.color} rounded-xl p-6`}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className={`text-3xl ${stat.textColor}`} style={{ fontFamily: 'var(--font-mono)' }}>
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {/* Desktop View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-sand/20 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Sản Phẩm</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Người Bán</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Danh Mục</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Giá</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Kho</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Đã Bán</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Đánh Giá</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {mockProducts.map((product, idx) => (
                  <motion.tr
                    key={product.id}
                    className="border-b border-border last:border-0 hover:bg-sand/10 transition-colors"
                    initial={false}
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
                          <p className="font-medium line-clamp-2 max-w-xs">{product.name}</p>
                          {product.tags.length > 0 && (
                            <div className="flex gap-1 mt-1">
                              {product.tags.map(tag => (
                                <span key={tag} className="text-xs px-2 py-0.5 bg-sand rounded-full uppercase">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium">{product.shopName}</p>
                      <p className="text-xs text-muted-foreground">{product.sellerName}</p>
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
                          href={`/products/${product.id}`}
                          className="p-2 hover:bg-sand/50 rounded-lg transition-colors"
                          title="Xem"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleApprove(product.id, product.name)}
                          className="p-2 hover:bg-secondary/10 text-secondary rounded-lg transition-colors"
                          title="Duyệt"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleReject(product.id, product.name)}
                          className="p-2 hover:bg-gold/10 text-gold rounded-lg transition-colors"
                          title="Từ chối"
                        >
                          <XCircle className="w-4 h-4" />
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
            {mockProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                className="p-4"
                initial={false}
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
                    <p className="text-sm text-muted-foreground mb-1">{product.shopName}</p>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                    <div className="flex gap-1 mt-2">
                      {product.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-0.5 bg-sand rounded-full uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Giá</p>
                    <p className="text-destructive" style={{ fontFamily: 'var(--font-mono)' }}>
                      ₫{(product.price / 1000).toFixed(0)}k
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Kho</p>
                    <p className={product.stock < 20 ? 'text-destructive' : ''}>{product.stock}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Đã bán</p>
                    <p>{product.soldCount > 1000 ? `${(product.soldCount / 1000).toFixed(1)}k` : product.soldCount}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/products/${product.id}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-sand/50 transition-colors text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    Xem
                  </Link>
                  <button
                    onClick={() => handleApprove(product.id, product.name)}
                    className="px-4 py-2 border border-secondary text-secondary rounded-lg hover:bg-secondary/10 transition-colors"
                    title="Duyệt"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id, product.name)}
                    className="px-4 py-2 border border-destructive text-destructive rounded-lg hover:bg-destructive/10 transition-colors"
                    title="Xóa"
                  >
                    <Trash2 className="w-4 h-4" />
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
