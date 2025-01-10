import React, { useEffect, useState } from "react";

const Meal = () => {
  const [mealData, setMealData] = useState([]);
  const [area, setArea] = useState("indian");
  const [inputData, setInputData] = useState("");

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      const api = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
      );
      const data = await api.json();

      console.log(data.meals);

      setMealData(data.meals);
    };
    fetchDataFromAPI();
  }, [area]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputData}`
    );
    const data = await api.json();
    console.log("search data = ", data.meals);
    setMealData(data.meals);
    setInputData(" ");
  };
  return (
    <>
      <form onSubmit={submitHandler} className="mx-auto text-center my-3">
        <input onChange={(e) => setInputData(e.target.value)} type="text" placeholder="Serch Food here" />
      </form>

      <div className="text-center">
        <button
          onClick={() => setArea("italian")}
          type="button"
          className="btn btn-outline-primary mx-1"
        >
          ALL
        </button>
        <button
          onClick={() => setArea("Indian")}
          type="button"
          className="btn btn-outline-dark mx-1"
        >
          INDIAN
        </button>
        <button
          onClick={() => setArea("american")}
          type="button"
          className="btn btn-outline-success mx-1"
        >
          AMERICAN
        </button>
        <button
          onClick={() => setArea("thai")}
          type="button"
          className="btn btn-outline-info mx-1"
        >
          THAI
        </button>
        <button
          onClick={() => setArea("british")}
          type="button"
          className="btn btn-outline-warning mx-1"
        >
          BRITISH
        </button>
        <button
          onClick={() => setArea("russian")}
          type="button"
          className="btn btn-outline-danger mx-1"
        >
          RUSSIAN
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {mealData.map((data) => (
          <div key={data.idMeal} style={{ textAlign: "center" }}>
            <div className="effect mt-5" style={{margin:'20px'}}>
              <img
                src={data.strMealThumb}
                alt=""
                style={{
                  width: "220px",
                  borderRadius: "10px",
                  border: "2px solid blue"
                  ,
                }}
              />
            </div>
            <h5>{data.strMeal}</h5>
          </div>
        ))}
      </div>
    </>
  );
};

export default Meal;
