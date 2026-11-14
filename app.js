/**
 * TITAN WORKOUT JOURNAL - MASTER PROGRESSIVE OVERLOAD ENGINE
 * Master 14-Day A/B Program | 77kg Lean Bulk Protocol
 */

// Storage Key
const APP_STORAGE_KEY = 'titan_workout_journal_v2';

// Application State
let appState = {
  currentDay: 1,
  currentWeek: 'A',
  sessionStartTime: null,
  sessionSeconds: 0,
  sessionTimerRunning: false,
  sessionTimerInterval: null,
  
  restTimerRunning: false,
  restTimerSeconds: 0,
  restTimerInterval: null,
  
  syncKey: '',
  firebaseUrl: '',
  completedWorkouts: [],
  inProgressLogs: {}, // { [day]: { [exId]: [{ weight, reps, done }] } }
  personalRecords: {}, // { [canonName]: { maxWeight, reps, date } }
  customVideos: {}, // { [canonName]: url }
  activeModalExCanon: null
};

// Web Audio API Context for Gym Alert Chimes (No external sound files required)
let audioCtx = null;
function playGymChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    
    const now = audioCtx.currentTime;
    
    // Pleasant two-tone chime
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now); // D5
    gain1.gain.setValueAtTime(0.2, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    osc1.start(now);
    osc1.stop(now + 0.35);
    
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880.00, now + 0.15); // A5
    gain2.gain.setValueAtTime(0.25, now + 0.15);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);
    osc2.start(now + 0.15);
    osc2.stop(now + 0.65);
    
    // Trigger mobile haptic vibration if supported
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 300]);
    }
  } catch (e) {
    console.log('Audio chime not supported:', e);
  }
}

/* ==========================================================================
   INITIALIZATION & PERSISTENCE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  loadLocalState();
  handleUrlSyncKey();
  initWeekAndDayPills();
  renderCurrentDay();
  renderSplitRoadmap();
  renderPRsAndHistory();
  initSyncKeyUI();
  
  // Register Service Worker for PWA
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(err => console.log('SW registration note:', err));
  }
  
  // Try silent cloud pull
  silentCloudPull();
});

function loadLocalState() {
  try {
    const raw = localStorage.getItem(APP_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      appState.currentDay = parsed.currentDay || 1;
      appState.currentWeek = parsed.currentDay > 7 ? 'B' : 'A';
      appState.syncKey = parsed.syncKey || '';
      appState.firebaseUrl = parsed.firebaseUrl || '';
      appState.completedWorkouts = parsed.completedWorkouts || [];
      appState.inProgressLogs = parsed.inProgressLogs || {};
      appState.personalRecords = parsed.personalRecords || {};
      appState.customVideos = parsed.customVideos || {};
    }
  } catch (e) {
    console.error('Failed to load local state:', e);
  }

  // Ensure default sync key if none exists
  if (!appState.syncKey) {
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    appState.syncKey = `TITAN-77KG-${randomHex}`;
    saveLocalState();
  }
}

function saveLocalState() {
  try {
    const toSave = {
      currentDay: appState.currentDay,
      syncKey: appState.syncKey,
      firebaseUrl: appState.firebaseUrl,
      completedWorkouts: appState.completedWorkouts,
      inProgressLogs: appState.inProgressLogs,
      personalRecords: appState.personalRecords,
      customVideos: appState.customVideos
    };
    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(toSave));
  } catch (e) {
    console.error('Failed to save local state:', e);
  }
}

// Handle URL query parameter `?sync=KEY&fb=URL` for 1-second instant phone pairing
function handleUrlSyncKey() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const syncParam = urlParams.get('sync');
    const fbParam = urlParams.get('fb');
    let updated = false;

    if (syncParam && syncParam.trim() !== '') {
      appState.syncKey = syncParam.trim();
      updated = true;
    }
    if (fbParam && fbParam.trim() !== '') {
      appState.firebaseUrl = fbParam.trim();
      updated = true;
    }

    if (updated) {
      saveLocalState();
      showToast(`📲 Synced to device vault!`);
      // Clean up URL without reloading
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
      silentCloudPull();
    }
  } catch (e) {
    console.error('Sync key URL parsing error:', e);
  }
}

/* ==========================================================================
   TABS NAVIGATION
   ========================================================================== */

function switchTab(tabName) {
  // Update nav buttons
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));

  if (tabName === 'workout') {
    document.getElementById('tabBtnWorkout').classList.add('active');
    document.getElementById('panelWorkout').classList.add('active');
  } else if (tabName === 'split') {
    document.getElementById('tabBtnSplit').classList.add('active');
    document.getElementById('panelSplit').classList.add('active');
    renderSplitRoadmap();
  } else if (tabName === 'history') {
    document.getElementById('tabBtnHistory').classList.add('active');
    document.getElementById('panelHistory').classList.add('active');
    renderPRsAndHistory();
  } else if (tabName === 'sync') {
    document.getElementById('tabBtnSync').classList.add('active');
    document.getElementById('panelSync').classList.add('active');
    renderSyncQR();
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ==========================================================================
   WEEK & DAY SELECTION
   ========================================================================== */

function selectWeek(week) {
  appState.currentWeek = week;
  document.getElementById('btnWeekA').classList.toggle('active', week === 'A');
  document.getElementById('btnWeekB').classList.toggle('active', week === 'B');

  // If active day is not in selected week, switch to the first day of that week
  if (week === 'A' && appState.currentDay > 7) {
    selectDay(1);
  } else if (week === 'B' && appState.currentDay <= 7) {
    selectDay(8);
  } else {
    initWeekAndDayPills();
  }
}

function selectDay(dayNum) {
  appState.currentDay = dayNum;
  appState.currentWeek = dayNum <= 7 ? 'A' : 'B';
  document.getElementById('btnWeekA').classList.toggle('active', appState.currentWeek === 'A');
  document.getElementById('btnWeekB').classList.toggle('active', appState.currentWeek === 'B');

  saveLocalState();
  initWeekAndDayPills();
  renderCurrentDay();
  switchTab('workout');
}

function initWeekAndDayPills() {
  const container = document.getElementById('daysScrollRow');
  container.innerHTML = '';

  const startDay = appState.currentWeek === 'A' ? 1 : 8;
  const endDay = appState.currentWeek === 'A' ? 7 : 14;

  for (let d = startDay; d <= endDay; d++) {
    const dayData = MASTER_WORKOUT_PROGRAM.find(item => item.day === d);
    if (!dayData) continue;

    const btn = document.createElement('button');
    btn.className = `day-pill-btn ${d === appState.currentDay ? 'active' : ''}`;
    btn.onclick = () => selectDay(d);

    const titleParts = dayData.title.split(' ');
    const shortTitle = titleParts[0];

    btn.innerHTML = `
      <span class="day-pill-num">Day ${d}</span>
      <span class="day-pill-name">${shortTitle}</span>
    `;
    container.appendChild(btn);
  }
}

/* ==========================================================================
   PROGRESSIVE OVERLOAD & PREVIOUS SESSION LOOKUP ENGINE
   ========================================================================== */

/**
 * Looks up the most recent completed session containing this exact exercise (by canonical name).
 * Evaluates whether the athlete achieved max reps across all completed sets to trigger overload.
 */
function getPreviousSessionForExercise(canonName) {
  if (!appState.completedWorkouts || appState.completedWorkouts.length === 0) {
    return null;
  }

  // Iterate backwards from newest completed workout
  for (let i = appState.completedWorkouts.length - 1; i >= 0; i--) {
    const workout = appState.completedWorkouts[i];
    if (!workout.exercises) continue;

    const match = workout.exercises.find(e => e.canonName === canonName || e.name === canonName);
    if (match && match.sets && match.sets.length > 0) {
      // Find weights and reps
      const completedSets = match.sets.filter(s => s.done);
      if (completedSets.length === 0) continue;

      let maxWeight = 0;
      let minWeight = Infinity;
      let totalReps = 0;

      completedSets.forEach(s => {
        const w = parseFloat(s.weight) || 0;
        if (w > maxWeight) maxWeight = w;
        if (w < minWeight) minWeight = w;
        totalReps += parseInt(s.reps, 10) || 0;
      });

      // Format previous summary string: e.g. "20kg x 10" or "60kg x 5, 5"
      const prevString = completedSets.map(s => `${s.weight}kg × ${s.reps}`).join(' | ');

      return {
        date: workout.date || 'Previous',
        sets: completedSets,
        maxWeight: maxWeight,
        firstSetWeight: completedSets[0].weight,
        prevString: prevString,
        allSetsHitMaxReps: (maxReps) => completedSets.every(s => (parseInt(s.reps, 10) || 0) >= maxReps)
      };
    }
  }

  return null;
}

/* ==========================================================================
   RENDER CURRENT DAY & EXERCISE CARDS
   ========================================================================== */

function renderCurrentDay() {
  const dayData = MASTER_WORKOUT_PROGRAM.find(d => d.day === appState.currentDay);
  if (!dayData) return;

  // Header badges & text
  document.getElementById('dayWeekBadge').textContent = dayData.week;
  document.getElementById('dayNumberBadge').textContent = `Day ${dayData.day}`;
  document.getElementById('dayMainTitle').textContent = dayData.title;
  document.getElementById('dayFocusDesc').textContent = dayData.focus;

  // Pre-workout warm up
  const preCard = document.getElementById('preWorkoutCard');
  const restMessage = document.getElementById('restDayMessage');
  const finishContainer = document.getElementById('finishWorkoutContainer');

  if (dayData.isRestDay) {
    preCard.style.display = 'none';
    restMessage.style.display = 'block';
    finishContainer.style.display = 'none';
    document.getElementById('exerciseList').innerHTML = '';
    return;
  }

  preCard.style.display = 'flex';
  restMessage.style.display = 'none';
  finishContainer.style.display = 'block';
  document.getElementById('preWorkoutText').textContent = dayData.preWorkout;

  // Render Exercise Cards
  const exContainer = document.getElementById('exerciseList');
  exContainer.innerHTML = '';

  // Initialize in-progress state for this day if not present
  if (!appState.inProgressLogs[dayData.day]) {
    appState.inProgressLogs[dayData.day] = {};
  }
  const dayLogs = appState.inProgressLogs[dayData.day];

  dayData.exercises.forEach(ex => {
    // Check previous session
    const prev = getPreviousSessionForExercise(ex.canonName);
    const isOverloadReady = prev ? prev.allSetsHitMaxReps(ex.maxReps) : false;
    const suggestedOverloadWeight = prev ? (prev.maxWeight + 2.5) : ex.defaultWeight;

    // Check or initialize in-progress sets
    if (!dayLogs[ex.id]) {
      const initialSets = [];
      const defaultSetWeight = isOverloadReady 
        ? suggestedOverloadWeight 
        : (prev ? prev.maxWeight : ex.defaultWeight);
      
      const defaultSetReps = isOverloadReady ? ex.minReps : ex.defaultReps;

      for (let s = 1; s <= ex.sets; s++) {
        initialSets.push({
          weight: defaultSetWeight,
          reps: defaultSetReps,
          done: false
        });
      }
      dayLogs[ex.id] = initialSets;
    }

    const currentSets = dayLogs[ex.id];

    // Build Exercise Card Element
    const card = document.createElement('div');
    card.className = `exercise-card ${currentSets.every(s => s.done) ? 'all-done' : ''}`;
    card.id = `card_${ex.id}`;

    // Superset / TopSet badge
    let badgesHtml = '';
    if (ex.superset) {
      badgesHtml += `<span class="superset-badge superset-${ex.superset}">Superset ${ex.superset}</span>`;
    }
    if (ex.isTopSet) {
      badgesHtml += `<span class="topset-badge">Top Set Protocol</span>`;
    }

    // Overload Recommendation Banner
    let overloadBannerHtml = '';
    if (isOverloadReady) {
      overloadBannerHtml = `
        <div class="overload-banner ready">
          <div class="overload-text">
            🔥 <strong>Ready to Overload: +2.5 kg (${suggestedOverloadWeight} kg)</strong>
            <div style="font-size: 0.74rem; opacity: 0.9;">Hit all ${ex.maxReps} reps last session! Building back up from ${ex.minReps} reps.</div>
          </div>
          <button class="btn-apply-overload" onclick="applyOverload('${ex.id}', ${suggestedOverloadWeight}, ${ex.minReps})">
            ⚡ Apply +2.5 kg
          </button>
        </div>
      `;
    } else if (prev) {
      overloadBannerHtml = `
        <div class="overload-banner hold">
          <div class="overload-text">
            🎯 <strong>Keep ${prev.maxWeight} kg</strong> — Aim to beat last session (Target: ${ex.maxReps} reps across all sets).
          </div>
        </div>
      `;
    } else {
      overloadBannerHtml = `
        <div class="overload-banner baseline">
          <div class="overload-text">
            🌱 <strong>Baseline Session:</strong> Establish starting weight with 1–2 Reps in Reserve (RIR).
          </div>
        </div>
      `;
    }

    // Build Sets Rows
    let setsRowsHtml = '';
    currentSets.forEach((set, sIdx) => {
      const prevSetDisplay = (prev && prev.sets[sIdx]) 
        ? `${prev.sets[sIdx].weight}kg × ${prev.sets[sIdx].reps}`
        : (prev && prev.sets[0] ? `${prev.sets[0].weight}kg × ${prev.sets[0].reps}` : '—');

      setsRowsHtml += `
        <div class="set-row ${set.done ? 'done' : ''}" id="row_${ex.id}_${sIdx}">
          <div class="set-index-badge">${sIdx + 1}</div>
          <div class="prev-data-cell" title="Previous session">${prevSetDisplay}</div>
          
          <div class="input-with-stepper">
            <button class="stepper-btn" onclick="stepWeight('${ex.id}', ${sIdx}, -2.5)">-</button>
            <input type="number" step="0.5" class="log-number-input" id="weight_${ex.id}_${sIdx}" 
              value="${set.weight}" onchange="updateSetData('${ex.id}', ${sIdx})" placeholder="kg">
            <button class="stepper-btn" onclick="stepWeight('${ex.id}', ${sIdx}, 2.5)">+</button>
          </div>

          <div class="input-with-stepper">
            <button class="stepper-btn" onclick="stepReps('${ex.id}', ${sIdx}, -1)">-</button>
            <input type="number" step="1" class="log-number-input" id="reps_${ex.id}_${sIdx}" 
              value="${set.reps}" onchange="updateSetData('${ex.id}', ${sIdx})" placeholder="reps">
            <button class="stepper-btn" onclick="stepReps('${ex.id}', ${sIdx}, 1)">+</button>
          </div>

          <button class="btn-check-done ${set.done ? 'done' : ''}" 
            onclick="toggleSetComplete('${ex.id}', ${sIdx}, ${ex.restSec})" title="Mark Set Done">
            ${set.done ? '✓' : '○'}
          </button>
        </div>
      `;
    });

    card.innerHTML = `
      <div class="exercise-header">
        <div class="ex-title-group">
          <div class="ex-meta-row">
            ${badgesHtml}
            <span class="target-badge">${ex.sets} Sets &bull; Target: ${ex.repRange} &bull; ⏱️ ${ex.restSec}s Rest</span>
          </div>
          <h3 class="ex-name">${ex.name}</h3>
        </div>

        <button class="ex-video-btn" onclick="openVideoModal('${encodeURIComponent(ex.canonName)}', '${encodeURIComponent(ex.name)}')">
          🎬 Form Guide
        </button>
      </div>

      ${overloadBannerHtml}

      <div class="cue-box">
        <strong>💡 Execution Cue:</strong> ${ex.cue}
      </div>

      <div class="sets-table">
        <div class="sets-header-row">
          <span>Set</span>
          <span>Prev</span>
          <span>Weight (kg)</span>
          <span>Reps</span>
          <span>Done</span>
        </div>
        ${setsRowsHtml}
      </div>

      <div class="card-footer-actions">
        <button class="btn-text-action" onclick="addSetToExercise('${ex.id}', ${ex.minReps})">
          + Add Extra Set
        </button>
        <span style="font-size: 0.72rem; color: var(--text-faint);">
          Target: ${ex.minReps}–${ex.maxReps} reps
        </span>
      </div>
    `;

    exContainer.appendChild(card);
  });
}

/* ==========================================================================
   ONE-TAP PROGRESSIVE OVERLOAD APPLY & SET INTERACTIONS
   ========================================================================== */

function applyOverload(exId, newWeight, bottomReps) {
  const dayData = MASTER_WORKOUT_PROGRAM.find(d => d.day === appState.currentDay);
  if (!dayData) return;

  const sets = appState.inProgressLogs[dayData.day][exId];
  if (!sets) return;

  sets.forEach((set, idx) => {
    set.weight = newWeight;
    set.reps = bottomReps;
    const wInput = document.getElementById(`weight_${exId}_${idx}`);
    const rInput = document.getElementById(`reps_${exId}_${idx}`);
    if (wInput) wInput.value = newWeight;
    if (rInput) rInput.value = bottomReps;
  });

  saveLocalState();
  showToast(`⚡ Overload Applied: ${newWeight} kg × ${bottomReps} reps!`);
}

function stepWeight(exId, setIdx, delta) {
  const day = appState.currentDay;
  const set = appState.inProgressLogs[day][exId][setIdx];
  let cur = parseFloat(set.weight) || 0;
  cur = Math.max(0, cur + delta);
  set.weight = cur;
  const input = document.getElementById(`weight_${exId}_${setIdx}`);
  if (input) input.value = cur;
  saveLocalState();
}

function stepReps(exId, setIdx, delta) {
  const day = appState.currentDay;
  const set = appState.inProgressLogs[day][exId][setIdx];
  let cur = parseInt(set.reps, 10) || 0;
  cur = Math.max(1, cur + delta);
  set.reps = cur;
  const input = document.getElementById(`reps_${exId}_${setIdx}`);
  if (input) input.value = cur;
  saveLocalState();
}

function updateSetData(exId, setIdx) {
  const day = appState.currentDay;
  const set = appState.inProgressLogs[day][exId][setIdx];
  const wInput = document.getElementById(`weight_${exId}_${setIdx}`);
  const rInput = document.getElementById(`reps_${exId}_${setIdx}`);
  
  if (wInput) set.weight = parseFloat(wInput.value) || 0;
  if (rInput) set.reps = parseInt(rInput.value, 10) || 0;
  saveLocalState();
}

function addSetToExercise(exId, defaultReps) {
  const day = appState.currentDay;
  const sets = appState.inProgressLogs[day][exId];
  const lastSet = sets[sets.length - 1] || { weight: 20, reps: defaultReps };
  sets.push({
    weight: lastSet.weight,
    reps: lastSet.reps,
    done: false
  });
  saveLocalState();
  renderCurrentDay();
  showToast('Set added!');
}

function toggleSetComplete(exId, setIdx, restSec) {
  const day = appState.currentDay;
  const set = appState.inProgressLogs[day][exId][setIdx];
  
  // Read latest input values
  const wInput = document.getElementById(`weight_${exId}_${setIdx}`);
  const rInput = document.getElementById(`reps_${exId}_${setIdx}`);
  if (wInput) set.weight = parseFloat(wInput.value) || 0;
  if (rInput) set.reps = parseInt(rInput.value, 10) || 0;

  set.done = !set.done;

  // Update UI row
  const row = document.getElementById(`row_${exId}_${setIdx}`);
  const btn = row.querySelector('.btn-check-done');
  if (set.done) {
    row.classList.add('done');
    btn.classList.add('done');
    btn.textContent = '✓';
    
    // Automatically start session stopwatch if not started
    if (!appState.sessionTimerRunning) {
      startSessionTimer();
    }

    // Trigger Rest Timer Countdown
    if (restSec && restSec > 0) {
      startRestTimer(restSec);
    }

    showToast(`Set ${setIdx + 1} Done: ${set.weight} kg × ${set.reps} reps`);
  } else {
    row.classList.remove('done');
    btn.classList.remove('done');
    btn.textContent = '○';
  }

  // Update card border if all sets are done
  const card = document.getElementById(`card_${exId}`);
  const allDone = appState.inProgressLogs[day][exId].every(s => s.done);
  card.classList.toggle('all-done', allDone);

  saveLocalState();
  silentCloudPush();
}

/* ==========================================================================
   REST TIMER & AUDIO ALERTS
   ========================================================================== */

function startRestTimer(seconds) {
  clearInterval(appState.restTimerInterval);
  appState.restTimerSeconds = seconds;
  appState.restTimerRunning = true;

  const dock = document.getElementById('floatingRestDock');
  const clock = document.getElementById('dockTimeCountdown');
  dock.classList.add('visible');

  function updateDisplay() {
    const m = Math.floor(appState.restTimerSeconds / 60);
    const s = appState.restTimerSeconds % 60;
    clock.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  updateDisplay();

  appState.restTimerInterval = setInterval(() => {
    appState.restTimerSeconds--;
    if (appState.restTimerSeconds <= 0) {
      clearInterval(appState.restTimerInterval);
      appState.restTimerRunning = false;
      dock.classList.remove('visible');
      playGymChime();
      showToast('🔔 Rest Over! Next Set Ready!');
    } else {
      updateDisplay();
    }
  }, 1000);
}

function addRestTimerSeconds(secs) {
  appState.restTimerSeconds += secs;
  const m = Math.floor(appState.restTimerSeconds / 60);
  const s = appState.restTimerSeconds % 60;
  document.getElementById('dockTimeCountdown').textContent = 
    `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function skipRestTimer() {
  clearInterval(appState.restTimerInterval);
  appState.restTimerRunning = false;
  document.getElementById('floatingRestDock').classList.remove('visible');
}

/* ==========================================================================
   WORKOUT SESSION TIMER & 75–85 MIN CORTISOL CAP
   ========================================================================== */

function toggleSessionTimer() {
  if (appState.sessionTimerRunning) {
    pauseSessionTimer();
  } else {
    startSessionTimer();
  }
}

function startSessionTimer() {
  if (appState.sessionTimerRunning) return;
  appState.sessionTimerRunning = true;
  document.getElementById('btnToggleTimer').textContent = 'Pause';
  document.getElementById('btnToggleTimer').classList.add('running');

  appState.sessionTimerInterval = setInterval(() => {
    appState.sessionSeconds++;
    const h = Math.floor(appState.sessionSeconds / 3600);
    const m = Math.floor((appState.sessionSeconds % 3600) / 60);
    const s = appState.sessionSeconds % 60;
    document.getElementById('sessionTimerClock').textContent = 
      `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

    // Cortisol threshold monitoring
    const pill = document.getElementById('cortisolPill');
    if (appState.sessionSeconds < 75 * 60) {
      pill.className = 'cortisol-pill';
      pill.textContent = '🟢 Anabolic (<75m)';
    } else if (appState.sessionSeconds <= 85 * 60) {
      pill.className = 'cortisol-pill warning';
      pill.textContent = '🟡 Cortisol Zone (75-85m)';
    } else {
      pill.className = 'cortisol-pill danger';
      pill.textContent = '🔴 85m Cap Exceeded! Wrap Up';
    }
  }, 1000);
}

function pauseSessionTimer() {
  appState.sessionTimerRunning = false;
  clearInterval(appState.sessionTimerInterval);
  document.getElementById('btnToggleTimer').textContent = 'Resume';
  document.getElementById('btnToggleTimer').classList.remove('running');
}

/* ==========================================================================
   FINISH WORKOUT & LOG TO HISTORY
   ========================================================================== */

function finishCurrentWorkout() {
  const dayData = MASTER_WORKOUT_PROGRAM.find(d => d.day === appState.currentDay);
  if (!dayData || dayData.isRestDay) return;

  const dayLogs = appState.inProgressLogs[dayData.day];
  if (!dayLogs) {
    showToast('No exercise sets logged yet!');
    return;
  }

  // Compile exercise data
  const workoutExercises = [];
  let totalVolume = 0;
  let totalCompletedSets = 0;

  dayData.exercises.forEach(ex => {
    const sets = dayLogs[ex.id] || [];
    const completedSets = sets.filter(s => s.done);
    if (completedSets.length > 0) {
      completedSets.forEach(s => {
        totalVolume += (parseFloat(s.weight) || 0) * (parseInt(s.reps, 10) || 0);
        totalCompletedSets++;
        
        // Update Personal Records
        const w = parseFloat(s.weight) || 0;
        if (!appState.personalRecords[ex.canonName] || w > appState.personalRecords[ex.canonName].maxWeight) {
          appState.personalRecords[ex.canonName] = {
            maxWeight: w,
            reps: s.reps,
            date: new Date().toLocaleDateString()
          };
        }
      });

      workoutExercises.push({
        id: ex.id,
        canonName: ex.canonName,
        name: ex.name,
        sets: completedSets
      });
    }
  });

  if (totalCompletedSets === 0) {
    if (!confirm('You have not marked any sets as done (✓). Mark workout complete anyway?')) {
      return;
    }
  }

  const durationMin = Math.round(appState.sessionSeconds / 60);
  const workoutRecord = {
    id: `workout_${Date.now()}`,
    day: dayData.day,
    week: dayData.week,
    title: dayData.title,
    focus: dayData.focus,
    date: new Date().toLocaleDateString(),
    timestamp: Date.now(),
    durationMinutes: durationMin,
    totalVolumeKg: totalVolume,
    exercises: workoutExercises
  };

  appState.completedWorkouts.push(workoutRecord);
  
  // Reset active session
  delete appState.inProgressLogs[dayData.day];
  pauseSessionTimer();
  appState.sessionSeconds = 0;
  document.getElementById('sessionTimerClock').textContent = '00:00:00';

  saveLocalState();
  silentCloudPush();

  showToast(`🏆 Workout Saved! Volume: ${totalVolume} kg in ${durationMin} mins!`);

  // Prompt to advance to next day
  const nextDay = (appState.currentDay % 14) + 1;
  setTimeout(() => {
    if (confirm(`Great session! Advance to Day ${nextDay} in rotation?`)) {
      selectDay(nextDay);
    } else {
      renderCurrentDay();
    }
  }, 400);
}

/* ==========================================================================
   TAB 2: 14-DAY PROGRAM SPLIT ROADMAP
   ========================================================================== */

function renderSplitRoadmap() {
  const container = document.getElementById('splitOverviewGrid');
  if (!container) return;
  container.innerHTML = '';

  MASTER_WORKOUT_PROGRAM.forEach(day => {
    const card = document.createElement('div');
    card.className = 'split-day-card';
    card.onclick = () => selectDay(day.day);

    let exListHtml = '';
    if (day.isRestDay) {
      exListHtml = '<div style="color: var(--accent-emerald); font-weight: 700; margin-top: 8px;">🧘 Active Recovery / Sleep & Nutrition</div>';
    } else {
      exListHtml = '<ul class="split-ex-list">';
      day.exercises.forEach(e => {
        exListHtml += `
          <li class="split-ex-item">
            <span>${e.name}</span>
            <span style="font-family: var(--font-mono); font-size: 0.75rem;">${e.sets}×${e.repRange}</span>
          </li>
        `;
      });
      exListHtml += '</ul>';
    }

    card.innerHTML = `
      <div class="split-day-header">
        <span class="split-day-num">${day.week} &bull; Day ${day.day}</span>
        <span style="font-size: 0.72rem; color: var(--text-faint);">Tap to open</span>
      </div>
      <h3 class="split-day-title">${day.title}</h3>
      <div class="split-day-focus">${day.focus}</div>
      ${exListHtml}
    `;

    container.appendChild(card);
  });
}

/* ==========================================================================
   TAB 3: PR LEADERBOARD & WORKOUT HISTORY
   ========================================================================== */

function renderPRsAndHistory() {
  // PR Leaderboard
  const prGrid = document.getElementById('prGrid');
  if (prGrid) {
    prGrid.innerHTML = '';
    const prKeys = Object.keys(appState.personalRecords);
    if (prKeys.length === 0) {
      prGrid.innerHTML = '<div style="color: var(--text-muted); font-size: 0.85rem;">No PRs logged yet. Complete workouts to set records!</div>';
    } else {
      prKeys.forEach(key => {
        const pr = appState.personalRecords[key];
        const card = document.createElement('div');
        card.className = 'pr-card';
        card.innerHTML = `
          <div class="pr-exercise-name">${key}</div>
          <div class="pr-weight-display">${pr.maxWeight} kg</div>
          <div class="pr-date-tag">${pr.reps} reps &bull; ${pr.date}</div>
        `;
        prGrid.appendChild(card);
      });
    }
  }

  // Completed Workouts Timeline
  const historyContainer = document.getElementById('historyTimeline');
  if (historyContainer) {
    historyContainer.innerHTML = '';
    if (appState.completedWorkouts.length === 0) {
      historyContainer.innerHTML = '<div style="color: var(--text-muted); font-size: 0.85rem;">No completed workouts yet.</div>';
    } else {
      // Show newest first
      [...appState.completedWorkouts].reverse().forEach(w => {
        const item = document.createElement('div');
        item.className = 'history-card';
        
        let exSummary = '';
        if (w.exercises) {
          exSummary = w.exercises.map(e => {
            const setStr = e.sets.map(s => `${s.weight}kg×${s.reps}`).join(', ');
            return `<div style="font-size: 0.8rem; margin-top: 3px;"><strong>${e.name}:</strong> ${setStr}</div>`;
          }).join('');
        }

        item.innerHTML = `
          <div class="history-header">
            <div>
              <span class="badge-tag badge-blue">${w.week}</span>
              <span class="history-day-title">Day ${w.day}: ${w.title}</span>
            </div>
            <span class="history-date">${w.date} &bull; ${w.durationMinutes || 60}m</span>
          </div>
          <div style="font-size: 0.78rem; color: var(--accent-emerald); font-weight: 700; margin-bottom: 6px;">
            Total Volume: ${(w.totalVolumeKg || 0).toLocaleString()} kg
          </div>
          <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 6px;">
            ${exSummary}
          </div>
        `;
        historyContainer.appendChild(item);
      });
    }
  }
}

/* ==========================================================================
   TAB 4: SYNC VAULT & CLOUD BACKEND
   ========================================================================== */

function initSyncKeyUI() {
  const inputKey = document.getElementById('inputSyncKey');
  if (inputKey) inputKey.value = appState.syncKey;

  const inputFb = document.getElementById('inputFirebaseUrl');
  if (inputFb) inputFb.value = appState.firebaseUrl || '';

  updateCloudStatusUI();
  renderSyncQR();
}

function updateCloudStatusUI() {
  const tag = document.getElementById('cloudStatusTag');
  if (!tag) return;
  if (appState.firebaseUrl && appState.firebaseUrl.startsWith('http')) {
    tag.className = 'badge-tag badge-emerald';
    tag.textContent = 'Google Cloud Active';
  } else {
    tag.className = 'badge-tag badge-amber';
    tag.textContent = 'Local Only';
  }
}

function saveCustomSyncKey() {
  const input = document.getElementById('inputSyncKey');
  if (!input) return;
  const val = input.value.trim();
  if (!val) {
    alert('Please enter a valid Sync Key.');
    return;
  }
  appState.syncKey = val;
  saveLocalState();
  renderSyncQR();
  showToast(`Sync Key Updated: ${val}`);
  silentCloudPull();
}

function saveFirebaseUrl() {
  const input = document.getElementById('inputFirebaseUrl');
  if (!input) return;
  let val = input.value.trim().replace(/\/+$/, '');
  if (val && !val.startsWith('http')) {
    val = 'https://' + val;
  }
  appState.firebaseUrl = val;
  saveLocalState();
  updateCloudStatusUI();
  renderSyncQR();
  if (val) {
    showToast('☁️ Firebase Database connected!');
    silentCloudPush();
  } else {
    showToast('Cloud database disconnected (Local mode).');
  }
}

function getPairingUrl() {
  // If running via python server with tunnel, use public HTTPS tunnel
  const baseUrl = (window.PUBLIC_TUNNEL_URL && window.PUBLIC_TUNNEL_URL.startsWith('http'))
    ? window.PUBLIC_TUNNEL_URL
    : window.location.origin + window.location.pathname;

  let url = `${baseUrl}?sync=${encodeURIComponent(appState.syncKey)}`;
  if (appState.firebaseUrl) {
    url += `&fb=${encodeURIComponent(appState.firebaseUrl)}`;
  }
  return url;
}

function renderSyncQR() {
  const qrContainer = document.getElementById('qrContainer');
  const pairingUrlText = document.getElementById('pairingUrlText');
  if (!qrContainer) return;

  const url = getPairingUrl();
  if (pairingUrlText) pairingUrlText.textContent = url;

  qrContainer.innerHTML = '';
  if (typeof qrcode !== 'undefined') {
    try {
      const qr = qrcode(0, 'M');
      qr.addData(url);
      qr.make();
      qrContainer.innerHTML = qr.createImgTag(5, 8);
    } catch (e) {
      qrContainer.innerHTML = `<a href="${url}" target="_blank" style="color: #38bdf8; word-break: break-all;">${url}</a>`;
    }
  }
}

/**
 * Multi-Tiered Silent Cloud Sync Engine:
 * Tier 1: Google Firebase Realtime Database (If URL provided)
 * Tier 2: Local PC REST API (/api/sync) (If running local mobile_server.py)
 * Tier 3: LocalStorage (Always persistent offline safety net)
 */
async function silentCloudPush() {
  updateSyncStatus('Syncing...', false);
  const payload = {
    syncKey: appState.syncKey,
    completedWorkouts: appState.completedWorkouts,
    personalRecords: appState.personalRecords,
    customVideos: appState.customVideos,
    inProgressLogs: appState.inProgressLogs,
    timestamp: Date.now()
  };

  let synced = false;

  // 1. Push to Google Firebase if configured
  if (appState.firebaseUrl && appState.firebaseUrl.startsWith('http')) {
    try {
      const targetUrl = `${appState.firebaseUrl}/vault/${encodeURIComponent(appState.syncKey)}.json`;
      const res = await fetch(targetUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        synced = true;
        updateSyncStatus('Cloud Synced', true);
      }
    } catch (e) {
      console.log('Firebase sync error:', e);
    }
  }

  // 2. Try posting to local PC server
  if (!synced) {
    try {
      const serverRes = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (serverRes.ok) {
        synced = true;
        updateSyncStatus('PC Synced', true);
      }
    } catch (e) {}
  }

  if (!synced) {
    updateSyncStatus('Saved Locally', true);
  }
}

async function silentCloudPull() {
  // 1. Pull from Google Firebase if configured
  if (appState.firebaseUrl && appState.firebaseUrl.startsWith('http')) {
    try {
      const targetUrl = `${appState.firebaseUrl}/vault/${encodeURIComponent(appState.syncKey)}.json`;
      const res = await fetch(targetUrl);
      if (res.ok) {
        const cloudData = await res.json();
        if (cloudData && (cloudData.completedWorkouts || cloudData.personalRecords)) {
          mergeSyncedData(cloudData);
          updateSyncStatus('Cloud Synced', true);
          return;
        }
      }
    } catch (e) {
      console.log('Firebase pull error:', e);
    }
  }

  // 2. Pull from local PC server
  try {
    const res = await fetch('/api/sync');
    if (res.ok) {
      const serverData = await res.json();
      if (serverData && serverData.completedWorkouts) {
        mergeSyncedData(serverData);
        updateSyncStatus('PC Synced', true);
        return;
      }
    }
  } catch (e) {}

  updateSyncStatus('Saved Locally', true);
}

function mergeSyncedData(incoming) {
  if (incoming.completedWorkouts && incoming.completedWorkouts.length >= appState.completedWorkouts.length) {
    appState.completedWorkouts = incoming.completedWorkouts;
  }
  if (incoming.personalRecords) {
    appState.personalRecords = { ...appState.personalRecords, ...incoming.personalRecords };
  }
  if (incoming.customVideos) {
    appState.customVideos = { ...appState.customVideos, ...incoming.customVideos };
  }
  saveLocalState();
  renderCurrentDay();
  renderPRsAndHistory();
}

function forceCloudPush() {
  silentCloudPush().then(() => showToast('Data pushed to sync vault!'));
}

function forceCloudPull() {
  silentCloudPull().then(() => showToast('Data refreshed from sync vault!'));
}

async function testLocalServerConnection() {
  try {
    const res = await fetch('/api/sync');
    if (res.ok) {
      showToast('✅ PC Sync Server is ONLINE and connected!');
    } else {
      showToast('⚠️ PC Server returned code ' + res.status);
    }
  } catch (e) {
    showToast('ℹ️ PC Server unreachable. Running 100% offline via LocalStorage.');
  }
}

function updateSyncStatus(text, isSynced) {
  const icon = document.getElementById('syncStatusIcon');
  const label = document.getElementById('syncStatusText');
  const btn = document.getElementById('btnHeaderSync');
  if (label) label.textContent = text;
  if (icon) icon.textContent = isSynced ? '☁️' : '⏳';
  if (btn) btn.classList.toggle('synced', isSynced);
}

/* ==========================================================================
   JSON BACKUP & RESTORE
   ========================================================================== */

function exportDataJSON() {
  const exportObj = {
    app: 'TITAN_WORKOUT_JOURNAL',
    version: 2,
    athlete: "6'3\" 77kg Lean Bulk",
    exportedAt: new Date().toISOString(),
    syncKey: appState.syncKey,
    firebaseUrl: appState.firebaseUrl || '',
    completedWorkouts: appState.completedWorkouts,
    personalRecords: appState.personalRecords,
    customVideos: appState.customVideos,
    inProgressLogs: appState.inProgressLogs
  };

  const str = JSON.stringify(exportObj, null, 2);
  const blob = new Blob([str], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `titan_bulk_backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('📥 Backup file downloaded!');
}

function triggerFileInput() {
  const input = document.getElementById('backupFileInput');
  if (input) input.click();
}

function importDataJSON(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.completedWorkouts) {
        appState.completedWorkouts = data.completedWorkouts;
        if (data.personalRecords) appState.personalRecords = data.personalRecords;
        if (data.customVideos) appState.customVideos = data.customVideos;
        if (data.inProgressLogs) appState.inProgressLogs = data.inProgressLogs;
        if (data.syncKey) appState.syncKey = data.syncKey;
        if (data.firebaseUrl) appState.firebaseUrl = data.firebaseUrl;

        saveLocalState();
        renderCurrentDay();
        renderPRsAndHistory();
        initSyncKeyUI();
        silentCloudPush();
        showToast('📤 Workout database restored successfully!');
      } else {
        alert('Invalid backup file format.');
      }
    } catch (err) {
      alert('Error parsing JSON backup file: ' + err.message);
    }
  };
  reader.readAsText(file);
}

/* ==========================================================================
   MODAL: EXERCISE VIDEO / FORM GUIDE
   ========================================================================== */

function openVideoModal(canonNameEncoded, nameEncoded) {
  const canonName = decodeURIComponent(canonNameEncoded);
  const exName = decodeURIComponent(nameEncoded);
  appState.activeModalExCanon = canonName;

  document.getElementById('videoModalTitle').textContent = `Form Guide: ${exName}`;
  const videoContainer = document.getElementById('videoContainer');
  const customUrlInput = document.getElementById('inputCustomVideoUrl');

  const customUrl = appState.customVideos[canonName] || '';
  customUrlInput.value = customUrl;

  if (customUrl) {
    let embedUrl = customUrl;
    if (customUrl.includes('youtube.com/shorts/')) {
      const id = customUrl.split('shorts/')[1].split('?')[0];
      embedUrl = `https://www.youtube.com/embed/${id}`;
    } else if (customUrl.includes('watch?v=')) {
      const id = customUrl.split('watch?v=')[1].split('&')[0];
      embedUrl = `https://www.youtube.com/embed/${id}`;
    }

    videoContainer.innerHTML = `
      <iframe width="100%" height="280" src="${embedUrl}" frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen style="border: none; border-radius: var(--radius-md);"></iframe>
    `;
  } else {
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(canonName + ' exercise form tutorial shorts')}`;
    videoContainer.innerHTML = `
      <div style="text-align: center; padding: 24px;">
        <div style="font-size: 2.2rem; margin-bottom: 8px;">🎬</div>
        <div style="font-size: 0.95rem; font-weight: 700; margin-bottom: 8px;">Form Video Guide Slot</div>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 14px;">
          Paste your YouTube Shorts or video link below to pin it right to this exercise.
        </p>
        <a href="${searchUrl}" target="_blank" rel="noopener noreferrer" class="btn-vault-action" style="display: inline-flex; align-items: center; gap: 6px; text-decoration: none;">
          🔍 Search YouTube Form Shorts for "${exName}"
        </a>
      </div>
    `;
  }

  document.getElementById('modalVideo').classList.add('open');
}

function closeVideoModal(event) {
  if (event && event.target && event.target.id !== 'modalVideo') return;
  document.getElementById('modalVideo').classList.remove('open');
  const videoContainer = document.getElementById('videoContainer');
  if (videoContainer) videoContainer.innerHTML = '';
}

function saveCustomVideoLink() {
  const url = document.getElementById('inputCustomVideoUrl').value.trim();
  if (!appState.activeModalExCanon) return;

  appState.customVideos[appState.activeModalExCanon] = url;
  saveLocalState();
  silentCloudPush();
  showToast('Video link saved for this exercise!');
  openVideoModal(encodeURIComponent(appState.activeModalExCanon), encodeURIComponent(appState.activeModalExCanon));
}

/* ==========================================================================
   TOAST NOTIFICATIONS
   ========================================================================== */

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-item';
  toast.innerHTML = `<span>⚡</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 2600);
}
