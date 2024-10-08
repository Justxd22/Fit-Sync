import { NextApiRequest, NextApiResponse } from "next";
// import { getScheduleByUser, getUserCalendarByReq } from "@/app/models/User"; //For debugging
import { createUserSchedule } from "@/app/models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // // Used for Debugging, disabled for security
    // if (req.method === "GET") {
    //     const { err: err , schedule } = await getUserCalendarByReq(req);
    //     if (!schedule) {
    //         return res.status(400).json({ err: err });
    //     }

    //     return res.status(200).json(schedule);
    // }
    if (req.method === "POST") {
        const { err, upd } = await createUserSchedule(req);
        if (err || !upd) {
            return res.status(400).json({ err: err });
        }

        return res.status(200).json(upd);
    }
    else {
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
