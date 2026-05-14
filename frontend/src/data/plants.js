/**
 * Curated sample agronomy + pathology reference data for the Plant Library.
 * Images are hotlinked from Unsplash for demo purposes.
 */
export const plants = [
  {
    id: 'tomato',
    name: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    image:
      'https://images.unsplash.com/photo-1592841200221-4347010be5a2?auto=format&fit=crop&w=1200&q=80',
    growthDuration: '70–90 days (determinate) · 75–100+ (indeterminate)',
    soil: 'Well-drained loam, pH 6.0–6.8, high organic matter',
    water: '1–1.5 in/week; deep, less frequent irrigation; avoid leaf wetness',
    seedQuantity: '≈8,000–11,000 seeds/kg; field: ~300–400 g/acre (spacing dependent)',
    temperature: 'Day 24–29°C, night 13–18°C; fruit set drops >32°C',
    season: 'Spring–summer (temperate); cool-season greenhouse in hot climates',
    fertilizer: 'Balanced N-P-K early; shift to lower N, higher K/Ca during fruiting; foliar Ca if needed',
    diseases: [
      {
        id: 'tomato-early-blight',
        name: 'Early Blight (Alternaria)',
        image:
          'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80',
        symptoms: 'Concentric “target” lesions on older leaves; yellow halos; stem girdling at collar',
        causes: 'Alternaria solani; favored by humidity, dew, and senescing foliage',
        prevention: 'Mulch, staking, 3-year solanaceous rotation, residue destruction',
        cure: 'Labeled fungicides on interval after detection; remove heavily infected lower leaves',
      },
      {
        id: 'tomato-late-blight',
        name: 'Late Blight (Phytophthora)',
        image:
          'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80',
        symptoms: 'Water-soaked patches, rapid collapse, white sporulation on leaf undersides',
        causes: 'Phytophthora infestans in cool, wet periods',
        prevention: 'Resistant cultivars, cull destruction, wider rows, avoid overhead irrigation',
        cure: 'Systemic + protectant programs per local advisory; eliminate hotspots early',
      },
      {
        id: 'tomato-leaf-mold',
        name: 'Leaf Mold',
        image:
          'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=900&q=80',
        symptoms: 'Yellow blotches above; velvety olive-gray growth below',
        causes: 'Passalora fulva in high RH, poor greenhouse airflow',
        prevention: 'Ventilation/dehumidification, drip irrigation, resistant varieties',
        cure: 'Labeled fungicides + canopy management; reduce night humidity first',
      },
    ],
  },
  {
    id: 'potato',
    name: 'Potato',
    scientificName: 'Solanum tuberosum',
    image:
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1200&q=80',
    growthDuration: '80–120 days by cultivar and market class',
    soil: 'Deep, loose loam, pH 5.0–6.0 (scab-sensitive sites on acid side)',
    water: 'Uniform moisture during tuber initiation; reduce toward maturity',
    seedQuantity: '≈8–12 cwt seed/acre typical (cut seed adjusts plant density)',
    temperature: 'Cool tuber initiation (~15–20°C soil); haulm growth moderate temps',
    season: 'Spring plant for summer/fall harvest (region specific)',
    fertilizer: 'Split N with P/K per soil test; avoid excess N delaying skin set',
    diseases: [
      {
        id: 'potato-late-blight',
        name: 'Late Blight',
        image:
          'https://images.unsplash.com/photo-1587731547353-348f478ebf66?auto=format&fit=crop&w=900&q=80',
        symptoms: 'Greasy lesions, rapid kill, sporulation; tuber red-brown internal necrosis',
        causes: 'Phytophthora infestans; culls and volunteers as reservoirs',
        prevention: 'Certified seed, destroy volunteers, weather-aware fungicide timing',
        cure: 'Aggressive protectant/systemic programs; vine kill to protect tubers',
      },
      {
        id: 'potato-early-blight',
        name: 'Early Blight',
        image:
          'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=900&q=80',
        symptoms: 'Target lesions on older leaves; stem lesions weaken haulm',
        causes: 'Alternaria spp. on senescing tissue + wet cycles',
        prevention: 'Balanced fertility, especially K; residue management',
        cure: 'Fungicide coverage on lower canopy; extend intervals in dry periods',
      },
      {
        id: 'potato-scab',
        name: 'Common Scab',
        image:
          'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80',
        symptoms: 'Corky, raised lesions on tuber periderm',
        causes: 'Streptomyces spp.; worse at high pH and dry tuber set phase',
        prevention: 'pH management, moisture at initiation, resistant cultivars',
        cure: 'No curative tuber treatment; adjust soil chemistry next crop',
      },
    ],
  },
  {
    id: 'wheat',
    name: 'Wheat',
    scientificName: 'Triticum aestivum',
    image:
      'https://images.unsplash.com/photo-1508610046159-59645461a8ee?auto=format&fit=crop&w=1200&q=80',
    growthDuration: '110–150 days (spring/winter habit dependent)',
    soil: 'Silt loam to clay loam, pH 6.0–7.0, good drainage',
    water: 'Critical at tillering, jointing, heading; avoid waterlogging',
    seedQuantity: '90–150 lbs/acre typical; adjust for germination, row width, target plants/ft²',
    temperature: 'Germination from ~4°C; optimal tillering ~15–20°C',
    season: 'Winter wheat: fall plant; Spring wheat: early spring',
    fertilizer: 'N splits by yield goal and growth stage; S for protein where deficient',
    diseases: [
      {
        id: 'wheat-stripe-rust',
        name: 'Stripe Rust',
        image:
          'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=900&q=80',
        symptoms: 'Yellow-orange pustules in stripes parallel to veins',
        causes: 'Puccinia striiformis f. sp. tritici; cool, moist springs',
        prevention: 'Genetic resistance, volunteer control, early scouting',
        cure: 'Fungicides at flag leaf if thresholds exceeded; rotate MOA',
      },
      {
        id: 'wheat-leaf-rust',
        name: 'Leaf Rust',
        image:
          'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80',
        symptoms: 'Smaller orange pustules scattered on leaf blades',
        causes: 'Puccinia triticina; humidity + moderate temps',
        prevention: 'Resistant varieties, avoid late lush N',
        cure: 'Triazole/strobilurin timing per extension thresholds',
      },
      {
        id: 'wheat-powdery-mildew',
        name: 'Powdery Mildew',
        image:
          'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80',
        symptoms: 'White talcum-like colonies on upper leaves',
        causes: 'Blumeria graminis f. sp. tritici in dense, humid canopies',
        prevention: 'Moderate N, variety selection, row spacing where practical',
        cure: 'DMIs/strobilurins at early head timing if economically justified',
      },
    ],
  },
  {
    id: 'rice',
    name: 'Rice',
    scientificName: 'Oryza sativa',
    image:
      'https://images.unsplash.com/photo-1536617621572-1f6ca3813649?auto=format&fit=crop&w=1200&q=80',
    growthDuration: '100–150 days by cultivar and ecosystem (upland/lowland)',
    soil: 'Heavy clay to silty clay for paddy; pH ~5.5–6.5 common in flooded systems',
    water: 'Flooded or saturated during vegetative stages; careful drainage before harvest',
    seedQuantity: '60–100 kg/ha direct seeded typical (varies widely by method)',
    temperature: 'Optimal growth ~25–35°C; sensitive to cold at seedling stage',
    season: 'Monsoon / summer plantings in tropical; temperate rice on regional calendars',
    fertilizer: 'N splits with growth stage; Si and K where tests indicate',
    diseases: [
      {
        id: 'rice-blast',
        name: 'Rice Blast',
        image:
          'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=900&q=80',
        symptoms: 'Diamond lesions with gray centers; node/panicle blast in severe cases',
        causes: 'Magnaporthe oryzae; excess N and leaf wetness increase risk',
        prevention: 'Resistant lines, balanced N, water management',
        cure: 'Fungicide at boot/heading if advisory models trigger',
      },
      {
        id: 'rice-blight',
        name: 'Bacterial Leaf Blight',
        image:
          'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80',
        symptoms: 'Water-soaked to yellow lesions along margins; wilting',
        causes: 'Xanthomonas oryzae pv. oryzae; high humidity + wounds',
        prevention: 'Clean seed, avoid excess N, field drainage',
        cure: 'Copper programs where effective; strict regulatory antibiotics if permitted',
      },
      {
        id: 'rice-sheath-blight',
        name: 'Sheath Blight',
        image:
          'https://images.unsplash.com/photo-1473973267048-6e8bbe7a2c2f?auto=format&fit=crop&w=900&q=80',
        symptoms: 'Oval lesions on sheaths near waterline; sclerotia in dense stands',
        causes: 'Rhizoctonia solani AG-1 IA; lush stands + humidity',
        prevention: 'Plant density optimization, silicon nutrition, balanced N',
        cure: 'SDHI/strobilurin at early movement up the canopy',
      },
    ],
  },
]

export function getPlantById(id) {
  return plants.find((p) => p.id === id)
}
