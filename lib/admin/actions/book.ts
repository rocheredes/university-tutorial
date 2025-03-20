'use server'

import { db } from "@/database/drizzle"
import { books } from "@/database/schema"
import { BooksParams } from "@/types/BookInterface"

export const createBook = async (params: BooksParams) => {
    try {
        const newBook = await db.insert(books).values({
            ...params,
            availableCopies: params.totalCopies
        }).returning()

        return {
            success: true,
            data: JSON.stringify(newBook)
        }


    } catch (error) {
        console.log("Error")
        return {
            success: false,
            message: "An error ocurred while created the book"
        }
    }
}