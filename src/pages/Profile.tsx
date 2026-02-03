import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import type { AppUser } from "../types/User";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";

function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<AppUser | null>(null);
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data() as AppUser;
        setProfile(data);
        setName(data.name ?? "");
        setAddress(data.address ?? "");
      }
    };

    fetchProfile();
  }, [user]);

  const handleUpdate = async () => {
    if (!user) return;

    await updateDoc(doc(db, "users", user.uid), {
      name,
      address,
    });

    alert("Profile updated");
  };

  if (!user) return <p>Please login</p>;
  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h2>Profile</h2>

      <p>
        <strong>Email:</strong> {profile.email}
      </p>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <button onClick={handleUpdate}>Save</button>
    </div>
  );
}

export default Profile;
