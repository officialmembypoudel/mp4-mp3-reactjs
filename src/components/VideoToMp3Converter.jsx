import React, { useState } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { Alert, Button, Card } from 'react-bootstrap';
import { fileExtentionChangerMp4toMp3 } from '../utils/helperFunctions';

const ffmpeg = new FFmpeg({ log: true });

const VideoToMp3Converter = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [mp3File, setMp3File] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);

  const loadFFmpeg = async () => {
    if (!ffmpeg.loaded) {
      await ffmpeg.load(); // Use the load method to initialize ffmpeg
    }
  };

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const convertToMp3 = async () => {
    if (!videoFile) return;

    setIsConverting(true);
    await loadFFmpeg();

    // Listen for progress events
    ffmpeg.on('progress', ({ progress }) => {
      setProgress(Math.round(progress * 100));
    });

    // Write the video file to ffmpeg.wasm's file system
    const data = await videoFile.arrayBuffer(); // Fetch video file data
    await ffmpeg.writeFile('input.mp4', new Uint8Array(data));

    // Execute the FFmpeg command to convert MP4 to MP3
    await ffmpeg.exec(['-i', 'input.mp4', 'output.mp3']);

    // Read the resulting MP3 file
    const mp3Data = await ffmpeg.readFile('output.mp3');
    const mp3Blob = new Blob([mp3Data], { type: 'audio/mp3' });
    const mp3Url = URL.createObjectURL(mp3Blob);

    setMp3File(mp3Url);
    setIsConverting(false);
  };

  return (
    <Card className='py-4 px-4 rounded-4'>
      <a
        className='btn text-danger text-start px-0'
        style={{ textDecoration: 'underline' }}
        href='https://membypoudel.com.np'
        target='_blank'
      >
        Made by Memby Poudel ❤️ 2024
      </a>
      <h4 className='fs-4'>Convert MP4 to MP3</h4>
      <div>
        <input
          className='btn btn-primary btn-lg w-100 mb-2'
          type='file'
          onChange={handleFileChange}
          accept='video/mp4'
        />
        <button
          className='btn btn-success btn-lg w-100'
          onClick={convertToMp3}
          disabled={isConverting || !videoFile}
        >
          {isConverting ? `Converting... ${progress}%` : 'Convert to MP3'}
        </button>
      </div>

      {mp3File && (
        <div className='mt-4 gelatine'>
          <hr />
          <Alert variant='info'>
            Your file has been converted to mp3 format.
          </Alert>
          <p className='fs-5'>
            {fileExtentionChangerMp4toMp3(videoFile?.name)}
          </p>
          <audio className='w-100' controls src={mp3File}></audio>
          <a
            className='btn btn-success w-100 btn-lg'
            href={mp3File}
            download={fileExtentionChangerMp4toMp3(videoFile?.name)}
          >
            Download MP3
          </a>
        </div>
      )}
    </Card>
  );
};

export default VideoToMp3Converter;
