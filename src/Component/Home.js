import React, { useEffect, useState } from 'react'
import './Homce.css'
const Home = () => {
  const [category, setcategory] = useState([]);
  const [name, setname] = useState('self');
  const [categorySugg, setcategorysugg] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://staging-api.astrotak.com/api/question/category/all');
      const apidata = await response.json();
      setcategory(apidata.data);
      setcategorysugg(apidata.data[0].suggestions);
    }
    fetchData();

  }, []);

  const clickHandler = (e) => {
    setname(category[e.target.value].name);
    if (category[e.target.value].suggestions.length !== 0) {
      setcategorysugg(category[e.target.value].suggestions);
    }
    else {
      setcategorysugg(['']);
    }
  }
  return (
    <>
      <div className='home_header'>
        <div id="wallet"><p>Wallet Balance : ₹ 0</p></div>
        <h3>Ask a Question</h3>
        <p>Seek aacurate answers to your life problems and get guidance towards the right path. Whether the Problem is related to love,self,life,business,money,education or work, our astrologers will do an in depth study of your birth chart  to provide personalized respones along with remedies.</p>
        <h3>Choose Category</h3>
        <div className='home_category'>
          <select name="category" id="category" onChange={clickHandler}>
            {category.map((item, idx) => {
              return <option value={idx} key={idx}>{item.name}</option>
            })}
          </select>
        </div>
        <div className='Qa_header'>
          <input name="question" placeholder='Type a question here'></input>
        </div>
      </div>


      {
        categorySugg.map((item, idx) => {
          return <div className='home_suggestions'><img src="/images/questionmark.png" alt="questionmark_images"></img> <p id="home_suggestions_child" key={idx}>{item}</p> </div>
        })
      }
      <div className='ask_now_btn'>
        ₹ 150 (1 Question on {name} )  <button> Ask Now</button>
      </div>

    </>
  )
}

export default Home