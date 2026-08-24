import { readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const indexHtml = readFileSync(resolve(root, 'index.html'), 'utf8');
const socialCardPath = resolve(root, 'public/social-card-v2.jpg');
const socialCardUrl = 'https://www.jpsurfboards.com.br/social-card-v2.jpg';
const socialTitle = 'JP Surf Boards | Shape Custom em Floripa';
const socialDescription = 'Pranchas sob medida, consertos e atendimento direto com o shaper.';

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function getMetaContent(attribute, value) {
  const pattern = new RegExp(
    `<meta\\s+${attribute}="${value}"\\s+content="([^"]+)"\\s*/?>`,
    'i',
  );
  return indexHtml.match(pattern)?.[1];
}

function getJpegSize(path) {
  const buffer = readFileSync(path);

  assert(buffer[0] === 0xff && buffer[1] === 0xd8, 'social-card-v2.jpg is not a JPEG');

  let offset = 2;
  while (offset < buffer.length) {
    assert(buffer[offset] === 0xff, 'Invalid JPEG marker');

    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    const isSizeMarker =
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf);

    if (isSizeMarker) {
      return {
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7),
      };
    }

    offset += 2 + length;
  }

  throw new Error('JPEG size marker not found');
}

assert(
  indexHtml.includes('<link rel="canonical" href="https://www.jpsurfboards.com.br/" />'),
  'Canonical URL must use the production www domain',
);
assert(getMetaContent('property', 'og:image') === socialCardUrl, 'og:image must use social-card-v2.jpg');
assert(getMetaContent('property', 'og:title') === socialTitle, 'og:title must stay concise for share cards');
assert(
  getMetaContent('property', 'og:description') === socialDescription,
  'og:description must stay concise for share cards',
);
assert(
  getMetaContent('property', 'og:image:secure_url') === socialCardUrl,
  'og:image:secure_url must use social-card-v2.jpg',
);
assert(getMetaContent('name', 'twitter:title') === socialTitle, 'twitter:title must match the social title');
assert(
  getMetaContent('name', 'twitter:description') === socialDescription,
  'twitter:description must match the social description',
);
assert(getMetaContent('name', 'twitter:image') === socialCardUrl, 'twitter:image must use social-card-v2.jpg');
assert(getMetaContent('property', 'og:image:type') === 'image/jpeg', 'og:image:type must be image/jpeg');
assert(getMetaContent('property', 'og:image:width') === '1200', 'og:image:width must be 1200');
assert(getMetaContent('property', 'og:image:height') === '630', 'og:image:height must be 630');

const { width, height } = getJpegSize(socialCardPath);
assert(width === 1200 && height === 630, `social-card-v2.jpg must be 1200x630, got ${width}x${height}`);

const sizeInMb = statSync(socialCardPath).size / 1024 / 1024;
assert(sizeInMb < 1, `social-card-v2.jpg should stay below 1MB, got ${sizeInMb.toFixed(2)}MB`);

console.log('SEO social metadata looks good.');
