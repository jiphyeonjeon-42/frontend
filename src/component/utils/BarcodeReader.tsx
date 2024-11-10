import { useState, useRef, useEffect, useCallback } from "react";
import { BrowserMultiFormatReader, Result } from "@zxing/library";
import "../../asset/css/BarcodeReader.css";
import { useNewDialog } from "~/hook/useNewDialog";

type Props = {
  wrapperClassName?: string;
  toDoAfterRead: (text: string) => void;
};

const codeReader = new BrowserMultiFormatReader();

const BarcodeReader = ({ toDoAfterRead, wrapperClassName = "" }: Props) => {
  const [videoDeviceList, setVideoDeviceList] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  const { addDialogWithTitleAndMessage } = useNewDialog();
  const alertError = (message: string) => {
    addDialogWithTitleAndMessage("barcodeReader", "바코드 리더 에러", message);
  };

  useEffect(() => {
    const loadVideoInputDeviceList = async () => {
      try {
        const videoDeviceList = await codeReader.listVideoInputDevices();
        setVideoDeviceList(videoDeviceList);
      } catch (error) {
        alertError("기기 목록을 불러오는데 실패했습니다.");
        setVideoDeviceList([]);
      }
    };

    /** 바코드리더 초기 로드시, 사용가능한 카메라 목록을 가져옵니다. */
    loadVideoInputDeviceList();
    return () => codeReader.reset();
  }, []);

  useEffect(() => {
    if (!videoDeviceList.length) return;
    /** 사용가능한 기기중 마지막, 주로 후면카메라를 기본으로 설정 */
    const initialDevice = videoDeviceList[videoDeviceList.length - 1];
    setSelectedDeviceId(initialDevice.deviceId);
  }, [videoDeviceList]);

  useEffect(() => {
    if (selectedDeviceId === "" || !videoRef.current) return;

    const setMedia = async (htmlVideoElement: HTMLVideoElement) => {
      codeReader.reset();

      try {
        /** 디바이스 목록엔 떴지만 사용불가시 throw */
        const newVideoStream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: { exact: selectedDeviceId } },
        });
        htmlVideoElement.srcObject = newVideoStream;
        htmlVideoElement.autoplay = true;
        /** 연결된 디바이스에 콜백함수를 전달해줍니다. */
        codeReader.decodeFromVideoElementContinuously(
          htmlVideoElement,
          (result: Result) => result && toDoAfterRead(result.getText()),
        );
      } catch (error) {
        htmlVideoElement.srcObject = null;
        htmlVideoElement.autoplay = false;
        if (error instanceof DOMException && error.name === "NotAllowedError") {
          alertError("카메라 접근 권한을 확인해주세요.");
          return;
        }
        alertError(`해당 디바이스는 사용할 수 없습니다. (${selectedDeviceId})`);
        setVideoDeviceList(
          videoDeviceList.filter(v => v.deviceId !== selectedDeviceId),
        );
      }
    };
    setMedia(videoRef.current);
  }, [selectedDeviceId]);

  return (
    <div className={`barcode-reader__wrapper ${wrapperClassName || ""}`}>
      <video id="video" ref={videoRef} muted />
      <select
        id="sourceSelect"
        onChange={e => setSelectedDeviceId(e.target.value)}
        value={selectedDeviceId}
      >
        {videoDeviceList.map(device => (
          <option key={device.deviceId ?? ""} value={device.deviceId}>
            {device.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BarcodeReader;
