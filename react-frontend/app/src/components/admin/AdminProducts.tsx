'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { API_BASE_URL } from '../../lib/api';
import { currentUser, type Product, mockProducts } from '../../data/mockData';

type AdminProduct = Product & {
  status?: 'pending' | 'approved' | 'rejected';
};

export function AdminProducts() {
  const router = useRouter();
  const [products, setProducts] = useState<AdminProduct[]>(mockProducts);
  const [isLoading, setIsLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    if (currentUser.role !== 'admin') {
      router.replace('/');
    }
  }, [router]);

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        const response = await fetch(`${API_BASE_URL}/products`, {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error('Failed to load products');
        }

        const payload = await response.json();

        if (!active) {
          return;
        }

        setProducts(payload.data ?? []);
        setUsingFallback(false);
      } catch (error) {
        if (!active) {
          return;
        }

        setProducts(mockProducts);
        setUsingFallback(true);
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  async function updateProductStatus(productId: string, status: 'approved' | 'rejected') {
    const response = await fetch(`${API_BASE_URL}/products/${productId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error('Failed to update product status');
    }

    const payload = await response.json();
    const updatedProduct = payload.data as AdminProduct;

    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === productId ? { ...product, ...updatedProduct } : product
      )
    );
  }

  const handleApprove = async (productId: string, productName: string) => {
    try {
      await updateProductStatus(productId, 'approved');
      toast.success('Da duyet san pham', { description: productName });
    } catch (error) {
      toast.error('Khong the duyet san pham luc nay');
    }
  };

  const handleReject = async (productId: string, productName: string) => {
    try {
      await updateProductStatus(productId, 'rejected');
      toast.error('Da tu choi san pham', { description: productName });
    } catch (error) {
      toast.error('Khong the tu choi san pham luc nay');
    }
  };

  const handleDelete = async (productId: string, productName: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      setProducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== productId)
      );
      toast.success('Da xoa san pham', { description: productName });
    } catch (error) {
      toast.error('Khong the xoa san pham luc nay');
    }
  };

  const totalProducts = products.length;
  const totalSold = products.reduce((sum, product) => sum + product.soldCount, 0);
  const totalHot = products.filter((product) => product.tags.includes('hot')).length;
  const totalNew = products.filter((product) => product.tags.includes('new')).length;

  return (
    <div className="min-h-screen bg-sand/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl mb-2">Quan Ly San Pham</h1>
          <p className="text-muted-foreground">{totalProducts} san pham tren nen tang</p>
          {usingFallback && (
            <p className="text-sm text-gold mt-2">
              Backend chua san sang. Trang dang hien thi du lieu demo tam thoi.
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Tong San Pham', value: totalProducts, color: 'from-primary/10 to-primary/5', textColor: 'text-primary' },
            { label: 'Da Ban', value: totalSold.toLocaleString(), color: 'from-secondary/10 to-secondary/5', textColor: 'text-secondary' },
            { label: 'Hot', value: totalHot, color: 'from-destructive/10 to-destructive/5', textColor: 'text-destructive' },
            { label: 'Moi', value: totalNew, color: 'from-gold/10 to-gold/5', textColor: 'text-gold' }
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

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-sand/20 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">San Pham</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Nguoi Ban</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Danh Muc</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Gia</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Kho</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Da Ban</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Danh Gia</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">Hanh Dong</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, idx) => (
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
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium line-clamp-2 max-w-xs">{product.name}</p>
                          {product.tags.length > 0 && (
                            <div className="flex gap-1 mt-1">
                              {product.tags.map((tag) => (
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
                      {product.price.toLocaleString()} VND
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={product.stock < 20 ? 'text-destructive' : ''}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">{product.soldCount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm">* {product.rating}</td>
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
                          title="Duyet"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleReject(product.id, product.name)}
                          className="p-2 hover:bg-gold/10 text-gold rounded-lg transition-colors"
                          title="Tu choi"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                          title="Xoa"
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

          <div className="md:hidden divide-y divide-border">
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                className="p-4"
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="flex gap-4 mb-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-sand/10 flex-shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{product.shopName}</p>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                    <div className="flex gap-1 mt-2">
                      {product.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 bg-sand rounded-full uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Gia</p>
                    <p className="text-destructive" style={{ fontFamily: 'var(--font-mono)' }}>
                      {(product.price / 1000).toFixed(0)}k
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Kho</p>
                    <p className={product.stock < 20 ? 'text-destructive' : ''}>{product.stock}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Da ban</p>
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
                    title="Duyet"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id, product.name)}
                    className="px-4 py-2 border border-destructive text-destructive rounded-lg hover:bg-destructive/10 transition-colors"
                    title="Xoa"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {isLoading && (
          <p className="text-sm text-muted-foreground mt-4">Dang tai danh sach san pham...</p>
        )}
      </div>
    </div>
  );
}
