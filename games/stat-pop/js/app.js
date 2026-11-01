import { QUESTIONS } from './data/questions.js';
import { CONFIG, WORLDS } from './config.js';
import { loadState, saveState, clearState, grade, recordAnswer, percent } from './engine.js';

const app = document.querySelector('#app');
let state = loadState();
let view = 'home', worldIndex = 0, current = null, selected = null, feedback = null, displayedChoices = [], curveValues = [-1, 1];
const escape = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const all = Array.isArray(QUESTIONS) ? QUESTIONS : [];
const worldQuestions = i => i === 6 ? all : all.filter(q => String(q.world) === String(i + 1) || q.world === WORLDS[i].id);
const mastered = () => all.filter(q => state.mastered[q.id]).length;
const unlocked = i => i === 0 || (i === 6 ? [0,1,2,3,4,5].every(n => worldQuestions(n).some(q => state.attempted[q.id])) : percent(worldQuestions(i-1), state) >= 75);
const mascot = `<img class="mascot" src="assets/professor-puff.svg" alt="Professor Puff, a smiling cloud mascot">`;
const shell = content => `<header class="topbar"><button class="brand" data-action="home" aria-label="STAT POP home"><span class="brand-star">✦</span><span>STAT <b>POP!</b><small>MATH 2200 CANDY QUEST</small></span></button><div class="top-actions"><button class="icon-button motion-toggle" data-action="motion" aria-label="${state.reducedMotion?'Turn motion on':'Reduce motion'}" title="${state.reducedMotion?'Turn motion on':'Reduce motion'}">${state.reducedMotion?'◌':'✧'}</button><a href="${CONFIG.homeUrl}" class="home-link">yatawara.com ↗</a></div></header><main id="main" tabindex="-1">${content}</main><footer>Made for curious minds <span aria-hidden="true">✦</span> MATH 2200</footer>`;
function bar(value, label) { return `<div class="progress-track" role="progressbar" aria-label="${escape(label)}" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="100"><span style="width:${value}%"></span></div>`; }
function render() {
  document.body.classList.toggle('reduce-motion', !!state.reducedMotion);
  app.innerHTML = shell(view === 'home' ? home() : view === 'map' ? map() : view === 'question' ? question() : completion());
  if (view === 'question') document.querySelector('#question-title')?.focus();
}
function home() {
  const p = percent(all,state);
  return `<section class="hero"><div class="hero-copy"><div class="eyebrow"><span>✦</span> A LITTLE PRACTICE, A LOT OF POP</div><h1>Big stats.<br><em>Sweet victories.</em></h1><p class="hero-lead">Turn your MATH 2200 practice into a candy-colored quest. One little challenge at a time, you've got this.</p><div class="hero-buttons"><button class="button primary" data-action="map">${state.attempts ? 'Continue your quest' : 'Let’s play'} <span>→</span></button><span class="tiny-note">No login needed <span>✦</span> progress saves here</span></div></div><div class="hero-art"><div class="art-orbit orbit-one"></div><div class="art-orbit orbit-two"></div><span class="floating-candy candy-a">✦</span><span class="floating-candy candy-b">✿</span><span class="floating-candy candy-c">★</span><div class="mascot-disc">${mascot}</div><div class="art-label">YOUR STUDY SIDEKICK <strong>Professor Puff</strong></div></div></section><section class="home-bottom"><div class="progress-card"><div class="card-icon">✺</div><div class="progress-copy"><div class="label-row"><span>Your mastery</span><strong>${p}%</strong></div>${bar(p,'Overall mastery')}<small>${mastered()} of ${all.length} challenges mastered</small></div></div><div class="mini-card"><span class="mini-icon">♡</span><div><strong>Learn at your pace</strong><small>Try, learn, and try again.</small></div></div></section>${CONFIG.examNotice && !state.noticeDismissed ? `<aside class="notice"><span>✎</span><p>${escape(CONFIG.examNotice)}</p><button data-action="dismiss" aria-label="Dismiss exam reminder">×</button></aside>` : ''}`;
}
function map() {
  const cards = WORLDS.map((w,i) => { const q = worldQuestions(i), p = percent(q,state), open = unlocked(i); return `<article class="world-card ${w.color} ${!open?'locked':''}"><div class="world-top"><span class="world-number">${i===6?'FINAL WORLD':`WORLD ${String(i+1).padStart(2,'0')}`}</span><span class="world-symbol" aria-hidden="true">${w.icon}</span></div><h2>${escape(w.name)}</h2><p>${escape(w.description)}</p><div class="world-progress"><span>${i===6?'Overall mastery':'World mastery'}</span><strong>${p}%</strong></div>${bar(p,`${w.name} mastery`)}<button class="button world-button" data-action="world" data-index="${i}" ${open?'':'disabled'}>${open?(p===100?'Play again':'Explore world'):'🔒 Unlock by mastering the previous world'} <span>${open?'→':''}</span></button></article>`; }).join('');
  return `<section class="page-heading"><div><div class="eyebrow">✦ YOUR ADVENTURE AWAITS</div><h1>Choose your <em>world.</em></h1><p>Every challenge is a step toward mastery. Take your time and enjoy the journey.</p></div><div class="overall-pill"><span>OVERALL MASTERY</span><strong>${percent(all,state)}%</strong><small>${mastered()} / ${all.length} mastered</small></div></section><div class="world-grid">${cards}</div><div class="map-bottom"><p>Progress is saved on this device. You can come back anytime.</p><button class="text-button" data-action="reset">Reset progress</button></div>`;
}
function nextQuestion() {
  const list = worldQuestions(worldIndex); if (!list.length) { current = null; return; }
  const unmastered = list.filter(q => !state.mastered[q.id]);
  const pool = unmastered.length ? unmastered : list;
  // Unseen requirements first, then missed challenges. Original data order preserves staged sequences.
  current = pool.find(q => !state.attempted[q.id]) || pool[0];
  selected = ['order','formula','code'].includes(current.type) ? [] : ['match','sort'].includes(current.type) ? Array(current.items.length).fill('') : null; feedback = null;
  curveValues = [...(current.curveCutoffs || [-1, 1])];
  displayedChoices = [...(current.choices || [])];
  for (let i = displayedChoices.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [displayedChoices[i], displayedChoices[j]] = [displayedChoices[j], displayedChoices[i]]; }
}
function curveControl() {
  const x = z => 30 + (Number(z) + 3.5) / 7 * 440;
  const y = z => 150 - 125 * Math.exp(-0.5*z*z);
  const outline = Array.from({length:141}, (_, i) => {const z=-3.5+i*0.05; return `${i ? 'L':'M'}${x(z).toFixed(1)} ${y(z).toFixed(1)}`;}).join(' ');
  const a=curveValues[0] ?? -1, b=curveValues[1] ?? 1;
  const left=selected==='left' ? 30 : selected==='right' ? x(a) : Math.min(x(a),x(b));
  const right=selected==='left' ? x(a) : selected==='right' ? 470 : Math.max(x(a),x(b));
  const shading=selected ? `<clipPath id="curve-clip"><rect x="${left}" y="0" width="${Math.max(0,right-left)}" height="151"/></clipPath><path d="${outline} L470 150 L30 150 Z" fill="#f9a9cd" clip-path="url(#curve-clip)"/>` : '';
  const markers=curveValues.map(v=>`<line x1="${x(v)}" y1="${y(v)}" x2="${x(v)}" y2="150" stroke="#bc5997" stroke-width="2" stroke-dasharray="4 3"/><text x="${x(v)}" y="170" text-anchor="middle" fill="#75476c" font-size="12">${Number(v).toFixed(2)}</text>`).join('');
  const markerMode = current.type === 'curve-marker';
  return `<div class="curve-widget"><p class="curve-intro">${markerMode ? 'Move the cutoff to your answer, then check it.' : 'Choose the region described in the question. Move the cutoffs to explore; grading checks your region choice.'}</p><svg viewBox="0 0 500 180" role="img" aria-label="Normal curve. ${selected ? `Currently shading ${selected}.` : 'No region selected.'} Cutoff values: ${curveValues.join(' and ')}.">${shading}<path d="${outline}" fill="none" stroke="#8456b2" stroke-width="3"/><line x1="30" y1="150" x2="470" y2="150" stroke="#a98eab" stroke-width="2"/>${markers}<text x="250" y="170" text-anchor="middle" fill="#756479" font-size="12">0</text></svg><div class="curve-sliders">${curveValues.map((v,i)=>`<label>Cutoff ${i+1}: <output>${Number(v).toFixed(2)}</output><input type="range" min="-3.5" max="3.5" step="0.05" value="${v}" data-curve-index="${i}" ${feedback?'disabled':''}></label>`).join('')}</div>${markerMode ? '' : `<div class="curve-choices" role="group" aria-label="Choose shaded region">${[['left','Left of cutoff'],['right','Right of cutoff'],['between','Between cutoffs']].map(([id,label])=>`<button class="choice ${selected===id?'selected':''}" data-action="select" data-value="${id}" aria-pressed="${selected===id}" ${feedback?'disabled':''}>${label} ${selected===id?'✓':''}</button>`).join('')}</div>`}</div>`;
}
function orderControl(q) {
  const built = Array.isArray(selected) ? selected : [];
  return `<p class="input-hint">Tap the pieces in the correct order. Tap a selected piece to remove it.</p><div class="order-built" aria-label="Your sequence">${built.length ? built.map((id,i) => `<button class="order-piece selected" data-action="remove-piece" data-index="${i}" ${feedback?'disabled':''}>${escape(q.choices.find(c => c.id === id)?.text || id)} ×</button>`).join('') : '<span>Your pieces will appear here</span>'}</div><div class="order-pieces">${displayedChoices.filter(c => !built.includes(c.id)).map(c => `<button class="order-piece" data-action="add-piece" data-value="${escape(c.id)}" ${feedback?'disabled':''}>${escape(c.text)} +</button>`).join('')}</div>`;
}
function categoryControl(q) {
  return `<p class="input-hint">${q.type === 'match' ? 'Match each term with its definition.' : 'Choose a category for each item.'}</p><div class="category-list">${q.items.map((item,i) => `<label class="category-row"><span>${escape(item)}</span><select data-category-index="${i}" ${feedback?'disabled':''}><option value="">Choose ${q.type === 'match' ? 'a match' : 'a category'}…</option>${q.choices.map(c => `<option value="${escape(c.id)}" ${selected[i]===c.id?'selected':''}>${escape(c.text)}</option>`).join('')}</select></label>`).join('')}</div>`;
}
function question() {
  const w = WORLDS[worldIndex], q = current;
  if (!q) return `<section class="empty"><h1>Nothing here yet</h1><p>This world is getting ready for you.</p><button class="button primary" data-action="map">Back to worlds</button></section>`;
  const p = percent(worldQuestions(worldIndex),state), numeric = q.type === 'numeric' || typeof q.answer === 'number';
  let choices = '';
  if (q.type === 'curve' || q.type === 'curve-marker') choices = curveControl();
  else if (['order','formula','code'].includes(q.type)) choices = orderControl(q);
  else if (['match','sort'].includes(q.type)) choices = categoryControl(q);
  else if (numeric) choices = `<label class="input-label" for="numeric-answer">Your answer</label><input id="numeric-answer" class="numeric-input" type="text" inputmode="decimal" autocomplete="off" placeholder="Type a number" value="${escape(selected ?? '')}" ${feedback?'disabled':''}><small class="input-hint">${q.allowPercent ? 'A decimal or percentage is welcome.' : 'Enter your answer as a number.'}</small>`;
  else if (Array.isArray(q.choices)) choices = `<div class="choices" role="group" aria-label="Answer choices">${displayedChoices.map((c,i)=>`<button class="choice ${selected===c.id?'selected':''}" data-action="select" data-value="${escape(c.id)}" aria-pressed="${selected===c.id}" ${feedback?'disabled':''}><span class="choice-badge">${escape(String.fromCharCode(65+i))}</span><span>${escape(c.text)}</span><span class="choice-check">${selected===c.id?'✓':''}</span></button>`).join('')}</div>`;
  else choices = `<p>Sorry, this challenge could not be loaded. You can return to the map and try another.</p>`;
  const result = feedback ? `<div class="feedback ${feedback.correct?'good':'try-again'}" role="status" aria-live="polite"><div class="feedback-icon">${feedback.correct?'✦':'♡'}</div><div><strong>${feedback.correct?'Sweet work!':'Keep going — you’re learning.'}</strong><p>${escape(feedback.correct ? q.explanation : (q.hint || 'Take another look at the question and give it another try.'))}</p>${!feedback.correct ? `<details><summary>Show explanation</summary><p>${escape(q.explanation)}</p></details>`:''}</div></div>` : '';
  const dev = new URLSearchParams(location.search).get('dev') === '1' ? `<details class="dev"><summary>Developer details</summary><p>ID: ${escape(q.id)} · World: ${escape(q.world)} · Answer: ${escape(q.answer)}</p></details>`:'';
  return `<section class="play-header"><button class="back-button" data-action="map">← <span>World map</span></button><div class="play-progress"><div class="label-row"><span>${escape(w.name)}</span><strong>${p}%</strong></div>${bar(p,'World mastery')}</div><div class="play-count"><strong>${percent(all,state)}%</strong><span>overall</span></div></section><section class="challenge"><div class="challenge-top"><span class="challenge-tag">✦ ${escape(w.short)}</span><span class="challenge-count">${mastered()} / ${all.length} MASTERED</span></div><h1 id="question-title" tabindex="-1">${escape(q.prompt)}</h1>${q.context?`<p class="question-context">${escape(q.context)}</p>`:''}${/^OE03[bc]/.test(q.id)?'<img class="source-graph" src="assets/exercise-histogram.svg" alt="Histogram of weekly exercise hours, with most observations at lower values and a tail extending toward 18 hours">':''}${/^OE13[abc]/.test(q.id)?'<img class="source-graph" src="assets/streams-scatterplot.svg" alt="Scatterplot of nitrate on the horizontal axis and dissolved oxygen on the vertical axis; the plotted points descend from left to right">':''}${choices}${result}<div class="challenge-actions">${feedback ? `<button class="button primary" data-action="${feedback.correct?'next':'retry'}">${feedback.correct?'Continue':'Try again'} <span>→</span></button>${!feedback.correct?'<button class="text-button" data-action="next">Come back later</button>':''}` : `<button class="button primary" data-action="check">Check answer <span>→</span></button>`}</div>${dev}</section><p class="encouragement">✧ &nbsp; Progress, not perfection. You can always try again.</p>`;
}
function completion() { return `<section class="completion">${mascot}<div class="eyebrow">✦ YOU DID IT ✦</div><h1>100% KNOWLEDGE <em>CLEARED!</em></h1><p>You have correctly completed every required challenge in this quest.</p><div class="completion-stats"><div><strong>100%</strong><span>mastery</span></div><div><strong>${state.attempts}</strong><span>attempts</span></div><div><strong>6</strong><span>worlds explored</span></div></div><button class="button primary" data-action="map">Replay mixed review →</button><button class="text-button" data-action="reset">Reset game</button><a href="${CONFIG.homeUrl}">Return to yatawara.com</a></section>`; }
app.addEventListener('change', e => {
  if (e.target.matches('[data-category-index]')) selected[Number(e.target.dataset.categoryIndex)] = e.target.value;
  if (e.target.matches('[data-curve-index]')) { curveValues[Number(e.target.dataset.curveIndex)] = Number(e.target.value); const focused = e.target.dataset.curveIndex; render(); document.querySelector('[data-curve-index="' + focused + '"]')?.focus(); }
});
app.addEventListener('click', e => {
  const button = e.target.closest('[data-action]'); if (!button || button.disabled) return;
  const action = button.dataset.action;
  if (action === 'home') view='home';
  if (action === 'map') view='map';
  if (action === 'motion') { state.reducedMotion=!state.reducedMotion; saveState(state); }
  if (action === 'dismiss') { state.noticeDismissed=true; saveState(state); }
  if (action === 'reset') { if (!confirm('Reset all quest progress on this device? This cannot be undone.')) return; state=clearState(); view='home'; }
  if (action === 'world') { worldIndex=Number(button.dataset.index); if (!unlocked(worldIndex)) return; state.lastWorld=worldIndex; saveState(state); nextQuestion(); view='question'; }
  if (action === 'select') selected=button.dataset.value;
  if (action === 'add-piece') selected.push(button.dataset.value);
  if (action === 'remove-piece') selected.splice(Number(button.dataset.index),1);
  if (action === 'check') {
    if (!current) return;
    const input=document.querySelector('#numeric-answer'); if (input) selected=input.value;
    if (current.type === 'curve-marker') selected=curveValues[0];
    if (selected === null || String(selected).trim() === '' || (['match','sort'].includes(current.type) && selected.some(v => !v))) { const notice=document.querySelector('.challenge-actions'); notice.insertAdjacentHTML('beforebegin','<p class="validation" role="alert">Choose or enter an answer first.</p>'); return; }
    const correct=grade(current,selected); recordAnswer(state,current,correct); saveState(state); feedback={correct};
  }
  if (action === 'retry') { feedback=null; selected=['order','formula','code'].includes(current.type) ? [] : ['match','sort'].includes(current.type) ? Array(current.items.length).fill('') : null; }
  if (action === 'next') { if (mastered() === all.length && all.length) view='completion'; else nextQuestion(); }
  render();
});
render();



