import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { currentUser, categories } from '../../data/mockData';
import { ArrowLeft, Image as ImageIcon, Save } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'motion/react';

export function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: categories[1],
    stock: '',
    image: ''
  });

  useEffect(() => {
    if (currentUser.role !== 'seller') {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.price || !formData.stock) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    toast.success('Sản phẩm đã được thêm thành công!', {
      description: formData.name
    });

    setTimeout(() => {
      navigate('/seller/products');
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-sand/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <button
          onClick={() => navigate('/seller/products')}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại
        </button>

        <h1 className="text-3xl md:text-4xl mb-8">Thêm Sản Phẩm Mới</h1>

        {/* Form */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block mb-2">
                Tên Sản Phẩm <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="VD: Áo Thun Nam Cotton Premium"
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block mb-2">
                Mô Tả Sản Phẩm <span className="text-destructive">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Mô tả chi tiết về sản phẩm, chất liệu, tính năng..."
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                {formData.description.length} / 500 ký tự
              </p>
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="price" className="block mb-2">
                  Giá Bán (₫) <span className="text-destructive">*</span>
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="189000"
                  min="0"
                  step="1000"
                  className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  style={{ fontFamily: 'var(--font-mono)' }}
                  required
                />
              </div>

              <div>
                <label htmlFor="stock" className="block mb-2">
                  Số Lượng Kho <span className="text-destructive">*</span>
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="100"
                  min="0"
                  className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  style={{ fontFamily: 'var(--font-mono)' }}
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block mb-2">
                Danh Mục <span className="text-destructive">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                required
              >
                {categories.filter(c => c !== 'Tất Cả').map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="image" className="block mb-2">
                URL Hình Ảnh
              </label>
              <div className="relative">
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 pl-12 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Nhập URL hình ảnh sản phẩm hoặc để trống để sử dụng hình ảnh mặc định
              </p>

              {/* Image Preview */}
              {formData.image && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Xem trước:</p>
                  <div className="w-48 h-48 rounded-lg overflow-hidden bg-sand/10 border border-border">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Shop Info Display */}
            <div className="bg-sand/20 rounded-xl p-6">
              <h3 className="font-medium mb-3">Thông Tin Cửa Hàng</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tên cửa hàng:</span>
                  <span>{currentUser.shopName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Người bán:</span>
                  <span>{currentUser.name}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6 border-t border-border">
              <button
                type="button"
                onClick={() => navigate('/seller/products')}
                className="flex-1 px-6 py-3 border-2 border-border rounded-lg hover:bg-sand/50 transition-all"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
              >
                <Save className="w-5 h-5" />
                Thêm Sản Phẩm
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
