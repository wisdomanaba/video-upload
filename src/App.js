import React, { useEffect, useState } from 'react'
import './App.css'

const App = () => {

    // start

    const [video, setVideo] = useState()
    const [url,setUrl] = useState(undefined)
    const [preview, setPreview] = useState()

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!video) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(video)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [video])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setVideo(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setVideo(e.target.files[0])
    }

    // end

    useEffect(() => {
        console.log(url)
        console.log(video)
    })

    useEffect(() => {
        if(url) {
            // Do something
            alert('Save to database')
        }
    })

    const uploadPic = (e)=>{
        e.preventDefault()
        console.log('video')
        const data = new FormData()
        data.append("file",video)
        data.append("upload_preset","s0qhad82")
        data.append("cloud_name","cnq")
        fetch("https://api.cloudinary.com/v1_1/devwian/video/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
        <>
            <h1>Video Upload</h1>
            <form>
                <div className="file-field input-field pic-field">
                    <div className="btn #64b5f6 blue darken-1"> 
                                <label for="file-upload" class="custom-file-upload">
                                    Upload Video
                                </label>
                                <input
                                 id="file-upload"
                                 type="file"
                                 accept="video/*"
                                 onChange={onSelectFile}
                                />
                    </div>
                </div>
                <div className="video-preview">
                    {
                        video && <video width="500" height="300" controls src={preview}>
                                        Your browser does not support the HTML5 Video element.
                                 </video>
                    }
                </div>
                
                {/* {
                    videoPreview ? url 
                                    ? <video controls="controls" src={url}>
                                        Your browser does not support the HTML5 Video element.
                                      </video> 
                                    : <h1>Uploading...</h1>
                                : null
                } */}
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={(e)=> uploadPic(e)}> Submit </button>
            </form>

            <div>
                <h3>Video url</h3>
                {url}
            </div>
        </>
    )
}

export default App
