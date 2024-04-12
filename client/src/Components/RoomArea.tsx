import { useCallback, useEffect, useState } from "react";
import { useSocketContext } from "../Context/Socketcontext";
import { usePeerContext } from "../Context/PeerContext";
import ReactPlayer from "react-player";

const RoomArea = () => {
  const { socket } = useSocketContext();
  const { createOffer, createresponse, setanswer, PeerOffer } =
    usePeerContext();
  const [mystream, setmystream] = useState<MediaStream | null>();
  const [remotestream, setremotestream] = useState<MediaStream>();

  const handlenewjoin = useCallback(
    async ({ emailId }: { emailId: string }) => {
      console.log(`User with email id ${emailId} has joined.`);
      const offer = await createOffer();
      socket?.emit("call-user", { emailId, offer });
    },
    [createOffer, socket]
  );

  const localstream = useCallback(async () => {
    const streams = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    streams.getTracks().forEach((track) => {
      PeerOffer?.addTrack(track, streams);
    });
    setmystream(streams);
  }, []);

  useEffect(() => {
    localstream();
  }, []);

  const handleincommingcall = useCallback(
    async (data: any) => {
      const { from, offer } = data;
      console.log(`Incoming call from ${from} and the offer is `, offer);
      const ans = await createresponse(offer);
      socket?.emit("call-accepted", { from, ans });
    },
    [createresponse, socket]
  );

  const handlecallaccepted = useCallback(
    async (data: any) => {
      await setanswer(data.ans);
      console.log(data.ans);

      const trackHandler = (ev: RTCTrackEvent) => {
        const [remotestream] = ev.streams;
        console.log(remotestream);
        setremotestream(remotestream);
      };

      PeerOffer?.addEventListener("track", trackHandler);

      return () => {
        PeerOffer?.removeEventListener("track", trackHandler);
      };
    },
    [PeerOffer, setanswer, setremotestream]
  );

  useEffect(() => {
    socket?.on("user-joined", handlenewjoin);
    socket?.on("incoming-call", handleincommingcall);
    socket?.on("call-accepted", handlecallaccepted);

    return () => {
      socket?.off("user-joined", handlenewjoin);
      socket?.off("incoming-call", handleincommingcall);
      socket?.on("call-accepted", handlecallaccepted);
    };
  }, [socket, handlenewjoin, handleincommingcall, handlecallaccepted]);
  return (
    <div className="min-h-screen w-full flex items-center bg-gray-500 gap-10 justify-around">
      {remotestream ? (
        <video
          autoPlay
          ref={(ref) => {
            if (ref) {
              ref.srcObject = remotestream;
            }
          }}
        ></video>
      ) : (
        <div>No remote stream</div>
      )}
      {mystream ? (
        <video
          autoPlay
          muted
          ref={(ref) => {
            if (ref) {
              ref.srcObject = mystream;
            }
          }}
        ></video>
      ) : (
        <div className="text-white">No local stream</div>
      )}
    </div>
  );
};

export default RoomArea;
