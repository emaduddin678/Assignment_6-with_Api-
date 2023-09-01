const allBtnContainer = document.getElementById("all-btn");
// allBtnContainer.firstChild.classList.add("active")
const navbar = document.getElementById("navbar");

async function fetchCategories() {
  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/videos/categories"
    );
    const resData = await response.json();
    const data = resData.data;

    // Store references to all buttons in an array
    const buttons = [];

    data.forEach((category) => {
      const button = document.createElement("button");
      const link = document.createElement("a");
      link.href = `#${category.category_id}`;
      link.textContent = category.category;

      link.onclick = () => {
        // Remove the "active" class from all buttons
        buttons.forEach((btn) => {
          btn.classList.remove("active");
        });

        // Add the "active" class to the clicked button
        button.classList.add("active");
        navbar.innerHTML = `<ul class="nav-list">
          <li>
            <a href="#" class="nav-brand"
              ><img src="./assets/Logo.png" alt=""
            /></a>
          </li>
          <li onclick="sortVideo(${category.category_id})">
            <a href=#${category.category_id} class="sort-btn" id="sort-by-view">Sort by view</a>
          </li>
          <li><a href="blog.html" class="blog-btn active">Blog</a></li>
        </ul>`;

        fetchVideosByCategory(category.category_id);
      };

      button.appendChild(link);
      allBtnContainer.appendChild(button);

      // Add the button to the array of buttons
      buttons.push(button);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  allBtnContainer.firstChild.classList.add("active");
}

// Call the async function to fetch and create buttons
fetchCategories();

async function fetchVideosByCategory(categoryId) {
  const categoryVideoSection = document.getElementById("category-video");
  categoryVideoSection.classList.remove("error");
  // Remove all existing videoDiv elements from categoryVideoSection
  while (categoryVideoSection.firstChild) {
    categoryVideoSection.removeChild(categoryVideoSection.firstChild);
  }
  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
    );
    const resData = await response.json();
    const data = resData.data;

    if (data.length === 0) {
      categoryVideoSection.classList.add("error");
      categoryVideoSection.innerHTML = `<img src="./assets/Icon.png" alt="" />
        <h1>
          Oops!! Sorry, There is no <br />
          content here
        </h1>`;
    }

    data.forEach((video) => {
      // console.log(video)
      const videoDiv = document.createElement("div");
      videoDiv.classList.add("video");

      const img = document.createElement("img");
      img.classList.add("bannerImg");
      img.src = video.thumbnail;
      img.alt = "";

      const timeData = video.others.posted_date;
      // console.log(timeData);

      if (timeData) {
        const min = parseInt(timeData / 60);
        const remMin = parseInt(timeData% 60);
        console.log(remMin)
        console.log(min)
        const hrs = parseInt(min / 60);
        const sec = parseInt(timeData % 60);
        const time = document.createElement("p");
        time.classList.add("time");
        time.innerText = `${hrs}hrs ${remMin}min ${sec}sec`;
        videoDiv.appendChild(time);
      }

      const videoDescriptionDiv = document.createElement("div");
      videoDescriptionDiv.classList.add("video-description");

      const profileImg = document.createElement("img");
      profileImg.classList.add("authorsImg");
      profileImg.src = video.authors[0].profile_picture;
      //   console.log(profileImg.src)
      profileImg.alt = "";

      const videoProfileTextDiv = document.createElement("div");
      videoProfileTextDiv.classList.add("video-profile-text");

      const videoHeading = document.createElement("h1");
      videoHeading.classList.add("video-heading");
      videoHeading.textContent = video.title;
      // console.log(video.authors[0].profile_name);

      const userName = document.createElement("p");
      userName.classList.add("user-name");
      if (video.authors[0].verified) {
        userName.innerHTML = `
        <span>${video.authors[0].profile_name}</span>
        <span><img src="./assets/fi_10629607.png" alt="" /></span>
      `;
      } else {
        userName.innerHTML = `
        <span>${video.authors[0].profile_name}</span>
        
      `;
      }

      const views = document.createElement("p");
      views.textContent = `${video.others.views} views`;

      videoProfileTextDiv.appendChild(videoHeading);
      videoProfileTextDiv.appendChild(userName);
      videoProfileTextDiv.appendChild(views);

      videoDescriptionDiv.appendChild(profileImg);
      videoDescriptionDiv.appendChild(videoProfileTextDiv);

      videoDiv.appendChild(img);
      videoDiv.appendChild(videoDescriptionDiv);

      categoryVideoSection.appendChild(videoDiv);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Call the async function to fetch and create videos for category with ID 1000
fetchVideosByCategory(1000);

async function sortVideo(categoryId) {
  // console.log("Hello");
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const resData = await response.json();
  const data = resData.data;
  // console.log(data);
  const newData = await sortByViewFunc(data);
  sortedByViewVideo(newData);
  // console.log(data);
}

async function sortByViewFunc(data) {
  data.forEach((item) => {
    item.others.views = parseFloat(item.others.views.replace(/[^\d.]/g, ""));
  });

  // Sort the data array by views in descending order
  data.sort((a, b) => b.others.views - a.others.views);

  return data;
}

async function sortedByViewVideo(data) {
  const categoryVideoSection = document.getElementById("category-video");

  // Remove all existing videoDiv elements from categoryVideoSection
  while (categoryVideoSection.firstChild) {
    categoryVideoSection.removeChild(categoryVideoSection.firstChild);
  }

  data.forEach((video) => {
    // console.log(video)
    const videoDiv = document.createElement("div");
    videoDiv.classList.add("video");

    const img = document.createElement("img");
    img.classList.add("bannerImg");
    img.src = video.thumbnail;
    img.alt = "";


    
      const timeData = video.others.posted_date;
      // console.log(timeData);

      if (timeData) {
        const min = parseInt(timeData / 60);
        const remMin = parseInt(timeData % 60);
        console.log(remMin);
        console.log(min);
        const hrs = parseInt(min / 60);
        const sec = parseInt(timeData % 60);
        const time = document.createElement("p");
        time.classList.add("time");
        time.innerText = `${hrs}hrs ${remMin}min ${sec}sec`;
        videoDiv.appendChild(time);
      }

    const videoDescriptionDiv = document.createElement("div");
    videoDescriptionDiv.classList.add("video-description");

    const profileImg = document.createElement("img");
    profileImg.classList.add("authorsImg");
    profileImg.src = video.authors[0].profile_picture;
    //   console.log(profileImg.src)
    profileImg.alt = "";

    const videoProfileTextDiv = document.createElement("div");
    videoProfileTextDiv.classList.add("video-profile-text");

    const videoHeading = document.createElement("h1");
    videoHeading.classList.add("video-heading");
    videoHeading.textContent = video.title;
    // console.log(video.authors[0].profile_name);

    const userName = document.createElement("p");
    userName.classList.add("user-name");
    userName.innerHTML = `
        <span>${video.authors[0].profile_name}</span>
        <span><img src="${video.authors.profile_picture}" alt="" /></span>
      `;

    const views = document.createElement("p");
    views.textContent = `${video.others.views}K views`;

    videoProfileTextDiv.appendChild(videoHeading);
    videoProfileTextDiv.appendChild(userName);
    videoProfileTextDiv.appendChild(views);

    videoDescriptionDiv.appendChild(profileImg);
    videoDescriptionDiv.appendChild(videoProfileTextDiv);

    videoDiv.appendChild(img);
    videoDiv.appendChild(videoDescriptionDiv);

    categoryVideoSection.appendChild(videoDiv);
  });
}
