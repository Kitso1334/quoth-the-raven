import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';
import prisma from '@/libs/prismadb';  // Make sure your Prisma client is properly set up.

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        // Only allow POST requests
        return res.status(405).end();
    }

    try {
        // Destructure the values from the request body
        const { name, email, username, password } = req.body;

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 12);

        // Store the user in the database
        const user = await prisma.user.create({
            data: {
              email,
              username,
              name,
              hashedPassword,
              emailVerified: null  // Set emailVerified to null for now
            }
          });
          
          
          
          

        // Return success response
        return res.status(200).json(user);

    } 
    catch (error) {
        console.error('Error during user registration:', error); // Log the exact error
        return res.status(400).end()
    }
    
}

    
