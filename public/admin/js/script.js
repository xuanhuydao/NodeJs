//#region fillter status

const buttonStatus = document.querySelectorAll("[button-status]");

if (buttonStatus.length > 0) {
  let url = new URL(window.location.href);

  buttonStatus.forEach(button => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");

      if (status) {
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
if (formSearch) {
  formSearch.addEventListener("submit", function (e) {
    e.preventDefault();

    let keyword = e.target.elements.keyword.value;
    let url = new URL(window.location.href);

    if (keyword) {
      url.searchParams.set("keyword", keyword);
    }
    else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}
//#endregion

//#region pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]");
if (buttonsPagination) {
  let url = new URL(window.location.href);
  buttonsPagination.forEach(button => {
    button.addEventListener("click", () => {
      const pageNumber = button.getAttribute("button-pagination");
      url.searchParams.set("page", pageNumber);
      window.location.href = url.href;
    })
  })
}
//#endregion

//#region checkbox-multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const inputIds = checkboxMulti.querySelectorAll("input[name='id']");

  if (inputCheckAll) {
    inputCheckAll.addEventListener("click", () => {
      if (inputCheckAll.checked) {
        inputIds.forEach((input) => {
          input.checked = true;
        });
      } else {
        inputIds.forEach((input) => {
          input.checked = false;
        });
      }
    });
  }
  inputIds.forEach((input) => {
    input.addEventListener("click", () => {
      const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
      if (countChecked == inputIds.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}
//#endregion

//#region form-change-multi
const formChangeMulti = document.querySelector("[class='form-change-multi']");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();

    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");

    const typeChange = e.target.elements.type.value;

    if (typeChange == "delete-all") {
      const isConfirm = confirm("bạn có chắc chắn muốn xóa những bản ghi được chọn");
      if (!isConfirm) {
        return;
      }
    }

    if (inputsChecked.length > 0) {
      let ids = [];
      const inputIds = formChangeMulti.querySelector("input[name='ids']");

      inputsChecked.forEach((input) => {
        id = input.value;
        if (typeChange == "change-position") {
          const position = input.closest("tr").querySelector("input[name='position']").value;
          ids.push(`${id}-${position}`);
        } else {
          ids.push(id);
        }
      });

      inputIds.value = ids.join(", ");

      formChangeMulti.submit();
    } else {
      alert("vui lòng chọn ít nhất 1 bản ghi");
    }
  })
}
//#endregion

//#region form-delete
const btnsDelete = document.querySelectorAll("[button-delete]");
if (btnsDelete) {
  const formDelete = document.querySelector("#form-delete");
  if (formDelete) {
    const path = formDelete.getAttribute("data-path");

    btnsDelete.forEach((btn) => {
      btn.addEventListener("click", () => {
        let isConfirm = confirm("bạn có chắc muốn xóa bản ghi");

        if (isConfirm) {
          const id = btn.getAttribute("data-id");
          const action = `${path}/${id}?_method=DELETE`;

          formDelete.action = action;
          formDelete.submit();
        }
      });
    });

  }


}

//#endregion

//#region show alert
const showAlert = document.querySelector("[show-alert]");
const closeAlert = document.querySelector("[close-alert]");

if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));

  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time)

  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
}
//#endregion

//#region upload image
const uploadImg = document.querySelector("[upload-img]");
if (uploadImg) {
  const inputUploadImg = uploadImg.querySelector("[upload-img-input]");
  const uploadImgPreview = uploadImg.querySelector("[upload-img-preview]");

  if (inputUploadImg) {
    inputUploadImg.addEventListener("change", (e) => {
      const [file] = e.target.files;
      if(file){
        uploadImgPreview.src = URL.createObjectURL(file);
      }

    });
  }
}
//#endregion

//#region sort products
const sortProducts = document.querySelector('.form-group.mb-0');
if(sortProducts) {
  const selectedType = sortProducts.querySelectorAll(".form-control");
  selectedType.forEach((item) => {
    item.addEventListener("change", () => {
      let url = new URL(window.location.href);
      [sortKey, sortType] = item.value.split("-");  //can use e.target.value.split("-") if you want to get the value directly from the event

      url.searchParams.set("sortKey", sortKey);
      url.searchParams.set("sortType", sortType);

      window.location.href = url.href;
      item.selected = true;
    })
  });
}
//#endregion
