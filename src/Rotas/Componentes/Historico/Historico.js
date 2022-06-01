import React, { useState } from "react";
import firebase from '../../../Firebase';
import '../Feed1/Feed1.css';
import { useInfiniteQuery } from "react-query";
import PostCard from "../PostCard";
import { useCookies } from 'react-cookie';


export default function Historico() {
    const [cookies, setCookie, removeCookie] = useCookies(["uid", "condicao"]);

    const fetchPostsFirebase = async ({ pageParam = 1 }) => {
        const results = await colectDataHistorico();

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


    async function colectDataHistorico() {
        let result = new Array;

        let snapshot = await firebase.firestore().collection("Feed1").orderBy("DataeHora", "desc").get()
        snapshot.docs.forEach(doc => {
            if(doc.data().idUsuario === cookies.uid){
                result.push(doc.data());
            }

        })

        let snapshot2 = await firebase.firestore().collection("Feed2").orderBy("DataeHora", "desc").get()
        snapshot2.docs.forEach(doc => {
            if(doc.data().idUsuario === cookies.uid){
                result.push(doc.data());
            }
        })

        let snapshot3 = await firebase.firestore().collection("Feed3").orderBy("DataeHora", "desc").get()
        snapshot3.docs.forEach(doc => {
            if(doc.data().idUsuario === cookies.uid){
                result.push(doc.data());
            }
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
