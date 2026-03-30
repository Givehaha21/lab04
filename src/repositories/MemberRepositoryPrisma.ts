import { prisma } from "../lib/prisma";
import type Member from "../models/Member";

export function getAllMembers() {
    return prisma.member.findMany();
}

export function getMemberByMemberId(memberId: string) {
    return prisma.member.findUnique({
        where: { memberId },
    });
}

export function getMembersByName(name: string) {
    return prisma.member.findMany({
        where: {
            OR: [
                { firstName: { contains: name, mode: "insensitive" } },
                { lastName: { contains: name, mode: "insensitive" } },
            ],
        },
    });
}

export function addMember(newMember: Member) {
    return prisma.member.create({
        data: {
            memberId: newMember.memberId,
            firstName: newMember.firstName,
            lastName: newMember.lastName,
            phone: newMember.phone,
        },
    });
}
