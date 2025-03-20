export interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    rating: number;
    totalCopies: number;
    availableCopies: number;
    description: string;
    coverColor: string;
    coverUrl: string;
    video: string;
    summary: string;
    isLoanedBook?: boolean
}

export interface BooksParams {
    title: string;
    author: string;
    genre: string;
    rating: number;
    coverColor: string;
    coverUrl: string;
    totalCopies: number;
    description: string;
    summary: string;
    videoUrl:string;
}