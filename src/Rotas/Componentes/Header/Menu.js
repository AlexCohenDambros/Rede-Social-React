
import React, { useContext, useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from '../../../Firebase';
import { v4 } from 'uuid';
import './Menu.css'

import { FaUserEdit } from "react-icons/fa";
import { UilHistory } from '@iconscout/react-unicons';
import { UilSignout } from '@iconscout/react-unicons';
import { UilBriefcase } from '@iconscout/react-unicons';
import { UilGraduationCap } from '@iconscout/react-unicons'
import { UilComment } from '@iconscout/react-unicons'
import { UilLightbulbAlt } from '@iconscout/react-unicons'
import { UilLockOpenAlt } from '@iconscout/react-unicons'
import { UilCamera } from '@iconscout/react-unicons'
import { UilCommentAltPlus } from '@iconscout/react-unicons'
import { UilArrowUp } from '@iconscout/react-unicons'
import { UilUsersAlt } from '@iconscout/react-unicons'
import { UilHeartBreak } from '@iconscout/react-unicons'

import Feed1 from "../Feed1/Feed1";
import Feed2 from "../Feed2/Feed2";
import Feed3 from "../Feed3/Feed3";
import Forum from "../Forúm/Forum";
import Perfil from "../EditarPerfil/Perfil"
import Historico from "../Historico/Historico";
import { QueryClient, QueryClientProvider } from "react-query";

import { useCookies } from 'react-cookie';

const queryClient = new QueryClient();
export var FeedView;

function Menu() {
    const history = useHistory();

    const [cookies, setCookie, removeCookie] = useCookies(["uid", "condicao"]);

    const [view, setView] = useState("Feed1");
    const [idUsuario, setUiD] = useState(cookies.uid);
    const [img, setImg] = useState("");
    const [textoImg, setTexto] = useState("");
    const [CodImg, setCodImg] = useState(v4());
    const [username, setUsername] = useState("");
    const [ImagemUrlPerfil, setImagemURL] = useState("");
    const [listaAmigos, setAmigos] = useState("");

    const [cnpj, setCnpj] = useState();
    const [isHide, setisHide] = useState(false);

    async function coletarUsuarioAmigos(id) {
        let snapshot = await firebase.firestore().collection("Usuario").doc(id).get()
        if (snapshot.data() === undefined) {
            snapshot = await firebase.firestore().collection("Instituição").doc(id).get()
        }
        return snapshot.data()
    }


    async function FotoAmigos(id) {
        try {
            let url = await firebase.storage().ref(`FotoPerfil/${id}`).child("perfil").getDownloadURL();
            return url;

        } catch (error) {
            return "padraoperfil.png";
        }

    }

    async function GuardarTirarFollow(id) {

        let verificar = false;

        const seguir1 = await firebase.firestore().collection("Usuario").doc(cookies.uid).collection("amigos").get();

        
        if (id !== cookies.uid) {

            for (const [x, y] of seguir1.docs.entries()) {
                if (y.id == id) {
                    verificar = true;
                    break
                }
            }

            if (verificar) {
                await firebase.firestore().collection("Usuario").doc(cookies.uid).collection("amigos").doc(id).delete()
                window.location.reload();
            }
        }
    }


    async function follow() {
        const listadeAmigos = [];
        try {
            const amigos = await firebase.firestore().collection("Usuario").doc(cookies.uid).collection("amigos").get()
            if (amigos.docs === undefined || amigos.docs.length === 0) {
                listadeAmigos.push(
                    <p className="pAmigos" key={1 * 6 + 5}>Você não possui amigos!</p>
                )
            }
            else {
                for (const [index, doc] of amigos.docs.entries()) {
                    let dados = doc.data();

                    let dadosUsuarios = await coletarUsuarioAmigos(dados.idUsuario);
                    let fotoAmigos = await FotoAmigos(dados.idUsuario);


                    listadeAmigos.push(
                        <div className="divAmigos" key={index * 6 + 1}>
                            <div className="fotoAndNameAmigos" key={index * 6 + 2}>
                                <img className="fotoAmigo" key={index * 6 + 3} src={fotoAmigos} />
                                <h3 className="nomeAmigo" key={index * 6 + 4}>{dadosUsuarios.nome}</h3>
                            </div>
                            <div onClick={e => GuardarTirarFollow(dados.idUsuario)}>
                                <UilHeartBreak className="button__icon followIcon" />
                            </div>

                        </div>
                    )
                }
            }



        } catch (error) {
            listadeAmigos.push(
                <p className="pAmigos" key={100 * 6 + 5}>Você não possui amigos!</p>
            )
        }

        setAmigos(listadeAmigos);
    }

    const coletarDados = useCallback(async () => {
        try {
            const snapshotUsuario = await firebase.firestore().collection("Usuario").doc(cookies.uid).get()
            setUsername(snapshotUsuario.data().nome);
            try {
                setCnpj(snapshotUsuario.data().cnpj)
            } catch (error) {
                setCnpj("");
            }
        } catch (error) {
            const snapshotUsuario = await firebase.firestore().collection("Instituição").doc(cookies.uid).get()
            setUsername(snapshotUsuario.data().nome);
            try {
                setCnpj(snapshotUsuario.data().cnpj)
            } catch (error) {
                setCnpj("");
            }
        }

        try {
            const url = await firebase.storage().ref(`FotoPerfil/${cookies.uid}`).child("perfil").getDownloadURL()
            setImagemURL(url);
        } catch (error) {
            setImagemURL("/padraoperfil.png");
        }

        follow();

    }, []);

    useEffect(() => {
        coletarDados()
    }, [coletarDados])

    async function publish() {

        let erros = false;

        if (img === "") {
            alert("Antes de publicar você precisa digitar uma mensagem!")
            erros = true;
        }

        if (textoImg === "") {
            alert("Antes de publicar você precisa selecionar uma imagem!")
            erros = true;
        }

        if (view === "Feed2") {
            if (cnpj === undefined) {
                alert("Voce nao pode realizar uma postagem neste feed!")
                erros = true;
            }
        }

        if (view === "Feed3") {
            if (cnpj === undefined) {
                alert("Voce nao pode realizar uma postagem neste feed!")
                erros = true;
            }
        }

        if (erros === false) {
            setCodImg(v4())

            debugger;

            if (CodImg === "" && CodImg === undefined) {
                setCodImg(v4())
            }
            try {
                await firebase.storage().ref(`${view}/${idUsuario}/${CodImg}`).child("publicação").put(img);

                let url = await firebase.storage().ref(`${view}/${idUsuario}/${CodImg}`).child("publicação").getDownloadURL();

                await firebase.firestore().collection(view).doc(CodImg)
                    .set({
                        texto: textoImg,
                        DataeHora: firebase.firestore.Timestamp.fromDate(new Date()),
                        idUsuario: idUsuario,
                        urlPublicacao: url,
                        codigoPublicacao: CodImg,
                    }, {
                        merge: true
                    })


                alert("Publicação realizada com sucesso!");

            } catch (error) {
                alert(error);
            }

        }

    }

    function UploadImg(e) {
        setImg(e.target.files[0]);

    }

    function exit() {
        setCookie("uid", "", { path: '/' })
        setCookie("condicao", false, { path: '/' })
        firebase.auth().signOut();
        alert("Volte sempre!");
        history.push("/");
    }



    function Visivel() {
        if (document.getElementById("postInput") != null) {
            document.getElementById("postInput").style.display = "flex";
        }

    }

    function Invisivel() {
        if (document.getElementById("postInput") != null) {
            document.getElementById("postInput").style.display = "none";
        }

    }

    function Feed(feed) {
        FeedView = feed;

        switch (feed) {
            case "Feed1":
                Visivel()
                return <Feed1 />
            case "Feed2":
                Visivel()
                return <Feed2 />
            case "Feed3":
                Visivel()
                return <Feed3 />
            case "Forum":
                Invisivel()
                return <Forum />
            case "Perfil":
                Invisivel()
                return <Perfil />
            case "Historico":
                Invisivel()
                return <Historico />
            default:
                break;
        }
    }


    /*==================== SHOW SCROLL UP ====================*/
    function scrollUp() {
        const scrollUp = document.getElementById('scroll-up');

        try {
            if (this.scrollY >= 560) scrollUp.classList.add('show-scroll');
            else scrollUp.classList.remove('show-scroll')
        }
        catch {
            history.push("/");
        }
    }
    window.addEventListener('scroll', scrollUp)

    function esconder() {
        if (isHide === true && document.getElementById("listaAmigosVer") != null) {
            document.getElementById("listaAmigosVer").style.display = "grid";
            setisHide(false);
        }
        if (isHide === false && document.getElementById("listaAmigosVer") != null) {
            document.getElementById("listaAmigosVer").style.display = "none";
            setisHide(true);
        }
    }

    return (
        <div className="menu-geral">
            <div className="menu-left">
                <div className="geral">
                    <div className="FotoPerfil">
                        <img className="foto" src={ImagemUrlPerfil} />
                    </div>
                    <p className="nomeUsuario">{username}</p>


                    <div className="containerbutton">
                        <div className="btn" onClick={() => setView("Perfil")}>
                            <a className="button--flex BotoesLeft">
                                <FaUserEdit className="button__icon" /> Editar Perfil
                            </a>
                        </div>
                        <div className="btn" onClick={() => setView("Historico")}>
                            <a className="button--flex BotoesLeft">
                                <UilHistory className="button__icon" /> Histórico
                            </a>
                        </div>

                        <div className="btn">
                            <a className="button--flex BotoesLeft" onClick={exit}>
                                <UilSignout className="button__icon" /> Sair
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="menu-center">
                <div className="header-center">
                    <div className="BotoesCenter">
                        <div className="btn">
                            <a className="button--flex BotaoCenter" onClick={() => setView("Feed1")}>
                                <UilLightbulbAlt className="button__icon`" />  Geral

                            </a>
                        </div>
                        <div className="btn">
                            <a className="button--flex BotaoCenter" onClick={() => setView("Feed2")}>
                                <UilBriefcase className="button__icon" /> Estágios

                            </a>
                        </div>
                        <div className="btn">
                            <a className="button--flex BotaoCenter" onClick={() => setView("Feed3")}>
                                <UilGraduationCap className="button__icon" /> Instituição

                            </a>
                        </div>
                        <div className="btn">
                            <a className="button--flex BotaoCenter" onClick={() => setView("Forum")}>
                                <UilComment className="button__icon" /> Fórum
                            </a>
                        </div>
                    </div>

                    <div className="post" id="postInput">
                        <div className="formInput">
                            <div className="cima">
                                <textarea maxLength="500" className="inputPost" placeholder="O que está pensando?" onChange={(e) => { setTexto(e.target.value) }}></textarea>
                            </div>


                            <div className="baixo">
                                <div className="cont">
                                    <UilLockOpenAlt className="button__icon" size="30px" />
                                    <p className="texto">Este post será Público</p>
                                </div>

                                <div className="BotoesPublicar" htmlFor="botao1">
                                    <label className="btn2" htmlFor="botao2">
                                        <UilCamera className="button__icon" />
                                        <input type="file" id="botao2" onChange={(e) => { UploadImg(e) }} />
                                        <label className="button--flex" htmlFor="botao2">Imagem</label>
                                    </label>
                                    <div onClick={publish}>
                                        <label className="btn2">
                                            <UilCommentAltPlus className="button__icon" />
                                            <label className="button--flex">Publicar</label>
                                        </label>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="feed">
                    <div id="feedElement">
                        <QueryClientProvider client={queryClient}>
                            {Feed(view)}
                        </QueryClientProvider>
                    </div>
                </div>
            </div>

            <div className="menu-right">
                <a href="#" className="scrollup" id="scroll-up">
                    <UilArrowUp className="scrollup__icon" />
                </a>

                <img className="logo" src="/logo.png" />



                <div className="friends">
                    <div className="containerbuttonRight">
                        <div className="btnRight" onClick={esconder}>
                            <a className="button--flex BotaoRight">
                                <UilUsersAlt className="button__icon" /> Seguindo
                            </a>
                        </div>


                        <div className="PuxarAmigos" id="listaAmigosVer">
                            {listaAmigos}
                        </div>

                    </div>
                </div>

            </div>
        </div>

    )
}

export default Menu;
