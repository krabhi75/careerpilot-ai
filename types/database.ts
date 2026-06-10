export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: "job_seeker" | "recruiter" | "admin"
          title: string | null
          location: string | null
          profile_score: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: "job_seeker" | "recruiter" | "admin"
          title?: string | null
          location?: string | null
          profile_score?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: "job_seeker" | "recruiter" | "admin"
          title?: string | null
          location?: string | null
          profile_score?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      jobs: {
        Row: {
          id: string
          title: string
          company: string
          location: string
          type: "full_time" | "part_time" | "contract" | "remote"
          salary: string | null
          description: string | null
          posted_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          company: string
          location: string
          type: "full_time" | "part_time" | "contract" | "remote"
          salary?: string | null
          description?: string | null
          posted_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          company?: string
          location?: string
          type?: "full_time" | "part_time" | "contract" | "remote"
          salary?: string | null
          description?: string | null
          posted_by?: string | null
          created_at?: string
        }
        Relationships: []
      }
      applications: {
        Row: {
          id: string
          user_id: string
          job_id: string
          status:
            | "saved"
            | "applied"
            | "reviewing"
            | "interviewing"
            | "offered"
            | "rejected"
          match_score: number
          applied_at: string
        }
        Insert: {
          id?: string
          user_id: string
          job_id: string
          status?:
            | "saved"
            | "applied"
            | "reviewing"
            | "interviewing"
            | "offered"
            | "rejected"
          match_score?: number
          applied_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          job_id?: string
          status?:
            | "saved"
            | "applied"
            | "reviewing"
            | "interviewing"
            | "offered"
            | "rejected"
          match_score?: number
          applied_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
