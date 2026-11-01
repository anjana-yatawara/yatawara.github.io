import test from 'node:test';
import assert from 'node:assert/strict';
import {QUESTIONS} from '../js/data/questions.js';
import {freshState,grade,recordAnswer,percent,loadState,saveState,clearState} from '../js/engine.js';

test('source activities have unique IDs, valid answers and explanations',()=>{
 const ids=QUESTIONS.map(q=>q.id); assert.equal(new Set(ids).size,ids.length);
 for(const prefix of ['MC','TF']) for(let i=1;i<=20;i++) assert.ok(ids.includes(prefix+String(i).padStart(2,'0')));
 for(const q of QUESTIONS) {assert.ok(q.prompt&&q.explanation&&q.masteryKey,q.id); assert.notEqual(q.answer,undefined,q.id); if(q.choices) {if(Array.isArray(q.answer)) assert.ok(q.answer.every(id=>q.choices.some(c=>c.id===id)),q.id); else assert.ok(q.choices.some(c=>c.id===q.answer),q.id); assert.equal(new Set(q.choices.map(c=>c.text)).size,q.choices.length,`duplicate choices ${q.id}`);}}
});
test('numeric tolerance and allowed percentages',()=>{assert.ok(grade({type:'numeric',answer:.0885,tolerance:.0006},'.0889'));assert.ok(!grade({type:'numeric',answer:.0885,tolerance:.0006},'.09'));assert.ok(grade({type:'numeric',answer:.0885,allowPercent:true},'8.85%'));assert.ok(!grade({type:'numeric',answer:.0885},'8.85%'));});
test('each question contributes at most one point on its first submission',()=>{const s=freshState(),qs=[{id:'a'},{id:'b'}];recordAnswer(s,qs[0],false);assert.equal(s.score,0);recordAnswer(s,qs[0],true);assert.equal(s.score,0);assert.equal(s.attempts,1);recordAnswer(s,qs[1],true);assert.equal(s.score,1);assert.equal(s.attempts,2);assert.equal(percent(qs,s),50);});
test('storage handles roundtrip, corruption, version and reset',()=>{let raw=null;const storage={getItem:()=>raw,setItem:(_,v)=>raw=v,removeItem:()=>raw=null};const s=freshState();s.attempts=3;assert.ok(saveState(s,storage));assert.equal(loadState(storage).attempts,3);raw='{';assert.equal(loadState(storage).attempts,0);raw=JSON.stringify({version:999,attempts:5});assert.equal(loadState(storage).attempts,0);clearState(storage);assert.equal(raw,null);});

test('independent coverage manifest exactly matches playable activities', async()=>{const {REQUIRED_SOURCE_ITEMS}=await import('../js/data/coverageManifest.js'); const ids=QUESTIONS.map(q=>q.id); assert.equal(new Set(REQUIRED_SOURCE_ITEMS).size,REQUIRED_SOURCE_ITEMS.length); assert.deepEqual([...ids].sort(),[...REQUIRED_SOURCE_ITEMS].sort()); for(let i=1;i<=14;i++) assert.ok(REQUIRED_SOURCE_ITEMS.some(id=>id.startsWith('OE'+String(i).padStart(2,'0'))),`missing OE${i}`);});


test('matching, sorting, and R-code assembly grade complete stable-ID sequences',()=>{
 for (const id of ['OE04b-terms-match','OE02b-variable-sort','OE12-r-code-builder']) {
  const q=QUESTIONS.find(item=>item.id===id); assert.ok(q,id); assert.ok(grade(q,[...q.answer]),id); assert.ok(!grade(q,q.answer.slice(1)),id); assert.ok(!grade(q,[...q.answer].reverse()),id);
 }
});
