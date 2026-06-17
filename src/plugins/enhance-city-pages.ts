import type { AstroIntegration } from 'astro';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

type City = { slug: string; name: string; county: string; area: string; nearby: string[]; note: string };

const cities: City[] = [
  { slug: 'victorville', name: 'Victorville', county: 'San Bernardino County', area: 'High Desert', nearby: ['Apple Valley', 'Hesperia', 'Phelan'], note: 'families often need clear travel windows because desert routes can be spread out' },
  { slug: 'apple-valley', name: 'Apple Valley', county: 'San Bernardino County', area: 'High Desert', nearby: ['Victorville', 'Hesperia', 'Phelan'], note: 'many homes have quiet outdoor or single-level spaces that can make planning easier for large dogs' },
  { slug: 'hesperia', name: 'Hesperia', county: 'San Bernardino County', area: 'High Desert', nearby: ['Victorville', 'Apple Valley', 'Phelan'], note: 'appointment planning often includes route timing between High Desert communities' },
  { slug: 'san-bernardino', name: 'San Bernardino', county: 'San Bernardino County', area: 'Inland Empire', nearby: ['Rialto', 'Highland', 'Redlands'], note: 'families often compare home care with nearby clinic options when mobility is difficult' },
  { slug: 'rancho-cucamonga', name: 'Rancho Cucamonga', county: 'San Bernardino County', area: 'Inland Empire', nearby: ['Upland', 'Ontario', 'Fontana'], note: 'local appointments can often be coordinated with surrounding Inland Empire service routes' },
  { slug: 'riverside', name: 'Riverside', county: 'Riverside County', area: 'Inland Empire', nearby: ['Moreno Valley', 'Corona', 'San Bernardino'], note: 'families commonly ask about timing, aftercare, and whether same-day support is possible' },
  { slug: 'fontana', name: 'Fontana', county: 'San Bernardino County', area: 'Inland Empire', nearby: ['Rancho Cucamonga', 'Rialto', 'Upland'], note: 'home visits can reduce travel stress for pets that struggle with car rides or clinic anxiety' },
  { slug: 'redlands', name: 'Redlands', county: 'San Bernardino County', area: 'Inland Empire', nearby: ['Highland', 'San Bernardino', 'Loma Linda'], note: 'families often want a calm plan that includes both the goodbye and respectful aftercare' },
  { slug: 'upland', name: 'Upland', county: 'San Bernardino County', area: 'Inland Empire', nearby: ['Rancho Cucamonga', 'Claremont', 'Ontario'], note: 'appointments are commonly planned around senior pets with mobility or pain concerns' },
  { slug: 'los-angeles', name: 'Los Angeles', county: 'Los Angeles County', area: 'Greater Los Angeles', nearby: ['Glendale', 'Pasadena', 'Burbank'], note: 'families often need appointment windows that account for traffic, parking, and aftercare timing' },
];

function citySection(city: City) {
  const nearbyText = city.nearby.join(', ');
  return `<section class="content-section local-depth-section" style="background:var(--color-surface-raised);"><div class="container" style="max-width:64rem;"><span class="section-label" style="justify-content:center;">Local care detail</span><h2 class="section-heading" style="margin-inline:auto;text-align:center;">In-home pet care planning in ${city.name}</h2><p class="lead">${city.name} families in ${city.county} usually need more than a generic appointment page. They need practical guidance on timing, comfort, aftercare, and whether a home visit is the gentlest choice for a dog or cat that should not travel.</p><p>In the ${city.area}, ${city.note}. Nearby communities often include ${nearbyText}, so scheduling is best confirmed by phone with your pet's approximate weight, current condition, and aftercare preference.</p><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem;margin-top:1.5rem;"><a class="nearby-link" href="/services/dog-euthanasia-at-home">Dog euthanasia at home</a><a class="nearby-link" href="/services/cat-euthanasia-at-home">Cat euthanasia at home</a><a class="nearby-link" href="/resources/quality-of-life-scale">Quality of life scale</a><a class="nearby-link" href="/services/pet-cremation-aftercare">Aftercare options</a></div></div></section>`;
}

export default function enhanceCityPages(): AstroIntegration {
  return {
    name: 'pethome-enhance-city-pages',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const distDir = fileURLToPath(dir);
        let count = 0;
        for (const city of cities) {
          const file = path.join(distDir, 'service-areas', `${city.slug}.html`);
          if (!fs.existsSync(file)) continue;
          const html = fs.readFileSync(file, 'utf-8');
          if (html.includes('local-depth-section')) continue;
          fs.writeFileSync(file, html.replace('</main>', `${citySection(city)}</main>`));
          count += 1;
        }
        logger.info(`Enhanced ${count} priority city pages with local depth content.`);
      },
    },
  };
}
