/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import Popup from './js/Components/Popup.js';
import Footer from './js/Layouts/Footer.js';
import Header from './js/Layouts/Header.js';
import './styles/app.css';


new Header(document.querySelector("header"))
new Footer(document.querySelector("footer"))

document.querySelectorAll("*[data-popup]")
  .forEach(elt =>new Popup(elt))
