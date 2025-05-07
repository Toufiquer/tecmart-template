import connectDB from '@/lib/mongoose';

import User_103__ from './Model';
import { IResponse } from './utils';

// Helper to handle database connection and errors
async function withDB(handler: () => Promise<IResponse>): Promise<IResponse> {
  try {
    await connectDB();
    return await handler();
  } catch (error) {
    console.error(error);
    return { data: null, message: (error as Error).message, status: 400 };
  }
}

// Helper to format responses
const formatResponse = (data: unknown, message: string, status: number) => ({ data, message, status });

// CREATE User_103__
export async function createUser_103__(req: Request): Promise<IResponse> {
  return withDB(async () => {
    try {
      const user_104__Data = await req.json();
      const newUser_103__ = await User_103__.create({ ...user_104__Data });
      return formatResponse(newUser_103__, 'User_103__ created successfully', 201);
    } catch (error: unknown) {
      if ((error as { code?: number }).code === 11000) {
        const err = error as { keyValue?: Record<string, unknown> };
        return formatResponse(null, `Duplicate key error: ${JSON.stringify(err.keyValue)}`, 400);
      }
      throw error; // Re-throw other errors to be handled by `withDB`
    }
  });
}

// GET single User_103__ by ID
export async function getUser_103__ById(req: Request) {
  return withDB(async () => {
    const id = new URL(req.url).searchParams.get('id');
    if (!id) return formatResponse(null, 'User_103__ ID is required', 400);

    const user_104__ = await User_103__.findById(id);
    if (!user_104__) return formatResponse(null, 'User_103__ not found', 404);

    return formatResponse(user_104__, 'User_103__ fetched successfully', 200);
  });
}

// GET all Users_101__ with pagination
export async function getUsers_101__(req: Request) {
  return withDB(async () => {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    const searchQuery = url.searchParams.get('q');

    let searchFilter = {};

    // Apply search filter only if search query is provided
    if (searchQuery) {
      searchFilter = {
        $or: [
          { name: { $regex: searchQuery, $options: 'i' } },
          { email: { $regex: searchQuery, $options: 'i' } },
          { alias: { $regex: searchQuery, $options: 'i' } },
        ],
      };
    }

    const users_102__ = await User_103__.find(searchFilter).sort({ updatedAt: -1, createdAt: -1 }).skip(skip).limit(limit);

    const totalUsers_101__ = await User_103__.countDocuments(searchFilter);

    return formatResponse({ users_102__: users_102__ || [], total: totalUsers_101__, page, limit }, 'Users_101__ fetched successfully', 200);
  });
}

// UPDATE single User_103__ by ID

export async function updateUser_103__(req: Request) {
  return withDB(async () => {
    try {
      const { id, ...updateData } = await req.json();
      const updatedUser_103__ = await User_103__.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

      if (!updatedUser_103__) return formatResponse(null, 'User_103__ not found', 404);
      return formatResponse(updatedUser_103__, 'User_103__ updated successfully', 200);
    } catch (error: unknown) {
      if ((error as { code?: number }).code === 11000) {
        const err = error as { keyValue?: Record<string, unknown> };
        return formatResponse(null, `Duplicate key error: ${JSON.stringify(err.keyValue)}`, 400);
      }
      throw error; // Re-throw other errors to be handled by `withDB`
    }
  });
}

// BULK UPDATE Users_101__
export async function bulkUpdateUsers_101__(req: Request) {
  return withDB(async () => {
    const updates = await req.json();
    const results = await Promise.allSettled(
      updates.map(({ id, updateData }: { id: string; updateData: Record<string, unknown> }) =>
        User_103__.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }),
      ),
    );

    const successfulUpdates = results.filter(r => r.status === 'fulfilled' && r.value).map(r => (r as PromiseFulfilledResult<typeof User_103__>).value);
    const failedUpdates = results.filter(r => r.status === 'rejected' || !r.value).map((_, i) => updates[i].id);

    return formatResponse({ updated: successfulUpdates, failed: failedUpdates }, 'Bulk update completed', 200);
  });
}

// DELETE single User_103__ by ID
export async function deleteUser_103__(req: Request) {
  return withDB(async () => {
    const { id } = await req.json();
    const deletedUser_103__ = await User_103__.findByIdAndDelete(id);
    if (!deletedUser_103__) return formatResponse(deletedUser_103__, 'User_103__ not found', 404);
    return formatResponse({ deletedCount: 1 }, 'User_103__ deleted successfully', 200);
  });
}

// BULK DELETE Users_101__
export async function bulkDeleteUsers_101__(req: Request) {
  return withDB(async () => {
    const { ids } = await req.json();
    const deletedIds: string[] = [];
    const invalidIds: string[] = [];

    for (const id of ids) {
      try {
        const user_104__ = await User_103__.findById(id);
        if (user_104__) {
          const deletedUser_103__ = await User_103__.findByIdAndDelete(id);
          if (deletedUser_103__) deletedIds.push(id);
        } else {
          invalidIds.push(id);
        }
      } catch {
        invalidIds.push(id);
      }
    }

    return formatResponse({ deleted: deletedIds.length, deletedIds, invalidIds }, 'Bulk delete operation completed', 200);
  });
}
