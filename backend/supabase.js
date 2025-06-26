// config/supabase.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://qejbmukojzowucnexvru.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlamJtdWtvanpvd3VjbmV4dnJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0OTQwNTEsImV4cCI6MjA2MzA3MDA1MX0.UIdxlXCoO3TrhgHCBG5ENKCA48ntameGjfsQMNvAwHk'
);

module.exports = supabase;
