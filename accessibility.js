// accessibility.js - دعم ذوي الهمم الحركية (نسخة محسنة)

class AccessibilityManager {
    constructor() {
        this.isAccessibilityMode = false;
        this.recognition = null;
        this.isListening = false;
        this.timerInterval = null;
        this.countdown = 5;
        this.selectedProductIndex = -1;
        this.visibleProducts = [];
        
        this.commands = {
            // ========== التنقل الأساسي ==========
            'اعلى': () => this.scrollPage('up'),
            'اسفل': () => this.scrollPage('down'),
            'فوق': () => this.scrollPage('up'),
            'تحت': () => this.scrollPage('down'),
            'لأعلى': () => this.scrollPage('up'),
            'للأسفل': () => this.scrollPage('down'),
            'فوق شوية': () => this.scrollPage('up'),
            'تحت شوية': () => this.scrollPage('down'),
            
            // ========== التنقل بين الأقسام ==========
            'الرئيسية': () => this.goToHome(),
            'الرئيسيه': () => this.goToHome(),
            'البداية': () => this.goToHome(),
            'الرئيسي': () => this.goToHome(),
            
            'تسوق': () => this.goToProducts(),
            'المتجر': () => this.goToProducts(),
            'منتجات': () => this.goToProducts(),
            'المتاجر': () => this.goToProducts(),
            
            'سلة': () => this.goToCart(),
            'العربة': () => this.goToCart(),
            'المشتريات': () => this.goToCart(),
            'الحقيبة': () => this.goToCart(),
            
            'طلباتي': () => this.goToOrders(),
            'الطلبات': () => this.goToOrders(),
            'اوردرات': () => this.goToOrders(),
            
            'حسابي': () => this.goToAccount(),
            'الحساب': () => this.goToAccount(),
            'البروفايل': () => this.goToAccount(),
            'المعلومات': () => this.goToAccount(),
            

            'من نحن': () => this.goToAbout(),
            'عننا': () => this.goToAbout(),
            'عن الشركة': () => this.goToAbout(),
            'معلومات عنا': () => this.goToAbout(),
            'عن': () => this.goToAbout(),
            'شركة': () => this.goToAbout(),



            // ========== التنقل الأساسي  ==========
'نهاية': () => this.scrollToBottom(),
'اخر الصفحة': () => this.scrollToBottom(),
'قاع الصفحة': () => this.scrollToBottom(),
'نهاية الصفحة': () => this.scrollToBottom(),
'اخر صفحة': () => this.scrollToBottom(),
'اخر الشاشة': () => this.scrollToBottom(),

// ========== قسم العروض الخاصة ==========
'عروض': () => this.goToOffers(),
'العروض': () => this.goToOffers(),
'عروض خاصة': () => this.goToOffers(),
'العروض الخاصة': () => this.goToOffers(),
'تخفيضات': () => this.goToOffers(),
'العروض والتخفيضات': () => this.goToOffers(),
'خصومات': () => this.goToOffers(),
'الخصومات': () => this.goToOffers(),
'العروض الجديدة': () => this.goToOffers(),
'العروض الحالية': () => this.goToOffers(),
'التخفيضات': () => this.goToOffers(),


                        'ملخص': () => this.goToCartSummary(),
            'ملخص الطلب': () => this.goToCartSummary(),
            'مشتراياتي': () => this.goToCartSummary(),
            'طلبيتي': () => this.goToCartSummary(),
            'طلباتي': () => this.goToCartSummary(),
            


            // ========== حذف المنتجات ==========
'احذف': () => this.removeFromCart(),
'شيل': () => this.removeFromCart(),
'امسح': () => this.removeFromCart(),
'حذف': () => this.removeFromCart(),
'حذف المنتج': () => this.removeFromCart(),
'احذف المنتج': () => this.removeFromCart(),
'شيل المنتج': () => this.removeFromCart(),
'امسح المنتج': () => this.removeFromCart(),
'اروح': () => this.removeFromCart(),
'ازيل': () => this.removeFromCart(),
            // ========== تأكيد/رفض النوافذ المنبثقة ==========
            'موافق': () => this.confirmPopup(),

// ========== تأكيد/رفض النوافذ المنبثقة ==========
    'موافق': () => {
        console.log('كلمة موافق من النظام الصوتي...');
        
        // البحث عن نافذة تأكيد الطلب
        const confirmModal = document.getElementById('confirmModal');
        
        if (confirmModal && confirmModal.classList.contains('active')) {
            console.log('نافذة تأكيد الطلب مفتوحة - سيتم تأكيد الطلب');
            
            // خيار 1: البحث عن زر التأكيد والنقر عليه
            const confirmBtn = document.getElementById('confirmOrderBtn');
            if (confirmBtn) {
                console.log('تم العثور على زر التأكيد، سيتم النقر عليه');
                confirmBtn.click();
                this.showNotification('✅ تم تأكيد الطلب بنجاح!');
                return;
            }
            
            // خيار 2: استدعاء الدالة مباشرة
            console.log('محاولة استدعاء الدالة مباشرة');
            if (typeof window.handleAccessibilityConfirmOrder === 'function') {
                window.handleAccessibilityConfirmOrder();
                this.showNotification('✅ تم تأكيد الطلب بنجاح!');
            } else if (typeof window.confirmOrder === 'function') {
                window.confirmOrder();
                this.showNotification('✅ تم تأكيد الطلب بنجاح!');
            } else {
                this.showNotification('⚠️ تعذر تأكيد الطلب، حاول مجدداً');
            }
        } else {
            // إذا لم تكن نافذة تأكيد الطلب، استخدم التأكيد العادي
            console.log('نافذة تأكيد عادية - سيتم تأكيدها');
            this.confirmPopup();
        }
    },


            'نعم': () => this.confirmPopup(),
            'حسنا': () => this.confirmPopup(),
            'تمام': () => this.confirmPopup(),
            'اوك': () => this.confirmPopup(),
            'تم': () => this.confirmPopup(),
            'agree': () => this.confirmPopup(),
            'yes': () => this.confirmPopup(),
            
            'لا': () => this.rejectPopup(),
            'رفض': () => this.rejectPopup(),
            'مش عايز': () => this.rejectPopup(),
            'مش موافق': () => this.rejectPopup(),
            'cancel': () => this.rejectPopup(),
            'no': () => this.rejectPopup(),
            
            // ========== تواصل ==========
            'تواصل': () => this.contactWhatsApp(),
            'واتساب': () => this.contactWhatsApp(),
            'تكلم مع المسؤول': () => this.contactWhatsApp(),
            'كلم المسؤول': () => this.contactWhatsApp(),
            'ارسال رسالة': () => this.contactWhatsApp(),
            'ارسل رسالة': () => this.contactWhatsApp(),
            'الدعم': () => this.contactWhatsApp(),
            'خدمة العملاء': () => this.contactWhatsApp(),
            
            // ========== تحديد منتجات بالأرقام ==========
            'الاول': () => this.selectProductByIndex(1),
            'التاني': () => this.selectProductByIndex(2),
            'الثاني': () => this.selectProductByIndex(2),
            'التالت': () => this.selectProductByIndex(3),
            'الثالث': () => this.selectProductByIndex(3),
            'الرابع': () => this.selectProductByIndex(4),
            'الخامس': () => this.selectProductByIndex(5),
            'السادس': () => this.selectProductByIndex(6),
            'السابع': () => this.selectProductByIndex(7),
            'الثامن': () => this.selectProductByIndex(8),
            'التاسع': () => this.selectProductByIndex(9),
            'العاشر': () => this.selectProductByIndex(10),
            
            // تحديد بالأرقام (1، 2، 3...)
            'واحد': () => this.selectProductByIndex(1),
            'اتنين': () => this.selectProductByIndex(2),
            'تلاتة': () => this.selectProductByIndex(3),
            'ثلاثة': () => this.selectProductByIndex(3),
            'اربعة': () => this.selectProductByIndex(4),
            'خمسة': () => this.selectProductByIndex(5),
            'سته': () => this.selectProductByIndex(6),
            'ستة': () => this.selectProductByIndex(6),
            'سبعة': () => this.selectProductByIndex(7),
            'ثمانية': () => this.selectProductByIndex(8),
            'تسعة': () => this.selectProductByIndex(9),
            'عشرة': () => this.selectProductByIndex(10),
            
            // ========== الفئات (Category) ==========
            'لابتوب': () => this.filterProducts('category', 'laptop'),
            'لاب توب': () => this.filterProducts('category', 'laptop'),
            'كمبيوتر محمول': () => this.filterProducts('category', 'laptop'),
            'لاب': () => this.filterProducts('category', 'laptop'),
            'كمبيوتر': () => this.filterProducts('category', 'laptop'),
            
            'هاتف': () => this.filterProducts('category', 'phone'),
            'موبايل': () => this.filterProducts('category', 'phone'),
            'جوال': () => this.filterProducts('category', 'phone'),
            'تليفون': () => this.filterProducts('category', 'phone'),
            'موبيل': () => this.filterProducts('category', 'phone'),
            
            'تابلت': () => this.filterProducts('category', 'tablet'),
            'ايباد': () => this.filterProducts('category', 'tablet'),
            'تاب': () => this.filterProducts('category', 'tablet'),
            'جهاز لوحي': () => this.filterProducts('category', 'tablet'),
            
            'اكسسوار': () => this.filterProducts('category', 'accessory'),
            'إكسسوارات': () => this.filterProducts('category', 'accessory'),
            'سماعات': () => this.filterProducts('category', 'accessory'),
            'ساعة': () => this.filterProducts('category', 'accessory'),
            'شاحن': () => this.filterProducts('category', 'accessory'),
            'حافظة': () => this.filterProducts('category', 'accessory'),
            
            // ========== الماركات (Brand) ==========
            'ابل': () => this.filterProducts('brand', 'apple'),
            'ابل ايفون': () => this.filterProducts('brand', 'apple'),
            'ابو': () => this.filterProducts('brand', 'apple'),
            'ايفون': () => this.filterProducts('brand', 'apple'),
            'آبل': () => this.filterProducts('brand', 'apple'),
            
            'سامسونج': () => this.filterProducts('brand', 'samsung'),
            'سام': () => this.filterProducts('brand', 'samsung'),
            'جالكسي': () => this.filterProducts('brand', 'samsung'),
            
            'ديل': () => this.filterProducts('brand', 'dell'),
            'دي ال': () => this.filterProducts('brand', 'dell'),
            
            'اتش بي': () => this.filterProducts('brand', 'hp'),
            'اتش': () => this.filterProducts('brand', 'hp'),
            'ايتش بي': () => this.filterProducts('brand', 'hp'),
            
            'لينوفو': () => this.filterProducts('brand', 'lenovo'),
            'لين': () => this.filterProducts('brand', 'lenovo'),
            
            'شاومي': () => this.filterProducts('brand', 'xiaomi'),
            'شاومى': () => this.filterProducts('brand', 'xiaomi'),
            'ريدمي': () => this.filterProducts('brand', 'xiaomi'),
            
            'هواوي': () => this.filterProducts('brand', 'huawei'),
            'هواوى': () => this.filterProducts('brand', 'huawei'),
            
            'سوني': () => this.filterProducts('brand', 'sony'),
            'سونى': () => this.filterProducts('brand', 'sony'),
            'بلايستيشن': () => this.filterProducts('brand', 'sony'),
            
            // ========== الأسعار (Price Range) ==========
            'رخيص': () => this.filterProducts('price-range', '0-2000'),
            'رخيصة': () => this.filterProducts('price-range', '0-2000'),
            'ارخص': () => this.filterProducts('price-range', '0-2000'),
            'اكتير': () => this.filterProducts('price-range', '0-2000'),
            
            'متوسط': () => this.filterProducts('price-range', '2000-5000'),
            'وسط': () => this.filterProducts('price-range', '2000-5000'),
            'معقول': () => this.filterProducts('price-range', '2000-5000'),
            
            'غالي': () => this.filterProducts('price-range', '15000-30000'),
            'غالية': () => this.filterProducts('price-range', '15000-30000'),
            
            'اغلى': () => this.filterProducts('price-range', '30000+'),
            'افخم': () => this.filterProducts('price-range', '30000+'),
            'احسن': () => this.filterProducts('price-range', '30000+'),
            'ممتاز': () => this.filterProducts('price-range', '30000+'),
            
            // ========== منتجات محددة ==========
            'سامسونج اس 23': () => this.selectProductByName('Samsung Galaxy S23'),
            'سامسونج جالاكسي اس 23': () => this.selectProductByName('Samsung Galaxy S23'),
            'جالاكسي اس 23': () => this.selectProductByName('Samsung Galaxy S23'),
            'اس 23': () => this.selectProductByName('Samsung Galaxy S23'),
            'اس23': () => this.selectProductByName('Samsung Galaxy S23'),
            
            'ابل ايفون 14 برو': () => this.selectProductByName('آيفون 14 برو'),
            'ايفون 14 برو': () => this.selectProductByName('آيفون 14 برو'),
            'ايفون 14': () => this.selectProductByName('آيفون 14 برو'),
            'ايفون برو': () => this.selectProductByName('آيفون 14 برو'),
            
            'ديل اكس بي اس': () => this.selectProductByName('Dell XPS 13'),
            'ديل اكس بي اس 13': () => this.selectProductByName('لابتوب Dell XPS 13'),
            'اكس بي اس': () => this.selectProductByName('لابتوب Dell XPS 13'),
            'ديل اكس': () => this.selectProductByName('لابتوب Dell XPS 13'),
            
            // ========== الشراء والإضافة ==========
            'اشترى': () => this.buyCurrentProduct(),
            'اشتري': () => this.buyCurrentProduct(),
            'شراء': () => this.buyCurrentProduct(),
            'شراء الان': () => this.buyCurrentProduct(),
            'خذ': () => this.buyCurrentProduct(),
            'خده': () => this.buyCurrentProduct(),
            'اخده': () => this.buyCurrentProduct(),
            'عايزه': () => this.buyCurrentProduct(),
            'نفسي فيه': () => this.buyCurrentProduct(),
            'اضف للسلة': () => this.buyCurrentProduct(),
            'اضف للعربة': () => this.buyCurrentProduct(),
            'حط في العربة': () => this.buyCurrentProduct(),
            'حطه': () => this.buyCurrentProduct(),
            'ابغاه': () => this.buyCurrentProduct(),
            'بدي اياه': () => this.buyCurrentProduct(),
            'اريده': () => this.buyCurrentProduct(),
            'اشتريه': () => this.buyCurrentProduct(),
            
            // ========== الخصم ==========
            'خصم': () => this.applyDiscount(),
            'اطبق الخصم': () => this.applyDiscount(),
            'نفذ الخصم': () => this.applyDiscount(),
            'استخدم الخصم': () => this.applyDiscount(),
            'كود الخصم': () => this.applyDiscount(),
            'تخفيض': () => this.applyDiscount(),
            'تخفيضات': () => this.applyDiscount(),
            'طبق الخصم': () => this.applyDiscount(),
            'تخفيض السعر': () => this.applyDiscount(),
            
            // ========== إتمام الطلب ==========
            'اتمام الطلب': () => this.completeOrder(),
            'تم': () => this.completeOrder(),
            'اتمم': () => this.completeOrder(),
            'اتمام': () => this.completeOrder(),
            'اخلص': () => this.completeOrder(),
            'انهي': () => this.completeOrder(),
            'انهاء': () => this.completeOrder(),
            'خالص': () => this.completeOrder(),
            'كمل': () => this.completeOrder(),
            'خلص الشراء': () => this.completeOrder(),
            'خلص الطلب': () => this.completeOrder(),
            'اتمم الشراء': () => this.completeOrder(),
            'اتمم الطلب': () => this.completeOrder(),
            'اطلب': () => this.completeOrder(),
            'انهاء الشراء': () => this.completeOrder(),
            'اكمل الطلب': () => this.completeOrder(),
            'اشتري الان': () => this.completeOrder(),
            'ادفع': () => this.completeOrder(),
            'الدفع': () => this.completeOrder(),
            
            // ========== التحكم الصوتي ==========
            'توقف': () => this.stopListening(),
            'قف': () => this.stopListening(),
            'كفاية': () => this.stopListening(),
            'خلص كده': () => this.stopListening(),
            'بس': () => this.stopListening(),
            'ايقاف': () => this.stopListening(),
            'اوقف': () => this.stopListening(),
            
            'ابدا': () => this.startListening(),
            'ابدأ': () => this.startListening(),
            'شغل': () => this.startListening(),
            'استمع': () => this.startListening(),
            'اقولك': () => this.startListening(),
            'اسمعني': () => this.startListening(),
            'احكي': () => this.startListening(),
            
            'مساعدة': () => this.showHelp(),
            'ساعدني': () => this.showHelp(),
            'الاوامر': () => this.showHelp(),
            'تعليمات': () => this.showHelp(),
            'قوللي': () => this.showHelp(),
            'اعرض الاوامر': () => this.showHelp(),
            'وش اقدر اقول': () => this.showHelp(),
            
            // ========== إعادة تعيين ==========
            'الكل': () => this.resetFilters(),
            'كل حاجة': () => this.resetFilters(),
            'كلهم': () => this.resetFilters(),
            'كل المنتجات': () => this.resetFilters(),
            'رجع': () => this.resetFilters(),
            'عادي': () => this.resetFilters(),
            'افتراضي': () => this.resetFilters(),
            'بدون فلترة': () => this.resetFilters(),
            'مسح الفلترة': () => this.resetFilters(),
            'اعادة': () => this.resetFilters(),
            'مسح': () => this.resetFilters(),
            'الغاء': () => this.resetFilters(),
            
            // ========== ترتيب المنتجات ==========
            'من الاقل سعر': () => this.sortProducts('price-low'),
            'ارخص سعر': () => this.sortProducts('price-low'),
            'الارخص': () => this.sortProducts('price-low'),
            'السعر الارخص': () => this.sortProducts('price-low'),
            
            'من الاعلى سعر': () => this.sortProducts('price-high'),
            'اعلى سعر': () => this.sortProducts('price-high'),
            'الاغلى': () => this.sortProducts('price-high'),
            'السعر الاعلى': () => this.sortProducts('price-high'),
            
            'ابجدي': () => this.sortProducts('name'),
            'حروف': () => this.sortProducts('name'),
            'من الالف للياء': () => this.sortProducts('name'),
            'الاسماء': () => this.sortProducts('name'),
            
            'الاحدث': () => this.sortProducts('newest'),
            'الجديد': () => this.sortProducts('newest'),
            'اخر منتج': () => this.sortProducts('newest'),
            
            'الاقدم': () => this.sortProducts('oldest'),
            'القديم': () => this.sortProducts('oldest'),
            
            // ========== إضافات تفاعلية ==========
            'حابب': () => this.toggleFavorite(),
            'مفضل': () => this.toggleFavorite(),
            'الاعجابات': () => this.showFavorites(),
            'المفضلة': () => this.showFavorites()
        };
        
        this.init();
    }
    
    init() {
        console.log('بدء تهيئة نظام الوصولية...');
        // إضافة HTML للواجهة
        this.addAccessibilityHTML();
        
        // بدء العد التنازلي بعد تأخير بسيط
        setTimeout(() => {
            this.startCountdown();
        }, 100);
        
        // إعداد التعرف على الصوت
        this.setupSpeechRecognition();
        
        // تحديث قائمة المنتجات المرئية
        this.updateVisibleProducts();
        
        // مراقبة التمرير لتحديث المنتجات المرئية
        window.addEventListener('scroll', () => {
            this.updateVisibleProducts();
        });
    }
    
    addAccessibilityHTML() {
        console.log('إضافة عناصر HTML...');
        
        // إضافة CSS العام للنظام
        const style = document.createElement('style');
        style.textContent = `
            /* أنماط أساسية */
            .accessibility-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                transition: opacity 0.5s;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            
            .accessibility-content {
                background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
                padding: 40px;
                border-radius: 20px;
                text-align: center;
                max-width: 500px;
                width: 90%;
                box-shadow: 0 20px 60px rgba(0,0,0,0.4);
                border: 1px solid #e2e8f0;
            }
            
            .accessibility-title {
                color: #3b82f6;
                margin-bottom: 20px;
                font-size: 32px;
                font-weight: 700;
                background: linear-gradient(90deg, #3b82f6, #8b5cf6);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            
            .accessibility-question {
                font-size: 20px;
                margin-bottom: 30px;
                color: #4b5563;
                line-height: 1.5;
            }
            
            .accessibility-timer {
                font-size: 72px;
                color: #3b82f6;
                margin: 20px 0;
                font-weight: 800;
                text-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
                animation: countdownPulse 1s ease-in-out;
            }
            
            @keyframes countdownPulse {
                0% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.1); opacity: 0.8; }
                100% { transform: scale(1); opacity: 1; }
            }
            
            .accessibility-buttons {
                display: flex;
                gap: 15px;
                justify-content: center;
                margin-top: 30px;
                flex-wrap: wrap;
            }
            
            .accessibility-btn {
                padding: 16px 32px;
                border: none;
                border-radius: 12px;
                font-size: 18px;
                cursor: pointer;
                transition: all 0.3s;
                font-weight: 600;
                min-width: 200px;
            }
            
            .accessibility-btn:not(.no) {
                background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
                color: white;
                box-shadow: 0 6px 20px rgba(37, 99, 235, 0.3);
            }
            
            .accessibility-btn:not(.no):hover {
                transform: translateY(-3px);
                box-shadow: 0 10px 25px rgba(37, 99, 235, 0.4);
            }
            
            .accessibility-btn.no {
                background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
                color: white;
                box-shadow: 0 6px 20px rgba(107, 114, 128, 0.3);
            }
            
            .accessibility-btn.no:hover {
                transform: translateY(-3px);
                box-shadow: 0 10px 25px rgba(107, 114, 128, 0.4);
            }
            
            /* التعليمات - مخفية افتراضياً */
            .voice-instructions {
                position: fixed;
                bottom: 100px;
                left: 20px;
                background: white;
                padding: 25px;
                border-radius: 16px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.15);
                display: none;
                z-index: 9997;
                max-width: 350px;
                max-height: 70vh;
                overflow-y: auto;
                border: 1px solid #e5e7eb;
                transition: all 0.3s;
            }
            
            .voice-instructions h3 {
                color: #3b82f6;
                margin-bottom: 20px;
                border-bottom: 2px solid #e5e7eb;
                padding-bottom: 15px;
                font-size: 20px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .voice-command {
                margin-bottom: 15px;
                padding-bottom: 15px;
                border-bottom: 1px solid #f3f4f6;
            }
            
            .command-keyword {
                display: block;
                color: #1f2937;
                font-weight: 600;
                margin-bottom: 5px;
                background: #f8fafc;
                padding: 8px 12px;
                border-radius: 8px;
                border-right: 3px solid #3b82f6;
            }
            
            .command-action {
                display: block;
                color: #6b7280;
                font-size: 14px;
                padding-left: 12px;
            }
            
            /* شريط حالة المايكروفون - في الأعلى على اليمين (بجانب اتصل بنا) */
            .voice-status {
                position: fixed;
                bottom: 20px;
                left: 20px;
                background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
                color: white;
                padding: 12px 20px;
                border-radius: 12px;
                display: none;
                align-items: center;
                gap: 10px;
                z-index: 9997;
                box-shadow: 0 8px 30px rgba(37, 99, 235, 0.4);
                min-width: 180px;
                max-width: 220px;
                justify-content: flex-start;
                transition: all 0.3s;
                font-family: Arial, sans-serif;
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .voice-pulse {
                width: 18px;
                height: 18px;
                background: #ef4444;
                border-radius: 50%;
                position: relative;
                flex-shrink: 0;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.2); opacity: 0.7; }
                100% { transform: scale(1); opacity: 1; }
            }
            
            .mic-on .voice-pulse {
                background: #10b981;
                animation: pulse 1.5s infinite;
            }
            
            .mic-off .voice-pulse {
                background: #6b7280;
                animation: none;
            }
            
            .voice-status span {
                font-weight: 700;
                font-size: 14px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                flex: 1;
            }
            
            /* الإشعارات - في الأعلى في المنتصف */
            .voice-notification {
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
                padding: 15px 30px;
                border-radius: 12px;
                display: none;
                z-index: 9998;
                box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4);
                max-width: 500px;
                width: 90%;
                text-align: center;
                font-weight: 600;
                animation: fadeIn 0.3s ease-out;
                font-family: Arial, sans-serif;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                to { opacity: 1; transform: translateX(-50%) translateY(0); }
            }
            
            /* تلميحات إضافية */
            .voice-tip {
                margin-top: 20px;
                padding: 15px;
                background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
                border-radius: 12px;
                border-right: 4px solid #3b82f6;
                font-size: 14px;
                color: #1e40af;
            }
            
            /* تأثير للمنتج المحدد */
            .product-selected {
                animation: productSelected 2s infinite;
            }
            
            @keyframes productSelected {
                0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
                70% { box-shadow: 0 0 0 12px rgba(59, 130, 246, 0); }
                100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
            }
            
            /* تأثير للنوافذ المنبثقة */
            .popup-highlight {
                animation: popupHighlight 0.8s ease-in-out 3;
            }
            
            @keyframes popupHighlight {
                0% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.7); }
                70% { box-shadow: 0 0 0 15px rgba(245, 158, 11, 0); }
                100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
            }
            
            /* تصميم متجاوب */
            @media (max-width: 768px) {
                .voice-status {
                    bottom: 15px;
                    left: 15px;
                    padding: 10px 15px;
                    min-width: 160px;
                    font-size: 13px;
                }
                
                .voice-pulse {
                    width: 16px;
                    height: 16px;
                }
                
                .voice-status span {
                    font-size: 13px;
                }
                
                .voice-notification {
                    top: 15px;
                    padding: 12px 20px;
                    font-size: 14px;
                }
                
                .voice-instructions {
                    bottom: 80px;
                    left: 15px;
                    right: 15px;
                    max-width: calc(100% - 30px);
                }
            }
            
            @media (max-width: 480px) {
                .voice-status {
                    min-width: 140px;
                    padding: 8px 12px;
                }
                
                .voice-status span {
                    font-size: 12px;
                }
            }
        `;
        document.head.appendChild(style);
        
        // إضافة overlay
        const overlay = document.createElement('div');
        overlay.className = 'accessibility-overlay';
        overlay.id = 'accessibilityOverlay';
        overlay.innerHTML = `
            <div class="accessibility-content">
                <h1 class="accessibility-title">مرحباً بك في TECH ZONE</h1>
                <p class="accessibility-question">هل أنت من ذوي الهمم الحركية وتحتاج إلى التحكم الصوتي؟</p>
                <div class="accessibility-timer" id="countdownTimer">5</div>
                <p style="color: #6b7280; font-size: 16px; margin-top: 10px;">سيبدأ الموقع تلقائياً بعد <span id="countdown" style="font-weight: bold; color: #3b82f6;">5</span> ثواني</p>
                <div class="accessibility-buttons">
                    <button class="accessibility-btn" id="accessibilityYesBtn">نعم، أنا من ذوي الهمم</button>
                    <button class="accessibility-btn no" id="accessibilityNoBtn">لا، أنا شخص عادي</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // إضافة نافذة التعليمات - مخفية افتراضياً
        const instructions = document.createElement('div');
        instructions.className = 'voice-instructions';
        instructions.id = 'voiceInstructions';
        instructions.innerHTML = `
            <h3>🎤 الأوامر الصوتية المتاحة:</h3>
            <div class="voice-command">
                <span class="command-keyword">"الرئيسية / تسوق / سلة"</span>
                <span class="command-action">← التنقل بين الأقسام</span>
            </div>
            <div class="voice-command">
                <span class="command-keyword">"اعلى / اسفل"</span>
                <span class="command-action">← التمرير في الصفحة</span>
            </div>
            <div class="voice-command">
                <span class="command-keyword">"موافق / لا"</span>
                <span class="command-action">← تأكيد/رفض النوافذ</span>
            </div>
            <div class="voice-command">
                <span class="command-keyword">"تواصل / واتساب"</span>
                <span class="command-action">← التواصل مع المسؤول</span>
            </div>
            <div class="voice-command">
                <span class="command-keyword">"الاول / التاني / ..."</span>
                <span class="command-action">← تحديد منتج</span>
            </div>
            <div class="voice-command">
                <span class="command-keyword">"شراء"</span>
                <span class="command-action">← إضافة المنتج للسلة</span>
            </div>
            <div class="voice-command">
                <span class="command-keyword">"لابتوب / هاتف"</span>
                <span class="command-action">← فلترة المنتجات</span>
            </div>
            <div class="voice-command">
                <span class="command-keyword">"سامسونج / ابل"</span>
                <span class="command-action">← فلترة الماركات</span>
            </div>
            <div class="voice-command">
                <span class="command-keyword">"خصم"</span>
                <span class="command-action">← تطبيق الخصم</span>
            </div>
            <div class="voice-command">
                <span class="command-keyword">"تم / اتمم"</span>
                <span class="command-action">← إتمام الطلب</span>
            </div>
            <div class="voice-command">
                <span class="command-keyword">"مساعدة"</span>
                <span class="command-action">← عرض/إخفاء التعليمات</span>
            </div>
            <div class="voice-tip">
                💡 <strong>تلميح:</strong> قل "موافق" أو "لا" للرد على أي نافذة منبثقة تظهر
            </div>
        `;
        document.body.appendChild(instructions);
        
        // إضافة شريط حالة المايكروفون - في الأعلى على اليمين (بجانب اتصل بنا)
        const statusBar = document.createElement('div');
        statusBar.className = 'voice-status';
        statusBar.id = 'voiceStatus';
        statusBar.innerHTML = `
            <div class="voice-pulse"></div>
            <span>جاري الاستماع...</span>
        `;
        document.body.appendChild(statusBar);
        
        // إضافة إشعارات الصوت - في الأعلى في المنتصف
        const notification = document.createElement('div');
        notification.className = 'voice-notification';
        notification.id = 'voiceNotification';
        document.body.appendChild(notification);
        
        // إضافة معالجي الأحداث للأزرار
        setTimeout(() => {
            const yesBtn = document.getElementById('accessibilityYesBtn');
            const noBtn = document.getElementById('accessibilityNoBtn');
            
            if (yesBtn) {
                yesBtn.addEventListener('click', () => this.enableAccessibilityMode());
            }
            if (noBtn) {
                noBtn.addEventListener('click', () => this.disableAccessibilityMode());
            }
        }, 100);
    }
    
startCountdown() {
    console.log('بدء العد التنازلي...');
    
    const timerElement = document.getElementById('countdownTimer');
    const countdownElement = document.getElementById('countdown');
    
    if (!timerElement) {
        console.error('لم يتم العثور على عنصر العد التنازلي');
        return;
    }
    
    let count = 5;
    
    timerElement.textContent = count;
    if (countdownElement) {
        countdownElement.textContent = count;
    }
    
    if (this.timerInterval) {
        clearInterval(this.timerInterval);
    }
    
    this.timerInterval = setInterval(() => {
        count--;
        
        timerElement.textContent = count;
        if (countdownElement) {
            countdownElement.textContent = count;
        }
        
        timerElement.classList.add('countdown-animation');
        setTimeout(() => {
            timerElement.classList.remove('countdown-animation');
        }, 1000);
        
        console.log(`العد التنازلي: ${count}`);
        
        if (count <= 0) {
            clearInterval(this.timerInterval);
            console.log('انتهى العد التنازلي، تفعيل وضع الوصولية تلقائياً');
            
            // هنا التغيير: تفعيل نظام دعم ذوي الهمم تلقائيًا
            this.enableAccessibilityMode();
            
            // يمكنك إضافة رسالة توضيحية
            this.showNotification('تم تفعيل التحكم الصوتي تلقائياً لذوي الهمم');
        }
    }, 1000);
}
    
    async enableAccessibilityMode() {
        console.log('تفعيل وضع الوصولية...');
        clearInterval(this.timerInterval);
        this.isAccessibilityMode = true;
        
        const overlay = document.getElementById('accessibilityOverlay');
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 500);
        }
        
        // إظهار شريط الحالة في الأعلى على اليمين
        this.showElement('voiceStatus');
        
        try {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                console.log('تم الحصول على إذن الميكروفون');
                stream.getTracks().forEach(track => track.stop());
            }
        } catch (err) {
            console.error('خطأ في الميكروفون:', err);
            this.showNotification('يرجى السماح باستخدام الميكروفون');
        }
        
        setTimeout(() => {
            this.startListening();
            this.showNotification('تم تفعيل التحكم الصوتي! قل "مساعدة" للتعليمات.');
        }, 1000);
    }
    
    disableAccessibilityMode() {
        console.log('تعطيل وضع الوصولية...');
        clearInterval(this.timerInterval);
        this.isAccessibilityMode = false;
        
        const overlay = document.getElementById('accessibilityOverlay');
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 500);
        }
        
        this.hideElement('voiceInstructions');
        this.hideElement('voiceStatus');
        
        this.stopListening();
    }
    
    // ========== الدوال الجديدة ==========
    
    goToHome() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.showNotification('العودة للصفحة الرئيسية');
    }
    
    goToProducts() {
        const productsSection = document.querySelector('.products-section, #products, .products, .shop-items');
        
        if (productsSection) {
            productsSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
            this.showNotification('مرحباً بك في قسم المنتجات');
            
            setTimeout(() => {
                this.updateVisibleProducts();
            }, 500);
        } else {
            const productElements = document.querySelectorAll('.product-card, .product-item');
            if (productElements.length > 0) {
                productElements[0].scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
                this.showNotification('قسم المنتجات');
            } else {
                this.showNotification('لم أجد قسم المنتجات');
            }
        }
    }
    
    goToCartSummary() {
        const cartSummary = document.querySelector('.cart-summary');
        
        if (cartSummary) {
            cartSummary.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
            this.showNotification('قسم ملخص الطلب');
            
            // تأخير بسيط ثم عرض التذكير بالخصم
            setTimeout(() => {
                const cartItems = document.getElementById('cart-items');
                if (cartItems && cartItems.children.length > 0) {
                    this.showNotification('يمكنك قول "خصم" لتطبيق خصم 20% على طلبك');
                }
            }, 1000);
        } else {
            this.showNotification('لم أجد قسم ملخص الطلب');
        }
    }
    
    goToOrders() {
        this.showNotification('جارٍ التحميل لصفحة الطلبات السابقة');
    }
    
    goToAccount() {
        this.showNotification('جارٍ التحميل لصفحة الحساب');
    }
    

    goToAbout() {
        const aboutSection = document.querySelector('#about, .about-section');
        
        if (aboutSection) {
            aboutSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
            this.showNotification('قسم من نحن');
        } else {
            this.showNotification('لم أجد قسم من نحن');
        }
    }

goToOffers() {
    // البحث عن قسم العروض الخاصة بعدة طرق
    const offersSection = document.querySelector('#offers, .offers-section, .special-offers, .discounts, .promotions');
    
    if (offersSection) {
        offersSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
        this.showNotification('قسم العروض الخاصة');
        
        // إضافة تأثير خاص للعروض
        setTimeout(() => {
            offersSection.classList.add('popup-highlight');
            setTimeout(() => {
                offersSection.classList.remove('popup-highlight');
            }, 2000);
        }, 300);
    } else {
        // إذا لم يتم العثور على قسم محدد، ابحث عن عناصر تحتوي على كلمة "عرض" أو "تخفيض"
        const offerElements = document.querySelectorAll('*');
        let foundOffer = false;
        
        offerElements.forEach(element => {
            const text = element.textContent.toLowerCase();
            if ((text.includes('عرض') || text.includes('تخفيض') || text.includes('خصم')) && 
                element.offsetHeight > 50 && 
                !foundOffer) {
                
                element.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                
                element.style.boxShadow = '0 0 0 3px #f59e0b';
                setTimeout(() => {
                    element.style.boxShadow = '';
                }, 3000);
                
                this.showNotification('قسم العروض والتخفيضات');
                foundOffer = true;
            }
        });
        
        if (!foundOffer) {
            // إذا لم يتم العثور على أي عرض، قم بالتمرير لأسفل ونظهر رسالة
            this.scrollToBottom();
            this.showNotification('جار البحث عن العروض الخاصة...');
        }
    }
}

scrollToBottom() {
    // التمرير إلى نهاية الصفحة
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
    
    this.showNotification('الانتقال إلى نهاية الصفحة');
    
    // إظهار رسالة بعد الوصول للأسفل
    setTimeout(() => {
        const currentPosition = window.pageYOffset + window.innerHeight;
        const pageHeight = document.body.scrollHeight;
        
        if (currentPosition >= pageHeight - 100) {
            this.showNotification('وصلت لنهاية الصفحة');
        }
    }, 1000);
}

    confirmPopup() {
        const confirmButtons = document.querySelectorAll(
            '.confirm-btn, .btn-confirm, .modal-confirm, .btn-ok, .btn-success, [type="submit"]'
        );
        
        let foundButton = null;
        
        confirmButtons.forEach(button => {
            const text = button.textContent.toLowerCase();
            if (text.includes('موافق') || text.includes('حسنا') || text.includes('ok') || 
                text.includes('نعم') || text.includes('تأكيد') || text.includes('تم') ||
                text.includes('agree') || text.includes('yes') || text === 'ok' || text === 'موافق') {
                foundButton = button;
            }
            
        });
        
        if (foundButton) {
            foundButton.click();
            this.showNotification('تم الموافقة');
            
            foundButton.classList.add('popup-highlight');
            setTimeout(() => {
                foundButton.classList.remove('popup-highlight');
            }, 2400);
        } else {
            const modal = document.querySelector('.modal, .popup, .alert, .confirmation-dialog, .dialog');
            if (modal) {
                const modalButton = modal.querySelector('button:not(.btn-close):not(.close)');
                if (modalButton) {
                    modalButton.click();
                    this.showNotification('تم الموافقة');
                } else {
                    this.showNotification('لم أجد زر موافق');
                }
            } else {
                this.showNotification('لا توجد نافذة تحتاج تأكيد');
            }
        }
    }
    
    rejectPopup() {
        const rejectButtons = document.querySelectorAll(
            '.cancel-btn, .btn-cancel, .btn-danger, .btn-no, .close-btn'
        );
        
        let foundButton = null;
        
        rejectButtons.forEach(button => {
            const text = button.textContent.toLowerCase();
            if (text.includes('لا') || text.includes('رفض') || text.includes('cancel') || 
                text.includes('إلغاء') || text.includes('اغلاق') || text.includes('no') ||
                text === 'لا' || text === 'cancel') {
                foundButton = button;
            }
        });
        
        if (foundButton) {
            foundButton.click();
            this.showNotification('تم الرفض');
            
            foundButton.classList.add('popup-highlight');
            setTimeout(() => {
                foundButton.classList.remove('popup-highlight');
            }, 2400);
        } else {
            const closeButtons = document.querySelectorAll('.btn-close, .close, [aria-label="Close"]');
            if (closeButtons.length > 0) {
                closeButtons[0].click();
                this.showNotification('تم إغلاق النافذة');
            } else {
                this.showNotification('لم أجد زر رفض');
            }
        }
    }
    
    contactWhatsApp() {
        const phoneNumber = "201234567890"; // استبدل برقمك الحقيقي
        const message = encodeURIComponent("مرحباً، أود الاستفسار عن المنتجات في موقعكم");
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        
        window.open(whatsappUrl, '_blank');
        this.showNotification('جارٍ فتح واتساب للتواصل مع المسؤول');
    }
    
    updateVisibleProducts() {
        const allProducts = document.querySelectorAll('.product-card, .product-item');
        this.visibleProducts = [];
        
        allProducts.forEach((product, index) => {
            const rect = product.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                this.visibleProducts.push({
                    element: product,
                    index: index,
                    position: this.visibleProducts.length + 1
                });
            }
        });
        
        if (this.selectedProductIndex >= 0) {
            const selectedProduct = this.visibleProducts.find(p => p.index === this.selectedProductIndex);
            if (!selectedProduct) {
                this.selectedProductIndex = -1;
            }
        }
    }
    
    selectProductByIndex(position) {
        if (this.visibleProducts.length === 0) {
            this.showNotification('لا توجد منتجات ظاهرة حالياً');
            return;
        }
        
        const actualIndex = position - 1;
        
        if (actualIndex < 0 || actualIndex >= this.visibleProducts.length) {
            this.showNotification(`يوجد ${this.visibleProducts.length} منتجات ظاهرة فقط`);
            return;
        }
        
        const selectedProduct = this.visibleProducts[actualIndex];
        this.selectedProductIndex = selectedProduct.index;
        
        selectedProduct.element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
        
        selectedProduct.element.classList.add('product-selected');
        selectedProduct.element.style.transform = 'scale(1.02)';
        selectedProduct.element.style.transition = 'all 0.3s ease';
        
        this.visibleProducts.forEach(p => {
            if (p.index !== this.selectedProductIndex) {
                p.element.classList.remove('product-selected');
                p.element.style.transform = '';
            }
        });
        
        const productName = selectedProduct.element.querySelector('.product-name, h3, .title');
        const nameText = productName ? productName.textContent : `المنتج رقم ${position}`;
        
        this.showNotification(`تم تحديد: ${nameText} (رقم ${position})`);
    }
    
    toggleFavorite() {
        const products = document.querySelectorAll('.product-card, .product-item');
        if (products.length > 0 && this.selectedProductIndex < products.length) {
            const product = products[this.selectedProductIndex];
            const favoriteBtn = product.querySelector('.favorite-btn, .wishlist-btn, .like-btn');
            
            if (favoriteBtn) {
                favoriteBtn.click();
                this.showNotification('تم تحديث قائمة المفضلة');
            } else {
                this.showNotification('لا يمكن إضافة هذا المنتج للمفضلة');
            }
        }
    }
    
    showFavorites() {
        const favoritesBtn = document.querySelector('.favorites-link, .wishlist-link');
        if (favoritesBtn) {
            favoritesBtn.click();
            this.showNotification('جار تحميل قائمة المفضلة');
        } else {
            this.showNotification('قائمة المفضلة غير متاحة حالياً');
        }
    }
    
    sortProducts(sortType) {
        const sortSelect = document.getElementById('sort');
        if (sortSelect) {
            let value = '';
            switch(sortType) {
                case 'price-low': value = 'price_asc'; break;
                case 'price-high': value = 'price_desc'; break;
                case 'name': value = 'name_asc'; break;
                case 'newest': value = 'newest'; break;
                case 'oldest': value = 'oldest'; break;
                default: value = 'default';
            }
            
            sortSelect.value = value;
            
            if (typeof sortProducts === 'function') {
                sortProducts();
                this.showNotification(`تم الترتيب حسب: ${sortType}`);
            }
        }
    }
    
    // ========== الدوال المساعدة ==========
    
    showElement(id) {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = 'flex';
        }
    }
    
    hideElement(id) {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = 'none';
        }
    }
    
    // ========== دوال التحكم الصوتي الأساسية ==========
    
    setupSpeechRecognition() {
        console.log('إعداد التعرف على الصوت...');
        
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (!SpeechRecognition) {
            console.warn('المتصفح لا يدعم التعرف على الصوت');
            this.showNotification('يرجى استخدام Chrome أو Edge لأفضل تجربة');
            return;
        }
        
        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'ar-SA';
        this.recognition.continuous = true;
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;
        
        this.recognition.onstart = () => {
            console.log('بدء الاستماع...');
            this.isListening = true;
            const status = document.getElementById('voiceStatus');
            if (status) {
                status.classList.add('mic-on');
                status.classList.remove('mic-off');
            }
        };
        
        this.recognition.onend = () => {
            console.log('توقف الاستماع');
            this.isListening = false;
            const status = document.getElementById('voiceStatus');
            if (status) {
                status.classList.remove('mic-on');
                status.classList.add('mic-off');
            }
            
            if (this.isAccessibilityMode) {
                setTimeout(() => {
                    this.startListening();
                }, 1000);
            }
        };
        
        this.recognition.onresult = (event) => {
            const last = event.results.length - 1;
            const transcript = event.results[last][0].transcript.trim();
            console.log('تم التعرف على:', transcript);
            this.processVoiceCommand(transcript);
        };
        
        this.recognition.onerror = (event) => {
            console.error('خطأ:', event.error);
            if (event.error === 'no-speech') {
                // تجاهل خطأ عدم وجود كلام
            } else if (event.error === 'audio-capture') {
                this.showNotification('لم يتم العثور على ميكروفون');
            } else if (event.error === 'not-allowed') {
                this.showNotification('يرجى السماح باستخدام الميكروفون');
            }
        };
    }
    
    startListening() {
        console.log('محاولة بدء الاستماع...');
        if (this.recognition && !this.isListening) {
            try {
                this.recognition.start();
                this.showNotification('جاري الاستماع...');
            } catch (e) {
                console.error('خطأ في التشغيل:', e);
                setTimeout(() => this.startListening(), 1000);
            }
        }
    }
    
    stopListening() {
        console.log('إيقاف الاستماع...');
        if (this.recognition && this.isListening) {
            this.recognition.stop();
            this.showNotification('تم إيقاف الاستماع');
        }
    }
    
    processVoiceCommand(command) {
        const cleanCommand = command.toLowerCase();
        
        const numberPatterns = {
            'واحد': 1, 'اتنين': 2, 'تلاتة': 3, 'ثلاثة': 3,
            'اربعة': 4, 'خمسة': 5, 'سته': 6, 'ستة': 6,
            'سبعة': 7, 'ثمانية': 8, 'تسعة': 9, 'عشرة': 10
        };
        
        for (const [word, number] of Object.entries(numberPatterns)) {
            if (cleanCommand.includes(word) && 
                (cleanCommand.includes('رقم') || 
                 cleanCommand.includes('منتج') || 
                 cleanCommand.includes('اشترى') ||
                 cleanCommand.includes('شراء') ||
                 cleanCommand.includes('اختر'))) {
                
                this.selectProductByIndex(number);
                this.showNotification(`تم تحديد المنتج رقم ${number}`);
                return;
            }
        }
        
        for (const [keyword, action] of Object.entries(this.commands)) {
            if (cleanCommand.includes(keyword.toLowerCase())) {
                this.showNotification(`تم تنفيذ: "${keyword}"`);
                action();
                return;
            }
        }
        
        this.showNotification(`لم أفهم: "${command}"`);
    }
    
    showNotification(message) {
        console.log('إشعار:', message);
        const notification = document.getElementById('voiceNotification');
        if (notification) {
            notification.textContent = message;
            notification.style.display = 'block';
            
            setTimeout(() => {
                notification.style.display = 'none';
            }, 3000);
        }
    }
    
    scrollPage(direction) {
        const scrollAmount = 300;
        const currentPosition = window.pageYOffset;
        
        if (direction === 'up') {
            window.scrollTo({
                top: Math.max(0, currentPosition - scrollAmount),
                behavior: 'smooth'
            });
        } else {
            window.scrollTo({
                top: currentPosition + scrollAmount,
                behavior: 'smooth'
            });
        }
    }
    
    filterProducts(type, value) {
        const selectElement = document.getElementById(type);
        if (selectElement) {
            selectElement.value = value;
            
            if (type === 'category' || type === 'brand' || type === 'price-range') {
                if (typeof filterProducts === 'function') {
                    filterProducts();
                    this.showNotification(`تم فلترة المنتجات حسب: ${value}`);
                }
            }
        }
    }
    
    selectProductByName(productName) {
        const allProducts = document.querySelectorAll('.product-name');
        let found = false;
        
        allProducts.forEach((nameElement) => {
            if (nameElement.textContent.includes(productName)) {
                const productCard = nameElement.closest('.product-card');
                if (productCard) {
                    productCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    productCard.style.boxShadow = '0 0 0 3px #f59e0b';
                    setTimeout(() => {
                        productCard.style.boxShadow = '';
                    }, 3000);
                    found = true;
                }
            }
        });
        
        if (found) {
            this.showNotification(`تم العثور على: ${productName}`);
        } else {
            this.showNotification(`لم يتم العثور على: ${productName}`);
        }
    }
    
    buyCurrentProduct() {
        if (this.selectedProductIndex >= 0) {
            const selectedProduct = document.querySelectorAll('.product-card, .product-item')[this.selectedProductIndex];
            
            if (selectedProduct) {
                const buyButton = selectedProduct.querySelector('.btn, .add-to-cart, .buy-btn, .cart-btn');
                
                if (buyButton) {
                    buyButton.click();
                    this.showNotification('تم إضافة المنتج المحدد إلى السلة');
                    
                    selectedProduct.classList.remove('product-selected');
                    selectedProduct.style.transform = '';
                    this.selectedProductIndex = -1;
                    
                    return;
                }
            }
            
        }
        
        const visibleProducts = document.querySelectorAll('.product-card, .product-item');
        if (visibleProducts.length > 0) {
            const lastVisibleProduct = visibleProducts[visibleProducts.length - 1];
            const buyButton = lastVisibleProduct.querySelector('.btn, .add-to-cart, .buy-btn, .cart-btn');
            
            if (buyButton) {
                buyButton.click();
                this.showNotification('تم إضافة المنتج إلى السلة');
            } else {
                this.showNotification('لم أجد زر شراء في هذا المنتج');
            }
        } else {
            this.showNotification('لم أجد منتجاً لشرائه');
        }
    }
    removeFromCart() {
    const cartItems = document.getElementById('cart-items');
    
    if (cartItems && cartItems.children.length > 0) {
        const lastCartItem = cartItems.lastElementChild;
        const deleteButton = lastCartItem.querySelector('button');
        
        if (deleteButton) {
            deleteButton.click();
            this.showNotification('تم حذف آخر منتج من السلة');
        } else {
            this.showNotification('لم أجد زر حذف في هذا المنتج');
        }
    } else {
        this.showNotification('السلة فارغة، لا يوجد منتجات للحذف');
    }
}
    applyDiscount() {
        if (typeof applyDiscount === 'function') {
            applyDiscount();
            this.showNotification('تم تطبيق الخصم على طلبك');
        }
    }
    
    completeOrder() {
        const cartSection = document.querySelector('.cart-summary');
        if (cartSection) {
            cartSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => {
                if (typeof checkout === 'function') {
                    checkout();
                    this.showNotification('جاري إتمام الطلب...');
                }
            }, 1000);
        }
    }
    
    resetFilters() {
        const filters = ['category', 'price-range', 'brand', 'sort'];
        filters.forEach(filter => {
            const element = document.getElementById(filter);
            if (element) element.value = 'all';
        });
        
        if (typeof filterProducts === 'function') filterProducts();
        if (typeof sortProducts === 'function') sortProducts();
        
        this.showNotification('تم إعادة تعيين جميع الفلاتر');
    }
    
    showHelp() {
        const instructions = document.getElementById('voiceInstructions');
        if (instructions) {
            if (instructions.style.display === 'block') {
                instructions.style.display = 'none';
                this.showNotification('تم إخفاء التعليمات');
            } else {
                instructions.style.display = 'block';
                this.showNotification('تم عرض التعليمات');
            }
        }
    }
}

// تهيئة النظام عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', () => {
    console.log('الصفحة محملة، تهيئة نظام الوصولية...');
    
    setTimeout(() => {
        try {
            window.accessibilityManager = new AccessibilityManager();
            console.log('✅ نظام الوصولية جاهز للعمل');
        } catch (error) {
            console.error('❌ خطأ في تهيئة نظام الوصولية:', error);
        }
    }, 500);
});

// دالة للاختبار السريع
function testVoiceCommand(command) {
    if (window.accessibilityManager) {
        window.accessibilityManager.processVoiceCommand(command);
    } else {
        console.error('نظام الوصولية غير مهيء بعد');
    }
}