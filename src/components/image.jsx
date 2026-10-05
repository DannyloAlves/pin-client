import { Image as IKImage } from '@imagekit/react';

export default function Image({ src, alt, w, h, className }) {
    return (
        <IKImage
            urlEndpoint={import.meta.env.VITE_URL_IK_ENDPOINT}
            src={src}
            alt={alt}
            loading="lazy"
            transformation={[
                {
                    width: w,
                    height: h,
                    quality: 20,
                }
            ]}
            className={className}
        />
    );
};