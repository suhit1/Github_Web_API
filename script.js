// Taking reference

let username = document.getElementById("username");
let btn = document.getElementById("btn");
let lower_div = document.getElementById("lower_div");
let nameOn_github = document.getElementById("nameOn_github");
let username_name = document.getElementById("username_name");
let username_image = document.getElementById("username_image");
let followers = document.getElementById("followers");
let following = document.getElementById("following");
let repos = document.getElementById("repos");
let repo_link = document.getElementById("repo_link");

btn.disabled = true;

// addeventlistener

username.addEventListener("input", function () {
  if (username.value) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
    lower_div.style.display = "none";
  }
});

btn.addEventListener("click", function (event) {
  event.preventDefault();
  lower_div.style.display = "block";

  let get_request = new XMLHttpRequest();

  // info regarding username entered

  get_request.addEventListener("load", function (event) {
    let data = JSON.parse(event.target.responseText);
    console.log(data);

    username_image.setAttribute("src", data[0].owner.avatar_url);
    repos.innerText = `Repos: ${data.length}`;
    username_name.innerText = `(@${data[0].owner.login})`;
    username_name.setAttribute("href", `${data[0].owner.html_url}`);
    username_name.setAttribute("target", "_blank");

    repo_link.innerHTML = "";

    // Repository links

    data.forEach((element) => {
      let list_item = document.createElement("li");

      let a = document.createElement("a");

      a.innerText = element.name;
      list_item.setAttribute("class", "list_style");
      a.setAttribute("href", `${element.html_url}`);
      a.setAttribute("class", "anchor");
      a.setAttribute("target", "_blank");
      list_item.appendChild(a);
      repo_link.appendChild(list_item);
    });

    // Getting Name Of github Username,followers count and following count

    let name_github = new XMLHttpRequest();
    name_github.addEventListener("load", function (event) {
      let data = JSON.parse(event.target.responseText);
      console.log(data);
      if ("name" in data) nameOn_github.innerText = data.name;
      console.log(data.name);
      followers.innerText = `Followers: ${data.followers}`; // followers count
      following.innerText = `Following: ${data.following}`; // following count
    });

    name_github.open("GET", `https://api.github.com/users/${username.value}`);

    name_github.send();
  });

  get_request.open(
    "GET",
    `https://api.github.com/users/${username.value}/repos`
  );

  get_request.send();
});
