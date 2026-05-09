create view district_view as
select
    d.id as district_id,
    c.id as content_id,

    c.name,
    c.short_description,
    c.body,
    c.tags,
    c.featured,
    c.status,
    c.published_at,

    d.tagline,
    d.getting_there_steps,
    d.quick_facts,
    d.display_order,

    main_media.url as hero_image,
    main_media.alt as hero_alt,

    coalesce(
        jsonb_agg(
            jsonb_build_object(
                'url', m.url,
                'alt', m.alt,
                'caption', m.caption,
                'order', cm.display_order
            )
            order by cm.display_order
        ) filter (where cm.role = 'gallery'),
        '[]'
    ) as gallery

from district d
join content c on c.id = d.content_id

left join content_media cm_main
    on cm_main.content_id = c.id
   and cm_main.role = 'main'

left join media main_media
    on main_media.id = cm_main.media_id

left join content_media cm
    on cm.content_id = c.id
   and cm.role = 'gallery'

left join media m
    on m.id = cm.media_id

where c.status = 'published'
  and c.type = 'district'

group by
    d.id,
    c.id,
    main_media.url,
    main_media.alt;
