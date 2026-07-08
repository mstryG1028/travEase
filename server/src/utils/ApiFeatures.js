class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // ==========================
  // SEARCH
  // ==========================
  search() {
    const keyword = this.queryString.keyword?.trim();

    if (!keyword) return this;

    const filters = [
      {
        title: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        city: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        state: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        country: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        address: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        propertyType: {
          $regex: keyword,
          $options: "i",
        },
      },
    ];

    // Search by nearby price
    if (!isNaN(keyword)) {
      const price = Number(keyword);

      filters.push({
        currentPrice: {
          $gte: price - 500,
          $lte: price + 500,
        },
      });
    }

    this.query = this.query.find({
      $or: filters,
    });

    return this;
  }

  // ==========================
  // FILTER
  // ==========================
  filter() {
    const mongoFilter = {};

    // Property Type
    if (this.queryString.category && this.queryString.category !== "Trending") {
      mongoFilter.propertyType = this.queryString.category;
    }

    // City
    if (this.queryString.location?.trim()) {
      mongoFilter.city = {
        $regex: this.queryString.location.trim(),
        $options: "i",
      };
    }

    // Country
    if (this.queryString.country?.trim()) {
      mongoFilter.country = {
        $regex: this.queryString.country.trim(),
        $options: "i",
      };
    }

    // Price
    if (this.queryString.minPrice || this.queryString.maxPrice) {
      mongoFilter.currentPrice = {};

      if (this.queryString.minPrice) {
        mongoFilter.currentPrice.$gte = Number(this.queryString.minPrice);
      }

      if (this.queryString.maxPrice) {
        mongoFilter.currentPrice.$lte = Number(this.queryString.maxPrice);
      }
    }

    this.query = this.query.find(mongoFilter);

    return this;
  }

  // ==========================
  // SORT
  // ==========================
  sort() {
    const { sort, order } = this.queryString;

    if (!sort) {
      this.query = this.query.sort({
        createdAt: -1,
      });

      return this;
    }

    const sortObject = {};

    // Frontend sends "price"
    if (sort === "price") {
      sortObject.currentPrice = order === "asc" ? 1 : -1;
    } else {
      sortObject[sort] = order === "asc" ? 1 : -1;
    }

    this.query = this.query.sort(sortObject);

    return this;
  }

  // ==========================
  // PAGINATION
  // ==========================
  pagination(resultPerPage = 12) {
    const currentPage = Number(this.queryString.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.skip(skip).limit(resultPerPage);

    return this;
  }
}

export default ApiFeatures;
