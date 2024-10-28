import serverAuth from "@/libs/serverAuth";
import prisma from '@/libs/prismadb'; 

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).end(); // Allow only POST and DELETE
  }

  try {
    const userId = req.method === 'POST' ? req.body.userId : req.query.userId;
    const { currentUser } = await serverAuth(req, res);

    if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid ID');
    }

    // Check that the user being followed/unfollowed exists
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new Error('User to follow/unfollow not found');
    }

    // Initialize the current user's followed IDs and update based on request method
    let updatedFollowedIds = [...(currentUser.followedIds || [])];
    
    if (req.method === 'POST') {
      if (!updatedFollowedIds.includes(userId)) {
        updatedFollowedIds.push(userId); // Add only if not already in list
      }
    } else if (req.method === 'DELETE') {
      updatedFollowedIds = updatedFollowedIds.filter((followedId) => followedId !== userId); // Remove if present
    }

    // Update current user's followed IDs
    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: { followedIds: updatedFollowedIds }
    });

    return res.status(200).json(updatedUser);
    
  } catch (error) {
    console.error(error); // Log the exact error
    return res.status(400).json({ error: error.message });
  }
}
