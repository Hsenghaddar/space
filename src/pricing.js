export const estimateByCategory={Sets:35,Hoodies:20,Sweaters:20,Jeans:20,'Wool sweaters':25,Outerwear:30,Trousers:15};
export function estimateProduct(product){
 if(product.price!=null)return product;
 return {...product,sourcePrice:null,price:estimateByCategory[product.category]||20,priceIsEstimate:true,priceStatus:'Approximate price; confirm with Space before ordering.',estimateBasis:'Category guide based on visible Space highlight prices and comparable clothing types; not a store quote.'};
}
