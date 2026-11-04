import {defineConfig} from 'vite';
export default defineConfig({server:{host:'127.0.0.1',port:5173,strictPort:true,watch:{usePolling:true,interval:350,ignored:['**/.reference/**','**/raw-frames/**','**/source-posts/**','**/review/**','**/source-assets/**']}},build:{target:'es2020'}});
