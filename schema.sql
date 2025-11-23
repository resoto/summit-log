-- Mountain Climbs Database Schema
CREATE TABLE climbs (
  id TEXT PRIMARY KEY,
  mountain_name TEXT NOT NULL,
  date TEXT NOT NULL,
  elevation INTEGER NOT NULL,
  notes TEXT,
  created_at TEXT NOT NULL
);

-- Index for faster date-based queries
CREATE INDEX idx_date ON climbs(date DESC);
CREATE INDEX idx_elevation ON climbs(elevation DESC);
