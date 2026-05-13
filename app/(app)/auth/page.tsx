"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

const AuthPage = () => {
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    const result = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `http://localhost:3000/auth/callback`,
      },
    });

    console.log(result);
  };

  const handleGithubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div>
      <Button onClick={handleGoogleLogin}>Signup with Google</Button>
      <Button onClick={handleGithubLogin}>Signup with Github</Button>
    </div>
  );
};

export default AuthPage;
