import React, { useEffect, useState } from 'react';
import Card from './Card';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import useWindowDimensions from './windowDimension';

const Featured = ({ data_url, title }) => {
  const [data, setData] = useState(null);
  const { width } = useWindowDimensions();
  const [dataToShow, setDataToShow] = useState(null);

  // dynamically loadin data using ajax
  const load_data = () => {
    let men_json = new XMLHttpRequest();
    men_json.open("GET", data_url);
    men_json.onload = () => {
      let data = JSON.parse(men_json.responseText);
      setData(data);
    };
    men_json.send();
  };

  useEffect(() => {
    load_data();
  }, []);

  useEffect(() => {
    let i = 0;
    let tmpArr = [];
    if (!data) return;
    for (const d of data?.products) {
      if (width > 1398) {
        if (i % 3 === 0) tmpArr.push([]);
        tmpArr[tmpArr.length - 1].push(d);
      } else if (width > 1006) {
        if (i % 2 === 0) tmpArr.push([]);
        tmpArr[tmpArr.length - 1].push(d);
      } else {
        tmpArr.push([d]);
      }
      i += 1;
    }
    setDataToShow(tmpArr);
    // console.log("======>", JSON.stringify(tmpArr));
  }, [width, data]);

  return (
    <div className={"active"}>
      <center>
        <h3 className='bg-warning'>{title}</h3>
        <div className='container'
          style={{
            margin: "50px auto",
            backgroundColor: "#FFCA2C4a",
            borderRadius: "0.5rem"
          }

          }>
          <Carousel
            preventMovementUntilSwipeScrollTolerance
            showArrows={true} showStatus={false}
            autoPlay infiniteLoop interval={2000}
            swipeScrollTolerance={10}
            showThumbs={false}>
            {dataToShow?.map((d, i) => {
              return <div className='row'>
                {d?.map((e, j) => {
                  return <Card entry={e} index={j} />;
                })}
              </div>;
            })}
          </Carousel>
          <br />
        </div>
      </center>
    </div >
  );
};

export default Featured;
