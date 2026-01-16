import * as crypto from 'crypto';

/**
 * Fingerprint utility for deterministic paper identification
 * Uses SHA-256 hash of normalized text
 */

/**
 * Generate a deterministic fingerprint from normalized OCR text
 * @param normalizedText - Already normalized OCR text
 * @returns SHA-256 hash as hex string
 */
export const generateFingerprint = (normalizedText: string): string => {
    // Additional normalization for fingerprinting
    let fingerprintInput = normalizedText;

    // Remove all whitespace (spaces, tabs, newlines)
    fingerprintInput = fingerprintInput.replace(/\s+/g, '');

    // Already lowercase from normalization
    // Already has page numbers removed from normalization

    // Generate SHA-256 hash
    const hash = crypto.createHash('sha256');
    hash.update(fingerprintInput);

    return hash.digest('hex');
};
