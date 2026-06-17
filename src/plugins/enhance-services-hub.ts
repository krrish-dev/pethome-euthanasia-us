import type { AstroIntegration } from 'astro';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

const serviceLinks = [
  ['/services/in-home-pet-euthanasia', 'In-Home Pet Euthanasia', 'Main home-visit service for dogs and cats.'],
  ['/services/dog-euthanasia-at-home', 'Dog Euthanasia at Home', 'Comfort-focused care for senior, painful, or immobile dogs.'],
  ['/services/cat-euthanasia-at-home', 'Cat Euthanasia at Home', 'Quiet low-stress support for cats.'],
  ['/services/mobile-pet-euthanasia', 'Mobile Pet Euthanasia', 'A licensed veterinarian comes to your home by appointment.'],
  ['/services/same-day-pet-euthanasia', 'Same-Day Pet Euthanasia', 'Urgent appointments when route and doctor availability allow.'],
  ['/services/pet-hospice-care', 'Pet Hospice Care', 'Quality-of-life guidance before an end-of-life decision.'],
  ['/services/pet-cremation-aftercare', 'Pet Cremation and Aftercare', 'Private and communal cremation planning.'],
];

function card([href, title, text]: string[]) {
  return `<a class="service-hub-card" href="${href}"><span>Service guide</span><h2>${title}</h2><p>${text}</p></a>`;
}

export default function enhanceServicesHub(): AstroIntegration {
  return {
    name: 'pethome-enhance-services-hub',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const distDir = fileURLToPath(dir);
        const file = path.join(distDir, 'services.html');
        if (!fs.existsSync(file)) return;

        const html = fs.readFileSync(file, 'utf-8');
        if (html.includes('service-hub-card')) return;

        const style = `<style>.service-hub-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1rem}.service-hub-card{display:block;padding:1.25rem;border:1px solid var(--color-border-subtle);border-radius:var(--radius-lg);background:var(--color-surface-raised);text-decoration:none;color:inherit}.service-hub-card span{font-size:.8rem;text-transform:uppercase;color:var(--color-primary-600);letter-spacing:.04em}.service-hub-card h2{font-size:1.25rem;margin:.5rem 0}.service-hub-card p{color:var(--color-text-body)}</style>`;
        const section = `${style}<section class="section" id="service-guides"><div class="container"><div style="text-align:center;margin-bottom:var(--space-8);"><span class="section-label" style="justify-content:center;">Detailed service guides</span><h2 class="section-heading" style="margin-inline:auto;">Choose the right service path</h2><p class="lead" style="max-width:70ch;margin-inline:auto;">These focused pages help families compare care by pet type, urgency, comfort needs, and aftercare planning.</p></div><div class="service-hub-grid">${serviceLinks.map(card).join('')}</div></div></section>`;
        fs.writeFileSync(file, html.replace('</main>', `${section}</main>`));
        logger.info('Services hub enhanced with internal service links.');
      },
    },
  };
}
