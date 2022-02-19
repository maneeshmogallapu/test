
import { Card, CardBody, CardTitle, CardText,Form } from "reactstrap";
import React, { useState, useEffect } from "react";
import Axios from "axios";


const MyCard = ({ details }) => {
  const [data, setData] = useState([]);
  const year=[];
  const category=[];
  const fetchDetails = async () => {
    const { data } = await Axios.get(
      "https://api.nobelprize.org/v1/prize.json"
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
