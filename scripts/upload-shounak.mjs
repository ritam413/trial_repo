import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const CLOUD_NAME = 'lsyjstbv';
const API_KEY = '379457525466968';
const API_SECRET = 'F89XOoMXgsWGdESsYn61PHcAa7Q';

const srcFile = 'C:/Users/ritam/.gemini/antigravity/brain/e9ca20e4-7b1f-4393-b07c-795591ff38de/.user_uploaded/media_1795198881832_e18bfc8b.jpg';

if (!fs.existsSync(srcFile)) {
  console.error(`File not found: ${srcFile}`);
  process.exit(1);
}

const fileBuffer = fs.readFileSync(srcFile);
const base64Data = `data:image/jpeg;base64,${fileBuffer.toString('base64')}`;

const timestamp = Math.floor(Date.now() / 1000);
const folder = 'sanskaran_2026/core_members';
const publicId = 'shounak';

const paramsToSign = `folder=${folder}&public_id=${publicId}&timestamp=${timestamp}${API_SECRET}`;
const signature = crypto.createHash('sha1').update(paramsToSign).digest('hex');

const formData = new URLSearchParams();
formData.append('file', base64Data);
formData.append('api_key', API_KEY);
formData.append('timestamp', timestamp.toString());
formData.append('folder', folder);
formData.append('public_id', publicId);
formData.append('signature', signature);

console.log(`Uploading SHOUNAK to Cloudinary (${folder}/${publicId})...`);

const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
  method: 'POST',
  body: formData
});

const resJson = await response.json();
if (resJson.error) {
  console.error('Error uploading:', resJson.error);
  process.exit(1);
}

console.log('Upload successful!');
console.log('Public ID:', resJson.public_id);
console.log('Secure URL:', resJson.secure_url);
console.log('Width x Height:', resJson.width, 'x', resJson.height);

const optimizedUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto:good,w_800,c_limit/${resJson.public_id}`;
const thumbnailBlurUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto:low,w_40,e_blur:1000/${resJson.public_id}`;

const assetRecord = {
  type: "core",
  file: "Shounak.jpg",
  name: "SHOUNAK",
  publicId: resJson.public_id,
  secureUrl: resJson.secure_url,
  optimizedUrl,
  thumbnailBlurUrl,
  width: resJson.width,
  height: resJson.height
};

console.log('Asset record:', JSON.stringify(assetRecord, null, 2));

// Update cloudinaryAssets.json
const assetsPath = path.resolve('src/lib/cloudinaryAssets.json');
const assets = JSON.parse(fs.readFileSync(assetsPath, 'utf8'));

// Check if already exists
const existingIndex = assets.findIndex(a => a.name === 'SHOUNAK');
if (existingIndex >= 0) {
  assets[existingIndex] = assetRecord;
} else {
  // Insert right after the last core member (before dignitary)
  const lastCoreIndex = assets.map(a => a.type).lastIndexOf('core');
  assets.splice(lastCoreIndex + 1, 0, assetRecord);
}

fs.writeFileSync(assetsPath, JSON.stringify(assets, null, 2), 'utf8');
console.log(`Updated ${assetsPath} successfully!`);

