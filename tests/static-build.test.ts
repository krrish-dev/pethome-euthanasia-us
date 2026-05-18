import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'node-html-parser';

const distDir = path.resolve(__dirname, '../dist');

function collectHtmlFiles(dir: string): string[] {
  const htmlFiles: string[] = [];

  function walk(currentDir: string) {
    if (!fs.existsSync(currentDir)) {
      return;
    }

    for (const entry of fs.readdirSync(currentDir)) {
      const entryPath = path.join(currentDir, entry);
      const stat = fs.statSync(entryPath);

      if (stat.isDirectory()) {
        walk(entryPath);
      } else if (entry.endsWith('.html')) {
        htmlFiles.push(entryPath);
      }
    }
  }

  walk(dir);
  return htmlFiles;
}

describe('Astro static build', () => {
  it('emits the primary HTML routes', () => {
    const expectedFiles = [
      'index.html',
      'about.html',
      'services.html',
      'pricing.html',
      'process.html',
      'faq.html',
      'contact.html',
      'service-areas.html',
      'service-areas/los-angeles.html',
    ];

    for (const relPath of expectedFiles) {
      expect(fs.existsSync(path.join(distDir, relPath)), `${relPath} should exist`).toBe(true);
    }
  });

  it('emits Astro sitemap and robots files for the current domain', () => {
    expect(fs.existsSync(path.join(distDir, 'sitemap-index.xml'))).toBe(true);
    expect(fs.existsSync(path.join(distDir, 'robots.txt'))).toBe(true);

    const robots = fs.readFileSync(path.join(distDir, 'robots.txt'), 'utf-8');
    expect(robots).toContain('User-agent: *');
    expect(robots).toContain('Allow: /');
    expect(robots).toContain('Sitemap: https://pethomeeuthanasia.us/sitemap-index.xml');
  });

  it('keeps one h1 per generated page', () => {
    const htmlFiles = collectHtmlFiles(distDir);
    expect(htmlFiles.length).toBeGreaterThan(0);

    for (const file of htmlFiles) {
      const root = parse(fs.readFileSync(file, 'utf-8'));
      expect(root.querySelectorAll('h1').length, `${file} should have exactly one h1`).toBe(1);
    }
  });

  it('keeps generated image assets available from public paths', () => {
    expect(fs.existsSync(path.join(distDir, 'assets/images/generated/home-hero-compassionate-care.png'))).toBe(true);
    expect(fs.existsSync(path.join(distDir, 'css/tokens.css'))).toBe(true);
    expect(fs.existsSync(path.join(distDir, 'js/site.js'))).toBe(true);
  });
});
