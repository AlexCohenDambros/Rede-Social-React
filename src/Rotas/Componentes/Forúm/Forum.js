import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from '../../../Firebase';
import './Forum.css';
import { UilLaptop } from '@iconscout/react-unicons';
import { UilDna } from '@iconscout/react-unicons';
import { UilWrench } from '@iconscout/react-unicons';
import { UilMedkit } from '@iconscout/react-unicons';
import { UilFlask } from '@iconscout/react-unicons';
import { UilCalculatorAlt } from '@iconscout/react-unicons';
import { UilReact } from '@iconscout/react-unicons';
import { UilGlobe } from '@iconscout/react-unicons';
import { UilBookOpen } from '@iconscout/react-unicons';


function Forum() {
    const history = useHistory();

    return (
        <div className="Forum">
            <div className="BotoesForum">
                <div className="btn">
                    <a className="button--flex BotaoForum">
                        <UilLaptop className="button__icon" /> Computação

                    </a>
                </div>
                <div className="btn">
                    <a className="button--flex BotaoForum">
                        <UilDna className="button__icon" /> Biologia

                    </a>
                </div>
                <div className="btn">
                    <a className="button--flex BotaoForum">
                        <UilWrench className="button__icon" /> Engenharia

                    </a>
                </div>
                <div className="btn">
                    <a className="button--flex BotaoForum">
                        <UilMedkit className="button__icon" /> Medicina
                    </a>
                </div>

                <div className="btn">
                    <a className="button--flex BotaoForum">
                        <UilFlask className="button__icon" /> Química
                    </a>
                </div>
                <div className="btn">
                    <a className="button--flex BotaoForum">
                        <UilReact className="button__icon" /> Física
                    </a>
                </div>

                <div className="btn">
                    <a className="button--flex BotaoForum">
                        <UilCalculatorAlt className="button__icon" /> Matemática
                    </a>
                </div>

                <div className="btn">
                    <a className="button--flex BotaoForum">
                        <UilGlobe className="button__icon" /> Geografia
                    </a>
                </div>

                <div className="btn">
                    <a className="button--flex BotaoForum">
                        <UilBookOpen className="button__icon" /> História
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Forum;