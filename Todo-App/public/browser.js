// Creating a new Task
let createField = document.getElementById("create-field");
document.getElementById("create-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  let data;
  try {
    data = await axios.post("/create-item", {
      text: createField.value,
    });

    document
      .getElementById("item-list")
      .insertAdjacentHTML("beforeend", itemTemplate(data.data));

    // Resetting
    createField.value = "";
    createField.focus();
  } catch (err) {
    console.log(err);
  }
});

function itemTemplate(item) {
  return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
  <span class="item-text">${item.text}</span>
  <div>
    <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
    <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
    </div>
  </li>`;
}

// Click Handling for "Edit" and "Delete" buttons
document.addEventListener("click", (e) => {
  // Deleting a task
  if (e.target.classList.contains("delete-me")) {
    if (confirm("Are You Sure?")) {
      let res;
      try {
        res = axios.post("/delete-item", {
          id: e.target.getAttribute("data-id"),
        });
      } catch (err) {
        console.log(err);
      }

      e.target.parentElement.parentElement.remove();
    }
  }

  // Editing feature
  if (e.target.classList.contains("edit-me")) {
    let input = prompt(
      "Enter you new task",
      e.target.parentElement.parentElement.querySelector(".item-text").innerHTML
    );
    if (input) {
      let res;
      try {
        res = axios.post("/update-item", {
          text: input,
          id: e.target.getAttribute("data-id"),
        });
      } catch (err) {
        console.log(err);
      }

      e.target.parentElement.parentElement.querySelector(
        ".item-text"
      ).innerHTML = input;
    }
  }
});
