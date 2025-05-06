import connectDB from '@/lib/mongoose';

import { IResponse } from '@/app/api/v1/__1001_rtk_template__/utils';

import __3_template__ from './Model';

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

// CREATE __3_template__
export async function create__3_template__(req: Request): Promise<IResponse> {
  return withDB(async () => {
    try {
      const __4_template__Data = await req.json();
      const new__3_template__ = await __3_template__.create({ ...__4_template__Data });
      return formatResponse(new__3_template__, '__3_template__ created successfully', 201);
    } catch (error: unknown) {
      if ((error as { code?: number }).code === 11000) {
        const err = error as { keyValue?: Record<string, unknown> };
        return formatResponse(null, `Duplicate key error: ${JSON.stringify(err.keyValue)}`, 400);
      }
      throw error; // Re-throw other errors to be handled by `withDB`
    }
  });
}

// GET single __3_template__ by ID
export async function get__3_template__ById(req: Request) {
  return withDB(async () => {
    const id = new URL(req.url).searchParams.get('id');
    if (!id) return formatResponse(null, '__3_template__ ID is required', 400);

    const __4_template__ = await __3_template__.findById(id);
    if (!__4_template__) return formatResponse(null, '__3_template__ not found', 404);

    return formatResponse(__4_template__, '__3_template__ fetched successfully', 200);
  });
}

// GET all __1_template__ with pagination
export async function get__1_template__(req: Request) {
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

    const __2_template__ = await __3_template__.find(searchFilter).sort({ updatedAt: -1, createdAt: -1 }).skip(skip).limit(limit);

    const total__1_template__ = await __3_template__.countDocuments(searchFilter);

    return formatResponse({ __2_template__: __2_template__ || [], total: total__1_template__, page, limit }, '__1_template__ fetched successfully', 200);
  });
}

// UPDATE single __3_template__ by ID

export async function update__3_template__(req: Request) {
  return withDB(async () => {
    try {
      const { id, ...updateData } = await req.json();
      const updated__3_template__ = await __3_template__.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

      if (!updated__3_template__) return formatResponse(null, '__3_template__ not found', 404);
      return formatResponse(updated__3_template__, '__3_template__ updated successfully', 200);
    } catch (error: unknown) {
      if ((error as { code?: number }).code === 11000) {
        const err = error as { keyValue?: Record<string, unknown> };
        return formatResponse(null, `Duplicate key error: ${JSON.stringify(err.keyValue)}`, 400);
      }
      throw error; // Re-throw other errors to be handled by `withDB`
    }
  });
}

// BULK UPDATE __1_template__
export async function bulkUpdate__1_template__(req: Request) {
  return withDB(async () => {
    const updates = await req.json();
    const results = await Promise.allSettled(
      updates.map(({ id, updateData }: { id: string; updateData: Record<string, unknown> }) =>
        __3_template__.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }),
      ),
    );

    const successfulUpdates = results.filter(r => r.status === 'fulfilled' && r.value).map(r => (r as PromiseFulfilledResult<typeof __3_template__>).value);
    const failedUpdates = results.filter(r => r.status === 'rejected' || !r.value).map((_, i) => updates[i].id);

    return formatResponse({ updated: successfulUpdates, failed: failedUpdates }, 'Bulk update completed', 200);
  });
}

// DELETE single __3_template__ by ID
export async function delete__3_template__(req: Request) {
  return withDB(async () => {
    const { id } = await req.json();
    const deleted__3_template__ = await __3_template__.findByIdAndDelete(id);
    if (!deleted__3_template__) return formatResponse(deleted__3_template__, '__3_template__ not found', 404);
    return formatResponse({ deletedCount: 1 }, '__3_template__ deleted successfully', 200);
  });
}

// BULK DELETE __1_template__
export async function bulkDelete__1_template__(req: Request) {
  return withDB(async () => {
    const { ids } = await req.json();
    const deletedIds: string[] = [];
    const invalidIds: string[] = [];

    for (const id of ids) {
      try {
        const __4_template__ = await __3_template__.findById(id);
        if (__4_template__) {
          const deleted__3_template__ = await __3_template__.findByIdAndDelete(id);
          if (deleted__3_template__) deletedIds.push(id);
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
