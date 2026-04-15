export type UserRole = 'buyer' | 'seller' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  shopName?: string;
  shopDescription?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  sellerId: string;
  sellerName: string;
  shopName: string;
  stock: number;
  rating: number;
  soldCount: number;
  tags: string[];
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  products: { productId: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

// Mock current user (can be changed for testing different roles)
export let currentUser: User = {
  id: '4',
  name: 'Nguyễn Văn An',
  email: 'admin@example.com',
  role: 'admin',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Duy'
};

export const setCurrentUser = (user: User) => {
  currentUser = user;
};

// Mock users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Nguyễn Văn An',
    email: 'buyer@example.com',
    role: 'buyer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=An'
  },
  {
    id: '2',
    name: 'Trần Thị Bình',
    email: 'seller1@example.com',
    role: 'seller',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Binh',
    shopName: 'Thời Trang Bình',
    shopDescription: 'Chuyên cung cấp quần áo thời trang cao cấp'
  },
  {
    id: '3',
    name: 'Lê Minh Châu',
    email: 'seller2@example.com',
    role: 'seller',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chau',
    shopName: 'Điện Tử Châu',
    shopDescription: 'Thiết bị điện tử chính hãng giá tốt'
  },
  {
    id: '4',
    name: 'Phạm Quốc Duy',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Duy'
  }
];

// Mock products
export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Áo Thun Nam Cotton Premium',
    description: 'Áo thun nam chất liệu cotton cao cấp, thoáng mát, thấm hút mồ hôi tốt. Form regular fit phù hợp mọi dáng người.',
    price: 189000,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    category: 'Thời Trang Nam',
    sellerId: '2',
    sellerName: 'Trần Thị Bình',
    shopName: 'Thời Trang Bình',
    stock: 150,
    rating: 4.8,
    soldCount: 2341,
    tags: ['hot', 'freeship']
  },
  {
    id: 'p2',
    name: 'Tai Nghe Bluetooth TWS Pro',
    description: 'Tai nghe True Wireless cao cấp, chống ồn chủ động ANC, thời lượng pin 30h, chống nước IPX7.',
    price: 990000,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
    category: 'Điện Tử',
    sellerId: '3',
    sellerName: 'Lê Minh Châu',
    shopName: 'Điện Tử Châu',
    stock: 87,
    rating: 4.9,
    soldCount: 1523,
    tags: ['bestseller', 'authentic']
  },
  {
    id: 'p3',
    name: 'Váy Maxi Hoa Nhí',
    description: 'Váy dài hoa nhí vintage, chất vải lụa mềm mại, thiết kế thanh lịch phù hợp đi tiệc và dạo phố.',
    price: 345000,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop',
    category: 'Thời Trang Nữ',
    sellerId: '2',
    sellerName: 'Trần Thị Bình',
    shopName: 'Thời Trang Bình',
    stock: 64,
    rating: 4.7,
    soldCount: 892,
    tags: ['new', 'freeship']
  },
  {
    id: 'p4',
    name: 'Đồng Hồ Thông Minh SmartWatch X1',
    description: 'Đồng hồ thông minh theo dõi sức khỏe, đo nhịp tim, SpO2, hỗ trợ hơn 100 chế độ thể thao.',
    price: 1290000,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop',
    category: 'Điện Tử',
    sellerId: '3',
    sellerName: 'Lê Minh Châu',
    shopName: 'Điện Tử Châu',
    stock: 43,
    rating: 4.6,
    soldCount: 687,
    tags: ['hot']
  },
  {
    id: 'p5',
    name: 'Giày Sneaker Cao Cấp',
    description: 'Giày thể thao nam nữ, đế êm, chống trơn trượt, phù hợp đi bộ và chơi thể thao.',
    price: 549000,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    category: 'Giày Dép',
    sellerId: '2',
    sellerName: 'Trần Thị Bình',
    shopName: 'Thời Trang Bình',
    stock: 112,
    rating: 4.8,
    soldCount: 1876,
    tags: ['bestseller', 'freeship']
  },
  {
    id: 'p6',
    name: 'Bàn Phím Cơ Gaming RGB',
    description: 'Bàn phím cơ switch blue, LED RGB 16.8 triệu màu, keycap PBT cao cấp.',
    price: 890000,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&h=400&fit=crop',
    category: 'Điện Tử',
    sellerId: '3',
    sellerName: 'Lê Minh Châu',
    shopName: 'Điện Tử Châu',
    stock: 56,
    rating: 4.9,
    soldCount: 1234,
    tags: ['hot', 'authentic']
  },
  {
    id: 'p7',
    name: 'Túi Xách Nữ Da Cao Cấp',
    description: 'Túi xách công sở nữ, da PU cao cấp, nhiều ngăn tiện dụng, thiết kế sang trọng.',
    price: 429000,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop',
    category: 'Túi Xách',
    sellerId: '2',
    sellerName: 'Trần Thị Bình',
    shopName: 'Thời Trang Bình',
    stock: 78,
    rating: 4.7,
    soldCount: 956,
    tags: ['new']
  },
  {
    id: 'p8',
    name: 'Chuột Gaming DPI Cao',
    description: 'Chuột game DPI 16000, 7 nút lập trình được, LED RGB, cảm biến quang học chính xác.',
    price: 390000,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
    category: 'Điện Tử',
    sellerId: '3',
    sellerName: 'Lê Minh Châu',
    shopName: 'Điện Tử Châu',
    stock: 91,
    rating: 4.8,
    soldCount: 1567,
    tags: ['bestseller']
  }
];

// Mock categories
export const categories = [
  'Tất Cả',
  'Thời Trang Nam',
  'Thời Trang Nữ',
  'Điện Tử',
  'Giày Dép',
  'Túi Xách',
  'Đồng Hồ',
  'Phụ Kiện'
];

// Mock cart
export let mockCart: CartItem[] = [];

export const addToCart = (productId: string, quantity: number = 1) => {
  const existingItem = mockCart.find(item => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    mockCart.push({ productId, quantity });
  }
};

export const removeFromCart = (productId: string) => {
  mockCart = mockCart.filter(item => item.productId !== productId);
};

export const updateCartQuantity = (productId: string, quantity: number) => {
  const item = mockCart.find(item => item.productId === productId);
  if (item) {
    item.quantity = quantity;
  }
};

export const clearCart = () => {
  mockCart = [];
};

// Mock orders
export const mockOrders: Order[] = [
  {
    id: 'o1',
    userId: '1',
    products: [
      { productId: 'p1', quantity: 2, price: 189000 },
      { productId: 'p5', quantity: 1, price: 549000 }
    ],
    total: 927000,
    status: 'delivered',
    createdAt: '2026-04-01T10:30:00Z'
  },
  {
    id: 'o2',
    userId: '1',
    products: [
      { productId: 'p2', quantity: 1, price: 990000 }
    ],
    total: 990000,
    status: 'shipped',
    createdAt: '2026-04-10T14:20:00Z'
  }
];
