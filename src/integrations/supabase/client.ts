// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://nzcfuusuxzdrqfaibgij.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56Y2Z1dXN1eHpkcnFmYWliZ2lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MDc3OTQsImV4cCI6MjA0NjI4Mzc5NH0.GRzXU60txPMLugE4bRDrc1yZbrL42ELGHjSRu-TgMq0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);