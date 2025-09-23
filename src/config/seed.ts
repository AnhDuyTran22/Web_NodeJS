import { prisma } from "./client";
import { hashPassword } from "../services/client/user.service";
import { ACCOUNT_TYPE } from "./constant";


const initDatabase = async () => {
    const countUser = await prisma.user.count();
    const countRole = await prisma.role.count();
    const countProduct = await prisma.product.count();
    if (countRole == 0) {
        await prisma.role.createMany({
            data: [
                {
                    name: "ADMIN",
                    description: "Admin thi pull quyen"
                },
                {
                    name: "USER",
                    description: "user thong thuong"
                }
            ]
        })
    }
    if (countUser == 0) {
        const defaultPassword = await hashPassword("123456");
        const adminRole = await prisma.role.findFirst({
            where: { name: "ADMIN" }
        })
        if (adminRole)
            await prisma.user.createMany({
                data: [
                    {
                        fullName: "Admin",
                        username: "anhduytran",
                        password: defaultPassword,
                        accountType: ACCOUNT_TYPE.SYSTEM,
                        roleId: adminRole.id
                    }
                ]
            })
    }
    if (countProduct === 0) {
        const products = [
            {
                name: "Laptop Asus TUF Gaming",
                price: 17_490_000,
                detailDesc: "ASUS TUF Gaming F15 FX506HF HN017W là chiếc laptop gaming hiệu năng cao.",
                shortDesc: "Intel Core i5, 11400H",
                quantity: 100,
                factory: "ASUS",
                target: "GAMING",
                image: "1711078092373-asus-01.png",
            },
            {
                name: "Laptop Dell Inspiron 15",
                price: 15_990_000,
                detailDesc: "Dell Inspiron 15 3520 phù hợp học tập, văn phòng với hiệu năng ổn định.",
                shortDesc: "Intel Core i5, 1235U",
                quantity: 80,
                factory: "DELL",
                target: "SINHVIEN-VANPHONG",
                image: "1711078452562-dell-01.png",
            },
            {
                name: "Laptop Lenovo Legion 5",
                price: 27_490_000,
                detailDesc: "Lenovo Legion 5 trang bị RTX 3060, cân mọi tựa game AAA.",
                shortDesc: "Ryzen 7 5800H, RTX 3060",
                quantity: 50,
                factory: "LENOVO",
                target: "GAMING",
                image: "1711079073759-lenovo-01.png",
            },
            {
                name: "Laptop Asus ZenBook 14",
                price: 21_490_000,
                detailDesc: "Asus ZenBook 14 siêu mỏng nhẹ, màn hình OLED tuyệt đẹp.",
                shortDesc: "Intel Core i5, 1240P",
                quantity: 40,
                factory: "ASUS",
                target: "MONG-NHE",
                image: "1711079496409-asus-02.png",
            },
            {
                name: "Laptop MacBook Air M1",
                price: 22_990_000,
                detailDesc: "Apple MacBook Air M1 2020 mỏng nhẹ, pin lâu, hiệu năng mạnh mẽ.",
                shortDesc: "Apple M1, 8GB RAM",
                quantity: 60,
                factory: "APPLE",
                target: "MONG-NHE",
                image: "1711079954090-apple-01.png",
            },
            {
                name: "Laptop LG Gram 16",
                price: 25_990_000,
                detailDesc: "LG Gram 16 siêu nhẹ, pin bền, màn hình 2K sắc nét.",
                shortDesc: "Intel Core i7, 1260P",
                quantity: 45,
                factory: "LG",
                target: "MONG-NHE",
                image: "1711080386941-lg-01.png",
            },
            {
                name: "Laptop MacBook Pro M2",
                price: 32_990_000,
                detailDesc: "MacBook Pro M2 hiệu năng vượt trội, phù hợp cho dân sáng tạo nội dung.",
                shortDesc: "Apple M2, 8GB RAM",
                quantity: 55,
                factory: "APPLE",
                target: "DOANH-NHAN",
                image: "1711080787179-apple-02.png",
            },
            {
                name: "Laptop Acer Aspire 7",
                price: 18_490_000,
                detailDesc: "Acer Aspire 7 thiết kế mỏng nhẹ, hiệu năng mạnh cho học tập & làm việc.",
                shortDesc: "Ryzen 5 5500U, GTX 1650",
                quantity: 70,
                factory: "ACER",
                target: "SINHVIEN-VANPHONG",
                image: "1711080948771-acer-01.png",
            },
            {
                name: "Laptop Asus VivoBook 15",
                price: 13_990_000,
                detailDesc: "Asus VivoBook 15 hiện đại, phù hợp cho học sinh sinh viên.",
                shortDesc: "Intel Core i3, 1115G4",
                quantity: 85,
                factory: "ASUS",
                target: "SINHVIEN-VANPHONG",
                image: "1711081080930-asus-03.png",
            },
            {
                name: "Laptop Dell XPS 13",
                price: 32_990_000,
                detailDesc: "Dell XPS 13 cao cấp, màn hình InfinityEdge ấn tượng.",
                shortDesc: "Intel Core i7, 1250P",
                quantity: 30,
                factory: "DELL",
                target: "DOANH-NHAN",
                image: "1711081278418-dell-02.png",
            },
        ];

        await prisma.product.createMany({
            data: products
        });
        console.log(">>>CREATED INITIAL PRODUCTS ...");
    }



    if (countRole > 0) {
        console.log(">>>CREATED INITIAL ROLES ...");
    }
    
    if (countUser > 0) {
        console.log(">>>CREATED INITIAL USERS ...");
    }

    if (countRole > 0 && countUser > 0 && countProduct > 0) {
        console.log(">>>ALREADY INIT DATA ...");
    }



}

export default initDatabase;