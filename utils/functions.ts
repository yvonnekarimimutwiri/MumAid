import { CommentType } from "@/data/mockdata";

export const getTotalCommentsCount = (comments: CommentType[]): number => {
    if (!comments) return 0;
    
    return comments.reduce((acc, comment) => {
        const repliesCount = comment.replies ? getTotalCommentsCount(comment.replies) : 0;
        return acc + 1 + repliesCount;
    }, 0);
};