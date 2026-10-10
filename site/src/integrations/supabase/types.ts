export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      articles: {
        Row: {
          canonical_url: string | null
          created_at: string
          deck: string | null
          headline: string
          id: string
          import_status: string
          links: Json
          main_source_text: string | null
          outlet: string
          paragraphs: Json
          published_at: string | null
          published_date: string | null
          source: string | null
          source_type: string
          url: string
        }
        Insert: {
          canonical_url?: string | null
          created_at?: string
          deck?: string | null
          headline: string
          id?: string
          import_status?: string
          links?: Json
          main_source_text?: string | null
          outlet: string
          paragraphs?: Json
          published_at?: string | null
          published_date?: string | null
          source?: string | null
          source_type: string
          url: string
        }
        Update: {
          canonical_url?: string | null
          created_at?: string
          deck?: string | null
          headline?: string
          id?: string
          import_status?: string
          links?: Json
          main_source_text?: string | null
          outlet?: string
          paragraphs?: Json
          published_at?: string | null
          published_date?: string | null
          source?: string | null
          source_type?: string
          url?: string
        }
        Relationships: []
      }
      check_usage: {
        Row: {
          count: number
          day: string
          visitor: string
        }
        Insert: {
          count?: number
          day: string
          visitor: string
        }
        Update: {
          count?: number
          day?: string
          visitor?: string
        }
        Relationships: []
      }
      feed_checks: {
        Row: {
          checked_at: string
          id: string
          message: string | null
          new_items: number
          ok: boolean
          source: string
        }
        Insert: {
          checked_at?: string
          id?: string
          message?: string | null
          new_items?: number
          ok: boolean
          source: string
        }
        Update: {
          checked_at?: string
          id?: string
          message?: string | null
          new_items?: number
          ok?: boolean
          source?: string
        }
        Relationships: []
      }
      ratings: {
        Row: {
          approved_at: string | null
          article_id: string
          checks: Json
          claim_type: string | null
          created_at: string
          gaps_level: string
          gaps_sections: Json
          headline_rule_applied: boolean
          hype_level: string
          hype_sections: Json
          id: string
          input_tokens: number | null
          model: string
          other_observations: Json
          output_tokens: number | null
          overrides: Json
          partly_checked: boolean
          quotes_verified: Json
          raw_answers: Json
          reason: string | null
          safety_rule_applied: boolean
          source_status: string
          status: string
          summary: string | null
          version: number
          writeup: Json | null
        }
        Insert: {
          approved_at?: string | null
          article_id: string
          checks: Json
          claim_type?: string | null
          created_at?: string
          gaps_level: string
          gaps_sections: Json
          headline_rule_applied?: boolean
          hype_level: string
          hype_sections: Json
          id?: string
          input_tokens?: number | null
          model: string
          other_observations?: Json
          output_tokens?: number | null
          overrides?: Json
          partly_checked?: boolean
          quotes_verified?: Json
          raw_answers: Json
          reason?: string | null
          safety_rule_applied?: boolean
          source_status: string
          status?: string
          summary?: string | null
          version: number
          writeup?: Json | null
        }
        Update: {
          approved_at?: string | null
          article_id?: string
          checks?: Json
          claim_type?: string | null
          created_at?: string
          gaps_level?: string
          gaps_sections?: Json
          headline_rule_applied?: boolean
          hype_level?: string
          hype_sections?: Json
          id?: string
          input_tokens?: number | null
          model?: string
          other_observations?: Json
          output_tokens?: number | null
          overrides?: Json
          partly_checked?: boolean
          quotes_verified?: Json
          raw_answers?: Json
          reason?: string | null
          safety_rule_applied?: boolean
          source_status?: string
          status?: string
          summary?: string | null
          version?: number
          writeup?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "ratings_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          daily_rating_cap: number
          decode_global_cap: number
          decode_visitor_cap: number
          id: number
        }
        Insert: {
          daily_rating_cap?: number
          decode_global_cap?: number
          decode_visitor_cap?: number
          id?: number
        }
        Update: {
          daily_rating_cap?: number
          decode_global_cap?: number
          decode_visitor_cap?: number
          id?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      claim_check: {
        Args: { _global_cap: number; _visitor: string; _visitor_cap: number }
        Returns: number
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      release_check: { Args: { _visitor: string }; Returns: undefined }
    }
    Enums: {
      app_role: "admin"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin"],
    },
  },
} as const
