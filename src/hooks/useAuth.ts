// src/hooks/useAuth.ts
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // ✅ usa directamente los objetos exportados

export function useAuth() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState<string | null>(null);
  const [expired, setExpired] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);

      if (currentUser) {
        setUser(currentUser);

        const ref = doc(db, 'usuariosApp', currentUser.email || '');
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          setRole(data.rol || null);

          const ahora = new Date();
          const limite = new Date(data.valido_hasta?.seconds * 1000);
          setExpired(ahora > limite);
        } else {
          setRole(null);
          setExpired(null);
        }
      } else {
        setUser(null);
        setRole(null);
        setExpired(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, role, expired, loading };
}
