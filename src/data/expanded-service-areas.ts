export type ExpandedServiceArea = {
  slug: string;
  name: string;
  county: string;
  region: string;
  cluster: string;
  existing?: boolean;
  nearby: string[];
};

export const requestedServiceAreas: ExpandedServiceArea[] = [
  { slug: 'summit-valley', name: 'Summit Valley', county: 'San Bernardino County', region: 'High Desert', cluster: 'High Desert / Victor Valley', nearby: ['victorville', 'hesperia', 'phelan'] },
  { slug: 'pinon-hills', name: 'Pinon Hills', county: 'San Bernardino County', region: 'High Desert', cluster: 'High Desert / Victor Valley', nearby: ['phelan', 'wrightwood', 'victorville'] },
  { slug: 'oro-grande', name: 'Oro Grande', county: 'San Bernardino County', region: 'High Desert', cluster: 'High Desert / Victor Valley', nearby: ['victorville', 'adelanto', 'apple-valley'] },
  { slug: 'newberry-springs', name: 'Newberry Springs', county: 'San Bernardino County', region: 'High Desert', cluster: 'High Desert / Victor Valley', nearby: ['barstow', 'victorville', 'apple-valley'] },
  { slug: 'silver-lakes', name: 'Silver Lakes', county: 'San Bernardino County', region: 'High Desert', cluster: 'High Desert / Victor Valley', nearby: ['helendale', 'oro-grande', 'victorville'] },
  { slug: 'yucca-valley', name: 'Yucca Valley', county: 'San Bernardino County', region: 'Morongo Basin', cluster: 'High Desert / Victor Valley', nearby: ['twentynine-palms', 'palm-springs', 'banning'] },
  { slug: 'twentynine-palms', name: 'Twentynine Palms', county: 'San Bernardino County', region: 'Morongo Basin', cluster: 'High Desert / Victor Valley', nearby: ['yucca-valley', 'palm-springs', 'banning'] },
  { slug: 'lancaster', name: 'Lancaster', county: 'Los Angeles County', region: 'Antelope Valley', cluster: 'High Desert / Victor Valley', nearby: ['littlerock', 'los-angeles', 'pasadena'] },
  { slug: 'littlerock', name: 'Littlerock', county: 'Los Angeles County', region: 'Antelope Valley', cluster: 'High Desert / Victor Valley', nearby: ['lancaster', 'pasadena', 'los-angeles'] },

  { slug: 'rancho-cucamonga', name: 'Rancho Cucamonga', county: 'San Bernardino County', region: 'Inland Empire', cluster: 'Inland Empire', existing: true, nearby: ['upland', 'fontana', 'ontario'] },
  { slug: 'upland', name: 'Upland', county: 'San Bernardino County', region: 'Inland Empire', cluster: 'Inland Empire', existing: true, nearby: ['rancho-cucamonga', 'montclair', 'ontario'] },
  { slug: 'rialto', name: 'Rialto', county: 'San Bernardino County', region: 'Inland Empire', cluster: 'Inland Empire', nearby: ['san-bernardino', 'fontana', 'colton'] },
  { slug: 'bloomington', name: 'Bloomington', county: 'San Bernardino County', region: 'Inland Empire', cluster: 'Inland Empire', nearby: ['rialto', 'fontana', 'colton'] },
  { slug: 'colton', name: 'Colton', county: 'San Bernardino County', region: 'Inland Empire', cluster: 'Inland Empire', nearby: ['san-bernardino', 'loma-linda', 'grand-terrace'] },
  { slug: 'loma-linda', name: 'Loma Linda', county: 'San Bernardino County', region: 'Inland Empire', cluster: 'Inland Empire', nearby: ['redlands', 'colton', 'grand-terrace'] },
  { slug: 'grand-terrace', name: 'Grand Terrace', county: 'San Bernardino County', region: 'Inland Empire', cluster: 'Inland Empire', nearby: ['colton', 'loma-linda', 'riverside'] },
  { slug: 'jurupa-valley', name: 'Jurupa Valley', county: 'Riverside County', region: 'Inland Empire', cluster: 'Inland Empire', nearby: ['riverside', 'mira-loma', 'fontana'] },
  { slug: 'mira-loma', name: 'Mira Loma', county: 'Riverside County', region: 'Inland Empire', cluster: 'Inland Empire', nearby: ['jurupa-valley', 'riverside', 'ontario'] },
  { slug: 'devore', name: 'Devore', county: 'San Bernardino County', region: 'Inland Empire', cluster: 'Inland Empire', nearby: ['san-bernardino', 'rialto', 'fontana'] },

  { slug: 'oak-glen', name: 'Oak Glen', county: 'San Bernardino County', region: 'Yucaipa / Redlands', cluster: 'Yucaipa / Redlands', nearby: ['yucaipa', 'calimesa', 'redlands'] },
  { slug: 'calimesa', name: 'Calimesa', county: 'Riverside County', region: 'Yucaipa / Redlands', cluster: 'Yucaipa / Redlands', nearby: ['yucaipa', 'beaumont', 'redlands'] },
  { slug: 'cherry-valley', name: 'Cherry Valley', county: 'Riverside County', region: 'Yucaipa / Redlands', cluster: 'Yucaipa / Redlands', nearby: ['beaumont', 'banning', 'calimesa'] },
  { slug: 'mentone', name: 'Mentone', county: 'San Bernardino County', region: 'Yucaipa / Redlands', cluster: 'Yucaipa / Redlands', nearby: ['redlands', 'yucaipa', 'highland'] },
  { slug: 'beaumont', name: 'Beaumont', county: 'Riverside County', region: 'Yucaipa / Redlands', cluster: 'Yucaipa / Redlands', nearby: ['banning', 'calimesa', 'cherry-valley'] },
  { slug: 'banning', name: 'Banning', county: 'Riverside County', region: 'Yucaipa / Redlands', cluster: 'Yucaipa / Redlands', nearby: ['beaumont', 'cabazon', 'cherry-valley'] },
  { slug: 'running-springs', name: 'Running Springs', county: 'San Bernardino County', region: 'San Bernardino Mountains', cluster: 'Yucaipa / Redlands', nearby: ['lake-arrowhead', 'crestline', 'big-bear'] },
  { slug: 'lake-arrowhead', name: 'Lake Arrowhead', county: 'San Bernardino County', region: 'San Bernardino Mountains', cluster: 'Yucaipa / Redlands', nearby: ['crestline', 'running-springs', 'big-bear'] },
  { slug: 'crestline', name: 'Crestline', county: 'San Bernardino County', region: 'San Bernardino Mountains', cluster: 'Yucaipa / Redlands', nearby: ['lake-arrowhead', 'running-springs', 'san-bernardino'] },
  { slug: 'big-bear', name: 'Big Bear', county: 'San Bernardino County', region: 'San Bernardino Mountains', cluster: 'Yucaipa / Redlands', nearby: ['running-springs', 'lake-arrowhead', 'yuca-valley'] },

  { slug: 'moreno-valley', name: 'Moreno Valley', county: 'Riverside County', region: 'Riverside County', cluster: 'Riverside County', nearby: ['riverside', 'highgrove', 'san-jacinto'] },
  { slug: 'san-jacinto', name: 'San Jacinto', county: 'Riverside County', region: 'Riverside County', cluster: 'Riverside County', nearby: ['hemet', 'menifee', 'moreno-valley'] },
  { slug: 'lakeview', name: 'Lakeview', county: 'Riverside County', region: 'Riverside County', cluster: 'Riverside County', nearby: ['nuevo', 'san-jacinto', 'hemet'] },
  { slug: 'cabazon', name: 'Cabazon', county: 'Riverside County', region: 'Riverside County', cluster: 'Riverside County', nearby: ['banning', 'beaumont', 'palm-springs'] },
  { slug: 'nuevo', name: 'Nuevo', county: 'Riverside County', region: 'Riverside County', cluster: 'Riverside County', nearby: ['lakeview', 'san-jacinto', 'menifee'] },
  { slug: 'highgrove', name: 'Highgrove', county: 'Riverside County', region: 'Riverside County', cluster: 'Riverside County', nearby: ['riverside', 'grand-terrace', 'moreno-valley'] },
  { slug: 'norco', name: 'Norco', county: 'Riverside County', region: 'Riverside County', cluster: 'Riverside County', nearby: ['riverside', 'corona', 'jurupa-valley'] },
  { slug: 'menifee', name: 'Menifee', county: 'Riverside County', region: 'Riverside County', cluster: 'Riverside County', nearby: ['hemet', 'san-jacinto', 'nuevo'] },
  { slug: 'hemet', name: 'Hemet', county: 'Riverside County', region: 'Riverside County', cluster: 'Riverside County', nearby: ['san-jacinto', 'menifee', 'lakeview'] },

  { slug: 'ontario', name: 'Ontario', county: 'San Bernardino County', region: 'San Gabriel Valley / LA East', cluster: 'San Gabriel / LA East', nearby: ['upland', 'montclair', 'chino'] },
  { slug: 'montclair', name: 'Montclair', county: 'San Bernardino County', region: 'San Gabriel Valley / LA East', cluster: 'San Gabriel / LA East', nearby: ['upland', 'ontario', 'pomona'] },
  { slug: 'chino', name: 'Chino', county: 'San Bernardino County', region: 'San Gabriel Valley / LA East', cluster: 'San Gabriel / LA East', nearby: ['chino-hills', 'ontario', 'pomona'] },
  { slug: 'chino-hills', name: 'Chino Hills', county: 'San Bernardino County', region: 'San Gabriel Valley / LA East', cluster: 'San Gabriel / LA East', nearby: ['chino', 'diamond-bar', 'pomona'] },
  { slug: 'pomona', name: 'Pomona', county: 'Los Angeles County', region: 'San Gabriel Valley / LA East', cluster: 'San Gabriel / LA East', nearby: ['la-verne', 'montclair', 'chino'] },
  { slug: 'la-verne', name: 'La Verne', county: 'Los Angeles County', region: 'San Gabriel Valley / LA East', cluster: 'San Gabriel / LA East', nearby: ['san-dimas', 'pomona', 'glendora'] },
  { slug: 'san-dimas', name: 'San Dimas', county: 'Los Angeles County', region: 'San Gabriel Valley / LA East', cluster: 'San Gabriel / LA East', nearby: ['la-verne', 'glendora', 'azusa'] },
  { slug: 'azusa', name: 'Azusa', county: 'Los Angeles County', region: 'San Gabriel Valley / LA East', cluster: 'San Gabriel / LA East', nearby: ['glendora', 'covina', 'duarte'] },
  { slug: 'covina', name: 'Covina', county: 'Los Angeles County', region: 'San Gabriel Valley / LA East', cluster: 'San Gabriel / LA East', nearby: ['west-covina', 'azusa', 'glendora'] },
  { slug: 'west-covina', name: 'West Covina', county: 'Los Angeles County', region: 'San Gabriel Valley / LA East', cluster: 'San Gabriel / LA East', nearby: ['covina', 'baldwin-park', 'diamond-bar'] },
  { slug: 'glendora', name: 'Glendora', county: 'Los Angeles County', region: 'San Gabriel Valley / LA East', cluster: 'San Gabriel / LA East', nearby: ['azusa', 'san-dimas', 'covina'] },
  { slug: 'diamond-bar', name: 'Diamond Bar', county: 'Los Angeles County', region: 'San Gabriel Valley / LA East', cluster: 'San Gabriel / LA East', nearby: ['chino-hills', 'walnut', 'west-covina'] },

  { slug: 'pasadena', name: 'Pasadena', county: 'Los Angeles County', region: 'Greater Los Angeles', cluster: 'LA / Pasadena', nearby: ['south-pasadena', 'altadena', 'glendale'] },
  { slug: 'south-pasadena', name: 'South Pasadena', county: 'Los Angeles County', region: 'Greater Los Angeles', cluster: 'LA / Pasadena', nearby: ['pasadena', 'alhambra', 'san-gabriel'] },
  { slug: 'glendale', name: 'Glendale', county: 'Los Angeles County', region: 'Greater Los Angeles', cluster: 'LA / Pasadena', nearby: ['pasadena', 'altadena', 'los-angeles'] },
  { slug: 'altadena', name: 'Altadena', county: 'Los Angeles County', region: 'Greater Los Angeles', cluster: 'LA / Pasadena', nearby: ['pasadena', 'sierra-madre', 'glendale'] },
  { slug: 'alhambra', name: 'Alhambra', county: 'Los Angeles County', region: 'Greater Los Angeles', cluster: 'LA / Pasadena', nearby: ['south-pasadena', 'san-gabriel', 'rosemead'] },
  { slug: 'arcadia', name: 'Arcadia', county: 'Los Angeles County', region: 'Greater Los Angeles', cluster: 'LA / Pasadena', nearby: ['monrovia', 'sierra-madre', 'temple-city'] },
  { slug: 'el-monte', name: 'El Monte', county: 'Los Angeles County', region: 'Greater Los Angeles', cluster: 'LA / Pasadena', nearby: ['south-el-monte', 'baldwin-park', 'rosemead'] },
  { slug: 'baldwin-park', name: 'Baldwin Park', county: 'Los Angeles County', region: 'Greater Los Angeles', cluster: 'LA / Pasadena', nearby: ['west-covina', 'el-monte', 'covina'] },
  { slug: 'sierra-madre', name: 'Sierra Madre', county: 'Los Angeles County', region: 'Greater Los Angeles', cluster: 'LA / Pasadena', nearby: ['pasadena', 'arcadia', 'monrovia'] },
  { slug: 'monrovia', name: 'Monrovia', county: 'Los Angeles County', region: 'Greater Los Angeles', cluster: 'LA / Pasadena', nearby: ['arcadia', 'duarte', 'sierra-madre'] },
  { slug: 'temple-city', name: 'Temple City', county: 'Los Angeles County', region: 'Greater Los Angeles', cluster: 'LA / Pasadena', nearby: ['arcadia', 'rosemead', 'san-gabriel'] },
  { slug: 'rosemead', name: 'Rosemead', county: 'Los Angeles County', region: 'Greater Los Angeles', cluster: 'LA / Pasadena', nearby: ['san-gabriel', 'temple-city', 'alhambra'] },
  { slug: 'south-el-monte', name: 'South El Monte', county: 'Los Angeles County', region: 'Greater Los Angeles', cluster: 'LA / Pasadena', nearby: ['el-monte', 'rosemead', 'pico-rivera'] },
  { slug: 'duarte', name: 'Duarte', county: 'Los Angeles County', region: 'Greater Los Angeles', cluster: 'LA / Pasadena', nearby: ['monrovia', 'azusa', 'arcadia'] },
  { slug: 'san-gabriel', name: 'San Gabriel', county: 'Los Angeles County', region: 'Greater Los Angeles', cluster: 'LA / Pasadena', nearby: ['alhambra', 'rosemead', 'temple-city'] },
  { slug: 'west-puente-valley', name: 'West Puente Valley', county: 'Los Angeles County', region: 'Greater Los Angeles', cluster: 'LA / Pasadena', nearby: ['west-covina', 'baldwin-park', 'diamond-bar'] },
  { slug: 'whittier', name: 'Whittier', county: 'Los Angeles County', region: 'Greater Los Angeles', cluster: 'LA / Pasadena', nearby: ['pico-rivera', 'norwalk', 'downey'] },
  { slug: 'pico-rivera', name: 'Pico Rivera', county: 'Los Angeles County', region: 'Greater Los Angeles', cluster: 'LA / Pasadena', nearby: ['whittier', 'downey', 'south-el-monte'] },
  { slug: 'norwalk', name: 'Norwalk', county: 'Los Angeles County', region: 'Greater Los Angeles', cluster: 'LA / Pasadena', nearby: ['downey', 'whittier', 'pico-rivera'] },
  { slug: 'downey', name: 'Downey', county: 'Los Angeles County', region: 'Greater Los Angeles', cluster: 'LA / Pasadena', nearby: ['norwalk', 'pico-rivera', 'whittier'] },
  { slug: 'walnut', name: 'Walnut', county: 'Los Angeles County', region: 'Greater Los Angeles', cluster: 'LA / Pasadena', nearby: ['diamond-bar', 'west-covina', 'pomona'] },
];

const pageSlugsAlreadyPresent = new Set(['rancho-cucamonga', 'upland']);

export const expandedServiceAreas = requestedServiceAreas.filter((area) => !pageSlugsAlreadyPresent.has(area.slug));

export const serviceAreaClusters = Array.from(new Set(requestedServiceAreas.map((area) => area.cluster))).map((cluster) => ({
  cluster,
  areas: requestedServiceAreas.filter((area) => area.cluster === cluster),
}));

export function findExpandedServiceArea(slug: string): ExpandedServiceArea | undefined {
  return expandedServiceAreas.find((area) => area.slug === slug);
}
