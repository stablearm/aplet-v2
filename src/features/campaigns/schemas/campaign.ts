import { z } from "zod";

export const createCampaignSchema = z.object({
  name: z.string().min(1, "نام کمپین الزامی است"),
  channelUsername: z.string().optional(),
  publicLink: z.string().optional(),
  targetSubscriberCount: z
    .number()
    .min(1000, "حداقل ۱,۰۰۰ عضو")
    .max(100000, "حداکثر ۱۰۰,۰۰۰ عضو"),
}).refine(
  (data) => data.channelUsername || data.publicLink,
  {
    message: "نام کانال یا لینک عمومی را وارد کنید",
    path: ["channelUsername"],
  }
);

export type CreateCampaignForm = z.infer<typeof createCampaignSchema>;
