import React,{useState,useRef,useEffect} from 'react';
import './ImageUpload.css';
import Button  from '../../Shared/UIelements/Button';

const ImageUpload=(props)=> {
    const filePickerRef=useRef();
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState()

    const pickHandler=(event)=>{
        if(event.target.files && event.target.files.length===1){
            const pickedFile= event.target.files[0];
            setFile(pickedFile);
            props.onInput(props.id,pickedFile,true);
        }
        else{
            setFile(null);
            props.onInput(props.id,null,false);
        }
    }

    const pickImageHandler=()=>{
          filePickerRef.current.click();
    }
    useEffect(()=>{
       if(!file){
           return;
       }
       const fileReader=new FileReader();
       fileReader.onload=()=>{
           setPreviewUrl(fileReader.result)
       };
       fileReader.readAsDataURL(file);
    },[file])

    return (
      <div className='form-control'>
          <input 
           id="image" 
           ref={filePickerRef}
           style={{display: 'none'}}
           type ='file' 
           accept=".jpg ,.png ,.jpeg"
           onChange={pickHandler}
           />   
        <div className={`image-upload ${props.center && 'center'}`}>
            <div className="image-upload__preview">
            <img src={previewUrl}  />
            </div>
          <Button type='button' onClick={pickImageHandler}>Pick Image</Button>
        </div>
      </div>
    )
}

export default ImageUpload
