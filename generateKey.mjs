import * as openpgp from 'openpgp';
import fs from 'fs';
import path from 'path';
import readline from 'readline';

// Fungsi untuk meminta input dari pengguna
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function generateKeyPair(name, email, passphrase) {
    const { privateKey, publicKey } = await openpgp.generateKey({
      type: 'rsa', // atau 'ecc'
      rsaBits: 4096, // untuk kunci RSA
      userIDs: [{ name, email }], // Informasi pengguna
      passphrase // Kata sandi untuk kunci privat
    });
  
    return { privateKey, publicKey };
}

(async () => {
  try {
      // Meminta input dari pengguna
      const name = await askQuestion('Enter your name: ');
      const email = await askQuestion('Enter your email: ');
      const passphrase = await askQuestion('Enter a passphrase: ');

      // Menutup interface readline
      rl.close();

      // Menghasilkan pasangan kunci
      const { privateKey, publicKey } = await generateKeyPair(name, email, passphrase);

      // Buat folder secure_keys jika belum ada
      const dirPath = path.resolve('./secure_keys');
      if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath, { recursive: true });
      }

      // Simpan kunci privat ke file private.key
      fs.writeFileSync(path.join(dirPath, 'private.key'), privateKey, 'utf8');
      console.log('Kunci privat telah disimpan di ./secure_keys/private.key');

      // Simpan kunci publik ke file public.key
      fs.writeFileSync(path.join(dirPath, 'public.key'), publicKey, 'utf8');
      console.log('Kunci publik telah disimpan di ./secure_keys/public.key');
  } catch (error) {
      console.error('Terjadi kesalahan saat menghasilkan kunci:', error);
  }
})();
