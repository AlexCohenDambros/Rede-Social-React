import React from "react";
import firebase from '../../../Firebase';
import './Feed3.css';
import { useInfiniteQuery } from "react-query";
import PostCard from "../PostCard";
import { useCookies } from 'react-cookie';


export default function Feed3() {
    const [cookies, setCookie, removeCookie] = useCookies(["uid", "condicao"]);

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

        let pegarUniversidade = await firebase.firestore().collection("Usuario").doc(cookies.uid).get()
        let pegarUniversidadeInstituicao = await firebase.firestore().collection("Instituição").get()

        let snapshot = await firebase.firestore().collection("Feed3").orderBy("DataeHora", "desc").get()
        try {
            snapshot.docs.forEach(doc => {
                pegarUniversidadeInstituicao.docs.forEach(doc2 => {
                    if (doc.data().idUsuario === doc2.id) {
                        if (doc2.id === pegarUniversidade.data().universidade) {
                            result.push(doc.data());
                        }
                    }
                })
            })
        } catch (error) {
            snapshot.docs.forEach(doc => {
                if (doc.data().idUsuario === cookies.uid) {
                    result.push(doc.data());
                }
            })
        }

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




