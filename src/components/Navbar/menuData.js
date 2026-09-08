// ==========================================================================
// NAVBAR MENU DATA
// Keep all menu content here so future items can be added without touching JSX.
// Leaves use `path` (React Router route) and optional `target` (anchor id on
// that route used for smooth-scroll navigation).
// ==========================================================================

// Chlorine Dioxide — mega menu. Organized into three top-level groups:
// Introduction, Products, Applications. Each group is an expandable (▼) panel
// inside the dropdown. Child leaves target real anchor ids on the
// /chlorine-dioxide route (smooth-scroll navigation).
export const productMenu = [
  {
    label: 'Introduction',
    path: '/chlorine-dioxide',
    target: 'introduction',
    children: [
      { label: 'What is Chlorine Dioxide?', target: 'introduction' },
      { label: 'How It Works', target: 'how-it-works' },
      { label: 'Why Choose ClO2?', target: 'introduction' },
      { label: 'Technical Specifications', target: 'introduction' }
    ]
  },
  {
    label: 'Products',
    path: '/chlorine-dioxide',
    target: 'products',
    children: [
      { label: 'Liquid ClO2 Concentrate', target: 'products' },
      { label: 'Chlorine Dioxide Tablets', target: 'products' },
      { label: 'Chlorine Dioxide Powder', target: 'products' },
      { label: 'Chlorine Dioxide Gel', target: 'products' },
      { label: 'Chlorine Dioxide Sachets', target: 'products' },
      { label: 'Generator Systems', target: 'products' }
    ]
  },
  {
    label: 'Applications',
    path: '/chlorine-dioxide',
    target: 'applications',
    children: [
      { label: 'Drinking Water', target: 'applications' },
      { label: 'Wastewater Treatment', target: 'applications' },
      { label: 'Food & Beverage', target: 'applications' },
      { label: 'Healthcare & Pharmaceuticals', target: 'applications' },
      { label: 'Aquaculture', target: 'applications' },
      { label: 'Cooling Towers', target: 'applications' },
      { label: 'Swimming Pools', target: 'applications' },
      { label: 'Surface & Equipment Disinfection', target: 'applications' }
    ]
  }
];

// Our Solutions — full product catalog grouped by category. Each group links
// to its /products/:categoryId listing page; children link to the same page
// (the category explorer highlights the active category).
export const solutionsMenu = [
  {
    label: 'Home Care Concentrates',
    path: '/products/home-care',
    children: [
      { label: 'Multipurpose Cleaner Concentrate 5X', path: '/products/home-care' },
      { label: 'White Phenyl Concentrate 30X', path: '/products/home-care' },
      { label: 'Flavored Phenyl Concentrate 30X', path: '/products/home-care' },
      { label: 'Black Phenyl Concentrate 14X', path: '/products/home-care' },
      { label: 'Fabric Whitener 2.5X', path: '/products/home-care' },
      { label: 'Dish Whitener 2.5X', path: '/products/home-care' }
    ]
  },
  {
    label: 'Laundry Care Concentrates',
    path: '/products/laundry-care',
    children: [
      { label: 'Liquid Laundry Detergent Concentrate 4X', path: '/products/laundry-care' },
      { label: 'Liquid Laundry Detergent Concentrate 6X', path: '/products/laundry-care' },
      { label: 'Fabric Wash Concentrate 4X', path: '/products/laundry-care' },
      { label: 'Fabric Comfort Concentrate 4X', path: '/products/laundry-care' }
    ]
  },
  {
    label: 'Kitchen Care Concentrates',
    path: '/products/kitchen-care',
    children: [
      { label: 'Dish Wash Concentrate 6X', path: '/products/kitchen-care' },
      { label: 'Dish Wash Concentrate 10X', path: '/products/kitchen-care' },
      { label: 'Teepol Concentrate 5X', path: '/products/kitchen-care' },
      { label: 'Kitchen Degreaser 5X', path: '/products/kitchen-care' },
      { label: 'Chimney Cleaner 5X', path: '/products/kitchen-care' }
    ]
  },
  {
    label: 'Floor Care Concentrates',
    path: '/products/floor-care',
    children: [
      { label: 'Floor Cleaner Super Concentrate 30X', path: '/products/floor-care' },
      { label: 'Floor Cleaner PVL 30X', path: '/products/floor-care' },
      { label: 'Floor Cleaner PSV 30X', path: '/products/floor-care' },
      { label: 'Floor Cleaner PSCV 30X', path: '/products/floor-care' },
      { label: 'Herbal Floor Cleaner', path: '/products/floor-care' }
    ]
  },
  {
    label: 'Bathroom Care Concentrates',
    path: '/products/bathroom-care',
    children: [
      { label: 'Toilet Cleaner Concentrate 6X (Blue)', path: '/products/bathroom-care' },
      { label: 'Toilet Cleaner Concentrate 6X (Red)', path: '/products/bathroom-care' },
      { label: 'Organic Toilet Cleaner Concentrate 31X', path: '/products/bathroom-care' },
      { label: 'Toilet Cleaner (Without Acid)', path: '/products/bathroom-care' },
      { label: 'Scale Remover', path: '/products/bathroom-care' }
    ]
  },
  {
    label: 'Glass Care Concentrates',
    path: '/products/glass-care',
    children: [
      { label: 'Glass Cleaner Concentrate 35X', path: '/products/glass-care' }
    ]
  },

  {
    label: 'Personal Care Concentrates',
    path: '/products/personal-care',
    children: [
      { label: 'Hand Wash Concentrate 6X', path: '/products/personal-care' },
      { label: 'Hand Wash Concentrate 10X', path: '/products/personal-care' },
      { label: 'Powder Hand Wash 23X', path: '/products/personal-care' },
      { label: 'Foam Hand Wash', path: '/products/personal-care' },
      { label: 'Magical Hand Wash', path: '/products/personal-care' },
      { label: 'Shampoo Concentrate', path: '/products/personal-care' },
      { label: 'Shower Gel Concentrate', path: '/products/personal-care' },
      { label: 'Hand Sanitizer', path: '/products/personal-care' },
      { label: 'Hand Wash Thickener', path: '/products/personal-care' }
    ]
  },
  {
    label: 'Air Care Products',
    path: '/products/air-care',
    children: [
      { label: 'Air Freshener Concentrate', path: '/products/air-care' },
      { label: 'Air Freshener Cake', path: '/products/air-care' },
      { label: 'Air Sanitizer Gel', path: '/products/air-care' },
      { label: 'Air Sanitizer Sachet', path: '/products/air-care' },
      { label: 'Naphthalene Balls', path: '/products/air-care' }
    ]
  },
  {
    label: 'Car Care Products',
    path: '/products/car-care',
    children: [
      { label: 'Car Shampoo Concentrate 6X', path: '/products/car-care' },
      { label: 'Car Polish Concentrate 2.5X', path: '/products/car-care' },
      { label: 'Wax Polish Concentrate', path: '/products/car-care' }
    ]
  },
  {
    label: 'Metal Care Products',
    path: '/products/metal-care',
    children: [
      { label: 'Metal Polish Concentrate', path: '/products/metal-care' },
      { label: 'Wood Polish Concentrate', path: '/products/metal-care' },
      { label: 'Metal Shining Powder', path: '/products/metal-care' },
      { label: 'RapidGlow™ Metal Shining Powder (50 g)', path: '/products/metal-care' },
      { label: 'RapidGlow™ Metal Shining Powder (100 g)', path: '/products/metal-care' },
      { label: 'RapidGlow™ Metal Shining Powder (150 g / 200 g)', path: '/products/metal-care' }
    ]
  },
  {
    label: 'Pest Control Products',
    path: '/products/pest-control',
    children: [
      { label: 'Mosquito Repellent Concentrate', path: '/products/pest-control' },
      { label: 'Mosquito Roll-On', path: '/products/pest-control' },
      { label: 'Mosquito Vaporizer Liquid', path: '/products/pest-control' },
      { label: 'Cockroach Spray', path: '/products/pest-control' },
      { label: 'Fly Spray', path: '/products/pest-control' },
      { label: 'Ant Spray', path: '/products/pest-control' },
      { label: 'All Insect Spray', path: '/products/pest-control' },
      { label: 'RapidPunch™ Chalk', path: '/products/pest-control' }
    ]
  },
  {
    label: 'Specialty Products',
    path: '/products/specialty-products',
    children: [
      { label: 'Phenyl Thickener', path: '/products/specialty-products' },
      { label: 'Hand Wash Thickener', path: '/products/specialty-products' },
      { label: 'Washing Machine Descaling Powder', path: '/products/specialty-products' },
      { label: 'Scale Remover', path: '/products/specialty-products' },
      { label: 'Fabric Whitener', path: '/products/specialty-products' },
      { label: 'Dish Whitener', path: '/products/specialty-products' }
    ]
  },
  {
    label: 'Powder to Liquid Products',
    path: '/products/powder-to-liquid',
    children: [
      { label: 'Powder Hand Wash', path: '/products/powder-to-liquid' },
      { label: 'Toilet Cleaner Powder 31X', path: '/products/powder-to-liquid' }
    ]
  }
];

// About Us — simple dropdown
export const aboutMenu = [
  { label: 'About Company', path: '/about' },
  { label: 'Certifications', path: '/certifications' },
  { label: 'Facility Showcase', path: '/facility' },
  { label: 'OEM & Private Labeling', path: '/oem' },
  { label: 'Industries We Serve', path: '/about?tab=industries' }
];

// Media — dropdown with Gallery, Events and Blog
export const mediaMenu = [
  { label: 'Gallery', path: '/gallery' },
  { label: 'Events', path: '/events' },
  { label: 'Blog', path: '/blog' }
];

// Ordered top-level navigation items.
// type: 'link' | 'mega' | 'solutions' | 'simple'
export const navItems = [
  { type: 'link', label: 'Home', path: '/', key: 'home' },
  { type: 'simple', label: 'About Us', key: 'about' },
  { type: 'solutions', label: 'All Products', key: 'solutions' },
  { type: 'link', label: 'Raw Chemicals', path: '/raw-material', key: 'raw-material' },
  { type: 'link', label: 'Events', path: '/events', key: 'events' },
  { type: 'link', label: 'Career', path: '/careers', key: 'careers' },
  { type: 'link', label: 'Contact Us', path: '/contact', key: 'contact' }
];