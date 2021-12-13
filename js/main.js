"use strict";

function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNavX() {
  document.getElementById("myNav").style.width = "0%";
}

/* Close when someone clicks on the lnk inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
  window.scroll({
    top: 0,
    left: 0,
  });
}

/*--------------------------------------------*/
function openNav1() {
  document.getElementById("myNav1").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNavX1() {
  document.getElementById("myNav1").style.width = "0%";
}

/* Close when someone clicks on the lnk inside the overlay */
function closeNav1() {
  document.getElementById("myNav1").style.width = "0%";
  window.scroll({
    top: 0, 
    left: 0, 
   });
}

/*--------------------------------------------*/
function openNav2() {
  document.getElementById("myNav2").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNavX2() {
  document.getElementById("myNav2").style.width = "0%";
}

/* Close when someone clicks on the lnk inside the overlay */
function closeNav2() {
  document.getElementById("myNav2").style.width = "0%";
  window.scroll({
    top: 0, 
    left: 0, 
   });
}

/*--------------------------------------------*/
function openNav3() {
  document.getElementById("myNav3").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNavX3() {
  document.getElementById("myNav3").style.width = "0%";
}

/* Close when someone clicks on the lnk inside the overlay */
function closeNav3() {
  document.getElementById("myNav3").style.width = "0%";
  window.scroll({
    top: 0, 
    left: 0, 
   });
}


/*
global variables
*/
let _allEvents = [];
let _characters = [];
let _selectedCharacter = [];
let _allMembers = [];



/*
Fetches json data from the file events.json
*/

async function fetchEvents() {
  let response = await fetch('json/events.json');
  let data = await response.json();
  _allEvents = data;
  appendEvents(_allEvents);
}

fetchEvents();

/*
Appends json data to the DOM
*/
function appendEvents(events) {
  let htmlTemplate = "";
  for (let event of events) {
    htmlTemplate += /*html*/ `
      <section class="activity-section" style="height:450px">
        <div class="half-activity-section">
            <img src="${event.img}" class="img-half">
        </div>
        <div class="half-activity-section">

          <div>
            <h4>${event.name}</h4>
            <p style="text-align: center;">${event.date}</p>
            <p>${event.description}</p>
          </div>
 
          <a href="${event.link}"><img class="btn" src="icons/btn.png"></a>
        </div>
  </section>
  <img alt="grey line" src="icons/line.png" class="line-events">

    `;
  }
  document.querySelector("#event-section").innerHTML = htmlTemplate;
}





/*
Fetches json data from the file characters.json
*/
async function fetchData() {
  const response = await fetch('json/characters.json');
  const data = await response.json();
  _characters = data;
  console.log(_characters);
  appendCharacters(_characters);

}

fetchData();

function appendCharacters(characters) {
  let htmlTemplate = "";
  for (let character of characters) {
    htmlTemplate += /*html*/ `
      <article>
        <article onclick="showDetailView(${character.id})">
          <img src="${character.img}">
          <h5>${character.name}</h5>
        </article>
      </article>
    `;
  }
  document.querySelector('#characters-grid').innerHTML = htmlTemplate;
}

/*
Shows detailed view
*/

function showDetailView(id) {
  _selectedCharacter = id;
  const characterToShow = _characters.find(character => character.id === id);
  navigateTo("detail-view");
  document.querySelector("#detail-view-container").innerHTML = /*html*/ `
    
    <article>
    <img src="${characterToShow.img}">
      <h2>${characterToShow.name}</h2>
      <p>${characterToShow.occupation}</p>
      <p>${characterToShow.skills}</p>
      <p>${characterToShow.hobbies}</p>
      <p>${characterToShow.alignment}</p>
      <p>${characterToShow.type}</p>
      <p>${characterToShow.description}</p>
    </article>
  `;
}





/*Fetches json data from the file members.json*/
async function fetchMembers() {
  let response = await fetch('json/members.json');
  let data = await response.json();
  _allMembers = data;
  appendMembers(_allMembers);
}

fetchMembers();

/*
Appends json data to the DOM
*/
function appendMembers(members) {
  let htmlTemplate = "";
  for (let member of members) {
    htmlTemplate += /*html*/ `
      
        <div class="single-member">
          <div class="single-member-image">
            <img alt="team-member" src="${member.img}" >
          </div>
          <div class="single-member-text">
            <h4>${member.name}</h4>
            <p>${member.description}</p>
          </div>
        </div>
     

    `;
  }
  document.querySelector("#members").innerHTML = htmlTemplate;
}





/*
Displays more image gallery from JSON on scroll
*/
const URL =
  "json/data.json";
document.addEventListener("DOMContentLoaded", () => {

  let options = {
    root: null,
    rootMargins: "0px",
    threshold: 0.5
  };
  const observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(document.querySelector("footer"));
  getData();
});

function handleIntersect(entries) {
  if (entries[0].isIntersecting) {
    getData();
  }
}

/*
Loops through elements fetched from JSON and assigns attributes to them
*/
function setClass() {
  let x = document.getElementById("content");
  let y = x.getElementsByTagName("a");
  let i;
  for (i = 0; i < y.length; i++) {
    y[i].setAttribute("href", "??????????????????????");
    y[i].setAttribute("data-lightbox", "mygallery");
  }
}

/*
Creates DOM elements from data fetched from JSON
*/
function getData() {
  let content = document.getElementById("content");
  fetch(URL)
    .then(response => response.json())
    .then(data => {

      data.items.forEach(item => {
        let imageContainer = document.createElement("a");
        let img = document.createElement("img");
        img.src = item.img;
        imageContainer.appendChild(img);
        content.appendChild(imageContainer);

        setClass();
      });
    });
}