import React, { useEffect, useState } from 'react'
import './App.css'

const Pdf = () => {

    // start

    const [pdf, setPdf] = useState()
    const [url,setUrl] = useState(undefined)

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setPdf(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setPdf(e.target.files[0])
    }

    // end

    useEffect(() => {
        console.log('Url',url)
        console.log('Pdf',pdf)
    })

    useEffect(() => {
        if(url) {
            // Do something
            alert('Save to database')
        }
    })

    const uploadPdf = (e)=>{
        e.preventDefault()
        console.log('Pdf',pdf)
        const data = new FormData()
        data.append("file",pdf)
        data.append("upload_preset","s0qhad82")
        data.append("cloud_name","cnq")
        fetch("https://api.cloudinary.com/v1_1/devwian/video/upload",{
            method:"POST",
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
                                    Upload Pdf
                                </label>
                                {
                                    pdf ? <span>{pdf.name}</span> : null
                                }
                                <input
                                 id="file-upload"
                                 type="file"
                                //  accept="application/pdf"
                                 onChange={onSelectFile}
                                 multiple
                                />
                    </div>
                </div>
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={(e)=> uploadPdf(e)}> Submit </button>
            </form>

            <div>
                <h3>Video url</h3>
                {url}
            </div>
        </>
    )
}

export default Pdf