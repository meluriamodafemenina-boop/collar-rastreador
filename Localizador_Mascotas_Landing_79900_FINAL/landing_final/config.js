// CONFIGURACIÓN DE SUPABASE — clave pública solamente.
window.SUPABASE_URL = "https://girfmsczqxynfgrhhhxn.supabase.co";
window.SUPABASE_PUBLISHABLE_KEY = "sb_publishable_UHKo5A7lWNO8SqEuMimSgg_aS7cnfG-";
window.SUPABASE_TABLE = "pedidos_collares";

window.supabaseClient = window.supabase.createClient(
  window.SUPABASE_URL,
  window.SUPABASE_PUBLISHABLE_KEY
);
