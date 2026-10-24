import {normalizeScan,cameraMessage,stableReader} from './scan-logic.js';
let stream=null,video=null,generation=0,loopTimer=null,torch=false;
async function reader(){const {BrowserMultiFormatOneDReader,BarcodeFormat,DecodeHintType}=await import('./scanner-lib.js');const hints=new Map();hints.set(DecodeHintType.POSSIBLE_FORMATS,[BarcodeFormat.EAN_13,BarcodeFormat.EAN_8,BarcodeFormat.UPC_A,BarcodeFormat.UPC_E,BarcodeFormat.ITF]);hints.set(DecodeHintType.TRY_HARDER,true);return {reader:new BrowserMultiFormatOneDReader(hints),formats:BarcodeFormat};}
export function stopCamera(){generation++;clearTimeout(loopTimer);stream?.getTracks().forEach(t=>t.stop());stream=null;if(video){video.pause();video.srcObject=null;}video=null;torch=false;}
export function capabilities(){const t=stream?.getVideoTracks()[0];return {cap:t?.getCapabilities?.()||{},settings:t?.getSettings?.()||{}};}
export async function setCameraOption(key,value){const t=stream?.getVideoTracks()[0];if(!t)throw Error('先にカメラを開始してください');const {cap}=capabilities();if(key==='torch'){if(!cap.torch)throw Error('このカメラはライト操作に対応していません');await t.applyConstraints({advanced:[{torch:!torch}]});torch=!torch;return torch;}if(key==='zoom'&&cap.zoom){const v=Math.min(cap.zoom.max,Math.max(cap.zoom.min,Number(value)));await t.applyConstraints({advanced:[{zoom:v}]});return v;}if(key==='focus'&&cap.focusMode?.includes('continuous')){await t.applyConstraints({advanced:[{focusMode:'continuous'}]});return;}throw Error('このカメラはこの調整に対応していません');}
async function requestStream(constraints,token){let timed=false;let timeout;const request=navigator.mediaDevices.getUserMedia(constraints).then(s=>{if(timed||token!==generation){s.getTracks().forEach(t=>t.stop());throw new DOMException('中断しました','AbortError');}return s;});try{return await Promise.race([request,new Promise((_,reject)=>{timeout=setTimeout(()=>{timed=true;reject(new DOMException('応答なし','TimeoutError'));},20000);})]);}finally{clearTimeout(timeout);}}
function canvasOf(source,angle=0,crop=false){const w=source.videoWidth||source.naturalWidth,h=source.videoHeight||source.naturalHeight;const sw=crop?w*.9:w,sh=crop?h*.5:h,scale=Math.min(1,1600/sw);const c=document.createElement('canvas');c.width=Math.round((angle?sh:sw)*scale);c.height=Math.round((angle?sw:sh)*scale);const x=c.getContext('2d',{willReadFrequently:true});x.translate(c.width/2,c.height/2);if(angle)x.rotate(Math.PI/2);x.drawImage(source,(w-sw)/2,(h-sh)/2,sw,sh,-sw*scale/2,-sh*scale/2,sw*scale,sh*scale);return c;}
function zxingRead(r,c){const result=r.reader.decodeFromCanvas(c);return normalizeScan(result.getText(),result.getBarcodeFormat()===r.formats.UPC_E?'upc_e':'');}
export async function startCamera(element,onRead,deviceId='',onStatus=()=>{},onReady=()=>{}){
 stopCamera();const token=generation;video=element;
 if(!window.isSecureContext||!navigator.mediaDevices?.getUserMedia)throw Error('HTTPSのSafari・Chromeで開いてください。この環境はカメラAPIを利用できません。');
 try{
 onStatus('カメラの許可を確認しています…');
 const constraints={audio:false,video:deviceId?{deviceId:{exact:deviceId}}:{facingMode:{ideal:'environment'},width:{ideal:1920},height:{ideal:1080}}};
 const active=await requestStream(constraints,token);if(token!==generation){active.getTracks().forEach(t=>t.stop());return;}stream=active;
 element.autoplay=true;element.muted=true;element.playsInline=true;element.setAttribute('playsinline','');element.srcObject=active;let playTimer;try{await Promise.race([element.play(),new Promise((_,reject)=>{playTimer=setTimeout(()=>reject(new DOMException('映像再生待ち','TimeoutError')),10000);})]);}finally{clearTimeout(playTimer);}active.getVideoTracks()[0].addEventListener('ended',()=>{if(token===generation){stopCamera();onStatus('カメラの接続が終了しました。もう一度開始してください。');}});
 if(token!==generation)return;await setCameraOption('focus').catch(()=>{});
 const devices=await navigator.mediaDevices.enumerateDevices().catch(()=>[]);if(token!==generation)return;onReady(devices.filter(d=>d.kind==='videoinput'),capabilities());
 onStatus('映像を取得しました。バーコードを横向きにし、左右の余白も画面に入れてください。');
 const r=await reader();if(token!==generation)return;
 let native=null;if('BarcodeDetector' in window){try{const supported=await window.BarcodeDetector.getSupportedFormats();const formats=['ean_13','ean_8','upc_a','upc_e','itf'].filter(f=>supported.includes(f));if(formats.length)native=new window.BarcodeDetector({formats});}catch{}}
 const stable=stableReader(),started=Date.now();let count=0,waitingShown=false;
 async function scan(){if(token!==generation)return;try{if(!waitingShown&&Date.now()-started>8000&&(!element.videoWidth||element.readyState<2)){waitingShown=true;onStatus('カメラは接続していますが映像が届いていません。カメラを切り替えるか、停止して再開してください。');}if(element.readyState>=2&&element.videoWidth){let code='';const c=canvasOf(element,count%4===3?90:0,count%2===0);if(native){try{const hits=await native.detect(c);if(hits[0])code=normalizeScan(hits[0].rawValue,hits[0].format);}catch{}}
 if(!code){try{code=zxingRead(r,c);}catch{}}
 if(token!==generation)return;if(code&&stable(code)){stopCamera();onStatus('読み取り成功：'+code);onRead(code);return;}count++;if(count%30===0&&Date.now()-started>10000)onStatus('映像は取得できています。15〜30cm離し、反射を避けてください。カメラ切替・ライト・写真での読取も試せます。');}}
 catch(e){onStatus('映像の読み取りを再試行しています。改善しない場合は写真で読み取ってください。');}
 if(token===generation)loopTimer=setTimeout(scan,250);
 }scan();
 }catch(e){if(token!==generation)return;stopCamera();throw Error(cameraMessage(e));}
}
export async function readImage(file){if(!/^image\//.test(file.type)&&!file.name?.match(/\.(jpe?g|png|webp)$/i))throw Error('写真画像を選択してください');if(file.size>10000000)throw Error('10MB以下の画像を選択してください');const url=URL.createObjectURL(file);try{const image=new Image();image.src=url;await image.decode();if(image.naturalWidth*image.naturalHeight>40000000)throw Error('画像が大きすぎます。小さくして再試行してください');const r=await reader();for(const angle of [0,90])for(const crop of [false,true]){try{return zxingRead(r,canvasOf(image,angle,crop));}catch{}}throw Error('バーコードを認識できません。全体と左右の余白が写った鮮明な写真で再試行してください。');}catch(e){throw Error(e.message.includes('バーコード')||e.message.includes('大きすぎ')?e.message:'画像を開けません。JPEG・PNG・WebP形式でお試しください。');}finally{URL.revokeObjectURL(url);}}
if(typeof document!=='undefined'){document.addEventListener('visibilitychange',()=>{if(document.hidden)stopCamera();});window.addEventListener('pagehide',stopCamera);}
