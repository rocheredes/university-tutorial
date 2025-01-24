import BookList from '@/components/BookList'
import BookOverview from '@/components/BookOverview'
import React from 'react'

const Home = () => {
    return (
        <>
            <BookOverview />
            <BookList />
        </>
    )
}

export default Home