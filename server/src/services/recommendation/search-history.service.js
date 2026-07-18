import { SearchHistory } from "../../models/index.js";

class SearchHistoryService {
  // ======================================
  // Save User Search
  // ======================================

  async saveSearch({ userId, question, filters }) {
    // Guest user
    // Do not store anonymous searches

    if (!userId) {
      return null;
    }

    try {
      const search = await SearchHistory.create({
        user: userId,

        question,

        filters,
      });

      return search;
    } catch (error) {
      console.error("SEARCH HISTORY SAVE ERROR", error);

      return null;
    }
  }

  // ======================================
  // Get User Search History
  // ======================================

  async getUserSearches(userId) {
    if (!userId) {
      return [];
    }

    try {
      const history = await SearchHistory.find({
        user: userId,
      })

        .sort({
          createdAt: -1,
        })

        .limit(20)

        .lean();

      return history;
    } catch (error) {
      console.error("SEARCH HISTORY FETCH ERROR", error);

      return [];
    }
  }

  // ======================================
  // Delete Old History
  // ======================================

  async clearHistory(userId) {
    if (!userId) {
      return;
    }

    return SearchHistory.deleteMany({
      user: userId,
    });
  }
}

export default new SearchHistoryService();
