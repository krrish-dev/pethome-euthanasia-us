import type { AstroIntegration } from 'astro';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'node-html-parser';

const MAIN = 'https://pet' + 'homeeuthanasia' + 'service.com/';
const LABEL = 'Official Pet Home Euthanasia Service website';

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
          const html = root.toString();
          const bottom = root.querySelector('.site-footer__bottom');
          if (bottom && !html.includes(MAIN)) {
            bottom.appendChild(parse(`<span class="site-footer__main-site"><a href="${MAIN}" rel="noopener">${LABEL}</a></span>`));
          }
          fs.writeFileSync(f, root.toString());
          count += 1;
        }
        logger.info(`Official site link applied to ${count} pages.`);
      },
    },
  };
}
