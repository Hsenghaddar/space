export const departmentOf=p=>p.department==='kids'?'kids':'men';
export function departmentFromRoute(route){const value=new URLSearchParams(route.split('?')[1]||'').get('department');return value==='kids'||value==='all'?value:'men';}
export const departmentLabel=p=>departmentOf(p)==='kids'?'Space Kids':'Space Men';
export const instagramFor=p=>departmentOf(p)==='kids'?'https://www.instagram.com/spacekids.leb/':'https://www.instagram.com/space.leb/';
