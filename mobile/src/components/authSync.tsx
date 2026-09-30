import { useAuthCallback } from "@/lib/hooks/useAuth";
import { useAuth, useUser } from "@clerk/clerk-expo";
import React, { useEffect, useRef } from "react";

export default function AuthSync() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { mutate } = useAuthCallback();
  const hasSynced = useRef(false);

  useEffect(() => {
    if (isSignedIn && user && !hasSynced.current) {
      hasSynced.current = true;

      mutate(undefined, {
        onSuccess: (data:any) => {
          console.log("✅ User synced with backend:", data.name);
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
