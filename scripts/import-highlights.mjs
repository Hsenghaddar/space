import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd(),downloads='C:/Users/USER/Downloads';
const groups={Sets:['17911818864558782','859135910 862847384 855448268 861885995 866278368 861885998 864467987 864581502 864155026 864786150 863381025 862957095 864735901 863060272 864869117 863976939 883300135 883300227 883299902 883299852 883299804 883374864 883299982 883299905 883374944 883300009'],Hoodies:['18109061420179529','875191617 877579128 870176200 874775030 870969842 875599668'],Sweaters:['18031690685853164','869528586 870112131 869244383'],Jeans:['18095227919258836','868869319 868323449 861973856'],'Wool sweaters':['18131884780809114','852586468 861148449 860589820']};
fs.mkdirSync('public/products/imported',{recursive:true});
const files=fs.readdirSync(downloads),rows=[];
for(const [category,[highlight,ids]] of Object.entries(groups))for(const id of ids.split(' ')){
 const source=files.find(f=>f.startsWith(id+'_')&&f.endsWith('.jpg'));if(!source)continue;
 fs.copyFileSync(path.join(downloads,source),`public/products/imported/${id}.jpg`);
 rows.push({id:'ig-'+id,name:`${category} ${String(rows.length+1).padStart(2,'0')}`,category,color:'Unspecified',image:`/products/imported/${id}.jpg`,price:null,currency:'USD',source:`https://www.instagram.com/stories/highlights/${highlight}/`,description:`From Space’s ${category} highlight. Ask the store to confirm price, sizing and availability.`,priceStatus:'Not verified; inspect photo before publishing a price.'});
}
const names=['Zip set|Ivory','Zip set|Navy','Zip set|Black','Overshirt set|Mauve','Overshirt set|Sand','Overshirt set|Grey','Overshirt set|Black','Half-zip hoodie set|Brown','Half-zip hoodie set|White','Half-zip hoodie set|Blue','Half-zip hoodie set|Black','Half-zip hoodie set|Grey','Crewneck set|Green','Crewneck set|Brown','Crewneck set|Ivory','Crewneck set|Black','Zip tracksuit|Ivory','Zip tracksuit|Black','Zip tracksuit|Grey','Zip tracksuit|White','Zip tracksuit|Blue','Bomber set|Sand','Bomber set|Black','Bomber set|Ivory','Bomber set|Navy','Bomber set|Grey','Zip hoodie|Mauve','Zip hoodie|White','Zip hoodie|Grey','Zip hoodie|Blue','Zip hoodie|Navy','Zip hoodie|Ivory','V-neck sweater|Charcoal','V-neck sweater|Navy','V-neck sweater|Brown','Boyfriend jeans|Black','Boyfriend jeans|Indigo','Boyfriend jeans|Blue','Textured sweater|Ivory','Textured sweater|Blue','Textured sweater|Taupe'];
rows.forEach((r,i)=>{const [name,color]=names[i].split('|');r.name=name+' — '+color;r.color=color;r.priceStatus='Visually reviewed: no price overlay';});
const originalIds=new Set(['ig-861885998','ig-864581502','ig-864155026','ig-864786150']);
fs.writeFileSync('public/imported-products.json',JSON.stringify(rows.filter(r=>!originalIds.has(r.id)),null,2));
console.log(`Imported ${rows.length} highlight photos.`);
