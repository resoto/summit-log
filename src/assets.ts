export const cssContent = `:root {
  --bg-color: #0f172a;
  --text-color: #f8fafc;
  --primary-color: #38bdf8;
  --secondary-color: #818cf8;
  --accent-color: #f472b6;
  --card-bg: rgba(30, 41, 59, 0.7);
  --card-border: rgba(255, 255, 255, 0.1);
  --glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  --font-family: 'Inter', sans-serif;
}

body {
  margin: 0;
  font-family: var(--font-family);
  background-color: var(--bg-color);
  color: var(--text-color);
  background-image: 
    radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), 
    radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), 
    radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  padding: 1.5rem;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--card-border);
  position: sticky;
  top: 0;
  z-index: 100;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-decoration: none;
}

.nav-links a {
  color: var(--text-color);
  text-decoration: none;
  margin-left: 1.5rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: var(--primary-color);
}

main {
  flex: 1;
  padding: 2rem 1rem;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

.card {
  background: var(--card-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--card-border);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: var(--glass-shadow);
  margin-bottom: 2rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.5);
}

h1, h2, h3 {
  margin-top: 0;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #fff, #cbd5e1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.btn:hover {
  opacity: 0.9;
}

.btn-outline {
  background: transparent;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
}

.btn-outline:hover {
  background: rgba(56, 189, 248, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #cbd5e1;
}

input, textarea, select {
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid var(--card-border);
  background: rgba(15, 23, 42, 0.6);
  color: #fff;
  font-family: var(--font-family);
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: var(--primary-color);
}

.climb-list {
  list-style: none;
  padding: 0;
}

.climb-item {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.climb-info h3 {
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}

.climb-meta {
  color: #94a3b8;
  font-size: 0.9rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #94a3b8;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
`;

export const jsContent = `// Client-side logic for Summit Log

// Helper to get climbs from API
async function getClimbs() {
  try {
    const response = await fetch('/api/climbs');
    if (!response.ok) throw new Error('Failed to fetch climbs');
    return await response.json();
  } catch (error) {
    console.error('Error fetching climbs:', error);
    return [];
  }
}

// Helper to save climb to API
async function saveClimb(climb) {
  try {
    const response = await fetch('/api/climbs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(climb),
    });
    if (!response.ok) throw new Error('Failed to save climb');
    return await response.json();
  } catch (error) {
    console.error('Error saving climb:', error);
    alert('登山記録の保存に失敗しました。もう一度お試しください。');
    throw error;
  }
}

// Handle Log Climb Form Submission
const logForm = document.getElementById('log-climb-form');
if (logForm) {
  logForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(logForm);
    const climb = {
      id: Date.now().toString(),
      mountainName: formData.get('mountainName'),
      date: formData.get('date'),
      elevation: formData.get('elevation'),
      notes: formData.get('notes'),
      createdAt: new Date().toISOString(),
    };
    try {
      await saveClimb(climb);
      window.location.href = '/history';
    } catch (error) {
      // Error already handled in saveClimb
    }
  });
}

// Render History List
const historyList = document.getElementById('climb-history-list');
if (historyList) {
  getClimbs().then((climbs) => {
    if (climbs.length === 0) {
      historyList.innerHTML = '<p style="text-align: center; color: #94a3b8;">まだ記録がありません。最初の登山を記録しましょう！</p>';
    } else {
      historyList.innerHTML = climbs
        .map(
          (climb) => `
  < li class="climb-item animate-fade-in" >
    <div class="climb-info" >
      <h3>${ climb.mountain_name } </h3>
        < div class="climb-meta" >
          <span>📅 ${ new Date(climb.date).toLocaleDateString() } </span>
            < span style = "margin-left: 1rem;" >⛰️ ${ climb.elevation } m </span>
              </div>
            ${ climb.notes ? `<p style="margin-top: 0.5rem; color: #cbd5e1;">${climb.notes}</p>` : '' }
</div>
  </li>
    `
        )
        .join('');
    }
  });
}

// Render Dashboard Stats
const totalClimbsEl = document.getElementById('stat-total-climbs');
const totalElevationEl = document.getElementById('stat-total-elevation');
const highestPeakEl = document.getElementById('stat-highest-peak');

if (totalClimbsEl && totalElevationEl && highestPeakEl) {
  getClimbs().then((climbs) => {
    totalClimbsEl.textContent = climbs.length;
    const totalElevation = climbs.reduce((sum, climb) => sum + Number(climb.elevation || 0), 0);
    totalElevationEl.textContent = `${ totalElevation } m`;
    const highest = climbs.reduce((max, climb) => Math.max(max, Number(climb.elevation || 0)), 0);
    highestPeakEl.textContent = `${ highest } m`;
  });
}
`;
