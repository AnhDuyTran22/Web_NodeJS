import { prisma } from "config/client";

const createProduct = async ({
    name,
    price,
    detailDesc,
    shortDesc,
    quantity,
    factory,
    target,
    imageUpload,
}: {
    name: string;
    price: number;
    detailDesc: string;
    shortDesc: string;
    quantity: number;
    factory: string;
    target: string;
    imageUpload?: string;
}) => {
    return await prisma.product.create({
        data: {
            name,
            price,
            detailDesc,
            shortDesc,
            quantity,
            factory,
            target,
            ...(imageUpload && { image: imageUpload }),
        },
    });
};

const getProductList = async () => {
    return await prisma.product.findMany();
}


const handleDeleteProduct = async (id: number) => {
    await prisma.product.delete({
        where: { id }
    })
}


const getProductById = async (id: number) => {
    return await prisma.product.findUnique({
        where: { id }
    })
}

const updateProductById = async ({
    id,
    name,
    price,
    detailDesc,
    shortDesc,
    quantity,
    factory,
    target,
    imageUpload,
}: {
    id: number;
    name: string;
    price: number;
    detailDesc: string;
    shortDesc: string;
    quantity: number;
    factory: string;
    target: string;
    imageUpload?: string; // optional
}) => {
    await prisma.product.update({
        where: { id },
        data: {
            name,
            price,
            detailDesc,
            shortDesc,
            quantity,
            factory,
            target,
            ...(imageUpload && { image: imageUpload }) // chỉ update nếu có ảnh mới
        },
    });
};



export {
    createProduct, getProductList, handleDeleteProduct, getProductById, updateProductById
}
