import {generate} from './core.js';
self.onmessage=({data})=>{try{self.postMessage({id:data.id,revision:data.revision,...generate(data.state,data.seed)});}catch(e){self.postMessage({id:data.id,revision:data.revision,errors:[e.message]});}};
