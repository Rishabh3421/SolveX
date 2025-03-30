import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://muhhgqlevishkdieqpvc.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11aGhncWxldmlzaGtkaWVxcHZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNjc4ODUsImV4cCI6MjA1ODc0Mzg4NX0.50Tp3NtEeHA_rLZ4eB6pT2gL4qzsu4gcfuHqBeRTUL0'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
