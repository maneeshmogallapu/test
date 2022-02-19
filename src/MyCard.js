
import { Card, CardBody, CardTitle, CardText,Form } from "reactstrap";
import React, { useState, useEffect } from "react";
import Axios from "axios";
// - The data is a list of prizes and each prize contains the following
// information
// - Which year was the pri
// ze won in
// - Category
// - Motivation
// - Laureates (who won the prize : can be multiple per prize)
// - Each Laureate follows the following structure
// - Id (unique id)
// - First name
// - Sur name
// - You can ignore the extra fields which are present in the json
// Tasks
// 1. Write a function to fetch prizes from the url
// 2. Showcase the prize winners in a list. You can decide the layout and style.
// 3. You should add dropdown to filter prizes by category and year.
// 4. Year should be between 1900 - 2018, you can find out the category
// You have to display each prize and who has won that prize
// have to make a section in the app to display their information -->


const MyCard = ({ details }) => {
  const [data, setData] = useState([]);
  const year=[];
  const category=[];
  const fetchDetails = async () => {
    const { data } = await Axios.get(
      "http://api.nobelprize.org/v1/prize.json"
    );

    const details = data.prizes;
    setData(details)
  };

  useEffect(() => {
    fetchDetails();
  }, []);
  for(let i=1900;i<=2018;i++){
    if(!year.includes(i)){
      year.push(i);
    }
  }
  data?.forEach(element => {
    if(!category.includes(element.category)){
      category.push(element.category);
    }
  });
   function getYear(year){
    for(let i=0;i<data.length;i++){
      return data.filter(item=>item.year===year);
    }
  }
  function getCategory(category){
    for(let i=0;i<data.length;i++){
      return data.filter(item=>item.category===category);
    }
  }

  return (
    <div className="container ">
            <h1>Prize Winners</h1>
            <Form className="form-control">
              <select  className="col-auto"
                onChange={(e) => {
                  setData(getYear(e.target.value));
                }}
              >
                <option value="">Select Year</option>
                {year.map((item) => {
                  return <option value={item}>{item}</option>;
                })
                }
              </select>
              <select className="col-auto"
                onChange={(e) => {
                  setData(getCategory(e.target.value));
                }}
              >
                <option value="">Select Category</option>
                {category.map((item) => {
                  return <option value={item}>{item}</option>;
                }
                )}
              </select>
            </Form>
        {data?.map((item) => {
          return (
            <div className="col-md-4">
              <Card className="card">
                <CardBody>
                  <CardTitle>
                    <h3>{item.year}</h3>
                  </CardTitle>
                  <CardText>
                    <h4>{item.category}</h4>
                    {item.laureates?.map((laureate) => (
                    <div>
                      <h4>{laureate.firstname} {laureate.surname}</h4>
                    </div>
                  ))}
                  </CardText>
                </CardBody>
              </Card>
            </div>
          );
        }
        )}
    </div>
  );
};

export default MyCard;
/* <div>
      <form className="form-inline">
          <select className="form-control" placeholder="Filter by Year">
            <option value="">Filter by Year</option>
            {data.map((item) => {
              if(!year.includes(item.year)&&item.year>=1900&&item.year<=2018){
                year.push(item.year);
                return <option value={item.year}>{item.year}</option>
              }
            }
          )}
        </select>
        <select className="form-control" placeholder="Filter by Category">
          <option value="">Filter by Category</option>
          {data.map((item) => {
            if(!category.includes(item.category)){
              category.push(item.category);
              return <option value={item.category}>{item.category}</option>
            }
          }
        )}
        </select>
    </form>
    <Card className="mb-4">
        <CardBody>
          <CardTitle>
            <h1>Prize Winners</h1>
          </CardTitle>
          <CardText>
            <ul className="list-group">
              {data.map((item) => (
                <li className="list-group-item">
                  <h3>{item.year}</h3>
                  <h3>{item.category}</h3>
                  {item.laureates?.map((laureate) => (
                    <div>
                      <h4>{laureate.firstname} {laureate.surname}</h4>
                    </div>
                  ))}
                </li>
              ))}
            </ul>
          </CardText>
        </CardBody>
      </Card>
    </div>
  ); */