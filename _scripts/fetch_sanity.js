// _scripts/fetch_sanity.js
import fs from 'fs';
import { toHTML } from '@portabletext/to-html';
import fetch from 'node-fetch';

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;
const token = process.env.SANITY_TOKEN;

// helper to convert Sanity images to URL
function getImageUrl(image) {
  if (!image || !image.asset || !image.asset._ref) return null;
  const ref = image.asset._ref;
  const parts = ref.split('-');
  const id = parts[1];
  const dims = parts[2];
  const format = parts[3];
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dims}.${format}`;
}

async function fetchType(type) {
  const query = `*[_type=="${type}"]`;
  const url = `https://${projectId}.api.sanity.io/v2023-01-01/data/query/${dataset}?query=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  const json = await res.json();

  return json.result.map(item => {
    // convert description Portable Text to HTML
    if (item.description) {
      item.descriptionHTML = toHTML(item.description, {
        block: (props) => `<p>${props.children.join('')}</p>`,
        marks: {
          strong: (text) => `<strong>${text}</strong>`,
          em: (text) => `<em>${text}</em>`,
          code: (text) => `<code>${text}</code>`
        }
      });
    }

    // convert images
    if (item.photos) {
      item.photos = item.photos.map(p => ({
        url: getImageUrl(p),
        caption: p.caption || "",
        alt: p.alt || ""
      }));
    }
    if (item.mainImage) {
      item.mainImage = {
        url: getImageUrl(item.mainImage),
        alt: item.mainImage.alt || "",
        caption: item.mainImage.caption || ""
      };
    }

    return item;
  });
}

async function fetchDivelogsOverview() {
  const query = `*[_id == "divelogsOverview"][0]`;
  const url = `https://${projectId}.api.sanity.io/v2023-01-01/data/query/${dataset}?query=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  const json = await res.json();
  const item = json.result;
  if (!item) {
    console.log('⚠️  No divelogsOverview document found in Sanity');
    return null;
  }
  if (item.body) {
    item.bodyHTML = toHTML(item.body, {
      block: (props) => `<p>${props.children.join('')}</p>`,
      marks: {
        strong: (text) => `<strong>${text}</strong>`,
        em: (text) => `<em>${text}</em>`,
        code: (text) => `<code>${text}</code>`
      }
    });
  }
  return item;
}

async function fetchDives() {
  const query = `*[_type == "dive"] | order(date desc)`;
  const url = `https://${projectId}.api.sanity.io/v2023-01-01/data/query/${dataset}?query=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  const json = await res.json();

  return json.result.map(item => {
    if (item.description) {
      item.descriptionHTML = toHTML(item.description, {
        block: (props) => `<p>${props.children.join('')}</p>`,
        marks: {
          strong: (text) => `<strong>${text}</strong>`,
          em: (text) => `<em>${text}</em>`,
          code: (text) => `<code>${text}</code>`
        }
      });
    }
    if (item.photos) {
      item.photos = item.photos.map(p => ({
        url: getImageUrl(p),
        caption: p.caption || "",
        alt: p.alt || ""
      }));
    }
    return item;
  });
}

async function fetchHomePage() {
  const query = `*[_id == "homePage"][0]`;
  const url = `https://${projectId}.api.sanity.io/v2023-01-01/data/query/${dataset}?query=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  const json = await res.json();

  const item = json.result;
  if (!item) {
    console.log('⚠️  No homePage document found in Sanity');
    return null;
  }

  // Convert heroImage to URL
  if (item.heroImage) {
    item.heroImageUrl = getImageUrl(item.heroImage);
  }

  // Convert body Portable Text to HTML
  if (item.body) {
    item.bodyHTML = toHTML(item.body, {
      block: (props) => `<p>${props.children.join('')}</p>`,
      marks: {
        strong: (text) => `<strong>${text}</strong>`,
        em: (text) => `<em>${text}</em>`,
        code: (text) => `<code>${text}</code>`
      }
    });
  }

  return item;
}

async function fetchAboutUs() {
  const query = `*[_id == "about-us"][0]`;
  const url = `https://${projectId}.api.sanity.io/v2023-01-01/data/query/${dataset}?query=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  const json = await res.json();
  const item = json.result;
  if (!item) {
    console.log('⚠️  No about-us document found in Sanity');
    return null;
  }
  if (item.heroImage) {
    item.heroImageUrl = getImageUrl(item.heroImage);
  }
  if (item.body) {
    item.bodyHTML = toHTML(item.body, {
      block: (props) => `<p>${props.children.join('')}</p>`,
      marks: {
        strong: (text) => `<strong>${text}</strong>`,
        em: (text) => `<em>${text}</em>`,
        code: (text) => `<code>${text}</code>`
      }
    });
  }
  return item;
}

async function fetchCertificationsOverview() {
  const query = `*[_id == "certifications"][0]`;
  const url = `https://${projectId}.api.sanity.io/v2023-01-01/data/query/${dataset}?query=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  const json = await res.json();
  const item = json.result;
  if (!item) {
    console.log('⚠️  No certifications overview document found in Sanity');
    return null;
  }
  if (item.body) {
    item.bodyHTML = toHTML(item.body, {
      block: (props) => `<p>${props.children.join('')}</p>`,
      marks: {
        strong: (text) => `<strong>${text}</strong>`,
        em: (text) => `<em>${text}</em>`,
        code: (text) => `<code>${text}</code>`
      }
    });
  }
  return item;
}

async function fetchCertifications() {
  const query = `*[_type == "certification"] | order(level asc)`;
  const url = `https://${projectId}.api.sanity.io/v2023-01-01/data/query/${dataset}?query=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  const json = await res.json();
  return json.result.map(item => {
    if (item.description) {
      item.descriptionHTML = toHTML(item.description, {
        block: (props) => `<p>${props.children.join('')}</p>`,
        marks: {
          strong: (text) => `<strong>${text}</strong>`,
          em: (text) => `<em>${text}</em>`,
          code: (text) => `<code>${text}</code>`
        }
      });
    }
    if (item.image) {
      item.imageUrl = getImageUrl(item.image);
    }
    return item;
  });
}

function escapeYaml(str) {
  return (str || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

async function main() {
  const divelogsOverview = await fetchDivelogsOverview();
  if (divelogsOverview) {
    fs.writeFileSync('_data/divelogs_overview.json', JSON.stringify(divelogsOverview, null, 2));
    console.log('✅ Fetched divelogsOverview singleton from Sanity!');
  }

  const dives = await fetchDives();
  fs.writeFileSync('_data/dives.json', JSON.stringify(dives, null, 2));
  console.log(`✅ Fetched ${dives.length} dives from Sanity!`);

  // Generate individual dive log detail pages
  fs.mkdirSync('_divelogs', { recursive: true });
  for (const dive of dives) {
    const slug = dive.slug?.current || dive._id;
    const title = dive.title || 'Duiklog';
    const dateStr = dive.date ? new Date(dive.date).toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
    const teaserUrl = dive.photos?.[0]?.url || null;
    const headerImageHtml = teaserUrl
      ? `<img src="${teaserUrl}" alt="${title}" class="divelog-detail__hero">`
      : '';
    const metaHtml = [
      dateStr ? `<span class="divelog-detail__date"><i class="fas fa-calendar-alt"></i> ${dateStr}</span>` : '',
      dive.location ? `<span class="divelog-detail__location"><i class="fas fa-map-marker-alt"></i> ${dive.location}</span>` : ''
    ].filter(Boolean).join('\n      ');
    const descHtml = dive.descriptionHTML || '';
    const galleryHtml = dive.photos && dive.photos.length > 0
      ? `<div class="divelog-detail__gallery">\n${dive.photos.map(p =>
          `      <figure class="divelog-detail__gallery-item">\n        <img src="${p.url}" alt="${p.alt || title}">\n        ${p.caption ? `<figcaption>${p.caption}</figcaption>` : ''}\n      </figure>`
        ).join('\n')}\n    </div>`
      : '';

    const fileContent = `---
layout: single
title: "${escapeYaml(title)}"
author_profile: false
---

<div class="divelog-detail">
  ${headerImageHtml}

  <div class="divelog-detail__meta">
    ${metaHtml}
  </div>

  <div class="divelog-detail__body">
    ${descHtml}
  </div>

  ${galleryHtml}

  <a href="/duiklogs/" class="btn btn--inverse">&larr; Terug naar duiklogs</a>
</div>

<style>
.divelog-detail__hero {
  width: 100%;
  max-height: 420px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}
.divelog-detail__meta {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  color: #555;
}
.divelog-detail__meta span {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.divelog-detail__body p {
  line-height: 1.7;
}
.divelog-detail__gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.75rem;
  margin: 2rem 0;
}
.divelog-detail__gallery-item img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 6px;
  display: block;
}
.divelog-detail__gallery-item figcaption {
  font-size: 0.82rem;
  text-align: center;
  margin-top: 0.3rem;
  color: #666;
}
</style>
`;
    fs.writeFileSync(`_divelogs/${slug}.html`, fileContent);
  }
  console.log(`✅ Generated ${dives.length} dive log detail pages in _divelogs/`);

  const homePage = await fetchHomePage();
  if (homePage) {
    fs.writeFileSync('_data/home_page.json', JSON.stringify(homePage, null, 2));
    console.log('✅ Fetched homePage singleton from Sanity!');
  }

  const aboutUs = await fetchAboutUs();
  if (aboutUs) {
    fs.writeFileSync('_data/about_us.json', JSON.stringify(aboutUs, null, 2));
    console.log('✅ Fetched about-us singleton from Sanity!');
  }

  const certificationsOverview = await fetchCertificationsOverview();
  if (certificationsOverview) {
    fs.writeFileSync('_data/certifications_overview.json', JSON.stringify(certificationsOverview, null, 2));
    console.log('✅ Fetched certifications overview from Sanity!');
  }

  const certifications = await fetchCertifications();
  fs.writeFileSync('_data/certifications.json', JSON.stringify(certifications, null, 2));
  console.log(`✅ Fetched ${certifications.length} certifications from Sanity!`);

  // Generate individual certification detail pages
  fs.mkdirSync('_certifications', { recursive: true });
  for (const cert of certifications) {
    const slug = cert.slug?.current || cert._id;
    const title = cert.title || 'Opleiding';
    const imageHtml = cert.imageUrl
      ? `<img src="${cert.imageUrl}" alt="${title}" class="certification-detail__image">`
      : `<img src="/assets/images/logo-duikteam-best.png" alt="${title}" class="certification-detail__image certification-detail__image--placeholder">`;
    const levelHtml = cert.level
      ? `<span class="certification-detail__level">${cert.level}</span>`
      : '';
    const descHtml = cert.descriptionHTML || '<p>Meer informatie volgt binnenkort.</p>';

    const fileContent = `---
layout: single
title: "${escapeYaml(title)}"
author_profile: false
---

<div class="certification-detail">
  <div class="certification-detail__header">
    ${imageHtml}
    <div class="certification-detail__meta">
      ${levelHtml}
      <h1 class="certification-detail__title">${title}</h1>
    </div>
  </div>

  <div class="certification-detail__body">
    ${descHtml}
  </div>

  <a href="/opleidingen/" class="btn btn--inverse">&larr; Terug naar opleidingen</a>
</div>

<style>
.certification-detail {
  max-width: 800px;
  margin: 0 auto;
}
.certification-detail__header {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}
.certification-detail__image {
  width: 240px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}
.certification-detail__image--placeholder {
  object-fit: contain;
  padding: 1rem;
  background: #f5f5f5;
}
.certification-detail__meta {
  flex: 1;
}
.certification-detail__level {
  display: inline-block;
  background: #0077b6;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}
.certification-detail__title {
  margin-top: 0.5rem;
}
.certification-detail__body p {
  line-height: 1.7;
}
</style>
`;
    fs.writeFileSync(`_certifications/${slug}.html`, fileContent);
  }
  console.log(`✅ Generated ${certifications.length} certification detail pages in _certifications/`);
}

main();