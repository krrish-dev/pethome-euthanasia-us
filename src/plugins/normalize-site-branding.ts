import type { AstroIntegration } from 'astro';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'node-html-parser';

const BRAND = 'Pet Home Euthanasia Service';
const IMG = '/assets/images/generated/home-hero-compassionate-care.png';

function htmlFiles(dir: string): string[] {
  const out: string[] = [];
  const walk = (current: string) => {
    for (const entry of fs.readdirSync(current)) {
      const p = path.join(current, entry);
      const s = fs.statSync(p);
      if (s.isDirectory()) walk(p);
      else if (entry.endsWith('.html')) out.push(p);
    }
  };
  walk(dir);
  return out;
}

function ensureStyles(head: ReturnType<typeof parse>) {
  const html = head.toString();
  if (!html.includes('/css/seo-layout.css')) head.appendChild(parse('<link rel="stylesheet" href="/css/seo-layout.css">'));
  if (!html.includes('/css/footer.css')) head.appendChild(parse('<link rel="stylesheet" href="/css/footer.css">'));
}

function footerHtml() {
  return `<footer class="site-footer" aria-label="Site footer"><div class="container"><div class="site-footer__grid"><div><a class="site-footer__brand" href="/"><img src="${IMG}" alt="" width="72" height="72" loading="lazy" decoding="async"><span>${BRAND}</span></a><p class="site-footer__tagline">Compassionate in-home pet euthanasia, pet hospice guidance, and aftercare support for Southern California families.</p><p><a href="tel:+17609120848">(760) 912-0848</a></p></div><nav aria-label="Footer services"><span class="site-footer__title">Services</span><ul class="site-footer__links"><li><a href="/services/in-home-pet-euthanasia">In-home pet euthanasia</a></li><li><a href="/services/dog-euthanasia-at-home">Dog euthanasia at home</a></li><li><a href="/services/cat-euthanasia-at-home">Cat euthanasia at home</a></li><li><a href="/services/pet-cremation-aftercare">Aftercare options</a></li></ul></nav><nav aria-label="Footer resources"><span class="site-footer__title">Resources</span><ul class="site-footer__links"><li><a href="/resources/quality-of-life-scale">Quality of life scale</a></li><li><a href="/resources/how-to-know-when-it-is-time">When is it time?</a></li><li><a href="/resources/what-to-expect-during-in-home-pet-euthanasia">What to expect</a></li><li><a href="/reviews">Reviews</a></li></ul></nav><nav aria-label="Footer areas"><span class="site-footer__title">Service Areas</span><ul class="site-footer__links"><li><a href="/service-areas/victorville">Victorville</a></li><li><a href="/service-areas/apple-valley">Apple Valley</a></li><li><a href="/service-areas/hesperia">Hesperia</a></li><li><a href="/service-areas/riverside">Riverside</a></li><li><a href="/service-areas/los-angeles">Los Angeles</a></li></ul></nav></div><div class="site-footer__bottom"><span>© 2026 ${BRAND}. All rights reserved.</span><span>7 days a week • By appointment only</span></div></div></footer>`;
}

export default function normalizeSiteBranding(): AstroIntegration {
  return {
    name: 'pethome-normalize-site-branding',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const dist = fileURLToPath(dir);
        let count = 0;
        for (const file of htmlFiles(dist)) {
          const root = parse(fs.readFileSync(file, 'utf-8'));
          const head = root.querySelector('head');
          if (head) ensureStyles(head);
          root.querySelectorAll('.nav__brand').forEach((node) => { node.set_content(BRAND); node.setAttribute('href', '/'); });
          root.querySelectorAll('title').forEach((node) => node.set_content(node.text.replace(/Pet Home Euthanasia US/g, BRAND).replace(/\| Pet Home Euthanasia$/g, `| ${BRAND}`)));
          root.querySelectorAll('footer').forEach((node) => node.remove());
          root.querySelectorAll('.footer-seo-links').forEach((node) => node.remove());
          root.querySelector('body')?.appendChild(parse(footerHtml()));
          fs.writeFileSync(file, root.toString());
          count += 1;
        }
        logger.info(`Official branding and footer normalized on ${count} pages.`);
      },
    },
  };
}
