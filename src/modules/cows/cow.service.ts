import { SortOrder } from "mongoose";
import { searchFields } from "./cow.constants";
import { ICow } from "./cow.interface";
import { Cow } from "./cow.model";
import { ICowFilterOptions, ICowPaginationOptions } from "./cow.query";
import cowPaginationHelper from "./cow.utils";

export const cowSignUp = async (payload: ICow): Promise<ICow> => {
    const result = await Cow.create(payload);
    return result;
};
export const getAllCows = async (paginationOptions: ICowPaginationOptions, filterOptions: ICowFilterOptions): Promise<{ data: ICow[], meta: { page: number, limit: number, count: number; }; }> => {

    const { query, ...allFilterOptions } = filterOptions;
    const conditions = [];
    if (query) {
        conditions.push({
            $or: searchFields.map(item => ({
                [item]: {
                    $regex: query,
                    $options: 'i'
                }
            }))
        });
    }

    if (Object.keys(allFilterOptions).length) {
        conditions.push({
            $and: Object.entries(allFilterOptions).map(([field, value]) => {
                if (field == 'minPrice') {

                    return { price: { $gte: value } };
                } else if (field == 'maxPrice') {
                    return { price: { $lte: value } };
                } else {
                    return { [field]: value };
                }
            })
        });
    }
    const { limit, page, skip, sortBy, sortOrder } = cowPaginationHelper(paginationOptions);
    const sortOption: { [key: string]: SortOrder; } = {};
    sortOption[sortBy] = sortOrder;
    const result = await Cow.find(conditions.length ? { $and: conditions } : {}).sort(sortOption).skip(skip).limit(Number(limit));


    const count = await Cow.find(conditions.length ? { $and: conditions } : {});

    return {
        meta: {
            page: Number(page),
            limit: Number(limit),
            count: count.length
        },
        data: result
    };
};

export const getSingleCow = async (id: string): Promise<ICow | null> => {
    const result = await Cow.findById(id);
    return result;
};

export const deleteCow = async (id: string) => {
    const result = await Cow.findByIdAndDelete(id);
    return result;
};

export const updateCow = async (id: string, body: Partial<ICow>): Promise<ICow | null> => {
    const result = await Cow.findByIdAndUpdate(id, body, { new: true });
    return result;
};