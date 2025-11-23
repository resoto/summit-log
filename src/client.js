// Client-side logic for Summit Log

// Helper to get climbs from LocalStorage
function getClimbs() {
    const climbs = localStorage.getItem('climbs');
    return climbs ? JSON.parse(climbs) : [];
}

// Helper to save climbs
function saveClimb(climb) {
    const climbs = getClimbs();
    climbs.unshift(climb); // Add new climb to the beginning
    localStorage.setItem('climbs', JSON.stringify(climbs));
}

// Handle Log Climb Form Submission
const logForm = document.getElementById('log-climb-form');
if (logForm) {
    logForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(logForm);
        const climb = {
            id: Date.now().toString(),
            mountainName: formData.get('mountainName'),
            date: formData.get('date'),
            elevation: formData.get('elevation'),
            notes: formData.get('notes'),
            createdAt: new Date().toISOString()
        };

        saveClimb(climb);
        window.location.href = '/history';
    });
}

// Render History List
const historyList = document.getElementById('climb-history-list');
if (historyList) {
    const climbs = getClimbs();

    if (climbs.length === 0) {
        historyList.innerHTML = '<p style="text-align: center; color: #94a3b8;">No climbs logged yet. Start your journey!</p>';
    } else {
        historyList.innerHTML = climbs.map(climb => `
      <li class="climb-item animate-fade-in">
        <div class="climb-info">
          <h3>${climb.mountainName}</h3>
          <div class="climb-meta">
            <span>📅 ${new Date(climb.date).toLocaleDateString()}</span>
            <span style="margin-left: 1rem;">⛰️ ${climb.elevation}m</span>
          </div>
          ${climb.notes ? `<p style="margin-top: 0.5rem; color: #cbd5e1;">${climb.notes}</p>` : ''}
        </div>
      </li>
    `).join('');
    }
}

// Render Dashboard Stats
const totalClimbsEl = document.getElementById('stat-total-climbs');
const totalElevationEl = document.getElementById('stat-total-elevation');
const highestPeakEl = document.getElementById('stat-highest-peak');

if (totalClimbsEl && totalElevationEl && highestPeakEl) {
    const climbs = getClimbs();

    // Total Climbs
    totalClimbsEl.textContent = climbs.length;

    // Total Elevation
    const totalElevation = climbs.reduce((sum, climb) => sum + Number(climb.elevation || 0), 0);
    totalElevationEl.textContent = `${totalElevation}m`;

    // Highest Peak
    const highest = climbs.reduce((max, climb) => Math.max(max, Number(climb.elevation || 0)), 0);
    highestPeakEl.textContent = `${highest}m`;
}
