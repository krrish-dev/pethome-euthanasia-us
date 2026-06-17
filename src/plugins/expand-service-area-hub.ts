import type { AstroIntegration } from 'astro';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import { serviceAreaClusters } from '../data/expanded-service-areas';

function areaCard(area: { slug: string; name: string; county: string; existing?: boolean }) {
  const badge = area.existing ? '<span class="expanded-area-link__badge">Existing page</span>' : '';

  return `
            <a class="expanded-area-link" href="/service-areas/${area.slug}" aria-label="${area.name} pet euthanasia service area">
              <span class="expanded-area-link__name">${area.name}</span>
              <span class="expanded-area-link__meta"><span>${area.county}</span>${badge}</span>
            </a>`;
}

function clusterBlock(cluster: string, areas: Array<{ slug: string; name: string; county: string; existing?: boolean }>) {
  return `
        <section class="expanded-area-group" aria-labelledby="expanded-area-${cluster.toLowerCase().replace(/[^a-z0-9]+/g, '-')}">
          <h3 class="expanded-area-group__title" id="expanded-area-${cluster.toLowerCase().replace(/[^a-z0-9]+/g, '-')}">${cluster}</h3>
          <div class="expanded-area-grid">${areas.map(areaCard).join('')}
          </div>
        </section>`;
}

const expandedHubStyles = `<style id="expanded-service-area-hub-styles">
  .expanded-service-area-hub {
    padding-block: clamp(3.5rem, 7vw, 5.5rem);
    background: linear-gradient(180deg, var(--color-surface-raised, #f7faf8) 0%, var(--color-bg, #ffffff) 100%);
  }

  .expanded-service-area-hub .container {
    max-width: 1120px;
  }

  .expanded-service-area-hub__intro {
    max-width: 780px;
    margin: 0 auto clamp(2rem, 4vw, 3rem);
    text-align: center;
  }

  .expanded-service-area-hub__intro .section-label {
    justify-content: center;
  }

  .expanded-service-area-hub__intro .section-heading {
    max-width: 760px;
    margin-inline: auto;
  }

  .expanded-service-area-hub__intro .lead {
    max-width: 72ch;
    margin-inline: auto;
  }

  .expanded-area-group {
    margin-top: clamp(1.75rem, 4vw, 3rem);
  }

  .expanded-area-group__title {
    margin: 0 0 1rem;
    padding-bottom: .65rem;
    border-bottom: 1px solid var(--color-border-subtle, #dbe7df);
    color: var(--color-text-primary, #10221d);
    font-size: clamp(1.35rem, 2.4vw, 1.9rem);
    line-height: 1.2;
  }

  .expanded-area-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: .85rem;
    align-items: stretch;
  }

  .expanded-area-link {
    display: flex;
    min-width: 0;
    min-height: 82px;
    flex-direction: column;
    justify-content: center;
    gap: .35rem;
    padding: 1rem 1.05rem;
    border: 1px solid var(--color-border-subtle, #dbe7df);
    border-radius: 16px;
    background: var(--color-bg, #ffffff);
    color: var(--color-text-primary, #10221d);
    text-decoration: none;
    box-shadow: 0 10px 28px rgba(16, 34, 29, .06);
    transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease, background .2s ease;
  }

  .expanded-area-link:hover,
  .expanded-area-link:focus-visible {
    border-color: var(--color-primary-300, #79b8a5);
    background: var(--color-primary-50, #f0faf6);
    box-shadow: 0 16px 34px rgba(16, 34, 29, .1);
    transform: translateY(-2px);
    outline: none;
  }

  .expanded-area-link__name {
    display: block;
    color: var(--color-primary-700, #0f766e);
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.25;
    overflow-wrap: anywhere;
  }

  .expanded-area-link__meta {
    display: flex;
    flex-wrap: wrap;
    gap: .35rem .5rem;
    color: var(--color-text-muted, #5f746c);
    font-size: .84rem;
    line-height: 1.35;
  }

  .expanded-area-link__badge {
    display: inline-flex;
    align-items: center;
    width: fit-content;
    border-radius: 999px;
    background: var(--color-primary-50, #f0faf6);
    color: var(--color-primary-700, #0f766e);
    font-size: .72rem;
    font-weight: 700;
    line-height: 1;
    padding: .22rem .48rem;
  }

  @media (max-width: 640px) {
    .expanded-service-area-hub {
      padding-block: 2.75rem;
    }

    .expanded-area-grid {
      grid-template-columns: 1fr;
      gap: .7rem;
    }

    .expanded-area-link {
      min-height: 74px;
      padding: .9rem;
    }
  }
</style>`;

export default function expandServiceAreaHub(): AstroIntegration {
  return {
    name: 'pethome-expand-service-area-hub',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const distDir = fileURLToPath(dir);
        const file = path.join(distDir, 'service-areas.html');
        if (!fs.existsSync(file)) return;

        let html = fs.readFileSync(file, 'utf-8');
        if (html.includes('expanded-service-area-hub')) return;

        if (!html.includes('expanded-service-area-hub-styles')) {
          html = html.includes('</head>')
            ? html.replace('</head>', `${expandedHubStyles}</head>`)
            : `${expandedHubStyles}${html}`;
        }

        const blocks = serviceAreaClusters.map(({ cluster, areas }) => clusterBlock(cluster, areas)).join('');
        const section = `<section class="expanded-service-area-hub" id="expanded-service-area-hub"><div class="container"><div class="expanded-service-area-hub__intro"><span class="section-label">Expanded coverage</span><h2 class="section-heading">Additional Southern California service areas</h2><p class="lead">These pages support local searches across High Desert, Inland Empire, Riverside County, San Gabriel Valley, and Greater Los Angeles communities.</p></div>${blocks}</div></section>`;

        fs.writeFileSync(file, html.replace('</main>', `${section}</main>`));
        logger.info('Expanded service area hub links injected.');
      },
    },
  };
}
