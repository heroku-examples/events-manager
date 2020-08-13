CREATE TABLE events
(
  id serial NOT NULL,
  name varchar(255) NOT NULL,
  description text,
  date timestamp with time zone DEFAULT NOW() NOT NULL
);

ALTER TABLE events ADD CONSTRAINT events_pk
  PRIMARY KEY (id);

CREATE TABLE members
(
  id serial NOT NULL,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL
);

ALTER TABLE members ADD CONSTRAINT members_pk
  PRIMARY KEY (id);

CREATE TABLE rsvps
(
  event_id integer NOT NULL,
  member_id integer NOT NULL,
  status varchar(5) DEFAULT 'Yes' NOT NULL
);

ALTER TABLE rsvps ADD CONSTRAINT rsvps_pk
  PRIMARY KEY (event_id, member_id);

ALTER TABLE rsvps ADD CONSTRAINT rsvps_event_fk
  FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE rsvps ADD CONSTRAINT rsvps_member_fk
  FOREIGN KEY (member_id) REFERENCES members (id) ON DELETE CASCADE ON UPDATE CASCADE;
