class ApiFeatures {

    constructor(query, queryString) {

        this.query = query;
        this.queryString = queryString;

    }

    search() {

        if (this.queryString.keyword) {

            this.query = this.query.find({

                title: {
                    $regex: this.queryString.keyword,
                    $options: "i"
                }

            });

        }

        return this;

    }

    filter() {

        const queryCopy = { ...this.queryString };

        const removeFields = [
            "keyword",
            "page",
            "limit"
        ];

        removeFields.forEach(field => delete queryCopy[field]);

        this.query = this.query.find(queryCopy);

        return this;

    }

    pagination(resultPerPage = 10) {

        const currentPage = Number(this.queryString.page) || 1;

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;

    }

}

export default ApiFeatures;