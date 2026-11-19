import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const CLOUD_NAME = 'lsyjstbv';
const API_KEY = '379457525466968';
const API_SECRET = 'F89XOoMXgsWGdESsYn61PHcAa7Q';

const DIR = 'C:/Users/ritam/Downloads/Core Mem/Dignitaroies/New folder';

const files = fs.readdirSync(DIR).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
console.log(`Found ${files.length} images to upload.`);

async function uploadFile(fileName) {
  const fullPath = path.join(DIR, fileName);
  const ext = path.extname(fileName).toLowerCase();
  const mimeType = ext === '.webp' ? 'image/webp' : ext === '.png' ? 'image/png' : 'image/jpeg';
  const fileBuffer = fs.readFileSync(fullPath);
  const base64Data = `data:${mimeType};base64,${fileBuffer.toString('base64')}`;

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = 'sanskaran_2026/hero_slideshow';
  const publicId = path.basename(fileName, ext).toLowerCase().replace(/[^a-z0-9_-]/g, '_');

  const paramsToSign = `folder=${folder}&public_id=${publicId}&timestamp=${timestamp}${API_SECRET}`;
  const signature = crypto.createHash('sha1').update(paramsToSign).digest('hex');

  const formData = new URLSearchParams();
  formData.append('file', base64Data);
  formData.append('api_key', API_KEY);
  formData.append('timestamp', timestamp.toString());
  formData.append('folder', folder);
  formData.append('public_id', publicId);
  formData.append('signature', signature);

  console.log(`Uploading ${fileName}...`);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData
  });

  const json = await res.json();
  if (json.error) {
    console.error(`Error uploading ${fileName}:`, json.error);
    return null;
  }

  const optimizedUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto:good,w_1920,c_limit/${json.public_id}`;
  const thumbUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto:low,w_40,e_blur:1000/${json.public_id}`;

  console.log(`✓ Uploaded ${fileName}`);
  return {
    file: fileName,
    publicId: json.public_id,
    secureUrl: json.secure_url,
    optimizedUrl,
    thumbUrl,
    width: json.width,
    height: json.height
  };
}

async function run() {
  const results = [];
  // Upload in chunks of 4 concurrent uploads to maximize speed
  const chunkSize = 4;
  for (let i = 0; i < files.length; i += chunkSize) {
    const chunk = files.slice(i, i + chunkSize);
    const chunkResults = await Promise.all(chunk.map(uploadFile));
    results.push(...chunkResults.filter(Boolean));
  }

  const outPath = path.resolve('src/lib/heroSlideshowAssets.json');
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`Done! Saved ${results.length} assets to ${outPath}`);
}

run().catch(console.error);
