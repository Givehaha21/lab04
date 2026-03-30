export default interface BorrowRecord {
    id: number;
    memberId: number;
    bookId: number;
    quantity: number;
    dueDate: Date;
    returnedAt?: Date | null;
}
