import { router } from "../trpc";
import { authRouter } from "./auth";
import { profileRouter } from "./profile";

export const appRouter = router({
  profile: profileRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
