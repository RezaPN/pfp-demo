import fs from "fs";
import fsp from "fs/promises";
import * as openpgp from "openpgp";

async function encryptFile() {
  try {
    // Membaca kunci publik dari file
    const publicKeyArmored = await fsp.readFile("./secure_keys/public.key", "utf8");
    const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });

    // Membaca data file ke dalam buffer
    const fileData = await fsp.readFile("./file/username.csv");

    // Membuat pesan dari data file
    const message = await openpgp.createMessage({ binary: fileData });

    // Mengenkripsi pesan
    const encrypted = await openpgp.encrypt({
      message,
      encryptionKeys: publicKey,
      format: "binary",
    });

    // Menyimpan file terenkripsi
    await fsp.writeFile("./file/username_encyrpted.csv.pgp", encrypted);
    console.log("File encrypted successfully.");
  } catch (error) {
    console.error("Error encrypting file:", error);
  }
}

// Memanggil fungsi untuk mengenkripsi file
encryptFile();
