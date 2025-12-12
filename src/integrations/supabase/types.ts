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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      energy_metrics: {
        Row: {
          active_tasks: number | null
          battery_level: number
          cpu_frequency: number
          created_at: string | null
          device_temperature: number
          id: string
          power_consumption: number
          simulation_run_id: string | null
          timestamp: number
          voltage: number
        }
        Insert: {
          active_tasks?: number | null
          battery_level: number
          cpu_frequency: number
          created_at?: string | null
          device_temperature: number
          id?: string
          power_consumption: number
          simulation_run_id?: string | null
          timestamp: number
          voltage: number
        }
        Update: {
          active_tasks?: number | null
          battery_level?: number
          cpu_frequency?: number
          created_at?: string | null
          device_temperature?: number
          id?: string
          power_consumption?: number
          simulation_run_id?: string | null
          timestamp?: number
          voltage?: number
        }
        Relationships: [
          {
            foreignKeyName: "energy_metrics_simulation_run_id_fkey"
            columns: ["simulation_run_id"]
            isOneToOne: false
            referencedRelation: "simulation_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      simulation_runs: {
        Row: {
          algorithm: Database["public"]["Enums"]["scheduling_algorithm"]
          avg_turnaround_time: number | null
          avg_waiting_time: number | null
          battery_level_end: number | null
          battery_level_start: number | null
          cpu_utilization: number | null
          created_at: string | null
          device_temp_end: number | null
          device_temp_start: number | null
          id: string
          power_savings_percent: number | null
          total_energy_consumed: number | null
          total_tasks: number
          user_id: string | null
        }
        Insert: {
          algorithm: Database["public"]["Enums"]["scheduling_algorithm"]
          avg_turnaround_time?: number | null
          avg_waiting_time?: number | null
          battery_level_end?: number | null
          battery_level_start?: number | null
          cpu_utilization?: number | null
          created_at?: string | null
          device_temp_end?: number | null
          device_temp_start?: number | null
          id?: string
          power_savings_percent?: number | null
          total_energy_consumed?: number | null
          total_tasks: number
          user_id?: string | null
        }
        Update: {
          algorithm?: Database["public"]["Enums"]["scheduling_algorithm"]
          avg_turnaround_time?: number | null
          avg_waiting_time?: number | null
          battery_level_end?: number | null
          battery_level_start?: number | null
          cpu_utilization?: number | null
          created_at?: string | null
          device_temp_end?: number | null
          device_temp_start?: number | null
          id?: string
          power_savings_percent?: number | null
          total_energy_consumed?: number | null
          total_tasks?: number
          user_id?: string | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          arrival_time: number
          burst_time: number
          cpu_frequency: number | null
          created_at: string | null
          deadline: number | null
          energy_consumed: number | null
          energy_weight: number | null
          finish_time: number | null
          id: string
          priority: number | null
          simulation_run_id: string | null
          start_time: number | null
          state: Database["public"]["Enums"]["task_state"] | null
          task_name: string
          thermal_impact: number | null
          turnaround_time: number | null
          waiting_time: number | null
        }
        Insert: {
          arrival_time?: number
          burst_time: number
          cpu_frequency?: number | null
          created_at?: string | null
          deadline?: number | null
          energy_consumed?: number | null
          energy_weight?: number | null
          finish_time?: number | null
          id?: string
          priority?: number | null
          simulation_run_id?: string | null
          start_time?: number | null
          state?: Database["public"]["Enums"]["task_state"] | null
          task_name: string
          thermal_impact?: number | null
          turnaround_time?: number | null
          waiting_time?: number | null
        }
        Update: {
          arrival_time?: number
          burst_time?: number
          cpu_frequency?: number | null
          created_at?: string | null
          deadline?: number | null
          energy_consumed?: number | null
          energy_weight?: number | null
          finish_time?: number | null
          id?: string
          priority?: number | null
          simulation_run_id?: string | null
          start_time?: number | null
          state?: Database["public"]["Enums"]["task_state"] | null
          task_name?: string
          thermal_impact?: number | null
          turnaround_time?: number | null
          waiting_time?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_simulation_run_id_fkey"
            columns: ["simulation_run_id"]
            isOneToOne: false
            referencedRelation: "simulation_runs"
            referencedColumns: ["id"]
          },
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
      scheduling_algorithm: "FCFS" | "SJF" | "RR" | "Priority" | "EA_SRTF"
      task_state: "waiting" | "running" | "completed" | "blocked"
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
  public: {
    Enums: {
      scheduling_algorithm: ["FCFS", "SJF", "RR", "Priority", "EA_SRTF"],
      task_state: ["waiting", "running", "completed", "blocked"],
    },
  },
} as const
