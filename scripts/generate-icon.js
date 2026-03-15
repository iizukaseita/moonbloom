const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');
const path = require('path');

// IconWithStars design from docs/reference/app-icon.jsx
// Background: indigo #1a1a4e, yorumaru full body + stars
function generateIconSvg(size) {
  const s = size;
  const cx = s / 2;
  const cy = s * 0.5;
  const r = s * 0.28;
  const ey = cy - r * 0.06;
  const es = r * 0.2;
  const my = cy + r * 0.24;
  const bg = '#1a1a4e';

  const C = {
    body: '#FFF8DC',
    outline: '#D4A843',
    cheek: '#FFD1A9',
    accent: '#FFF3C4',
  };

  const stars = [
    [0.15, 0.15],
    [0.82, 0.12],
    [0.12, 0.75],
    [0.88, 0.8],
    [0.5, 0.08],
    [0.25, 0.42],
    [0.78, 0.45],
  ];

  const starsXml = stars
    .map(
      ([x, y], i) =>
        `<circle cx="${s * x}" cy="${s * y}" r="${i % 3 === 0 ? s * 0.012 : s * 0.007}" fill="white" opacity="${0.3 + i * 0.08}"/>`,
    )
    .join('\n    ');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
  <rect width="${s}" height="${s}" rx="${s * 0.22}" fill="${bg}"/>
  <!-- Stars -->
  ${starsXml}
  <!-- Glow -->
  <circle cx="${cx}" cy="${cy}" r="${r + s * 0.06}" fill="${C.body}" opacity="0.08"/>
  <!-- Body -->
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.body}" stroke="${C.outline}" stroke-width="${s * 0.015}"/>
  <!-- Hat -->
  <g transform="translate(${cx + r * 0.32},${cy - r - r * 0.16})">
    <circle r="${r * 0.32}" fill="${C.body}" stroke="${C.outline}" stroke-width="${s * 0.013}"/>
    <circle cx="${r * 0.13}" cy="${-r * 0.08}" r="${r * 0.22}" fill="${bg}"/>
    <circle cx="${-r * 0.12}" cy="${-r * 0.15}" r="${r * 0.03}" fill="${C.accent}" opacity="0.9"/>
  </g>
  <!-- Arms -->
  <path d="M${cx - r + 2} ${cy + r * 0.15}Q${cx - r - s * 0.04} ${cy + r * 0.48} ${cx - r + 2} ${cy + r * 0.58}" stroke="${C.outline}" stroke-width="${s * 0.015}" fill="none" stroke-linecap="round"/>
  <path d="M${cx + r - 2} ${cy + r * 0.15}Q${cx + r + s * 0.04} ${cy + r * 0.48} ${cx + r - 2} ${cy + r * 0.58}" stroke="${C.outline}" stroke-width="${s * 0.015}" fill="none" stroke-linecap="round"/>
  <!-- Feet -->
  <ellipse cx="${cx - r * 0.35}" cy="${cy + r + s * 0.02}" rx="${r * 0.22}" ry="${r * 0.12}" fill="${C.body}" stroke="${C.outline}" stroke-width="${s * 0.013}"/>
  <ellipse cx="${cx + r * 0.35}" cy="${cy + r + s * 0.02}" rx="${r * 0.22}" ry="${r * 0.12}" fill="${C.body}" stroke="${C.outline}" stroke-width="${s * 0.013}"/>
  <!-- Face - Cheeks -->
  <ellipse cx="${cx - r * 0.38}" cy="${cy + r * 0.1}" rx="${r * 0.11}" ry="${r * 0.07}" fill="${C.cheek}" opacity="0.5"/>
  <ellipse cx="${cx + r * 0.38}" cy="${cy + r * 0.1}" rx="${r * 0.11}" ry="${r * 0.07}" fill="${C.cheek}" opacity="0.5"/>
  <!-- Eyes - happy squint -->
  <path d="M${cx - es - r * 0.06} ${ey + r * 0.02}Q${cx - es} ${ey - r * 0.06} ${cx - es + r * 0.06} ${ey + r * 0.02}" stroke="#2D2D3D" stroke-width="${s * 0.018}" fill="none" stroke-linecap="round"/>
  <path d="M${cx + es - r * 0.06} ${ey + r * 0.02}Q${cx + es} ${ey - r * 0.06} ${cx + es + r * 0.06} ${ey + r * 0.02}" stroke="#2D2D3D" stroke-width="${s * 0.018}" fill="none" stroke-linecap="round"/>
  <!-- Smile -->
  <path d="M${cx - r * 0.12} ${my - 1}Q${cx} ${my + r * 0.14} ${cx + r * 0.12} ${my - 1}" stroke="#2D2D3D" stroke-width="${s * 0.014}" fill="none" stroke-linecap="round"/>
</svg>`;
}

const svgString = generateIconSvg(1024);

const resvg = new Resvg(svgString, {
  fitTo: {
    mode: 'width',
    value: 1024,
  },
});

const pngData = resvg.render();
const pngBuffer = pngData.asPng();

const assetsDir = path.join(__dirname, '..', 'assets');

// Write icon.png
fs.writeFileSync(path.join(assetsDir, 'icon.png'), pngBuffer);
console.log('Generated assets/icon.png (1024x1024)');

// Also write splash-icon.png (same icon)
fs.writeFileSync(path.join(assetsDir, 'splash-icon.png'), pngBuffer);
console.log('Generated assets/splash-icon.png');

// Generate adaptive icon foreground (same image)
fs.writeFileSync(
  path.join(assetsDir, 'android-icon-foreground.png'),
  pngBuffer,
);
console.log('Generated assets/android-icon-foreground.png');

// Generate adaptive icon background (solid indigo)
const bgSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024">
  <rect width="1024" height="1024" fill="#1a1a4e"/>
</svg>`;
const bgResvg = new Resvg(bgSvg, { fitTo: { mode: 'width', value: 1024 } });
const bgPng = bgResvg.render().asPng();
fs.writeFileSync(path.join(assetsDir, 'android-icon-background.png'), bgPng);
console.log('Generated assets/android-icon-background.png');

// Monochrome icon (same as foreground for now)
fs.writeFileSync(
  path.join(assetsDir, 'android-icon-monochrome.png'),
  pngBuffer,
);
console.log('Generated assets/android-icon-monochrome.png');
