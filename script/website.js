async function getAPI() {
  let host = "https://1111darsh.com";
  let response = await fetch(host + "/json/website.json");
  let data = await response.json();
  return data;
}

getAPI().then(data => createSite(data));

function createSite(jsonData) {


  const navLinks = document.querySelectorAll('.nav');
  navLinks.forEach(navLink => {
    navLink.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      const topPos = parseInt(targetSection.offsetTop)

      if (targetSection) {
        const topPos = targetSection.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: topPos,
          behavior: 'smooth'
        });
      }
      else {
        console.log('No!');
      }
      console.log('Button clicked!');
      // You can perform any action here when the button is clicked
    });
 });
  const categories = [
    'aboutme',
    'cv',
    'skill',
    'certificate',
    'work',
    'project',
    'education',
    'contectme'
  ];

  categories.forEach(category => {
    if (jsonData[category]) {
      createCards(jsonData, category);
    }
  });
}

function createCards(data, category) {
  const container = document.getElementById(category);

  data[category].forEach(item => {
    const card = document.createElement('div');
    card.classList.add('subcard');

    const leftSection = document.createElement('div');
    leftSection.classList.add('left');

    if (item.thumbnail) {
      const icon = document.createElement('div');
      icon.classList.add('icon');
      const thumbnail = document.createElement('img');
      thumbnail.classList.add('thumbnail');
      thumbnail.src = item.thumbnail;

      icon.appendChild(thumbnail);
      leftSection.appendChild(icon);
    }

    if (item.iicon) {
      const icon = document.createElement('div');
      icon.classList.add('icon');

      const ilogo = document.createElement('i');
      const classes = item.iicon.split(' ');
      classes.forEach(className => {
        ilogo.classList.add(className);
      });

      icon.appendChild(ilogo);
      leftSection.appendChild(icon);
    }
    const center = document.createElement('div');
    center.classList.add('center');

    if (item.title) {
      const title = document.createElement('div');
      title.classList.add('title');
      title.textContent = item.title;
      center.appendChild(title);
    }

    if (item.details) {
      const details = document.createElement('div');
      details.classList.add('details');
      details.textContent = item.details;
      center.appendChild(details);
    }

    leftSection.appendChild(center);

    const links = document.createElement('div');
    links.classList.add('links');

    if (item.link) {
      item.link.forEach(linkItem => {
        for (let link in linkItem) {
          const linkElement = document.createElement('a');
          const i = document.createElement('i');

          const classes = link.split(' ');
          classes.forEach(className => {
            i.classList.add(className);
          });

          linkElement.appendChild(i)
          linkElement.href = linkItem[link];
          links.appendChild(linkElement);
        }
      });
    }

    card.appendChild(leftSection);
    card.appendChild(links);
    container.appendChild(card);
  });


}




