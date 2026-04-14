import { Link, useNavigate } from 'react-router';
import { mockCart, mockProducts, updateCartQuantity, removeFromCart, clearCart } from '../data/mockData';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'motion/react';

export function Cart() {
  const navigate = useNavigate();
  const [, setRefresh] = useState(0);

  const cartItems = mockCart.map(item => ({
    ...item,
    product: mockProducts.find(p => p.id === item.productId)!
  })).filter(item => item.product);

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateCartQuantity(productId, newQuantity);
    setRefresh(prev => prev + 1);
  };

  const handleRemove = (productId: string, productName: string) => {
    removeFromCart(productId);
    setRefresh(prev => prev + 1);
    toast.success('Đã xóa khỏi giỏ hàng', { description: productName });
  };

  const handleCheckout = () => {
    toast.success('Đặt hàng thành công!', {
      description: `Tổng tiền: ₫${total.toLocaleString()}`,
    });
    clearCart();
    setRefresh(prev => prev + 1);
    setTimeout(() => navigate('/orders'), 1000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-sand/10 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ShoppingBag className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
          <h2 className="text-2xl mb-4">Giỏ Hàng Trống</h2>
          <p className="text-muted-foreground mb-8">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/90 transition-all"
          >
            Khám Phá Sản Phẩm
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl md:text-4xl mb-8">Giỏ Hàng ({cartItems.length} sản phẩm)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, idx) => (
              <motion.div
                key={item.productId}
                className="bg-white rounded-xl shadow p-4 md:p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex gap-4">
                  {/* Image */}
                  <Link
                    to={`/products/${item.product.id}`}
                    className="flex-shrink-0"
                  >
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-sand/10">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/products/${item.product.id}`}
                      className="hover:text-primary transition-colors"
                    >
                      <h3 className="mb-2 line-clamp-2">{item.product.name}</h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mb-3">{item.product.shopName}</p>
                    <p className="text-xl text-destructive mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
                      ₫{item.product.price.toLocaleString()}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-border rounded-lg overflow-hidden">
                        <button
                          onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                          className="p-2 hover:bg-sand/50 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <input
                          type="number"
                          min="1"
                          max={item.product.stock}
                          value={item.quantity}
                          onChange={(e) => handleUpdateQuantity(item.productId, parseInt(e.target.value) || 1)}
                          className="w-12 text-center border-x border-border focus:outline-none text-sm"
                          style={{ fontFamily: 'var(--font-mono)' }}
                        />
                        <button
                          onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                          className="p-2 hover:bg-sand/50 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemove(item.productId, item.product.name)}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-white rounded-xl shadow p-6 sticky top-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-xl mb-6">Tóm Tắt Đơn Hàng</h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tạm tính</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>₫{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Phí vận chuyển</span>
                  <span className="text-secondary">Miễn phí</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="text-lg">Tổng cộng</span>
                <span className="text-2xl text-destructive" style={{ fontFamily: 'var(--font-mono)' }}>
                  ₫{total.toLocaleString()}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-primary text-white py-3.5 rounded-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
              >
                Thanh Toán
              </button>

              <Link
                to="/products"
                className="block text-center mt-4 text-sm text-primary hover:underline"
              >
                ← Tiếp tục mua sắm
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
