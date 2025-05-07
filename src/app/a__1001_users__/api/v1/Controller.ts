import __103_User__ from './Model';
import connectDB from '@/lib/mongoose';
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

// CREATE __103_User__
export async function create__103_User__(req: Request): Promise<IResponse> {
  return withDB(async () => {
    try {
      const __104_user__Data = await req.json();
      const new__103_User__ = await __103_User__.create({ ...__104_user__Data });
      return formatResponse(new__103_User__, '__103_User__ created successfully', 201);
    } catch (error: unknown) {
      if ((error as { code?: number }).code === 11000) {
        const err = error as { keyValue?: Record<string, unknown> };
        return formatResponse(null, `Duplicate key error: ${JSON.stringify(err.keyValue)}`, 400);
      }
      throw error; // Re-throw other errors to be handled by `withDB`
    }
  });
}

// GET single __103_User__ by ID
export async function get__103_User__ById(req: Request) {
  return withDB(async () => {
    const id = new URL(req.url).searchParams.get('id');
    if (!id) return formatResponse(null, '__103_User__ ID is required', 400);

    const __104_user__ = await __103_User__.findById(id);
    if (!__104_user__) return formatResponse(null, '__103_User__ not found', 404);

    return formatResponse(__104_user__, '__103_User__ fetched successfully', 200);
  });
}

// GET all __101_Users__ with pagination
export async function get__101_Users__(req: Request) {
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

    const __102_users__ = await __103_User__.find(searchFilter).sort({ updatedAt: -1, createdAt: -1 }).skip(skip).limit(limit);

    const total__101_Users__ = await __103_User__.countDocuments(searchFilter);

    return formatResponse({ __102_users__: __102_users__ || [], total: total__101_Users__, page, limit }, '__101_Users__ fetched successfully', 200);
  });
}

// UPDATE single __103_User__ by ID

export async function update__103_User__(req: Request) {
  return withDB(async () => {
    try {
      const { id, ...updateData } = await req.json();
      const updated__103_User__ = await __103_User__.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

      if (!updated__103_User__) return formatResponse(null, '__103_User__ not found', 404);
      return formatResponse(updated__103_User__, '__103_User__ updated successfully', 200);
    } catch (error: unknown) {
      if ((error as { code?: number }).code === 11000) {
        const err = error as { keyValue?: Record<string, unknown> };
        return formatResponse(null, `Duplicate key error: ${JSON.stringify(err.keyValue)}`, 400);
      }
      throw error; // Re-throw other errors to be handled by `withDB`
    }
  });
}

// BULK UPDATE __101_Users__
export async function bulkUpdate__101_Users__(req: Request) {
  return withDB(async () => {
    const updates = await req.json();
    const results = await Promise.allSettled(
      updates.map(({ id, updateData }: { id: string; updateData: Record<string, unknown> }) =>
        __103_User__.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }),
      ),
    );

    const successfulUpdates = results.filter(r => r.status === 'fulfilled' && r.value).map(r => (r as PromiseFulfilledResult<typeof __103_User__>).value);
    const failedUpdates = results.filter(r => r.status === 'rejected' || !r.value).map((_, i) => updates[i].id);

    return formatResponse({ updated: successfulUpdates, failed: failedUpdates }, 'Bulk update completed', 200);
  });
}

// DELETE single __103_User__ by ID
export async function delete__103_User__(req: Request) {
  return withDB(async () => {
    const { id } = await req.json();
    const deleted__103_User__ = await __103_User__.findByIdAndDelete(id);
    if (!deleted__103_User__) return formatResponse(deleted__103_User__, '__103_User__ not found', 404);
    return formatResponse({ deletedCount: 1 }, '__103_User__ deleted successfully', 200);
  });
}

// BULK DELETE __101_Users__
export async function bulkDelete__101_Users__(req: Request) {
  return withDB(async () => {
    const { ids } = await req.json();
    const deletedIds: string[] = [];
    const invalidIds: string[] = [];

    for (const id of ids) {
      try {
        const __104_user__ = await __103_User__.findById(id);
        if (__104_user__) {
          const deleted__103_User__ = await __103_User__.findByIdAndDelete(id);
          if (deleted__103_User__) deletedIds.push(id);
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
