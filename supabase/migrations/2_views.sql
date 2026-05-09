
create view district_view as
select
    d.id as district_id,
    c.id as content_id,

    c.slug,
    c.name,
    c.short_description,
    c.body,
    c.tags,
    c.featured,
    c.status,
    c.published_at,

    d.tagline,
    d.getting_there_steps,
    coalesce(d.quick_facts, '[]'::jsonb) as quick_facts,
    d.display_order,

    main_media.url as hero_image,
    main_media.alt as hero_alt,

    coalesce(
        g.gallery,
        '[]'::jsonb
    ) as gallery

from district d
join content c on c.id = d.content_id

left join content_media cm_main
    on cm_main.content_id = c.id
   and cm_main.role = 'main'

left join media main_media
    on main_media.id = cm_main.media_id

left join lateral (
    select jsonb_agg(
        jsonb_build_object(
            'url', m.url,
            'alt', m.alt,
            'caption', m.caption,
            'order', cm.display_order
        )
        order by cm.display_order
    ) as gallery
    from content_media cm
    join media m on m.id = cm.media_id
    where cm.content_id = c.id
      and cm.role = 'gallery'
) g on true

where c.status = 'published'
  and c.type = 'district';


create view municipality_view as
select
    m.id as municipality_id,
    c.id as content_id,
    d.id as district_id,

    c.slug,
    c.name,
    c.short_description,
    c.body,
    c.tags,
    c.featured,
    c.status,
    c.published_at,

    d.content_id as district_content_id,
    dc.slug as district_slug,
    dc.name as district_name,

    main_media.url as hero_image,
    main_media.alt as hero_alt,

    coalesce(
        g.gallery,
        '[]'::jsonb
    ) as gallery

from municipality m
join content c
    on c.id = m.content_id

join district d
    on d.id = m.district_id

join content dc
    on dc.id = d.content_id

left join content_media cm_main
    on cm_main.content_id = c.id
   and cm_main.role = 'main'

left join media main_media
    on main_media.id = cm_main.media_id

left join lateral (
    select jsonb_agg(
        jsonb_build_object(
            'url', m2.url,
            'alt', m2.alt,
            'caption', m2.caption,
            'order', cm.display_order
        )
        order by cm.display_order
    ) as gallery
    from content_media cm
    join media m2 on m2.id = cm.media_id
    where cm.content_id = c.id
      and cm.role = 'gallery'
) g on true

where c.status = 'published'
  and c.type = 'municipality';


create view attraction_view as
select
    a.id as attraction_id,
    c.id as content_id,
    m.id as municipality_id,
    d.id as district_id,

    c.slug,
    c.name,
    c.short_description,
    c.body,
    c.tags,
    c.featured,
    c.status,
    c.published_at,

    mc.slug as municipality_slug,
    mc.name as municipality_name,

    dc.slug as district_slug,
    dc.name as district_name,

    main_media.url as hero_image,
    main_media.alt as hero_alt,

    coalesce(
        g.gallery,
        '[]'::jsonb
    ) as gallery

from attraction a
join content c on c.id = a.content_id
join municipality m on m.id = a.municipality_id
join content mc on mc.id = m.content_id
join district d on d.id = m.district_id
join content dc on dc.id = d.content_id

left join content_media cm_main
    on cm_main.content_id = c.id
   and cm_main.role = 'main'

left join media main_media
    on main_media.id = cm_main.media_id

left join lateral (
    select jsonb_agg(
        jsonb_build_object(
            'url', m2.url,
            'alt', m2.alt,
            'caption', m2.caption,
            'order', cm.display_order
        )
        order by cm.display_order
    ) as gallery
    from content_media cm
    join media m2 on m2.id = cm.media_id
    where cm.content_id = c.id
      and cm.role = 'gallery'
) g on true

where c.status = 'published'
  and c.type = 'attractions';


create view food_view as
select
    f.id as food_id,
    c.id as content_id,
    m.id as municipality_id,
    d.id as district_id,

    c.slug,
    c.name,
    c.short_description,
    c.body,
    c.tags,
    c.featured,
    c.status,
    c.published_at,

    f.type as food_type,

    mc.slug as municipality_slug,
    mc.name as municipality_name,

    dc.slug as district_slug,
    dc.name as district_name,

    main_media.url as hero_image,
    main_media.alt as hero_alt,

    coalesce(
        g.gallery,
        '[]'::jsonb
    ) as gallery

from food f
join content c on c.id = f.content_id
join municipality m on m.id = f.municipality_id
join content mc on mc.id = m.content_id
join district d on d.id = m.district_id
join content dc on dc.id = d.content_id

left join content_media cm_main
    on cm_main.content_id = c.id
   and cm_main.role = 'main'

left join media main_media
    on main_media.id = cm_main.media_id

left join lateral (
    select jsonb_agg(
        jsonb_build_object(
            'url', m2.url,
            'alt', m2.alt,
            'caption', m2.caption,
            'order', cm.display_order
        )
        order by cm.display_order
    ) as gallery
    from content_media cm
    join media m2 on m2.id = cm.media_id
    where cm.content_id = c.id
      and cm.role = 'gallery'
) g on true

where c.status = 'published'
  and c.type = 'foods';


create view festival_view as
select
    f.id as festival_id,
    c.id as content_id,
    m.id as municipality_id,
    d.id as district_id,

    c.slug,
    c.name,
    c.short_description,
    c.body,
    c.tags,
    c.featured,
    c.status,
    c.published_at,

    f.date,

    mc.slug as municipality_slug,
    mc.name as municipality_name,

    dc.slug as district_slug,
    dc.name as district_name,

    main_media.url as hero_image,
    main_media.alt as hero_alt,

    coalesce(
        g.gallery,
        '[]'::jsonb
    ) as gallery

from festival f
join content c on c.id = f.content_id
join municipality m on m.id = f.municipality_id
join content mc on mc.id = m.content_id
join district d on d.id = m.district_id
join content dc on dc.id = d.content_id

left join content_media cm_main
    on cm_main.content_id = c.id
   and cm_main.role = 'main'

left join media main_media
    on main_media.id = cm_main.media_id

left join lateral (
    select jsonb_agg(
        jsonb_build_object(
            'url', m2.url,
            'alt', m2.alt,
            'caption', m2.caption,
            'order', cm.display_order
        )
        order by cm.display_order
    ) as gallery
    from content_media cm
    join media m2 on m2.id = cm.media_id
    where cm.content_id = c.id
      and cm.role = 'gallery'
) g on true

where c.status = 'published'
  and c.type = 'festivals';


create view event_view as
select
    e.id as event_id,
    c.id as content_id,
    m.id as municipality_id,
    d.id as district_id,

    c.slug,
    c.name,
    c.short_description,
    c.body,
    c.tags,
    c.featured,
    c.status,
    c.published_at,

    e.date,
    e.end_date,
    e.venue,

    mc.slug as municipality_slug,
    mc.name as municipality_name,

    dc.slug as district_slug,
    dc.name as district_name,

    main_media.url as hero_image,
    main_media.alt as hero_alt,

    coalesce(
        g.gallery,
        '[]'::jsonb
    ) as gallery

from event e
join content c on c.id = e.content_id
join municipality m on m.id = e.municipality_id
join content mc on mc.id = m.content_id
join district d on d.id = m.district_id
join content dc on dc.id = d.content_id

left join content_media cm_main
    on cm_main.content_id = c.id
   and cm_main.role = 'main'

left join media main_media
    on main_media.id = cm_main.media_id

left join lateral (
    select jsonb_agg(
        jsonb_build_object(
            'url', m2.url,
            'alt', m2.alt,
            'caption', m2.caption,
            'order', cm.display_order
        )
        order by cm.display_order
    ) as gallery
    from content_media cm
    join media m2 on m2.id = cm.media_id
    where cm.content_id = c.id
      and cm.role = 'gallery'
) g on true

where c.status = 'published'
  and c.type = 'events';
