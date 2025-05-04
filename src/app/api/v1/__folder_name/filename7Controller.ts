import _3_template_ from './filename7Model';
import connectDB from '@/lib/mongoose';
import { IResponse } from '@/app/api/v1/template6/utils';

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

// CREATE _3_template_
export async function create_3_template_(req: Request): Promise<IResponse> {
  return withDB(async () => {
    try {
      const _4_template_Data = await req.json();
      const new_3_template_ = await _3_template_.create({ ..._4_template_Data });
      return formatResponse(new_3_template_, '_3_template_ created successfully', 201);
    } catch (error: unknown) {
      if ((error as { code?: number }).code === 11000) {
        const err = error as { keyValue?: Record<string, unknown> };
        return formatResponse(null, `Duplicate key error: ${JSON.stringify(err.keyValue)}`, 400);
      }
      throw error; // Re-throw other errors to be handled by `withDB`
    }
  });
}

// GET single _3_template_ by ID
export async function get_3_template_ById(req: Request) {
  return withDB(async () => {
    const id = new URL(req.url).searchParams.get('id');
    if (!id) return formatResponse(null, '_3_template_ ID is required', 400);

    const _4_template_ = await _3_template_.findById(id);
    if (!_4_template_) return formatResponse(null, '_3_template_ not found', 404);

    return formatResponse(_4_template_, '_3_template_ fetched successfully', 200);
  });
}

// GET all _1_template_ with pagination
export async function get_1_template_(req: Request) {
  return withDB(async () => {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    const _2_template_ = await _3_template_.find({}).sort({ updatedAt: -1, createdAt: -1 }).skip(skip).limit(limit);
    const total_1_template_ = await _3_template_.countDocuments();
    return formatResponse({ _2_template_: _2_template_ || [], total: total_1_template_, page, limit }, '_1_template_ fetched successfully', 200);
  });
}

// UPDATE single _3_template_ by ID

export async function update_3_template_(req: Request) {
  return withDB(async () => {
    try {
      const { id, ...updateData } = await req.json();
      const updated_3_template_ = await _3_template_.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

      if (!updated_3_template_) return formatResponse(null, '_3_template_ not found', 404);
      return formatResponse(updated_3_template_, '_3_template_ updated successfully', 200);
    } catch (error: unknown) {
      if ((error as { code?: number }).code === 11000) {
        const err = error as { keyValue?: Record<string, unknown> };
        return formatResponse(null, `Duplicate key error: ${JSON.stringify(err.keyValue)}`, 400);
      }
      throw error; // Re-throw other errors to be handled by `withDB`
    }
  });
}

// BULK UPDATE _1_template_
export async function bulkUpdate_1_template_(req: Request) {
  return withDB(async () => {
    const updates = await req.json();
    const results = await Promise.allSettled(
      updates.map(({ id, updateData }: { id: string; updateData: Record<string, unknown> }) =>
        _3_template_.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }),
      ),
    );

    const successfulUpdates = results.filter(r => r.status === 'fulfilled' && r.value).map(r => (r as PromiseFulfilledResult<typeof _3_template_>).value);
    const failedUpdates = results.filter(r => r.status === 'rejected' || !r.value).map((_, i) => updates[i].id);

    return formatResponse({ updated: successfulUpdates, failed: failedUpdates }, 'Bulk update completed', 200);
  });
}

// DELETE single _3_template_ by ID
export async function delete_3_template_(req: Request) {
  return withDB(async () => {
    const { id } = await req.json();
    const deleted_3_template_ = await _3_template_.findByIdAndDelete(id);
    if (!deleted_3_template_) return formatResponse(deleted_3_template_, '_3_template_ not found', 404);
    return formatResponse({ deletedCount: 1 }, '_3_template_ deleted successfully', 200);
  });
}

// BULK DELETE _1_template_
export async function bulkDelete_1_template_(req: Request) {
  return withDB(async () => {
    const { ids } = await req.json();
    const deletedIds: string[] = [];
    const invalidIds: string[] = [];

    for (const id of ids) {
      try {
        const _4_template_ = await _3_template_.findById(id);
        if (_4_template_) {
          const deleted_3_template_ = await _3_template_.findByIdAndDelete(id);
          if (deleted_3_template_) deletedIds.push(id);
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
