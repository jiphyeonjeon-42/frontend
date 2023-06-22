import { useState, useRef, useEffect, ChangeEventHandler } from "react";
import { BrowserMultiFormatReader, Result } from "@zxing/library";
import "../../asset/css/BarcodeReader.css";

type Props = {
  wrapperClassName?: string;
  toDoAfterRead: (text: string) => void;
};

const BarcodeReader = ({ toDoAfterRead, wrapperClassName = "" }: Props) => {
  const [deviceList, setDeviceList] = useState<MediaDeviceInfo[]>([]);
  const [selectedDevice, setSelectedDevice] = useState(deviceList[0]?.deviceId);
  const videoRef = useRef(null);
  const codeReader = new BrowserMultiFormatReader();

  useEffect(() => {
    codeReader
      .listVideoInputDevices()
      .then(videoInputDevices => {
        setDeviceList(videoInputDevices);
      })
      .catch(err => {
        console.error(err);
      });

    return () => {
      codeReader.reset();
    };
  }, []);

  useEffect(() => {
    codeReader.decodeFromVideoDevice(
      selectedDevice,
      videoRef.current,
      (result: Result) => {
        const text = result?.getText();
        if (text) toDoAfterRead(text);
      },
    );
  }, [selectedDevice]);

  const onChangeSelect: ChangeEventHandler<HTMLSelectElement> = e => {
    setSelectedDevice(e.currentTarget.value);
  };

  return (
    <div className={`barcode-reader__wrapper ${wrapperClassName || ""}`}>
      <video id="video" ref={videoRef} muted />
      <select
        id="sourceSelect"
        onChange={onChangeSelect}
        value={selectedDevice}
      >
        {deviceList.map(device => {
          return (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default BarcodeReader;
