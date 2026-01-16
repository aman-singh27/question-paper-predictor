import { db } from '../config/firebaseAdmin';

/**
 * Duplicate Checker Service
 * Checks if a paper fingerprint already exists in the global registry
 */

export interface DuplicateCheckResult {
    isDuplicate: boolean;
    paperId: string | null;
}

/**
 * Check if fingerprint exists in canonical registry
 * If duplicate: return existing paperId
 * If new: create registry entry and return null
 * 
 * @param fingerprint - SHA-256 hash of normalized text
 * @param newPaperId - Paper ID to register if new
 * @returns DuplicateCheckResult
 */
export const checkDuplicate = async (
    fingerprint: string,
    newPaperId: string
): Promise<DuplicateCheckResult> => {
    try {
        const canonicalRef = db.collection('canonicalPapers').doc(fingerprint);
        const canonicalDoc = await canonicalRef.get();

        if (canonicalDoc.exists) {
            // Duplicate detected - return existing paper ID
            const data = canonicalDoc.data();

            // Increment upload count
            await canonicalRef.update({
                uploadCount: (data?.uploadCount || 1) + 1,
                lastUploadedAt: new Date(),
            });

            return {
                isDuplicate: true,
                paperId: data?.paperId || null,
            };
        } else {
            // New paper - create registry entry
            await canonicalRef.set({
                paperId: newPaperId,
                createdAt: new Date(),
                uploadCount: 1,
                lastUploadedAt: new Date(),
            });

            return {
                isDuplicate: false,
                paperId: null,
            };
        }
    } catch (error) {
        throw new Error(
            `Duplicate check failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
};
