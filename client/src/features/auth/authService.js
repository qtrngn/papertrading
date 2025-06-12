// client/src/features/auth/authService.js
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    updateProfile,
    signInWithPopup,
    GoogleAuthProvider,
    sendPasswordResetEmail,
  } from "firebase/auth";
  import { doc, setDoc } from "firebase/firestore";
  import { auth, db } from '../../firebase';
  
  // Configure Google provider with specific settings
  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });
  
  // Email/Password Login
  export const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };
  
  // Register with Email/Password
  export const register = async (
    email, 
    password, 
    displayName,
    phone = '',
    address = '',
    country = ''
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update user profile
      await updateProfile(userCredential.user, { displayName });
      
      // Save additional user data to Firestore
      const userDocRef = doc(db, "users", userCredential.user.uid);
      await setDoc(userDocRef, {
        uid: userCredential.user.uid,
        displayName,
        email,
        phone,
        address,
        country,
        createdAt: new Date(),
        lastLogin: new Date()
      });
      
      return userCredential;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };
  
  // Google Sign-In
  export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);

      
      // Save user data to Firestore if new user
      if (result.user && result._tokenResponse.isNewUser) {
        const userDocRef = doc(db, "users", result.user.uid);
        await setDoc(userDocRef, {
          uid: result.user.uid,
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          createdAt: new Date(),
          lastLogin: new Date()
        });
      }
      
      return result;
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  };
  
  // Password Reset
  export const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  };
  
  // Logout
  export const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };