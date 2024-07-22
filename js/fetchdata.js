document.addEventListener("DOMContentLoaded", function () {
  const productDetails = document.getElementById("product-list-data");

  function fetchExcelData() {
    fetch("./detail/products.xls")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.arrayBuffer();
      })
      .then(data => {
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        displayProducts(jsonData);
      })
      .catch(error => {
        console.error('Error fetching or processing the file:', error);
        productDetails.innerHTML = `<p>เกิดข้อผิดพลาดในการโหลดข้อมูล: ${error.message}</p>`;
      });
  }

  function displayProducts(products) {
    const productType = getQueryParam("type");
    const filteredProducts = products.filter(
      (product) => product.type === productType
    );

    if (filteredProducts.length > 0) {
      productDetails.innerHTML = filteredProducts
        .map(product => `
           <div class="card">
              <div class="card-image-container">
                <img
                  src="./detail/img/${product.image}"
                  alt="${product.name}"
                  class="card-image"
                />
              </div>
              <div class="card-content">
                <div class="card-title">
                  <h3>${product.name}</h3>
                </div>
                <div class="card-info">
                  <p>
                  ${product.description}
                  </p>
                </div>
              </div>
            </div>
        `,console.log(products.image))
        .join("");
    } else {
      productDetails.innerHTML = `<p>ไม่พบข้อมูลผลิตภัณฑ์ประเภท ${productType}</p>`;
    }
  }

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  fetchExcelData();
});
