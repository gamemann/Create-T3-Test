import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const publicRouter = router({
  updateOrAddProfile: publicProcedure.input(z.object({
    name: z.string(),
    aboutme: z.string(),
    avatar: z.any()
  })).mutation(async ({ ctx, input}) => {
    console.log("Name => " + input.name);
    console.log("About Me => " + input.aboutme);
    console.log("Avatar => " + input.avatar);

    // Handle file.
    const avatar = input.avatar;

    console.log("TCRP File Upload");
    console.log(avatar);
    console.log(JSON.stringify(avatar));

    // Upload it as a new file name.
    const fileName = 'images/' + avatar.name;
    
    return ctx.prisma.profile.upsert({
      where: {
        id: 1
      },
      update: {
        name: input.name,
        aboutme: input.aboutme,
        avatar: fileName
      },
      create: {
        name: input.name,
        aboutme: input.aboutme,
        avatar: fileName
      }
    })
  }),
  getProfile: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.profile.findFirst({ where: {
      id: 1
    }})
  })
});
