import { db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';

export const saveUserProfile = async (userId, userData) => {
    try {
        await setDoc(doc(db, 'users', userId), {
            ...userData,
            createdAt: new Date(),
            lastLogin: new Date()
        })
    } catch (error) {
        console.error("Error saving user profile:", error);
        throw error;
    }
}