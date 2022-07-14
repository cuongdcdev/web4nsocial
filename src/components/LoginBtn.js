import React, { useState, useEffect } from "react"
import Button from '@mui/material/Button';
import {login,logout} from "../utils";
import { NEAR_ICON_IMG } from "../utils";
export default function LoginBtn(props) {
    return (
        <div id="loginBtn">
            <Button variant="outlined" size="large" onClick={ ()=>{  login()  } }>
                 { props.text ? props.text : " Login with NEAR " }<img src={NEAR_ICON_IMG} className="login-btn-img"/>
            </Button>
        </div>
    )
}