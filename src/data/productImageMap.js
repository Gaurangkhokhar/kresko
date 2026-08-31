// ─────────────────────────────────────────────────────────────
//  Per-product image mapping
//  Drop your product photos into: public/images/products/all-products/
//  with the exact filenames listed below and they appear automatically.
//  If a file is missing, the site falls back to the category image.
// ─────────────────────────────────────────────────────────────

const DIR = '/images/products/all-products/';

// [match keywords (lowercase), filename] — ORDER MATTERS (most specific first)
// null filename = special-cased in getPerProductImage() below
const PRODUCT_IMAGE_MAP = [
  [['toilet cleaner powder', 'toilet-cleaner-powder'], 'toilet_cleaner_powder_31x.png'],
  [['powder hand wash', 'powder-hand-wash'], 'powder_hand_wash_23x.png'],
  [['super concentrate', 'super-concentrate'], 'floor_cleaner_super_30x.png'],
  [['pvl'], 'floor_cleaner_pvl_30x.png'],
  [['psv'], 'floor_cleaner_psv_30x.png'],
  [['pscv'], 'floor_cleaner_pscv_30x.png'],
  [['herbal floor'], 'herbal_floor_cleaner.png'],
  [['white phenyl', 'white-phenyl'], 'white_phenyl_30x.png'],
  [['flavored phenyl', 'flavoured phenyl'], 'flavored_phenyl_30x.png'],
  [['black phenyl', 'black-phenyl'], 'black_phenyl_14x.png'],
  [['organic toilet', 'organic-toilet'], 'organic_toilet_cleaner_31x.png'],
  [['without acid', 'without-acid'], 'toilet_cleaner_without_acid.png'],
  [['red'], 'toilet_cleaner_6x_red.png'],
  [['toilet cleaner', 'toilet-cleaner'], 'toilet_cleaner_6x_blue.png'],
  [['scale remover', 'scale-remover'], 'scale_remover.png'],
  [['liquid laundry detergent', 'liquid-laundry-detergent'], null],
  [['fabric wash', 'fabric-wash'], 'fabric_wash_4x.png'],
  [['fabric comfort', 'fabric-comfort'], 'fabric_comfort_4x.png'],
  [['multipurpose', 'multi-purpose', 'all-purpose'], 'multipurpose_cleaner_5x.png'],
  [['fabric whitener', 'fabric-whitener'], 'fabric_whitener_2_5x.png'],
  [['dish whitener', 'dish-whitener'], 'dish_whitener_2_5x.png'],
  [['dish wash', 'dish-wash'], null],
  [['teepol'], 'teepol_5x.png'],
  [['kitchen degreaser', 'kitchen-degreaser'], 'kitchen_degreaser_5x.png'],
  [['chimney'], 'chimney_cleaner_5x.png'],
  [['glass cleaner', 'glass-cleaner'], 'glass_cleaner_35x.png'],
  [['foam hand wash', 'foam-hand-wash'], 'foam_hand_wash.png'],
  [['magical hand wash', 'magical-hand-wash'], 'magical_hand_wash.png'],
  [['hand wash', 'hand-wash', 'handwash'], null],
  [['shampoo'], 'shampoo_concentrate.png'],
  [['shower gel', 'shower-gel'], 'shower_gel_concentrate.png'],
  [['sanitizer'], 'hand_sanitizer.png'],
  [['phenyl thickener', 'phenyl-thickener'], 'phenyl_thickener.png'],
  [['thickener'], 'hand_wash_thickener.png'],
  [['air freshener cake', 'air-freshener-cake'], 'air_freshener_cake.png'],
  [['air freshener', 'air-freshener'], 'air_freshener_concentrate.png'],
  [['sachet'], 'air_sanitizer_sachet.png'],
  [['air sanitizer', 'air-sanitizer'], 'air_sanitizer_gel.png'],
  [['naphthalene'], 'naphthalene_balls.png'],
  [['car shampoo', 'car-shampoo'], 'car_shampoo_6x.png'],
  [['car polish', 'car-polish'], 'car_polish_2_5x.png'],
  [['wax polish', 'wax-polish'], 'wax_polish.png'],
  [['rapidglow'], null],
  [['metal shining', 'metal-shining'], 'metal_shining_powder.png'],
  [['metal polish', 'metal-polish'], 'metal_polish.png'],
  [['wood polish', 'wood-polish'], 'wood_polish.png'],
  [['roll-on', 'roll on', 'rollon'], 'mosquito_roll_on.png'],
  [['vaporizer'], 'mosquito_vaporizer_liquid.png'],
  [['mosquito'], 'mosquito_repellent_concentrate.png'],
  [['cockroach'], 'cockroach_spray.png'],
  [['fly'], 'fly_spray.png'],
  [['ant'], 'ant_spray.png'],
  [['all insect', 'all-insect'], 'all_insect_spray.png'],
  [['rapidpunch'], 'rapidpunch_chalk.png'],
  [['washing machine', 'washing-machine'], 'washing_machine_descaling_powder.png']
];

/** Returns the per-product image path from /images/products/all-products/, or null if no mapping. */
export function getPerProductImage(title = '', id = '') {
  const t = `${id || ''} ${title || ''}`.toLowerCase();
  for (const [keywords, file] of PRODUCT_IMAGE_MAP) {
    if (file && keywords.some((k) => t.includes(k))) return DIR + file;
  }
  // Special cases needing size/strength discrimination
  if (t.includes('liquid laundry detergent')) {
    return DIR + (t.includes('6x') ? 'liquid_laundry_detergent_6x.png' : 'liquid_laundry_detergent_4x.png');
  }
  if (t.includes('dish wash')) {
    return DIR + (t.includes('10x') ? 'dish_wash_10x.png' : 'dish_wash_6x.png');
  }
  if (t.includes('hand wash') || t.includes('handwash')) {
    if (t.includes('10x')) return DIR + 'hand_wash_10x.png';
    if (t.includes('23x')) return DIR + 'powder_hand_wash_23x.png';
    return DIR + 'hand_wash_6x.png';
  }
  if (t.includes('rapidglow')) {
    if (t.includes('100')) return DIR + 'rapidglow_100g.png';
    if (t.includes('150')) return DIR + 'rapidglow_150g.png';
    if (t.includes('200')) return DIR + 'rapidglow_200g.png';
    return DIR + 'rapidglow_50g.png';
  }
  return null;
}

/** Category-level fallback image (for onError recovery when a per-product photo is missing). */
export function getCategoryFallbackImage(title = '', id = '', category = '') {
  const t = `${id || ''} ${title || ''}`.toLowerCase();
  const cat = (category || '').toLowerCase();
  if (cat.includes('floor')) {
    if (t.includes('phenyl') || t.includes('black') || t.includes('pvl') || t.includes('psv') || t.includes('pscv')) {
      return '/images/products/white_phenyl_drum.png';
    }
    return '/images/products/floor_cleaner_purple.png';
  }
  if (cat.includes('personal')) return '/images/products/handwash_pink.png';
  if (cat.includes('laundry')) return '/images/products/laundry_detergent_blue.png';
  if (cat.includes('kitchen')) return '/images/products/dishwash_gel_yellow.png';
  if (cat.includes('bathroom') || cat.includes('toilet')) return '/images/products/toilet_cleaner_blue.png';
  if (cat.includes('pest') || cat.includes('air') || cat.includes('glass')) return '/images/products/spray_bottle_repellent.png';
  if (cat.includes('car')) return '/images/products/car_shampoo_orange.png';
  if (t.includes('toilet')) return '/images/products/toilet_cleaner_blue.png';
  return '/images/products/chemical_drum_white.png';
}

/** onError handler for <img> tags — swaps a missing per-product photo to the category fallback once. */
export function handleProductImgError(e, title, id, category) {
  const img = e.currentTarget || e.target;
  if (!img || img.dataset.fallbackApplied === '1') return;
  img.dataset.fallbackApplied = '1';
  img.src = getCategoryFallbackImage(title, id, category);
}