
interface ResponsivePlayerProps {
  src: string;
  sandbox?: string;
  allow?: string;
  allowFullScreen?: boolean;
}

export default function ResponsivePlayer({ src, sandbox, allow, allowFullScreen }: ResponsivePlayerProps) {
  return (
    <>
      <style>
        {`
          .video-box {
            position: relative;
            width: 100%;
            padding-bottom: 56.25%;
            border-radius: 12px;
            overflow: hidden;
            background-color: #000;
          }

          .video-box iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
          }
        `}
      </style>
      <div className="video-box">
        <iframe
          src={src}
          allowFullScreen={allowFullScreen}
          sandbox={sandbox}
          allow={allow}
        ></iframe>
      </div>
    </>
  );
}
