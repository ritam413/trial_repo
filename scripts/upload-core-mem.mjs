import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const CLOUD_NAME = 'lsyjstbv';
const API_KEY = '379457525466968';
const API_SECRET = 'F89XOoMXgsWGdESsYn61PHcAa7Q';

const BASE_DIR = 'C:/Users/ritam/Downloads/Core Mem';

// Targets to process
const tasks = [
  // Core Members (depth 1)
  { type: 'core', file: 'Archisha.jpg', name: 'ARCHISHA' },
  { type: 'core', file: 'Arnab.jpg', name: 'ARNAB' },
  { type: 'core', file: 'Ayan.jpg', name: 'AYAN' },
  { type: 'core', file: 'Bhumi.jpg', name: 'BHUMI' },
  { type: 'core', file: 'Chadni.jpg', name: 'CHADNI' },
  { type: 'core', file: 'Debarun.jpg', name: 'DEBARUN' },
  { type: 'core', file: 'Jagrit.jpg', name: 'JAGRIT' },
  { type: 'core', file: 'Nayan.jpg', name: 'NAYAN' },
  { type: 'core', file: 'Preetisha.jpg', name: 'PREETISHA' },
  { type: 'core', file: 'Sagnik.jpg', name: 'SAGNIK' },
  { type: 'core', file: 'Shoaib.jpg', name: 'SHOAIB' },
  { type: 'core', file: 'Sukanta.jpg', name: 'SUKANTA' },

  // Dignitaries
  { type: 'dignitary', file: 'Dignitaroies/Prof. Dr. Rina Paladhi.jpeg', name: 'PROF. DR. RINA PALADHI' },
  { type: 'dignitary', file: 'Dignitaroies/Prof. Ishan Ghosh.jpeg', name: 'PROF. ISHAN GHOSH' },
  { type: 'dignitary', file: 'Dignitaroies/sujoy-C0M-3GQ8.webp', name: 'PROF. DR. SUJOY BISWAS' },

  // Founders
  { type: 'founder', file: 'Dignitaroies/Founders/Partha Sarathi Pal.jpeg', name: 'PARTHA SARATHI PAL' },
  { type: 'founder', file: 'Dignitaroies/Founders/Sayan Chakraborty.jpeg', name: 'SAYAN CHAKRABORTY' }
];

async function uploadFile(task) {
  const fullPath = path.join(BASE_DIR, task.file);
  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`);
    return null;
  }

  const ext = path.extname(task.file).toLowerCase();
  const mimeType = ext === '.webp' ? 'image/webp' : ext === '.png' ? 'image/png' : 'image/jpeg';
  const fileBuffer = fs.readFileSync(fullPath);
  const base64Data = `data:${mimeType};base64,${fileBuffer.toString('base64')}`;

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = `sanskaran_2026/${task.type === 'core' ? 'core_members' : task.type === 'dignitary' ? 'dignitaries' : 'founders'}`;
  const publicId = path.basename(task.file, path.extname(task.file)).toLowerCase().replace(/[^a-z0-9_-]/g, '_');

  // Sorted params for signature: folder, public_id, timestamp
  const paramsToSign = `folder=${folder}&public_id=${publicId}&timestamp=${timestamp}${API_SECRET}`;
  const signature = crypto.createHash('sha1').update(paramsToSign).digest('hex');

  const formData = new URLSearchParams();
  formData.append('file', base64Data);
  formData.append('api_key', API_KEY);
  formData.append('timestamp', timestamp.toString());
  formData.append('folder', folder);
  formData.append('public_id', publicId);
  formData.append('signature', signature);

  console.log(`Uploading ${task.file} to ${folder}/${publicId}...`);
  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData
  });

  const resJson = await response.json();
  if (resJson.error) {
    console.error(`Error uploading ${task.file}:`, resJson.error);
    return null;
  }

  // Generate ultra-optimized Cloudinary delivery URL:
  // f_auto: automatic modern format (AVIF/WebP)
  // q_auto:best: perceptual quality compression without visual loss
  // w_800,c_limit: max width 800px for lightning 5ms edge CDN delivery
  const optimizedUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto:good,w_800,c_limit/${resJson.public_id}`;
  const thumbnailBlurUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto:low,w_40,e_blur:1000/${resJson.public_id}`;

  console.log(`✓ Uploaded ${task.name}: ${optimizedUrl}`);
  return {
    ...task,
    publicId: resJson.public_id,
    secureUrl: resJson.secure_url,
    optimizedUrl,
    thumbnailBlurUrl,
    width: resJson.width,
    height: resJson.height
  };
}

async function run() {
  console.log(`Starting upload of ${tasks.length} images to Cloudinary (${CLOUD_NAME})...`);
  const results = [];
  for (const task of tasks) {
    const res = await uploadFile(task);
    if (res) results.push(res);
  }

  const outputPath = path.resolve('src/lib/cloudinaryAssets.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`Successfully processed and saved ${results.length} asset mappings to ${outputPath}!`);
}

run().catch(console.error);

