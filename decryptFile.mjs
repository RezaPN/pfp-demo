import fsp from "fs/promises";
import * as openpgp from "openpgp";
import readline from "readline";

// Fungsi untuk meminta input dari pengguna
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function decryptFile() {
  try {
    // Meminta passphrase dari pengguna
    const passphrase = await askQuestion('Enter the passphrase: ');

    // Menutup interface readline
    rl.close();

    // Membaca kunci privat dari file
    const privateKeyArmored = await fsp.readFile("./secure_keys/private.key", "utf8");

    // Membaca data terenkripsi dari file sebagai string ASCII-armored
    const encryptedData = await fsp.readFile("./file/username_encrypted.csv.asc", "utf8");

    console.log(encryptedData)

    // Mendekripsi kunci privat menggunakan passphrase
    const privateKey = await openpgp.decryptKey({
      privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
      passphrase: passphrase,
    });

    // Mendekripsi pesan
    const decrypted = await openpgp.decrypt({
      message: await openpgp.readMessage({ armoredMessage: encryptedData }),
      decryptionKeys: privateKey,
    });

    // Menyimpan data yang telah didekripsi ke file
    await fsp.writeFile("./file/username_decrypted.csv", decrypted.data);
    console.log("File decrypted successfully.");
  } catch (error) {
    console.error("Error decrypting file:", error);
  }
}

// Memanggil fungsi untuk mendekripsi file
decryptFile();
