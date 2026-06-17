const SITE = 'https://pethomeeuthanasia.us';
const BUSINESS_ID = `${SITE}/#business`;
const WEBSITE_ID = `${SITE}/#website`;

function label(segment: string) {
  return segment
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function businessSchema() {
  return {
    '@type': ['LocalBusiness', 'VeterinaryCare'],
    '@id': BUSINESS_ID,
    name: 'Pet Home Euthanasia',
    url: `${SITE}/`,
    telephone: '+1-760-912-0848',
    email: 'pethomeeuthanasiaservice@gmail.com',
    priceRange: '$$-$$$',
    openingHours: 'Mo-Su 08:00-20:00',
    areaServed: ['Southern California', 'San Bernardino County', 'Riverside County', 'Los Angeles County', 'Orange County'],
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE}/`,
    name: 'Pet Home Euthanasia',
    publisher: { '@id': BUSINESS_ID },
    inLanguage: 'en-US',
  };
}

export function breadcrumbSchema(pathname: string) {
  const items: Array<Record<string, unknown>> = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
  ];

  if (pathname !== '/') {
    let currentPath = '';
    pathname.split('/').filter(Boolean).forEach((segment, index) => {
      currentPath += `/${segment}`;
      items.push({
        '@type': 'ListItem',
        position: index + 2,
        name: label(segment),
        item: `${SITE}${currentPath}`,
      });
    });
  }

  return { '@type': 'BreadcrumbList', '@id': `${SITE}${pathname}#breadcrumbs`, itemListElement: items };
}

export function faqSchema(canonical: string, faqs: Array<{ question: string; answer: string }>) {
  return {
    '@type': 'FAQPage',
    '@id': `${canonical}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function serviceSchema(canonical: string, name: string, description: string) {
  return {
    '@type': 'Service',
    '@id': `${canonical}#service`,
    name,
    description,
    serviceType: 'In-home pet euthanasia service',
    provider: { '@id': BUSINESS_ID },
    areaServed: 'Southern California',
    url: canonical,
  };
}

export function webpageSchema(canonical: string, name: string, description: string) {
  return {
    '@type': 'WebPage',
    '@id': `${canonical}#webpage`,
    url: canonical,
    name,
    headline: name,
    description,
    isPartOf: { '@id': WEBSITE_ID },
    publisher: { '@id': BUSINESS_ID },
    inLanguage: 'en-US',
  };
}

export function graphSchema(items: Array<Record<string, unknown>>) {
  return { '@context': 'https://schema.org', '@graph': [businessSchema(), websiteSchema(), ...items] };
}
