import React, { useCallback, useContext, useEffect, useState } from "react";
import firebase from '../../Firebase';

import { UilThumbsUp } from '@iconscout/react-unicons'
import { UilCommentAltMessage } from '@iconscout/react-unicons'
import { UilSmile } from '@iconscout/react-unicons'
import { UilHeart } from '@iconscout/react-unicons'
import { UilHeartBreak } from '@iconscout/react-unicons'

import Moment from "react-moment";
import 'moment/locale/pt-br';

import { FeedView } from "./Header/Menu";

import { useCookies } from 'react-cookie';



function PostCard({ post }) {
  const [cookies, setCookie, removeCookie] = useCookies(["uid", "condicao"]);

  const [likes, setLikes] = useState(0);
  const [usuarioCurtiu, setCurtir] = useState(true);
  const [followClick, setFollowCLick] = useState("");


  const [comentario, setComentario] = useState("");
  const [comentarios, setComentarios] = useState([]);
  const [QuantidadeComentario, setQuantidadeC] = useState(0);

  const [isHide, setisHide] = useState(false);

  const [username, setUsername] = useState("");
  const [funcao, setFuncao] = useState("");
  const [ImagemUrlPerfil, setImagemURL] = useState("");

  const [follow, setFollow] = useState("");

  async function GuardarTirarFollow(id) {
    let verificar = true;
    const seguir1 = await firebase.firestore().collection("Usuario").doc(cookies.uid).collection("amigos").get();
    const usuario = await firebase.firestore().collection("Usuario").get();

    usuario.docs.forEach(doc => {
      if (doc.id == id) {
        verificar = false
      }
    })

    if (verificar == false) {
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

        else {
          await firebase.firestore().collection("Usuario").doc(cookies.uid).collection("amigos").doc(id)
            .set({
              idUsuario: id
            })
            window.location.reload();
        }
      }
    }
  }

  async function GuardarTirarFollowPost() {
    let id = post.idUsuario;
    let verificar = true;
    const seguir1 = await firebase.firestore().collection("Usuario").doc(cookies.uid).collection("amigos").get();
    const usuario = await firebase.firestore().collection("Usuario").get();

    usuario.docs.forEach(doc => {
      if (doc.id == id) {
        verificar = false
      }
    })

    if (verificar == false) {
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

        else {
          await firebase.firestore().collection("Usuario").doc(cookies.uid).collection("amigos").doc(id)
            .set({
              idUsuario: id
            })
            window.location.reload();
        }
      }
    }
  }

  async function coletarAmigos(id) {

    let verificar = true;
    const seguir1 = await firebase.firestore().collection("Usuario").doc(cookies.uid).collection("amigos").get();
    const usuario = await firebase.firestore().collection("Usuario").get();

    usuario.docs.forEach(doc => {
      if (doc.id == id) {
        verificar = false
      }
    })

    if (verificar == false) {
      if (id !== cookies.uid) {

        for (const [x, y] of seguir1.docs.entries()) {
          if (y.id == id) {
            verificar = true;
            break
          }
        }

        if (verificar) {
          return <UilHeartBreak className="button__icon followIconFeed" />
        }

        else {
          return <UilHeart className="button__icon followIconFeed" />
        }
      }
    }
  }

  async function coletarUsuarioComentario(id) {
    let snapshot = await firebase.firestore().collection("Usuario").doc(id).get()
    if (snapshot.data() === undefined) {
      snapshot = await firebase.firestore().collection("Instituição").doc(id).get()
    }
    return snapshot.data()
  }


  async function FotoComentario(id) {
    try {
      let url = await firebase.storage().ref(`FotoPerfil/${id}`).child("perfil").getDownloadURL();
      return url;

    } catch (error) {
      return "padraoperfil.png";
    }

  }

  async function atualizarcomentarios() {
    const listaComentarios = [];
    const snapshot = await firebase.firestore().collection(FeedView).doc(post.codigoPublicacao).collection("comentarios").orderBy("DataeHora", "desc").get();

    for (const [index, doc] of snapshot.docs.entries()) {
      let dados = doc.data();
      let dadosUsuarios = await coletarUsuarioComentario(dados.idUsuario);
      let fotoComment = await FotoComentario(dados.idUsuario);

      let followIcon = await coletarAmigos(dados.idUsuario);


      listaComentarios.push(
        <div className="comentarios" key={index * 6 + 0}>
          <div className="headerPublic" key={index * 6 + 1}>
            <div className="fotoAndName">
              <img className="fotoComentario" key={index * 6 + 2} src={fotoComment} />
              <h3 className="nomeComentario" key={index * 6 + 3}>{dadosUsuarios.nome}</h3>
              <div onClick={e => GuardarTirarFollow(dados.idUsuario)}>
                {followIcon}
              </div>
            </div>
            <Moment className="dataPublic" key={index * 6 + 4} fromNow locale="pt-br">{dados.DataeHora?.toDate()}</Moment>
          </div>
          <p className="commentComentario" key={index * 6 + 5}>{dados.comentario}</p>
        </div>
      )
    }
    setQuantidadeC(listaComentarios.length);
    setComentarios(listaComentarios);

  }

  const coletarDados = useCallback(async () => {
    try {
      const snapshotUsuario = await firebase.firestore().collection("Usuario").doc(post.idUsuario).get()
      setUsername(snapshotUsuario.data().nome);
    } catch (error) {
      const snapshotUsuario = await firebase.firestore().collection("Instituição").doc(post.idUsuario).get()
      setUsername(snapshotUsuario.data().nome);
    }

    atualizarcomentarios();

    const snapshotLikes = await firebase.firestore().collection(FeedView).doc(post.codigoPublicacao).collection("likes").get()
    setCurtir(snapshotLikes.docs.map(doc => doc.data().uid).indexOf(cookies.uid) !== -1);
    setLikes(snapshotLikes.docs.length);

    try {
      const url = await firebase.storage().ref(`FotoPerfil/${post.idUsuario}`).child("perfil").getDownloadURL()
      setImagemURL(url);
    } catch (error) {
      setImagemURL("/padraoperfil.png");
    }

    const followIcon = await coletarAmigos(post.idUsuario);
    setFollow(followIcon);

  }, []);

  useEffect(() => {
    coletarDados()
  }, [coletarDados])

  useEffect(() => {
    atualizarcomentarios()
  }, [QuantidadeComentario])

  const SetLikesFirebase = async (e) => {
    if (usuarioCurtiu) {
      firebase.firestore().collection(FeedView).doc(post.codigoPublicacao).collection("likes").doc(cookies.uid).delete()
      setCurtir(false);
      setLikes(likes - 1);
    } else {
      await firebase.firestore().collection(FeedView).doc(post.codigoPublicacao).collection("likes").doc(cookies.uid)
        .set({
          uid: cookies.uid
        })
      setCurtir(true);
      setLikes(likes + 1);
    }

  }

  const enviarComents = async (e) => {
    e.preventDefault();
    setQuantidadeC(QuantidadeComentario + 1);

    let comentarioEnviar = comentario;
    setComentario('');

    await firebase.firestore().collection(FeedView).doc(post.codigoPublicacao).collection('comentarios').doc()
      .set({
        comentario: comentarioEnviar,
        DataeHora: firebase.firestore.Timestamp.fromDate(new Date()),
        idUsuario: cookies.uid,
      }).catch((error) => {
        console.log(error);
      });

    alert("Comentário realizado com sucesso!")
  }

  function esconder() {
    if (isHide === true && document.getElementById(post.codigoPublicacao) != null) {
      document.getElementById(post.codigoPublicacao).style.display = "none";
      setisHide(false);
    }
    if (isHide === false && document.getElementById(post.codigoPublicacao) != null) {
      document.getElementById(post.codigoPublicacao).style.display = "grid";
      setisHide(true);
    }
  }

  function likecolor() {
    let color = ""
    if (usuarioCurtiu) {
      color = "rgb(255, 94, 0)";
    }
    else {
      color = "white"
    }
    return color;
  }


  return (

    <div className="post-card">
      <div className="cimaPublic">
        <div className="headerPublic">
          <div className="fotoAndName">
            <img className="fotoPerfil" src={ImagemUrlPerfil} />
            <h3 className="nomePerfil">{username}</h3>
            <div onClick={GuardarTirarFollowPost}>
              {follow}
            </div>

          </div>
          <Moment className="dataPublic" fromNow locale="pt-br">{post.DataeHora?.toDate()}</Moment>
        </div>

        <h4>{post.texto}</h4>
      </div>

      <img className="fotoPublicacao" src={post.urlPublicacao} />

      <div className="bottom-card">
        <UilThumbsUp className="button__icon buttonLikeComment Feed1Emoji" id="CorLike" onClick={SetLikesFirebase} style={{ color: likecolor() }} /> {likes}
        <UilCommentAltMessage onClick={esconder} className="button__icon comment buttonLikeComment Feed1Emoji" /> {QuantidadeComentario}
      </div>

      <hr />

      <div className="clickComentarios" id={post.codigoPublicacao}>
        {comentarios}
      </div>


      <form className="Feed1Form">
        <UilSmile className="button__icon Feed1Emoji" />
        <input
          value={comentario}
          onChange={e => setComentario(e.target.value)}
          type="text"
          placeholder="Adicione um comentário..."
          className="Feed1Input focus:ring-0 outline-none"
        />
        <button type="submit" disabled={!comentario.trim()} onClick={enviarComents} className='ButtonFeed1'>Postar</button>

      </form>
    </div>
  );
};
export default PostCard;