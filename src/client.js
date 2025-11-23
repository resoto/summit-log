// Client-side logic for Summit Log

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
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(climb)
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
            createdAt: new Date().toISOString()
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
    getClimbs().then(climbs => {
        if (climbs.length === 0) {
            historyList.innerHTML = '<p style="text-align: center; color: #94a3b8;">No climbs logged yet. Start your journey!</p>';
        } else {
            historyList.innerHTML = climbs.map(climb => `
      <li class="climb-item animate-fade-in">
        <div class="climb-info">
          <h3>${climb.mountain_name}</h3>
          <div class="climb-meta">
            <span>📅 ${new Date(climb.date).toLocaleDateString()}</span>
            <span style="margin-left: 1rem;">⛰️ ${climb.elevation}m</span>
          </div>
          ${climb.notes ? `<p style="margin-top: 0.5rem; color: #cbd5e1;">${climb.notes}</p>` : ''}
        </div>
      </li>
    `).join('');
        }
    });
}

// Render Dashboard Stats
const totalClimbsEl = document.getElementById('stat-total-climbs');
const totalElevationEl = document.getElementById('stat-total-elevation');
const highestPeakEl = document.getElementById('stat-highest-peak');

if (totalClimbsEl && totalElevationEl && highestPeakEl) {
    getClimbs().then(climbs => {
        // Total Climbs
        totalClimbsEl.textContent = climbs.length;

        // Total Elevation
        const totalElevation = climbs.reduce((sum, climb) => sum + Number(climb.elevation || 0), 0);
        totalElevationEl.textContent = `${totalElevation}m`;

        // Highest Peak
        const highest = climbs.reduce((max, climb) => Math.max(max, Number(climb.elevation || 0)), 0);
        highestPeakEl.textContent = `${highest}m`;
    });
}

