"use strict";

/* Open when someone clicks on the span element */
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
      
        <article class="character-article" onclick="showDetailView(${character.id})">
          <div class="character-div">
          <img class="character-pic" src="${character.img}">
  </div>
          <h5>${character.name}</h5>
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






const URL =
  "json/data.json";
document.addEventListener("DOMContentLoaded", () => {
  //set up the IntersectionObserver to load more images if the footer is visible.
  //URL - https://gist.githubusercontent.com/prof3ssorSt3v3/1944e7ba7ffb62fe771c51764f7977a4/raw/c58a342ab149fbbb9bb19c94e278d64702833270/infinite.json
  let options = {
    root: null,
    rootMargins: "0px",
    threshold: 0.5
  };
  const observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(document.querySelector("footer"));
  //an initial load of some data
  getData();
});

function handleIntersect(entries) {
  if (entries[0].isIntersecting) {
    console.warn("something is intersecting with the viewport");
    getData();
  }
}

function getData() {
  let content = document.getElementById("content");
  console.log("fetch some JSON data");
  fetch(URL)
    .then(response => response.json())
    .then(data => {
      // data.items[].img, data.items[].name
      data.items.forEach(item => {
        let fig = document.createElement("a");
        let img = document.createElement("img");
        img.src = item.img;
        fig.appendChild(img);
        content.appendChild(fig);
      });
    });
}

function setAttributeNode() {
  let a = document.getElementsByTagName("a")[0];
  let att = document.createAttribute("href");
  att.value = "item.img";
  a.setAttributeNode(att);
}
/* -------- calendar ----------*/