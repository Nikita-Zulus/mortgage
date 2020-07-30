import React, { useState } from "react";
import { Section } from "./Section";
export function Table({ products, removeProduct }) {
  const [shift, setShift] = useState(0);

  function handleLeftClick() {
    setShift(shift - 1);
  }
  function handleRightClick() {
    setShift(shift + 1);
  }

  const [selectedId, setSelectedId] = useState(null);
  console.log(selectedId);
  const [onlyDif, setOnlyDif] = useState(false);
  function handleChange() {
    setOnlyDif((prevState) => !prevState);
  }

  const arr = [
    {
      deps: ["minRate"],
      name: "Минимальная ставка",
      render(product) {
        return `${+product.minRate}%`;
      },
    },
  ];

  const arr1 = [
    {
      deps: ["minDeposit"],
      name: "Первоначальный взнос",
      render(product) {
        return `${parseInt(product.minDeposit * 100) / 100},0%`;
      },
    },
    {
      deps: ["minAmount", "maxAmount"],
      name: "Сумма кредита",
      render(product) {
        return `от ${product.minAmount
          .toString()
          .replace(
            /(\d)(?=(\d{3})+(\D|$))/g,
            "$1 "
          )} до ${product.maxAmount
          .toString()
          .replace(/(\d)(?=(\d{3})+(\D|$))/g, "$1 ")} ₽`;
      },
    },
    {
      name: "Подтверждение дохода",
      render(product) {
        return `${
          product.requiresSolvencyProof === null || false
            ? "Без подтверждения дохода"
            : "Требуется подтверждение дохода"
        }`;
      },
    },
    {
      name: "Срок кредита",
      render(product) {
        return `от ${product.termFrom / 12} до ${product.termTo / 12} лет`;
      },
    },
  ];

  const arr2 = [
    {
      name: "Место заключения договора",
      render(product) {
        return `${product.contractPlace}`;
      },
    },
    {
      name: "Требования к недвижимости",
      render(product) {
        return `${product.realtyRequirements}`;
      },
    },
    {
      name: "Страхование",
      render(product) {
        return `${product.insurance}`;
      },
    },
    {
      name: "Досрочное погашение",
      render(product) {
        return `${product.prepayment}`;
      },
    },
  ];
  const arr3 = [
    {
      name: "Место заключения договора",
      render: (product) => {
        return `${product.contractPlace}`;
      },
    },
  ];
  return (
    <div className="allTable">
      <div className="container">
        <div className="column column_stick__head">
          <div className="head-element">
            <span className="program">{products.length} программ</span>
            <div className="buttons">
              <button
                className="button-left"
                type="button"
                disabled={shift === 0}
                onClick={handleLeftClick}
              ></button>
              <button
                className="button-right"
                type="button"
                disabled={shift === products.length - 3}
                onClick={handleRightClick}
              ></button>
            </div>
          </div>
        </div>

        {products.map(({ name, id }) => (
          <div
            key={id}
            className="column head__column"
            style={{
              left: `${-25 * shift}%`,
            }}
            onMouseOver={() => setSelectedId(id)}
            onMouseOut={() => setSelectedId(null)}
          >
            <div className="head-element head-element_program" style={{}}>
              <span className="text-head">{name}</span>
              <div className="header-cell__buttons">
                <button
                  className="button_remove"
                  type="button"
                  onClick={() => removeProduct(id)}
                >
                  Удалить
                </button>
                <button className="button_pin" type="button">
                  Закрепить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="container">
        <div className="column column_stick__underhead">
          <div className="element">
            <div className="element-differences">
              Только
              <br />
              различия
            </div>
            <label className={onlyDif ? "toggle toggleChecked" : "toggle"}>
              <input
                className="checkbox"
                type="checkbox"
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
        {products.map((product) => (
          <div
            className="column"
            style={{
              left: `${-25 * shift}%`,
              background:
                product.id === selectedId ? "rgb(117, 200, 255)" : undefined,
            }}
          >
            <div className="element">
              <span className="text-head"></span>
            </div>
          </div>
        ))}
      </div>
      <Section
        products={products}
        arr={arr}
        shift={shift}
        header="Основное"
        selectedId={selectedId}
        onlyDif={onlyDif}
      />
      <Section
        products={products}
        arr={arr1}
        shift={shift}
        header="Условия кредита"
        selectedId={selectedId}
        onlyDif={onlyDif}
      />
      <Section
        products={products}
        arr={arr2}
        shift={shift}
        header="Дополнительно"
        selectedId={selectedId}
        onlyDif={onlyDif}
      />
      <Section
        products={products}
        arr={arr3}
        shift={shift}
        header="Требования к заёмщику"
        selectedId={selectedId}
        onlyDif={onlyDif}
      />
    </div>
  );
}
