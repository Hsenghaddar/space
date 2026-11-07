import fs from 'node:fs';
const sources=JSON.parse(fs.readFileSync('review/kids/source-manifest.json','utf8'));
const selected=[
 [1,'The junior denim look','Sets','Black',30],
 [2,'The petal cardigan set','Sets','Ivory',25],
 [3,'The little explorer vest set','Sets','Stone',28],
 [4,'The teddy quilted set','Sets','Ivory',22],
 [5,'The bow cardigan set','Sets','Sand',24],
 [6,'The off-duty junior set','Sets','Charcoal',25],
 [7,'The embroidered collar set','Sets','Ivory',24],
 [8,'The everyday bomber look','Sets','Sand',28],
 [15,'The palm linen look','Sets','Sage',22],
 [16,'The little bow summer set','Sets','Mocha',20],
 [17,'The mini utility look','Sets','Olive',24],
 [21,'The everyday crewneck','Sweaters','Navy',15],
 [23,'The cotton shorts set','Sets','Stone',18],
 [24,'The palm cotton tee','Tops','Ivory',10],
 [25,'The soft-start sleepsuit','Babywear','Blush',16],
 [26,'The little sunshine dress','Dresses','Butter',18],
 [29,'The ribbed tee and denim set','Sets','Ivory',20],
 [30,'The little polo look','Sets','Sand',20],
 [31,'The muslin baby set','Sets','Sage',22],
 [35,'The little leather-look set','Sets','Mocha',30],
 [36,'The junior quilted jacket look','Sets','Olive',30],
 [37,'The mini varsity look','Sets','Black',28],
 [39,'The gingham collar romper','Babywear','Stone',20],
 [42,'The check overshirt look','Sets','Stone',25],
 [44,'The little road-trip set','Sets','Forest',24],
 [52,'The flower cardigan set','Sets','Taupe',20],
 [62,'The embroidered flare jeans','Jeans','Indigo',15],
 [64,'The teddy cardigan set','Sets','Ivory',18]
];
fs.mkdirSync('public/products/kids',{recursive:true});
const products=selected.map(([index,name,category,color,price])=>{
 const original=sources.find(s=>s.index===index);const id='kids-'+String(index).padStart(2,'0');
 fs.copyFileSync(original.file,`public/products/kids/${id}.jpg`);
 const sourcePrice=index===52?20:index===62?15:index===64?18:null;
 const sizes=original.caption.match(/Sizes?\s*:?\s*([^\n]+)/i)?.[1]?.trim()||'';
 return {id,name,department:'kids',category,color,image:`/products/kids/${id}.jpg`,price,currency:'USD',source:original.source,sourceAccount:'spacekids.leb',sourceType:'profile-reel-cover',sourcePrice,priceIsEstimate:sourcePrice===null,priceStatus:sourcePrice===null?'Approximate category price':'Recorded in source caption',sizeNote:sizes,sizes:[],description:'From the Space Kids collection. '+(sizes?'Source size range: '+sizes+'.':''),sourceCaption:original.caption};
});
fs.writeFileSync('public/kids-products.json',JSON.stringify(products,null,2)+'\n');
console.log(`Imported ${products.length} reviewed Space Kids product photos.`);
