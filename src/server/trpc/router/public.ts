import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const publicRouter = router({
  updateOrAddProfile: publicProcedure.input(z.object({
    name: z.string(),
    aboutme: z.string(),
    avatar: z.string()
  })).mutation(async ({ ctx, input}) => {
    console.log("Name => " + input.name);
    console.log("About Me => " + input.aboutme);
    console.log("Avatar => " + input.avatar);

    return ctx.prisma.profile.upsert({
      where: {
        id: 1
      },
      update: {
        name: input.name,
        aboutme: input.aboutme,
        avatar: input.avatar
      },
      create: {
        name: input.name,
        aboutme: input.aboutme,
        avatar: input.avatar
      }
    })
  }),
  getProfile: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.profile.findFirst({ where: {
      id: 1
    }})
  })
});
