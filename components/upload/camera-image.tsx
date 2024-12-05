import { useState } from "react";
import Image from "next/image";

export default function App() {
  const [imgSrc, setImgSrc] = useState("");
  const [log, setLog] = useState("");

  const onChangeInputFile = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (
      !event.target.files ||
      event.target.files.length === 0
    )
      return;
    const file0 = event.target.files[0];
    const blob_url = window.URL.createObjectURL(file0);
    setLog(blob_url);
    setImgSrc(blob_url);
  };

  return (
    <>
      <div>{log}</div>
      <input
        type="file"
        accept="image/*"
        capture
        onChange={onChangeInputFile}
      />
      <Image src={imgSrc} alt="" width={500} height={500} />
    </>
  );
}
