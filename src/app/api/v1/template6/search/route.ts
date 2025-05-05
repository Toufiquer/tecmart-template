import _3_template_ from '../filename7Model';
import connectDB from '@/lib/mongoose';
import { formatResponse, handleRateLimit } from '../utils';

// Search functionality
export async function GET(req: Request) {
  const rateLimitResponse = handleRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  try {
    await connectDB();

    const url = new URL(req.url);
    const searchQuery = url.searchParams.get('q');
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    if (!searchQuery) {
      return formatResponse({ _2_template_: [], total: 0, page, limit }, 'No search query provided', 200);
    }

    // Create a search filter for multiple fields
    const searchFilter = {
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },
        { email: { $regex: searchQuery, $options: 'i' } },
        { alias: { $regex: searchQuery, $options: 'i' } },
      ],
    };

    // Perform the search
    const _2_template_ = await _3_template_.find(searchFilter).sort({ updatedAt: -1, createdAt: -1 }).skip(skip).limit(limit);

    // Get total count for pagination
    const total_1_template_ = await _3_template_.countDocuments(searchFilter);

    return formatResponse({ _2_template_, total: total_1_template_, page, limit }, 'Search results fetched successfully', 200);
  } catch (error) {
    console.error('Search error:', error);
    return formatResponse(null, `Search error: ${(error as Error).message}`, 400);
  }
}
