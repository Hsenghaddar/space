import {departmentOf} from './departments.js';
export const sizes=['S','M','L'];
const overrides={
 'set-1':['Overshirt set','overshirt set'],
 'set-2':['Relaxed hooded set','relaxed hooded set'],
 'set-3':['Relaxed hooded set','relaxed hooded set'],
 'set-4':['Relaxed hooded set','relaxed hooded set'],
 'post-zip':['Zip hoodie','zip hoodie'],
 'post-denim':['Boyfriend jeans','boyfriend jeans'],
 'sale-29':['Snap-front jacket','snap-front jacket']
};
export function groupProducts(records){
 const groups=new Map();
 for(const record of records){
  const override=overrides[record.id];
  const name=override?.[0]||record.name.split(' — ')[0];
  const family=record.id.startsWith('sale-')?'sale':record.id.startsWith('post-')&&!override?'post':'highlight';
  const key=[departmentOf(record),family,record.category,override?.[1]||name.toLowerCase().replace(/-/g,' ')].join('|');
  if(!groups.has(key))groups.set(key,{...record,name,variants:[],variantIds:[],sizes:[...sizes]});
  const product=groups.get(key);product.variantIds.push(record.id);
  const sameColor=product.variants.find(v=>v.color===record.color);
  if(sameColor){sameColor.images.push(record.image);sameColor.recordIds.push(record.id);if(sameColor.priceIsEstimate&&!record.priceIsEstimate){sameColor.price=record.price;sameColor.priceIsEstimate=false;sameColor.source=record.source;}}
  else product.variants.push({...record,name,images:[record.image],recordIds:[record.id]});
 }
 // Overview collages remain available in the gallery without an artificial "Assorted" swatch.
 for(const product of groups.values()){
  if(product.variants.length>1){const overview=product.variants.filter(v=>v.color==='Assorted');product.variants=product.variants.filter(v=>v.color!=='Assorted');for(const v of overview)product.variants[0].images.push(...v.images);}
  const first=product.variants[0];product.price=first.price;product.color=first.color;product.image=first.image;
 }
 return [...groups.values()];
}
export const findProduct=(products,id)=>products.find(p=>p.id===id||p.variantIds.includes(id));
export const selectVariant=(product,id)=>product.variants.find(v=>v.id===id||v.recordIds.includes(id))||product.variants[0];
export function createBagLine(product,variant,size){
 if(!sizes.includes(size))throw new Error('Choose S, M, or L before adding to bag.');
 return {id:variant.id+'::'+size,productId:product.id,variantId:variant.id,name:product.name,department:departmentOf(product),color:variant.color,size,price:variant.price,currency:variant.currency,image:variant.image,source:variant.source,quantity:1};
}
export function resolveBagLine(line,products){
 const product=findProduct(products,line.productId||line.id);if(!product)return line;
 const variant=selectVariant(product,line.variantId||line.id);
 return {...line,productId:product.id,name:product.name,department:departmentOf(product),color:variant.color,price:variant.price,currency:variant.currency,image:variant.image,source:variant.source};
}
export const colorHex={Stone:'#cac9c3',Mocha:'#a88a79',Ivory:'#eeeadd',Navy:'#283c51',Black:'#242424',White:'#fff',Grey:'#969893',Charcoal:'#535651',Blue:'#7896b3',Indigo:'#364f72',Brown:'#82634f',Green:'#657253',Sand:'#d2c2a4',Mauve:'#b4949b',Taupe:'#a69a8b',Olive:'#73795b',Sage:'#aab5a0',Blush:'#e9b9bd',Butter:'#eaddaa',Forest:'#3f6450',Burgundy:'#793e48',Assorted:'conic-gradient(#bfa582,#7d91a7,#e0d3bc,#bfa582)'};
export function filterProducts(products,{department='men',category='All pieces',color='All colors',priceBand='any',query='',sort='featured'}={}){
 const q=query.toLowerCase().trim();
 const matchesPrice=v=>priceBand==='any'||(priceBand==='under20'?v.price<20:priceBand==='20to40'?v.price>=20&&v.price<=40:v.price>40);
 const result=[];
 for(const p of products){
  if(department!=='all'&&departmentOf(p)!==department||category!=='All pieces'&&p.category!==category)continue;
  const variants=p.variants.filter(v=>(color==='All colors'||v.color===color)&&matchesPrice(v));
  if(!variants.length||!`${p.name} ${p.category} ${p.variants.map(v=>v.color).join(' ')}`.toLowerCase().includes(q))continue;
  const selected=variants.find(v=>q&&v.color.toLowerCase().includes(q))||variants[0];
  result.push({...p,selectedVariantId:selected.id});
 }
 return result.sort((a,b)=>sort==='name'?a.name.localeCompare(b.name):sort==='price-up'?selectVariant(a,a.selectedVariantId).price-selectVariant(b,b.selectedVariantId).price:sort==='price-down'?selectVariant(b,b.selectedVariantId).price-selectVariant(a,a.selectedVariantId).price:0);
}
