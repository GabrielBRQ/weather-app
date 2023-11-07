import _ from 'lodash';
import searchIcon from './img/search.png'
import './style.css';
import { getInfo } from './getInformation';

function buttonListener(){
   const button = document.querySelector("button");
   const searchInput = document.querySelector("input");

   button.addEventListener('click', getInfo(searchInput));
      searchInput.addEventListener('keyup', function(event) {
         if (event.key === 'Enter') {
            getInfo(searchInput);
         }
      }
   );
}

function addSearchImg(){
   const imgButton = document.querySelector("button img");
   imgButton.src = searchIcon;
}

addSearchImg();
buttonListener();