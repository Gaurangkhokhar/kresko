// ==========================================================================
// NAVBAR MENU DATA
// Keep all menu content here so future items can be added without touching JSX.
// Leaves use `path` (React Router route) and optional `target` (anchor id on
// that route used for smooth-scroll navigation).
// ==========================================================================

// Our Products — mega menu. Organized into the four top-level groups the user
// requested: Chlorine Dioxide, Introduction, Products, Applications. Each group
// is an expandable (▼) panel inside the dropdown. Child leaves target real
// anchor ids on the /chlorine-dioxide route (smooth-scroll navigation).
export const productMenu = [
  {
    label: 'Chlorine Dioxide',
    path: '/chlorine-dioxide',
    target: 'overview',
    children: [
      { label: 'Overview', target: 'overview' },
      { label: 'Key Benefits', target: 'benefits' },
      { label: 'Safety Information', target: 'safety' },
      { label: 'Certifications', target: 'certifications' },
      { label: 'FAQs', target: 'faqs' }
    ]
  },
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

// Our Solutions — large scrollable dropdown
export const solutionsMenu = [
  { label: 'Air Fumigation', path: '/chlorine-dioxide', target: 'applications' },
  { label: 'Beverage Industry', path: '/chlorine-dioxide', target: 'applications' },
  { label: 'Dairy Production', path: '/chlorine-dioxide', target: 'applications' },
  { label: 'Cooling Tower Water Treatment', path: '/chlorine-dioxide', target: 'app-cooling-towers' },
  { label: 'Dairy Farm Water Treatment', path: '/chlorine-dioxide', target: 'applications' },
  { label: 'Drinking Water Treatment', path: '/chlorine-dioxide', target: 'app-drinking-water' },
  { label: 'Aquaculture Water Treatment', path: '/chlorine-dioxide', target: 'app-aquaculture' },
  { label: 'Food Area Sanitation', path: '/chlorine-dioxide', target: 'app-surface-disinfection' },
  { label: 'Fruit Disinfection', path: '/chlorine-dioxide', target: 'app-surface-disinfection' },
  { label: 'Wastewater Treatment', path: '/chlorine-dioxide', target: 'app-wastewater' },
  { label: 'Industrial Water Treatment', path: '/chlorine-dioxide', target: 'app-industrial-water' },
  { label: 'Swimming Pool Water Treatment', path: '/chlorine-dioxide', target: 'applications' }
];

// About Us — simple dropdown
export const aboutMenu = [
  { label: 'About Company', path: '/about' },
  { label: 'Certifications', path: '/certifications' },
  { label: 'Facility Showcase', path: '/facility' },
  { label: 'OEM & Private Labeling', path: '/oem' }
];

// Ordered top-level navigation items.
// type: 'link' | 'mega' | 'solutions' | 'simple'
export const navItems = [
  { type: 'link', label: 'Home', path: '/', key: 'home' },
  { type: 'mega', label: 'Our Products', key: 'products' },
  { type: 'solutions', label: 'Our Solutions', key: 'solutions' },
  { type: 'link', label: 'Case Studies', path: '/resources', key: 'case-studies' },
  { type: 'link', label: 'Blogs', path: '/blog', key: 'blogs' },
  { type: 'simple', label: 'About Us', key: 'about' },
  { type: 'link', label: 'Contact Us', path: '/contact', key: 'contact' }
];