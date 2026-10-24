export const clone=x=>JSON.parse(JSON.stringify(x));
export const dateAdd=(d,n)=>new Date(Date.parse(d+'T00:00:00Z')+n*86400000).toISOString().slice(0,10);
export const weekday=d=>new Date(d+'T00:00:00Z').getUTCDay();
export const weekKey=d=>dateAdd(d,-((weekday(d)+6)%7));
export const time=m=>`${String(Math.floor(m/60)).padStart(2,'0')}:${String(m%60).padStart(2,'0')}`;
export const days=s=>Array.from({length:s.length},(_,i)=>dateAdd(s.start,i));
export const shifts={early:{name:'早番',start:540,end:780,breaks:[]},late:{name:'遅番',start:780,end:1020,breaks:[]},full:{name:'通し',start:540,end:1020,breaks:[[720,765]]}};
export const minutes=a=>a.end-a.start-a.breaks.reduce((n,b)=>n+b[1]-b[0],0);
export const active=(a,t)=>a.start<=t&&t<a.end&&!a.breaks.some(b=>b[0]<=t&&t<b[1]);
export const assignment=(staffId,date,kind,role)=>({staffId,date,kind,role,...clone(shifts[kind]),locked:false});
export function preset(industry='retail'){
 const roles=industry==='retail'?['レジ','売場']:['ホール','調理'];
 const names=['佐藤 はる','鈴木 そう','高橋 あお','田中 りん','伊藤 けい','渡辺 みお','山本 れん','中村 ゆい','小林 なお','加藤 さく','吉田 ひな','山田 りく'];
 return {schemaVersion:1,industry,start:'2026-11-02',length:14,roles,staff:names.map((name,i)=>({id:'s'+i,name,role:roles[i%2],maxWeekly:24,maxPeriod:48,target:32,wage:1200+i%3*50})),preferences:{},demand:{early:2,late:2},overrides:{},assignments:[],revision:0,learning:false,history:makeHistory(),review:[],boundaryOff:true};
}
export function available(s,id,date){return s.preferences[id+'|'+date]||'ok';}
export function inputErrors(s){
 const e=[];if(!s||s.schemaVersion!==1)return ['未対応のファイル形式です'];
 if(!/^\d{4}-\d{2}-\d{2}$/.test(s.start)||!Number.isFinite(Date.parse(s.start+'T00:00:00Z'))||dateAdd(s.start,0)!==s.start)e.push('日付が正しくありません');
 if(!Number.isInteger(s.length)||s.length<7||s.length>31)e.push('期間は7〜31日です');
 if(!Array.isArray(s.staff)||s.staff.length<1||s.staff.length>30)return [...e,'スタッフは1〜30人です'];
 if(!Array.isArray(s.roles)||s.roles.length!==2||s.roles.some(r=>typeof r!=='string'||r.length>40))e.push('役割が正しくありません');
 const ids=new Set();for(const p of s.staff){if(ids.has(p.id)||typeof p.id!=='string'||p.id.length>40)e.push('スタッフIDが不正です');ids.add(p.id);if(typeof p.name!=='string'||p.name.length>40)e.push('名前は40文字以内です');if(!s.roles.includes(p.role))e.push('役割が不正です');for(const k of ['maxWeekly','maxPeriod','target','wage'])if(!Number.isFinite(p[k])||p[k]<0||p[k]>100000)e.push('数値が不正です');if(p.maxWeekly>40)e.push('デモの週上限は40時間です');}
 for(const k of ['early','late'])if(!Number.isInteger(s.demand?.[k])||s.demand[k]<0||s.demand[k]>10)e.push('必要人数は0〜10人です');
 if(!s.preferences||typeof s.preferences!=='object'||Object.keys(s.preferences).length>930)e.push('希望データが不正です');else for(const v of Object.values(s.preferences))if(!['ok','off','want','avoid','unknown'].includes(v))e.push('希望の値が不正です');
 if(!Array.isArray(s.assignments)||s.assignments.length>930)e.push('勤務データが不正です');
 if(!Array.isArray(s.history)||s.history.length>50000)e.push('履歴が不正です');else for(const r of s.history){if(typeof r.date!=='string'||!['early','late'].includes(r.slot)||!['observed','missing','closed'].includes(r.status)||(r.status==='observed'&&(!Number.isFinite(r.count)||r.count<0||r.count>100000)))e.push('実績行が不正です');}
 if(!s.overrides||typeof s.overrides!=='object'||Object.keys(s.overrides).length>124)e.push('需要データが不正です');else for(const v of Object.values(s.overrides))if(!Number.isInteger(v)||v<0||v>10)e.push('需要候補が不正です');
 if(!Array.isArray(s.review)||s.review.length>100)e.push('振り返りデータが不正です');else for(const r of s.review)if(typeof r.period!=='string'||r.period.length>20||!['once','repeat'].includes(r.reason))e.push('振り返りの形式が不正です');
 return [...new Set(e)];
}
export function validate(s,as=s.assignments){
 let errors=[];const seen=new Set(),week=Object.create(null),period=Object.create(null),staffDates=Object.create(null),validDates=new Set(days(s)),byId=new Map(s.staff.map(p=>[p.id,p]));
 for(const a of as){
 const p=byId.get(a.staffId),key=a.staffId+'|'+a.date;
 if(!p){errors.push('存在しないスタッフです');continue;}
 if(!validDates.has(a.date))errors.push('期間外の勤務です');
 if(seen.has(key))errors.push(`${p.name}：同日に勤務が重複しています`);seen.add(key);
 const template=shifts[a.kind];if(!template||a.start!==template.start||a.end!==template.end||JSON.stringify(a.breaks)!==JSON.stringify(template.breaks)){errors.push(`${p.name}：未対応の勤務時間です`);continue;}
 if(['off','unknown'].includes(available(s,p.id,a.date)))errors.push(`${p.name} ${a.date}：勤務不可または未提出です`);
 if(a.role!==p.role)errors.push(`${p.name}：担当できない役割です`);
 const m=minutes(a);if(m>480||(m>360&&a.breaks.reduce((n,b)=>n+b[1]-b[0],0)<45))errors.push(`${p.name}：時間・休憩条件に違反しています`);
 const wk=p.id+'|'+weekKey(a.date);week[wk]=(week[wk]||0)+m;period[p.id]=(period[p.id]||0)+m;
 if(week[wk]>p.maxWeekly*60)errors.push(`${p.name}：週の勤務上限を超えています`);
 if(period[p.id]>p.maxPeriod*60)errors.push(`${p.name}：期間の勤務上限を超えています`);
 (staffDates[p.id]??=[]).push(a.date);
 }
 for(const p of s.staff){const ds=(staffDates[p.id]||[]).sort();let run=1;for(let i=1;i<ds.length;i++){run=ds[i]===dateAdd(ds[i-1],1)?run+1:1;if(run>5)errors.push(`${p.name}：5連勤の上限を超えています`);}}
 return [...new Set(errors)];
}
export function need(s,date,slot){return s.overrides[date+'|'+slot]??s.demand[slot];}
export function metrics(s,as=s.assignments){
 let required=0,covered=0,excess=0;const gaps=[];
 for(const d of days(s))for(const slot of ['early','late'])for(const role of s.roles){let gap=0;const target=need(s,d,slot);for(let t=shifts[slot].start;t<shifts[slot].end;t+=15){const n=as.filter(a=>a.date===d&&a.role===role&&active(a,t)).length;required+=target*15;covered+=Math.min(n,target)*15;excess+=Math.max(0,n-target)*15;gap+=Math.max(0,target-n)*15;}if(gap)gaps.push({date:d,slot,role,minutes:gap});}
 const people=s.staff.map(p=>{const a=as.filter(a=>a.staffId===p.id),h=a.reduce((n,a)=>n+minutes(a),0)/60;const possible=days(s).filter(d=>[0,6].includes(weekday(d))&&!['off','unknown'].includes(available(s,p.id,d))).length;return {...p,h,cost:h*p.wage,weekend:a.filter(a=>[0,6].includes(weekday(a.date))).length,possible,changes:0};});
 const wants=Object.entries(s.preferences).filter(([k,v])=>v==='want'&&days(s).includes(k.split('|')[1]));const met=wants.filter(([k])=>as.some(a=>a.staffId+'|'+a.date===k)).length;
 return {required,covered,excess,gaps,coverage:required?covered/required:null,shortage:(required-covered)/60,hours:people.reduce((n,p)=>n+p.h,0),cost:Math.round(people.reduce((n,p)=>n+p.cost,0)),people,wants:wants.length,met,errors:validate(s,as)};
}
export function generate(s,seed=1){
 const bad=inputErrors(s);if(bad.length)return {assignments:[],errors:bad};
 let out=clone(s.assignments.filter(a=>a.locked));const fixedErrors=validate(s,out);if(fixedErrors.length)return {assignments:out,errors:fixedErrors};
 for(const d of days(s))for(const slot of ['early','late'])for(const role of s.roles){
 const existing=out.filter(a=>a.date===d&&a.role===role&&active(a,shifts[slot].start)).length;
 for(let n=existing;n<need(s,d,slot);n++){
 const candidates=s.staff.filter(p=>p.role===role&&!out.some(a=>a.staffId===p.id&&a.date===d)).map((p,i)=>{
 const a=assignment(p.id,d,slot,role),pref=available(s,p.id,d),hours=out.filter(a=>a.staffId===p.id).reduce((n,a)=>n+minutes(a)/60,0);
 const weekends=out.filter(a=>a.staffId===p.id&&[0,6].includes(weekday(a.date))).length;
 return {a,score:hours/Math.max(1,p.target)*100+(pref==='want'?-35:pref==='avoid'?80:0)+([0,6].includes(weekday(d))?weekends*12:0)+((i*7+seed)%13)/100};
 }).filter(x=>!validate(s,[...out,x.a]).length).sort((a,b)=>a.score-b.score);
 if(candidates.length)out.push(candidates[0].a);
 }
 }
 return {assignments:out,errors:[]};
}
export function repairs(s,id,date){
 const old=s.assignments.find(a=>a.staffId===id&&a.date===date);if(!old)return [];
 if(old.locked)return [];
 const base=s.assignments.filter(a=>a!==old),ss=clone(s);ss.preferences[id+'|'+date]='off';
 return s.staff.filter(p=>p.id!==id&&p.role===old.role&&!base.some(a=>a.staffId===p.id&&a.date===date)).map(p=>{const as=[...base,{...clone(old),staffId:p.id,locked:false}];return {person:p,assignments:as,metrics:metrics(ss,as),errors:validate(ss,as)};}).filter(c=>!c.errors.length).sort((a,b)=>a.metrics.cost-b.metrics.cost).slice(0,3);
}
export function makeHistory(){let rows=[];for(let i=0;i<92;i++){const date=dateAdd('2026-08-01',i),w=weekday(date);for(const slot of ['early','late'])rows.push({date,slot,status:'observed',count:([0,6].includes(w)?100:60)+(slot==='late'?10:0)+([0,4,-4,8,-8][i%5]),event:false});}return rows;}
export function forecast(history,date,slot,cutoff=date){const r=history.filter(r=>r.date<cutoff&&weekday(r.date)===weekday(date)&&r.slot===slot&&r.status==='observed'&&!r.event).sort((a,b)=>a.date.localeCompare(b.date)).slice(-8);if(r.length<4)return {value:null,n:r.length,range:null};const vs=r.map(r=>r.count).sort((a,b)=>a-b);return {value:(vs[Math.floor((vs.length-1)/2)]+vs[Math.floor(vs.length/2)])/2,n:r.length,range:[vs[0],vs.at(-1)]};}
export function evaluate(history){const test=history.filter(r=>r.date>='2026-10-01'&&r.date<'2026-11-01'&&r.status==='observed'&&!r.event);let medianError=0,baseError=0,n=0,total=0;for(const r of test){const f=forecast(history,r.date,r.slot,'2026-10-01');const prev=history.filter(x=>x.date<'2026-10-01'&&weekday(x.date)===weekday(r.date)&&x.slot===r.slot&&x.status==='observed'&&!x.event).sort((a,b)=>a.date.localeCompare(b.date)).at(-1);if(f.value===null||!prev)continue;medianError+=Math.abs(f.value-r.count);baseError+=Math.abs(prev.count-r.count);total+=r.count;n++;}return {n,mae:n?medianError/n:null,baseline:n?baseError/n:null,wape:total?medianError/total:null,improved:n>0&&medianError<baseError};}
export function learnedDemand(s,capacity=40){if(!Number.isFinite(capacity)||capacity<=0)throw new Error('処理能力は正の数にしてください');let overrides={};for(const d of days(s))for(const slot of ['early','late']){const f=forecast(s.history,d,slot,s.start);if(f.value!==null)overrides[d+'|'+slot]=Math.max(s.demand[slot],Math.min(10,Math.ceil(f.value/capacity)));}return overrides;}
export function csv(s){const safe=x=>{let v=String(x);if(/^[\s]*[=+@-]/.test(v))v="'"+v;return '"'+v.replaceAll('"','""')+'"';};return '\uFEFF'+[['DEMO・下書き','日付','スタッフ','役割','開始','終了','休憩'],...s.assignments.map(a=>['未確定',a.date,s.staff.find(p=>p.id===a.staffId)?.name||'',a.role,time(a.start),time(a.end),a.breaks.map(b=>time(b[0])+'–'+time(b[1])).join(' / ')])].map(r=>r.map(safe).join(',')).join('\r\n');}
