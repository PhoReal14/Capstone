import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';


export default function Contact() {

  return(
    <div className="app">
      <div id="component">
      <h1>Contact our team!</h1>
      <div>
        Monique Avila
        <br></br>
        <a href='emailto:monique.codes@icloud.com'><FontAwesomeIcon icon={faEnvelope} style={{color: "#a7c6fb",}} /> Email me</a>
        <br></br>
        <a href='https://github.com/Moniii333'><FontAwesomeIcon icon={faGithub} /> Find me on GitHub</a>
        <br></br>
        <a href='www.linkedin.com/in/moniqueavila92'><FontAwesomeIcon icon={faLinkedin} /> Follow me on LinkedIn</a>
      </div>
      <div>
        Garren Pho
        <br></br>
        <a href='emailto:'><FontAwesomeIcon icon={faEnvelope} style={{color: "#a7c6fb",}} /> Email me</a>
        <br></br>
        <a href='https://github.com/'><FontAwesomeIcon icon={faGithub} /> Find me on GitHub</a>
        <br></br>
        <a href='www.linkedin.com/'><FontAwesomeIcon icon={faLinkedin} /> Follow me on LinkedIn</a>
      </div>
      <div>
        Jonathan Netterstrom
        <br></br>
        <a href='emailto:'><FontAwesomeIcon icon={faEnvelope} style={{color: "#a7c6fb",}} /> Email me</a>
        <br></br>
        <a href='https://github.com/'><FontAwesomeIcon icon={faGithub} /> Find me on GitHub</a>
        <br></br>
        <a href='www.linkedin.com/'><FontAwesomeIcon icon={faLinkedin} /> Follow me on LinkedIn</a>
      </div>
      <div>
        Rachel Watkins
        <br></br>
        <a href='emailto:'><FontAwesomeIcon icon={faEnvelope} style={{color: "#a7c6fb",}} /> Email me</a>
        <br></br>
        <a href='https://github.com/'><FontAwesomeIcon icon={faGithub} /> Find me on GitHub</a>
        <br></br>
        <a href='www.linkedin.com/'><FontAwesomeIcon icon={faLinkedin} /> Follow me on LinkedIn</a>
      </div>
    </div>
    </div>
  )
}