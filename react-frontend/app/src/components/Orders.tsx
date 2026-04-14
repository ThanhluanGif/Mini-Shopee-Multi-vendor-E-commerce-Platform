import { mockOrders, mockProducts, currentUser } from '../data/mockData';
import { Package, Clock, Truck, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router';

export function Orders() {
  const userOrders = mockOrders.filter(order => order.userId === currentUser.id);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-gold" />;
      case 'processing':
        return <Package className="w-5 h-5 text-primary" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-secondary" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-secondary" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-destructive" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Chờ xác nhận';
      case 'processing':
        return 'Đang xử lý';
      case 'shipped':
        return 'Đang giao';
      case 'delivered':
        return 'Đã giao';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-gold/10 text-gold';
      case 'processing':
        return 'bg-primary/10 text-primary';
      case 'shipped':
        return 'bg-secondary/10 text-secondary';
      case 'delivered':
        return 'bg-secondary/10 text-secondary';
      case 'cancelled':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-sand text-foreground';
    }
  };

  if (userOrders.length === 0) {
    return (
      <div className="min-h-screen bg-sand/10 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Package className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
          <h2 className="text-2xl mb-4">Chưa Có Đơn Hàng</h2>
          <p className="text-muted-foreground mb-8">Bạn chưa có đơn hàng nào</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/90 transition-all"
          >
            Mua Sắm Ngay
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl md:text-4xl mb-8">Đơn Hàng Của Tôi</h1>

        <div className="space-y-4">
          {userOrders.map((order, idx) => (
            <motion.div
              key={order.id}
              className="bg-white rounded-xl shadow overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              {/* Order Header */}
              <div className="p-4 md:p-6 border-b border-border bg-sand/20">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Mã đơn: <span className="text-foreground font-mono">{order.id.toUpperCase()}</span>
                    <br />
                    {new Date(order.createdAt).toLocaleDateString('vi-VN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-4 md:p-6">
                <div className="space-y-4 mb-6">
                  {order.products.map((item) => {
                    const product = mockProducts.find(p => p.id === item.productId);
                    if (!product) return null;

                    return (
                      <div key={item.productId} className="flex gap-4">
                        <Link to={`/products/${product.id}`} className="flex-shrink-0">
                          <div className="w-20 h-20 rounded-lg overflow-hidden bg-sand/10">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        </Link>
                        <div className="flex-1">
                          <Link
                            to={`/products/${product.id}`}
                            className="hover:text-primary transition-colors"
                          >
                            <h3 className="mb-1 line-clamp-2">{product.name}</h3>
                          </Link>
                          <p className="text-sm text-muted-foreground mb-2">{product.shopName}</p>
                          <div className="flex items-center justify-between">
                            <p className="text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
                              ₫{item.price.toLocaleString()} × {item.quantity}
                            </p>
                            <p className="text-destructive" style={{ fontFamily: 'var(--font-mono)' }}>
                              ₫{(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Order Total */}
                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Tổng cộng:</span>
                    <span className="text-2xl text-destructive" style={{ fontFamily: 'var(--font-mono)' }}>
                      ₫{order.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
