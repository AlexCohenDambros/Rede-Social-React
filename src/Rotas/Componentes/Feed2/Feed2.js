import React from "react";
import firebase from '../../../Firebase';
import './Feed2.css';
import { useInfiniteQuery } from "react-query";
import PostCard from "../PostCard";



export default function Feed2() {

    const fetchPostsFirebase = async ({ pageParam = 1 }) => {
        const results = await colectData();

        return { results, nextPage: pageParam + 1, totalPages: 100 };
    };

    const {
        data,
        isLoading,
        isError,
        hasNextPage,
        fetchNextPage
    } = useInfiniteQuery("posts", fetchPostsFirebase, {
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
            return undefined;
        }
    });


    async function colectData() {
        let result = new Array;
        let snapshot = await firebase.firestore().collection("Feed2").orderBy("DataeHora", "desc").get()
        snapshot.docs.forEach(doc => {
            result.push(doc.data())
        })

        return result
    }

    return (
        <div>
            <main>
                {isLoading ? (
                    <p>Loading...</p>
                ) : isError ? (
                    <p>There was an error</p>
                ) : (
                    data.pages.map((page) =>
                        page.results.map((post) =>
                            <PostCard key={post.codigoPublicacao} post={post} />
                        )
                    )
                )}
            </main>
        </div>
    );
}




