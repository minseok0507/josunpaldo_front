import {Button, Input} from "@mui/material";
import useWindowSizeCustom from "../../hooks/useWindowSizeCustom.js";
import {useParams} from "react-router";
import {useEffect, useRef, useState} from "react";

export default function ChatComponent() {

    const {roomId} = useParams();
    const inputRef = useRef(null);


    const [myJWT, setMyJWT] = useState("");
    useEffect(() => {
        const getJWT = window.localStorage.getItem("accessToken").toString();
        setMyJWT(getJWT);
    }, []);

    let ws;
    window.onload = () => {
        wsOpen();
    }

    const wsOpen = () => {
        //웹소켓 전송시 현재 방의 번호를 넘겨서 보낸다.
        ws = new WebSocket("ws://localhost:8080/game/" + roomId);
        wsEvt();
    }

    const wsEvt = () => {
        ws.onopen = (data) => {
            //소켓이 열리면 동작
            console.log("opened");
            console.log(data);
        }
        ws.onmessage = (data) => {
            console.log(data);
            const onMessage = JSON.parse(data.data);
            if (onMessage.type === "message"){
                console.log(onMessage.msg)
            }
        }
    }

    const inputSend = () => {
        const inputElement = inputRef.current?.querySelector("input");
        if (ws && ws.readyState === WebSocket.OPEN) { // WebSocket이 열려 있는지 확인
            const value = inputElement.value;
            if (value.length > 0) {
                let option = {
                    type: "message",
                    roomNumber: roomId,
                    msg: value,
                    jwt: myJWT,
                };
                ws.send(JSON.stringify(option))
                inputElement.value = ""; // 입력 필드의 값을 직접 변경
            }
        }
    };


    const windowSize = useWindowSizeCustom();

    const chatStyle = {
        position: "absolute",
        right: 20,
        bottom: windowSize.height / 2,
        transform: "translateY(50%)",
        width: 300,
        height: 300,
        overflow: "hidden",
        borderRadius: "5%",
    }

    const InputForm = {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "20%",
    }

    const InnerChat = {
        position: "absolute",
        width: "100%",
        height: "80%",
    }

    return (
        <div style={chatStyle}>
            <div className="flex flex-col h-full bg-white">
                <div className="flex-1 overflow-y-auto p-4" style={InnerChat}>
                    <div className="space-y-4">
                        {/*<div className="flex items-start gap-3">*/}
                        {/*    <Box*/}
                        {/*        className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">*/}
                        {/*    </Box>*/}
                        {/*    <div className="bg-green-500 text-white px-4 py-2 rounded-lg max-w-[75%]">*/}
                        {/*        <p className="font-medium">John Doe</p>*/}
                        {/*        <p>Hey, I have a used laptop for sale. Interested?</p>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className="flex items-start gap-3 justify-end">*/}
                        {/*    <div className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg max-w-[75%]">*/}
                        {/*        <p className="font-medium">Jane Smith</p>*/}
                        {/*        <p>Sure, what are the specs and how much are you asking for it?</p>*/}
                        {/*    </div>*/}
                        {/*    <Box*/}
                        {/*        className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">*/}
                        {/*    </Box>*/}
                        {/*</div>*/}
                        {/*<div className="flex items-start gap-3">*/}
                        {/*    <Box*/}
                        {/*        className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">*/}
                        {/*    </Box>*/}
                        {/*    <div className="bg-green-500 text-white px-4 py-2 rounded-lg max-w-[75%]">*/}
                        {/*        <p className="font-medium">John Doe</p>*/}
                        {/*        <p>It's a 2-year-old Dell laptop with an i5 processor, 8GB RAM, and a 256GB SSD. I'm*/}
                        {/*            asking for $400.</p>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className="flex items-start gap-3 justify-end">*/}
                        {/*    <div className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg max-w-[75%]">*/}
                        {/*        <p className="font-medium">Jane Smith</p>*/}
                        {/*        <p>Sounds good, I'll take it. When and where can we meet?</p>*/}
                        {/*    </div>*/}
                        {/*    <Box*/}
                        {/*        className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">*/}
                        {/*    </Box>*/}
                        {/*</div>*/}
                    </div>
                </div>
                <div className="bg-white border-t border-gray-200 p-4 flex items-center" style={InputForm}>
                    <Input
                        placeholder="Type your message..."
                        className="flex-1 bg-gray-100 border-none focus:ring-0 focus:outline-none"
                        ref={inputRef}
                    />
                    <Button variant="solid" className="bg-green-500 hover:bg-green-600 text-white ml-2"
                            onClick={inputSend}>
                        Send
                    </Button>
                </div>
            </div>
        </div>
    )

}
