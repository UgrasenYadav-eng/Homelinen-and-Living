import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { isAuthenticated } from "@/lib/authentication";
import userModel from "@/models/userModel";

export async function GET(request) {
    try {
        const auth = await isAuthenticated('admin')
        if (!auth.isAuth) {
            return response(false, 403, 'Unauthorized.')
        }

        await connectDB()

        const filter = {
            deletedAt: null
        }

        const getcustomers = await userModel.find(filter).sort({ createdAt: -1 }).lean()

        if (!getcustomers) {
            return response(false, 404, 'Collection empty.')
        }

        return response(true, 200, 'Data found.', getcustomers)


    } catch (error) {
        return catchError(error)
    }
}