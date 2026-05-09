
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
    published_at          timestamp
);

create type media_role as enum ('main', 'gallery');
create table media (
    id                    uuid primary key default gen_random_uuid(),
    url                   text not null,
    alt                   text,
    caption               text
);

create table content_media (
    content_id            uuid references content(id) on update restrict on delete cascade,
    media_id              uuid references media(id) on update restrict on delete cascade,
    role                  media_role not null,
    display_order         int,

    primary key (content_id, media_id)
);

create unique index content_media_one_main_per_content on content_media (content_id) where role = 'main';

create table district (
    id                    uuid primary key default gen_random_uuid(),
    content_id            uuid not null references content(id),
    tagline               text,
    getting_there_steps   text[],
    quick_facts           jsonb,
    display_order         int
);

create table municipality (
    id                    uuid primary key default gen_random_uuid(),
    district_id           uuid not null references district(id),
    content_id            uuid not null references content(id)
);

create table attraction (
    id                    uuid primary key default gen_random_uuid(),
    municipality_id       uuid not null references municipality(id),
    content_id            uuid not null references content(id)
);

create type food_type as enum ('local','street','restaurant','seafood','dessert');
create table food (
    id                    uuid primary key default gen_random_uuid(),
    municipality_id       uuid not null references municipality(id),
    content_id            uuid not null references content(id),
    type                  food_type
);

create table festival (
    id                    uuid primary key default gen_random_uuid(),
    municipality_id       uuid not null references municipality(id),
    content_id            uuid not null references content(id),
    date                  date
);

create table event (
    id                    uuid primary key default gen_random_uuid(),
    municipality_id       uuid not null references municipality(id),
    content_id            uuid not null references content(id),
    date                  date,
    end_date              date,
    venue                 text
);
