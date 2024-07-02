import { IProduct, IProductService, TCreateProduct, TUpdateProduct } from "./interfaces";

export class ProductList implements IProductService {
    private id: number = 1;
    private productList: IProduct[] = [];

    createProduct(data: TCreateProduct): IProduct {
        const now = new Date();

        const newProduct: IProduct = {
            ...data,
            id: this.id,
            createdAt: now,
            updatedAt: now
        }


        this.productList.push(newProduct);

        this.id++;

        return newProduct;
    }
    getProducts(): IProduct[] {
        return this.productList;
    }
    getOneProduct(id: number): IProduct | undefined {
        const specificProduct = this.productList.find((product) => product.id === id);

        return specificProduct
    }
    updateProduct(id: number, data: TUpdateProduct): string | IProduct {
        const currentProduct = this.productList.find((product) => product.id === id);

        if (currentProduct) {
            const index = this.productList.findIndex((product) => product.id === id);

            const now = new Date();

            const updateProduct: IProduct = { ...currentProduct, ...data, updatedAt: now };

            this.productList.splice(index, 1, updateProduct);

            return updateProduct;
        } else {
            return "Produto não encontrado."
        }
    }
    deleteProduct(id: number): { message: string } {
        const currentProduct = this.productList.find((product) => product.id === id);

        if (currentProduct) {
            const index = this.productList.findIndex((product) => product.id === id);

            this.productList.splice(index, 1)
            return { message: "Product successfully deleted." }
        } else {
            return { message: "Product not found." }
        }
    }
}

export const productList = new ProductList()