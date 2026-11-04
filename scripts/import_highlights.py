from pathlib import Path
import json, shutil, hashlib
from PIL import Image,ImageOps,ImageDraw
root=Path(__file__).parent
downloads=Path('C:/Users/USER/Downloads')
groups={
 'Sets':('17911818864558782','859135910 862847384 855448268 861885995 866278368 861885998 864467987 864581502 864155026 864786150 863381025 862957095 864735901 863060272 864869117 863976939 883300135 883300227 883299902 883299852 883299804 883374864 883299982 883299905 883374944 883300009'),
 'Hoodies':('18109061420179529','875191617 877579128 870176200 874775030 870969842 875599668'),
 'Sweaters':('18031690685853164','869528586 870112131 869244383'),
 'Jeans':('18095227919258836','868869319 868323449 861973856'),
 'Wool sweaters':('18131884780809114','852586468 861148449 860589820')}
dest=root/'public/products/imported'
dest.mkdir(parents=True,exist_ok=True)
rows=[]
for category,(highlight,ids) in groups.items():
 for prefix in ids.split():
  matches=list(downloads.glob(prefix+'_*.jpg'))
  if not matches:continue
  source=matches[0]
  target=dest/(prefix+'.jpg')
  shutil.copyfile(source,target)
  rows.append(dict(id='ig-'+prefix,name=category.rstrip('s')+' '+str(len(rows)+1).zfill(2),category=category,color='Unspecified',image='/products/imported/'+target.name,price=None,currency='USD',source='https://www.instagram.com/stories/highlights/'+highlight+'/',description='From the Space '+category+' highlight. Ask the store to confirm price, sizing and availability.',priceStatus='No price overlay observed'))
(root/'public/imported-products.json').write_text(json.dumps(rows,indent=2),encoding='utf-8')
for page in range((len(rows)+19)//20):
 batch=rows[page*20:(page+1)*20]
 canvas=Image.new('RGB',(1000,5*290),'white')
 draw=ImageDraw.Draw(canvas)
 for i,row in enumerate(batch):
  im=Image.open(root/'public'/row['image'].lstrip('/'))
  im=ImageOps.contain(im,(190,255))
  x=(i%5)*200;y=(i//5)*290
  canvas.paste(im,(x,y));draw.text((x,y+257),str(page*20+i+1)+' '+row['id'],fill='black')
 canvas.save(root/f'contact-sheet-{page+1}.jpg')
print('Imported',len(rows),'photos')
