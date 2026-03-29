import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const files = [];
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p);
    else if (name.endsWith('.scss') && !p.includes(`${path.sep}settings${path.sep}colors.scss`)) files.push(p);
  }
}
walk(path.join(root, 'src'));

function mix(fgVar, alpha) {
  const pct = Math.round(parseFloat(alpha) * 1000) / 10;
  return `color-mix(in srgb, ${fgVar} ${pct}%, transparent)`;
}

function transform(content) {
  let s = content;

  const rgbaReplace = (re, varName) => {
    s = s.replace(re, (_, a) => mix(varName, a));
  };

  rgbaReplace(/rgba\(\$white,\s*([\d.]+)\)/g, 'var(--theme-fg)');
  rgbaReplace(/rgba\(\$navy-950,\s*([\d.]+)\)/g, 'var(--theme-navy-950)');
  rgbaReplace(/rgba\(\$navy-900,\s*([\d.]+)\)/g, 'var(--theme-navy-900)');
  rgbaReplace(/rgba\(\$navy-850,\s*([\d.]+)\)/g, 'var(--theme-navy-850)');
  rgbaReplace(/rgba\(\$navy-800,\s*([\d.]+)\)/g, 'var(--theme-navy-800)');
  rgbaReplace(/rgba\(\$navy-750,\s*([\d.]+)\)/g, 'var(--theme-navy-750)');
  rgbaReplace(/rgba\(\$black,\s*([\d.]+)\)/g, 'var(--theme-shadow)');
  rgbaReplace(/rgba\(\$cyan-base,\s*([\d.]+)\)/g, 'var(--theme-cyan)');
  rgbaReplace(/rgba\(\$purple-muted,\s*([\d.]+)\)/g, 'var(--theme-purple-muted)');
  rgbaReplace(/rgba\(\$blue-base,\s*([\d.]+)\)/g, 'var(--theme-blue-base)');
  rgbaReplace(/rgba\(\$blue-light,\s*([\d.]+)\)/g, 'var(--theme-blue-light)');
  rgbaReplace(/rgba\(\$blue-dark,\s*([\d.]+)\)/g, 'var(--theme-blue-dark)');
  rgbaReplace(/rgba\(\$pink-base,\s*([\d.]+)\)/g, 'var(--theme-pink-base)');
  rgbaReplace(/rgba\(\$pink-accent,\s*([\d.]+)\)/g, 'var(--theme-pink-accent)');
  rgbaReplace(/rgba\(\$pink-hot,\s*([\d.]+)\)/g, 'var(--theme-pink-hot)');
  rgbaReplace(/rgba\(\$blue-facebook,\s*([\d.]+)\)/g, 'var(--theme-blue-facebook)');
  rgbaReplace(/rgba\(\$blue-social,\s*([\d.]+)\)/g, 'var(--theme-blue-social)');
  rgbaReplace(/rgba\(\$red-social,\s*([\d.]+)\)/g, 'var(--theme-red-social)');
  rgbaReplace(/rgba\(\$teal-linkedin,\s*([\d.]+)\)/g, 'var(--theme-teal-linkedin)');
  rgbaReplace(/rgba\(\$yellow-base,\s*([\d.]+)\)/g, 'var(--theme-yellow-base)');
  const map = [
    [/\$navy-950\b/g, 'var(--theme-navy-950)'],
    [/\$navy-900\b/g, 'var(--theme-navy-900)'],
    [/\$navy-850\b/g, 'var(--theme-navy-850)'],
    [/\$navy-800\b/g, 'var(--theme-navy-800)'],
    [/\$navy-750\b/g, 'var(--theme-navy-750)'],
    [/\$white\b/g, 'var(--theme-fg)'],
    [/\$cyan-base\b/g, 'var(--theme-cyan)'],
    [/\$purple-muted\b/g, 'var(--theme-purple-muted)'],
    [/\$blue-base\b/g, 'var(--theme-blue-base)'],
    [/\$blue-light\b/g, 'var(--theme-blue-light)'],
    [/\$blue-dark\b/g, 'var(--theme-blue-dark)'],
    [/\$pink-base\b/g, 'var(--theme-pink-base)'],
    [/\$pink-accent\b/g, 'var(--theme-pink-accent)'],
    [/\$pink-hot\b/g, 'var(--theme-pink-hot)'],
    [/\$blue-legacy\b/g, 'var(--theme-blue-legacy)'],
    [/\$blue-facebook\b/g, 'var(--theme-blue-facebook)'],
    [/\$blue-social\b/g, 'var(--theme-blue-social)'],
    [/\$red-social\b/g, 'var(--theme-red-social)'],
    [/\$teal-linkedin\b/g, 'var(--theme-teal-linkedin)'],
    [/\$yellow-base\b/g, 'var(--theme-yellow-base)'],
    [/\$red-base\b/g, '#e51e38'],
    [/\$orange-base\b/g, '#ff8c00'],
    [/\$green-base\b/g, '#197a4e'],
    [/\$teal-linkedin\b/g, '#0e76a8'],
  ];

  for (const [re, rep] of map) {
    s = s.replace(re, rep);
  }

  s = s.replace(/\$black\b/g, 'var(--theme-on-accent)');

  return s;
}

  for (const file of files) {
  const before = fs.readFileSync(file, 'utf8');
  if (!before.includes('$')) continue;
  const after = transform(before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    console.log('updated', path.relative(root, file));
  }
}
