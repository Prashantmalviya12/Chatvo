import { useAuthCallback } from "@/lib/hooks/useAuth";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useEffect, useRef } from "react";

export default function AuthSync() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { mutate } = useAuthCallback();
  const hasSynced = useRef(false);

  // const checkSignin = async () => {
  //   try {
  //     // console.log(
  //     //   "check domain",
  //     //   `${process.env.EXPO_PUBLIC_API_URL}/auth/callback`,
  //     // );
  //     const res = await axios.post(
  //       `${process.env.EXPO_PUBLIC_API_URL}/api/auth/callback`,
  //     );
  //     console.log("sign successfully:", res.data);
  //   } catch (error) {
  //     console.log("sigign in error:", error);
  //   }
  // };
  useEffect(() => {
    if (isSignedIn && user && !hasSynced.current) {
      hasSynced.current = true;
      // checkSignin();

      mutate(undefined, {
        onSuccess: (data: any) => {
          console.log("✅ User synced with backend:", data.data.name);
        },
        onError: (error) => {
          console.log("❌ User sync failed for the user:", error);
        },
      });
    }

    if (!isSignedIn) {
      hasSynced.current = false;
    }
  }, [isSignedIn, user, hasSynced]);
  return null;
}
