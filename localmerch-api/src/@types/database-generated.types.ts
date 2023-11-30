export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      category: {
        Row: {
          created_at: string
          id: number
          name: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      product: {
        Row: {
          category_id: number | null
          created_at: string
          description: string | null
          id: number
          name: string
          summary: string | null
          updated_at: string | null
        }
        Insert: {
          category_id?: number | null
          created_at?: string
          description?: string | null
          id?: number
          name: string
          summary?: string | null
          updated_at?: string | null
        }
        Update: {
          category_id?: number | null
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          summary?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          }
        ]
      }
      shop: {
        Row: {
          created_at: string
          id: number
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      shop_products: {
        Row: {
          created_at: string
          id: number
          product_id: number
          shop_id: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          product_id: number
          shop_id: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          product_id?: number
          shop_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shop_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shop_products_shop_id_fkey"
            columns: ["shop_id"]
            isOneToOne: false
            referencedRelation: "shop"
            referencedColumns: ["id"]
          }
        ]
      }
      variant: {
        Row: {
          created_at: string
          id: number
          price: number
          quantity: number
          size: string | null
          size_name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          price: number
          quantity: number
          size?: string | null
          size_name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          price?: number
          quantity?: number
          size?: string | null
          size_name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      variant_picture: {
        Row: {
          created_at: string
          id: number
          picture: string
          updated_at: string | null
          variant_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          picture: string
          updated_at?: string | null
          variant_id: number
        }
        Update: {
          created_at?: string
          id?: number
          picture?: string
          updated_at?: string | null
          variant_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "variant_picture_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "variant"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
