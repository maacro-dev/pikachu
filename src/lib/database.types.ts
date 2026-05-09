export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      attraction: {
        Row: {
          content_id: string
          id: string
          municipality_id: string
        }
        Insert: {
          content_id: string
          id?: string
          municipality_id: string
        }
        Update: {
          content_id?: string
          id?: string
          municipality_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attraction_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "attraction_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "attraction_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attraction_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "district_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "attraction_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "event_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "attraction_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "festival_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "attraction_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "food_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "attraction_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "municipality_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "attraction_municipality_id_fkey"
            columns: ["municipality_id"]
            isOneToOne: false
            referencedRelation: "attraction_view"
            referencedColumns: ["municipality_id"]
          },
          {
            foreignKeyName: "attraction_municipality_id_fkey"
            columns: ["municipality_id"]
            isOneToOne: false
            referencedRelation: "event_view"
            referencedColumns: ["municipality_id"]
          },
          {
            foreignKeyName: "attraction_municipality_id_fkey"
            columns: ["municipality_id"]
            isOneToOne: false
            referencedRelation: "festival_view"
            referencedColumns: ["municipality_id"]
          },
          {
            foreignKeyName: "attraction_municipality_id_fkey"
            columns: ["municipality_id"]
            isOneToOne: false
            referencedRelation: "food_view"
            referencedColumns: ["municipality_id"]
          },
          {
            foreignKeyName: "attraction_municipality_id_fkey"
            columns: ["municipality_id"]
            isOneToOne: false
            referencedRelation: "municipality"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attraction_municipality_id_fkey"
            columns: ["municipality_id"]
            isOneToOne: false
            referencedRelation: "municipality_view"
            referencedColumns: ["municipality_id"]
          },
        ]
      }
      content: {
        Row: {
          body: string | null
          featured: boolean | null
          id: string
          name: string
          published_at: string | null
          short_description: string
          slug: string
          status: Database["public"]["Enums"]["content_status"] | null
          tags: string[] | null
          type: Database["public"]["Enums"]["content_type"] | null
        }
        Insert: {
          body?: string | null
          featured?: boolean | null
          id?: string
          name: string
          published_at?: string | null
          short_description: string
          slug: string
          status?: Database["public"]["Enums"]["content_status"] | null
          tags?: string[] | null
          type?: Database["public"]["Enums"]["content_type"] | null
        }
        Update: {
          body?: string | null
          featured?: boolean | null
          id?: string
          name?: string
          published_at?: string | null
          short_description?: string
          slug?: string
          status?: Database["public"]["Enums"]["content_status"] | null
          tags?: string[] | null
          type?: Database["public"]["Enums"]["content_type"] | null
        }
        Relationships: []
      }
      content_media: {
        Row: {
          content_id: string
          display_order: number | null
          media_id: string
          role: Database["public"]["Enums"]["media_role"]
        }
        Insert: {
          content_id: string
          display_order?: number | null
          media_id: string
          role: Database["public"]["Enums"]["media_role"]
        }
        Update: {
          content_id?: string
          display_order?: number | null
          media_id?: string
          role?: Database["public"]["Enums"]["media_role"]
        }
        Relationships: [
          {
            foreignKeyName: "content_media_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "attraction_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "content_media_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_media_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "district_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "content_media_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "event_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "content_media_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "festival_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "content_media_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "food_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "content_media_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "municipality_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "content_media_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
        ]
      }
      district: {
        Row: {
          content_id: string
          display_order: number | null
          getting_there_steps: string[] | null
          id: string
          quick_facts: Json | null
          tagline: string | null
        }
        Insert: {
          content_id: string
          display_order?: number | null
          getting_there_steps?: string[] | null
          id?: string
          quick_facts?: Json | null
          tagline?: string | null
        }
        Update: {
          content_id?: string
          display_order?: number | null
          getting_there_steps?: string[] | null
          id?: string
          quick_facts?: Json | null
          tagline?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "district_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "attraction_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "district_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "district_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "district_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "district_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "event_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "district_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "festival_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "district_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "food_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "district_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "municipality_view"
            referencedColumns: ["content_id"]
          },
        ]
      }
      event: {
        Row: {
          content_id: string
          date: string | null
          end_date: string | null
          id: string
          municipality_id: string
          venue: string | null
        }
        Insert: {
          content_id: string
          date?: string | null
          end_date?: string | null
          id?: string
          municipality_id: string
          venue?: string | null
        }
        Update: {
          content_id?: string
          date?: string | null
          end_date?: string | null
          id?: string
          municipality_id?: string
          venue?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "attraction_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "event_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "district_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "event_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "event_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "event_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "festival_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "event_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "food_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "event_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "municipality_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "event_municipality_id_fkey"
            columns: ["municipality_id"]
            isOneToOne: false
            referencedRelation: "attraction_view"
            referencedColumns: ["municipality_id"]
          },
          {
            foreignKeyName: "event_municipality_id_fkey"
            columns: ["municipality_id"]
            isOneToOne: false
            referencedRelation: "event_view"
            referencedColumns: ["municipality_id"]
          },
          {
            foreignKeyName: "event_municipality_id_fkey"
            columns: ["municipality_id"]
            isOneToOne: false
            referencedRelation: "festival_view"
            referencedColumns: ["municipality_id"]
          },
          {
            foreignKeyName: "event_municipality_id_fkey"
            columns: ["municipality_id"]
            isOneToOne: false
            referencedRelation: "food_view"
            referencedColumns: ["municipality_id"]
          },
          {
            foreignKeyName: "event_municipality_id_fkey"
            columns: ["municipality_id"]
            isOneToOne: false
            referencedRelation: "municipality"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_municipality_id_fkey"
            columns: ["municipality_id"]
            isOneToOne: false
            referencedRelation: "municipality_view"
            referencedColumns: ["municipality_id"]
          },
        ]
      }
      festival: {
        Row: {
          content_id: string
          date: string | null
          id: string
          municipality_id: string
        }
        Insert: {
          content_id: string
          date?: string | null
          id?: string
          municipality_id: string
        }
        Update: {
          content_id?: string
          date?: string | null
          id?: string
          municipality_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "festival_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "attraction_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "festival_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "festival_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "district_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "festival_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "event_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "festival_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "festival_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "festival_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "food_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "festival_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "municipality_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "festival_municipality_id_fkey"
            columns: ["municipality_id"]
            isOneToOne: false
            referencedRelation: "attraction_view"
            referencedColumns: ["municipality_id"]
          },
          {
            foreignKeyName: "festival_municipality_id_fkey"
            columns: ["municipality_id"]
            isOneToOne: false
            referencedRelation: "event_view"
            referencedColumns: ["municipality_id"]
          },
          {
            foreignKeyName: "festival_municipality_id_fkey"
            columns: ["municipality_id"]
            isOneToOne: false
            referencedRelation: "festival_view"
            referencedColumns: ["municipality_id"]
          },
          {
            foreignKeyName: "festival_municipality_id_fkey"
            columns: ["municipality_id"]
            isOneToOne: false
            referencedRelation: "food_view"
            referencedColumns: ["municipality_id"]
          },
          {
            foreignKeyName: "festival_municipality_id_fkey"
            columns: ["municipality_id"]
            isOneToOne: false
            referencedRelation: "municipality"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "festival_municipality_id_fkey"
            columns: ["municipality_id"]
            isOneToOne: false
            referencedRelation: "municipality_view"
            referencedColumns: ["municipality_id"]
          },
        ]
      }
      food: {
        Row: {
          content_id: string
          id: string
          municipality_id: string
          type: Database["public"]["Enums"]["food_type"] | null
        }
        Insert: {
          content_id: string
          id?: string
          municipality_id: string
          type?: Database["public"]["Enums"]["food_type"] | null
        }
        Update: {
          content_id?: string
          id?: string
          municipality_id?: string
          type?: Database["public"]["Enums"]["food_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "food_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "attraction_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "food_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "food_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "district_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "food_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "event_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "food_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "festival_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "food_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "food_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "food_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "municipality_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "food_municipality_id_fkey"
            columns: ["municipality_id"]
            isOneToOne: false
            referencedRelation: "attraction_view"
            referencedColumns: ["municipality_id"]
          },
          {
            foreignKeyName: "food_municipality_id_fkey"
            columns: ["municipality_id"]
            isOneToOne: false
            referencedRelation: "event_view"
            referencedColumns: ["municipality_id"]
          },
          {
            foreignKeyName: "food_municipality_id_fkey"
            columns: ["municipality_id"]
            isOneToOne: false
            referencedRelation: "festival_view"
            referencedColumns: ["municipality_id"]
          },
          {
            foreignKeyName: "food_municipality_id_fkey"
            columns: ["municipality_id"]
            isOneToOne: false
            referencedRelation: "food_view"
            referencedColumns: ["municipality_id"]
          },
          {
            foreignKeyName: "food_municipality_id_fkey"
            columns: ["municipality_id"]
            isOneToOne: false
            referencedRelation: "municipality"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "food_municipality_id_fkey"
            columns: ["municipality_id"]
            isOneToOne: false
            referencedRelation: "municipality_view"
            referencedColumns: ["municipality_id"]
          },
        ]
      }
      media: {
        Row: {
          alt: string | null
          caption: string | null
          id: string
          url: string
        }
        Insert: {
          alt?: string | null
          caption?: string | null
          id?: string
          url: string
        }
        Update: {
          alt?: string | null
          caption?: string | null
          id?: string
          url?: string
        }
        Relationships: []
      }
      municipality: {
        Row: {
          content_id: string
          district_id: string
          id: string
        }
        Insert: {
          content_id: string
          district_id: string
          id?: string
        }
        Update: {
          content_id?: string
          district_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "municipality_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "attraction_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "municipality_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "municipality_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "district_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "municipality_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "event_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "municipality_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "festival_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "municipality_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "food_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "municipality_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "municipality_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "municipality_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "attraction_view"
            referencedColumns: ["district_id"]
          },
          {
            foreignKeyName: "municipality_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "district"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "municipality_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "district_view"
            referencedColumns: ["district_id"]
          },
          {
            foreignKeyName: "municipality_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "event_view"
            referencedColumns: ["district_id"]
          },
          {
            foreignKeyName: "municipality_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "festival_view"
            referencedColumns: ["district_id"]
          },
          {
            foreignKeyName: "municipality_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "food_view"
            referencedColumns: ["district_id"]
          },
          {
            foreignKeyName: "municipality_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "municipality_view"
            referencedColumns: ["district_id"]
          },
        ]
      }
    }
    Views: {
      attraction_view: {
        Row: {
          attraction_id: string | null
          body: string | null
          content_id: string | null
          district_id: string | null
          district_name: string | null
          district_slug: string | null
          featured: boolean | null
          gallery: Json | null
          hero_alt: string | null
          hero_image: string | null
          municipality_id: string | null
          municipality_name: string | null
          municipality_slug: string | null
          name: string | null
          published_at: string | null
          short_description: string | null
          slug: string | null
          status: Database["public"]["Enums"]["content_status"] | null
          tags: string[] | null
        }
        Relationships: []
      }
      district_view: {
        Row: {
          body: string | null
          content_id: string | null
          display_order: number | null
          district_id: string | null
          featured: boolean | null
          gallery: Json | null
          getting_there_steps: string[] | null
          hero_alt: string | null
          hero_image: string | null
          name: string | null
          published_at: string | null
          quick_facts: Json | null
          short_description: string | null
          slug: string | null
          status: Database["public"]["Enums"]["content_status"] | null
          tagline: string | null
          tags: string[] | null
        }
        Relationships: []
      }
      event_view: {
        Row: {
          body: string | null
          content_id: string | null
          date: string | null
          district_id: string | null
          district_name: string | null
          district_slug: string | null
          end_date: string | null
          event_id: string | null
          featured: boolean | null
          gallery: Json | null
          hero_alt: string | null
          hero_image: string | null
          municipality_id: string | null
          municipality_name: string | null
          municipality_slug: string | null
          name: string | null
          published_at: string | null
          short_description: string | null
          slug: string | null
          status: Database["public"]["Enums"]["content_status"] | null
          tags: string[] | null
          venue: string | null
        }
        Relationships: []
      }
      festival_view: {
        Row: {
          body: string | null
          content_id: string | null
          date: string | null
          district_id: string | null
          district_name: string | null
          district_slug: string | null
          featured: boolean | null
          festival_id: string | null
          gallery: Json | null
          hero_alt: string | null
          hero_image: string | null
          municipality_id: string | null
          municipality_name: string | null
          municipality_slug: string | null
          name: string | null
          published_at: string | null
          short_description: string | null
          slug: string | null
          status: Database["public"]["Enums"]["content_status"] | null
          tags: string[] | null
        }
        Relationships: []
      }
      food_view: {
        Row: {
          body: string | null
          content_id: string | null
          district_id: string | null
          district_name: string | null
          district_slug: string | null
          featured: boolean | null
          food_id: string | null
          food_type: Database["public"]["Enums"]["food_type"] | null
          gallery: Json | null
          hero_alt: string | null
          hero_image: string | null
          municipality_id: string | null
          municipality_name: string | null
          municipality_slug: string | null
          name: string | null
          published_at: string | null
          short_description: string | null
          slug: string | null
          status: Database["public"]["Enums"]["content_status"] | null
          tags: string[] | null
        }
        Relationships: []
      }
      municipality_view: {
        Row: {
          body: string | null
          content_id: string | null
          district_content_id: string | null
          district_id: string | null
          district_name: string | null
          district_slug: string | null
          featured: boolean | null
          gallery: Json | null
          hero_alt: string | null
          hero_image: string | null
          municipality_id: string | null
          name: string | null
          published_at: string | null
          short_description: string | null
          slug: string | null
          status: Database["public"]["Enums"]["content_status"] | null
          tags: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "district_content_id_fkey"
            columns: ["district_content_id"]
            isOneToOne: false
            referencedRelation: "attraction_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "district_content_id_fkey"
            columns: ["district_content_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "district_content_id_fkey"
            columns: ["district_content_id"]
            isOneToOne: false
            referencedRelation: "district_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "district_content_id_fkey"
            columns: ["district_content_id"]
            isOneToOne: false
            referencedRelation: "event_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "district_content_id_fkey"
            columns: ["district_content_id"]
            isOneToOne: false
            referencedRelation: "festival_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "district_content_id_fkey"
            columns: ["district_content_id"]
            isOneToOne: false
            referencedRelation: "food_view"
            referencedColumns: ["content_id"]
          },
          {
            foreignKeyName: "district_content_id_fkey"
            columns: ["district_content_id"]
            isOneToOne: false
            referencedRelation: "municipality_view"
            referencedColumns: ["content_id"]
          },
        ]
      }
    }
    Functions: {
      create_district: {
        Args: {
          p_body: string
          p_display_order: number
          p_gallery_images?: Json
          p_getting_there_steps: string[]
          p_main_image?: Json
          p_name: string
          p_quick_facts?: Json
          p_short_description: string
          p_slug: string
          p_status?: Database["public"]["Enums"]["content_status"]
          p_tagline: string
          p_tags: string[]
        }
        Returns: {
          content_id: string
          district_id: string
        }[]
      }
    }
    Enums: {
      content_status: "draft" | "published"
      content_type:
        | "district"
        | "municipality"
        | "attractions"
        | "festivals"
        | "foods"
        | "events"
      food_type: "local" | "street" | "restaurant" | "seafood" | "dessert"
      media_role: "main" | "gallery"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      content_status: ["draft", "published"],
      content_type: [
        "district",
        "municipality",
        "attractions",
        "festivals",
        "foods",
        "events",
      ],
      food_type: ["local", "street", "restaurant", "seafood", "dessert"],
      media_role: ["main", "gallery"],
    },
  },
} as const

