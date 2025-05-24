import { IResponse } from '@/app/api/utils/jwt-verify';

import User__1_103__ from './Model';
import { withDB } from '@/app/api/utils/db';
import { connectRedis, getRedisData } from '@/app/api/utils/redis';

// Helper to format responses
const formatResponse = (data: unknown, message: string, status: number) => ({ data, message, status });

// CREATE User__1_103__
export async function createUser__1_103__(req: Request): Promise<IResponse> {
  return withDB(async () => {
    try {
      const user__1_104__Data = await req.json();
      const newUser__1_103__ = await User__1_103__.create({ ...user__1_104__Data });
      return formatResponse(newUser__1_103__, 'User__1_103__ created successfully', 201);
    } catch (error: unknown) {
      if ((error as { code?: number }).code === 11000) {
        const err = error as { keyValue?: Record<string, unknown> };
        return formatResponse(null, `Duplicate key error: ${JSON.stringify(err.keyValue)}`, 400);
      }
      throw error; // Re-throw other errors to be handled by `withDB`
    }
  });
}

// GET single User__1_103__ by ID
export async function getUser__1_103__ById(req: Request) {
  return withDB(async () => {
    const id = new URL(req.url).searchParams.get('id');
    if (!id) return formatResponse(null, 'User__1_103__ ID is required', 400);

    const user__1_104__ = await User__1_103__.findById(id);
    if (!user__1_104__) return formatResponse(null, 'User__1_103__ not found', 404);

    return formatResponse(user__1_104__, 'User__1_103__ fetched successfully', 200);
  });
}

// GET all Users__1_101__ with pagination
export async function getUsers__1_101__(req: Request) {
  await connectRedis();
  const getValue = await getRedisData('myKey');
  if (getValue) {
    const { users__1_102__, totalUsers__1_101__, page, limit } = JSON.parse(getValue);
    return formatResponse({ users__1_102__: users__1_102__ || [], total: totalUsers__1_101__, page, limit }, 'Users__1_101__ fetched successfully', 200);
  } else {
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

      const users__1_102__ = await User__1_103__.find(searchFilter).sort({ updatedAt: -1, createdAt: -1 }).skip(skip).limit(limit);

      const totalUsers__1_101__ = await User__1_103__.countDocuments(searchFilter);

      return formatResponse({ users__1_102__: users__1_102__ || [], total: totalUsers__1_101__, page, limit }, 'Users__1_101__ fetched successfully', 200);
    });
  }
}

// UPDATE single User__1_103__ by ID

export async function updateUser__1_103__(req: Request) {
  return withDB(async () => {
    try {
      const { id, ...updateData } = await req.json();
      const updatedUser__1_103__ = await User__1_103__.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

      if (!updatedUser__1_103__) return formatResponse(null, 'User__1_103__ not found', 404);
      return formatResponse(updatedUser__1_103__, 'User__1_103__ updated successfully', 200);
    } catch (error: unknown) {
      if ((error as { code?: number }).code === 11000) {
        const err = error as { keyValue?: Record<string, unknown> };
        return formatResponse(null, `Duplicate key error: ${JSON.stringify(err.keyValue)}`, 400);
      }
      throw error; // Re-throw other errors to be handled by `withDB`
    }
  });
}

// BULK UPDATE Users__1_101__
export async function bulkUpdateUsers__1_101__(req: Request) {
  return withDB(async () => {
    const updates = await req.json();
    const results = await Promise.allSettled(
      updates.map(({ id, updateData }: { id: string; updateData: Record<string, unknown> }) =>
        User__1_103__.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }),
      ),
    );

    const successfulUpdates = results.filter(r => r.status === 'fulfilled' && r.value).map(r => (r as PromiseFulfilledResult<typeof User__1_103__>).value);
    const failedUpdates = results.filter(r => r.status === 'rejected' || !r.value).map((_, i) => updates[i].id);

    return formatResponse({ updated: successfulUpdates, failed: failedUpdates }, 'Bulk update completed', 200);
  });
}

// DELETE single User__1_103__ by ID
export async function deleteUser__1_103__(req: Request) {
  return withDB(async () => {
    const { id } = await req.json();
    const deletedUser__1_103__ = await User__1_103__.findByIdAndDelete(id);
    if (!deletedUser__1_103__) return formatResponse(deletedUser__1_103__, 'User__1_103__ not found', 404);
    return formatResponse({ deletedCount: 1 }, 'User__1_103__ deleted successfully', 200);
  });
}

// BULK DELETE Users__1_101__
export async function bulkDeleteUsers__1_101__(req: Request) {
  return withDB(async () => {
    const { ids } = await req.json();
    const deletedIds: string[] = [];
    const invalidIds: string[] = [];

    for (const id of ids) {
      try {
        const user__1_104__ = await User__1_103__.findById(id);
        if (user__1_104__) {
          const deletedUser__1_103__ = await User__1_103__.findByIdAndDelete(id);
          if (deletedUser__1_103__) deletedIds.push(id);
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
