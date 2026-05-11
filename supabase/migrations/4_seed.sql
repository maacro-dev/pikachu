-- 3_seed.sql

-- district 1
select * from create_district(
    'District 1',
    'the-heritage-destination',
    'Heritage towns, coastal landscapes, and historic churches of Iloilo’s western district.',
    $$
    The First Congressional District of Iloilo, composed of Oton, Tigbauan, Guimbal, Tubungan, Igbaras, Miagao, and San Joaquin, is known as the province’s Heritage Destination. It features numerous historic sites, including the St. Thomas of Villanova Parish in Miagao, the only UNESCO World Heritage Site in the Visayas and Mindanao.

    The district also offers scenic coastlines with marine protected areas and beach resorts, as well as natural attractions such as waterfalls, rock formations, caves, a hidden lake, and rice terraces in its upland areas.

    Visitors can reach the district by jeepney or bus from major terminals in Iloilo City and nearby towns.
    $$,
    null,
    'The Heritage Destination',
    array[
        'Placeholder step 1',
        'Placeholder step 2',
        'Placeholder step 3'
    ],
    1,
    '[
        {
            "icon": "map-pin",
            "label": "Municipalities",
            "value": "7 towns"
        },
        {
            "icon": "map-marker",
            "label": "Highlight",
            "value": "UNESCO heritage site"
        },
        {
            "icon": "mountains",
            "label": "Landscape",
            "value": "Coastal and upland attractions"
        }
    ]'::jsonb,
    'published',
    '{
        "url": "https://placehold.co/600x600?text=Placeholder",
        "alt": "District 1 Hero",
        "caption": "District 1 Hero Caption"
    }'::jsonb,
    '[
        {
            "url": "https://placehold.co/400x400?text=Placeholder",
            "alt": "District 1 Image 1",
            "caption": "District 1 Image 1 Caption"
        },
        {
            "url": "https://placehold.co/400x400?text=Placeholder",
            "alt": "District 1 Image 2",
            "caption": "District 1 Image 2 Caption"
        },
        {
            "url": "https://placehold.co/400x400?text=Placeholder",
            "alt": "District 1 Image 3",
            "caption": "District 1 Image 3 Caption"
        }
    ]'::jsonb
);

-- district 2
select * from create_district(
    'District 2',
    'eco-cultural-district-of-iloilo',
    'The premier eco-cultural destination featuring mountain ranges, festivals, and scenic landscapes in central Iloilo.',
    $$
    Comprised of the towns of Alimodian, Leganes, Leon, New Lucena, Pavia, San Miguel, Sta. Barbara, and Zarraga, this district is Iloilo’s premier eco-cultural destination. It offers year-round ecotourism activities, from hiking and mountain biking across expansive ranges to enjoying panoramic views that extend to neighboring towns and provinces.

    A highlight is Sitio Tabionan in Barangay Bucari, 1,200 meters above sea level, known as the “Summer Capital of Iloilo” for its pine forests and mist-covered mountains. Each town also hosts unique festivals, including the province’s oldest cultural celebration, Carabao-Carroza, held every May. This compact yet charming district combines natural beauty, rich culture, and historic attractions, making it a must-visit destination.
    $$,
    null,
    'Eco-Cultural District of Iloilo',
    array[
        'Placeholder step 1',
        'Placeholder step 2',
        'Placeholder step 3'
    ],
    2,
    '[
        {
            "icon": "mountains",
            "label": "Terrain",
            "value": "Mountain ranges and scenic views"
        },
        {
            "icon": "map-pin",
            "label": "Festival",
            "value": "Carabao-Carroza every May"
        },
        {
            "icon": "trees",
            "label": "Nature",
            "value": "Bucari pine forests"
        }
    ]'::jsonb,
    'published',
    '{
        "url": "https://placehold.co/600x600?text=Placeholder",
        "alt": "District 2 Hero",
        "caption": "District 2 Hero Caption"
    }'::jsonb,
    '[
        {
            "url": "https://placehold.co/400x400?text=Placeholder",
            "alt": "District 2 Image 1",
            "caption": "District 2 Image 1 Caption"
        },
        {
            "url": "https://placehold.co/400x400?text=Placeholder",
            "alt": "District 2 Image 2",
            "caption": "District 2 Image 2 Caption"
        },
        {
            "url": "https://placehold.co/400x400?text=Placeholder",
            "alt": "District 2 Image 3",
            "caption": "District 2 Image 3 Caption"
        }
    ]'::jsonb
);

-- district 3
select * from create_district(
    'District 3',
    'eco-agricultural-destination',
    'Comprised of the towns of Cabatuan, Maasin, Janiuay, Badiangan, Lambunao, Calinog, Bingawan, Mina, and Pototan, this district is recognized as the Eco-Agricultural Destination of Iloilo, offering dramatic natural landscapes where endangered fauna and unique flora thrive and home to vibrant indigenous communities, as well as featuring farm resorts that combine organic agriculture with recreation and leisure, inviting visitors to explore its ecological and agricultural treasures.',
    $$
    Travelers can experience the rich culture of the Panay Bukidnons or Sulodnons, known for their storytelling, traditional dances, and colorful costumes. The area also preserves historical structures and landmarks, reflecting its past while blending with natural beauty.
    $$,
    null,
    'Eco-Agricultural Destination',
    array[
        'Placeholder step 1',
        'Placeholder step 2',
        'Placeholder step 3'
    ],
    3,
    '[
        {
            "icon": "map-pin",
            "label": "Theme",
            "value": "Eco-agricultural"
        },
        {
            "icon": "map-marker",
            "label": "Culture",
            "value": "Panay Bukidnon and Sulodnon communities"
        },
        {
            "icon": "mountains",
            "label": "Experience",
            "value": "Farm resorts and organic agriculture"
        }
    ]'::jsonb,
    'published',
    '{
        "url": "https://placehold.co/600x600?text=Placeholder",
        "alt": "District 3 Hero",
        "caption": "District 3 Hero Caption"
    }'::jsonb,
    '[
        {
            "url": "https://placehold.co/400x400?text=Placeholder",
            "alt": "District 3 Image 1",
            "caption": "District 3 Image 1 Caption"
        },
        {
            "url": "https://placehold.co/400x400?text=Placeholder",
            "alt": "District 3 Image 2",
            "caption": "District 3 Image 2 Caption"
        },
        {
            "url": "https://placehold.co/400x400?text=Placeholder",
            "alt": "District 3 Image 3",
            "caption": "District 3 Image 3 Caption"
        }
    ]'::jsonb
);

-- district 4
select * from create_district(
    'District 4',
    'historical-adventure-and-sports-destination',
    'The Fourth Congressional District, composed of Dumangas, Dingle, Duenas, Passi City, San Enrique, Barotac Nuevo, Anilao, and Banate, is celebrated as Iloilo’s historical, adventure, and sports destination. The area is rich in tradition and mystery, offering abundant outdoor activities for nature and adventure enthusiasts. Visitors can explore caves, including those in Bulabog Puti-an, Panay’s only national park, for a unique way to connect with nature. Marine lovers will also enjoy the Hibotkan Rock Marine Sanctuary, a 25-hectare protected area between the district’s waters and the Guimaras Strait, which shelters diverse corals and marine life, with one hectare exposed at low tide.',
    $$
    The district’s towns retain a charming historic ambiance, highlighted by beautiful churches and centuries-old heritage sites that reflect its deep historical roots. Travelers can reach the district by van via Monfort Coast Boulevard, with vehicles available at Baldoza Transport Terminal in Barangay Baldoza, Lapaz, or by bus from the New Ceres Terminal in Barangay Camalig, Jaro, Iloilo City.
    $$,
    null,
    'Historical, Adventure, and Sports Destination',
    array[
        'Placeholder step 1',
        'Placeholder step 2',
        'Placeholder step 3'
    ],
    4,
    '[
        {
            "icon": "map-pin",
            "label": "Theme",
            "value": "Historical and adventure destination"
        },
        {
            "icon": "map-marker",
            "label": "Nature",
            "value": "Caves and marine sanctuary"
        },
        {
            "icon": "mountains",
            "label": "Access",
            "value": "Via van or bus from Iloilo City"
        }
    ]'::jsonb,
    'published',
    '{
        "url": "https://placehold.co/600x600?text=Placeholder",
        "alt": "District 4 Hero",
        "caption": "District 4 Hero Caption"
    }'::jsonb,
    '[
        {
            "url": "https://placehold.co/400x400?text=Placeholder",
            "alt": "District 4 Image 1",
            "caption": "District 4 Image 1 Caption"
        },
        {
            "url": "https://placehold.co/400x400?text=Placeholder",
            "alt": "District 4 Image 2",
            "caption": "District 4 Image 2 Caption"
        },
        {
            "url": "https://placehold.co/400x400?text=Placeholder",
            "alt": "District 4 Image 3",
            "caption": "District 4 Image 3 Caption"
        }
    ]'::jsonb
);

-- district 5
select * from create_district(
    'District 5',
    'island-destination',
    'Located in northern Iloilo, the Fifth District includes the towns of Barotac Viejo, San Rafael, Ajuy, Concepcion, Sara, Lemery, San Dionisio, Batad, Estancia, Balasan, and Carles, along with 60 islands, making it the province’s premier resort destination. The area is known for its stunning beaches, from white sand to pebbles, and dramatic limestone cliffs, with clear blue waters that attract thousands of tourists each year.',
    $$
    Visitors can enjoy island hopping, sunbathing, and relaxing by the sea, while also exploring the district’s rich history. Ancestral houses, centuries-old chimneys, and two 18th-century lighthouses—one of which is the second oldest in the country—highlight its cultural heritage. To reach the district, buses and vans are available daily from the new Ceres Terminal in Barangay Camalig, Jaro, Iloilo City.
    $$,
    null,
    'Island Destination',
    array[
        'Placeholder step 1',
        'Placeholder step 2',
        'Placeholder step 3'
    ],
    5,
    '[
        {
            "icon": "map-pin",
            "label": "Theme",
            "value": "Island and resort destination"
        },
        {
            "icon": "map-marker",
            "label": "Landscape",
            "value": "White sand, pebbles, and cliffs"
        },
        {
            "icon": "mountains",
            "label": "Access",
            "value": "Bus and van from Iloilo City"
        }
    ]'::jsonb,
    'published',
    '{
        "url": "https://placehold.co/600x600?text=Placeholder",
        "alt": "District 5 Hero",
        "caption": "District 5 Hero Caption"
    }'::jsonb,
    '[
        {
            "url": "https://placehold.co/400x400?text=Placeholder",
            "alt": "District 5 Image 1",
            "caption": "District 5 Image 1 Caption"
        },
        {
            "url": "https://placehold.co/400x400?text=Placeholder",
            "alt": "District 5 Image 2",
            "caption": "District 5 Image 2 Caption"
        },
        {
            "url": "https://placehold.co/400x400?text=Placeholder",
            "alt": "District 5 Image 3",
            "caption": "District 5 Image 3 Caption"
        }
    ]'::jsonb
);
