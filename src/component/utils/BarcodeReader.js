import React, { useState, useRef, useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import PropTypes from "prop-types";

const BarcodeReader = ({ toDoAfterRead }) => {
  const [deviceList, setDeviceList] = useState([]);
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
      result => {
        if (result) {
          toDoAfterRead(result.text);
        }
      },
    );
  }, [selectedDevice]);

  const onChangeSelect = e => {
    setSelectedDevice(e.currentTarget.value);
  };

  return (
    <>
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
    </>
  );
};

export default BarcodeReader;

BarcodeReader.propTypes = {
  toDoAfterRead: PropTypes.func.isRequired,
};
