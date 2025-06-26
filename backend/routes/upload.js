const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const supabase = require('../supabase');
const Audio = require('../models/audio');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { userId, ayah } = req.body;

    // Vérifie que userId est bien fourni et au bon format
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'userId invalide ou manquant' });
    }

    // Vérifie que le fichier est bien fourni
    if (!req.file) {
      return res.status(400).json({ error: 'Fichier audio manquant' });
    }

    const { originalname, buffer, mimetype } = req.file;

    // Upload vers Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('audio-files')
      .upload(`uploads/${Date.now()}_${originalname}`, buffer, {
        contentType: mimetype,
        upsert: false,
      });

    if (uploadError) {
      console.error('Erreur Supabase upload:', uploadError);
      return res.status(500).json({ error: 'Échec de l\'upload Supabase', details: uploadError.message });
    }

    // Récupération de l’URL publique
    const { data: urlData, error: urlError } = supabase
      .storage
      .from('audio-files')
      .getPublicUrl(uploadData.path);

    if (urlError) {
      console.error('Erreur Supabase URL:', urlError);
      return res.status(500).json({ error: 'Échec de récupération de l\'URL publique' });
    }

    // Sauvegarde dans MongoDB
    const audioDoc = new Audio({
      userId,
      filename: originalname,
      publicUrl: urlData.publicUrl,
      ayah: ayah || null
    });

    await audioDoc.save();

    res.status(200).json({
      message: 'Upload réussi',
      url: urlData.publicUrl,
      audioId: audioDoc._id
    });

  } catch (err) {
    console.error('💥 Erreur interne serveur:', err);
    res.status(500).json({ error: 'Erreur serveur interne', details: err.message });
  }
});

module.exports = router;
