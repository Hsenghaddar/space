import fs from 'node:fs';
const sources=JSON.parse(fs.readFileSync('scripts/additional-source-photos.json','utf8'));
const edits={
 'post-knit':{name:'Cable-knit sweater — Taupe',color:'Taupe'},
 'post-trousers':{name:'Pleated Italian trousers — Taupe',color:'Taupe'},
 'post-zip':{name:'The zip hoodie color edit',color:'Assorted'},
 'post-oysho':{name:'Relaxed coordinated set — Charcoal',color:'Charcoal'},
 'post-denim':{name:'The boyfriend denim wash edit',color:'Assorted'}
};
fs.mkdirSync('public/products/posts',{recursive:true});
const rows=sources.map(({url,...p})=>{fs.copyFileSync(`source-posts/${p.id}.jpg`,`public/products/posts/${p.id}.jpg`);return {...p,...edits[p.id],image:`/products/posts/${p.id}.jpg`,price:null,currency:'USD',sourceType:'profile-reel-cover',priceStatus:'Visually reviewed: no price overlay',description:'From the Space profile product edit. The photo may show several colors or washes; ask Space to confirm your preferred piece, price, size and availability.'}});
const existing=JSON.parse(fs.readFileSync('public/imported-products.json','utf8')).filter(p=>!p.id.startsWith('post-'));
fs.writeFileSync('public/imported-products.json',JSON.stringify([...existing,...rows],null,2)+'\n');
console.log('Imported five product reel-cover photos as a documented fallback beyond the highlights.');
