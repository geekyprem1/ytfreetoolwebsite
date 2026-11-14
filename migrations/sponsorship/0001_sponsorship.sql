CREATE TABLE sponsor_slots (
  id INTEGER PRIMARY KEY CHECK (id BETWEEN 1 AND 8),
  kind TEXT NOT NULL CHECK (kind IN ('standard','featured')),
  enabled INTEGER NOT NULL DEFAULT 1 CHECK (enabled IN (0,1))
);
INSERT INTO sponsor_slots (id,kind) VALUES
  (1,'standard'),(2,'standard'),(3,'standard'),(4,'standard'),
  (5,'featured'),(6,'featured'),(7,'featured'),(8,'featured');

CREATE TABLE sponsor_bookings (
  id TEXT PRIMARY KEY,
  slot_id INTEGER NOT NULL REFERENCES sponsor_slots(id),
  brand TEXT NOT NULL CHECK (length(brand) BETWEEN 1 AND 40),
  url TEXT NOT NULL,
  tagline TEXT NOT NULL CHECK (length(tagline) BETWEEN 1 AND 60),
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  note TEXT NOT NULL DEFAULT '',
  logo_key TEXT NOT NULL,
  logo_type TEXT NOT NULL CHECK (logo_type IN ('image/png','image/jpeg','image/webp')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','active','paused','rejected','ended')),
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  approval_until INTEGER,
  starts_at INTEGER,
  ends_at INTEGER,
  activation_kind TEXT CHECK (activation_kind IS NULL OR activation_kind = 'complimentary'),
  CHECK (status != 'approved' OR approval_until IS NOT NULL),
  CHECK (status NOT IN ('active','paused') OR (starts_at IS NOT NULL AND ends_at > starts_at AND activation_kind = 'complimentary'))
);
-- Pending requests do not guarantee a reservation. Approval atomically claims it.
CREATE UNIQUE INDEX sponsor_one_occupant ON sponsor_bookings(slot_id)
  WHERE status IN ('approved','active','paused');
CREATE INDEX sponsor_review_queue ON sponsor_bookings(status,created_at);
CREATE INDEX sponsor_end_date ON sponsor_bookings(ends_at);

CREATE TABLE sponsor_audit (
  id TEXT PRIMARY KEY,
  booking_id TEXT NOT NULL REFERENCES sponsor_bookings(id),
  action TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE TABLE sponsor_request_limits (
  key TEXT PRIMARY KEY,
  count INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);
