import fs from 'node:fs';
const path='public/imported-products.json';
const photos=JSON.parse(fs.readFileSync(path,'utf8')).filter(p=>!p.id.startsWith('sale-'));
const source=JSON.parse(fs.readFileSync('sale-products.json','utf8'));
const edited=source.filter(p=>fs.existsSync(`public/products/sale/${p.id}.png`)||fs.existsSync(`public/products/sale/${p.id}.jpg`)).map(p=>({...p,image:`/products/sale/${p.id}.${fs.existsSync(`public/products/sale/${p.id}.jpg`)?'jpg':'png'}`,imageEdited:true,sourceType:'highlight-video-frame',retouchNote:'Price and interface overlays removed using image editing; obscured image areas reconstructed.'}));
fs.writeFileSync(path,JSON.stringify([...photos,...edited],null,2)+'\n');
console.log(`Synced ${photos.length} imported photos + ${edited.length} edited video frames (+ 4 base products).`);
