import { ICowPaginationOptions } from "./cow.query";

const cowPaginationHelper = (options: ICowPaginationOptions) => {
    const page = Number(options.page || 1);
    const limit = Number(options.limit || 10);
    const skip = (page - 1) * limit;
    const sortBy = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'desc';
    return { page, skip, limit, sortBy, sortOrder };
};

export default cowPaginationHelper;