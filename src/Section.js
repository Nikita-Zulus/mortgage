import React, { useState } from "react";
export function Section({ header, arr, products, shift, selectedId, onlyDif }) {
  const [visOrNot, setvisOrNot] = useState("flex");
  const [deg, setdeg] = useState(90);
  function handleClick() {
    console.log("1");
    visOrNot === "flex" ? setvisOrNot("none") : setvisOrNot("flex");
    deg === 90 ? setdeg(-90) : setdeg(90);
  }

  return (
    <React.Fragment>
      <div className="container">
        <div className="column column_stick">
          <div className="element cursor-pointer" onClick={handleClick}>
            <div className="element-terms">{header}</div>
            <div
              className="arrower"
              style={{ transform: `rotate(${deg}deg)` }}
            ></div>
          </div>
        </div>
        {products.map(product => (
          <div
            className="column"
            style={{
              left: `${-25 * shift}%`,
              background:
                product.id === selectedId ? "rgb(117, 200, 255)" : undefined
            }}
          >
            <div className="element">
              <span className="text-head"></span>
            </div>
          </div>
        ))}
      </div>
      {arr
        .filter(({ deps }) =>
          onlyDif
            ? deps &&
              !deps.every(dep =>
                products.every(elem => elem[dep] === products[0][dep])
              )
            : true
        )
        .map(({ name, render }) => (
          <div
            className="container hover_horisontal"
            style={{ display: `${visOrNot}` }}
          >
            <div className="column column_stick hover_horisontal">
              <div className="element left">{name}</div>
            </div>
            {products.map(product => (
              <div
                className="column"
                style={{
                  left: `${-25 * shift}%`,
                  background:
                    product.id === selectedId ? "rgb(117, 200, 255)" : undefined
                }}
              >
                <div className="element">
                  <span className="text-head">{render(product)}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
    </React.Fragment>
  );
}
