import {estimateProduct} from './pricing.js';
export const categories=['All pieces','Sets','Hoodies','Sweaters','Jeans','Wool sweaters','Outerwear','Trousers','Tops','Dresses','Babywear'];
export const initialProducts=[
 {id:'set-1',name:'The everyday overshirt set',category:'Sets',color:'Stone',image:'/products/set-1.jpg'},
 {id:'set-2',name:'The relaxed hooded set',category:'Sets',color:'Mocha',image:'/products/set-2.jpg'},
 {id:'set-3',name:'The clean-line hooded set',category:'Sets',color:'Ivory',image:'/products/set-3.jpg'},
 {id:'set-4',name:'The after-hours hooded set',category:'Sets',color:'Navy',image:'/products/set-4.jpg'}
].map(p=>estimateProduct({...p,price:null,currency:'USD',source:'https://www.instagram.com/stories/highlights/17911818864558782/',description:'A coordinated look from the Space Sets edit. Contact the store to confirm the current price, fabric, sizes, and availability.',priceStatus:'Not shown in source',sizes:[]}));
