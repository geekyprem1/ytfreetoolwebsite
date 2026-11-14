-- Preserve payment/audit rows while permitting real, successfully paid placements.
CREATE TABLE sponsor_audit_backup AS SELECT * FROM sponsor_audit;
CREATE TABLE sponsor_payments_backup AS SELECT * FROM sponsor_payments;
CREATE TABLE sponsor_payment_events_backup AS SELECT * FROM sponsor_payment_events;
DROP TABLE sponsor_payment_events;
DROP TABLE sponsor_payments;
DROP TABLE sponsor_audit;

CREATE TABLE sponsor_bookings_next (
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
  activation_kind TEXT CHECK (activation_kind IS NULL OR activation_kind IN ('complimentary','paid_test','paid_live')),
  CHECK (status != 'approved' OR approval_until IS NOT NULL),
  CHECK (status NOT IN ('active','paused') OR (starts_at IS NOT NULL AND ends_at > starts_at AND activation_kind IN ('complimentary','paid_test','paid_live')))
);
INSERT INTO sponsor_bookings_next SELECT * FROM sponsor_bookings;
DROP TABLE sponsor_bookings;
ALTER TABLE sponsor_bookings_next RENAME TO sponsor_bookings;
CREATE UNIQUE INDEX sponsor_one_occupant ON sponsor_bookings(slot_id) WHERE status IN ('approved','active','paused');
CREATE INDEX sponsor_review_queue ON sponsor_bookings(status,created_at);
CREATE INDEX sponsor_end_date ON sponsor_bookings(ends_at);

CREATE TABLE sponsor_audit (
  id TEXT PRIMARY KEY,
  booking_id TEXT NOT NULL REFERENCES sponsor_bookings(id),
  action TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
INSERT INTO sponsor_audit SELECT * FROM sponsor_audit_backup;
DROP TABLE sponsor_audit_backup;

CREATE TABLE sponsor_payments (
  id TEXT PRIMARY KEY,
  booking_id TEXT NOT NULL UNIQUE REFERENCES sponsor_bookings(id),
  product_id TEXT NOT NULL,
  amount INTEGER NOT NULL CHECK (amount > 0),
  currency TEXT NOT NULL,
  duration_seconds INTEGER NOT NULL,
  session_id TEXT UNIQUE,
  checkout_url TEXT,
  payment_id TEXT UNIQUE,
  status TEXT NOT NULL DEFAULT 'creating' CHECK (status IN ('creating','checkout','paid','review')),
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  mode TEXT NOT NULL DEFAULT 'test' CHECK (mode IN ('test','live'))
);
INSERT INTO sponsor_payments(id,booking_id,product_id,amount,currency,duration_seconds,session_id,checkout_url,payment_id,status,created_at,updated_at,mode)
SELECT id,booking_id,product_id,amount,currency,duration_seconds,session_id,checkout_url,payment_id,status,created_at,updated_at,'test' FROM sponsor_payments_backup;
DROP TABLE sponsor_payments_backup;

CREATE TABLE sponsor_payment_events (
  id TEXT PRIMARY KEY,
  attempt_id TEXT NOT NULL REFERENCES sponsor_payments(id),
  created_at INTEGER NOT NULL
);
INSERT INTO sponsor_payment_events SELECT * FROM sponsor_payment_events_backup;
DROP TABLE sponsor_payment_events_backup;
