const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  filename: { type: String, required: true },
  publicUrl: { type: String, required: true },
  ayah: { type: String }, // optionnel
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Audio', audioSchema);
