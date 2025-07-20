//#region fillter status

const buttonStatus = document.querySelectorAll("[button-status]");

if(buttonStatus.length > 0) {
  let url = new URL(window.location.href);
  
  buttonStatus.forEach(button => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");

      if(status) {
        url.searchParams.set("status", status);
      }
      else {
        url.searchParams.delete("status");
      }
      window.location.href = url.href;
    });
  });
}
//#endregion

//#region form-search
const formSearch = document.querySelector("#formSearch");

formSearch.addEventListener("submit", function (e) {
  e.preventDefault();

  let keyword = e.target.elements.keyword.value;
  let url = new URL(window.location.href);

  if(keyword) {
        url.searchParams.set("keyword", keyword);
      }
      else {
        url.searchParams.delete("keyword");
      }
      window.location.href = url.href;
});

//#endregion