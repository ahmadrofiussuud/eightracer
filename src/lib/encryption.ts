import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12; // Standard 96-bit IV for AES-GCM
const AUTH_TAG_LENGTH = 16; // 128-bit authentication tag

// Retrieve encryption key from environment, or use deterministic fallback for development
function getEncryptionKey(): Buffer {
  const envKey = process.env.DATA_ENCRYPTION_KEY;
  if (envKey && envKey.length >= 32) {
    // If provided as 64-character hex string
    if (envKey.length === 64 && /^[0-9a-fA-F]+$/.test(envKey)) {
      return Buffer.from(envKey, "hex");
    }
    // Otherwise derive 32 bytes via SHA-256
    return crypto.createHash("sha256").update(envKey).digest();
  }

  // Development fallback key (strictly for dev mode if DATA_ENCRYPTION_KEY is not set)
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "[Security Alert] DATA_ENCRYPTION_KEY must be defined in production environment variables (32 bytes / 64 hex characters)."
    );
  }

  return crypto
    .createHash("sha256")
    .update("eightracer-highschool-dev-encryption-seed-key-2026")
    .digest();
}

/**
 * Encrypt sensitive plaintext (e.g., WhatsApp/phone numbers) at rest using AES-256-GCM.
 * Output format: base64(iv:authTag:ciphertext)
 */
export function encryptSensitiveField(plaintext: string): string {
  if (!plaintext || typeof plaintext !== "string") {
    return plaintext;
  }

  try {
    const key = getEncryptionKey();
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

    let encrypted = cipher.update(plaintext, "utf8", "hex");
    encrypted += cipher.final("hex");

    const authTag = cipher.getAuthTag();

    // Pack into portable serialized string: "enc:v1:<iv>:<tag>:<ciphertext>"
    return `enc:v1:${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted}`;
  } catch (error) {
    console.error("[Encryption Error] Failed to encrypt sensitive data:", error);
    throw new Error("Encryption process failed.");
  }
}

/**
 * Decrypt ciphertext back to plaintext.
 * Safely handles unencrypted plaintext fallback if migrating legacy records.
 */
export function decryptSensitiveField(cipherString: string): string {
  if (!cipherString || typeof cipherString !== "string") {
    return cipherString;
  }

  // If not formatted as our encrypted format, it's either plaintext or legacy
  if (!cipherString.startsWith("enc:v1:")) {
    return cipherString;
  }

  try {
    const parts = cipherString.split(":");
    if (parts.length !== 5) {
      throw new Error("Invalid encrypted payload format.");
    }

    const [, , ivHex, tagHex, encryptedHex] = parts;
    const key = getEncryptionKey();
    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(tagHex, "hex");

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedHex, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (error) {
    console.error("[Decryption Error] Failed to decrypt data or invalid key/tag:", error);
    return "[DECRYPTION_FAILED]";
  }
}

/**
 * Mask sensitive phone number for display (e.g., +62 812-****-2345)
 */
export function maskPhoneNumber(phone: string): string {
  const decrypted = decryptSensitiveField(phone);
  if (!decrypted || decrypted.length < 8) return decrypted;
  const start = decrypted.slice(0, 6);
  const end = decrypted.slice(-4);
  return `${start}****${end}`;
}
