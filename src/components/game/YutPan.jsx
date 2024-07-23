// noinspection BadExpressionStatementJS

import {useState} from "react";
import useWindowSizeCustom from "../../hooks/useWindowSizeCustom.js";


function YutPan() {
    console.log("YutPan render");
    document.querySelector("body").style.backgroundImage = `url("https://trello.com/1/cards/668e1ac952d3e586a8e1e1c4/attachments/668f29b92b3b2af3e4a6568e/previews/668f29ba2b3b2af3e4a658b7/download/%E2%80%94Slidesdocs%E2%80%94%E1%84%92%E1%85%A1%E1%86%AB%E1%84%80%E1%85%AE%E1%86%A8_%E1%84%89%E1%85%A5%E1%86%AF%E1%84%82%E1%85%A1%E1%86%AF_%E1%84%92%E1%85%AA%E1%86%BC%E1%84%80%E1%85%B3%E1%86%B7_%E1%84%89%E1%85%A2%E1%84%92%E1%85%A2_%E1%84%8E%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4_de170aa169.jpg")`;
    document.querySelector("body").style.backgroundRepeat = 'no-repeat';
    document.querySelector("body").style.backgroundSize = 'cover';
    document.querySelector("html").style.overflow = 'hidden';

    const [yutThrowImageSrc, setYutThrowImageSrc] = useState("/image/yut1.gif");
    const [yutThrowImageDisplay, setYutThrowImageDisplay] = useState("none");
    const [yutThrowAble, setYutThrowAble] = useState(true);
    const windowSizeCustom = useWindowSizeCustom();


    const [player1Top, setPlayer1Top] = useState(356.11);
    const [player1Left, setPlayer1Left] = useState(356.31);
    const [player1Index, setPlayer1Index] = useState(0);
    const [player1Direction, setPlayer1Direction] = useState("scaleX(1)");


    const [resultArr, setResultArr] = useState([]);
    const [resultDelIndex, setResultDelIndex] = useState(null);


    const stateMouseOver = (e) => {
        const element = e.target;
        element.querySelector(".yutName").style.scale = "1.5";
    }

    const stateMouseOut = (e) => {
        const element = e.target;
        element.querySelector(".yutName").style.scale = "0.7";
    }

    const YutThrowBtnOver = (e) => {
        const element = e.target;
        if (element.style.backgroundImage === `url("/image/Btthrow.normal.0.png")`) {
            element.style.backgroundImage = `url("/image/Btthrow.mouseOver.0.png")`;
        }
    }

    const YutThrowBtnOut = (e) => {
        const element = e.target;
        if (element.style.backgroundImage === `url("/image/Btthrow.mouseOver.0.png")`) {
            element.style.backgroundImage = `url("/image/Btthrow.normal.0.png")`;
        }
    }

    const YutThrowBtnDown = (e) => {
        const element = e.target;
        if (element.style.backgroundImage === `url("/image/Btthrow.mouseOver.0.png")`) {
            element.style.backgroundImage = `url("/image/Btthrow.pressed.0.png")`;
        }
    }
    const YutThrowBtnUp = (e) => {
        const element = e.target;
        if (element.style.backgroundImage === `url("/image/Btthrow.pressed.0.png")`) {
            element.style.backgroundImage = `url("/image/Btthrow.disabled.0.png")`;
        }
    }

    const YutThrowBtnClick = () => {
        if (yutThrowAble) {
            setYutThrowImageDisplay("flex")
            const randomNum = Math.floor(Math.random() * 5 + 1);
            setYutThrowImageSrc(`/image/yut${randomNum}.gif`)

            setTimeout(() => {
                setYutThrowImageDisplay("none")
                setYutThrowImageSrc("1")
                setResultArr((arr) => [...arr, randomNum])
                if (randomNum === 4 || randomNum === 5) {
                    oneMore();
                }
            }, 2000)
            setYutThrowAble(false)

        }

    }

    const oneMore = () => {
        setYutThrowAble(true)
        document.getElementsByClassName("YutThrowBtn")[0].style.backgroundImage = `url("/image/Btthrow.normal.0.png")`;

    }

    const arrowMouseOver = (e) => {
        e.currentTarget.querySelector("img").style.filter = "drop-shadow(0px 0px 7px #ff0)";
    }
    const arrowMouseOut = (e) => {
        e.currentTarget.querySelector("img").style.filter = "drop-shadow(0px 0px 0px #ff0)";
    }

    const arrowDisplayNone = () => {
        const arrows = document.getElementsByClassName("arrowIndex")
        for (let i = 0; i < arrows.length; i++) {
            arrows[i].style.display = "none"
        }
    }

    const arrowClick = (e) => {
        console.log(e.currentTarget.classList[0])
        const index = e.currentTarget.classList[0].replace("arrowIndex", "")
        const YutIndex = document.getElementsByClassName("YutIndex" + index)[0];
        setPlayer1Top(parseInt(YutIndex.style.top, 10))
        setPlayer1Left(parseInt(YutIndex.style.left, 10))
        setPlayer1Index(parseInt(index, 10));
        if ((index >= 0 && index <= 9) || index === "22" || index === "23") {
            setPlayer1Direction("scaleX(1)")
        } else {
            setPlayer1Direction("scaleX(-1)")
        }
        arrowDisplayNone()
        resultArrDelete(resultDelIndex)
    }

    if (resultArr.length > 0) {
    }

    const resultArrDelete = (index) => {
        setResultArr((current) => {
            const newArray = [...current];
            newArray.splice(index, 1);
            return newArray;
        });
    }

    const resultUseClick = (item, index) => {
        arrowDisplayNone()
        setResultDelIndex(index)
        let moveIndex = player1Index + item;
        if (player1Index === 100) {
            let go1 = (33 + item);
            if (go1 > 36) go1 = go1 - 36 + 17;
            const arrow1 = document.getElementsByClassName("arrowIndex" + go1)[0];
            arrow1.style.display = "block";

            let go2 = (43 + item);
            if (go2 > 46) go2 = go2 - 47;
            const arrow2 = document.getElementsByClassName("arrowIndex" + go2)[0];
            arrow2.style.display = "block";
            return;
        }


        // 크게 한바퀴 돌았을때
        if (moveIndex >= 24 && player1Index <= 23) {
            moveIndex -= 24
        }

        if (player1Index >= 30 && player1Index <= 36 && moveIndex > 36) {
            moveIndex = moveIndex - 37 + 18;
        }

        if (player1Index >= 40 && player1Index <= 46 && moveIndex > 46) {
            moveIndex = moveIndex - 47;
        }

        // 중앙
        if (moveIndex === 33 || moveIndex === 43) {
            moveIndex = 100;
        }
        console.log(moveIndex);

        const arrow1 = document.getElementsByClassName("arrowIndex" + moveIndex)[0];
        arrow1.style.display = "block";

        if (player1Index === 6) {
            let go = (item + 29);
            if (go === 33) go = 100;
            const arrow2 = document.getElementsByClassName("arrowIndex" + go)[0];
            arrow2.style.display = "block";
        }
        if (player1Index === 12) {
            let go = (item + 39);
            if (go === 43) go = 100;
            const arrow2 = document.getElementsByClassName("arrowIndex" + go)[0];
            arrow2.style.display = "block";
        }


    }


    const YutName = {
        position: "absolute",
        top: "-32px",
        opacity: 1,
        left: "-25px",
        fontSize: "1px",
        textAlign: "center",
        width: "50px",
        transition: "all 0.3s ease-in-out",
        zIndex: 5,
        pointerEvents: "none",
        textShadow: "black 0px 0px 3px",
        fontWeight: "bold",
        color: "white",
        scale: "0.7"
    }

    const YutStateStyle = {
        position: "absolute",
        borderRadius: "13px",
        boxShadow: "1px 1px 6px black",

    }

    // const StateBuildStyle = {
    //     position: "absolute",
    //     top: 0,
    //     left: 0,
    //     backgroundRepeat: 'no-repeat',
    //     backgroundSize: 'cover',
    //     width: 40,
    //     height: 23,
    //     transform: "translate(-40%, -40%)",
    //     pointerEvents: "none",
    //     scale: "1.5",
    // }

    const YutFanBackGroundStyle = {
        position: "absolute",
        top: -20,
        left: -20,
        width: "500px",
        height: "500px",
        background: "lightgray",
        borderRadius: "5%",
        opacity: 0.8,
    }

    const YutThrowImageStyle = {
        position: "absolute",
        top: -20 + 250,
        left: -20 + 250,
        transform: "translate(-50%, -50%)",
        width: 300,
        height: 300,
        display: yutThrowImageDisplay,
        justifyContent: "center",
        backgroundColor: "rgb(255,255,255,0.5)",
        borderRadius: "50%",
        zIndex: 50,
        paddingBottom: "30px",
    }

    const YutPanStyle = {
        position: "absolute",
        width: 500,
        height: 500,
        top: windowSizeCustom.height / 2 + 30,
        left: windowSizeCustom.width / 2 + 30,
        transform: "translate(-50%, -50%)",
        scale: "1.5",
        transformOrigin: "0px 0px",
    }

    const YutThrowBtnStyle = {
        left: 149,
        top: 325.05,
        width: 161,
        height: 45,
        scale: '0.7',
        position: 'absolute',
        backgroundImage: `url("/image/Btthrow.normal.0.png")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    }

    const YetResultBtnStyle = {
        left: 124,
        top: 65,
        width: 210,
        height: 30,
        scale: "0.8",
        position: 'absolute',
        display: "flex",
        justifyContent: "space-evenly",
    }

    const player1Style = {
        position: "absolute",
        width: 40,
        zIndex: 4,
        pointerEvents: "none",
        top: player1Top - 10,
        left: player1Left + 2,
        display: "block",
    }

    const arrowStyle = {
        position: "absolute",
        width: 20,
        height: 30,
        display: "none",
    }


    return <div style={YutPanStyle}>
        <div style={{
            position: "absolute",
            width: 500,
            height: 500,
        }}>
            <div style={YutFanBackGroundStyle}></div>
            <div style={YutThrowImageStyle}>
                <img src={yutThrowImageSrc} alt="윷 이미지" id="yutThrowImage"/>
            </div>

            <div className="YutThrowBtn"
                 onMouseOver={YutThrowBtnOver}
                 onMouseDown={YutThrowBtnDown}
                 onMouseUp={YutThrowBtnUp}
                 onMouseOut={YutThrowBtnOut}
                 onClick={YutThrowBtnClick}
                 style={YutThrowBtnStyle}>
            </div>

            <div className="YutResultBtn"
                 style={YetResultBtnStyle}>
                {resultArr.map((item, index) => (
                    <div style={{width: 30, height: 30}} onClick={() => resultUseClick(item, index)}>
                        <img src={`/image/yutResult.${item}.0.png`} alt="결과" width="30"/>
                    </div>
                ))}
            </div>

            <div style={{fontSize: "20px", position: "absolute"}} onClick={oneMore}>한번더</div>


            <div className="player player1"
                 style={player1Style}
            >
                <img src="/image/pinkbin.png" alt="핑크빈" width="92" height="88" style={{transform: player1Direction,}}/>
                <span>민석이</span>
            </div>


            <div className="YutState YutIndex0"
                 onMouseOver={stateMouseOver}
                 onMouseOut={stateMouseOut}
                 style={{
                     ...YutStateStyle,
                     left: 356.11,
                     top: 356.31,
                     border: '20px #A5A5A5 solid',
                 }}>
                <div style={YutName} className="yutName">출발
                </div>
            </div>

            <div className="YutState YutIndex1"
                 onMouseOver={stateMouseOver}
                 onMouseOut={stateMouseOut}
                 style={{
                     ...YutStateStyle,
                     left: 312.78,
                     top: 389.11,
                     border: '20px #eeeeee solid',
                 }}>
                <div style={YutName} className="yutName">나주
                </div>
            </div>

            <div className="YutState YutIndex2"
                 onMouseOver={stateMouseOver}
                 onMouseOut={stateMouseOut}
                 style={{
                     ...YutStateStyle,
                     left: 262.49,
                     top: 409.94,
                     border: '20px #eeeeee solid',
                 }}>
                <div style={YutName} className="yutName">광주
                </div>
            </div>

            <div className="YutState YutIndex3"
                 onMouseOver={stateMouseOver}
                 onMouseOut={stateMouseOut}
                 style={{
                     ...YutStateStyle,
                     left: 208.52,
                     top: 417.05,
                     border: '20px #eeeeee solid',
                 }}>
                <div style={YutName} className="yutName">이벤트
                </div>
            </div>

            <div className="YutState YutIndex4"
                 onMouseOver={stateMouseOver}
                 onMouseOut={stateMouseOut}
                 style={{
                     ...YutStateStyle,
                     left: 154.55,
                     top: 409.94,
                     border: '20px #eeeeee solid',
                 }}>
                <div style={YutName} className="yutName">전주
                </div>
            </div>

            <div className="YutState YutIndex5"
                 onMouseOver={stateMouseOver}
                 onMouseOut={stateMouseOut}
                 style={{
                     ...YutStateStyle,
                     left: 104.26,
                     top: 389.11,
                     border: '20px #eeeeee solid',
                 }}>
                <div style={YutName} className="yutName">익산
                </div>
            </div>

            <div className="YutState YutIndex6"
                 onMouseOver={stateMouseOver}
                 onMouseOut={stateMouseOut}
                 style={{
                     ...YutStateStyle,
                     left: 61.41,
                     top: 356.31,
                     border: '20px #A5A5A5 solid',
                 }}>
                <div style={YutName} className="yutName">뭐하지
                </div>
            </div>

            <div className="YutState YutIndex7"
                 onMouseOver={stateMouseOver}
                 onMouseOut={stateMouseOut}
                 style={{
                     ...YutStateStyle,
                     left: 27.94,
                     top: 312.78,
                     border: '20px #eeeeee solid',
                 }}>
                <div style={YutName} className="yutName">울산
                </div>
            </div>

            <div className="YutState YutIndex8"
                 onMouseOver={stateMouseOver}
                 onMouseOut={stateMouseOut}
                 style={{
                     ...YutStateStyle,
                     left: 7.10,
                     top: 262.49,
                     border: '20px #eeeeee solid',
                 }}>
                <div style={YutName} className="yutName">부산
                </div>
            </div>

            <div className="YutState YutIndex9"
                 onMouseOver={stateMouseOver}
                 onMouseOut={stateMouseOut}
                 style={{
                     ...YutStateStyle,
                     left: 0,
                     top: 208.52,
                     border: '20px #eeeeee solid',
                 }}>
                <div style={YutName} className="yutName">이벤트
                </div>
            </div>

            <div className="YutState YutIndex10"
                 onMouseOver={stateMouseOver}
                 onMouseOut={stateMouseOut}
                 style={{
                     ...YutStateStyle,
                     left: 7.10,
                     top: 154.55,
                     border: '20px #eeeeee solid',
                 }}>
                <div style={YutName} className="yutName">경주
                </div>
            </div>

            <div className="YutState YutIndex11"
                 onMouseOver={stateMouseOver}
                 onMouseOut={stateMouseOut}
                 style={{
                     ...YutStateStyle,
                     left: 27.94,
                     top: 104.26,
                     border: '20px #eeeeee solid',
                 }}>
                <div style={YutName} className="yutName">대구
                </div>
            </div>

            <div className="YutState YutIndex12"
                 onMouseOver={stateMouseOver}
                 onMouseOut={stateMouseOut}
                 style={{
                     ...YutStateStyle,
                     left: 60.27,
                     top: 60.47,
                     border: '20px #A5A5A5 solid',
                 }}>
                <div style={YutName} className="yutName">KTX
                </div>
            </div>


            <div className="YutState YutIndex13"
                 onMouseOver={stateMouseOver}
                 onMouseOut={stateMouseOut}
                 style={{
                     ...YutStateStyle,
                     left: 104.26,
                     top: 27.94,
                     border: '20px #eeeeee solid',
                 }}>
                <div style={YutName} className="yutName">천안
                </div>
            </div>

            <div className="YutState YutIndex14"
                 onMouseOver={stateMouseOver}
                 onMouseOut={stateMouseOut}
                 style={{
                     ...YutStateStyle,
                     left: 154.55,
                     top: 7.11,
                     border: '20px #eeeeee solid',
                 }}>
                <div style={YutName} className="yutName">공주
                </div>
            </div>

            <div className="YutState YutIndex15"
                 onMouseOver={stateMouseOver}
                 onMouseOut={stateMouseOut}
                 style={{
                     ...YutStateStyle,
                     left: 208.52,
                     top: 0,
                     border: '20px #eeeeee solid',
                 }}>
                <div style={YutName} className="yutName">이벤트
                </div>
            </div>

            <div className="YutState YutIndex16"
                 onMouseOver={stateMouseOver}
                 onMouseOut={stateMouseOut}
                 style={{
                     ...YutStateStyle,
                     left: 262.49,
                     top: 7.11,
                     border: '20px #eeeeee solid',
                 }}>
                <div style={YutName} className="yutName">청주
                </div>
            </div>


            <div className="YutState YutIndex17"
                 onMouseOver={stateMouseOver}
                 onMouseOut={stateMouseOut}
                 style={{
                     ...YutStateStyle,
                     left: 312.78,
                     top: 27.94,
                     border: '20px #eeeeee solid',
                 }}>
                <div style={YutName} className="yutName">충주
                </div>
            </div>


            <div className="YutState YutIndex18"
                 onMouseOver={stateMouseOver}
                 onMouseOut={stateMouseOut}
                 style={{
                     ...YutStateStyle,
                     left: 356.54,
                     top: 61.18,
                     border: '20px #A5A5A5 solid',
                 }}>
                <div style={YutName} className="yutName">탐라국
                </div>
            </div>


            <div className="YutState YutIndex19"
                 onMouseOver={stateMouseOver}
                 onMouseOut={stateMouseOut}
                 style={{
                     ...YutStateStyle,
                     left: 389.11,
                     top: 104.26,
                     border: '20px #eeeeee solid',
                 }}>
                <div style={YutName} className="yutName">인천
                </div>
            </div>


            <div className="YutState YutIndex20"
                 onMouseOver={stateMouseOver}
                 onMouseOut={stateMouseOut}
                 style={{
                     ...YutStateStyle,
                     left: 409.94,
                     top: 154.55,
                     border: '20px #eeeeee solid',
                 }}>
                <div style={YutName} className="yutName">수원
                </div>
            </div>


            <div className="YutState YutIndex21"
                 onMouseOver={stateMouseOver}
                 onMouseOut={stateMouseOut}
                 style={{
                     ...YutStateStyle,
                     left: 417.04,
                     top: 208.52,
                     border: '20px #eeeeee solid',
                 }}>
                <div style={YutName} className="yutName">이벤트
                </div>
            </div>


            <div className="YutState YutIndex22"
                 onMouseOver={stateMouseOver}
                 onMouseOut={stateMouseOut}
                 style={{
                     ...YutStateStyle,
                     left: 409.94,
                     top: 262.49,
                     border: '20px #eeeeee solid',
                 }}>
                <div style={YutName} className="yutName">양주
                </div>
            </div>


            <div className="YutState YutIndex23"
                 onMouseOver={stateMouseOver}
                 onMouseOut={stateMouseOut}
                 style={{
                     ...YutStateStyle,
                     left: 389.11,
                     top: 312.78,
                     border: '20px #eeeeee solid',
                 }}>
                <div style={YutName} className="yutName">서울
                </div>
            </div>
            {/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/}
            {/*외각 끝*/}
            {/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/}


            <div className="YutState YutIndex30"
                 onMouseOver={stateMouseOver}
                 onMouseOut={stateMouseOut}
                 style={{
                     ...YutStateStyle,
                     left: 98.30,
                     top: 319.42,
                     border: '20px #eeeeee solid',
                 }}>
                <div style={YutName} className="yutName">경성
                </div>
            </div>

            <div className="YutState YutIndex31"
                 onMouseOver={stateMouseOver}
                 onMouseOut={stateMouseOut}
                 style={{
                     ...YutStateStyle,
                     left: 135.20,
                     top: 282.52,
                     border: '20px #eeeeee solid',
                 }}>
                <div style={YutName} className="yutName">이벤트
                </div>
            </div>

            <div className="YutState YutIndex32"
                 onMouseOver={stateMouseOver}
                 onMouseOut={stateMouseOut}
                 style={{
                     ...YutStateStyle,
                     left: 172.09,
                     top: 245.63,
                     border: '20px #eeeeee solid',
                 }}>
                <div style={YutName} className="yutName">함흥
                </div>
            </div>

            <div className="YutState YutIndex100"
                 onMouseOver={stateMouseOver}
                 onMouseOut={stateMouseOut}
                 style={{
                     ...YutStateStyle,
                     left: 208.76,
                     top: 208.96,
                     border: '20px #A5A5A5 solid',
                 }}>
                <div style={YutName} className="yutName">뭐였지
                </div>
            </div>
            <div className="YutState YutIndex34"
                 onMouseOver={stateMouseOver}
                 onMouseOut={stateMouseOut}
                 style={{
                     ...YutStateStyle,
                     left: 245.87,
                     top: 171.85,
                     border: '20px #eeeeee solid',
                 }}>
                <div style={YutName} className="yutName">원주
                </div>
            </div>
            <div className="YutState YutIndex35"
                 onMouseOver={stateMouseOver}
                 onMouseOut={stateMouseOut}
                 style={{
                     ...YutStateStyle,
                     left: 282.76,
                     top: 134.96,
                     border: '20px #eeeeee solid',
                 }}>
                <div style={YutName} className="yutName">이벤트
                </div>
            </div>
            <div className="YutState YutIndex36"
                 onMouseOver={stateMouseOver}
                 onMouseOut={stateMouseOut}
                 style={{
                     ...YutStateStyle,
                     left: 319.65,
                     top: 98.07,
                     border: '20px #eeeeee solid',
                 }}>
                <div style={YutName} className="yutName">강릉
                </div>
            </div>


            <div className="YutState YutIndex40"
                 onMouseOver={stateMouseOver}
                 onMouseOut={stateMouseOut}
                 style={{
                     ...YutStateStyle,
                     left: 97.86,
                     top: 98.07,
                     border: '20px #eeeeee solid',
                 }}>
                <div style={YutName} className="yutName">황주
                </div>
            </div>

            <div className="YutState YutIndex41"
                 onMouseOver={stateMouseOver}
                 onMouseOut={stateMouseOut}
                 style={{
                     ...YutStateStyle,
                     left: 134.76,
                     top: 134.96,
                     border: '20px #eeeeee solid',
                 }}>
                <div style={YutName} className="yutName">이벤트
                </div>
            </div>
            <div className="YutState YutIndex42"
                 onMouseOver={stateMouseOver}
                 onMouseOut={stateMouseOut}
                 style={{
                     ...YutStateStyle,
                     left: 171.65,
                     top: 171.85,
                     border: '20px #eeeeee solid',
                 }}>
                <div style={YutName} className="yutName">개성
                </div>
            </div>
            <div className="YutState YutIndex44"
                 onMouseOver={stateMouseOver}
                 onMouseOut={stateMouseOut}
                 style={{
                     ...YutStateStyle,
                     left: 245.43,
                     top: 245.63,
                     border: '20px #eeeeee solid',
                 }}>
                <div style={YutName} className="yutName">안주
                </div>
            </div>
            <div className="YutState YutIndex45"
                 onMouseOver={stateMouseOver}
                 onMouseOut={stateMouseOut}
                 style={{
                     ...YutStateStyle,
                     left: 282.32,
                     top: 282.52,
                     border: '20px #eeeeee solid',
                 }}>
                <div style={YutName} className="yutName">이벤트
                </div>
            </div>
            <div className="YutState YutIndex46"
                 onMouseOver={stateMouseOver}
                 onMouseOut={stateMouseOut}
                 style={{
                     ...YutStateStyle,
                     left: 319.21,
                     top: 319.42,
                     border: '20px #eeeeee solid',
                 }}>
                <div style={YutName} className="yutName">평양
                </div>
            </div>


            {/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/}
            {/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/}
            {/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/}
            {/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/}
            {/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/}
            {/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/}
            {/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/}
            {/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/}
            {/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/}
            <div className="arrowIndex0 arrowIndex"
                 onMouseOver={arrowMouseOver}
                 onMouseOut={arrowMouseOut}
                 onClick={arrowClick}
                 style={{
                     ...arrowStyle,
                     left: 356.11 + 10,
                     top: 356.31 - 35,
                 }}>
                <img src="/image/underArrow.png" alt=""/>
            </div>

            <div className="arrowIndex1 arrowIndex"
                 onMouseOver={arrowMouseOver}
                 onMouseOut={arrowMouseOut}
                 onClick={arrowClick}
                 style={{
                     ...arrowStyle,
                     left: 312.78 + 10,
                     top: 389.11 - 35,
                 }}>
                <img src="/image/underArrow.png" alt=""/>
            </div>

            <div className="arrowIndex2 arrowIndex"
                 onMouseOver={arrowMouseOver}
                 onMouseOut={arrowMouseOut}
                 onClick={arrowClick}
                 style={{
                     ...arrowStyle,
                     left: 262.49 + 10,
                     top: 409.94 - 35,
                 }}>
                <img src="/image/underArrow.png" alt=""/>
            </div>

            <div className="arrowIndex3 arrowIndex"
                 onMouseOver={arrowMouseOver}
                 onMouseOut={arrowMouseOut}
                 onClick={arrowClick}
                 style={{
                     ...arrowStyle,
                     left: 208.52 + 10,
                     top: 417.05 - 35,
                 }}>
                <img src="/image/underArrow.png" alt=""/>
            </div>

            <div className="arrowIndex4 arrowIndex"
                 onMouseOver={arrowMouseOver}
                 onMouseOut={arrowMouseOut}
                 onClick={arrowClick}
                 style={{
                     ...arrowStyle,
                     left: 154.55 + 10,
                     top: 409.94 - 35,
                 }}>
                <img src="/image/underArrow.png" alt=""/>
            </div>

            <div className="arrowIndex5 arrowIndex"
                 onMouseOver={arrowMouseOver}
                 onMouseOut={arrowMouseOut}
                 onClick={arrowClick}
                 style={{
                     ...arrowStyle,
                     left: 104.26 + 10,
                     top: 389.11 - 35,
                 }}>
                <img src="/image/underArrow.png" alt=""/>
            </div>

            <div className="arrowIndex6 arrowIndex"
                 onMouseOver={arrowMouseOver}
                 onMouseOut={arrowMouseOut}
                 onClick={arrowClick}
                 style={{
                     ...arrowStyle,
                     left: 61.41 + 10,
                     top: 356.31 - 35,
                 }}>
                <img src="/image/underArrow.png" alt=""/>
            </div>

            <div className="arrowIndex7 arrowIndex"
                 onMouseOver={arrowMouseOver}
                 onMouseOut={arrowMouseOut}
                 onClick={arrowClick}
                 style={{
                     ...arrowStyle,
                     left: 27.94 + 10,
                     top: 312.78 - 35,
                 }}>
                <img src="/image/underArrow.png" alt=""/>
            </div>

            <div className="arrowIndex8 arrowIndex"
                 onMouseOver={arrowMouseOver}
                 onMouseOut={arrowMouseOut}
                 onClick={arrowClick}
                 style={{
                     ...arrowStyle,
                     left: 7.10 + 10,
                     top: 262.49 - 35,
                 }}>
                <img src="/image/underArrow.png" alt=""/>
            </div>

            <div className="arrowIndex9 arrowIndex"
                 onMouseOver={arrowMouseOver}
                 onMouseOut={arrowMouseOut}
                 onClick={arrowClick}
                 style={{
                     ...arrowStyle,
                     left: 0 + 10,
                     top: 208.52 - 35,
                 }}>
                <img src="/image/underArrow.png" alt=""/>
            </div>

            <div className="arrowIndex10 arrowIndex"
                 onMouseOver={arrowMouseOver}
                 onMouseOut={arrowMouseOut}
                 onClick={arrowClick}
                 style={{
                     ...arrowStyle,
                     left: 7.10 + 10,
                     top: 154.55 - 35,
                 }}>
                <img src="/image/underArrow.png" alt=""/>
            </div>

            <div className="arrowIndex11 arrowIndex"
                 onMouseOver={arrowMouseOver}
                 onMouseOut={arrowMouseOut}
                 onClick={arrowClick}
                 style={{
                     ...arrowStyle,
                     left: 27.94 + 10,
                     top: 104.26 - 35,
                 }}>
                <img src="/image/underArrow.png" alt=""/>
            </div>

            <div className="arrowIndex12 arrowIndex"
                 onMouseOver={arrowMouseOver}
                 onMouseOut={arrowMouseOut}
                 onClick={arrowClick}
                 style={{
                     ...arrowStyle,
                     left: 60.27 + 10,
                     top: 60.47 - 35,
                 }}>
                <img src="/image/underArrow.png" alt=""/>
            </div>


            <div className="arrowIndex13 arrowIndex"
                 onMouseOver={arrowMouseOver}
                 onMouseOut={arrowMouseOut}
                 onClick={arrowClick}
                 style={{
                     ...arrowStyle,
                     left: 104.26 + 10,
                     top: 27.94 - 35,
                 }}>
                <img src="/image/underArrow.png" alt=""/>
            </div>

            <div className="arrowIndex14 arrowIndex"
                 onMouseOver={arrowMouseOver}
                 onMouseOut={arrowMouseOut}
                 onClick={arrowClick}
                 style={{
                     ...arrowStyle,
                     left: 154.55 + 10,
                     top: 7.11 - 35,
                 }}>
                <img src="/image/underArrow.png" alt=""/>
            </div>

            <div className="arrowIndex15 arrowIndex"
                 onMouseOver={arrowMouseOver}
                 onMouseOut={arrowMouseOut}
                 onClick={arrowClick}
                 style={{
                     ...arrowStyle,
                     left: 208.52 + 10,
                     top: 0 - 35,
                 }}>
                <img src="/image/underArrow.png" alt=""/>
            </div>

            <div className="arrowIndex16 arrowIndex"
                 onMouseOver={arrowMouseOver}
                 onMouseOut={arrowMouseOut}
                 onClick={arrowClick}
                 style={{
                     ...arrowStyle,
                     left: 262.49 + 10,
                     top: 7.11 - 35,
                 }}>
                <img src="/image/underArrow.png" alt=""/>
            </div>


            <div className="arrowIndex17 arrowIndex"
                 onMouseOver={arrowMouseOver}
                 onMouseOut={arrowMouseOut}
                 onClick={arrowClick}
                 style={{
                     ...arrowStyle,
                     left: 312.78 + 10,
                     top: 27.94 - 35,
                 }}>
                <img src="/image/underArrow.png" alt=""/>
            </div>


            <div className="arrowIndex18 arrowIndex"
                 onMouseOver={arrowMouseOver}
                 onMouseOut={arrowMouseOut}
                 onClick={arrowClick}
                 style={{
                     ...arrowStyle,
                     left: 356.54 + 10,
                     top: 61.18 - 35,
                 }}>
                <img src="/image/underArrow.png" alt=""/>
            </div>


            <div className="arrowIndex19 arrowIndex"
                 onMouseOver={arrowMouseOver}
                 onMouseOut={arrowMouseOut}
                 onClick={arrowClick}
                 style={{
                     ...arrowStyle,
                     left: 389.11 + 10,
                     top: 104.26 - 35,
                 }}>
                <img src="/image/underArrow.png" alt=""/>
            </div>


            <div className="arrowIndex20 arrowIndex"
                 onMouseOver={arrowMouseOver}
                 onMouseOut={arrowMouseOut}
                 onClick={arrowClick}
                 style={{
                     ...arrowStyle,
                     left: 409.94 + 10,
                     top: 154.55 - 35,
                 }}>
                <img src="/image/underArrow.png" alt=""/>
            </div>


            <div className="arrowIndex21 arrowIndex"
                 onMouseOver={arrowMouseOver}
                 onMouseOut={arrowMouseOut}
                 onClick={arrowClick}
                 style={{
                     ...arrowStyle,
                     left: 417.04 + 10,
                     top: 208.52 - 35,
                 }}>
                <img src="/image/underArrow.png" alt=""/>
            </div>


            <div className="arrowIndex22 arrowIndex"
                 onMouseOver={arrowMouseOver}
                 onMouseOut={arrowMouseOut}
                 onClick={arrowClick}
                 style={{
                     ...arrowStyle,
                     left: 409.94 + 10,
                     top: 262.49 - 35,
                 }}>
                <img src="/image/underArrow.png" alt=""/>
            </div>


            <div className="arrowIndex23 arrowIndex"
                 onMouseOver={arrowMouseOver}
                 onMouseOut={arrowMouseOut}
                 onClick={arrowClick}
                 style={{
                     ...arrowStyle,
                     left: 389.11 + 10,
                     top: 312.78 - 35,
                 }}>
                <img src="/image/underArrow.png" alt=""/>
            </div>
            {/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/}
            {/*외각 끝*/}
            {/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/}


            <div className="arrowIndex30 arrowIndex"
                 onMouseOver={arrowMouseOver}
                 onMouseOut={arrowMouseOut}
                 onClick={arrowClick}
                 style={{
                     ...arrowStyle,
                     left: 98.30 + 10,
                     top: 319.42 - 35,
                 }}>
                <img src="/image/underArrow.png" alt=""/>
            </div>

            <div className="arrowIndex31 arrowIndex"
                 onMouseOver={arrowMouseOver}
                 onMouseOut={arrowMouseOut}
                 onClick={arrowClick}
                 style={{
                     ...arrowStyle,
                     left: 135.20 + 10,
                     top: 282.52 - 35,
                 }}>
                <img src="/image/underArrow.png" alt=""/>
            </div>

            <div className="arrowIndex32 arrowIndex"
                 onMouseOver={arrowMouseOver}
                 onMouseOut={arrowMouseOut}
                 onClick={arrowClick}
                 style={{
                     ...arrowStyle,
                     left: 172.09 + 10,
                     top: 245.63 - 35,
                 }}>
                <img src="/image/underArrow.png" alt=""/>
            </div>

            <div className="arrowIndex100 arrowIndex"
                 onMouseOver={arrowMouseOver}
                 onMouseOut={arrowMouseOut}
                 onClick={arrowClick}
                 style={{
                     ...arrowStyle,
                     left: 208.76 + 10,
                     top: 208.96 - 35,
                 }}>
                <img src="/image/underArrow.png" alt=""/>
            </div>
            <div className="arrowIndex34 arrowIndex"
                 onMouseOver={arrowMouseOver}
                 onMouseOut={arrowMouseOut}
                 onClick={arrowClick}
                 style={{
                     ...arrowStyle,
                     left: 245.87 + 10,
                     top: 171.85 - 35,
                 }}>
                <img src="/image/underArrow.png" alt=""/>
            </div>
            <div className="arrowIndex35 arrowIndex"
                 onMouseOver={arrowMouseOver}
                 onMouseOut={arrowMouseOut}
                 onClick={arrowClick}
                 style={{
                     ...arrowStyle,
                     left: 282.76 + 10,
                     top: 134.96 - 35,
                 }}>
                <img src="/image/underArrow.png" alt=""/>
            </div>
            <div className="arrowIndex36 arrowIndex"
                 onMouseOver={arrowMouseOver}
                 onMouseOut={arrowMouseOut}
                 onClick={arrowClick}
                 style={{
                     ...arrowStyle,
                     left: 319.65 + 10,
                     top: 98.07 - 35,
                 }}>
                <img src="/image/underArrow.png" alt=""/>
            </div>


            <div className="arrowIndex40 arrowIndex"
                 onMouseOver={arrowMouseOver}
                 onMouseOut={arrowMouseOut}
                 onClick={arrowClick}
                 style={{
                     ...arrowStyle,
                     left: 97.86 + 10,
                     top: 98.07 - 35,
                 }}>
                <img src="/image/underArrow.png" alt=""/>
            </div>

            <div className="arrowIndex41 arrowIndex"
                 onMouseOver={arrowMouseOver}
                 onMouseOut={arrowMouseOut}
                 onClick={arrowClick}
                 style={{
                     ...arrowStyle,
                     left: 134.76 + 10,
                     top: 134.96 - 35,
                 }}>
                <img src="/image/underArrow.png" alt=""/>
            </div>
            <div className="arrowIndex42 arrowIndex"
                 onMouseOver={arrowMouseOver}
                 onMouseOut={arrowMouseOut}
                 onClick={arrowClick}
                 style={{
                     ...arrowStyle,
                     left: 171.65 + 10,
                     top: 171.85 - 35,
                 }}>
                <img src="/image/underArrow.png" alt=""/>
            </div>
            <div className="arrowIndex44 arrowIndex"
                 onMouseOver={arrowMouseOver}
                 onMouseOut={arrowMouseOut}
                 onClick={arrowClick}
                 style={{
                     ...arrowStyle,
                     left: 245.43 + 10,
                     top: 245.63 - 35,
                 }}>
                <img src="/image/underArrow.png" alt=""/>
            </div>
            <div className="arrowIndex45 arrowIndex"
                 onMouseOver={arrowMouseOver}
                 onMouseOut={arrowMouseOut}
                 onClick={arrowClick}
                 style={{
                     ...arrowStyle,
                     left: 282.32 + 10,
                     top: 282.52 - 35,
                 }}>
                <img src="/image/underArrow.png" alt=""/>
            </div>
            <div className="arrowIndex46 arrowIndex"
                 onMouseOver={arrowMouseOver}
                 onMouseOut={arrowMouseOut}
                 onClick={arrowClick}
                 style={{
                     ...arrowStyle,
                     left: 319.21 + 10,
                     top: 319.42 - 35,
                 }}>
                <img src="/image/underArrow.png" alt=""/>
            </div>


        </div>

    </div>
}

export default YutPan;