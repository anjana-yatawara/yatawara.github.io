import { CONFIG } from './config.js';
export const freshState = () => ({version:1, attempted:{}, mastered:{}, errors:{}, retryQueue:[], score:0, attempts:0, noticeDismissed:false, reducedMotion:false, lastWorld:null});
export function loadState(storage = globalThis.localStorage) {
  try { const raw = storage?.getItem(CONFIG.storageKey); if (!raw) return freshState(); const saved = JSON.parse(raw); if (!saved || saved.version !== 1) return freshState(); return {...freshState(), ...saved}; } catch { return freshState(); }
}
export function saveState(state, storage = globalThis.localStorage) { try { storage?.setItem(CONFIG.storageKey, JSON.stringify(state)); return true; } catch { return false; } }
export function clearState(storage = globalThis.localStorage) { try { storage?.removeItem(CONFIG.storageKey); } catch {} return freshState(); }
export function grade(question, response) {
  if (question.type === 'numeric' || typeof question.answer === 'number') {
    let text = String(response ?? '').trim(); const percent = text.endsWith('%'); if (percent && !question.allowPercent) return false;
    const value = Number(percent ? text.slice(0,-1) : text); if (!text || !Number.isFinite(value)) return false;
    return Math.abs((percent ? value / 100 : value) - Number(question.answer)) <= (question.tolerance ?? 0.0005);
  }
  if (Array.isArray(question.answer)) return Array.isArray(response) && JSON.stringify(response) === JSON.stringify(question.answer);
  return String(response ?? '').trim() === String(question.answer ?? '').trim();
}
// Each question is scored once, on its first submitted response.
export function recordAnswer(state, question, correct) {
  const key = question.id;
  if (state.attempted[key]) return state;
  state.attempts++; state.attempted[key] = 1;
  if (correct) { state.score++; state.mastered[key] = true; }
  else { state.errors[key] = 1; }
  return state;
}
export const percent = (questions, state) => questions.length ? Math.floor(100 * questions.filter(q => state.mastered[q.id]).length / questions.length) : 0;
