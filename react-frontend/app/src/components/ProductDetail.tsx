import { useParams, useNavigate, Link } from 'react-router';
import { mockProducts, addToCart } from '../data/mockData';
import { ShoppingCart, Store, Star, Truck, Shield, ArrowLeft, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'motion/react';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = mockProducts.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Không tìm thấy sản phẩm</h2>
          <Link to="/products" className="text-primary hover:underline">
            Quay lại danh sách sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = mockProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    toast.success(`Đã thêm ${quantity} sản phẩm vào giỏ hàng`, {
      description: product.name,
      action: {
        label: 'Xem giỏ hàng',
        onClick: () => navigate('/cart')
      }
    });
  };

  const handleBuyNow = () => {
    addToCart(product.id, quantity);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-sand/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại
        </button>

        {/* Product Info */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="aspect-square rounded-xl overflow-hidden bg-sand/10 shadow-inner">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs bg-sand/50 text-foreground uppercase tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl mb-4">{product.name}</h1>

              {/* Rating & Sales */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                <div className="flex items-center gap-1">
                  <span className="text-primary">{product.rating}</span>
                  <Star className="w-5 h-5 fill-primary text-primary" />
                </div>
                <div className="h-4 w-px bg-border" />
                <div className="text-muted-foreground">
                  Đã bán <span className="text-foreground">{product.soldCount.toLocaleString()}</span>
                </div>
              </div>

              {/* Price */}
              <div className="bg-sand/20 rounded-xl p-6 mb-6">
                <p className="text-4xl text-destructive mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
                  ₫{product.price.toLocaleString()}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Truck className="w-4 h-4" />
                  <span>Miễn phí vận chuyển</span>
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block mb-3">Số Lượng</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-sand/50 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={product.stock}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                      className="w-16 text-center border-x border-border focus:outline-none"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    />
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="p-3 hover:bg-sand/50 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.stock} sản phẩm có sẵn
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-primary text-primary rounded-lg hover:bg-primary/5 transition-all"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Thêm Vào Giỏ
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 px-6 py-3.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
                >
                  Mua Ngay
                </button>
              </div>

              {/* Guarantees */}
              <div className="space-y-3 pt-6 border-t border-border">
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="w-5 h-5 text-secondary" />
                  <span>Hoàn tiền 111% nếu hàng giả</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="w-5 h-5 text-secondary" />
                  <span>Giao hàng toàn quốc</span>
                </div>
              </div>

              {/* Shop Info */}
              <div className="mt-6 pt-6 border-t border-border">
                <Link
                  to={`/products?category=${encodeURIComponent(product.category)}`}
                  className="flex items-center gap-3 p-4 bg-sand/20 rounded-lg hover:bg-sand/30 transition-colors"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <Store className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium">{product.shopName}</h3>
                    <p className="text-sm text-muted-foreground">Xem cửa hàng →</p>
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Description */}
          <div className="border-t border-border p-6 lg:p-8">
            <h2 className="text-2xl mb-4">Mô Tả Sản Phẩm</h2>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl md:text-3xl mb-6">Sản Phẩm Liên Quan</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/products/${relatedProduct.id}`}
                  className="group block"
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                    <div className="aspect-square overflow-hidden bg-sand/10">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-destructive" style={{ fontFamily: 'var(--font-mono)' }}>
                        ₫{relatedProduct.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
