import * as repo from "../repositories/MemberRepositoryPrisma";
import type Member from "../models/Member";

export async function getAllMembers() {
    return repo.getAllMembers();
}

export async function getMemberByMemberId(memberId: string) {
    return repo.getMemberByMemberId(memberId);
}

export async function getMembersByName(name: string) {
    return repo.getMembersByName(name);
}

export async function addMember(newMember: Member) {
    return repo.addMember(newMember);
}
