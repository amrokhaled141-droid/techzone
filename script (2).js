// بيانات المنتجات 
const products = [
    {
        id: 1,
        name: "لابتوب Dell XPS 13",
        category: "laptop",
        brand: "dell",
        price: 25000,
        image: "💻",
        features: ["شاشة 13 بوصة", "معالج i7", "ذاكرة 16GB", "مساحة 512GB SSD"]
    },
    {
        id: 2,
        name: "هاتف Samsung Galaxy S23",
        category: "phone",
        brand: "samsung",
        price: 18000,
        image: "📱",
        features: ["شاشة 6.1 بوصة", "كاميرا 50 ميجابكسل", "ذاكرة 8GB", "مساحة 256GB"]
    },
    {
        id: 3,
        name: "آيباد برو 12.9 بوصة",
        category: "tablet",
        brand: "apple",
        price: 22000,
        image: "📟",
        features: ["شاشة 12.9 بوصة", "شريحة M1", "ذاكرة 8GB", "مساحة 256GB"]
    },
    {
        id: 4,
        name: "لابتوب HP Spectre x360",
        category: "laptop",
        brand: "hp",
        price: 28000,
        image: "💻",
        features: ["شاشة 13.5 بوصة", "معالج i7", "ذاكرة 16GB", "مساحة 1TB SSD"]
    },
    {
        id: 5,
        name: "آيفون 14 برو",
        category: "phone",
        brand: "apple",
        price: 32000,
        image: "📱",
        features: ["شاشة 6.1 بوصة", "كاميرا 48 ميجابكسل", "شريحة A16", "مساحة 128GB"]
    },
    {
        id: 6,
        name: "لابتوب Lenovo Yoga",
        category: "laptop",
        brand: "lenovo",
        price: 19000,
        image: "💻",
        features: ["شاشة 14 بوصة", "معالج i5", "ذاكرة 12GB", "مساحة 512GB SSD"]
    },
    {
        id: 7,
        name: "سماعات لاسلكية",
        category: "accessory",
        brand: "samsung",
        price: 2500,
        image: "🎧",
        features: ["تقنية إلغاء الضوضاء", "بطارية 20 ساعة", "مقاومة للماء"]
    },
    {
        id: 8,
        name: "ساعة آبل الذكية",
        category: "accessory",
        brand: "apple",
        price: 8000,
        image: "⌚",
        features: ["شاشة OLED", "مقاومة للماء", "تتبع اللياقة", "بطارية 18 ساعة"]
    },
    {
        id: 9,
        name: "لابتوب Dell Inspiron 15",
        category: "laptop",
        brand: "dell",
        price: 12000,
        image: "💻",
        features: ["شاشة 15.6 بوصة", "معالج i5", "ذاكرة 8GB", "مساحة 256GB SSD"]
    },
    {
        id: 10,
        name: "هاتف Xiaomi Redmi Note 12",
        category: "phone",
        brand: "xiaomi",
        price: 6000,
        image: "📱",
        features: ["شاشة 6.67 بوصة", "كاميرا 48 ميجابكسل", "ذاكرة 6GB", "مساحة 128GB"]
    },
    {
        id: 11,
        name: "تابلت Samsung Galaxy Tab S8",
        category: "tablet",
        brand: "samsung",
        price: 15000,
        image: "📟",
        features: ["شاشة 11 بوصة", "معالج Snapdragon", "ذاكرة 8GB", "مساحة 128GB"]
    },
    {
        id: 12,
        name: "لابتوب Asus VivoBook",
        category: "laptop",
        brand: "asus",
        price: 9000,
        image: "💻",
        features: ["شاشة 14 بوصة", "معالج Ryzen 5", "ذاكرة 8GB", "مساحة 512GB SSD"]
    },
    {
        id: 13,
        name: "هاتف Huawei P50 Pro",
        category: "phone",
        brand: "huawei",
        price: 14000,
        image: "📱",
        features: ["شاشة 6.6 بوصة", "كاميرا 50 ميجابكسل", "ذاكرة 8GB", "مساحة 256GB"]
    },
    {
        id: 14,
        name: "سماعات Sony WH-1000XM4",
        category: "accessory",
        brand: "sony",
        price: 5000,
        image: "🎧",
        features: ["إلغاء ضوضاء متقدم", "بطارية 30 ساعة", "ميكروفون مدمج"]
    },
    {
        id: 15,
        name: "ساعة Samsung Galaxy Watch",
        category: "accessory",
        brand: "samsung",
        price: 4000,
        image: "⌚",
        features: ["شاشة AMOLED", "مقاومة للماء", "تتبع النوم", "بطارية 40 ساعة"]
    },
    {
        id: 16,
        name: "لابتوب Acer Aspire 5",
        category: "laptop",
        brand: "acer",
        price: 11000,
        image: "💻",
        features: ["شاشة 15.6 بوصة", "معالج i5", "ذاكرة 8GB", "مساحة 512GB SSD"]
    },
    {
        id: 17,
        name: "هاتف Oppo Reno 8",
        category: "phone",
        brand: "oppo",
        price: 9000,
        image: "📱",
        features: ["شاشة 6.4 بوصة", "كاميرا 64 ميجابكسل", "ذاكرة 8GB", "مساحة 256GB"]
    },
    {
        id: 18,
        name: "تابلت Lenovo Tab P11",
        category: "tablet",
        brand: "lenovo",
        price: 7000,
        image: "📟",
        features: ["شاشة 11 بوصة", "معالج Snapdragon", "ذاكرة 6GB", "مساحة 128GB"]
    },
    {
        id: 19,
        name: "شاحن لاسلكي سريع",
        category: "accessory",
        brand: "samsung",
        price: 800,
        image: "🔌",
        features: ["شحن سريع 15W", "شحن لاسلكي", "مؤشر LED"]
    },
    {
        id: 20,
        name: "حافظة لابتوب جلدية",
        category: "accessory",
        brand: "dell",
        price: 500,
        image: "💼",
        features: ["مقاومة للماء", "جيب للأكسسوارات", "مقاس 15.6 بوصة"]
    }
];

// المتغيرات
let cart = [];
let discountApplied = false;
let currentUser = null;

// عرض المنتجات
function displayProducts(productsToShow = products) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <span style="font-size: 60px;">${product.image}</span>
            </div>
            <div class="product-info">
                <div class="product-category">${getCategoryName(product.category)} • ${getBrandName(product.brand)}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">${product.price.toLocaleString()} جنيه</div>
                <ul class="product-features">
                    ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <button class="btn" onclick="addToCart(${product.id})">أضف إلى السلة</button>
            </div>
        `;
        container.appendChild(productCard);
    });
}




// فلترة المنتجات
function filterProducts() {
    const category = document.getElementById('category').value;
    const priceRange = document.getElementById('price-range').value;
    const brand = document.getElementById('brand').value;
    
    let filteredProducts = products;
    
    // فلترة حسب الفئة
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }
    
    // فلترة حسب الماركة
    if (brand !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.brand === brand);
    }
    
    // فلترة حسب السعر
    if (priceRange !== 'all') {
        if (priceRange === '0-2000') {
            filteredProducts = filteredProducts.filter(product => product.price <= 2000);
        } else if (priceRange === '2000-5000') {
            filteredProducts = filteredProducts.filter(product => product.price > 2000 && product.price <= 5000);
        } else if (priceRange === '5000-15000') {
            filteredProducts = filteredProducts.filter(product => product.price > 5000 && product.price <= 15000);
        } else if (priceRange === '15000-30000') {
            filteredProducts = filteredProducts.filter(product => product.price > 15000 && product.price <= 30000);
        } else if (priceRange === '30000+') {
            filteredProducts = filteredProducts.filter(product => product.price > 30000);
        }
    }
    
    displayProducts(filteredProducts);
}

// ترتيب المنتجات
function sortProducts() {
    const sortBy = document.getElementById('sort').value;
    let sortedProducts = [...products];
    
    if (sortBy === 'price-low') {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
        sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    displayProducts(sortedProducts);
}

// إضافة منتج إلى السلة
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
    showNotification(`تم إضافة ${product.name} إلى السلة`);
}

// تحديث السلة
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        total += item.price;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span>${item.name}</span>
            <span>${item.price.toLocaleString()} جنيه</span>
        `;
        cartItems.appendChild(cartItem);
    });
    
    if (discountApplied) {
        const discount = total * 0.2;
        total -= discount;
        cartTotal.innerHTML = `
            <div>المجموع قبل الخصم: ${(total + discount).toLocaleString()} جنيه</div>
            <div>الخصم (20%): -${discount.toLocaleString()} جنيه</div>
            <div>المجموع بعد الخصم: ${total.toLocaleString()} جنيه</div>
        `;
    } else {
        cartTotal.textContent = `المجموع: ${total.toLocaleString()} جنيه`;
    }
}

// تطبيق الخصم
function applyDiscount() {
    if (cart.length === 0) {
        showNotification('السلة فارغة، أضف منتجات أولاً');
        return;
    }
    
    discountApplied = true;      // تغيير الحالة to  true
    updateCart();                     // تحديث السلة مع الخصم
    showNotification('تم تطبيق خصم 20% على طلبك');
}

// إتمام الطلب
function checkout() {
    if (cart.length === 0) {
        showNotification('السلة فارغة، أضف منتجات أولاً');
        return;
    }
    
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    if (discountApplied) {
        total = total * 0.8;
    }
    
    document.getElementById('confirmTotal').textContent = `المجموع: ${total.toLocaleString()} جنيه`;
    openConfirmModal();
}

// تأكيد الطلب
function confirmOrder() {
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    if (discountApplied) {
        total = total * 0.8;    // خصم 20%
    }
    
    showNotification(`تم إتمام الطلب بنجاح! المجموع: ${total.toLocaleString()} جنيه. سيتم التواصل معك لتأكيد التفاصيل.`);
    
    // إعادة تعيين السلة
    cart = [];
    discountApplied = false;
    updateCart();
    closeConfirmModal();
}

// فتح نافذة تأكيد الطلب
function openConfirmModal() {
    document.getElementById('confirmModal').classList.add('active');
}

// إغلاق نافذة تأكيد الطلب
function closeConfirmModal() {
    document.getElementById('confirmModal').classList.remove('active');
}

// عرض الإشعارات
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.remove('hidden');    // إظهار الإشعار
    
    setTimeout(() => {
        notification.classList.add('hidden');   
    }, 3000);     // إخفاء بعد 3 ثواني
}    //الشرح: setTimeout() تنفذ كود بعد وقت محدد (3000 مللي ثانية = 3 ثواني)



// الحصول على اسم الفئة
function getCategoryName(category) {
    const categories = {
        'laptop': 'لابتوب',
        'phone': 'هاتف',
        'tablet': 'جهاز لوحي',
        'accessory': 'إكسسوار'
    };
    return categories[category] || category;
}

// الحصول على اسم الماركة
function getBrandName(brand) {
    const brands = {
        'apple': 'Apple',
        'samsung': 'Samsung',
        'dell': 'Dell',
        'hp': 'HP',
        'lenovo': 'Lenovo',
        'xiaomi': 'Xiaomi',
        'huawei': 'Huawei',
        'sony': 'Sony',
        'asus': 'Asus',
        'acer': 'Acer',
        'oppo': 'Oppo'
    };
    return brands[brand] || brand;              // إرجاع الاسم أو القيمة الأصلية
}



// دالة حذف منتج من السلة
function removeFromCart(productId) {
    // البحث عن أول ظهور للمنتج في السلة
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        const productName = cart[index].name;
        cart.splice(index, 1);
        updateCart();
        showNotification(`تم حذف ${productName} من السلة`);
    }
}

// تحديث دالة updateCart لدعم حذف المنتجات
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        total += item.price;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <span>${item.name}</span>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span>${item.price.toLocaleString()} جنيه</span>
                    <button onclick="removeFromCart(${item.id})" style="background: none; border: none; color: #ef4444; cursor: pointer; font-size: 18px; padding: 0 5px;" title="حذف المنتج">
                        ×
                    </button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    if (discountApplied) {
        const discount = total * 0.2;
        total -= discount;
        cartTotal.innerHTML = `
            <div>المجموع قبل الخصم: ${(total + discount).toLocaleString()} جنيه</div>
            <div>الخصم (20%): -${discount.toLocaleString()} جنيه</div>
            <div style="font-size: 1.4rem; margin-top: 10px; color: var(--primary);">المجموع النهائي: ${total.toLocaleString()} جنيه</div>
        `;
    } else {
        cartTotal.innerHTML = `
            <div style="font-size: 1.4rem; color: var(--primary);">المجموع: ${total.toLocaleString()} جنيه</div>
        `;
    }
    
    // تحديث زر تطبيق الخصم بناءً على وجود منتجات
    const discountBtn = document.querySelector('.btn[onclick="applyDiscount()"]');
    if (discountBtn) {
        discountBtn.disabled = cart.length === 0;
        discountBtn.style.opacity = cart.length === 0 ? '0.5' : '1';
        discountBtn.style.cursor = cart.length === 0 ? 'not-allowed' : 'pointer';
    }
}~


// التهيئة الأولية
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();   // عرض المنتجات عند تحميل الصفحة

    
    
    let hour = new Date().getHours();       // الحصول على الساعة الحالية
    let message = "";
    let title = "TECHZONE - مرحباً بك";
    
    if (hour >= 5 && hour < 12) {
        message = "✨ صباح الخير!\nتفضل باختيار أفضل المنتجات التقنية";
    } else if (hour >= 12 && hour < 18) {
        message = "✨ مساء الخير!\nتصفح عروضنا المميزة"; 
    } else {
        message = "🌙 ليلة سعيدة!\nيمكنك التسوق في أي وقت";
    }
    
    alert(title + "\n\n" + message);     // عرض رسالة ترحيب
});

/*DOMContentLoaded حدث يحدث عندما ينتهي تحميل HTML

new Date().getHours() يعيد الساعة الحالية (0-23)

\n سطر جديد في النص

alert() نافذة منبثقة للمستخدم  
*/