import type { AstroIntegration } from 'astro';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import { serviceAreaClusters } from '../data/expanded-service-areas';

function areaCard(area: { slug: string; name: string; county: string; existing?: boolean }) {
  return `<a class="city-link expanded-area-link" href="/service-areas/${area.slug}"><span>${area.name}</span><small>${area.county}${area.existing ? ' • existing page' : ''}</small></a>`;
}

function clusterBlock(cluster: string, areas: Array<{ slug: string; name: string; county: string; existing?: boolean }>) {
  return `<section class="area-group expanded-area-group"><h2 class="area-group__title">${cluster}</h2><div class="city-grid expanded-area-grid">${areas.map(areaCard).join('')}</div></section>`;
}

export default function expandServiceAreaHub(): AstroIntegration {
  return {
    name: 'pethome-expand-service-area-hub',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const distDir = fileURLToPath(dir);
        const file = path.join(distDir, 'service-areas.html');
        if (!fs.existsSync(file)) return;

        const html = fs.readFileSync(file, 'utf-8');
        if (html.includes('expanded-service-area-hub')) return;

        const blocks = serviceAreaClusters.map(({ cluster, areas }) => clusterBlock(cluster, areas)).join('');
        const section = `<section class="section expanded-service-area-hub" id="expanded-service-area-hub"><div class="container"><div style="text-align:center;margin-bottom:var(--space-10);"><span class="section-label" style="justify-content:center;">Expanded coverage</span><h2 class="section-heading" style="margin-inline:auto;">Additional Southern California service areas</h2><p class="lead" style="max-width:72ch;margin-inline:auto;">These pages support local searches across High Desert, Inland Empire, Riverside County, San Gabriel Valley, and Greater Los Angeles communities.</p></div>${blocks}</div></section>`;

        fs.writeFileSync(file, html.replace('</main>', `${section}</main>`));
        logger.info('Expanded service area hub links injected.');
      },
    },
  };
}
