import type { AstroIntegration } from 'astro';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'node-html-parser';

const MAIN = 'https://pet' + 'homeeuthanasia' + 'service.com/';
const MAIN_LABEL = 'Official Pet Home Euthanasia Service website';
const COMPANY = 'https://krrish.it/en/';
const COMPANY_LABEL = 'Designed and developed with ♥ by Krrish.it';

function files(dir: string): string[] {
  const out: string[] = [];
  const walk = (d: string) => {
    for (const e of fs.readdirSync(d)) {
      const p = path.join(d, e);
      const s = fs.statSync(p);
      if (s.isDirectory()) walk(p);
      else if (e.endsWith('.html')) out.push(p);
    }
  };
  walk(dir);
  return out;
}

export default function addOfficialSiteLink(): AstroIntegration {
  return {
    name: 'pethome-add-official-site-link',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const dist = fileURLToPath(dir);
        let count = 0;

        for (const f of files(dist)) {
          const root = parse(fs.readFileSync(f, 'utf-8'));
          const bottom = root.querySelector('.site-footer__bottom');

          if (bottom) {
            const html = root.toString();

            if (!html.includes(MAIN)) {
              bottom.appendChild(
                parse(
                  `<span class="site-footer__main-site"><a href="${MAIN}" rel="noopener">${MAIN_LABEL}</a></span>`,
                ),
              );
            }

            if (!html.includes(COMPANY)) {
              bottom.appendChild(
                parse(
                  `<span class="site-footer__credit"><a href="${COMPANY}" target="_blank" rel="noopener noreferrer">${COMPANY_LABEL}</a></span>`,
                ),
              );
            }
          }

          fs.writeFileSync(f, root.toString());
          count += 1;
        }

        logger.info(`Footer links applied to ${count} pages.`);
      },
    },
  };
}
