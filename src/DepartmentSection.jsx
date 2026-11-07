import React from 'react';
import {ArrowUpRight} from './Icons.jsx';
export default function DepartmentSection({onShop}){
 return <section className="section departments" aria-labelledby="departments-heading"><div className="section-heading"><div><p className="eyebrow">01 / TWO WORLDS. ONE SPACE.</p><h2>Your style. <em>Their little world.</em></h2></div><p className="section-aside">The Space wardrobe, from your everyday<br/>to their next adventure.</p></div><div className="department-grid">{[
 {id:'men',title:'Space Men',label:'THE ORIGINAL SPACE',copy:'Your everyday, elevated.',image:'/products/posts/post-oysho.jpg',alt:'Space Men model wearing a charcoal coordinated outfit',cta:'Explore menswear'},
 {id:'kids',title:'Space Kids',label:'HOME OF MINI EXPLORERS',copy:'Little personalities. Big adventures.',image:'/products/kids/kids-03.jpg',alt:'Junior vest and denim outfit from Space Kids',cta:'Explore kidswear'}
 ].map(d=><a className={'department-card department-'+d.id} href={'#/shop?department='+d.id} key={d.id} onClick={e=>{e.preventDefault();onShop('All pieces',d.id)}}><img src={d.image} alt={d.alt} loading="lazy"/><div className="department-copy"><p className="eyebrow">{d.label}</p><h3>{d.title}</h3><p>{d.copy}</p><span>{d.cta}<ArrowUpRight size={19}/></span></div></a>)}</div></section>;
}
