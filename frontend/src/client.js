import { createClient } from '@supabase/supabase-js';

const URL = "https://dxcgeghvqnveigzmpwsa.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4Y2dlZ2h2cW52ZWlnem1wd3NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNjc3MDIsImV4cCI6MjA3ODY0MzcwMn0.XhOLWS2BZLRSMQUFw2bvoTKGoQ05g_cxIcAIW9nY62s";

const supabase = createClient(URL, API_KEY);

export default supabase













