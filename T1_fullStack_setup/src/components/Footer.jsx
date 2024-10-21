import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
    return (
        <footer className='w-screen fixed bottom-0 flex justify-between align-middle'>
            <h3 className='p-2 text-2xl font-bold'>Social Media</h3>
            <div className='content-center'>
                <FontAwesomeIcon icon={faFacebook} className='m-2 text-2xl hover:text-blue-500'/>
                <FontAwesomeIcon icon={faTwitter} className='m-2 text-2xl hover:text-blue-500'/>
                <FontAwesomeIcon icon={faInstagram} className='m-2 text-2xl hover:text-blue-500'/>
                <FontAwesomeIcon icon={faLinkedin} className='m-2 text-2xl hover:text-blue-500'/>
            </div>
        </footer>
    );
}