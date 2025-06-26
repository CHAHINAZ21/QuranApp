const express = require('express');
const mongoose = require('mongoose');
const supabase = require('./supabase');
const cors = require('cors');
require('dotenv').config();
const os = require('os');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.log("❌ DB Error:", err));



async function testSupabaseConnection() {
  try {
    // On récupère la liste des buckets pour tester la connexion
    const { data, error } = await supabase.storage.listBuckets();
    if (error) {
      console.log("❌ Supabase Storage Error:", error.message);
    } else {
      console.log("✅ Connected to Supabase Storage. Buckets:", data.map(b => b.name));
    }
  } catch (err) {
    console.log("❌ Supabase Connection Error:", err.message);
  }
}

testSupabaseConnection();


app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/upload', require('./routes/upload'));


function getPreferredIp() {
  const interfaces = os.networkInterfaces();
  let wifiIp = null;
  let ethernetIp = null;

  for (const name in interfaces) {
    const lname = name.toLowerCase();

    for (const iface of interfaces[name]) {
      if (iface.family !== 'IPv4' || iface.internal) continue;

      // Priorité au Wi-Fi
      if (lname.includes('wi-fi') || lname.includes('wlan')) {
        wifiIp = iface.address;
      }

      // Ethernet réel avec IP en 10.x.x.x (évite les VMware et autres)
      else if (lname.includes('ethernet') && iface.address.startsWith('10.')) {
        ethernetIp = iface.address;
      }
    }
  }

  return wifiIp || ethernetIp || 'localhost';
}

const ip = getPreferredIp();
const port = 5000;

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://${ip}:${port}`);
});
