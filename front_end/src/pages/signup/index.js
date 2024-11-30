import { useMemo, useState } from "react";
import './styles.css';
import { MdEdit } from 'react-icons/md';

const Signup = () => {

    const [state, setState] = useState({})
    const [img, setImg] = useState({});

    function handleChange(e) {
        const { value, name } = e.target;
        setState({ ...state, [name]: value });
    }

    function handleFileChange(e) {
        const file = e.target.files[0];
        if(!file?.size) return;

        // const bar = barred.find(x => file.name.endsWith(x));
        // if(!PDFs_OK && bar) return setMessageFn(setMessageData, { status: 'error', message: PDF_ERROR(bar) });

        // if(file.size > (MB * 1024 * 1024)) {
        //     return setMessageFn(setMessageData, { status: 'error', message: `File cannot be more than ${MB}MB` });
        // }

        if(img.name) URL.revokeObjectURL(img);
        
        setImg(file);
    }

    const getImageURL = useMemo(() => {
        if(img.name) {
            return URL.createObjectURL(img);
        }
    }, [img.name, img]);

    function handleSubmit(e) {
        e.preventDefault();
    };

    return (
        <div className="signup">
            <div>
                <h1>Create an account</h1>

                <form className="su-form" onSubmit={handleSubmit}>
                    <div className="input-image">
                        <div className="ii">
                            <div className="ii-image">
                                {
                                    img.name ? 
                                    <img src={getImageURL} alt="avatar" /> :
                                    <div></div>
                                }
                            </div>
                            <label className="ii-abs pointer" htmlFor="file">
                                <MdEdit className="ii-abs-icon" />
                            </label>
                            <input id="file" type="file" className='file-input' onChange={handleFileChange} />
                        </div>
                    </div>
                    <div className="input-wrapper">
                        <label>Full name</label>
                        <input name='name' placeholder='John Doe' onChange={handleChange} required />
                    </div>
                    <div className="input-wrapper">
                        <label>Email</label>
                        <input name='email' type="email" onChange={handleChange} 
                        placeholder="johndoe@xyz.com" required />
                    </div>

                    <div className="su-submit">
                        <input type="submit" className="submit-btn pointer" value='Sign up' />
                    </div>
                </form>
                <div className="su-sub">
                    Don’t have an account? 
                    <div className="pointer">Sign up</div>
                </div>
            </div>
        </div>
    );
}

export default Signup;