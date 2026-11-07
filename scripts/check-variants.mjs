import fs from 'node:fs';
import assert from 'node:assert/strict';
import {initialProducts} from '../src/products.js';
import {groupProducts,findProduct,selectVariant,createBagLine,resolveBagLine,filterProducts} from '../src/variants.js';
const records=[...initialProducts,...JSON.parse(fs.readFileSync('public/imported-products.json','utf8')),...JSON.parse(fs.readFileSync('public/kids-products.json','utf8'))];
const products=groupProducts(records);
assert.equal(products.flatMap(p=>p.variantIds).length,records.length,'Every source record must remain accessible');
const images=new Set(products.flatMap(p=>p.variants.flatMap(v=>v.images)));
assert.equal(images.size,records.length,'Every source photo must remain accessible');
const hoodie=findProduct(products,'ig-875599668');
assert.equal(hoodie.variants.length,6,'Six hoodie colors should be one product');
assert.equal(findProduct(products,'ig-870969842').id,hoodie.id,'Navy and ivory hoodie must share a product');
const ivory=selectVariant(hoodie,'ig-875599668'),navy=selectVariant(hoodie,'ig-870969842');
const lines=[createBagLine(hoodie,ivory,'S'),createBagLine(hoodie,ivory,'M'),createBagLine(hoodie,navy,'M')];
assert.equal(new Set(lines.map(p=>p.id)).size,3,'Color and size combinations must have separate bag keys');
for(const line of lines){const restored=resolveBagLine(line,products);assert.equal(restored.color,line.color);assert.equal(restored.size,line.size);assert.equal(restored.image,line.image);assert.equal(restored.price,line.price);}
assert.throws(()=>createBagLine(hoodie,ivory,''),'A size is required');
const filtered=filterProducts(products,{color:'Navy',priceBand:'20to40'});
assert(filtered.length>0);
for(const p of filtered){const v=selectVariant(p,p.selectedVariantId);assert.equal(v.color,'Navy');assert(v.price>=20&&v.price<=40);}
assert.equal(filterProducts(products,{department:'kids'}).length,28,'Different kids outfits must remain separate');
assert.notEqual(findProduct(products,'sale-06').id,findProduct(products,'sale-29').id,'Different jacket designs must not merge just because their source names match');
assert.notEqual(findProduct(products,'sale-02').id,findProduct(products,'ig-883299852').id,'Unverified cross-source tracksuit designs must remain separate');
console.log(`Verified ${records.length} photos grouped into ${products.length} products; color filters, size requirements, and bag variants pass.`);
