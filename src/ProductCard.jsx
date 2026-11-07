import React,{useEffect,useState} from 'react';
import {Plus,Heart} from './Icons.jsx';
import {departmentOf} from './departments.js';
import {selectVariant} from './variants.js';
import ColorSwatches from './ColorSwatches.jsx';
export const money=p=>p.price==null?'Ask about this piece':new Intl.NumberFormat('en-US',{style:'currency',currency:p.currency||'USD'}).format(p.price);
export default function ProductCard({p,onView,onToggleFavorite,favorites,preferredColor}){
 const preferred=p.variants.find(v=>v.color===preferredColor)?.id||p.selectedVariantId||p.variants[0].id;
 const [variantId,setVariantId]=useState(preferred);
 useEffect(()=>setVariantId(preferred),[preferred]);
 const variant=selectVariant(p,variantId);
 const open=()=>onView({...p,selectedVariantId:variant.id});
 return <article className="product"><button className="product-photo" onClick={open} aria-label={'View '+p.name}><img src={variant.image} alt={p.name+' in '+variant.color} loading="lazy"/><span className="product-tag">{departmentOf(p)==='kids'?'Kids':'Men'} · {p.category}</span><span className="quick">Discover piece <Plus size={17}/></span></button><button className={'favorite-button '+(favorites.includes(p.id)?'is-favorite':'')} aria-label={(favorites.includes(p.id)?'Remove favorite ':'Save favorite ')+p.name} aria-pressed={favorites.includes(p.id)} onClick={()=>onToggleFavorite(p.id)}><Heart size={18} fill={favorites.includes(p.id)?'currentColor':'none'}/></button><div className="product-meta"><button onClick={open}>{p.name}</button><span>{money(variant)}</span></div><ColorSwatches variants={p.variants} selected={variant} onSelect={v=>setVariantId(v.id)} label={'Colors for '+p.name}/><p className="variant-caption">{variant.color}<span>S · M · L</span></p></article>;
}
