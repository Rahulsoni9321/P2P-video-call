import {
  ReactNode,
  createContext,
  useContext,
  useMemo,
} from "react";

interface PeerContexttype {
  PeerOffer: RTCPeerConnection | null;
  createOffer: () => Promise<RTCSessionDescriptionInit> | null;
  createresponse: ({
    emailId,
  }: any) => Promise<RTCSessionDescriptionInit> | null;
  setanswer: (ans: any) => Promise<void> | null;
  stream?: MediaStream | null;
}
const PeerContext = createContext<PeerContexttype>({
  PeerOffer: null,
  createOffer: () => null,
  createresponse: () => null,
  setanswer: () => null,
  stream: null,
});

export const usePeerContext = () => {
  return useContext(PeerContext);
};

export const PeerContextProvider = ({ children }: { children: ReactNode }) => {
  const PeerOffer = useMemo(
    () =>
      new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:stun.global.twilio.com:3478",
            ],
          },
        ],
      }),
    []
  );
  


   
  const createOffer = async () => {
    const offer = await PeerOffer.createOffer();
    await PeerOffer.setLocalDescription(offer);
    return offer;
  };



  const createresponse = async (offer: any) => {
    await PeerOffer.setRemoteDescription(offer);
    const answer = await PeerOffer.createAnswer();
    await PeerOffer.setLocalDescription(answer);
    return answer;
  };

  const setanswer = async (ans: any) => {
    await PeerOffer.setRemoteDescription(ans);
    return;
  };

  return (
    <PeerContext.Provider
      value={{ PeerOffer, createOffer, createresponse, setanswer }}
    >
      {children}
    </PeerContext.Provider>
  );
};
