import * as fs from 'fs';
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const profileRouter = router({
  updateOrAddProfile: publicProcedure.input(z.object({
    name: z.string(),
    aboutme: z.string(),
    avatar: z.string(),
    avatarRaw: z.string()
  })).mutation(async ({ ctx, input}) => {
    // Handle file.
    const avatar = input.avatar;
    const avatarRaw = input.avatarRaw;

    // Upload it as a new file name.
    const fileName = "images/" + avatar;
    const full_file_path = process.env.UPLOADS_DIR + fileName;

    try {
      fs.writeFileSync(full_file_path, avatarRaw);
    } catch (err) {
      console.error(err);
    }
    
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
