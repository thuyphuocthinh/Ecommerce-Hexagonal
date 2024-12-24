import { Request, Response } from "express";
import { I_categories, I_categories_condition_DTO_schema, I_categories_create_DTO_schema } from "../../model/model";
import { ICategoryUseCase } from "../../interface";
import { I_paging_DTO_schema } from "../../../../share/model/paging";

export class CateogryHttpService {
    constructor(private readonly useCase: ICategoryUseCase) {}

    async createANewCategoryAPI(req: Request, res: Response) {
        const {success, data, error} = I_categories_create_DTO_schema.safeParse(req.body);

        if(!success) {
            res.status(400).json({
                message: error.message
            });
            return;
        }

        const result = await this.useCase.createANewCategory(data);
        res.status(201).json({data: result});
    }

    async getDetailCategoryAPI(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const result = await this.useCase.detailCategory(id);
            res.status(200).json({data: result});
        } catch (error: any) {
            res.status(error.status).json({
                message: error.message
            })
        }
    }

    async updateCategoryApi(req: Request, res: Response) {
        const {id} = req.params;
        const { success, data, error} = I_categories_create_DTO_schema.safeParse(req.body);
        if (!success) {
            res.status(400).json({
                message: error.message
            });
            return;
        }
        const result = await this.useCase.updateCategory(id, data);
        res.status(result? 200 : 400).json({data: result});
    }

    async deleteCategoryApi(req: Request, res: Response) {
        const {id} = req.params;
        const result = await this.useCase.deleteCategory(id);
        res.status(200).json({data: result});
    }

    async listCategoriesApi(req: Request, res: Response) {
        const{ success, error, data : paging } = I_paging_DTO_schema.safeParse(req.query);
        if(!success) {
            res.status(400).json({
                message: error.message
            });
            return;
        }

        /**
         * standard API format
         * {
         *      status: 200,
         *      data: [],
         *      message: "success",
         *      metadata: {
         *          paging: {},
         *          filter: {}
         *  }
         */

        const condition = I_categories_condition_DTO_schema.parse(req.query);
        const result = await this.useCase.listCategories(condition, paging);
        const categoriesTree = this.buildTree(result);
        res.status(200).json({data: categoriesTree, paging: paging, filter: condition});
    }

    // build tree 1 iteratively
    private buildTree(categories: I_categories[]): I_categories[] {
        const categoriesTree: I_categories[] = [];
        // Loop through each category in the categories
        // For each category => check if has parentId or not
        // YES => push the category to the parent category's children list
        // NO => ignore the category
        // Why map => key is unique
        const mapChildren = new Map<string, I_categories[]>();
        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            // initialize the category's children list in the Map
            if(!mapChildren.get(category.id)) {
                mapChildren.set(category.id, []);
            }

            // set the category's children list
            category.children = mapChildren.get(category.id);

            if(!category.parent_id) {
                // a category does not have a parent means that it is the root category in the categoriesTree
                categoriesTree.push(category);
            } else {
                // a category has a parent, so push it to the parent's children list
                const children = mapChildren.get(category.parent_id);
                children ? children.push(category) : mapChildren.set(category.parent_id, [category]);
                categoriesTree[i].children = children;
            }
        }
        return categoriesTree;
    }

    // build tree 2 iteratively
    private buildTree2(categories: I_categories[]): I_categories[] {
        const categoriesTree: I_categories[] = [];
        for (const category of categories) {
            if (!category.parent_id) {
                categoriesTree.push(category);
            } else {
                const parentCategory = categoriesTree.find(c => c.id === category.parent_id);
                if (parentCategory) {
                    parentCategory.children = parentCategory.children || [];
                    parentCategory.children.push(category);
                }
            }
        }
        return categoriesTree;
    }
}

// input
/*
    ["Smart device", "Laptop", "Acer", "Smartphone", "Iphone", "Accessory","Mouse", "Dell"]
*/

/**
=> categoriesTree = ["Smart device", "Accessory"]
=> using Map
=> using recursion to render the tree in the frontend
*/

// output
// Smart device => Laptop => Acer
// Smart device => Smartphone => Iphone
// Accessory => Mouse => Dell
/*
    [
        {
            id: "smart device",
            name: "Smart device",
            children: [
                {
                    id: "Laptop",
                    name: "Laptop",
                    children: [
                        {
                            "id": "Acer",
                            "name": "Acer",
                            children: []
                        }
                    ]
                },
                {
                    id: "Smartphone",
                    name: "Smartphone",
                    children: [
                        {
                            "id": "Iphone",
                            "name": "Iphone",
                            children: []
                        }
                    ]
                }
            ]
        },
        {
            id: "accessory",
            name: "accessory",
            children: [
                {
                    id: "Mouse",
                    name: "mouse",
                    children: [
                        {
                            "id": "Dell",
                            "name": "Dell",
                            children: []
                        }
                    ]
                }
            ]
        }
    ]
*/