"use client"

import config from "@/lib/config";
import { IKImage, IKVideo, ImageKitProvider, IKUpload, ImageKitContext } from "imagekitio-next";
import Image from "next/image";
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast"

// import { config } from "@/lib/config"

const {
    env: {
        imagekit: { publicKey, urlEndpoint }
    }
} = config

const authenticator = async () => {
    try {

        const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`)

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Request faildes with status ${response.status}: ${errorText}`)

        }

        const data = await response.json()

        const { signature, expire, token } = data

        return { token, expire, signature }


    } catch (error: any) {
        throw new Error(`Authentication request failed: ${error.message}`)
    }
}



const ImageUpload = ({ onFileChange }: {
    onFileChange: (filePath: string) => void
}) => {

    const { toast } = useToast()
    const ikUploadRef = useRef(null)
    const [file, setFile] = useState<{ filePath: string } | null>(null)


    const onError = (error: any) => {
        toast({
            title: "Image uploaded failed",
            description: "Your image could not be uploaded. Please try again",
            variant:"destructive"
        })
    }
    const onSuccess = (res: any) => {
        setFile(res)
        onFileChange(res.filePath)

        toast({
            title: "Image uploaded successfully",
            description: `${res.filePath} uploaded successfully!`,
        })

    }

    return (
        <ImageKitProvider
            publicKey={publicKey}
            urlEndpoint={urlEndpoint}
            authenticator={authenticator}
        >
            <IKUpload
                ref={ikUploadRef}
                className="hidden"
                onError={onError}
                onSuccess={onSuccess}
                fileName="test-upload.png"


            />

            <button className="upload-btn"
                onClick={(e) => {
                    e.preventDefault()
                    if (ikUploadRef.current) {
                        // @ts-ignore
                        ikUploadRef.current?.click()
                    }
                }}
            >
                <Image
                    src="/icons/upload.svg"
                    width={20}
                    height={20}
                    alt="upload-icon"
                    className="object-contain"
                />
                <p className="text-base text-light-100">Upload a File</p>
                {file && <p className="upload-filename">{file.filePath}</p>}
            </button>

            {
                file && (
                    <IKImage
                        path={file.filePath}
                        alt={file.filePath}
                        width={500}
                        height={500}
                    />
                )
            }

        </ImageKitProvider>
    )
}

export default ImageUpload