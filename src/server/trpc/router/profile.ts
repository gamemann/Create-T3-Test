import { prisma } from "@prisma/client";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const profileRouter = router({
  updateOrAddProfile: publicProcedure.input(z.object({
    name: z.string(),
    aboutme: z.string(),
    avatarName: z.string().nullable(),
    avatarData: z.string().nullable()
  })).mutation(async ({ ctx, input}) => {
    // Handle file.
    const avatarName = (input.avatarName != null) ? input.avatarName : null;
    const avatarData = (input.avatarData != null) ? input.avatarData : null;

    // Upload it as a new file name.
    const fileName = "images/" + avatarName;

    // Store avatar.
    if (avatarData != null) {
      let avatar_model = await ctx.prisma.avatar.upsert({
        where: {
          uid: 1
        },
        update: {
          name: fileName,
          data: avatarData
        },
        create: {
          uid: 1,
          name: fileName,
          data: avatarData
        }
      })

      console.log("Avatar Model =>")
      console.log(avatar_model)
    }
    
    return ctx.prisma.profile.upsert({
      where: {
        id: 1
      },
      update: {
        name: input.name,
        aboutme: input.aboutme
      },
      create: {
        name: input.name,
        aboutme: input.aboutme
      }
    })
  }),
  getProfile: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.profile.findFirst({ where: {
      id: 1
    }})
  })
});
