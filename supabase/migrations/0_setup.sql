-- 0_setup.sql

create extension if not exists pgcrypto;

create type content_status as enum ('draft', 'published');
create type content_type as enum ('district', 'municipality', 'attractions', 'festivals', 'foods', 'events');

create table content (
    id                    uuid primary key default gen_random_uuid(),
    slug                  text not null,
    type                  content_type,
    name                  text not null,
    short_description     text not null,
    tags                  text[],
    featured              boolean default false,
    status                content_status default 'draft',
    body                  text,
    published_at          timestamp,

    created_at            timestamptz not null default now(),
    updated_at            timestamptz not null default now()
);

create type media_role as enum ('main', 'gallery');

create table media (
    id                    uuid primary key default gen_random_uuid(),
    url                   text not null,
    alt                   text,
    caption               text,

    created_at            timestamptz not null default now(),
    updated_at            timestamptz not null default now()
);

create table content_media (
    content_id            uuid references content(id) on update restrict on delete cascade,
    media_id              uuid references media(id) on update restrict on delete cascade,
    role                  media_role not null,
    display_order         int,

    created_at            timestamptz not null default now(),
    updated_at            timestamptz not null default now(),

    primary key (content_id, media_id)
);

create unique index content_media_one_main_per_content
on content_media (content_id)
where role = 'main';

create table district (
    id                    uuid primary key default gen_random_uuid(),
    content_id            uuid not null references content(id),
    tagline               text,
    getting_there_steps   text[],
    quick_facts           jsonb,
    display_order         int,

    created_at            timestamptz not null default now(),
    updated_at            timestamptz not null default now()
);

create table municipality (
    id                    uuid primary key default gen_random_uuid(),
    district_id           uuid not null references district(id),
    content_id            uuid not null references content(id),

    created_at            timestamptz not null default now(),
    updated_at            timestamptz not null default now()
);

create table attraction (
    id                    uuid primary key default gen_random_uuid(),
    municipality_id       uuid not null references municipality(id),
    content_id            uuid not null references content(id),

    created_at            timestamptz not null default now(),
    updated_at            timestamptz not null default now()
);

create type food_type as enum (
    'local',
    'street',
    'restaurant',
    'seafood',
    'dessert'
);

create table food (
    id                    uuid primary key default gen_random_uuid(),
    municipality_id       uuid not null references municipality(id),
    content_id            uuid not null references content(id),
    type                  food_type,

    created_at            timestamptz not null default now(),
    updated_at            timestamptz not null default now()
);

create table festival (
    id                    uuid primary key default gen_random_uuid(),
    municipality_id       uuid not null references municipality(id),
    content_id            uuid not null references content(id),
    date                  date,

    created_at            timestamptz not null default now(),
    updated_at            timestamptz not null default now()
);

create table event (
    id                    uuid primary key default gen_random_uuid(),
    municipality_id       uuid not null references municipality(id),
    content_id            uuid not null references content(id),
    date                  date,
    end_date              date,
    venue                 text,

    created_at            timestamptz not null default now(),
    updated_at            timestamptz not null default now()
);




-- ----


create or replace function set_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger set_content_updated_at
before update on content
for each row execute function set_updated_at();

create trigger set_media_updated_at
before update on media
for each row execute function set_updated_at();

create trigger set_content_media_updated_at
before update on content_media
for each row execute function set_updated_at();

create trigger set_district_updated_at
before update on district
for each row execute function set_updated_at();

create trigger set_municipality_updated_at
before update on municipality
for each row execute function set_updated_at();

create trigger set_attraction_updated_at
before update on attraction
for each row execute function set_updated_at();

create trigger set_food_updated_at
before update on food
for each row execute function set_updated_at();

create trigger set_festival_updated_at
before update on festival
for each row execute function set_updated_at();

create trigger set_event_updated_at
before update on event
for each row execute function set_updated_at();
