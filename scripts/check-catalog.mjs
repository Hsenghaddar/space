import fs from 'node:fs';
import assert from 'node:assert/strict';
import {initialProducts,categories} from '../src/products.js';
const kids=JSON.parse(fs.readFileSync('public/kids-products.json','utf8'));
const rows=[...initialProducts,...JSON.parse(fs.readFileSync('public/imported-products.json','utf8')),...kids];
const ids=new Set(),images=new Set();
for(const p of rows){
 assert(!ids.has(p.id),`Duplicate product ID: ${p.id}`);ids.add(p.id);
 assert(!images.has(p.image),`Duplicate image path: ${p.image}`);images.add(p.image);
 assert(categories.includes(p.category),`Unknown category: ${p.category}`);
 assert(p.price===null||(Number.isFinite(p.price)&&p.price>=0),`Invalid price: ${p.id}`);
 assert(p.source?.startsWith('https://www.instagram.com/'),`Missing source: ${p.id}`);
 assert(p.image.startsWith('/products/'),`Invalid asset path: ${p.id}`);
 assert(fs.statSync('public'+p.image).size>1000,`Missing or empty asset: ${p.image}`);
 if(p.department==='kids')assert(p.source.includes('/spacekids.leb/'),`Incorrect kids source: ${p.id}`);
}
assert(kids.length>=20&&kids.length<=30,'Expected 20–30 kids products');
console.log(`Catalog sources verified: ${rows.length} photos (${rows.length-kids.length} men, ${kids.length} kids), ${images.size} image paths, ${rows.filter(p=>p.price!=null&&!p.priceIsEstimate).length} recorded prices, ${rows.filter(p=>p.priceIsEstimate).length} estimated prices.`);
