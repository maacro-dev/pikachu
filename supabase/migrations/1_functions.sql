
create or replace function create_district(
    p_name text,
    p_slug text,
    p_short_description text,
    p_body text,
    p_tags text[],
    p_tagline text,
    p_getting_there_steps text[],
    p_display_order int,
    p_quick_facts jsonb default '[]'::jsonb,
    p_status content_status default 'published',

    p_main_image jsonb default null,
    p_gallery_images jsonb default '[]'::jsonb
)
returns table (
    district_id uuid,
    content_id uuid
)
language plpgsql
as $$
declare
    v_content_id uuid;
    v_district_id uuid;

    v_media_id uuid;
    v_item jsonb;
begin
    -- 1. create content
    insert into content (
        type,
        name,
        slug,
        short_description,
        body,
        tags,
        status,
        published_at
    )
    values (
        'district',
        p_name,
        p_slug,
        p_short_description,
        regexp_replace(p_body, '^[ \t]+', '', 'gm'),
        p_tags,
        p_status,
        case when p_status = 'published' then now() else null end
    )
    returning id into v_content_id;

    -- 2. create district
    insert into district (
        id,
        content_id,
        tagline,
        getting_there_steps,
        quick_facts,
        display_order
    )
    values (
        gen_random_uuid(),
        v_content_id,
        p_tagline,
        p_getting_there_steps,
        p_quick_facts,
        p_display_order
    )
    returning id into v_district_id;

    -- 3. insert main image (if exists)
    if p_main_image is not null then
        insert into media (id, url, alt, caption)
        values (
            gen_random_uuid(),
            p_main_image->>'url',
            p_main_image->>'alt',
            p_main_image->>'caption'
        )
        returning id into v_media_id;

        insert into content_media (
            content_id,
            media_id,
            role,
            display_order
        )
        values (
            v_content_id,
            v_media_id,
            'main',
            1
        );
    end if;

    -- 4. insert gallery images
    for v_item in
        select * from jsonb_array_elements(p_gallery_images)
    loop
        insert into media (id, url, alt, caption)
        values (
            gen_random_uuid(),
            v_item->>'url',
            v_item->>'alt',
            v_item->>'caption'
        )
        returning id into v_media_id;

        insert into content_media (
            content_id,
            media_id,
            role,
            display_order
        )
        values (
            v_content_id,
            v_media_id,
            'gallery',
            coalesce((v_item->>'order')::int, 1)
        );
    end loop;

    return query
    select v_district_id, v_content_id;
end;
$$;





create or replace function create_municipality(
    p_district_id uuid,
    p_name text,
    p_slug text,
    p_short_description text,
    p_body text,
    p_tags text[],
    p_status content_status default 'published',

    p_main_image jsonb default null,
    p_gallery_images jsonb default '[]'::jsonb
)
returns table (
    municipality_id uuid,
    content_id uuid
)
language plpgsql
as $$
declare
    v_content_id uuid;
    v_municipality_id uuid;

    v_media_id uuid;
    v_item jsonb;
begin
    insert into content (
        type,
        name,
        slug,
        short_description,
        body,
        tags,
        status,
        published_at
    )
    values (
        'municipality',
        p_name,
        p_slug,
        p_short_description,
        regexp_replace(p_body, '^[ \t]+', '', 'gm'),
        p_tags,
        p_status,
        case when p_status = 'published' then now() else null end
    )
    returning id into v_content_id;

    insert into municipality (
        id,
        district_id,
        content_id
    )
    values (
        gen_random_uuid(),
        p_district_id,
        v_content_id
    )
    returning id into v_municipality_id;

    if p_main_image is not null then
        insert into media (id, url, alt, caption)
        values (
            gen_random_uuid(),
            p_main_image->>'url',
            p_main_image->>'alt',
            p_main_image->>'caption'
        )
        returning id into v_media_id;

        insert into content_media (
            content_id,
            media_id,
            role,
            display_order
        )
        values (
            v_content_id,
            v_media_id,
            'main',
            1
        );
    end if;

    for v_item in
        select * from jsonb_array_elements(p_gallery_images)
    loop
        insert into media (id, url, alt, caption)
        values (
            gen_random_uuid(),
            v_item->>'url',
            v_item->>'alt',
            v_item->>'caption'
        )
        returning id into v_media_id;

        insert into content_media (
            content_id,
            media_id,
            role,
            display_order
        )
        values (
            v_content_id,
            v_media_id,
            'gallery',
            coalesce((v_item->>'order')::int, 1)
        );
    end loop;

    return query
    select v_municipality_id, v_content_id;
end;
$$;




create or replace function create_attraction(
    p_municipality_id uuid,
    p_name text,
    p_slug text,
    p_short_description text,
    p_body text,
    p_tags text[],
    p_status content_status default 'published',

    p_main_image jsonb default null,
    p_gallery_images jsonb default '[]'::jsonb
)
returns table (
    attraction_id uuid,
    content_id uuid
)
language plpgsql
as $$
declare
    v_content_id uuid;
    v_attraction_id uuid;

    v_media_id uuid;
    v_item jsonb;
begin
    insert into content (
        type,
        name,
        slug,
        short_description,
        body,
        tags,
        status,
        published_at
    )
    values (
        'attractions',
        p_name,
        p_slug,
        p_short_description,
        regexp_replace(p_body, '^[ \t]+', '', 'gm'),
        p_tags,
        p_status,
        case when p_status = 'published' then now() else null end
    )
    returning id into v_content_id;

    insert into attraction (
        id,
        municipality_id,
        content_id
    )
    values (
        gen_random_uuid(),
        p_municipality_id,
        v_content_id
    )
    returning id into v_attraction_id;

    if p_main_image is not null then
        insert into media (id, url, alt, caption)
        values (
            gen_random_uuid(),
            p_main_image->>'url',
            p_main_image->>'alt',
            p_main_image->>'caption'
        )
        returning id into v_media_id;

        insert into content_media (
            content_id,
            media_id,
            role,
            display_order
        )
        values (
            v_content_id,
            v_media_id,
            'main',
            1
        );
    end if;

    for v_item in
        select * from jsonb_array_elements(p_gallery_images)
    loop
        insert into media (id, url, alt, caption)
        values (
            gen_random_uuid(),
            v_item->>'url',
            v_item->>'alt',
            v_item->>'caption'
        )
        returning id into v_media_id;

        insert into content_media (
            content_id,
            media_id,
            role,
            display_order
        )
        values (
            v_content_id,
            v_media_id,
            'gallery',
            coalesce((v_item->>'order')::int, 1)
        );
    end loop;

    return query
    select v_attraction_id, v_content_id;
end;
$$;





create or replace function create_food(
    p_municipality_id uuid,
    p_name text,
    p_slug text,
    p_short_description text,
    p_body text,
    p_tags text[],
    p_food_type food_type,
    p_status content_status default 'published',

    p_main_image jsonb default null,
    p_gallery_images jsonb default '[]'::jsonb
)
returns table (
    food_id uuid,
    content_id uuid
)
language plpgsql
as $$
declare
    v_content_id uuid;
    v_food_id uuid;

    v_media_id uuid;
    v_item jsonb;
begin
    insert into content (
        type,
        name,
        slug,
        short_description,
        body,
        tags,
        status,
        published_at
    )
    values (
        'foods',
        p_name,
        p_slug,
        p_short_description,
        regexp_replace(p_body, '^[ \t]+', '', 'gm'),
        p_tags,
        p_status,
        case when p_status = 'published' then now() else null end
    )
    returning id into v_content_id;

    insert into food (
        id,
        municipality_id,
        content_id,
        type
    )
    values (
        gen_random_uuid(),
        p_municipality_id,
        v_content_id,
        p_food_type
    )
    returning id into v_food_id;

    if p_main_image is not null then
        insert into media (id, url, alt, caption)
        values (
            gen_random_uuid(),
            p_main_image->>'url',
            p_main_image->>'alt',
            p_main_image->>'caption'
        )
        returning id into v_media_id;

        insert into content_media (
            content_id,
            media_id,
            role,
            display_order
        )
        values (
            v_content_id,
            v_media_id,
            'main',
            1
        );
    end if;

    for v_item in
        select * from jsonb_array_elements(p_gallery_images)
    loop
        insert into media (id, url, alt, caption)
        values (
            gen_random_uuid(),
            v_item->>'url',
            v_item->>'alt',
            v_item->>'caption'
        )
        returning id into v_media_id;

        insert into content_media (
            content_id,
            media_id,
            role,
            display_order
        )
        values (
            v_content_id,
            v_media_id,
            'gallery',
            coalesce((v_item->>'order')::int, 1)
        );
    end loop;

    return query
    select v_food_id, v_content_id;
end;
$$;




create or replace function create_festival(
    p_municipality_id uuid,
    p_name text,
    p_slug text,
    p_short_description text,
    p_body text,
    p_tags text[],
    p_date date,
    p_status content_status default 'published',

    p_main_image jsonb default null,
    p_gallery_images jsonb default '[]'::jsonb
)
returns table (
    festival_id uuid,
    content_id uuid
)
language plpgsql
as $$
declare
    v_content_id uuid;
    v_festival_id uuid;

    v_media_id uuid;
    v_item jsonb;
begin
    insert into content (
        type,
        name,
        slug,
        short_description,
        body,
        tags,
        status,
        published_at
    )
    values (
        'festivals',
        p_name,
        p_slug,
        p_short_description,
        regexp_replace(p_body, '^[ \t]+', '', 'gm'),
        p_tags,
        p_status,
        case when p_status = 'published' then now() else null end
    )
    returning id into v_content_id;

    insert into festival (
        id,
        municipality_id,
        content_id,
        date
    )
    values (
        gen_random_uuid(),
        p_municipality_id,
        v_content_id,
        p_date
    )
    returning id into v_festival_id;

    if p_main_image is not null then
        insert into media (id, url, alt, caption)
        values (
            gen_random_uuid(),
            p_main_image->>'url',
            p_main_image->>'alt',
            p_main_image->>'caption'
        )
        returning id into v_media_id;

        insert into content_media (
            content_id,
            media_id,
            role,
            display_order
        )
        values (
            v_content_id,
            v_media_id,
            'main',
            1
        );
    end if;

    for v_item in
        select * from jsonb_array_elements(p_gallery_images)
    loop
        insert into media (id, url, alt, caption)
        values (
            gen_random_uuid(),
            v_item->>'url',
            v_item->>'alt',
            v_item->>'caption'
        )
        returning id into v_media_id;

        insert into content_media (
            content_id,
            media_id,
            role,
            display_order
        )
        values (
            v_content_id,
            v_media_id,
            'gallery',
            coalesce((v_item->>'order')::int, 1)
        );
    end loop;

    return query
    select v_festival_id, v_content_id;
end;
$$;





create or replace function create_event(
    p_municipality_id uuid,
    p_name text,
    p_slug text,
    p_short_description text,
    p_body text,
    p_tags text[],
    p_date date,
    p_end_date date default null,
    p_venue text default null,
    p_status content_status default 'published',

    p_main_image jsonb default null,
    p_gallery_images jsonb default '[]'::jsonb
)
returns table (
    event_id uuid,
    content_id uuid
)
language plpgsql
as $$
declare
    v_content_id uuid;
    v_event_id uuid;

    v_media_id uuid;
    v_item jsonb;
begin
    insert into content (
        type,
        name,
        slug,
        short_description,
        body,
        tags,
        status,
        published_at
    )
    values (
        'events',
        p_name,
        p_slug,
        p_short_description,
        regexp_replace(p_body, '^[ \t]+', '', 'gm'),
        p_tags,
        p_status,
        case when p_status = 'published' then now() else null end
    )
    returning id into v_content_id;

    insert into event (
        id,
        municipality_id,
        content_id,
        date,
        end_date,
        venue
    )
    values (
        gen_random_uuid(),
        p_municipality_id,
        v_content_id,
        p_date,
        p_end_date,
        p_venue
    )
    returning id into v_event_id;

    if p_main_image is not null then
        insert into media (id, url, alt, caption)
        values (
            gen_random_uuid(),
            p_main_image->>'url',
            p_main_image->>'alt',
            p_main_image->>'caption'
        )
        returning id into v_media_id;

        insert into content_media (
            content_id,
            media_id,
            role,
            display_order
        )
        values (
            v_content_id,
            v_media_id,
            'main',
            1
        );
    end if;

    for v_item in
        select * from jsonb_array_elements(p_gallery_images)
    loop
        insert into media (id, url, alt, caption)
        values (
            gen_random_uuid(),
            v_item->>'url',
            v_item->>'alt',
            v_item->>'caption'
        )
        returning id into v_media_id;

        insert into content_media (
            content_id,
            media_id,
            role,
            display_order
        )
        values (
            v_content_id,
            v_media_id,
            'gallery',
            coalesce((v_item->>'order')::int, 1)
        );
    end loop;

    return query
    select v_event_id, v_content_id;
end;
$$;
