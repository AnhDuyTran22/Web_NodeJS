import { prisma } from "config/client";

const initDatabase = async () => {
    const countUser = await prisma.user.count();
    const countRole = await prisma.role.count();

    if (countUser == 0) {
        await prisma.user.createMany({
            data: [
                {
                    username: "anhduytran",
                    password: "123456",
                    accountType: "SYSTEM",
                }
            ]
        })
    } else if (countRole == 0) {
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


    else {
        console.log(">>>ALREDY INIT DATA ...");
    }



}

export default initDatabase;