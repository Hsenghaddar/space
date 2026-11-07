import React from 'react';
import {colorHex} from './variants.js';
export default function ColorSwatches({variants,selected,onSelect,label='Color'}){
 return <div className="color-swatches" role="group" aria-label={label}>{variants.map(v=><button type="button" key={v.id} className={'color-swatch '+(selected.id===v.id?'selected':'')} aria-label={v.color} aria-pressed={selected.id===v.id} title={v.color} onClick={()=>onSelect(v)}><span style={{background:colorHex[v.color]||'#bda98c'}}/></button>)}</div>;
}
