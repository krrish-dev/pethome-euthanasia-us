import type { AstroIntegration } from 'astro';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

const MAIN = 'https://pet' + 'homeeuthanasia' + 'service.com/';

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

export default function addSameAs(): AstroIntegration {
  return {
    name: 'pethome-add-same-as',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const dist = fileURLToPath(dir);
        let count = 0;
        for (const f of files(dist)) {
          let html = fs.readFileSync(f, 'utf-8');
          if (!html.includes('data-rich-schema="true"') || html.includes('"sameAs"')) continue;
          html = html.replace('"openingHours":"Mo-Su 08:00-20:00"', `"openingHours":"Mo-Su 08:00-20:00","sameAs":["${MAIN}"]`);
          fs.writeFileSync(f, html);
          count += 1;
        }
        logger.info(`sameAs relationship applied to ${count} pages.`);
      },
    },
  };
}
