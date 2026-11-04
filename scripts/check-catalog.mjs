import fs from 'node:fs';
import assert from 'node:assert/strict';
import {initialProducts,categories} from '../src/products.js';
const rows=[...initialProducts,...JSON.parse(fs.readFileSync('public/imported-products.json','utf8'))];
const ids=new Set(),images=new Set();
for(const p of rows){
 assert(!ids.has(p.id),`Duplicate product ID: ${p.id}`);ids.add(p.id);
 assert(!images.has(p.image),`Duplicate image path: ${p.image}`);images.add(p.image);
 assert(categories.includes(p.category),`Unknown category: ${p.category}`);
 assert(p.price===null||(Number.isFinite(p.price)&&p.price>=0),`Invalid price: ${p.id}`);
 assert(p.source?.startsWith('https://www.instagram.com/'),`Missing source: ${p.id}`);
 assert(p.image.startsWith('/products/'),`Invalid asset path: ${p.id}`);
 assert(fs.statSync('public'+p.image).size>1000,`Missing or empty asset: ${p.image}`);
}
console.log(`Catalog verified: ${rows.length} products, ${images.size} image paths, ${rows.filter(p=>p.price!=null&&!p.priceIsEstimate).length} recorded prices, ${rows.filter(p=>p.priceIsEstimate).length} labeled estimates.`);
