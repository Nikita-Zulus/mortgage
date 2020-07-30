import React, { useState } from "react";
import { Table } from "./Table";

const url =
  "https://api.cian.ru/finance/v1/get-products/?region=1&term=120&amount=2100000&deposit=0.0014285714285714286&p=2&productType=mortgage";

function App() {
  const [products, setProducts] = useState([]);

  function handleClick() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setProducts(data.products));
  }
  function removeProduct(productId) {
    setProducts((prev) => prev.filter((x) => x.id !== productId));
  }
  return (
    <main className="wrapper">
      <header className="main-header">
        <div className="description-header">
          <button className="buttonFetch" onClick={handleClick}>
            Сравнение условий и процентных ставок банка ДОМ.РФ
            <br />
            Нажать!
          </button>
        </div>
        <div className="link-list-header">Программы списком</div>
      </header>
      <Table products={products} removeProduct={removeProduct} />
    </main>
  );
}

export default App;
